import Image from "next/image";
import Link from "next/link";

export function BifaLogo() {
  return (
    <Link href="/" className="group relative flex items-center">
      {/* Glow */}
      <span className="absolute inset-0 rounded-full bg-[#8a1818]/30 blur-xl opacity-0 group-hover:opacity-100 transition" />

      <Image
        src="/bifa.png"
        alt="Bifa"
        width={120}
        height={60}
        priority
        className="
          relative
          transition
          duration-300
          group-hover:scale-105
          group-hover:-rotate-1
        "
      />
    </Link>
  );
}
