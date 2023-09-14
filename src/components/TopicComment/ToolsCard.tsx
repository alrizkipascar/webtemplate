export default function ToolsCard({
  isExpanded,
  onDelete,
  setIsExpanded,
}: {
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
      <div className="grid-cols-auto grid w-full gap-2 rounded-2xl bg-gray-900">
        <button className="hover:bg-gray-600">Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
          Close
        </button>
      </div>
    </div>
  );
}
