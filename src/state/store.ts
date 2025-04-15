import {configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/auth/authSlice'
import activeRequests from './features/requests/requestsSlice'
import filesReducer from './features/files/filesSlice'
import { useDispatch, useSelector } from 'react-redux'
import pathReducer from './features/path/pathSlice'








export const store = configureStore({
  reducer: {
    auth: usersReducer,
    path: pathReducer,
    activeRequests: activeRequests,
    files: filesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

