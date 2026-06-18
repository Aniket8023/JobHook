import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const PostedJobDesc = ({ job }: any) => {

  if (!job) {
    return (
      <div className="w-full xl:w-3/4 mt-5 flex items-center justify-center text-lg md:text-xl text-mine-shaft-300">
        Select a job to view details
      </div>
    );
  }
    return <div className="mt-5 w-full xl:w-3/4 px-2 md:px-5">
        <div className="text-xl md:text-2xl font-semibold flex flex-col sm:flex-row sm:items-center gap-2">{job?.jobTitle}
            <Badge variant="light" ml="sm" color="bright-sun.4" size="sm"><Badge
                color={
                job.matchPercentage >= 80
                    ? "green"
                    : job.matchPercentage >= 60
                    ? "yellow"
                    : "red"
                }
                >
                 {job?.matchPercentage || 0}% Match
                </Badge></Badge></div>

                <div className="font-medium text-sm md:text-base text-mine-shaft-300 mb-5">{job?.location}</div>
            <div>
            <Tabs variant="outline" radius="lg" defaultValue="overview">
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

                    <Tabs.Tab value="overview">
                        Overview
                    </Tabs.Tab>

                    <Tabs.Tab value="applicants">
                        Applicants
                    </Tabs.Tab>

                    <Tabs.Tab value="invited">
                        Invited
                    </Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="overview" className="[&>div]:w-full">
                    <JobDesc {...job} />
                </Tabs.Panel>
                <Tabs.Panel value="applicants">

                    {job?.applicants?.length > 0 ? (

                        <div className="flex flex-col gap-3">

                            {job.applicants.map((applicant:any,index:number)=>(

                                <div
                                    key={index}
                                    className="bg-mine-shaft-900 p-3 md:p-4 rounded-lg"
                                >
                                    <div className="font-semibold">
                                        {applicant.name}
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        {applicant.email}
                                    </div>

                                    <Badge mt="sm">
                                        {applicant.applicationStatus}
                                    </Badge>
                                </div>

                            ))}

                        </div>

                    ) : (

                        <div>No Applicants Yet</div>

                    )}

                </Tabs.Panel>
                <Tabs.Panel value="invited">
                    <div>No Invited Candidates</div>
                </Tabs.Panel>
            </Tabs> 
            </div>
    </div>
}
export default PostedJobDesc;