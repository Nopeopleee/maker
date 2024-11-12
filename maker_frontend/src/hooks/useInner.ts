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

const useInner = (page: keyof typeof Api.backend, action: string) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("id");

  // Redux State
  const { itemDetail } = useSelector((state) => state.innerData);

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
  }, [dispatch, page, fetchOptions, editData, params]);

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

  const handleChange = (key: string, value: string | number | boolean) => {
    dispatch(setItemDetail({ ...itemDetail, [key]: value }));
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
    handleSave,
    handleSaveClose,
    handleCancel,
    handleChange,
    routerMap,
  };
};

export default useInner;
