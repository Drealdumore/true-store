"use client";

import Loader from "@/components/admin/Loader";
import LoginPage from "@/components/admin/Login";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isLoading = useAppSelector((store) => store.loadingReducer);
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const pathName = usePathname()

  // useEffect(() => {
  //   console.log("Redux loading state:", isLoading);
  // }, [isLoading]);

  // if (!session?.user) {
  //   return <LoginPage />;
  // }

  const handleSearch = (term: React.SetStateAction<string>) => {
    setSearchTerm(term);
  };

  const isAdminProductsRoute = pathName === "/admin/products";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="w-full h-full flex flex-col">
        {/* <Navbar /> */}
        <Navbar onSearch={isAdminProductsRoute ? handleSearch : undefined} />

        <div className="bg-muted/40 p-4 h-[calc(100vh-64px)] overflow-y-scroll">
          {children}
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Layout;
