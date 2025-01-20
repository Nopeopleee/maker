import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  fetchOptions,
  editData,
  innerDataSlice,
  saveData,
  updateData,
} from "@/redux/slices/back/innerDataSlice";

// Next.js
import { useRouter, useSearchParams } from "next/navigation";

// Config & Types
import type Api from "@/config/api";
import sideNav from "@/config/side-nav";

// Interfaces
import { ItemDetail } from "@/interface/menu-form-props";

const useInner = (page: keyof typeof Api.backend, action: string) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("id");

  // Redux State
  const { itemDetail, options } = useSelector((state) => state.innerData);

  // Redux Actions
  const { setItemDetail } = innerDataSlice.actions;

  useEffect(() => {
    const fetchDataAsync = async () => {
      await dispatch(fetchOptions(page));

      if (action === "edit") {
        await dispatch(editData({ list: page, id: Number(id) }));
      }
    };

    fetchDataAsync();
  }, [dispatch, page, params, action, id]);

  const handleSave = async () => {
    if (action === "create") {
      const resultAction = await dispatch(
        saveData({ list: page, data: itemDetail })
      );
      if (saveData.fulfilled.match(resultAction)) {
        const newId = resultAction.payload.id;
        router.push(`/backend/${page}/edit?id=${newId}`);
      }
    } else {
      dispatch(updateData({ list: page, data: itemDetail, id: Number(id) }));
    }
  };

  const handleSaveClose = async () => {
    if (action === "create") {
      const resultAction = await dispatch(
        saveData({ list: page, data: itemDetail })
      );
      if (saveData.fulfilled.match(resultAction)) {
        router.push(`/backend/${page}`);
      }
    } else {
      const resultAction = await dispatch(
        updateData({ list: page, data: itemDetail, id: Number(id) })
      );
      if (updateData.fulfilled.match(resultAction)) {
        router.push(`/backend/${page}`);
      }
    }
  };

  const handleCancel = () => {
    router.push(`/backend/${page}`);
  };

  const handleChange = (
    key: string,
    value: string | number | boolean,
    index?: number
  ) => {
    const column = key.split(".");
    if (column.length > 1) {
      if (index !== undefined) {
        const child = (itemDetail as ItemDetail)[column[0]] || [];
        const newChild = (child as Array<ItemDetail>).map((item, i) => {
          if (i === index) {
            return { ...item, [column[1]]: value };
          }
          return item;
        });

        dispatch(
          setItemDetail({
            ...itemDetail,
            [column[0]]: newChild,
          })
        );

        return;
      }

      const childKey = column.pop() as string;
      const child = (itemDetail as ItemDetail)[column[0]] || {};
      const newChild = { ...(child as ItemDetail), [childKey]: value };

      dispatch(
        setItemDetail({
          ...itemDetail,
          [column[0]]: newChild,
        })
      );

      return;
    }

    dispatch(setItemDetail({ ...itemDetail, [key]: value }));
  };

  const handleAddItem = (column: string) => {
    const child = (itemDetail as ItemDetail)[column] || [];
    const newChild = [
      ...(child as ItemDetail[]),
      {
        id: new Date().getTime(),
        order: (child as Array<ItemDetail>).length + 1,
      },
    ];

    dispatch(
      setItemDetail({
        ...itemDetail,
        [column]: newChild,
      })
    );
  };

  const handleRemoveItem = (column: string, index: number) => {
    const child = (itemDetail as ItemDetail)[column] || [];
    const newChild = (child as Array<ItemDetail>).filter((_, i) => i !== index);

    dispatch(
      setItemDetail({
        ...itemDetail,
        [column]: newChild,
      })
    );
  };

  const routerMap = (pathName: string): string | undefined => {
    const found = sideNav.find((nav) => nav.id === pathName);

    let tail = "";
    if (action === "create") tail = "新增";
    if (action === "edit") tail = "編輯";

    return found ? `${found.inner}${tail}` : pathName;
  };

  return {
    itemDetail,
    options,
    handleSave,
    handleSaveClose,
    handleCancel,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    routerMap,
  };
};

export default useInner;
