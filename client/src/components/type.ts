export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  Text: string;
  img: string;
};
export type User = {
  id: string;
  login: string;
  password: number;
  firstName: string;
  lastName: string;
  status: boolean;
  phone: number;
  email: string;
  img?: string;
};

export type Messages = {
  id?: string;
  text: string;
  date: string;
  senderId: string;
  receiverId: string;
};

export type TUser = {
  id: string;
  login: string;
  password: string;
};
