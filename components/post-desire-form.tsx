"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  CaretSortIcon,
  CheckIcon,
  Cross1Icon,
  ExclamationTriangleIcon,
  ImageIcon,
} from "@radix-ui/react-icons";
import { TagSelect } from "./tag-sort-select";
import { Badge } from "./ui/badge";
import React from "react";
import { IDesire, IMetric, ITag } from "@/lib/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { editDesire, postDesire } from "@/lib/actions/act/desire.act";
import Loader from "./loader";
import { fileUpload } from "@/lib/actions/act/file.act";
import { fileToBase64, urlToFile } from "@/lib/helpers";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useFetchMetrics from "@/lib/hooks/useFetchMetrics";
import { useObtainTags } from "@/lib/hooks/useFetchTags";

const MAX_PIC_SIZE = 5000000;

const formSchema = z.object({
  title: z.string().max(50, "Title too long").min(5, "Title needed"),
  description: z
    .string()
    .max(1000, "Description too long")
    .min(50, "Description too short"),
  metric: z.string(),
  minPrice: z.coerce
    .number()
    .lte(999999999, "Price too much")
    .min(1, "Price can't be zero"),
  maxPrice: z.coerce
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

export default function PostDesireForm({
  edit = false,
  desire,
}: {
  edit?: boolean;
  desire?: IDesire;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: edit ? desire?.title : "",
      description: edit ? desire?.description : "",
      minPrice: edit ? desire?.minPrice : 0,
      maxPrice: edit ? desire?.maxPrice : 0,
      metric: "",
      tags: [],
    },
  });

  const [selectedtags, setSelectedTags] = React.useState<ITag[]>([]);
  const [selectedMetric, setSelectedMetric] = React.useState<IMetric>();
  const [picturePreview, setPicturePreview] = React.useState<File | null>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const { data: metrics } = useFetchMetrics();
  const { getTagObjectFromString } = useObtainTags();

  React.useMemo(() => {
    setSelectedMetric(metrics?.find((m) => m.metric === desire?.metric));
  }, [metrics]);

  React.useEffect(() => {
    console.log(metrics);
    if (edit) {
      // Set picture preview
      urlToFile(desire?.picture).then((result: File | null) => {
        if (result) setPicturePreview(result);
      });
      // Form the tags from string response
      getTagObjectFromString(desire?.tags).then((result) => {
        setSelectedTags(result);
        form.setValue(
          "tags",
          result.map((ut) => ut.id)
        );
      });
    }
  }, []);

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

  async function handleSubmitEdit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const picFile = await fileUpload(
      await fileToBase64(data.picture),
      data.picture?.name ?? null
    );

    const response = await editDesire(
      desire?.id ?? "",
      data.title,
      data.description,
      data.minPrice,
      data.maxPrice,
      selectedMetric?.id ?? "69e45ebb-ffae-46a1-a1e5-4fc838138374",
      picFile,
      data.tags
    );

    toast({
      title: (
        <div className="flex items-center">
          {response.result && (
            <>
              {" "}
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">Changes Saved!</span>
            </>
          )}
          {!response.result && (
            <>
              {" "}
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
        router.replace(`/${response.data}`);
        router.refresh();
      }, 1000);
    setIsLoading(false);
  }

  async function handleSubmitNew(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const picFile = await fileUpload(
      await fileToBase64(data.picture),
      data.picture?.name ?? null
    );

    const response = await postDesire(
      data.title,
      data.description,
      data.minPrice,
      data.maxPrice,
      selectedMetric?.id ?? "69e45ebb-ffae-46a1-a1e5-4fc838138374",
      picFile,
      data.tags
    );

    toast({
      title: (
        <div className="flex items-center">
          {response.result && (
            <>
              {" "}
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">Desire Posted</span>
            </>
          )}
          {!response.result && (
            <>
              {" "}
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
      setTimeout(() => router.replace(`/${response.data}`), 1000);
    setIsLoading(false);
  }

  return (
    <>
      <h2 className="text-2xl font-medium mb-3">
        {edit ? "Edit Desire" : "Post a Desire"}
      </h2>
      <div className="rounded-md border-[1px] p-4 mb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              edit ? handleSubmitEdit(data) : handleSubmitNew(data)
            )}
          >
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
              <div className="flex">
                <div className="mb-4 flex space-x-5">
                  <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Lowest Price you accept"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Highest Price you accept"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metric"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Units</FormLabel>
                        <FormControl>
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="md:w-36 flex justify-between"
                              >
                                {selectedMetric?.metric ?? "None"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="md:w-24">
                              {metrics?.map((m) => (
                                <DropdownMenuItem
                                  onSelect={() => setSelectedMetric(m)}
                                  key={m.id}
                                >
                                  {m.metric}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                    <></>
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
                {isLoading ? <Loader /> : <p>{edit ? "Save" : "Post"}</p>}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
