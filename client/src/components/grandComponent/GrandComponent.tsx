import React, { useEffect, useState } from "react";
import { ContactList } from "../contactList/ContactList";
import MessageBox from "../messageBox/MessageBox";
import LoginPage from "../loginPage/LoginPage";
import { Contact, TUser, User } from "../type";

const GrandComponent = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("http://localhost:3002/contacts")
      .then((response) => response.json())
      .then((contacts) => setContacts(contacts));
  }, []);

  const [choosenContact, setChoosenContact] = useState<Contact>();

  // const [user, setUser] = useState<TUser>();

  const [logedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (!user) return;
  //   fetch("http://localhost:3002/user")
  //     .then((response) => response.json())
  //     .then((user) => setUser(user));
  // }, []);

  const onContactClick = (id: string) => {
    setChoosenContact(contacts.find((contact) => contact.id === id));
  };
  const [isDark, setIsDark] = useState(false);

  const senderContact = contacts.find(
    (contact) => choosenContact && contact.id !== choosenContact.id
  );

  return (
    <div className="flex ">
      {logedIn ? (
        <div className="flex w-[100%] h-[100vh]">
          <ContactList
            contacts={contacts}
            isDark={isDark}
            setIsDark={setIsDark}
            onContactClick={onContactClick}
          />

          <MessageBox
            contact={choosenContact}
            isDark={isDark}
            senderContact={senderContact}
          />
        </div>
      ) : (
        <div
          style={{ backgroundImage: "url(bg.jpg)" }}
          className="flex justify-center items-center w-[100vw] h-[100vh]"
        >
          <LoginPage setLoggedIn={setLoggedIn} />
        </div>
      )}
    </div>
  );
};

export default GrandComponent;
