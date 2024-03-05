"use client";

import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Offer() {
  const current_path = usePathname();
  return (
    <Link href={`${current_path}/0`}>
      <Card className="p-4 mb-5 flex flex-col">
        <div className="flex justify-start">
          <Image
            src={"/sample.jpg"}
            height={150}
            width={150}
            alt="desire"
            className="rounded-md mr-5"
          />
          <div className="flex flex-col justify-between">
            <div>
              <small className="text-sm font-normal line-clamp-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                quae recusandae quaerat commodi vero tenetur possimus quos
                distinctio fugit sed dolor sapiente architecto, quidem error est
                beatae, alias corporis magnam? recusandae quaerat commodi vero
                tenetur possimus quos distinctio fugit sed dolor sapiente
                architecto, quidem error est beatae, alias corporis magnam?
              </small>
            </div>
            <p className="text-sm">
              Offering for
              <b> 800 Br</b>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function OfferList() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <Offer key={index} />
      ))}
    </div>
  );
}
