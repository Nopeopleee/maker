import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  fetchData,
  fetchOptions,
  setParams,
  setItems,
  setDataCount,
} from "@/redux/slices/back/listDataSlice";
import { setTablePage } from "@/redux/slices/back/tableSlice";

// Config & Types
import type Api from "@/config/api";

const useList = (page: keyof typeof Api.backend) => {
  const dispatch = useDispatch();

  const { updateTable } = useSelector((state) => state.table);
  const { params } = useSelector((state) => state.listData);

  useEffect(() => {
    dispatch(setParams({}));
    dispatch(setItems([]));
    dispatch(setDataCount(0));
    dispatch(setTablePage(0));

    if (page) {
      dispatch(setParams({ orderBy: "id", sortOrder: "asc" }));
      dispatch(fetchOptions({ list: page }));
      dispatch(fetchData({ list: page, condition: params }));
    }
  }, [updateTable]);
};

export default useList;
