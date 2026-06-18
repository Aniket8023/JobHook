import { Tabs } from "@mantine/core";
//import { activeJobs } from "../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";
import { getSuitableJobs } from "../Services/JobService";

interface PostedJobProps {
  selectedJob: any;
  setSelectedJob: React.Dispatch<React.SetStateAction<any>>;
}

const PostedJob = ({
  selectedJob,
  setSelectedJob
}: PostedJobProps) => {

      const [jobs, setJobs] = useState<any[]>([]);
 // const [jobs, setJobs] = useState<any[]>([]);
    //const [selectedJob, setSelectedJob] = useState<any>(null);

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      getSuitableJobs(user.profileId)
      .then((data) => {
        setJobs(data);

        if(data.length > 0){
          setSelectedJob(data[0]);
        }
      });
    }, []);
    return  <div className="w-full xl:w-1/4 mt-5">
        <div className="text-xl md:text-2xl font-semibold mb-5">Jobs</div>
        <div>
        <Tabs autoContrast variant="pills" defaultValue="active">
      <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
        <div className="text-lg font-medium text-bright-sun-400 mb-4">
          Recommended For You
        </div>
      </Tabs.List>

      <Tabs.Panel value="active">
        <div className="flex flex-col gap-4 mt-5 max-h-[70vh] overflow-y-auto pr-1">
          {
              jobs.map((item,index)=>
              <PostedJobCard
                key={index}
                jobTitle={item.jobTitle}
                location={item.location}
                posted={item.postTime}
                matchPercentage={item.matchPercentage}
                isSelected={selectedJob?.id === item.id}
                onClick={() => setSelectedJob(item)}
              />
            )
          }  
        </div> 
        
      </Tabs.Panel>
      <Tabs.Panel value="draft">S</Tabs.Panel>
    </Tabs>
        </div>
    </div>
}
export default PostedJob;