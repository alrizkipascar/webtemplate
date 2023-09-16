export default function ToolsCard({
  user,
  topicUser,
  isExpanded,
  onDelete,
  setIsExpanded,
}: {
  user: string;
  topicUser: string;
  isExpanded: boolean;
  onDelete: () => void;
  setIsExpanded: (isExpanded: boolean) => void;
}) {
  // const handleAction = (isExpanded:boolean) => {
  //   setIsExpanded(!isExpanded)
  // }

  return (
    <div
      className={`${
        isExpanded
          ? "absolute mx-2 h-auto w-1/4 rounded-2xl border border-gray-700"
          : "hidden"
      }`}
    >
      {user == topicUser ? (
        <div className="grid-cols-auto grid w-full gap-2 rounded-2xl bg-gray-900">
          <button className="rounded-t-2xl hover:bg-gray-600">Edit</button>
          <button className=" hover:bg-gray-600" onClick={onDelete}>
            Deletes
          </button>
          <button
            className="rounded-b-2xl hover:bg-gray-600"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Close
          </button>
        </div>
      ) : (
        <div className="grid-cols-auto grid w-full gap-2 rounded-2xl bg-gray-900">
          <button className="rounded-t-2xl hover:bg-gray-600">Report</button>
          <button
            className="rounded-b-2xl hover:bg-gray-600"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
