export async function wait() {
  return new Promise((res) => setTimeout(res, 1000));
}

export function base64ToFile(base64String: string, contentType = "") {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  return new File([new Blob([byteArray], { type: contentType })], "");
}
