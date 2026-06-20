import { IconAnchor } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation } from "react-router-dom";

const SignUpPage = () => {

  const location = useLocation();

  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] overflow-hidden">

      {/* Mobile Layout */}
      <div className="md:hidden">

        <div className="flex justify-center pt-10 pb-8">
          <div className="flex items-center gap-2 text-bright-sun-400">
            <IconAnchor className="h-10 w-10" />
            <span className="text-3xl font-bold">
              JobHook
            </span>
          </div>
        </div>

        {isLogin ? <Login /> : <SignUp />}

      </div>

      {/* Desktop Layout */}
 {/* Desktop Layout */}
<div
  className={`
  hidden md:flex
  w-[150vw]
  h-screen
  transition-all
  duration-1000
  ease-in-out
  ${!isLogin ? "-translate-x-[50vw]" : "translate-x-0"}
  `}
>

  <Login />

  <div
  className={`
  w-[50vw]
  h-screen
  bg-mine-shaft-900
  flex
  flex-col
  items-center
  justify-center
  gap-5
  flex-shrink-0
  transition-all
  duration-1000
  ${!isLogin
    ? "rounded-r-[200px]"
    : "rounded-l-[200px]"
  }
  `}
>
  <div className="flex gap-2 items-center text-bright-sun-400">
    <IconAnchor
      className="h-16 w-16"
      stroke={2.5}
    />
    <div className="text-6xl font-semibold text-white">
      JobHook
    </div>
  </div>

  <div className="text-2xl text-mine-shaft-200 font-semibold">
    Find the Job made for You
  </div>
</div>

  <SignUp />

</div>

    </div>
  );
};

export default SignUpPage;