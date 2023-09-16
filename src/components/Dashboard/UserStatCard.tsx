import Spinner from "../Spinner";

export default function UserStatCard({
  totalPost,
  totalUser,
}: {
  totalPost: number;
  totalUser: number;
}) {
  function animateValue(
    id: string,
    start: number,
    end: number,
    duration: number,
  ) {
    if (
      document.getElementById("totalPost") !== null &&
      document.getElementById("totalUser") !== null
    ) {
      if (start === end) return;
      const range = end - start;
      let current = start;
      const increment = end > start ? 1 : +1;
      const stepTime = Math.abs(Math.floor(duration / range));
      const obj = document.getElementById(id) as HTMLInputElement;
      const timer = setInterval(function () {
        current += increment;
        obj.innerHTML = current.toString() ?? 0;
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
    if (!totalPost && !totalUser) {
      return <Spinner />;
    }
  }

  animateValue("totalPost", 0, totalPost, 1000);
  animateValue("totalUser", 0, totalPost, 1000);
  return (
    <div className=" h-auto w-full">
      <div className="h-48 w-full rounded-xl border border-gray-600">
        {/* {highestComment?.} */}
        <div id="totalPost">0</div>

        <div id="totalUser">0</div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
