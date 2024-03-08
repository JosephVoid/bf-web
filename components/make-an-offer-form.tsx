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
import { AvatarIcon, ImageIcon, Pencil2Icon } from "@radix-ui/react-icons";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";

const MAX_PIC_SIZE = 1000000;

const formSchema = z.object({
  description: z
    .string()
    .max(500, "Description too long")
    .min(2, "Description too short"),
  price: z.coerce
    .number()
    .lte(999999, "Price too large")
    .gt(0, "Price must be more than 1"),
  picture: z
    .custom<File>()
    .refine((file) => {
      if (!file) return true;
      return file.size < MAX_PIC_SIZE;
    }, "Image too big")
    .optional(),
});

export default function MakeAnOfferForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      price: 0,
    },
  });

  const [picturePreview, setPicturePreview] = React.useState<File | null>();

  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Make an Offer</h2>
      <div className="rounded-md border-[1px] p-4 mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            <div className="flex flex-col relative">
              <div className="mb-4 flex">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Add a description about your offer"
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
                      <FormLabel>Offered Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price"
                          {...field}
                          type="number"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 flex">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="picture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supporting Picture</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(
                                e.target.files ? e.target.files[0] : null
                              );
                              setPicturePreview(
                                e.target.files ? e.target.files[0] : null
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-center items-center w-1/2">
                  {picturePreview ? (
                    <Image
                      src={URL.createObjectURL(picturePreview)}
                      width={150}
                      height={150}
                      alt="profile"
                    />
                  ) : (
                    <ImageIcon width={50} height={50} className="opacity-50" />
                  )}
                </div>
              </div>
              <Button className="w-1/3" type="submit">
                Submit Offer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
