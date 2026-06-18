import { useState } from "react";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";

const PostedJobPage=()=>{
    const [selectedJob,setSelectedJob] = useState(null);
    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-3 md:px-4">
     <div className="flex flex-col xl:flex-row gap-5">
        <PostedJob
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />

        <PostedJobDesc
          job={selectedJob}
        />
    </div>
</div>
}
export default PostedJobPage;