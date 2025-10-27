import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api, { notAuthApi } from "../api/api";
import { LogIn } from "lucide-react";

const Login: React.FC = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await notAuthApi.post("/api/v1/login", {
        email: credential.email,
        senha: credential.password,
      });

      const { token } = response.data;
      localStorage.setItem("jwt", token);

      const user = await api.get("/api/v1/users/me");

      navigate("/");

      // const localApi = axios.create({
      //   baseURL: import.meta.env.VITE_API_URL,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //     "Access-Control-Allow-Origin": "http://localhost:3001",
      //   },
      // });

      localStorage.setItem("user", JSON.stringify(user.data));
    } catch (error) {
      setError("Falha no login. Cheque suas credenciais.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-800 bg-zinc-900/80 backdrop-blur-md">
        <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
          <LogIn className="w-6 h-6 text-purple-500" />
          Entrar no Dashboard
        </h2>

        <form onSubmit={handleLogin} className="space-y-5 text-white">
          <input
            name="email"
            autoComplete="off"
            placeholder="Email"
            onChange={handleChange}
            className="bg-zinc-800 text-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />
          <input
            autoComplete="off"
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
            className="bg-zinc-800 text-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />

          {error && (
            <div className="text-red-400 text-sm font-medium">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 transition-colors p-3 rounded-xl font-semibold shadow-lg cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
