import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import { login } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Login session</h1>
      <p className="text-2xl font-light text-white mt-5">
        Start to manage your projects {""}
        <span className=" text-red-500 font-bold">
          login session in this form
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 mt-5 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email account"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password account"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-red-600 hover:bg-red-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-300 font-normal"
        >
          Don't have an account? Create one
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-gray-300 font-normal"
        >
          Forgot password? Reset here
        </Link>
      </nav>
    </>
  );
}
