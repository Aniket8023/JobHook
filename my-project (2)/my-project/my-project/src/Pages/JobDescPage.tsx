import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useLocation, useParams } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJobById } from "../Services/JobService";
import { useNavigate } from "react-router-dom";

const JobDescPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const [job, setJob] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0,0);
        const fetchJob = async () => {
            // If job data is passed via state (e.g. from JobCard), use it
            if (location.state?.job) {
                setJob(location.state.job);
                return;
            }

            // Otherwise fetch by ID if ID is valid
            try {
                if (id && id !== "null") {
                    const data = await getJobById(id);
                    setJob(data);
                }
            } catch (error) {
                console.error("Failed to fetch job details:", error);
            }
        };
        fetchJob();
    }, [id, location.state]);

    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
            
                <Button
                    leftSection={<IconArrowLeft size={20} />}
                    color="bright-sun.4"
                    variant="light"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
           
           <div className="flex flex-col xl:flex-row gap-5 mt-5">
                {job ? <JobDesc {...job} /> : <div className="text-white">Loading job details...</div>}
                <RecommendedJobs />
            </div>
        </div>
    );
};

export default JobDescPage;