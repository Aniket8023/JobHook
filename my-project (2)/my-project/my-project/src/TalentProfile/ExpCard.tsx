import { IconBuilding } from "@tabler/icons-react";

// const ExpCard=(props:any)=>{
// return <div className="flex flex-col gap-2">
//  <div className="flex justify-between">
//         <div className="flex gap-2 items-center">
//           <div className="p-2 bg-mine-shaft-800 rounded-md">
//             <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
//           </div>
//           <div className="flex flex-col ">
//             <div className="font-semibold">{props.title}</div>
//             <div className="text-sm text-mine-shaft-300">
//               {props.company} &#x2022;{props.location}
//             </div>
//           </div>
//         </div>
//         <div className="text-sm text-mine-shaft-300">
//             {props.startDate} - {props.endDate}
//         </div>
//       </div>
//       <div className="text-mine-shaft-300 text-justify">
//        {props.description}
//       </div>
// </div>
// }
// export default ExpCard;
interface ExpCardProps {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ExpCard = ({ title, company, location, startDate, endDate, description }: ExpCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <IconBuilding className="h-7 w-7 text-bright-sun-400" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-mine-shaft-300">
              {company} &#x2022; {location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {startDate} - {endDate}
        </div>
      </div>
      <div className="text-mine-shaft-300 text-justify">{description}</div>
    </div>
  );
};

export default ExpCard;
