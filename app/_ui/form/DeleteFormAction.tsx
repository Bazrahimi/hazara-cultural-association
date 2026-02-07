"use client"
import { ButtonVariant } from "./Button";
import Button from "./Button";

const DeleteFormAction = (args: {
  id: number;
  variant: ButtonVariant;
  children: React.ReactNode;
  action: (formData: FormData) => Promise<void>;
}) => {
  return (
    <form action={args.action}>
      <input type="hidden" name="postId" value={args.id} />
      <Button
        variant={args.variant}
        aria-label={`Delete this ${args.id}`}
        onClick={(e) => {
          if (!confirm("Delete this enquiry? this cannot be undone."))
            e.preventDefault();
        }}
      >
        {args.children}
      </Button>
    </form>
  );
};

export default DeleteFormAction;
