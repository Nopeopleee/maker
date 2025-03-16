// Nextjs
import { useRouter, useParams } from "next/navigation";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  fetchMenu,
  fetchHomepage,
  fetchContact,
  frontHomeSlice,
} from "@/redux/slices/front/homeSlice";

// Interface
import { MenuItem } from "@/interface/redux";

const useHome = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = useParams();

  // Redux State
  const { menus, currentMenu, homepage, contact } = useSelector(
    (state) => state.frontHome
  );

  // Redux Actions
  const { setCurrentMenu } = frontHomeSlice.actions;

  const handleFetchMenu = async () => {
    await dispatch(fetchMenu(page as string));
  };

  const handleChangeMenu = (menu: MenuItem) => {
    dispatch(setCurrentMenu(menu));
    router.push(menu.alias);
  };

  const handleFetchHomepage = async () => {
    await dispatch(fetchHomepage());
  };

  const handleFetchContact = async () => {
    await dispatch(fetchContact());
  };

  return {
    // State
    page,
    menus,
    currentMenu,
    homepage,
    contact,

    // Actions
    handleFetchMenu,
    handleChangeMenu,
    handleFetchHomepage,
    handleFetchContact,
  };
};

export default useHome;
