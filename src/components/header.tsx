import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import ExternalLink from "./external-link";

const Header = () => {
  return (
    <header className="mx-auto flex h-14 max-w-5xl items-center px-6 font-mono">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="Logo" width={32} height={32} className="mr-2 inline-block size-5" />
        <div className="font-semibold">Stackzip</div>
      </Link>
      <div className="ml-auto">
        <ExternalLink className="text-foreground/60" href="https://github.com/kazuito/stackzip">Source</ExternalLink>
      </div>
    </header>
  );
};

export default Header;
