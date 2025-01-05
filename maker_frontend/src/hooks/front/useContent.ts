import { useEffect } from "react";

// Nextjs
import { useParams } from "next/navigation";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  fetchContentList,
  fetchContent,
  frontContentSlice,
} from "@/redux/slices/front/contentSlice";

// Interface
import { MenuItem } from "@/interface/redux";

const useContent = () => {
  const dispatch = useDispatch();
  const { page, alias } = useParams();

  // Redux State
  const { contents, content } = useSelector((state) => state.frontContent);

  // Redux Actions
  const {} = frontContentSlice.actions;

  const handleFetchContentList = () => {
    dispatch(fetchContentList());
  };

  const handleFetchContent = () => {
    dispatch(fetchContent(alias as string));
  };

  return {
    // State
    page,
    contents,
    content,

    // Actions
    handleFetchContentList,
    handleFetchContent,
  };
};

export default useContent;
