import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";

;const Profile=(props:any)=>{
return <div className="w-full xl:w-2/3">
<div className="relative">
        <img
        className="rounded-t-2xl w-full h-40 md:h-52 object-cover"
        src="/Profile/banner.jpg"
        alt=""
        />
  <img
    className="
    rounded-full
    h-28 w-28
    md:h-40 md:w-40
    lg:h-48 lg:w-48
    - bottom-12
    md:-bottom-16
    absolute left-3
    border-8 border-mine-shaft-950
    object-cover bg-mine-shaft-900
    "
  src={
    props.picture
      ? `data:image/jpeg;base64,${props.picture}`
      : "/avatar.png"
  }
  alt=""
/>
  </div> 
    <div className="px-3 mt-16">
        <div className="text-2xl md:text-3xl font-semibold flex flex-col sm:flex-row gap-3 sm:justify-between">{props.name}<Button color="bright-sun.4" variant="light" 
        >Message</Button></div>
        <div className="text-base md:text-xl flex gap-1 items-center flex-wrap"><IconBriefcase className="h-5 w-5" stroke={1.5}/>{props.role} &bull; {props.company}</div>
        <div className="flex gap-1 text-sm md:text-lg text-mine-shaft-300 items-center flex-wrap">
          <IconMapPin className="h-5 w-5" stroke={1.5} />{props.location}
        </div>
    </div>
    
    <Divider mx="xs" my="xl"/>
   
    <div className="px-3">
        <div className="text-2xl font-semibold  mb-3">About</div>
        <div className="text-sm text-mine-shaft-300 text-justify">
        {props.about}
        </div>
    </div>
    <Divider mx="xs" my="xl"/>
    <div className="px-3">
        <div className="text-2xl font-semibold  mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
            {
             props.skills?.map((skill:string,index:number)=>
              <div key={index} className="bg-bright-sun-300 bg-opacity-15 rounded-3xl
              text-bright-sun-400 px-3 py-1 text-sm font-medium">{skill}</div>)  
            }
        </div>
    </div>
    <Divider mx="xs" my="xl"/>
    <div className="px-3">
        <div className="text-2xl font-semibold  mb-5">Experience</div>
        <div className="flex flex-col gap-8">
        {
            props.experience.map((exp:any,index:any)=>
            <ExpCard key={index} {...exp}/>)
        }
        </div>
        
        </div>
        <Divider mx="xs" my="xl"/>
    <div className="px-3">
        <div className="text-2xl font-semibold  mb-5">Certification</div>
        <div className="flex flex-col gap-8">
        {
            props.certifications.map((certi:any,index:any)=>
            <CertiCard key={index} {...certi}/>)
        }
        </div>
        
        </div>
</div>
}
export default Profile;