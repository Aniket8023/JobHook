import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs, getExternalJobs } from "../Services/JobService";

const Jobs = (props: any) => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const keyword = props.filter?.["Job Title"]?.[0] || "java";
                const location = props.filter?.["Location"]?.[0] || "pune";

                // Fetch internal jobs
                const internalJobs = await getAllJobs();
                
                // Fetch external jobs based on filters
                let externalJobs = [];
                try {
                    externalJobs = await getExternalJobs(keyword, location);
                } catch (e) {
                    console.error("Failed to fetch external jobs:", e);
                }

                // Combine results
                setJobs([...internalJobs, ...externalJobs]);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };
        fetchAllJobs();
    }, [props.filter?.["Job Title"], props.filter?.["Location"]]);

    useEffect(() => {
        let filtered = [...jobs];

        if (!props.filter) {
            setFilteredJobs(filtered);
            return;
        }

        // Filter by Job Title
        if (props.filter["Job Title"]?.length > 0) {
            filtered = filtered.filter(job => 
                props.filter["Job Title"].some((title: string) => 
                    job.jobTitle?.toLowerCase().includes(title.toLowerCase())
                )
            );
        }

        // Filter by Location
        if (props.filter["Location"]?.length > 0) {
            filtered = filtered.filter(job => 
                props.filter["Location"].some((loc: string) => 
                    job.location?.toLowerCase().includes(loc.toLowerCase())
                )
            );
        }

        // Filter by Experience
        if (props.filter["Experience"]?.length > 0) {
            filtered = filtered.filter(job => 
                props.filter["Experience"].some((exp: string) => 
                    job.experience?.toLowerCase().includes(exp.toLowerCase())
                )
            );
        }

        // Filter by Job Type
        if (props.filter["Job Type"]?.length > 0) {
            filtered = filtered.filter(job => 
                props.filter["Job Type"].some((type: string) => 
                    job.jobType?.toLowerCase().includes(type.toLowerCase())
                )
            );
        }

        // Filter by Salary
        if (props.filter.salary) {
            const [min, max] = props.filter.salary;
            filtered = filtered.filter(job => {
                const pkg = typeof job.packageOffered === 'number' ? job.packageOffered : 0;
                return (pkg / 100000) >= min && (pkg / 100000) <= max;
            });
        }

        setFilteredJobs(filtered);
    }, [jobs, props.filter]);

    return (
        <div className="px-3 md:px-5 py-5">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="text-xl md:text-2xl font-semibold">Job Postings ({filteredJobs.length})</div>
                <Sort />
            </div>
          <div
                className="
                    mt-8
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-4 md:gap-5
                "
                >
                {filteredJobs.map((job, index) => {
                    // Calculate days ago
                    let postedDaysAgo: string | number = 'Recently';
                    if (job.postTime) {
                        const postDate = new Date(job.postTime);
                        const today = new Date();
                        const diffTime = Math.abs(today.getTime() - postDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        postedDaysAgo = isNaN(diffDays) ? 'Recently' : diffDays;
                    }
                    
                    return (
                        <JobCard 
                            key={index} 
                            {...job} 
                            package={job.packageOffered} 
                            applicants={job.applicants?.length || 0}
                            postedDaysAgo={postedDaysAgo}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Jobs;