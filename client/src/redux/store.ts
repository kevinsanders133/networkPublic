import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { chatAPI } from '../services/ChatService';
import { commentAPI } from '../services/CommentService';
import { publicationAPI } from '../services/PublicationService';
import { userAPI } from '../services/UserService';
import { slices } from './slices';

const rootReducer = combineReducers({
    ...slices,
    [publicationAPI.reducerPath]: publicationAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [commentAPI.reducerPath]: commentAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
})

export const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(publicationAPI.middleware)
                .concat(userAPI.middleware)
                .concat(commentAPI.middleware)
                .concat(chatAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;