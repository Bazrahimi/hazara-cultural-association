import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";

const SocialAccount = () => {

  return (
    <div className="flex justify-between gap-4 md:gap-6 items-center my-4 ">
      <P className="text-gray-600 font-medium">Continue with</P>{" "}
      <div className="flex gap-4 md:gap-6">
        <Button variant="outline">
          <FaFacebook className="text-3xl" />
        </Button>
        <Button variant="outline">
          <FcGoogle className="text-3xl " />
        </Button>
        <Button variant="outline">
          <ImAppleinc className="text-3xl text-gray-700 " />
        </Button>
      </div>
    </div>
  );
};

export default SocialAccount;
