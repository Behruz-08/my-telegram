import { useState } from "react";
import { Messages } from "../type";

type Props = {
  message: Messages;
  onUpdate: (updatedMessage: any) => void;
  getMessages: () => void;
};

export const EditMessage = ({ message, onUpdate, getMessages }: Props) => {
  const [text, setText] = useState(message.text);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://127.0.0.1:3002/edit-messages/${message.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
    const updatedMessage = await response.json();
    onUpdate(updatedMessage);
    getMessages();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-red-400 font-normal"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-blue-500 px-3" type="submit">
        Update
      </button>
    </form>
  );
};
