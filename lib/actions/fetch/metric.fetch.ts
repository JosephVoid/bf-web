import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import { IMetric } from "@/lib/types";

export async function fetchMetrics(): Promise<IMetric[]> {
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const metrics = [] as unknown;
    return metrics as IMetric[];
  }

  try {
    const response = await CoreAPI.getMetrics();
    return <IMetric[]>response.data;
  } catch (error) {
    return [];
  }
}
