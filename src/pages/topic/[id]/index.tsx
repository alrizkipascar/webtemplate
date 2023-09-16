import { useMemo, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NoteCard } from "~/components/NoteCard";
import { NoteEditor } from "~/components/NoteEditor";
import AnonAlert from "~/components/AnonAlert";
import { TopicCard } from "~/components/TopicCard";

// type Topic = RouterOutputs["topic"]["getId"][0];

export default function TopicID() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  // const id = router?.query?.id;
  const id = useMemo(() => {
    return router.query?.id?.toString?.() ?? "";
  }, [router.query?.id]);
  // console.log("id", id);
  const [isLoading, setLoading] = useState(true);
  const {
    data: topic,
    // refetch: refetchTopic
  } = api.topic.getId.useQuery(
    {
      id: id ?? "",
    },
    {
      // enabled: sessionData?.user !== undefined && id !== null,
      onSuccess: () => {
        setLoading(false ?? null);
      },
    },
  );
  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: topic?.id ?? "",
    },
    {
      // enabled: sessionData?.user !== undefined && topic !== null,
    },
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });
  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });
  // const deleteNote = api.topic.getId.useMutation({
  //     onSuccess: () => {
  //       void setLoading(false ?? null);
  //       void setData(data)
  //     },
  //   });
  //   useEffect(() => {
  //   }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!topic) return <p>No profile data</p>;
  return (
    <div className="h-full w-full rounded-2xl ">
      <div className="mx-5 mt-5 grid grid-cols-4 gap-2 ">
        <div className="col-span-3">
          <TopicCard
            key={topic.id}
            topic={topic}
            user={sessionData?.user?.id ?? ""}
            specific={true}
            onDelete={() => void deleteTopic.mutate({ id: topic.id })}
          />
          <div className="divider" />
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() => void deleteNote.mutate({ id: note.id })}
              />
            </div>
          ))}
          {sessionData?.user !== undefined ? (
            <NoteEditor
              onSave={({ title, content }) => {
                void createNote.mutate({
                  title,
                  content,
                  topicId: topic?.id ?? "",
                });
              }}
            />
          ) : (
            <AnonAlert />
          )}
        </div>
      </div>
    </div>
  );
}
