import { combineReducers } from "redux";
import auth from "./auth";
import num from "./num";




const reducer = combineReducers({
    num:num,
    auth:auth
})

export default reducer;