"use server";
import { fileToBase64 } from "@/lib/helpers";
import { IFileUpload } from "@/lib/types";
import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: "LlVoDGS20E40bfcD5IZ2",
  secretKey: "dfdHrhybLvBWGwYeBNcKfCPvt1PIIZXQTSyBjYn9",
});

export async function fileUpload(file: string, name: string) {
  let blob = new Blob([file]);

  minioClient.putObject("images", name, blob.stream(), function (err, objInfo) {
    if (err) {
      return console.log(err); // err should be null
    }
    console.log("Success", objInfo);
  });
}
