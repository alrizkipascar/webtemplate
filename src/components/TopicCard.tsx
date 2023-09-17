import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { api, type RouterOutputs } from "../utils/api";
import ToolsCard from "./TopicComment/ToolsCard";
import Link from "next/link";

type Topic = RouterOutputs["topic"]["getAll"][0];

export const TopicCard = ({
  user,
  topic,
  onDelete,
  specific,
}: {
  user: string;
  topic: Topic;
  onDelete: () => void;
  specific: boolean | null;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {
    data: ownerTopic,
    // refetch: refetchTopic
  } = api.user.getId.useQuery(
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

  return (
    <div className="card mt-5 border bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div>
          <ToolsCard
            user={user ?? ""}
            topicUser={topic?.userId ?? ""}
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
              <div className="flex">
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
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                {countComment}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
