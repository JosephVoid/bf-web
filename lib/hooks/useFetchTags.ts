import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchTags } from "../actions/fetch/tags.fetch";
import { ITag } from "../types";

const useFetchTags = () => {
  return useQuery({ queryKey: ["tags"], queryFn: () => fetchTags() });
};

export const useObtainTags = () => {
  const queryClient = useQueryClient();
  const getTagsFromCache = () => {
    const tags = queryClient.getQueryData(["tags"]) as ITag[];
    return tags;
  };

  const getTagObjectFromString = (tags?: string[]) => {
    const alltags = getTagsFromCache();
    return alltags.filter((t) => tags?.includes(t.name));
  };
  return {
    getTagObjectFromString,
  };
};

export default useFetchTags;
