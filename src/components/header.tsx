import Link from "next/link";

const Header = () => {
  return (
    <header className="h-14 flex items-center px-6 max-w-5xl mx-auto">
      <Link href="/" className="font-bold font-mono">
        Stackzip
      </Link>
    </header>
  );
};

export default Header;
