import { configureStore } from '@reduxjs/toolkit'
import cordReducer from './cordReducer'
import {weatherApi} from "./weatherApi";
import {placesApi} from "./placesApi";
export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]:weatherApi.reducer,
        [placesApi.reducerPath]:placesApi.reducer,
        cords:cordReducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware()
        .concat([weatherApi.middleware,placesApi.middleware])
});
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch