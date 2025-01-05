import { ReactNode } from "react";

interface MenuItem {
  title: string;
  alias: string;
  image: string | null;
  type: number;
}

interface HomeState {
  language: string;
  menus: MenuItem[];
  currentMenu: MenuItem;
  homepage: Array<Homepage>;
}

interface Homepage {
  home_details: {
    [key: string]: ReactNode;
  };
  type: number;
  menu_id: number;
  menu: {
    [key: string]: string;
  };
}

interface ContentState {
  contents: Content[];
  content: Content;
}

interface Content {
  title: string;
  subtitle: string;
  description: string;
  alias: string;
  image: string;
  text: string;
  created_at: string;
}

export type { MenuItem, HomeState, Homepage, Content, ContentState };
