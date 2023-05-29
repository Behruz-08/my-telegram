import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { Messages } from "../type";
import { EditMessage } from "./EditMessage";

type Props = {
  isDark: boolean;
  messages: Messages[];
  setMessages: Dispatch<SetStateAction<Messages[]>>;
  getMessages: () => void;
};

export function MessageList({
  isDark,
  messages,
  setMessages,
  getMessages,
}: Props) {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const darkMode = isDark ? "text-white" : "text-black";
  const messageListStyle = ["h-[80vh]  ", darkMode].join(" ");

  const [editingMessageId, setEditingMessageId] = useState<
    string | undefined
  >();

  const handleUpdateMessage = (updatedMessage: Messages) => {
    const messegeFindForEditIndex = messages.findIndex(
      (message) => message.id === updatedMessage.id
    );
    if (!messegeFindForEditIndex) return;
    const updatedMessages = [...messages];
    updatedMessages[messegeFindForEditIndex] = updatedMessage;
    setMessages(updatedMessages);
    setEditingMessageId(undefined);
  };
  const deleteMessage = async (id: string | undefined) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3002/delete-messages/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMessages(messages.filter((message) => message.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-auto  ">
      <div className={messageListStyle}>
        {messages.length > 0 &&
          messages.map((message) => (
            <div
              className="   flex justify-between  px-2 py-3 bg-white w-[50%] mt-2 ml-2 rounded-xl text-right"
              style={
                isDark
                  ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
                  : { backgroundColor: "#ffffff" }
              }
              key={message.id}
            >
              <h1
                className=""
                style={
                  isDark
                    ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
                    : { backgroundColor: "#ffffff" }
                }
              >
                {message.text}- {message.date}
              </h1>
              <div className="flex gap-2  ">
                {editingMessageId === message.id ? (
                  <EditMessage
                    message={message}
                    onUpdate={handleUpdateMessage}
                    getMessages={getMessages}
                  />
                ) : (
                  <AiOutlineEdit
                    onClick={() => setEditingMessageId(message.id)}
                  />
                )}
                <AiFillDelete onClick={() => deleteMessage(message.id)} />
              </div>
            </div>
          ))}
        <div ref={ref} />
      </div>
    </div>
  );
}
