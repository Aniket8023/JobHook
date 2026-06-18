import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials=()=>{
return <div className="mt-20 pb-5">
<div
  className="
  text-2xl
  sm:text-3xl
  md:text-4xl
  text-center
  font-semibold
  mb-3
  text-mine-shaft-100
  "
>
  What <span className="text-bright-sun-400">User</span> says about us?
</div>
 <div
  className="
  flex
  flex-col
  lg:flex-row
  gap-4
  lg:gap-0
  justify-evenly
  items-center
  "
>
{
    testimonials.map((data,index)=><div
key={index}
className="
flex
flex-col
gap-3
w-[90%]
sm:w-[80%]
md:w-[70%]
lg:w-[23%]
border
border-bright-sun-400
p-3
rounded-xl
mt-4
lg:mt-10
hover:shadow-[0_0_10px_#fbbf24]
transition-all
duration-300
"
>
    <div className="flex gap-2 items-center">
        <Avatar className="!h-14 !w-14 " src="avatar.png" alt="it's me"/>
        <div>
            <div className="text-lg text-mine-shaft-100 font-semibold ">{data.name}</div>
            <Rating value={data.rating} fractions={2} readOnly />
        </div>
    </div>
    <div className="text-xs sm:text-sm text-mine-shaft-300">
  {data.testimonial}
</div>
</div>)
}

</div>
</div>
}
export default Testimonials;
