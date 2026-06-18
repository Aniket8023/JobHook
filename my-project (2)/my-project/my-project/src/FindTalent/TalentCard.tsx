
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import { DateInput, TimeInput } from '@mantine/dates';
import { useNavigate } from "react-router-dom";




// Define the type for the props
interface TalentCardProps {
  id?: number | string;
  image?: string;
  name: string;
  role: string;
  company: string;
  topSkills?: string[];
  about: string;
  expectedCtc?: string | number;
  location: string;
  posted?:string | boolean;
  invited?:boolean;
}

const TalentCard = (props: TalentCardProps) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  const ref=useRef<HTMLInputElement>(null);
  return (
    <div className="bg-mine-shaft-900 p-4 w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between items-start gap-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              size="lg"
              src={
                props.image
                  ? `data:image/jpeg;base64,${props.image}`
                  : "/avatar.png"
              }
              alt="image"
            />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
           <div className="font-semibold text-base md:text-lg truncate">
              {props.name}
            </div>
            <div className="text-xs md:text-sm text-mine-shaft-300 break-words">
              {props.role} &#x2022; {props.company}</div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>

      <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {props.topSkills?.map((skill, index) => (
          <div key={index}>{skill}</div>
        ))}
      </div>

      <div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
          {props.about}
        </Text>
      </div>

      <Divider size="xs" color="mine-shaft.7" />
      {
        props.invited?<div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} />Interview: August 27, 2024  10:00 AM
        </div>:<div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="font-semibold text-mine-shaft-200">{props.expectedCtc || "N/A"}</div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center break-words">
          <IconMapPin className="h-5 w-5" stroke={1.5} />{props.location}
        </div>
      </div>
      }
      
      
      
      <Divider size="xs" color="mine-shaft.7" />
       <div className="flex flex-col sm:flex-row [&>*]:w-full sm:[&>*]:w-1/2 [&>*]:p-1">
      {
        !props.invited &&<>
       <Link to={`/talent-profile/${props.id}`}>
          <Button color="bright-sun.4" variant="outline" fullWidth>Profile</Button>
        </Link>
        <div>
          {props.posted?<Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5"/>} color="bright-sun.4" variant="light" fullWidth>Schedule</Button>:<Button
  color="bright-sun.4"
  variant="light"
  fullWidth
  onClick={() => navigate(`/chat/${props.id}`)}
>
  Message
</Button>}
        </div>
       </>
      }
      {
        props.invited && <>
        <div>
        <Button color="bright-sun.4" variant="outline" fullWidth>Accept</Button>
        </div>
        <div>
        <Button color="bright-sun.4" variant="light" fullWidth>Reject</Button>
        </div>
        </>
      } 
        
      </div>
      <Modal opened={opened} onClose={close} title="Schedule interview" centered>
        <div className="flex flex-col gap-4 w-full">
        <DateInput minDate={new Date()} value={value} onChange={setValue} label="Date" placeholder="Enter Date"/>
        <TimeInput label="Time" ref={ref} onClick={() => ref.current?.showPicker()}/>
        <Button color="bright-sun.4" variant="outline" fullWidth>Schedule</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
