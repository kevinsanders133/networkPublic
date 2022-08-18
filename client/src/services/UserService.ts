import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import IUserInfo from "../models/IUserInfo";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5005'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchByPhrase: build.query<IUserInfo[], { phrase: string, limit: number }>({
            query: ({ phrase, limit }) => ({
                url: `/users?phrase=${phrase}`,
                method: 'GET',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['User']
        }),
        fetchUserById: build.query<IUserInfo, { userId: string }>({
            query: ({userId}) => ({
                url: `/user?userId=${userId}`,
                method: 'GET'
            }),
            providesTags: result => ['User']
        }),
        fetchFollowedUsersBySourceId: build.query<IUserInfo[], { phrase: string, sourceId: string }>({
            query: ({phrase, sourceId}) => ({
                url: `/users/followedBy/${sourceId}?phrase=${phrase}`,
                method: 'GET'
            }),
            providesTags: result => ['User']
        })
    })
});