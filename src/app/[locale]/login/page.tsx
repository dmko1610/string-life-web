import { useTranslations } from "next-intl";
import { login, signup } from "./actions";
import LoginForm from "./LoginForm";
import LanguageSwitcher from "../dashboard/LanguageSwitcher";

export default function Login() {
  const bt = useTranslations("Button");
  const t = useTranslations("Authentication");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-2xl fond-bold text-center text-gray-800 dark:text-white">
          {t("title")}
        </h1>
        <LoginForm />

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            formAction={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
            font-semibold py-2 px-4 rounded-lg transition"
          >
            {bt("login")}
          </button>
          <button
            type="submit"
            formAction={signup}
            className="w-full bg-gray-400 hover:bg-gray-700 
            dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold 
            py-2 px-4 rounded-lg transition"
          >
            {bt("signup")}
          </button>
        </div>
      </form>
    </div>
  );
}
