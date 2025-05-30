import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuEyeOff } from "react-icons/lu";
import { MdError, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiLockLine } from "react-icons/ri";

type InputProps = {
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  register: any;
  required?: boolean;
  error?: boolean;
  valid?: boolean;
  errorMessage?: string;
};

export const InputWithIcon = ({
  name,
  placeholder,
  icon,
  type = "text",
  register,
  required,
  error,
  valid,
  errorMessage,
}: InputProps) => {
  const bgColor = error
    ? "bg-[#F7E9EA]"
    : valid
    ? "bg-[#EDF7E8]"
    : "bg-[#f5f5f5]";

  const validationRules = {
    required: required ? "This field is required" : false,
    ...(type === "email" && {
      pattern: {
        value:
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    }),
  };

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)}
        className={`w-full p-3 ${bgColor} rounded outline-none border-0 pl-10 pr-10`}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
        {icon}
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {error ? (
          <MdError className="text-[#A61D24] h-5 w-5" />
        ) : valid ? (
          <FaCheck className="text-[#77C053] h-4 w-4" />
        ) : null}
      </div>
      {errorMessage && (
        <p className="text-[#A61D24] text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export const PasswordInput = ({
  name,
  placeholder,
  show,
  toggle,
  register,
  error,
  valid,
  errorMessage,
  validationRules = {},
}: any) => {
  const bgColor = error
    ? "bg-[#F7E9EA]"
    : valid
    ? "bg-[#EDF7E8]"
    : "bg-[#f5f5f5]";

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register(name, validationRules)}
        className={`w-full p-3 ${bgColor} rounded border-0 focus:ring-2 focus:ring-[#01589a] pl-10 pr-10`}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
        <RiLockLine className="w-5 h-5" />
      </div>
      <button
        title="toggle password"
        type="button"
        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-[#666666]"
        onClick={toggle}
      >
        {show ? (
          <MdOutlineRemoveRedEye className="h-5 w-5" />
        ) : (
          <LuEyeOff className="h-5 w-5" />
        )}
      </button>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {error ? (
          <MdError className="text-red-500 h-5 w-5" />
        ) : valid ? (
          <FaCheck className="text-green-600 h-4 w-4" />
        ) : null}
      </div>
      {errorMessage && (
        <p className="text-[#A61D24] text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

type PhoneInputProps = {
  name: string
  placeholder?: string
  register: any
  setValue: any
  required?: boolean
  error?: boolean
  valid?: boolean
  errorMessage?: string
  defaultCountry?: string
  value?: string
}

