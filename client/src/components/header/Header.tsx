import React, { useState } from "react";
import { HiOutlineBellSlash, HiOutlineCheckCircle } from "react-icons/hi2";
import { BsFlag } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import { Contact } from "../type";
type Props = {
  contact: Contact | undefined;
  isDark: boolean;
};
export function Header({ contact, isDark }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div
      className="w-[100%] h-[10vh] flex justify-between relative items-center "
      style={
        isDark
          ? { backgroundColor: "rgba(1,1,1,0.9)", color: "white" }
          : { backgroundColor: "#ffffff", color: "black" }
      }
    >
      <div className="absolute right-1 top-[50px] ">
        {isMenuOpen && (
          <div style={isDark ? { color: "white" } : { color: "black" }}>
            <div className="bg-white px-2 py-3">
              <p className="flex items-center gap-2">
                <HiOutlineBellSlash />
                Убрать звук
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineCheckCircle /> Выберите сообщения
              </p>
              <p className="flex items-center gap-2">
                <BsFlag />
                Пожаловаться
              </p>
              <p className="flex items-center gap-2">
                <MdOutlineDeleteOutline /> Покинуть группу
              </p>
            </div>
          </div>
        )}
      </div>
      {contact && (
        <div className="flex items-center gap-2">
          {<img className="w[40px] h-[40px]" src={contact.img} alt="" />}
          {contact.firstName} {contact.lastName}
        </div>
      )}
      <p className="mr-2">
        <FaEllipsisV onClick={handleToggleMenu} />
      </p>
    </div>
  );
}

// Этот код представляет собой React-компонент Header, который принимает пропс contact - объект,
//  представляющий контакт. Компонент выводит заголовок страницы, содержащий информацию о текущем контакте.

// Заголовок представлен в виде блока div, имеющего серый фон и высоту, равную 10% высоты экрана.

// Если проп contact не является пустым (truthy), то выводится блок div с изображением, именем
// и фамилией контакта. Изображение контакта указывается в атрибуте src тега img. Атрибут
//  className задает стили для изображения, чтобы оно было круглым и имело размеры 10 на 10 единиц.
//  Имя и фамилия контакта выводятся рядом с изображением.

// Если же проп contact является пустым (falsy), то ничего не выводится.
