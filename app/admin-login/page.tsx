import { useActionState } from "react";
import FormInput from "../ui/form/Input";
import { authenticate } from "../lib/action";

const LoginPage = () => {
  const {state, formAction, isPending} = useActionState(authenticate, undefined)
  return (
    <form action="">
      <h1>Login to access your admin account.</h1>
      
      {/* Grouping container */}
      <div className="w-full">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          defaultValue=""
         />


      </div>
    </form>
  )
}

export default LoginPage;