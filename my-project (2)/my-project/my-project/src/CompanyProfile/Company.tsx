import { Avatar, Divider, Tabs } from "@mantine/core";
import {IconBuilding, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

const Company=()=>{
    return <div className="w-full xl:w-3/4">
        <div className="relative">
        <img
        className="rounded-t-2xl h-40 md:h-56 w-full object-cover"
        src="/Profile/banner.jpg"
        alt=""
        />
        <div
        className="
        rounded-3xl
        h-24 w-24
        md:h-36 md:w-36
        p-3 md:p-5
        -bottom-10 md:-bottom-14
        absolute left-4
        border-4 md:border-8
        border-mine-shaft-950
        bg-mine-shaft-950
        flex items-center justify-center
        "
        >
    <IconBuilding className="w-full h-full text-bright-sun-400" />
  </div>
  </div> 
    <div className="px-3 mt-16 md:mt-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-3"><div className="text-2xl md:text-3xl font-semibold">
  Google
</div> <Avatar.Group>
      <Avatar src="avatar.png" />
      <Avatar src="avatar1.png" />
      <Avatar src="avatar2.png" />
      <Avatar>+10k</Avatar>
    </Avatar.Group></div>
        <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
          <IconMapPin className="h-5 w-5" stroke={1.5} />Mumbai maharasthra.
        </div>
        <Divider mx="xs" my="xl"/>
        <div>
            <Tabs variant="outline" radius="lg" defaultValue="first">
                <Tabs.List
                    className="
                    overflow-x-auto
                    flex-nowrap
                    whitespace-nowrap
                    [&_button]:!text-sm
                    md:[&_button]:!text-lg
                    font-semibold
                    mb-5
                    [&_button[data-active='true']]:text-bright-sun-400
                    "
                    >
                    <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                    <Tabs.Tab value="employees">Employees</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
                <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
                <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
            </Tabs> 
        </div>
    </div>
</div>
}
export default Company;