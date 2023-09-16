import ReactMarkdown from "react-markdown";

export default function About() {
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl text-gray-700"> About this Project</h1>
      <div>
        <h2 className="text-2xl text-gray-600">Tools</h2>
        <p>
          <a href="https://create.t3.gg/" className="text-yellow-800">
            T3 Stacks
          </a>{" "}
          that consist:
        </p>
        <div className="mx-5">
          <ul className="list-disc">
            <li>Next JS 13</li>
            <li>TRPC</li>
            <li>Prisma</li>
          </ul>
        </div>
        <p>Supabase and postgre as a backend</p>
      </div>
      <div>
        <h2 className="text-2xl text-gray-600">Why build this project?</h2>
        <p className="w-1/2 text-justify">
          I created this project with a clear vision in mind to establish a
          solid foundation for my journey in the world of full-stack
          development. This project serves as the cornerstone upon which I can
          build a portfolio of diverse and impressive projects, each showcasing
          my growing expertise and skills in this field. Beyond serving as a
          personal milestone, this project also represents an opportunity to
          prove my worth to potential clients, collaborators, and employers. It
          is a testament to my commitment and passion for the craft, showcasing
          my ability to tackle complex challenges and deliver innovative
          solutions.
        </p>
        <p className="w-1/2 text-justify">
          Other than that, this project will be my base/foundation for other
          projects or job in web development.
        </p>
      </div>
      <div>
        <h2 className="text-2xl text-gray-600">Function List</h2>
        <p></p>
        <div className="mx-5">
          <ul className="list-disc">
            <li>Dashboard - simple</li>
            <li>
              Topic create delete, update - in progress, Like - in progress
            </li>
            <li>Comment - similar to Topic.</li>
            <li>Like - In progress.</li>
            <li>User - In progress.</li>
            <li>Group - In progress.</li>
            <li>
              Image/File - In progress until I learn AWS S3 Bucket lol since
              supabase is not efficience.
            </li>
            <li>Search</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-gray-600">Contact</h2>
        <p>alrizkipasca99@gmail.com</p>
      </div>
    </div>
  );
}
