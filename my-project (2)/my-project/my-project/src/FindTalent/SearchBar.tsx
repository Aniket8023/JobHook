import { Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
const SearchBar=()=>{
    const [value,setValue]=useState<[number,number]>([1,100]);
return (
  <div className="flex flex-col lg:flex-row gap-4 px-4 md:px-5 py-6 !text-mine-shaft-100">

    <div className="w-full lg:w-auto flex items-center">
      <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
        <IconUserCircle size={20} />
      </div>

      <Input
        className="w-full [&_input]:!placeholder-mine-shaft-300"
        variant="unstyled"
        placeholder="Talent Name"
      />
    </div>

    {
      searchFields.map((item, index) => (
        <div
          key={index}
          className="w-full lg:w-1/5 flex items-center"
        >
          <div className="w-full">
            <MultiInput {...item} />
          </div>

          <Divider
            mx="xs"
            size="xs"
            orientation="vertical"
            className="hidden lg:block"
          />
        </div>
      ))
    }

    <div className="w-full lg:w-1/5 [&_.mantine-Slider-label]:!translate-y-10">

      <div className="flex text-sm justify-between">
        <div>Salary</div>
        <div>
          &#8377;{value[0]}LPA - &#8377;{value[1]}LPA
        </div>
      </div>

      <RangeSlider
        color="bright-sun.4"
        size="xs"
        value={value}
        labelTransitionProps={{
          transition: "skew-down",
          duration: 150,
          timingFunction: "linear",
        }}
        onChange={setValue}
      />
    </div>

  </div>
);}
export default SearchBar;