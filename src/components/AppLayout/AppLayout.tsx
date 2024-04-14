import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { mainTheme } from "../../config/theme.config";
import { IAppContext } from "../../context/appContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import cls from "./AppLayout.module.scss";
const queryClient = new QueryClient();

const AppLayout = () => {
  const [isAuth, setIsAuth] = useState<IAppContext | null>(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token") || "");
      setIsAuth(token);
    }
  }, []);

  return (
    <ConfigProvider theme={mainTheme}>
      <QueryClientProvider client={queryClient}>
        <div className={cls.app}>
          <Header />
          <main className={cls.main}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default React.memo(AppLayout);
