import { useState } from "react";
import { IconType } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  defaultValue: string;
  error?: string[];
  Icon?: IconType;
  isPassword?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  defaultValue,
  Icon,
  error,
  isPassword = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    // wrapper for Email
    <div className="mb-5">
      {/* Label */}
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      {/* Relative container for email and icon */}
      <div className="relative">
        <input
          type={isPassword && isPasswordVisible ? "text" : type}
          id={id}
          name={id}
          defaultValue={defaultValue}
          placeholder={label}
          className="peer block w-full rounded-md border border-gray-200  py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby={`${id}-error`}
        />

        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            {isPasswordVisible ? (
              <IoEyeOff aria-label="Hide password" />
            ) : (
              <IoEye aria-label="Show password" />
            )}
          </button>
        )}
      </div>

      {/* Error wrapper */}
      {error && (
        <div
          id={`${id}-error`}
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 text-right text-sm text-red-500"
        >
          {error.map((errMsg) => (
            <p key={`${id}-error`}>{errMsg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormInput;
