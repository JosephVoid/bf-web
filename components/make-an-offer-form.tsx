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
import {
  AvatarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ImageIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { editOffer, makeOffer } from "@/lib/actions/act/offer.act";
import { usePathname, useRouter } from "next/navigation";
import { fileToBase64, getUUID, urlToFile } from "@/lib/helpers";
import { fileUpload } from "@/lib/actions/act/file.act";
import { useToast } from "@/components/ui/use-toast";
import Loader from "./loader";
import { IOffer } from "@/lib/types";
import { revalidatePath } from "next/cache";

const MAX_PIC_SIZE = 5000000;

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

export type MakeAnOfferSchemaType = z.infer<typeof formSchema>;

export default function MakeAnOfferForm({
  edit = false,
  offer,
}: {
  edit?: boolean;
  offer?: IOffer;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: edit ? offer?.description : "",
      price: edit ? offer?.price : 0,
    },
  });

  const [picturePreview, setPicturePreview] = React.useState<File | null>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const current_path = usePathname();
  const { toast } = useToast();

  React.useEffect(() => {
    if (edit) {
      // Set picture preview
      urlToFile(offer?.picture).then((result: File | null) => {
        if (result) setPicturePreview(result);
      });
    }
  }, []);

  async function handleOffer(data: MakeAnOfferSchemaType) {
    setIsLoading(true);
    const picFile = await fileUpload(
      await fileToBase64(data.picture),
      data.picture?.name ?? null
    );

    const response = await makeOffer({
      description: data.description,
      price: data.price,
      picture: picFile,
      desireId: getUUID(current_path.split("/")[1]),
    });

    toast({
      title: (
        <div className="flex items-center">
          {response.result && (
            <>
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">Offer Posted</span>
            </>
          )}
          {!response.result && (
            <>
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">
                {response.message}
              </span>
            </>
          )}
        </div>
      ),
    });

    if (response.result)
      setTimeout(() => router.replace(`/${current_path.split("/")[1]}`), 1000);

    setIsLoading(false);
  }

  async function handleOfferUpdate(data: MakeAnOfferSchemaType) {
    setIsLoading(true);
    const picFile = await fileUpload(
      await fileToBase64(data.picture),
      data.picture?.name ?? null
    );

    const response = await editOffer({
      description: data.description,
      price: data.price,
      picture: picFile,
      id: offer?.id ?? "",
    });

    toast({
      title: (
        <div className="flex items-center">
          {response.result && (
            <>
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">Changes Saved!</span>
            </>
          )}
          {!response.result && (
            <>
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">
                {response.message}
              </span>
            </>
          )}
        </div>
      ),
    });

    if (response.result)
      setTimeout(() => {
        router.replace(`/${current_path.split("/")[1]}`);
        router.refresh();
      }, 1000);

    setIsLoading(false);
  }

  return (
    <>
      <h2 className="text-2xl font-medium mb-3">
        {edit ? "Edit Offer" : "Make an Offer"}
      </h2>
      <div className="rounded-md border-[1px] p-4 mb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(edit ? handleOfferUpdate : handleOffer)}
          >
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
              <div className="mb-4 flex md:flex-row flex-col">
                <div className="md:w-1/2 w-full md:mb-0 mb-3">
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
                      alt="offer"
                      className="rounded-lg"
                    />
                  ) : (
                    <ImageIcon width={50} height={50} className="opacity-50" />
                  )}
                </div>
              </div>
              <Button className="md:w-1/3 w-1/2" type="submit">
                {isLoading ? (
                  <Loader />
                ) : (
                  <p>{edit ? "Save Changes" : "Submit Offer"}</p>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
