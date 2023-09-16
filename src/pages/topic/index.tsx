import { useSession } from "next-auth/react";
import { useState } from "react";
import AnonAlert from "~/components/AnonAlert";
import { TopicCard } from "~/components/TopicCard";
import { TopicEditor } from "~/components/TopicEditor";
import { type RouterOutputs, api } from "~/utils/api";

type Topic = RouterOutputs["topic"]["getAll"][0];

export default function Content() {
  const { data: sessionData } = useSession();
  //   const [code, setCode] = useState<string>("");
  //   const [title, setTitle] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } =
    api.topic.getAllFront.useQuery(
      undefined, // no input
      {
        enabled: true,
        onSuccess: (data) => {
          setSelectedTopic(selectedTopic ?? data[0] ?? null);
        },
      },
    );
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });
  const deleteTopic = api.topic.delete.useMutation({
    // onSuccess: () => {
    //   void refetchNotes();
    // },
  });
  // const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
  //   {
  //     topicId: selectedTopic?.id ?? "",
  //   },
  //   {
  //     enabled: sessionData?.user !== undefined && selectedTopic !== null,
  //   },
  // );

  // const createNote = api.note.create.useMutation({
  //   onSuccess: () => {
  //     void refetchNotes();
  //   },
  // });

  // const deleteNote = api.note.delete.useMutation({
  //   onSuccess: () => {
  //     void refetchNotes();
  //   },
  // });
  console.log("topics", topics);
  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2 ">
      <div className="col-span-3">
        {sessionData?.user !== undefined ? (
          <TopicEditor
            onSave={({ title, content }) => {
              void createTopic.mutate({
                title,
                content,
              });
            }}
          />
        ) : (
          <AnonAlert />
        )}

        <div className="divider"></div>
        {/* <TopicCard
          topic={selectedTopic}
          onDelete={() => void deleteTopic.mutate({ id: note.id })}
        /> */}
        {topics?.map((topic) => (
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
        {/* <div className="card-body m-0 p-3">
            <div
            //   className={`collapse-arrow ${
            //     isExpanded ? "collapse-open" : ""
            //   } collapse`}
            //   onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="grid h-8 w-8 content-center justify-center rounded-full text-center hover:bg-slate-700 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <div className="collapse-title text-xl font-bold">
                {selectedTopic?.title}
              </div>
              <div className="collapse-content">
                <article className="prose lg:prose-xl">
                  <ReactMarkdown>{selectedTopic?.content}</ReactMarkdown>
                </article>
              </div>
            </div>
            <div className="card-actions mx-2 flex justify-end">
              <button className="btn btn-warning btn-xs px-5">Delete</button>
            </div>
          </div> */}
        {/* <div className="divider"></div>
        <div>
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() => void deleteNote.mutate({ id: note.id })}
              />
            </div>
          ))}
        </div>
        {sessionData?.user !== undefined ? (
          <NoteEditor
            onSave={({ title, content }) => {
              void createNote.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
        ) : (
          <AnonAlert />
        )} */}
      </div>
    </div>
  );
}
