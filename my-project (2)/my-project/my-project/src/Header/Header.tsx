import {
  Indicator,
  Drawer,
  Burger
} from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconMessageCircle } from "@tabler/icons-react";
import { useEffect} from "react";
import { getNotifications } from "../Services/NotificationService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const user = localStorage.getItem("user");
  const [notificationCount, setNotificationCount] = useState(0);


 useEffect(() => {

  const loadNotifications = async () => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const data = await getNotifications(
        currentUser.profileId
      );

      setNotificationCount(data.length);

    } catch (error) {
      console.log(error);
    }
  };

  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 5000);

  return () => clearInterval(interval);

}, []);
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

              

                  <div
                      onClick={() => navigate("/notifications")}
                      className="bg-mine-shaft-900 p-2 rounded-full cursor-pointer"
                    >
                    <Indicator
                        color="red"
                        label={notificationCount}
                       disabled={notificationCount === 0}
                      >
                        <IconBell />
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