import { Link, useLocation } from "react-router-dom";

type NavLink = {
  name: string;
  url: string;
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const links: NavLink[] = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Post Job", url: "post-job" },
    { name: "Recommended Jobs", url: "posted-job" },
    { name: "Job History", url: "job-history" },
    { name: "SignUp", url: "signup" },
    { name: "Login", url: "login" },
  ];

  const location = useLocation();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-5 items-start text-lg"
          : "flex gap-5 items-center"
      }
    >
      {links.map((link, index) => {
        if (user && (link.url === "signup" || link.url === "login"))
          return null;

        if (
          user &&
          user.accountType === "JOB_SEEKER" &&
          link.url === "post-job"
        )
          return null;

        const isActive = location.pathname === `/${link.url}`;

        return (
          <div
            key={index}
           className={`
            ${
              isActive
                ? "text-bright-sun-400"
                : "text-white"
            }
            ${
              mobile
                ? `${isActive ? "border-l-4 border-bright-sun-400 pl-3" : "pl-3"}`
                : `${
                    isActive
                      ? "border-t-[3px] border-bright-sun-400 h-full flex items-center"
                      : "border-t-[3px] border-transparent h-full flex items-center"
                  }`
            }
          `}
          >
            <Link to={`/${link.url}`}>{link.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;