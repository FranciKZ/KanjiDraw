import { IAssignment, IBulkResponse, ISubject, ISubjectWithRelations, ISummaryResponse } from "../../models";
import { sendRequest } from "./sharedApi";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppStorage } from "../../util/AppStorage";

export const api = createApi({
  reducerPath: 'levelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.wanikani.com/v2/',
    prepareHeaders: async (headers) => {
      const key = await AppStorage.getSecureItem('waniKey');
  
      if (key) {
        headers.set('Authorization', `Bearer ${key}`);
      }
      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.set('Accept', '*/*');
      headers.set('Connection', 'keep-alive');
  
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getLevelByNumber: builder.query<IBulkResponse<ISubject>, number>({
      query: (level) => `subjects?levels=${level}`
    }),
    getSubjectById: builder.query<ISubject, number>({
      query: (subjectId) => `subjects/${subjectId}`
    }),
    getAssignmentData: builder.query<IAssignment[], number>({
      query: (subjectId) => `assignments?subject_ids=${subjectId}`
    }),
    getSubjects: builder.query<IBulkResponse<ISubject>, number[]>({
      query: (subjectIds) => `subjects?ids=${subjectIds.join(',')}`
    }),
    getAllSubjectData: builder.query<ISubject, number>({
      query: (subjectId) => `subjects/${subjectId}`,
      async onQueryStarted(id, { dispatch, queryFulfilled}) {
        const { data } = await queryFulfilled;
        const additionalSubjectIds: number[] = [];
        if (data.object !== 'vocabulary') {
          additionalSubjectIds.concat(data.data.amalgamation_subject_ids!);
          if (data.object === 'kanji') {
            additionalSubjectIds.concat([...data.data.component_subject_ids!, ...data.data.visually_similar_subject_ids!]);
          }
        } else {
          additionalSubjectIds.concat(data.data.component_subject_ids!);
        }

        api.endpoints.getSubjects.initiate(additionalSubjectIds);
      }
    }),
    getSummary: builder.query<ISummaryResponse, void>({
      query: () => `summary`,
    })
  })
});

export const { useGetLevelByNumberQuery, useGetAllSubjectDataQuery, useGetSummaryQuery, useGetAssignmentDataQuery, useGetSubjectByIdQuery, useGetSubjectsQuery } = api;
