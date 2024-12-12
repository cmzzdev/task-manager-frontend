import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { updatePasswordWithToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) =>
    mutate({
      formData,
      token,
    });

  const password = watch("password");

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Repeat password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat your password"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repeat password is required",
              validate: (value) =>
                value === password || "The passwords are not the same",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Reset password"
          className="bg-red-600 hover:bg-red-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
