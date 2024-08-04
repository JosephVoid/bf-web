import { useQuery } from "@tanstack/react-query";
import { fetchMetrics } from "../actions/fetch/metric.fetch";

const useFetchMetrics = () => {
  return useQuery({ queryKey: ["metrics"], queryFn: () => fetchMetrics() });
};

export default useFetchMetrics;
