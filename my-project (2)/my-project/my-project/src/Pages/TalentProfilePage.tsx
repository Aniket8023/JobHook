import { Button, Center, Loader, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/UserService";

const TalentProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (id) {
                    const data = await getProfile(Number(id));
                    setProfile(data);
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return <Center h="90vh"><Loader color="bright-sun.4" size="xl" /></Center>;
    if (error) return <Center h="90vh"><Text color="red">{error}</Text></Center>;
    if (!profile) return <Center h="90vh"><Text>Profile not found</Text></Center>;

    // Map API data to component props
    const profileProps = {
        ...profile,
        role: profile.jobTitle,
        experience: profile.experiences || [],
        certifications: profile.certifications || [],
        skills: profile.skills || []
    };

    return (
      <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-3 md:p-4">
        <Link className="my-4 inline-block" to="/find-talent">
          <Button leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" variant="light" >Back</Button>
        </Link>
        <div className="flex flex-col xl:flex-row gap-5">
            <Profile {...profileProps}/>
            <RecommendTalent/>
        </div>
      </div>
    );
  };
  
  export default TalentProfilePage;