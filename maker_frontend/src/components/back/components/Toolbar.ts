interface ButtonProps {
  text: string;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  icon: string;
  outlined?: boolean;
  onClick: () => void;
}

const CreateButton = (handleCreate: () => void): ButtonProps => ({
  text: "新增",
  color: "success",
  icon: "mdi:plus",
  outlined: true,
  onClick: () => handleCreate(),
});

const EditButton = (handleEdit: () => void): ButtonProps => ({
  text: "修改",
  color: "info",
  icon: "mdi:pencil",
  outlined: true,
  onClick: () => handleEdit(),
});

const DeleteButton = (handleDelete: () => void): ButtonProps => ({
  text: "刪除",
  color: "error",
  icon: "mdi:delete",
  outlined: true,
  onClick: () => handleDelete(),
});

const saveButton = (handleSave: () => void): ButtonProps => ({
  text: "儲存",
  color: "success",
  icon: "mdi:content-save",
  outlined: true,
  onClick: () => handleSave(),
});

const saveCloseButton = (handleSaveClose: () => void): ButtonProps => ({
  text: "儲存並關閉",
  color: "success",
  icon: "mdi:content-save",
  outlined: true,
  onClick: () => handleSaveClose(),
});

const cancelButton = (handleCancel: () => void): ButtonProps => ({
  text: "取消",
  color: "error",
  icon: "material-symbols:cancel",
  outlined: true,
  onClick: () => handleCancel(),
});

const IndexToolbar = (
  handleCreate: () => void,
  handleEdit: () => void,
  handleDelete: () => void
): ButtonProps[] => [
  CreateButton(handleCreate),
  EditButton(handleEdit),
  DeleteButton(handleDelete),
];

const InnerToolbar = (
  handleSave: () => void,
  handleSaveClose: () => void,
  handleCancel: () => void
): ButtonProps[] => [
  saveButton(handleSave),
  saveCloseButton(handleSaveClose),
  cancelButton(handleCancel),
];

export { IndexToolbar, InnerToolbar };
