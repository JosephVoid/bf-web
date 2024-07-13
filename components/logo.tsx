import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/?sortby=Date&sortdir=Desc"}>
      <div className="h-fit rounded-md md:mr-3 md:mb-8 w-full flex md:justify-center justify-start">
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
      </div>
    </Link>
  );
}
