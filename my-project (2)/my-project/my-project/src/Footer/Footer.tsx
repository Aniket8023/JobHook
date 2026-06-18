import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTelegram,
  IconAnchor,
} from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";
import { useLocation } from "react-router-dom";


const Footer = () => {
  const location = useLocation();

  if (
    location.pathname === "/signup" ||
    location.pathname === "/login"
  ) {
    return null;
  }

  return (
    <footer className="bg-mine-shaft-950 pt-8 pb-4 px-9 font-['poppins']">
      <div
        className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-8
        justify-items-center
        w-full
      "
      >
        {/* JobHook */}
        <div className="flex flex-col gap-4">
          <div
            className="
            flex
            gap-2
            items-center
            text-bright-sun-400
            group
            cursor-pointer
          "
          >
            <IconAnchor
              className="
              h-
              w-6
              transition-all
              duration-300
              group-hover:rotate-12
            "
              stroke={2.5}
            />

            <div className="text-lg font-semibold text-bright-sun-400">
              JobHook
            </div>
          </div>

          <div className="text-sm text-mine-shaft-400 leading-7 max-w-[280px]">
            Your gateway to jobs, companies, and career opportunities.
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks.map((item, index) => (
          <div key={index}>
            <div className="text-lg font-semibold mb-1 text-bright-sun-400">
              {item.title}
            </div>

            {item.links.map((link, idx) => (
              <div
                key={idx}
                className="
                text-mine-shaft-300
                text-sm
                hover:text-bright-sun-400
                cursor-pointer
                mb-0
                hover:translate-x-1
                transition-all
                duration-300
                ease-in-out
                w-fit
              "
              >
                {link}
              </div>
            ))}
          </div>
        ))}

        {/* Divider */}
        <div className="col-span-2 lg:col-span-4 w-full mt-0">
          <div className="border-t border-mine-shaft-800"></div>
        </div>

        {/* Copyright */}
        {/* <div
          className="
          col-span-2
          lg:col-span-4
          text-center
          text-sm
          text-mine-shaft-400
        "
        >
          © {new Date().getFullYear()} JobHook. All Rights Reserved.
        </div> */}

        {/* Developer */}
        <div
          className="
          col-span-2
          lg:col-span-4
          text-center
          text-xl
          font-medium
          text-mine-shaft-300
        "
        >
          Designed & Developed By{" "}
          <span className="text-bright-sun-400 font-bold">
            Aniket Solanke
          </span>
        </div>

        {/* Social Icons */}
        {/* Social Icons */}
<div
  className="
  col-span-2
  lg:col-span-4
  flex
  justify-center
  gap-4
  mt-2
  flex-wrap
  "
>
  <a
    href="https://github.com/Aniket8023"
    target="_blank"
    rel="noreferrer"
    className="
    h-14
    w-14
    rounded-full
    bg-mine-shaft-900
    flex
    items-center
    justify-center
    text-bright-sun-400
    transition-all
    duration-300
    hover:scale-110
    hover:bg-mine-shaft-800
    hover:shadow-[0_0_15px_#fbbf24]
    "
  >
    <IconBrandGithub size={26} />
  </a>

  <a
    href=" https://www.linkedin.com/in/aniket-solanke-0a993325a/ "
    target="_blank"
    rel="noreferrer"
    className="
    h-14
    w-14
    rounded-full
    bg-mine-shaft-900
    flex
    items-center
    justify-center
    text-bright-sun-400
    transition-all
    duration-300
    hover:scale-110
    hover:bg-mine-shaft-800
    hover:shadow-[0_0_15px_#fbbf24]
    "
  >
    <IconBrandLinkedin size={26} />
  </a>

  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noreferrer"
    className="
    h-14
    w-14
    rounded-full
    bg-mine-shaft-900
    flex
    items-center
    justify-center
    text-bright-sun-400
    transition-all
    duration-300
    hover:scale-110
    hover:bg-mine-shaft-800
    hover:shadow-[0_0_15px_#fbbf24]
    "
  >
    <IconBrandInstagram size={26} />
  </a>

  

  

  <a
    href="https://telegram.org/"
    target="_blank"
    rel="noreferrer"
    className="
    h-14
    w-14
    rounded-full
    bg-mine-shaft-900
    flex
    items-center
    justify-center
    text-bright-sun-400
    transition-all
    duration-300
    hover:scale-110
    hover:bg-mine-shaft-800
    hover:shadow-[0_0_15px_#fbbf24]
    "
  >
    <IconBrandTelegram size={26} />
  </a>
</div>
      </div>
    </footer>
  );
};

export default Footer;