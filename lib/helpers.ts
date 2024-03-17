export async function wait() {
  return new Promise((res) => setTimeout(res, Math.random() * 2000));
}

export async function urlToFile(url?: string): Promise<File | null> {
  if (!url) return null;
  let response = await fetch(url);
  let fileBlob = await response.blob();
  return new File([fileBlob], "");
}

export function getUUID(str: string) {
  let temp = str.split("-");
  temp.length = 5;
  return temp.join("-");
}

export function getTitle(str: string) {
  let temp = str.slice(37);
  return decodeURIComponent(temp);
}
