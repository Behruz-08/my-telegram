import { useState } from "react";
import { IoMdPaperPlane } from "react-icons/io";

type Props = {
  isDark: boolean;
  onMessageSend: (newMessage: any) => void;
};

export function MessageInput({ onMessageSend, isDark }: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault(); // отменяем действие по умолчанию
    onMessageSend(message); // вызываем функцию отправки сообщения, передавая ей текст сообщения
    setMessage(""); // очищаем поле ввода
  };

  // const darkMode = isDark ? "text-white" : "text-black";
  // const messageListStyle = ["h-[80vh]", darkMode].join(" ");

  return (
    // <div className="w-[100%] h-[10]">
    <div
      className="w-[100%] h-[10vh]  "
      style={
        isDark
          ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
          : { backgroundColor: "beige" }
      }
    >
      <form onSubmit={handleSubmit}>
        <input
          className="w-[90%] h-[40px]"
          style={
            isDark
              ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
              : { backgroundColor: "#ffffff" }
          }
          placeholder="enter the message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="w-[10%] h-[10vh] rounded-full"
          style={
            isDark
              ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
              : { backgroundColor: "#ffffff" }
          }
          type="submit"
        >
          <IoMdPaperPlane
            style={{ marginLeft: "25px", width: "20px", height: "5vh" }}
          />
        </button>
      </form>
    </div>
  );
}
