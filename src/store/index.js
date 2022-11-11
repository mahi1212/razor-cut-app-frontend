import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

// 1. Create Reducer
const rootReducer = combineReducers({
    counter : counterReducer,
})

// 2. Create Store
const store = configureStore({
    reducer : rootReducer
})

export default store;