import Image from "next/image";

export default function Logo() {
  return (
    <div className="h-fit rounded-md mr-3 mb-3 w-full flex justify-center">
      <Image src="/logo-mobile.svg" width={250} height={250} alt="logo" />
    </div>
  );
}
