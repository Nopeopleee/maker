const prefix = "/backend";

const sideNav = [
  {
    id: "dashboard",
    title: "儀錶板",
    path: `${prefix}/dashboard`,
    icon: "material-symbols:dashboard-outline",
  },
  {
    id: "admins",
    title: "管理員管理",
    inner: "管理員",
    path: `${prefix}/admins`,
    icon: "carbon:user-admin",
  },
  {
    id: "users",
    title: "用戶管理",
    inner: "用戶",
    path: `${prefix}/users`,
    icon: "carbon:user-avatar",
  },
  {
    id: "menus",
    title: "選單管理",
    inner: "選單",
    path: `${prefix}/menus`,
    icon: "carbon:menu",
  },
  {
    id: "homepages",
    title: "首頁設定",
    inner: "首頁",
    path: `${prefix}/homepages`,
    icon: "carbon:home",
  },
  {
    id: "contents",
    title: "內容管理",
    inner: "內容",
    path: `${prefix}/contents`,
    icon: "carbon:document",
  },
  {
    id: "file-manager",
    title: "檔案管理",
    path: `${prefix}/file-manager`,
    icon: "material-symbols:folder-outline",
  },
  {
    id: "contacts",
    title: "聯絡資訊設定",
    inner: "聯絡資訊",
    path: `${prefix}/contacts/edit`,
    icon: "mdi:contact-outline",
  },
  {
    id: "settings",
    title: "網站設定",
    inner: "網站",
    path: `${prefix}/settings/edit`,
    icon: "bx:cog",
  },
];

export default sideNav;
