import {
  Avatar,
  Loader
} from "@mantine/core";

import {
  IconBell
} from "@tabler/icons-react";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getAllNotifications,
  readNotification
} from "../Services/NotificationService";

const NotificationPage = () => {

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [notifications,setNotifications] =
    useState<any[]>([]);

  const [loading,setLoading] =
    useState(true);

  const loadNotifications = async() => {

    try{

      const data =
        await getAllNotifications(
 currentUser.profileId
);

      setNotifications(data);

    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{

    loadNotifications();

  },[]);

  const handleNotificationClick =
    async(notification:any)=>{

      try{

        await readNotification(
          notification.id
        );

      }catch(error){
        console.log(error);
      }

      if(notification.route){
        navigate(notification.route);
      }
    };

  const formatTime=(time:string)=>{

    const now=new Date();

    const date=new Date(time);

    const diff=
      Math.floor(
        (now.getTime()-date.getTime())
        /(1000*60)
      );

    if(diff<1) return "Now";

    if(diff<60) return `${diff}m`;

    if(diff<1440)
      return `${Math.floor(diff/60)}h`;

    return `${Math.floor(diff/1440)}d`;
  };

  if(loading){

    return(
      <div className="h-[80vh] flex justify-center items-center">
        <Loader color="yellow"/>
      </div>
    )
  }

  return(

    <div className="bg-mine-shaft-950 min-h-[90vh] p-4 md:p-6">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-2 mb-6">

          <IconBell
            className="text-bright-sun-400"
          />

          <div className="text-3xl font-bold text-mine-shaft-100">
            Notifications
          </div>

        </div>

        <div className="flex flex-col gap-3">

          {
            notifications.length===0 ?

            <div className="text-center text-mine-shaft-400 mt-10">
              No Notifications
            </div>

            :

            notifications.map((item)=>(
              <div
                key={item.id}
                onClick={()=>
                  handleNotificationClick(item)
                }
              className={`
border
rounded-xl
p-4
cursor-pointer
transition-all
duration-300
flex
gap-4
items-start

${
  item.status === "UNREAD"
    ? "bg-yellow-500/10 border-yellow-500"
    : "bg-mine-shaft-900 border-mine-shaft-800"
}
`}
              >

                <Avatar
                  color="yellow"
                  radius="xl"
                >
                  <IconBell size={18}/>
                </Avatar>

                <div className="flex-1">

                  <div className="text-mine-shaft-100">
                    {item.message}
                  </div>

                  <div className="text-xs text-mine-shaft-400 mt-1">
                    {formatTime(item.timestamp)}
                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default NotificationPage;