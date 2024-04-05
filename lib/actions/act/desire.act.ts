"use server";

import { wait } from "@/lib/helpers";

export async function postDesire(
  title: string,
  description: string,
  price: number,
  picture: string | null,
  tags: string[]
): Promise<string | null> {
  console.log({ title, description, price, picture, tags });
  // const data = <IDesirePostParams>JSON.parse(params);
  // await wait();
  // revalidatePath("/6fdede6a-c0ed-4d3a-b705-d192b75e9df9");
  // redirect("/6fdede6a-c0ed-4d3a-b705-d192b75e9df9");
  return "";
}

export async function wantDesire(
  userId: string,
  desireId: string
): Promise<boolean> {
  await wait();
  return true;
}

export async function unWantDesire(
  userId: string,
  desireId: string
): Promise<boolean> {
  await wait();
  return true;
}

export async function viewDesire(userId: string, desireId: string) {
  await wait();
}
