import { z } from "zod";
import { LoginState } from "./definitions";
import { LoginSchema } from "./schema";
import { lusitana } from "./font";

export const authenticate = async (
  prevState: LoginState,
  formData: FormData
) => {
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;

  const validated = LoginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  // // if form field invalid, return early
  // if (!validated.success) {
  //   const tree = z.treeifyError(validated.error);
  //   // Map to your expected fieldErrors shape

  //   return {
  //     email: rawEmail,
  //     password: rawPassword,
  //     errors: {
  //       email: tree.properties?.email?.errors,
  //       password: tree.properties?.password?.errors ,
  //     },
  //   };
  // }

    // if form field invalid, return early
  if (!validated.success) {
    return {
      email: rawEmail,
      password: rawPassword,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;

  try {
  } catch (error) {
    console.error("Failed to login", error);
    return {
      email,
      password,
      message:
        "An error occurred while processing your request. Please try again.",
    };
  }
};
