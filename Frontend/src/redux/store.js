import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import UserReducer from './UserAuthSlice'
import RegisterReducer from './RegisterAuthSlice'
import ProductReducer from './ProductSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, UserReducer)

export const store = configureStore({
  reducer: {
    UserAuth: persistedReducer,
    RegisterAuth: RegisterReducer,
    Product: ProductReducer
  }
})
export const persistor = persistStore(store)