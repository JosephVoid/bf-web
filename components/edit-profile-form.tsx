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

export default function EditProfileForm() {
  const form = useForm();
  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Edit Profile</h2>
      <div className="rounded-md border-[1px] p-4 mb-8">
        <Form {...form}>
          <div className="flex flex-col relative">
            <div className="mb-4 flex space-x-5">
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lanme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
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
                      <Input placeholder="Email" {...field} />
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
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4 flex space-x-5">
              <FormField
                control={form.control}
                name="opass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Old Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="npass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="New Password" {...field} />
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
                      {/* <Input placeholder="Old Password" {...field} /> */}
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
            <div className="mb-4 flex">
              <div className="w-1/2">
                <Label htmlFor="picture">Profile Picture</Label>
                <Input type="file" id="picture" />
              </div>
              <div className="flex justify-center items-center w-1/2">
                <AvatarIcon width={50} height={50} />
              </div>
            </div>
            <Button className="w-1/3">Update</Button>
            <Pencil2Icon className="absolute top-2 right-2 scale-150 cursor-pointer" />
          </div>
        </Form>
      </div>
    </>
  );
}
