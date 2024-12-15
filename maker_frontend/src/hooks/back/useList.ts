import { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  fetchData,
  fetchOptions,
  listDataSlice,
  deleteData,
} from "@/redux/slices/back/listDataSlice";
import { tableSlice, selectTableState } from "@/redux/slices/back/tableSlice";
import { innerDataSlice } from "@/redux/slices/back/innerDataSlice";
import { alertSlice } from "@/redux/slices/back/alertSlice";

// Next.js
import { useRouter } from "next/navigation";

// Config & Types
import type Api from "@/config/api";
import ListPage from "@/config/list-page";

const useList = (page: keyof typeof Api.backend) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [confirmOpen, setConfirmOpen] = useState(false);

  // Redux State
  const { updateTable, tableSelected } = useSelector((state) => state.table);
  const tableState = useSelector(selectTableState);

  // Redux Actions
  const { setTableInit, setUpdateTable, setTableSelected } = tableSlice.actions;
  const { setParams, setItems, setDataCount } = listDataSlice.actions;
  const { setItemDetail } = innerDataSlice.actions;
  const { setOpen, setMessage, setSeverity } = alertSlice.actions;

  useEffect(() => {
    dispatch(setTableInit());
    dispatch(setItems([]));
    dispatch(setDataCount(0));
    dispatch(setItemDetail({}));
  }, [dispatch, setItems, setDataCount, setTableInit, setItemDetail]);

  useEffect(() => {
    if (!ListPage.includes(page)) return;
    const fetchDataAsync = async () => {
      dispatch(setParams(tableState));
      await dispatch(fetchOptions(page));
      await dispatch(fetchData(page));
    };

    fetchDataAsync();
  }, [updateTable, page, dispatch, setParams, tableState]);

  const handleCreate = () => {
    router.push(`/backend/${page}/create`);
  };

  const handleEdit = () => {
    if (tableSelected.length === 0) {
      dispatch(setMessage("請選擇一筆資料"));
      dispatch(setSeverity("warning"));
      dispatch(setOpen(true));
      return;
    }

    if (tableSelected.length > 1) {
      dispatch(setMessage("只能選擇一筆資料"));
      dispatch(setSeverity("warning"));
      dispatch(setOpen(true));
      return;
    }

    router.push(`/backend/${page}/edit?id=${tableSelected[0]}`);
  };

  const handleDelete = () => {
    if (tableSelected.length === 0) {
      dispatch(setMessage("請選擇一筆資料"));
      dispatch(setSeverity("warning"));
      dispatch(setOpen(true));
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteData({ list: page, ids: tableSelected }));
    dispatch(setTableSelected([]));
    dispatch(setUpdateTable(!updateTable));
    setConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  return {
    handleCreate,
    handleEdit,
    handleDelete,
    confirmOpen,
    handleConfirmDelete,
    handleCancelDelete,
  };
};

export default useList;
