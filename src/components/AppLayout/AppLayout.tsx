import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import cls from "./AppLayout.module.scss";
const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <div className={cls.app}>
      <ConfigProvider
        theme={{
          components: {
            Wave: {
              colorPrimary: "#000",
            },
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
              itemHoverColor: "var(--border-main-active)",
              colorBorderSecondary: "rgb(215, 215, 215)",
              fontFamily: "Montserrat, sans-serif",
            },
            Select: {
              algorithm: true,
              controlOutlineWidth: 0,
              optionFontSize: 16,
              optionSelectedColor: "var(--border-main-active)",
              optionSelectedBg: "rgb(230, 230, 230)",
              colorPrimaryHover: "var(--border-main-active)",
              colorPrimary: "var(--border-main-active)",
              fontFamily: "Montserrat, sans-serif",
            },
            Input: {
              algorithm: true,
              activeBorderColor: "var(--border-main-active)",
              hoverBorderColor: "var(--border-main-active)",
              activeShadow: "none",
              fontFamily: "Montserrat, sans-serif",
            },
            Pagination: {
              colorPrimary: "var(--border-main-active)",
              colorPrimaryHover: "var(--border-main-active)",
              colorPrimaryBorder: "var(--border-main-active)",
              colorText: "var(--border-main-active)",
              colorTextDisabled: "var(--border-main-active)",
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
