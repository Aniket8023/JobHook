
import MultiInput from "./MultiInput";
import { Divider, RangeSlider } from "@mantine/core";
import { useState } from "react";

import { dropdownData } from "../Data/JobsData";
const SearchBar = (props: any) => {
    const [value, setValue] = useState<[number, number]>([1, 100]);

    const handleChange = (title: string, val: any) => {
        props.setFilter({ ...props.filter, [title]: val });
    };

    return (
    <div className="flex flex-wrap gap-4 px-4 md:px-5 py-6 !text-mine-shaft-100">
        
        

            {dropdownData.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center flex-1 min-w-[180px]"
                    >
                    <div className="w-full">
                        <MultiInput
                            {...item}
                            icon={item.icon}
                            title={item.title}
                            options={item.options}
                            value={props.filter[item.title]}
                            onChange={(val: any) =>
                                handleChange(item.title, val)
                            }
                        />
                    </div>

                    <Divider
                        mx="xs"
                        size="xs"
                        orientation="vertical"
                        className="hidden lg:block"
                    />
                </div>
            ))}

            <div className="flex-1 min-w-[220px] [&_.mantine-Slider-label]:!translate-y-10">
                <div className="flex text-sm justify-between mb-2">
                    <div>Salary</div>
                    <div>
                        ₹{value[0]}LPA - ₹{value[1]}LPA
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
                    onChange={(val) => {
                        setValue(val);
                        props.setFilter({
                            ...props.filter,
                            salary: val,
                        });
                    }}
                />
            </div>

        </div>

);
};
export default SearchBar;