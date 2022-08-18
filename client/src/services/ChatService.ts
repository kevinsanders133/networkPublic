import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import IChat from "../models/IChat";
import IFile from "../models/IFile";
import INumberOfFiles from "../models/INumberOfFiles";
import IShortFileInfo from "../models/IShortFileInfo";

export const chatAPI = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Chat', 'Message', 'User', 'String', 'NumberOfFiles', 'File'],
    endpoints: (builder) => ({
        fetchByUserId: builder.query<IChat[], { userId: string, limit: number }>({
            query: ({ userId, limit }) => ({
                url: `/chats/byUserId/${userId}`,
                method: "GET",
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Chat']
        }),
        fetchById: builder.query<IChat, { chatId: string, userId: string }>({
            query: ({ chatId, userId }) => ({
                url: `/chats/private/${chatId}/${userId}`,
                method: "GET"
            }),
            providesTags: result => ['Chat']
        }),
        fetchNumberOfFiles: builder.query<INumberOfFiles, { chatId: string }>({
            query: ({ chatId }) => ({
                url: `/chats/${chatId}/numberOfFiles`,
                method: "GET"
            }),
            providesTags: result => ['NumberOfFiles']
        }),
        createChat: builder.mutation<IChat, { usersIds: string[], initiatorId: string,title: string }>({
            query: ({ usersIds, initiatorId, title }) => ({
                url: '/chats',
                method: 'POST',
                body: { usersIds, initiatorId, title },
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            }),
            invalidatesTags: ['Chat'],
        }),
    })
});