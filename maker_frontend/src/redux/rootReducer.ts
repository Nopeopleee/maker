import { combineReducers } from "redux";

// import slices
import tableSliceReducer from "./slices/back/tableSlice";
import listDataSliceProvider from "./slices/back/listDataSlice";

const rootReducer = combineReducers({
  table: tableSliceReducer,
  listData: listDataSliceProvider,
});

export default rootReducer;
