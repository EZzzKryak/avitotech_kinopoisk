export const mainTheme = {
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
      fontSize: 14,
      titleFontSizeSM: 12,
      cardPaddingSM: "4px 10px",
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
};
