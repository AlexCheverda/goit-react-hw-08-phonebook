import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['contacts'],
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => '/contacts',
            providesTags: ['contacts'],
        }),
        // addContact: builder.mutation({
        //     query: values => ({
        //         url: 'contacts',
        //         method: 'POST',
        //         body: values,
        //     }),
        //     invalidatesTags: ['Contact'],
        // }),
        deleteContact: builder.mutation({
            query: contactId => {
                return {
                    url: `/contacts/${contactId}`,
                    method: 'DELETE',
                };                
            },
            invalidatesTags: ['contacts'],
        }),
        addContact: builder.mutation({
            query: contact => {
                return {
                    url: '/contacts',
                    method: 'POST',
                    body: contact,
                };
            },
            invalidatesTags: ['contacts'],
        }),
        editContact: builder.mutation({
            query: ({ id, name, number }) => {
                return {
                    url: `/contacts/${id}`,
                    method: 'PATCH',
                    body: { name, number },
                };
            },
            invalidatesTags: ['contacts'],
        }),
    }),
});

export const {
    useGetContactQuery,
    useDeleteContactMutation,
    useAddContactMutation,
    useEditContactMutation,
} = contactsApi;