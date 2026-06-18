import { Menu, Avatar, Switch, Group, Text } from '@mantine/core';
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile } from "../Services/UserService";
import ResumeModal from "./ResumeModal";


const ProfileMenu = () => {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [resumeOpened, setResumeOpened] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

 
  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const userData = JSON.parse(storedUser);

    getProfile(userData.profileId || userData.id)
      .then((profileData: any) => {
        setUser({
          ...userData,
          picture: profileData.picture
        });
      })
      .catch((err) => console.log(err));
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

 
  
  return (
  <>
    <Menu shadow="md"  width={250} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <Group gap="xs" style={{ cursor: "pointer" }}>
          <Text
            size="sm"
            fw={500}
            className="hidden md:block"
          >
            {user?.name || "Guest"}
          </Text>

          <Avatar size="md"
            src={
              user?.picture
                ? `data:image/jpeg;base64,${user.picture}`
                : "/avatar.png"
            }
            alt={user?.name}
            radius="xl"
          />
        </Group>
      </Menu.Target>

      <Menu.Dropdown className="min-w-[220px]">

        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>

        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>

      <Menu.Item
        leftSection={<IconFileText size={14} />}
        onClick={() => setResumeOpened(true)}
      >
        Resume
      </Menu.Item>

        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="dark.4"
              onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
              offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout2 size={14} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>

    {/* Resume Modal */}
    <ResumeModal
      opened={resumeOpened}
      onClose={() => setResumeOpened(false)}
    />
  </>
);
}
export default ProfileMenu;