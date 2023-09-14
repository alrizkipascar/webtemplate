import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface SideBarProps {
  open: boolean;
  setOpen: Dispatcher<boolean>;
}

export default function SideBar({ open, setOpen }: SideBarProps) {
  return (
    <div className="sticky top-0  flex h-screen w-1/5 justify-center  bg-gray-800 ">
      <div
        className={` ${
          !open ? "translate-x-0 " : "translate-x-0"
        }  h-auto w-full flex-col overflow-auto p-3 `}
      >
        <div className=" space-y-3 ">
          <div className={`${open ? "" : ""} flex-1`}>
            <ul className="space-y-1 pb-4 pt-2 text-sm">
              <li className="rounded-sm hover:bg-gray-600">
                <Link
                  href="/"
                  className="flex items-center space-x-3 rounded-md p-2"
                >
                  <span className="text-gray-100">Dashboard</span>
                </Link>
              </li>

              <li className="rounded-sm hover:bg-gray-600">
                <Link
                  href="/topic"
                  className="flex items-center space-x-3 rounded-md p-2"
                >
                  <span className="text-gray-100">Topic</span>
                </Link>
              </li>

              <li className="rounded-sm hover:bg-gray-600">
                <Link
                  href="/about"
                  className="flex items-center space-x-3 rounded-md p-2"
                >
                  <span className="text-gray-100">About</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* {children}

      <div
        className={`absolute inset-0 z-30 h-full w-full ${
          open ? "hidden" : "bg-black opacity-30"
        } `}
        onClick={() => void setOpen(!open)}
      >
        {" "}
      </div> */}
    </div>
  );
}
