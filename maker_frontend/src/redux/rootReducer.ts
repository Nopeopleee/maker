import { combineReducers } from "redux";

// import slices
import tableSliceReducer from "./slices/back/tableSlice";
import listDataSliceProvider from "./slices/back/listDataSlice";
import innerDataSliceProvider from "./slices/back/innerDataSlice";
import alertSliceProvider from "./slices/back/alertSlice";
import fileSliceProvider from "./slices/back/fileSlice";
import frontHomeSliceProvider from "./slices/front/homeSlice";
import frontContentSliceProvider from "./slices/front/contentSlice";

const rootReducer = combineReducers({
  table: tableSliceReducer,
  listData: listDataSliceProvider,
  innerData: innerDataSliceProvider,
  alert: alertSliceProvider,
  file: fileSliceProvider,
  frontHome: frontHomeSliceProvider,
  frontContent: frontContentSliceProvider,
});

export default rootReducer;
