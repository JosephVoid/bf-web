import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchTags } from "../actions/fetch/tags.fetch";
import { ITag } from "../types";

const useFetchTags = () => {
  return useQuery({ queryKey: ["tags"], queryFn: () => fetchTags() });
};

export const useObtainTags = () => {
  const queryClient = useQueryClient();
  const getTagsFromCache = async () => {
    const tags = queryClient.getQueryData(["tags"]);
    if (!tags) {
      const fetchedTags = await fetchTags();
      return fetchedTags;
    }
    return (tags as ITag[]) ?? [];
  };

  const getTagObjectFromString = async (tags?: string[]) => {
    const alltags = await getTagsFromCache();
    return alltags.filter((t) => tags?.includes(t.name));
  };
  return {
    getTagObjectFromString,
  };
};

export default useFetchTags;
