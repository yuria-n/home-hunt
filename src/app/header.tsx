import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-950 shadow-2xl">
      <nav
        aria-label="Global"
        className="h-12 flex items-center justify-between p-3 px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" aria-label="Homepage">
            <Image
              className="w-auto h-auto"
              src="/logo.svg"
              alt=""
              width={144}
              height={20}
              priority
              aria-hidden
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
