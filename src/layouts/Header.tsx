import { signIn, signOut, useSession } from "next-auth/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import SideBar from "./SideBar";
import SearchInput from "~/components/SearchInput";
// import Image from "next/image";

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
        <div className="pl-t ml-4 w-1/4 flex-1 text-3xl font-bold">
          {sessionData?.user?.name
            ? `Billions must create topic`
            : "Sign In to Test"}
        </div>
        <div className="mx-auto flex w-4/6">
          <SearchInput />
        </div>
        <div className="w-auto flex-none content-end gap-2">
          <div className="dropdown dropdown-end">
            {sessionData?.user ? (
              <label
                tabIndex={0}
                className="avatar btn btn-circle btn-ghost"
                onClick={() => void signOut()}
              >
                <div className="w-18 rounded-full">
                  <img
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
