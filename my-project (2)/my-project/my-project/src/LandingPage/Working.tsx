import { Avatar } from "@mantine/core";
import { work } from "../Data/Data"


const Working=()=>{
 return   <div className="mt-20 pb-5">
 <div className="
text-2xl
sm:text-3xl
md:text-4xl
text-center
font-semibold
mb-3
text-mine-shaft-100
">How it <span className="text-bright-sun-400">Works
    </span></div>
 <div className="
text-sm
sm:text-base
text-mine-shaft-300
text-center
w-[90%]
sm:w-[70%]
md:w-1/2
mx-auto
mb-10
">Effortlessly navigate through
 the process and land your dream job.</div>
        <div
        className="
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        px-4
        sm:px-8
        lg:px-16
        gap-10
        "
        >
        <div className="relative" >
            <img
  className="
  w-full
  max-w-[260px]
  sm:max-w-[320px]
  md:max-w-[420px]
  lg:max-w-[500px]
  "
  src="/Working/Girl.png"
  alt="girl"
/>
            <div
className="
w-28
sm:w-36
flex
top-[18%]
right-0
absolute
flex-col
items-center
gap-1
border
border-bright-sun-400
backdrop-blur-md
rounded-xl
py-3
px-1
"
>
            <Avatar className="!h-16 !w-16" src="avatar1.png" alt="it's me" />
            <div className="text-sm font-semibold text-mine-shaft-200 text-center">Complete your profile </div>
            <div className="text-xs  text-mine-shaft-300 ">70% Completed </div>
            </div>
        </div>
            <div className="flex flex-col gap-10">
                {
                    work.map((item,index)=><div key={index} className=" flex items-center gap-4">
                    <div className="p-2.5  bg-bright-sun-300 rounded-full">
                        <img className="h-12 w-12" src={`/Working/${item.name}.png`} alt={item.name} />
                    </div>
                    <div>
                        <div className="text-mine-shaft-200 text-xl font-semibold">{item.name}</div>
                        <div className="text-mine-shaft-300">{item.desc}</div>
                            </div>
                    </div>)
                }
            </div>
        </div>
    </div> 

}
export default Working;