type Props = {
  name: string;
};

const AuthorAvatar = ({ name }: Props) => {
  const initial = name.trim().charAt(0);

  return (
    <div
      aria-hidden
      className="
        flex h-9 w-9 items-center justify-center
        rounded-full bg-gray-200
        text-sm font-semibold text-gray-600
      "
    >
      {initial}
    </div>
  );
};

export default AuthorAvatar;
