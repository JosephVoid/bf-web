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
  Cross1Icon,
  ExclamationTriangleIcon,
  ImageIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { TagSelect } from "./tag-sort-select";
import { Badge } from "./ui/badge";
import React from "react";
import { ITag } from "@/lib/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { postDesire } from "@/lib/actions/act/desire.act";
import { redirect } from "next/navigation";
import Loader from "./loader";
import { fileUpload } from "@/lib/actions/act/file.act";
import { fileToBase64 } from "@/lib/helpers";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const MAX_PIC_SIZE = 5000000;

const formSchema = z.object({
  title: z.string().max(50, "Title too long"),
  description: z.string().max(800, "Description too long"),
  price: z.coerce
    .number()
    .lte(999999999, "Price too much")
    .min(1, "Price can't be zero"),
  picture: z
    .custom<File>()
    .refine((file) => {
      if (!file) return true;
      return file.size < MAX_PIC_SIZE;
    }, "Image too big")
    .optional(),
  tags: z.array(z.string()).refine((tgs) => {
    return tgs.length > 0;
  }, "You need at least one tag"),
});

export type postDesireFromSchematype = z.infer<typeof formSchema>;

export default function PostDesireForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      tags: [],
    },
  });

  const [selectedtags, setSelectedTags] = React.useState<ITag[]>([]);
  const [picturePreview, setPicturePreview] = React.useState<File | null>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  function handleRemoveAlert(id: string) {
    setSelectedTags(selectedtags.filter((tag) => tag.id !== id));
    form.setValue(
      "tags",
      form.getValues("tags").filter((tid) => tid !== id)
    );
  }

  function handleAddtag(tag: ITag) {
    if (
      !selectedtags.find((sTag) => sTag.id === tag.id) &&
      selectedtags.length < 3
    )
      setSelectedTags([...selectedtags, tag]);
    selectedtags.map((tag) => tag.id);
    form.setValue("tags", [...form.getValues("tags"), tag.id]);
  }

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const picFile = await fileUpload(
      await fileToBase64(data.picture),
      data.picture?.name ?? null
    );

    const result = await postDesire(
      data.title,
      data.description,
      data.price,
      picFile,
      data.tags
    );

    toast({
      title: (
        <div className="flex items-center">
          {result && (
            <>
              {" "}
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">Desire Posted</span>
            </>
          )}
          {!result && (
            <>
              {" "}
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">Error Encounterd</span>
            </>
          )}
        </div>
      ),
    });

    if (result) setTimeout(() => router.replace(`/${result}`), 1000);
    setIsLoading(false);
  }

  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Post a Desire</h2>
      <div className="rounded-md border-[1px] p-4 mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Describe what you want"
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
                        <Input
                          placeholder="Ideal Price in Birr"
                          {...field}
                          type="number"
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
                        <FormLabel>Supporting Picture (Optional)</FormLabel>
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
                      alt="post-desire"
                      className="rounded-lg"
                    />
                  ) : (
                    <ImageIcon width={50} height={50} className="opacity-50" />
                  )}
                </div>
              </div>
              <div className="mb-4 flex flex-col">
                <div className="flex space-x-5 items-center mb-4">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TagSelect
                            onSelectProp={(tag) => handleAddtag(tag)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-wrap justify-start">
                    {selectedtags.map((tag, index) => (
                      <Badge
                        className="text-sm h-fit mr-3 mb-3"
                        variant={"outline"}
                        key={index}
                      >
                        {tag.name}
                        <Cross1Icon
                          className="ml-2 cursor-pointer"
                          onClick={() => handleRemoveAlert(tag.id)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-1/4">
                {isLoading ? <Loader /> : "Post"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
