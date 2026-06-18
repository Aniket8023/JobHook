import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/UserService";
import TalentCard from "../FindTalent/TalentCard";
import { useParams } from "react-router-dom";

const RecommendTalent = (props: any) => {
    const { id } = useParams();
    const [talents, setTalents] = useState<any[]>([]);

    useEffect(() => {
        const fetchTalents = async () => {
            try {
                const data = await getAllProfiles();
                setTalents(data);
            } catch (err) {
                console.error("Failed to fetch recommended talents", err);
            }
        };
        fetchTalents();
    }, []);

    return (
        <div className="w-full xl:w-1/3">
            <div className="text-xl md:text-2xl font-semibold mb-5">Recommended Talent</div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-5">
                {talents
                    .filter((talent: any) => talent.id.toString() !== id) // Filter out the current talent
                    .slice(0, 4) // Show only first 4 recommendations
                    .map((talent: any, index: number) => (
                        <TalentCard 
                            key={index} 
                            id={talent.id}
                            name={talent.name}
                            role={talent.jobTitle || "No Title"}
                            company={talent.company || "No Company"}
                            topSkills={talent.skills}
                            about={talent.about || "No description provided."}
                            location={talent.location || "Location Not Set"}
                            image={talent.picture}
                            expectedCtc={talent.totalExp ? `${talent.totalExp} Years Exp` : "Fresher"}
                        />
                    ))}
            </div>
        </div>
    );
};

export default RecommendTalent;