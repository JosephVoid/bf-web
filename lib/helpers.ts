export async function wait() {
  return new Promise((res) => setTimeout(res, 1000));
}
