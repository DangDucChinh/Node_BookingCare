import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import clinicReducer from './clinicReducer';
import chuyenkhoaReducer from './chuyenkhoaReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key : 'app',
    whitelist : ['language']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    // admin: persistReducer(adminPersistConfig, adminReducer),
    user: persistReducer(userPersistConfig, userReducer),
    // user: userReducer,
    app: persistReducer(appPersistConfig, appReducer),
    admin : adminReducer , 
    // gom hết cả admin, cả user, cả clinic vào 1 rootReducer chung, do đó chỉ cần import là xong 
    clinicReducer_manager : clinicReducer , 
    chuyenkhoaReducer_manager : chuyenkhoaReducer
})