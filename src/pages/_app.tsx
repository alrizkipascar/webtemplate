import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Header } from "~/layouts/Header";
import { useState } from "react";

// interface SideBarCtx {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [open, setOpen] = useState(true);
  //  FUNCTION TO HANDLE CLOSE ACTION ON SIDEDRAWER/MODAL
  // const sideDrawerClosedHandler = () => {
  //   setOpen(true);

  //   // Unsets Background Scrolling to use when SideDrawer/Modal is closed
  //   document.body.style.overflow = "unset";
  // };

  // // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  // const showSidebar = () => {
  //   setOpen(false);

  //   // Disables Background Scrolling whilst the SideDrawer/Modal is open
  //   if (typeof window != "undefined" && window.document) {
  //     document.body.style.overflow = "hidden";
  //   }
  // };
  return (
    <SessionProvider session={session}>
      <Header open={open} setOpen={setOpen}>
        {/* <SideBar open={open} setOpen={setOpen}>
        </SideBar> */}
        <Component {...pageProps} />
      </Header>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
