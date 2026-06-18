
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/UserService";
import { Loader, Center, Text } from "@mantine/core";

const Talents = () => {
  const [talents, setTalents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const data = await getAllProfiles();
        setTalents(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch talents");
      } finally {
        setLoading(false);
      }
    };
    fetchTalents();
  }, []);

  if (loading) return <Center h="50vh"><Loader color="bright-sun.4" size="xl" /></Center>;
  if (error) return <Center h="50vh"><Text color="red">{error}</Text></Center>;

  return (
    <div className="px-3 md:px-5 py-5">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="text-xl md:text-2xl font-semibold">
          Talents ({talents.length})
        </div>
        <Sort />
      </div>

      <div
        className="
          mt-8
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        "
      >
        {talents.map((talent, index) => (
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

export default Talents;
