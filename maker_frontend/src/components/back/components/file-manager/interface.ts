interface ViewMode {
  mode: "grid" | "list";
}

interface FolderChainItem {
  name: string;
  isRoot: boolean;
}

interface FileItem {
  id: string;
  name: string;
  isDir: boolean;
  size: number;
  modDate: string;
  thumbnail?: string;
}

interface ActionItem {
  id: string;
  label: string;
  tooltip: string;
  icon: string;
  action: () => void;
}

interface ActionListItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

interface ContextActionItem {
  id: string;
  label: string;
  tooltip: string;
  icon: string;
  hasSelected: boolean;
  action: () => void;
}

interface GridFileListProps {
  files: FileItem[];
  handleSelect: (event: React.MouseEvent, name: string) => void;
  selectedFiles: string[];
  handleDoubleClick: (event: React.MouseEvent, file: FileItem) => void;
}

interface DroppableFileProps {
  file: FileItem;
  handleSelect: (event: React.MouseEvent, name: string) => void;
  selectedFiles: string[];
  handleDoubleClick: (event: React.MouseEvent, file: FileItem) => void;
}

interface DraggableFileProps {
  file: FileItem;
  handleSelect: (event: React.MouseEvent, name: string) => void;
  selectedFiles: string[];
  handleDoubleClick: (event: React.MouseEvent, file: FileItem) => void;
}

interface ContextMenuType {
  mouseX: number;
  mouseY: number;
}

interface ContextMenuProps {
  contextActions: ContextActionItem[];
  contextMenu: ContextMenuType | null;
  setContextMenu: (value: ContextMenuType | null) => void;
  selectedFiles: string[];
}

interface FileManagerProps {
  files: FileItem[];
  folderChain: FolderChainItem[];
  actions: ActionItem[];
  actionList: ActionListItem[];
  contextActions: ContextActionItem[];
  selectedFiles: string[];
  setSelectedFiles: (files: string[]) => void;
  handleDoubleClick: (event: React.MouseEvent, file: FileItem) => void;
}

export type {
  ViewMode,
  FolderChainItem,
  FileItem,
  ActionItem,
  ActionListItem,
  ContextActionItem,
  GridFileListProps,
  DroppableFileProps,
  DraggableFileProps,
  ContextMenuType,
  ContextMenuProps,
  FileManagerProps,
};
