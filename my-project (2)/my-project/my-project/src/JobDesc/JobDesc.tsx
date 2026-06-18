import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBuilding } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";
import { postJob } from "../Services/JobService";
import { useEffect, useState } from "react";
import { getAppliedJobs } from "../Services/JobService";

import DOMPurify from 'dompurify'

const JobDesc = (props: any) => {
    const navigate = useNavigate();
    const data = DOMPurify.sanitize(props.description || "");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
    const alreadyApplied =
    appliedJobIds.includes(Number(props.id));
   useEffect(() => {
    const loadAppliedJobs = async () => {
        const jobs = await getAppliedJobs(user.id);

            setAppliedJobIds(
                jobs.map((job: any) => job.id)
            );
        };

        loadAppliedJobs();
    }, []);
    
    const cardData = [
        { name: "Experience", value: props.experience, icon: card[0].icon },
        { name: "Job Type", value: props.jobType, icon: card[1].icon },
        { name: "Location", value: props.location, icon: card[2].icon },
        { name: "Salary", value: props.packageOffered ? `₹${props.packageOffered / 100000} LPA` : "Not Disclosed", icon: card[3].icon }
    ];

    return (
        <div className="w-full lg:w-2/3 pt-6">
            <div className="flex flex-col md:flex-row justify-between gap-5 md:items-center">
                <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start text-center sm:text-left">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <IconBuilding className="h-14 w-14 text-bright-sun-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                       <div className="font-semibold text-xl md:text-2xl">{props.jobTitle}</div>
                        <div className="text-sm md:text-lg text-mine-shaft-300">
                            {props.company} &bull; {new Date(props.postTime).toLocaleDateString()} &bull; {props.applicants?.length || 0} Applicants
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-center md:items-end">
                    <Button
                        disabled={alreadyApplied}
                        color={alreadyApplied ? "green" : "bright-sun.4"}
                        variant={alreadyApplied ? "filled" : "light"}
                    >
                        {alreadyApplied ? (
                       <div
                        className="
                        w-[110px]
                        h-[36px]
                        flex
                        items-center
                        justify-center
                        rounded-md
                        bg-green-900/40
                        text-green-400
                        font-semibold
                        "
                    >
                        Applied
                    </div>
                    ) : (
                        <button
                            className="
                                px-6
                                py-2
                                rounded-md
                                bg-[#4a3b1d]
                                text-[#fbbf24]
                                font-semibold
                                hover:bg-[#5a4923]
                                transition
                            "
                            onClick={() =>
                                navigate('/apply-job', {
                                    state: { job: props }
                                })
                            }
                        >
                            Apply
                        </button>
                    )}
                    </Button>

                    {props.edit ? <Button color="red.5" size="sm" variant="outline">Delete</Button> : <IconBookmark
                        className="text-bright-sun-400 cursor-pointer" stroke={1.5} />}
                </div>
            </div>
            <Divider my="xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {
                    cardData.map((item, index: number) => <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon color="bright-sun.4" className="!h-12 !w-12" variant="light" radius="xl">
                            <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <div className="text-mine-shaft-300 text-sm">{item.name}</div>
                       <div className="font-semibold text-center break-words">
                        {item.value}
                        </div>
                    </div>)
                }
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-xl font-semibold mb-5">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        props.skillsRequired?.map((item: string, index: number) => <ActionIcon key={index} color="bright-sun.4" className="!h-fit font-medium !w-fit !text-sm"
                            variant="light" p="xs" radius="xl">{item}
                        </ActionIcon>)
                    }
                </div>
            </div>
            <Divider my="xl" />
            <div className="text-xl font-semibold mb-5">Job Details</div>
            <div className="text-mine-shaft-300 mb-5 italic">{props.about}</div>
            <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold
           text-mine-shaft-200 [&_li]:mb-1 [&_li]:marker:text-bright-sun-400 [&_p]:text-justify" dangerouslySetInnerHTML={{ __html: data }}>
            </div>
            <Divider my="xl" />
            <div className="text-xl font-semibold mb-5">About Company</div>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-3">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <IconBuilding className="h-8 w-8 text-bright-sun-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-medium text-lg">{props.company}</div>
                        <div className=" text-mine-shaft-300">
                            Professional Organization
                        </div>
                    </div>
                </div>
               <Link to="/company" className="w-full md:w-auto">
                    <Button
                        className="w-full md:w-auto"
                        color="bright-sun.4"
                        variant="light"
                    >
                        Company Page
                    </Button>
                    </Link>
            </div>
            <div className="text-mine-shaft-300 text-justify">
                {props.company} is a leading organization in the industry, focused on delivering high-quality solutions and fostering an environment of innovation and growth.
            </div>
        </div>

    );
};

export default JobDesc;
