import { Divider } from "@mantine/core";
import JobHistory from "../JobHistory/JobHistory";

const JobHistoryPage=()=>{
    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-3 md:px-4">
        <Divider size="xs"/>
     <div className="my-5 ">
        <JobHistory/>
       
    </div>
</div>
}
export default JobHistoryPage;