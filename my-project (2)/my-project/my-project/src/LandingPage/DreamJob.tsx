import { Avatar, TextInput } from "@mantine/core";
import { IconBuilding, IconSearch } from "@tabler/icons-react";

const DreamJob=()=>{
    return(
      <div className="flex flex-col-reverse lg:flex-row items-center px-4 md:px-8 lg:px-16 py-8">

        <div className="flex flex-col w-full lg:w-[45%] gap-3 text-center lg:text-left">
           <div className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                font-bold
                leading-tight
                text-mine-shaft-100
                ">
                Find Your <span className="text-bright-sun-400">Dream</span>{" "}
                <span className="text-bright-sun-400">Job</span> With Us
            </div>
            <div className="
                text-sm
                sm:text-base
                md:text-lg
                text-mine-shaft-200
                max-w-xl
                ">Good Life Begins with a Good Company.Start explore thousands of jobs in one place  </div>
            
           <div
            className="
            flex
            flex-row
            gap-2
            mt-5
            w-full
            items-center
            "
            >
            <TextInput
  className="
  flex-1
  bg-mine-shaft-900
  rounded-lg
  p-1
  px-2
  [&_input]:!text-mine-shaft-100
  "
  variant="unstyled"
  label="Job Title"
  placeholder="Software Engineer"
/>

<TextInput
  className="
  flex-1
  bg-mine-shaft-900
  rounded-lg
  p-1
  px-2
  [&_input]:!text-mine-shaft-100
  "
  variant="unstyled"
  label="Job Type"
  placeholder="Fulltime"
/>

           <div
  className="
  flex
  items-center
  justify-center
  h-[72px]
  w-[72px]
  min-w-[72px]
  bg-bright-sun-400
  rounded-lg
  cursor-pointer
  hover:bg-bright-sun-500
  transition-all
  "
>
  <IconSearch className="h-8 w-8 text-white" />
</div>
            </div>
        </div>

        <div className="
            w-full
            lg:w-[55%]
            flex
            justify-center
            items-center
            mb-8
            lg:mb-0
            ">
            <div className="w-full max-w-[30rem] relative">
                <img
  src="/Boy.png"
  alt=""
  className="
    w-full
    max-w-[18rem]
    sm:max-w-[22rem]
    md:max-w-[26rem]
    lg:max-w-[30rem]
    h-auto
    object-contain
    "
    />
                <div className=" hidden md:block absolute -right-10 top-[50%] w-fit border-bright-sun-400 border rounded-lg p-2  backdrop-blur-md ">
                    <div className="text-center mb-1 text-mine-shaft-100">10K+ Got Job</div>
                <Avatar.Group>
                    <Avatar src="avatar.png" />
                    <Avatar src="avatar1.png" />
                    <Avatar src="avatar2.png" />
                    <Avatar>+9k</Avatar>
                    </Avatar.Group>
                </div>
                <div  className=" hidden md:flex absolute -left-5 top-[28%] w-fit border-bright-sun-400 border rounded-lg p-2  backdrop-blur-md  gap-3 flex flex-col">
                    <div className="flex gap-2 items-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
    <img
        src="/Icons/Google.png"
        alt="Google"
        className="w-8 h-8 object-contain"
    />
</div>
                        <div className="text-sm text-mine-shaft-100 ">
                            <div>Software Engineer</div>
                            <div className="text-mine-shaft-200 text-xs">New York</div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-around text-mine-shaft-200 text-xs">
                        <span>1 day ago </span>
                        <span>120 Applicants</span>
                    </div>
                </div>
            </div>
        </div>

      </div>

    );
}
export default DreamJob;