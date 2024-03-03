"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { AvatarIcon, Cross1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { TagSelect } from "./display-params";
import { Badge } from "./ui/badge";

export default function PostDesireForm() {
  const form = useForm();
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Post a Desire</h2>
      <div className="rounded-md border-[1px] p-4 mb-8">
        <Form {...form}>
          <div className="flex flex-col relative">
            <div className="mb-4 flex">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title</FormLabel>
                    <FormControl className="">
                      <Input placeholder="Desire title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4 flex">
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Tell us about you"
                        {...field}
                        rows={6}
                        className="p-2 text-sm border-[1px] rounded-md focus-visible:outline-none focus:outline-2 focus:outline"
                      ></textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4 flex space-x-5">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Ideal Price in Birr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4 flex">
              <div className="w-1/2">
                <Label htmlFor="picture">Supporting Picture (Optional)</Label>
                <Input type="file" id="picture" />
              </div>
              <div className="flex justify-center items-center w-1/2">
                <AvatarIcon width={50} height={50} />
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <div className="flex space-x-5 items-center mb-4">
                <TagSelect tags={frameworks} />
                <div className="flex space-x-3">
                  <Badge className="text-sm" variant={"outline"}>
                    Electornics
                    <Cross1Icon className="ml-2" />
                  </Badge>
                  <Badge variant={"outline"}>
                    Electornics <Cross1Icon className="ml-2" />
                  </Badge>
                </div>
              </div>
            </div>
            <Button className="w-1/4">Post</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
