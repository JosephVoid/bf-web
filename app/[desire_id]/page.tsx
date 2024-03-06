"use client";

import OfferList from "@/components/offer-list";
import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  PersonIcon,
  EyeOpenIcon,
  HandIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function SingleDesire() {
  const current_path = usePathname();
  return (
    <div className="flex flex-col">
      <div className="my-4 flex justify-between">
        <p className="text-sm flex items-center">
          <ClockIcon className="mr-1" /> Posted on 29/02/24
        </p>
        <p className="text-sm flex items-center">
          <PersonIcon className="mr-1" /> 5 want this
        </p>
        <p className="text-sm flex items-center">
          <EyeOpenIcon className="mr-1" /> 5 viewed this
        </p>
      </div>
      <div className="flex flex-col">
        <div className="w-full h-fit rounded-md mr-4 mb-8">
          <Image
            src={"/black_box.png"}
            alt="Desire"
            fill={true}
            objectFit="cover"
            className="rounded-md w-full !relative"
          />
        </div>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi
          voluptates numquam perspiciatis, amet repellendus debitis esse fugit
          nihil doloremque! Natus possimus earum impedit distinctio! Est
          voluptas quasi exercitationem architecto! Animi consequatur iusto,
          praesentium, commodi inventore recusandae sequi eaque, cum nostrum
          quis libero nesciunt amet cumque unde! Perferendis totam adipisci
          repellat, minus recusandae reprehenderit omnis, cupiditate veritatis,
          nobis ducimus ut! Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </p>
        <div className="flex justify-between mb-4">
          <Button variant={"ghost"}>
            <HandIcon className="mr-1" />I want this
          </Button>
          <Link href={`${current_path}/make-an-offer`}>
            <Button>Make an Offer</Button>
          </Link>
        </div>
        <div className="mt-4">
          <h3 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0 mb-4">
            Offers
          </h3>
          <Suspense fallback={<>Loading</>}>
            <OfferList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
