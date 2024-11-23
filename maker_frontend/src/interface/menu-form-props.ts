interface ItemDetail {
  home_details?: ItemDetail;
  [key: string]: string | number | boolean | null | undefined | ItemDetail;
}

interface Options {
  [key: string]: Array<{ id: string; title: string }>;
}

interface MenuFormProps {
  itemDetail: ItemDetail;
  handleChange: (key: string, value: string | number | boolean) => void;
  options?: Options;
}

export type { ItemDetail, Options };

export default MenuFormProps;
