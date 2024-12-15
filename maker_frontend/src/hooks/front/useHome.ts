import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import { fetchMenu, frontHomeSlice } from "@/redux/slices/front/homeSlice";

// Next.js
import { useRouter, useSearchParams } from "next/navigation";

const useHome = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();

  // Redux State
  const { menus } = useSelector((state) => state.frontHome);

  // Redux Actions
  const {} = frontHomeSlice.actions;

  useEffect(() => {
    const fetchDataAsync = async () => {
      await dispatch(fetchMenu());
    };

    fetchDataAsync();
  }, [dispatch]);

  return { menus };
};

export default useHome;
