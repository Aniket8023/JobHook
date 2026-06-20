import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../Data/Data";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";

const JobCategory = () => {
  return (
    <div className="mt-20 pb-5">

      {/* Heading */}
      <motion.div
initial={{ opacity: 0, y: -30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.7 }}
className="
text-3xl
md:text-4xl
text-center
font-semibold
mb-3
text-mine-shaft-100
"
>
  Browse <span className="text-bright-sun-400">Job</span> Category
</motion.div>

      {/* Description */}
      <motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: 0.2 }}
className="
text-sm
sm:text-base
md:text-lg
mb-10
text-mine-shaft-300
text-center
w-[85%]
sm:w-[75%]
md:w-1/2
mx-auto
"
>
        Explore diverse job opportunities tailored to your
        skills. Start your career journey today!
    
      </motion.div>

      {/* Carousel */}
      <Carousel
        slideSize={{
  base: "70%",
  sm: "50%",
  md: "33.333%",
  lg: "22%",
}}
        slideGap="md"
        
        align="center"
        loop
className="
pt-4
px-4
focus-visible:[&_button]:!outline-none
[&_button]:!bg-bright-sun-400
[&_button]:!border-none
[&_button]:hover:opacity-75
[&_button]:!w-9
[&_button]:!h-9
"
        nextControlIcon={
          <IconArrowRight className="h-6 w-6" />
        }
        previousControlIcon={
          <IconArrowLeft className="h-6 w-6" />
        }
      >
        {jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{
  duration: 0.5,
  delay: index * 0.08
}}
whileHover={{
  scale: 1.03,
  transition: {
    duration: 0.25
  }
}}
className="
h-[220px]
sm:h-[240px]
flex
flex-col
justify-center
items-center
gap-3
border
border-bright-sun-400
hover:border-yellow-300
hover:shadow-[0_0_25px_rgba(255,193,7,0.45)]
rounded-xl
p-3
sm:p-4
text-center
bg-mine-shaft-900/40
backdrop-blur-sm
hover:shadow-[0_0_20px_rgba(255,193,7,0.35)]
transition-all
duration-300
"
>
<motion.div
animate={{
  y: [0, -4, 0]
}}
transition={{
  duration: 2,
  repeat: Infinity
}}
whileHover={{
  rotate: 360,
  scale: 1.15
}}

className="p-3 bg-bright-sun-300 rounded-full"
>
                <img
                  className="h-7 w-7"
                  src={`/Category/${category.name}.png`}
                  alt={category.name}
                />
              </motion.div>

              <div
                className="
                text-base
                sm:text-lg
                font-semibold
                text-mine-shaft-100
                "
              >
                {category.name}
              </div>

              <div
className="
text-sm
text-mine-shaft-300
leading-6
line-clamp-2
"
>
  {category.desc}
</div>

              <div
                className="
                text-bright-sun-300
                text-sm
                sm:text-base
                font-medium
                "
              >
                {category.jobs}+ new jobs posted
              </div>

       
   </motion.div> 
          </Carousel.Slide>
          
        ))}
      </Carousel>

    </div>
  );
};

export default JobCategory;