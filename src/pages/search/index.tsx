import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Spinner from "~/components/Spinner";
import { TopicCard } from "~/components/TopicCard";
import { api } from "~/utils/api";

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();
  const encodedSearchQuery = encodeURI(searchQuery ?? "");
  const Query = encodedSearchQuery;
  const {
    data: resultTopic,
    // refetch: refetchTopic
  } = api.topic.search.useQuery(
    {
      search: Query ?? "",
    },
    {
      onSuccess: () => {
        setLoading(false ?? null);
      },
    },
  );
  const deleteTopic = api.topic.delete.useMutation({
    // onSuccess: () => {
    //   void refetchNotes();
    // },
  });
  //   const result = SearchInput.mutate({ search: Query });
  console.log(resultTopic);
  //   setTopic(result);
  const { data: sessionData } = useSession();
  //   const [topic, setTopic] = useState(null);
  const [isLoading, setLoading] = useState(true);
  //   const { data: SearchInput } = api.topic.search.useMutation(
  //     {
  //       search: encodedSearchQuery ?? "",

  //     },
  //   useEffect(() => {

  //   }, [encodedSearchQuery]);
  // {
  //   onSuccess: () => {
  //     setLoading(false);
  //   },
  // },
  //   );

  //`${"'%" + encodedSearchQuery + "%'"}`  SearchInput.mutate({ search: "'%" + encodedSearchQuery + "%'" });

  //   const { data, isLoading } = useSWR(
  //     `/api/search?q=${encodedSearchQuery}`,
  //     fetchPosts,
  //     { revalidateOnFocus: false }
  //   );

  //   if (!encodedSearchQuery) {
  //     router.back();
  //   }

  if (isLoading) {
    return <Spinner />;
  }

  if (!resultTopic) {
    return null;
  }

  return (
    <>
      <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>
      {resultTopic?.map((topic) => (
        <>
          <TopicCard
            key={topic.id}
            topic={topic}
            specific={false}
            user={sessionData?.user?.id ?? ""}
            onDelete={() => void deleteTopic.mutate({ id: topic.id })}
          />
          <div className="divider" />
        </>
      ))}
    </>
  );
};

export default SearchPage;
