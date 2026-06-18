import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";
import { motion } from "framer-motion";

const Working = () => {
  return (
    <div className="mt-20 pb-5">

      {/* Heading */}
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
        How it <span className="text-bright-sun-400">Works</span>
      </div>

      {/* Description */}
      <div
        className="
        text-sm
        sm:text-base
        text-mine-shaft-300
        text-center
        w-[90%]
        sm:w-[75%]
        md:w-1/2
        mx-auto
        mb-10
        "
      >
        Effortlessly navigate through the process and land your dream job.
      </div>

      {/* Content */}
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
        gap-12
        "
      >

        {/* Girl Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/Working/Girl.png"
            alt="girl"
            className="
            w-full
            max-w-[280px]
            sm:max-w-[380px]
            md:max-w-[450px]
            lg:max-w-[500px]
            "
          />

          <div
            className="
            absolute
            top-[18%]
            right-0
            w-28
            sm:w-36
            flex
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
            <Avatar
              className="!h-14 !w-14 sm:!h-16 sm:!w-16"
              src="avatar1.png"
            />

            <div className="text-xs sm:text-sm font-semibold text-mine-shaft-200 text-center">
              Complete your profile
            </div>

            <div className="text-[10px] sm:text-xs text-mine-shaft-300">
              70% Completed
            </div>
          </div>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          className="
          flex
          flex-col
          gap-8
          lg:gap-10
          "
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {work.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="flex items-center gap-4"
            >
              <div className="p-2.5 bg-bright-sun-300 rounded-full shrink-0">
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12"
                  src={`/Working/${item.name}.png`}
                  alt={item.name}
                />
              </div>

              <div>
                <div
                  className="
                  text-lg
                  sm:text-xl
                  font-semibold
                  text-mine-shaft-100
                  "
                >
                  {item.name}
                </div>

                <div
                  className="
                  text-sm
                  sm:text-base
                  text-mine-shaft-300
                  "
                >
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Working;