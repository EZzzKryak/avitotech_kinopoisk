import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import cls from "./AppLayout.module.scss";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <div className={cls.app}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              algorithm: true,
              colorPrimary: "#000",
              borderRadius: 5,
              colorBgContainer: "transparent",
              fontFamily: "Montserrat, sans-serif",
            },
            Tabs: {
              algorithm: true,
              cardBg: "transparent",
              itemSelectedColor: "#000",
              itemHoverColor: "#333",
              colorBorderSecondary: "rgb(215, 215, 215)",
              fontFamily: "Montserrat, sans-serif",
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className={cls.main}>
            <Outlet />
          </main>
          <Footer />
        </QueryClientProvider>
      </ConfigProvider>
    </div>
  );
};

export default React.memo(AppLayout);
