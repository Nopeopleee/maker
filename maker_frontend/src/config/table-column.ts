const TableColumns = {
  admins: [
    {
      id: "name",
      label: "使用者名稱",
      link: true,
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "created_at",
      label: "建立時間",
    },
  ],
  users: [
    {
      id: "name",
      label: "使用者名稱",
      link: true,
    },
    {
      id: "account",
      label: "帳號",
    },
    {
      id: "created_at",
      label: "建立時間",
    },
  ],
  menus: [
    {
      id: "title",
      label: "名稱",
      link: true,
    },
    {
      id: "created_at",
      label: "建立時間",
    },
  ],
  homepages: [
    {
      id: "home_details.title",
      label: "名稱",
      link: true,
    },
    {
      id: "created_at",
      label: "建立時間",
    },
  ],
  contents: [
    {
      id: "title",
      label: "名稱",
    },
    {
      id: "created_at",
      label: "建立時間",
    },
  ],
};

export default TableColumns;
