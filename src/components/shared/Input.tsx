import type { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { FaCheck } from "react-icons/fa6"
import { LuEyeOff } from "react-icons/lu"
import { MdError, MdOutlineRemoveRedEye } from "react-icons/md"
import { RiLockLine } from "react-icons/ri"

type InputProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>
  placeholder: string
  icon: React.ReactNode
  type?: string
  register: UseFormRegister<TFieldValues>
  required?: boolean
  error?: boolean
  valid?: boolean
  errorMessage?: string
}

export const InputWithIcon = <TFieldValues extends FieldValues = FieldValues>({
  name,
  placeholder,
  icon,
  type = "text",
  register,
  required,
  error,
  valid,
  errorMessage,
}: InputProps<TFieldValues>) => {
  const bgColor = error ? "bg-[#F7E9EA]" : valid ? "bg-[#EDF7E8]" : "bg-[#f5f5f5]"

  const validationRules = {
    required: required ? "This field is required" : false,
    ...(type === "email" && {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    }),
  }

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)}
        className={`w-full p-3 ${bgColor} rounded border-0 pr-10 pl-10 outline-none`}
      />
      <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#666666]">
        {icon}
      </div>
      <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
        {error ? (
          <MdError className="h-5 w-5 text-[#A61D24]" />
        ) : valid ? (
          <FaCheck className="h-4 w-4 text-[#77C053]" />
        ) : null}
      </div>
      {errorMessage && <p className="mt-1 text-sm text-[#A61D24]">{errorMessage}</p>}
    </div>
  )
}

type PasswordInputProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>
  placeholder: string
  icon?: React.ReactNode
  type?: string
  register: UseFormRegister<TFieldValues>
  required?: boolean
  error?: boolean
  valid?: boolean
  errorMessage?: string
  show: boolean
  toggle: () => void
  validationRules?: object
}

export const PasswordInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  placeholder,
  show,
  toggle,
  register,
  error,
  valid,
  errorMessage,
  validationRules = {},
}: PasswordInputProps<TFieldValues>) => {
  const bgColor = error ? "bg-[#F7E9EA]" : valid ? "bg-[#EDF7E8]" : "bg-[#f5f5f5]"

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register(name, validationRules)}
        className={`w-full p-3 ${bgColor} rounded border-0 pr-10 pl-10 focus:ring-2 focus:ring-[#01589a]`}
      />
      <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#666666]">
        <RiLockLine className="h-5 w-5" />
      </div>
      <button
        title="toggle password"
        type="button"
        className="absolute top-1/2 right-8 -translate-y-1/2 transform text-[#666666]"
        onClick={toggle}
      >
        {show ? <MdOutlineRemoveRedEye className="h-5 w-5" /> : <LuEyeOff className="h-5 w-5" />}
      </button>
      <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
        {error ? (
          <MdError className="h-5 w-5 text-red-500" />
        ) : valid ? (
          <FaCheck className="h-4 w-4 text-green-600" />
        ) : null}
      </div>
      {errorMessage && <p className="mt-1 text-sm text-[#A61D24]">{errorMessage}</p>}
    </div>
  )
}
