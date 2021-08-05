import { configureStore } from "@reduxjs/toolkit";
import main from "./reducers/main";

const store = configureStore({
    reducer: {
        main,
    },
  })

export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch