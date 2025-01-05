import { useEffect } from "react";

// Nextjs
import { useParams } from "next/navigation";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  fetchMenu,
  fetchHomepage,
  frontHomeSlice,
} from "@/redux/slices/front/homeSlice";

// Interface
import { MenuItem } from "@/interface/redux";

const useHome = () => {
  const dispatch = useDispatch();
  const { page } = useParams();

  // Redux State
  const { menus, currentMenu, homepage } = useSelector(
    (state) => state.frontHome
  );

  // Redux Actions
  const { setCurrentMenu } = frontHomeSlice.actions;

  const handleFetchMenu = async () => {
    await dispatch(fetchMenu(page as string));
  };

  const handleChangeMenu = (menu: MenuItem) => {
    dispatch(setCurrentMenu(menu));
  };

  const handleFetchHomepage = async () => {
    await dispatch(fetchHomepage());
  };

  return {
    // State
    page,
    menus,
    currentMenu,
    homepage,

    // Actions
    handleFetchMenu,
    handleChangeMenu,
    handleFetchHomepage,
  };
};

export default useHome;
