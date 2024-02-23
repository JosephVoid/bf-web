import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image src="/logo-desktop.svg" width={150} height={150} alt="logo" />
    </div>
  );
}
