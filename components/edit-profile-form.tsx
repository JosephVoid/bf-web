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
import { AvatarIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/lib/types";
import Image from "next/image";
import { urlToFile } from "@/lib/helpers";
import React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const MAX_PIC_SIZE = 100000;

const formSchema = z
  .object({
    firstname: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(15, {
        message: "First name must be less than 15 characters.",
      }),
    lastname: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(15, {
        message: "Last name must be less than 15 characters.",
      }),
    email: z.string().email("Invalid Email"),
    phone: z.string().length(13, "Phone number must be 13 characters"),
    oldPass: z
      .string()
      .max(30, "Password too long")
      .min(8, "Password too short")
      .optional(),
    newPass: z
      .string()
      .max(30, "Password too long")
      .min(8, "Password too short")
      .optional(),
    description: z.string().max(500, "Description too long").optional(),
    picture: z
      .any()
      .transform((value) => {
        return value as File | null | undefined;
      })
      .refine((file) => {
        if (!file) return true;
        return file.size < MAX_PIC_SIZE, "Image too big";
      })
      .optional(),
  })
  .refine(
    (form) => form.phone.includes(""),
    "Invalid Phone number, include +251"
  );

export default function EditProfileForm({ prop }: { prop: IUser }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: prop.firstname,
      lastname: prop.lastname,
      email: prop.email,
      phone: prop.phone,
      description: prop.description,
    },
  });

  const [picturePreview, setPicturePreview] = React.useState<File | null>();
  const [enableEdit, setEnableEdit] = React.useState(false);

  React.useEffect(() => {
    urlToFile(prop.picture).then((result: File | null) => {
      if (result) setPicturePreview(result);
    });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Edit Profile</h2>
      <div className="rounded-md border-[1px] p-4 mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col relative">
              <div className="mb-4 flex space-x-5">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          {...field}
                          disabled={!enableEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          {...field}
                          disabled={!enableEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 flex space-x-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          disabled={!enableEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone"
                          {...field}
                          disabled={!enableEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 flex space-x-5">
                <FormField
                  control={form.control}
                  name="oldPass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Old Password"
                          {...field}
                          type="password"
                          disabled={!enableEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New Password"
                          {...field}
                          type="password"
                          disabled={!enableEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 flex">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Tell us about you"
                          {...field}
                          rows={6}
                          disabled={!enableEdit}
                          className="p-2 text-sm border-[1px] rounded-md focus-visible:outline-none focus:outline-2 focus:outline"
                        ></textarea>
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
                        <FormLabel>Profile Picture</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!enableEdit}
                            placeholder="Your Picture"
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
                      className="rounded-full"
                    />
                  ) : (
                    <AvatarIcon width={50} height={50} className="opacity-50" />
                  )}
                </div>
              </div>
              <Button type="submit" className="w-1/3" disabled={!enableEdit}>
                Update
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Pencil2Icon
                      className="absolute top-2 right-2 scale-150 cursor-pointer"
                      onClick={() => setEnableEdit(!enableEdit)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
