import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  auditorCreateReducer,
  auditorDeleteReducer,
  auditorsDetailReducer,
  auditorUpdateProfileReducer,
  singleAuditorDetailReducer,
  userLoginReducer,
} from "./reducers/userReducers";
import {
  clientCreateReducer,
  clientDeleteReducer,
  clientDetailsReducer,
  clientLoginReducer,
  clientSendMessageReducer,
  clientUpdateProfileReducer,
  singleClientDetailsReducer,
} from "./reducers/clientReducer.js";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  clientLogin: clientLoginReducer,
  clientDetails: clientDetailsReducer,
  currentClientDetails: singleClientDetailsReducer,
  auditorsDetails: auditorsDetailReducer,
  clientDelete: clientDeleteReducer,
  clientUpdate: clientUpdateProfileReducer,
  clientCreate: clientCreateReducer,
  auditorDelete: auditorDeleteReducer,
  auditorCreate: auditorCreateReducer,
  currentAuditorDetails: singleAuditorDetailReducer,
  auditorUpdate: auditorUpdateProfileReducer,
  clientMessage: clientSendMessageReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const clientInfoFromStorage = localStorage.getItem("clientInfo")
  ? JSON.parse(localStorage.getItem("clientInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  clientLogin: { clientInfo: clientInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  // composeWithDevTools(applyMiddleware(...middleware))
  applyMiddleware(...middleware)
);

export default store;
