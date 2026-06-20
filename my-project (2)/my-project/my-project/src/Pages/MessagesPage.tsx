import { Avatar, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserMessages } from "../Services/MessageService";
import { getProfile } from "../Services/UserService";

const MessagesPage = () => {

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const profileId = currentUser.profileId;

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadConversations = async () => {

    try {

      const msgs = await getAllUserMessages(profileId);
console.log(msgs);
      const uniqueIds = [
        ...new Set(
          msgs.map((msg:any) =>
            msg.senderProfileId === profileId
              ? msg.receiverProfileId
              : msg.senderProfileId
          )
        )
      ];

      const profiles = await Promise.all(

  uniqueIds.map(async(id:any)=>{

    const profile = await getProfile(id);

    const conversation = msgs.filter(
      (msg:any)=>

      (msg.senderProfileId===profileId &&
       msg.receiverProfileId===id)

      ||

      (msg.senderProfileId===id &&
       msg.receiverProfileId===profileId)

    );

    const lastMessage =
      conversation[conversation.length-1];

    return {

      ...profile,

      lastMessage:
      lastMessage?.message || "",

       lastMessageTime:
    lastMessage?.sentAt || null

    };

  })

);

      setUsers(profiles);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Loader color="yellow" />
      </div>
    );
  }


  const formatTime = (dateString: string) => {

  if (!dateString) return "";

  const now = new Date();
  const msgTime = new Date(dateString);

  const diffMs = now.getTime() - msgTime.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return "Now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }

  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  if (diffDays < 7) {
    return `${diffDays}d`;
  }

  return msgTime.toLocaleDateString();
};

  return (

    <div className="bg-mine-shaft-950 min-h-[90vh] p-5">

      <div className="max-w-5xl mx-auto">

        <div className="text-3xl font-bold text-mine-shaft-100 mb-5">
          Messages
        </div>

        <div className="bg-mine-shaft-900 rounded-xl border border-mine-shaft-800">

          {
            users.map((user) => (

              <div
                key={user.id}
                onClick={() =>
                  navigate(`/chat/${user.id}`)
                }
                className="
                flex
                items-center
                gap-3
                p-4
                border-b
                border-mine-shaft-800
                hover:bg-mine-shaft-800
                cursor-pointer
                transition-all
                "
              >

                <Avatar
                  size="lg"
                  src={
                    user.picture
                      ? `data:image/jpeg;base64,${user.picture}`
                      : "/avatar.png"
                  }
                />

                <div className="flex-1">

                <div className="font-semibold text-mine-shaft-100">
                    {user.name}
                </div>

                <div className="text-sm text-mine-shaft-300 truncate">
                    {user.lastMessage}
                </div>

                </div>

                <div className="text-xs text-mine-shaft-500 whitespace-nowrap">
                       {formatTime(user.lastMessageTime)}
                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default MessagesPage;