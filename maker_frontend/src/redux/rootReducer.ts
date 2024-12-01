import { combineReducers } from "redux";

// import slices
import tableSliceReducer from "./slices/back/tableSlice";
import listDataSliceProvider from "./slices/back/listDataSlice";
import innerDataSliceProvider from "./slices/back/innerDataSlice";
import alertSliceProvider from "./slices/back/alertSlice";
import fileSliceProvider from "./slices/back/fileSlice";

const rootReducer = combineReducers({
  table: tableSliceReducer,
  listData: listDataSliceProvider,
  innerData: innerDataSliceProvider,
  alert: alertSliceProvider,
  file: fileSliceProvider,
});

export default rootReducer;
