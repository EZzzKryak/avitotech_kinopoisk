import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import cls from "./AppLayout.module.scss";
const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <div className={cls.app}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </div>
  );
};

export default React.memo(AppLayout);
