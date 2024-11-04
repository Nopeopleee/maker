const prefix = "/backend";

const sideNav = [
  {
    id: "dashboard",
    title: "儀錶板",
    path: `${prefix}/dashboard`,
    icon: "bx:bxs-dashboard",
  },
  {
    id: "admins",
    title: "管理員管理",
    path: `${prefix}/admins`,
    icon: "carbon:user-admin",
  },
  {
    id: "users",
    title: "用戶管理",
    path: `${prefix}/users`,
    icon: "carbon:user-avatar",
  },
  {
    id: "menus",
    title: "選單管理",
    path: `${prefix}/menus`,
    icon: "carbon:menu",
  },
  {
    id: "activities",
    title: "活動管理",
    path: `${prefix}/activities`,
    icon: "bx:bxs-calendar",
  },
  {
    id: "albums",
    title: "相簿管理",
    path: `${prefix}/albums`,
    icon: "bi:images",
  },
  {
    id: "contacts",
    title: "聯絡資訊設定",
    path: `${prefix}/contacts`,
    icon: "bx:bxs-contact",
  },
  {
    id: "settings",
    title: "網站設定",
    path: `${prefix}/settings`,
    icon: "bx:bxs-cog",
  },
];

export default sideNav;
