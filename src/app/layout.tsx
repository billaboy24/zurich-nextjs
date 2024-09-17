"use client";

import { ReactNode } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${!isHomePage && "flex flex-col min-h-screen"}`}>
          {!isHomePage && <Header />}
          <main className={`${!isHomePage && "flex-grow py-12 px-6"}`}>
            {children}
          </main>
          {!isHomePage && <Footer />}
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
