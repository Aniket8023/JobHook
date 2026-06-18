import {
  Indicator,
  Drawer,
  Burger
} from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [opened, setOpened] = useState(false);
  const user = localStorage.getItem("user");

  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="w-full bg-mine-shaft-950 px-3 md:px-6 text-white h-20 flex justify-between items-center"
    >
      <Link
        to="/"
        className="flex items-center gap-2"
      >
      <div className="flex gap-1 items-center text-bright-sun-400">
        <IconAnchor
          className="h-6 w-6 md:h-8 md:w-8"
          stroke={2.5}
        />
        <div className="text-xl md:text-3xl font-semibold">
          JobHook
        </div>
      </div>
      </Link>
      <div className="hidden lg:block">
        <NavLinks />
      </div>
      <div className="flex gap-2 md:gap-3 items-center">
              {user && (
                <>
                  <ProfileMenu />

                  <div className="bg-mine-shaft-900 p-2 rounded-full">
                    <Indicator
                      color="bright-sun.4"
                      offset={6}
                      size={8}
                      processing
                    >
                      <IconBell stroke={1.5} />
                    </Indicator>
                  </div>

                  {/* Desktop Settings */}
                  <div className="hidden lg:flex bg-mine-shaft-900 p-2 rounded-full">
                    <IconSettings stroke={1.5} />
                  </div>

                  {/* Mobile Burger */}
                  <div className="lg:hidden">
                    <Burger
                      opened={opened}
                      onClick={() => setOpened(!opened)}
                      color="white"
                      size="sm"
                    />
                  </div>
                </>
              )}
      </div>
      <Drawer
  opened={opened}
  onClose={() => setOpened(false)}
  title="Menu"
  position="right"
  size="70%"
>
  <NavLinks mobile />

  <div className="mt-6 border-t border-mine-shaft-700 pt-4">
    <div className="flex items-center gap-3 cursor-pointer text-lg">
      <IconSettings size={20} />
      <span>Settings</span>
    </div>
  </div>
</Drawer>
    </div>
    
  ) : (
    <></>
  );
};
export default Header;