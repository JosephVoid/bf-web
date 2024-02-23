import Image from "next/image";

export default function Logo() {
  return (
    <div className="h-fit p-4 bg-brand-grey rounded-md mr-3 mb-3 w-full flex justify-center">
      <Image src="/logo-desktop.svg" width={150} height={150} alt="logo" />
    </div>
  );
}
