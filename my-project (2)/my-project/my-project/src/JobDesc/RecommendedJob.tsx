import { jobList } from "../Data/Data";
import JobCard from "../FindJobs/JobCard";

const RecommendedJobs = () => {
  return (
    <div className="w-full xl:w-[350px] mt-5 xl:mt-0">
      <div className="text-xl font-semibold mb-5">
        Recommended Jobs
      </div>

      <div className="flex flex-col gap-5">
        {jobList.map(
          (job, index) =>
            index < 6 && (
              <JobCard
                key={index}
                {...job}
              />
            )
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;