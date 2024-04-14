"use server";
import { Base64ToBlob, sanitizeRandomizeName } from "@/lib/helpers";
import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_URL ?? "",
  port: Number(process.env.NEXT_PUBLIC_MINIO_PORT),
  useSSL: false,
  accessKey: process.env.NEXT_PUBLIC_MINIO_ACSK ?? "",
  secretKey: process.env.NEXT_PUBLIC_MINIO_SECK ?? "",
});

export async function fileUpload(
  file: string | null,
  name: string | null
): Promise<string | null> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    return "/mock/picture.jpg";
  }

  if (file && name) {
    let blob = Base64ToBlob(file);
    const buffer = Buffer.from(await blob.arrayBuffer());

    const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET ?? "";

    const exists = await minioClient.bucketExists(bucket);
    if (exists) {
      console.log("Bucket " + bucket + " exists.");
    } else {
      await minioClient.makeBucket(bucket);
      console.log("Bucket " + bucket + " created");
    }

    let fileName = sanitizeRandomizeName(name);

    minioClient.putObject(bucket, fileName, buffer, function (err, objInfo) {
      if (err) {
        return console.log(err); // err should be null
      }
    });
    let URL = `${process.env.NEXT_PUBLIC_MINIO_PROT}://${process.env.NEXT_PUBLIC_MINIO_URL}:${process.env.NEXT_PUBLIC_MINIO_PORT}/${bucket}/${fileName}`;
    return URL;
  }

  return null;
}
