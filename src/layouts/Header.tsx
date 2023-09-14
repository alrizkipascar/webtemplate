import { signIn, signOut, useSession } from "next-auth/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import SideBar from "./SideBar";
import Image from "next/image";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface HeaderProps {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatcher<boolean>;
}

export const Header = ({ children, open, setOpen }: HeaderProps) => {
  const { data: sessionData } = useSession();

  //   const [open, setOpen] = useState(false); Notes for ${sessionData?.user?.name}
  return (
    <div className="  h-auto w-full flex-row">
      <div className="navbar  z-50 bg-gray-900 text-primary-content">
        <div className={` flex items-center justify-between`}>
          <button onClick={() => void setOpen(!open)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
        <div className="pl-t ml-4 flex-1 text-3xl font-bold">
          {sessionData?.user?.name
            ? `Billions must create topic`
            : "Sign In to Test"}
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            {sessionData?.user ? (
              <label
                tabIndex={0}
                className="avatar btn btn-circle btn-ghost"
                onClick={() => void signOut()}
              >
                <div className="w-18 rounded-full">
                  <Image
                    src={sessionData?.user?.image ?? ""}
                    alt={sessionData?.user?.name ?? ""}
                  />
                </div>
              </label>
            ) : (
              <button
                className="ghost  btn rounded-btn"
                onClick={() => void signIn()}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container relative flex space-x-4">
        <SideBar />
        <main className="h-full w-9/12  p-4">{children}</main>
      </div>
    </div>
  );
};
