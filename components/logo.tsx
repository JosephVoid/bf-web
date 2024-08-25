import Image from "next/image";
import Link from "next/link";
import LangOption from "./LangOption";

export default function Logo() {
  return (
    <div className="h-fit rounded-md md:mr-3 md:mb-8 w-full flex md:justify-center justify-between items-center">
      <Link href={"/?sortby=Date&sortdir=Desc"}>
        <Image
          src="/bf-logo.svg"
          width={250}
          height={250}
          alt="logo"
          className="md:block hidden"
        />
        <Image
          src="/bf-logo-mobile.svg"
          width={200}
          height={30}
          alt="logo"
          className="md:hidden"
        />
      </Link>
      <div className="md:hidden">
        <LangOption />
      </div>
    </div>
  );
}
