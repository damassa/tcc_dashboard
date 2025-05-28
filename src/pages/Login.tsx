import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      navigate("/series");
    } catch {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-primary-800 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-black/70 backdrop-blur rounded-2xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center text-white">
          World of Tokusatsu - Login Admin
        </h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/70">E-mail</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded-lg bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm text-white/70">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded-lg bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-purple-800 px-4 py-2 font-medium text-white hover:bg-primary-500 transition-colors cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
