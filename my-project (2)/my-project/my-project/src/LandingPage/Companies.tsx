import{ companies } from "./Data";
import Marquee from "react-fast-marquee";

const Companies = () => {
  return (
    <div className="mt-16 md:mt-20 pb-5">

      <div
        className="
        text-2xl
        md:text-3xl
        lg:text-4xl
        text-center
        font-semibold
        mb-10
        text-mine-shaft-100
        "
      >
        Trusted By{" "}
        <span className="text-bright-sun-400">1000+</span> Companies
      </div>

      <Marquee
        pauseOnHover={true}
        speed={50}
        gradient={false}
      >
        {companies.map((company, index) => (
          <div
            key={index}
            className="
            mx-8
            flex
            items-center
            justify-center
            "
          >
            <img
              src={company.logo}
              alt={company.name}
              className="
              h-10
              md:h-14
              w-auto
              object-contain
              hover:scale-110
              transition-all
              duration-300
              "
            />
          </div>
        ))}
      </Marquee>

    </div>
  );
};

export default Companies;
