import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import IPublication from "../models/IPublication";
import IShortFileInfo from "../models/IShortFileInfo";

export const publicationAPI = createApi({
    reducerPath: 'publicationAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001'}),
    tagTypes: ['Publication', 'File'],
    endpoints: (builder) => ({
        fetchByUserId: builder.query<IPublication[], { userId: string, limit: number }>({
            query: ({ userId, limit }) => ({
                url: `/publications/byUserId/${userId}`,
                method: "GET",
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Publication']
        }),
        fetchById: builder.query<IPublication, { publicationId: string, userId: string }>({
            query: ({ publicationId, userId }) => ({
                url: `/publications/${publicationId}?userId=${userId}`,
                method: "GET"
            }),
            providesTags: result => ['Publication']
        }),
        fetchFollowedPublications: builder.query<IPublication[], { userId: string }>({
            query: ({userId}) => ({
                url: `/publications/followed/${userId}`,
                method: 'GET'
            }),
            providesTags: result => ['Publication']
        }),
        toggleLikePublication: builder.mutation<IPublication, { publicationId: string, userId: string, like: boolean }>({
            query: ({ publicationId, userId, like }) => ({
                url: '/publications/likes',
                method: 'POST',
                body: { publicationId, userId, like },
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            }),
            invalidatesTags: ['Publication'],
        }),
    })
});