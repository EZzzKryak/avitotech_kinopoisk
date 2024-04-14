import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import { SeriesResponse } from "../../api/types.api";
import Placeholder from "../Placeholder/Placeholder";

interface SeriesMenuProps {
  series: SeriesResponse | undefined;
  isSeries: boolean | undefined;
}
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SeriesMenu = ({ series, isSeries }: SeriesMenuProps) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);

  const items: MenuItem[] = series?.docs.map((item) =>
    getItem(
      item.name,
      item.number.toString(),
      <AppstoreOutlined />,
      item.episodes.map((episode) =>
        getItem(episode.name, episode.number.toString()),
      ),
    ),
  ) as MenuItem[];
  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2?.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          return func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  if (!isSeries) {
    return (
      <Placeholder text="Это не сериал, можете ознакомиться с похожими фильмами ниже" />
    );
  }

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default SeriesMenu;
