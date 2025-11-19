type AvatarInitialsProps = {
  initials: string | null | undefined;
};

export default function AvatarInitials({ initials }: AvatarInitialsProps) {
  if (!initials || initials.trim() === "") {
    return (
      <span className="hidden sm:inline text-sm font-medium">Account</span>
    );
  }

  return (
    <span
      className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full 
                 bg-hca-blue-dark text-white text-xs font-semibold shadow"
    >
      {initials}
    </span>
  );
}
