import { IconBookmark, IconBuilding, IconClockHour3 } from "@tabler/icons-react";
import { Divider, Text } from '@mantine/core';
import { Link } from "react-router-dom";

type JobCardProps = {
  id: number | string;
  company: string;
  jobTitle: string;
  applicants: number;
  experience: string;
  jobType: string;
  location: string;
  description: string;
  package: string | number;
  postedDaysAgo: string |number;
};

const JobCard = (props: any) => {
  return (
    <Link to={`/jobs/${props.id}`} state={{ job: props }} className="transition duration-300 ease-in-out bg-mine-shaft-900 p-4 w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow]
     !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center min-w-0">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <IconBuilding className="h-7 w-7 text-bright-sun-400" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {props.company} &#x2022; {props.applicants} Applicants
            </div>
          </div>
        </div>
        <IconBookmark className="text-mine-shaft-300 cursor-pointer" />
      </div>

      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>

      <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
        {props.description}
      </Text>
      <Divider size="xs" color="mine-shaft.7" />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="font-semibold text-mine-shaft-200">&#8377;{props.package}</div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-5 w-5 shrink-0" stroke={1.5} /> 
          {typeof props.postedDaysAgo === 'number' ? `Posted ${props.postedDaysAgo} days ago` : `Posted ${props.postedDaysAgo}`}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
