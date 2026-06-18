import { Divider } from "@mantine/core";
import { useState } from "react";
import Jobs from "../FindJobs/Jobs";
import SearchBar from "../FindJobs/SearchBar";

const FindJobs = () => {
    const [filter, setFilter] = useState<any>({});

    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-x-hidden">
            <SearchBar filter={filter} setFilter={setFilter} />
           <Divider mx="md" />
            <Jobs filter={filter} />
        </div>
    );
};
export default FindJobs;
