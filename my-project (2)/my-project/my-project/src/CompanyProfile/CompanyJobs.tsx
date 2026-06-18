import { jobList } from "../Data/Data";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs = () => {
  return (
    <div
      className="
      mt-6
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-5
      "
    >
      {jobList.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  );
};

export default CompanyJobs;