import { useState } from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import { ConfirmToken } from "../../types";

export default function NewPasswordPage() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Reset password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Set code that you recive {""}
        <span className=" text-red-500 font-bold"> via email</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
