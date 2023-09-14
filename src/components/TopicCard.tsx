import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { api, type RouterOutputs } from "../utils/api";
import ToolsCard from "./TopicComment/ToolsCard";
import Link from "next/link";

type Topic = RouterOutputs["topic"]["getAll"][0];

export const TopicCard = ({
  topic,
  onDelete,
  specific,
}: {
  topic: Topic;
  onDelete: () => void;
  specific: boolean | null;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { data: ownerTopic, refetch: refetchTopic } = api.user.getId.useQuery(
    {
      id: topic?.userId ?? "",
    },
    {
      enabled: topic?.userId !== undefined && topic !== null,
      onSuccess: () => {
        // setLoading(false ?? null);
      },
    },
  );
  const { data: countComment } = api.note.countComment.useQuery(
    {
      topicId: topic?.id ?? "",
    },
    {
      enabled:
        topic?.userId !== undefined && topic !== null && specific != true,
      onSuccess: () => {
        // setLoading(false ?? null);
      },
    },
  );

  console.log("commentCount", countComment);

  return (
    <div className="card mt-5 border bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div>
          <ToolsCard
            onDelete={onDelete}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
          <div
            className="grid h-8 w-8 content-center justify-center rounded-full text-center hover:bg-slate-700 "
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {" "}
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
          {specific == true ? (
            <div key={topic.id}>
              <div className="text-md font-bold text-gray-700">
                Post by: {ownerTopic?.name}
              </div>
              <div className="text-lg font-bold">{topic?.title ?? ""}</div>
              <article className="prose h-auto w-auto break-words text-justify lg:prose-xl">
                <ReactMarkdown>{topic?.content ?? ""}</ReactMarkdown>
              </article>
            </div>
          ) : (
            <Link key={topic.id} href={`/topic/${topic.id}`}>
              <div className="text-md font-bold text-gray-700">
                Post by: {ownerTopic?.name}
              </div>
              <div className="text-xl font-bold">{topic?.title ?? ""}</div>
              <article className="prose h-auto w-auto break-words text-justify lg:prose-xl">
                <ReactMarkdown>{topic?.content ?? ""}</ReactMarkdown>
              </article>
              <div>total comment: {countComment}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
