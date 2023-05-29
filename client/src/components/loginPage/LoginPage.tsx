import { useState } from "react";
import { TUser } from "../type";

type Props = {
  setLoggedIn: (arg: boolean) => void;
};

export function LoginPage({ setLoggedIn }: Props) {
  const [error, setError] = useState("");
  const [user, setUser] = useState<TUser>({
    id: "",
    login: "",
    password: "",
  });

  const onUserInput = (key: any) => (e: any) => {
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };

  const onLogin = async () => {
    const response = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: user.login, password: user.password }),
    });

    if (response.ok) {
      setLoggedIn(true);
    } else {
      setError("Неверный логин и пароль");
      if (user.login === "" && user.password === "") {
        setError("Поля не должны быть пустыми");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[300px] bg-gray-800/80 px-3 py-2">
      <p className="text-red-500">{error}</p>
      <input
        className="rounded-md border border-gray-400 px-2 outline-blue-500"
        placeholder="login"
        onChange={onUserInput("login")}
      />
      <input
        className="rounded-md border border-gray-400 px-2 outline-blue-500"
        placeholder="password"
        onChange={onUserInput("password")}
      />
      <div className="flex justify-end">
        <button className="bg-slate-500 w-[100px] rounded-md" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
export default LoginPage;
