
import { Badge } from "@mantine/core";


interface Props {
  jobTitle: string;
  location: string;
  posted: string;
  matchPercentage: number;
  onClick: () => void;
  isSelected?: boolean;
}

const PostedJobCard = (props:any) => {
 return (
  <div
    onClick={props.onClick}
    className={`
      bg-mine-shaft-900
      rounded-xl
      p-3
      border-l-4
      cursor-pointer
      transition-all
      ${
        props.isSelected
          ? "border-l-bright-sun-400 shadow-[0_0_8px_0px_rgba(255,193,7,0.4)]"
          : "border-l-mine-shaft-700"
      }
    `}
  >
    <div className="flex justify-between items-start gap-2">
      <div className="text-sm md:text-base font-semibold break-words">
        {props.jobTitle}
      </div>

      <Badge
        size="sm"
        color={
          props.isSelected
            ? "bright-sun.4"
            : props.matchPercentage >= 80
            ? "green"
            : props.matchPercentage >= 60
            ? "yellow"
            : "red"
        }
      >
        {props.matchPercentage}% MATCH
      </Badge>
    </div>

    <div className="text-xs md:text-sm text-mine-shaft-300 mt-2">
      {props.location}
    </div>

    <div className="text-xs text-mine-shaft-400 mt-1">
      {new Date(props.posted).toLocaleDateString()}
    </div>
  </div>
);
};

export default PostedJobCard;

