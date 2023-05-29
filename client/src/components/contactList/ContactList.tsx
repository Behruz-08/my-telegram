import React, { useState } from "react";
import { HiOutlineViewList } from "react-icons/hi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { CiUser, CiSettings } from "react-icons/ci";
import { BsMoonStars } from "react-icons/bs";
import { FaHubspot } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { AiOutlineBug } from "react-icons/ai";
import { TbLetterK } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";
// import { BsPersonFillX } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { Contact } from "../type";

type Props = {
  contacts: Contact[];
  onContactClick: (id: string) => void;
  isDark: boolean;
  setIsDark: (fals: boolean) => void;
};

export function ContactList({
  contacts,
  onContactClick,
  isDark,
  setIsDark,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(true);
  };

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const darkMode = isDark ? "bg-black/90" : "";

  const contactListStyle = ["w-[30%] bg-#ffffff h-[100vh]", darkMode].join(" ");

  const darkText = isDark ? "text-white" : "text-black";

  const contactStyle = ["flex gap-2 ml-3 items-center", darkText].join(" ");

  return (
    <div className={contactListStyle}>
      <div className="relative flex flex-col gap-2">
        <HiOutlineViewList
          className="absolute top-3 left-2"
          style={
            isDark
              ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
              : { backgroundColor: "#ffffff" }
          }
          onClick={handleToggleMenu}
        />
        <div>
          {isMenuOpen && (
            <div className="absolute top-10 bg-white px-2 py-2">
              <p className="flex items-center gap-2">
                <FiBookmark className="" />
                Избранное
              </p>
              <p className="flex items-center gap-2">
                <CiUser />
                Контакты
              </p>
              <p className="flex items-center gap-2">
                <CiSettings />
                Настройки
              </p>
              {
                <button onClick={handleToggleDarkMode}>
                  {isDark ? (
                    <p className="flex items-center gap-2">
                      темная тема
                      <FaToggleOn onClick={handleToggleDarkMode} />
                    </p>
                  ) : (
                    <p className="flex items-center gap-2">
                      светлая тема
                      <FaToggleOff onClick={handleToggleDarkMode} />
                    </p>
                  )}
                </button>
              }
              <p className="flex items-center gap-2">
                <FaHubspot /> Анимация <FaToggleOn />
              </p>
              <p className="flex items-center gap-2">
                <RxQuestionMarkCircled />
                Вазможности телеграм
              </p>
              <p className="flex items-center gap-2">
                <AiOutlineBug />
                Report Bug
              </p>
              <p className="flex items-center gap-2">
                <TbLetterK /> Swith to K Version
              </p>
              <p
                className="flex gap-3 items-center hover:bg-red-950  w-[100%] rounded cursor-pointer"
                style={{ color: "red" }}
              >
                <IoExitOutline /> Выход
              </p>
            </div>
          )}
        </div>
        <div className="ml-[30px] mt-0">
          <input
            className="w-[90%] outline-blue-400 border border-gray-400 px-2"
            style={
              isDark
                ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
                : { backgroundColor: "#ffffff" }
            }
            type="text"
            placeholder="Поиск"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {isInputFocused && searchTerm.length > 0 && (
            <IoCloseOutline
              className="absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 cursor-pointer hover:text-red-500"
              onClick={() => setSearchTerm("")}
              // ContactList
              // onClose={() => setShowContacts(false)}
            />
          )}
        </div>
        {filteredContacts.map((contact) => (
          <div
            className={contactStyle}
            key={contact.id}
            onClick={() => onContactClick(contact.id)}
          >
            <div>
              <img
                src={contact.img}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="cursor-pointer">
              {contact.firstName} {contact.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
