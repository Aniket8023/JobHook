import {
  Avatar,
  ActionIcon,
  Loader,
  TextInput,
} from "@mantine/core";

import {
  IconArrowLeft,
  IconSend,
} from "@tabler/icons-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProfile,
} from "../Services/UserService";

import {
  getConversation,
  sendMessage,
} from "../Services/MessageService";

const ChatPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const receiverId = Number(id);

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const senderId = currentUser.profileId;

  const [receiver, setReceiver] = useState<any>(null);

  const [messages, setMessages] = useState<any[]>([]);

  const [message, setMessage] = useState("");

  // Load Profile
  const loadProfile = async () => {
    try {
      const data = await getProfile(receiverId);
      setReceiver(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Messages
  const loadMessages = async () => {
    try {
      const res = await getConversation(
            senderId,
            receiverId
            );

            setMessages(res);
    } catch (error) {
      console.log(error);
    }
  };

  // const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({
  //     behavior: "smooth"
  //   });
  // }, [messages]);

  // Send Message
  const handleSend = async () => {

    if (!message.trim()) return;

    try {

      await sendMessage({

        senderProfileId: senderId,

        receiverProfileId: receiverId,

        message: message

      });

      setMessage("");

      loadMessages();

    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {

    loadProfile();

    loadMessages();

    const interval = setInterval(() => {

      loadMessages();

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  if (!receiver) {

    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Loader color="yellow" />
      </div>
    );
  }

  

  return (

    <div className="bg-mine-shaft-950 min-h-[90vh] p-4 md:p-6">

      <div className="max-w-5xl mx-auto bg-mine-shaft-900 rounded-2xl border border-mine-shaft-800 overflow-hidden">

        {/* Header */}

        <div
          className="
          flex
          items-center
          gap-4
          px-5
          py-4
          border-b
          border-mine-shaft-800
          "
        >

          <ActionIcon
            variant="subtle"
            color="bright-sun.4"
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft />
          </ActionIcon>

          <Avatar
            size="lg"
            src={
              receiver.picture
                ? `data:image/jpeg;base64,${receiver.picture}`
                : "/avatar.png"
            }
          />

          <div>

            <div className="text-lg font-semibold text-mine-shaft-100">
              {receiver.name}
            </div>

            <div className="text-sm text-mine-shaft-300">
              {receiver.jobTitle}
            </div>

          </div>

        </div>

        {/* Messages */}

        <div
          className="
          h-[65vh]
          overflow-y-auto
          p-5
          flex
          flex-col
          gap-4
          "
        >

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.senderProfileId === senderId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`
                  max-w-[75%]
                  px-4
                  py-3
                  rounded-2xl
                  ${
                    msg.senderProfileId === senderId
                      ? "bg-bright-sun-400 text-black rounded-br-sm"
                      : "bg-mine-shaft-800 text-mine-shaft-100 rounded-bl-sm"
                  }
                  `}
                >

                  <div>
                    {msg.message}
                  </div>

                  <div
                    className={`
                    text-[10px]
                    mt-1
                    ${
                      msg.senderProfileId === senderId
                        ? "text-black/70"
                        : "text-mine-shaft-400"
                    }
                    `}
                  >
                    {
                      msg.sentAt
                        ? new Date(msg.sentAt)
                            .toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                        : ""
                    }
                  </div>

                </div>

              </div>

            ))
          }

        </div>

        {/* Footer */}

        <div
          className="
          border-t
          border-mine-shaft-800
          p-4
          "
        >

          <div className="flex gap-3 items-center">

            <TextInput
              className="flex-1"
              placeholder="Type a message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              styles={{
                input: {
                  backgroundColor: "#2d2d2d",
                  border: "1px solid #454545",
                  color: "white",
                  height: "50px",
                },
              }}
            />

            

            <ActionIcon
              size={50}
              radius="xl"
              color="bright-sun.4"
              variant="filled"
              onClick={handleSend}
            >
              <IconSend size={22} />
            </ActionIcon>

          </div>
          {/* <div ref={bottomRef}></div> */}

        </div>

      </div>

    </div>

  );
};

export default ChatPage;