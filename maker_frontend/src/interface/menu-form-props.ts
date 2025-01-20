interface ItemDetail {
  home_details?: ItemDetail;
  [key: string]: string | number | boolean | null | undefined | ItemDetail;
}

interface Options {
  [key: string]: Array<{ id: string; title: string }>;
}

interface MenuFormProps {
  itemDetail: ItemDetail;
  handleChange: (
    key: string,
    value: string | number | boolean,
    index?: number
  ) => void;
  options?: Options;
}

interface Add {
  handleAddItem: (column: string) => void;
}

interface Remove {
  handleRemoveItem: (column: string, index: number) => void;
}

export type { MenuFormProps, ItemDetail, Options, Add, Remove };

export default MenuFormProps;
