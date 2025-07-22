import Link from "next/link";

const Header = () => {
  return (
    <header className="mx-auto flex h-14 max-w-5xl items-center px-6">
      <Link href="/" className="font-mono font-bold">
        Stackzip
      </Link>
    </header>
  );
};

export default Header;
