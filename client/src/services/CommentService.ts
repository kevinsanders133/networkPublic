import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import IComment from "../models/IComment";

export const commentAPI = createApi({
    reducerPath: 'commentAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5007'}),
    tagTypes: ['Comment'],
    endpoints: (builder) => ({
        getAllCommentsByPublicationId: builder.query<IComment[], { publication_id: string }>({
            query: ({publication_id}) => ({
                url: `/comments/fromPublication/${publication_id}`,
                method: 'GET',
            }),
            providesTags: result => ['Comment'],
        }),
        getCommentById: builder.query<IComment, { commentId: string }>({
            query: ({commentId}) => ({
                url: `/comments/${commentId}`,
                method: 'GET',
            }),
            providesTags: result => ['Comment'],
        }),
        addNewComment: builder.mutation<IComment, IComment>({
            query: (payload: IComment) => ({
                url: '/comments',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Comment'],
        }),
    })
});