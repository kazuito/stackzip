import Link from "next/link";

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const Header = ({ children }: Props) => {
  return (
    <header className="h-14 flex items-center px-6 max-w-5xl mx-auto">
      <Link href="/" className="font-bold font-mono">
        Stackzip
      </Link>
    </header>
  );
};

export default Header;
