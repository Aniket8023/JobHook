import { LoadingOverlay, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { getAppliedJobs, getJobByPostedBy } from "../Services/JobService";
import Card from "./Card";

const JobHistory = () => {
    const [activeTab, setActiveTab] = useState<string | null>('applied');
    const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
    const [postedJobs, setPostedJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const appliedData = await getAppliedJobs(user.id);
                setAppliedJobs(appliedData);
                
                if (user.accountType === 'EMPLOYER') {
                    const postedData = await getJobByPostedBy(user.id);
                    setPostedJobs(postedData);
                    setActiveTab('posted'); // Default to posted for employers
                }
            } catch (error) {
                console.error("Error fetching job history:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user.id) fetchData();
    }, [user.id, user.accountType]);

    return <div className="relative">
        <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
        <div className="text-xl md:text-2xl font-semibold mb-5">Job History</div>
        <div>
            <Tabs variant="outline" radius="lg" value={activeTab} onChange={setActiveTab}>
                <Tabs.List
                className="
                flex-wrap
                [&_button]:!text-sm
                md:[&_button]:!text-lg
                font-semibold
                mb-5
                [&_button[data-active='true']]:text-bright-sun-400
                "
                >
                    {user.accountType === 'EMPLOYER' && <Tabs.Tab value="posted">Posted</Tabs.Tab>}
                    <Tabs.Tab value="applied">Applied</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="posted">
                   <div
                        className="
                        mt-10
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                        "
                        >
                        {
                            postedJobs.length > 0 ? postedJobs.map((job, index) => {
                                const postedDaysAgo = job.postTime ? Math.floor((new Date().getTime() - new Date(job.postTime).getTime()) / (1000 * 3600 * 24)) : "Recently";
                                return <Card key={index} {...job} id={job.id} postedDaysAgo={postedDaysAgo} applicants={job.applicants?.length || 0} />;
                            }) :
                                <div className="text-mine-shaft-300 text-xl font-semibold mx-auto mt-10">No jobs posted yet.</div>
                        }
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="applied">
                    <div
                        className="
                        mt-10
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                        "
                        >
                        {
                            appliedJobs.length > 0 ? appliedJobs.map((job, index) => {
                                const postedDaysAgo = job.postTime ? Math.floor((new Date().getTime() - new Date(job.postTime).getTime()) / (1000 * 3600 * 24)) : "Recently";
                                // Find the application status for the current user
                                const userApplication = job.applicants?.find((app: any) => app.applicantId === user.id);
                                const status = userApplication?.applicationStatus || "APPLIED";
                                
                                return <Card key={index} {...job} id={job.id} status={status} postedDaysAgo={postedDaysAgo} applicants={job.applicants?.length || 0} applied />;
                            }) :
                                <div className="text-mine-shaft-300 text-lg md:text-xl font-semibold text-center col-span-full mt-10">No jobs applied yet.</div>
                        }
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    </div>
}
export default JobHistory;



