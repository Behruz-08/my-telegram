import React, { useEffect, useState } from "react";
import { MessageList } from "../massageList/MassageList";
import { MessageInput } from "../massageInput/MassageInput";
import { Header } from "../header/Header";
import { Contact, Messages } from "../type";

type Props = {
  contact: Contact | undefined;
  isDark: boolean;
  senderContact: Contact | undefined;
};

const MessageBox = ({ contact, isDark, senderContact }: Props) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [contactId, setContactId] = useState("");

  const getMessages = () => {
    fetch(`http://localhost:3002/messages/${contactId}/`)
      .then((response) => response.json())
      .then((message) => setMessages(message));
  };
  useEffect(() => {
    if (!contact) return;
    setContactId(contact.id);
    fetch(`http://localhost:3002/messages/${contact.id}`)
      .then((response) => response.json())
      .then((message) => setMessages(message));
  }, [contact]);

  const handleMessageReceived = (newMessage: any) => {
    const message = {
      id: crypto.randomUUID(),
      text: newMessage,
      date: new Date().toLocaleTimeString(),
      senderId: "1",
      receiverId: contact?.id,
    };
    fetch("http://localhost:3002/create-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => getMessages())
      .catch((error) => console.error(error));
    // setGetMessages([...getMessages, message]);
  };

  return (
    <div
      className="w-[70%] h-[100vh]"
      style={
        !isDark
          ? {
              backgroundImage: "url(telegramme-20.png)",
            }
          : { backgroundImage: "url(telegramDark.jpg)" }
      }
    >
      <Header contact={contact} isDark={isDark} />
      <MessageList
        getMessages={getMessages}
        messages={messages}
        setMessages={setMessages}
        isDark={isDark}
      />
      <MessageInput onMessageSend={handleMessageReceived} isDark={isDark} />
    </div>
  );
};

export default MessageBox;
