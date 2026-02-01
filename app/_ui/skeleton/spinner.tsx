import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center p-6">
      <FaSpinner className="animate-spin text-4xl text-yellow-500" />
    </div>
  );
}