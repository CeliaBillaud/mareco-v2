import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createReco: Scalars['ID']['output'];
  createUser: Scalars['ID']['output'];
  deleteReco: Scalars['ID']['output'];
  deleteUser: Scalars['ID']['output'];
  updateReco: Scalars['ID']['output'];
  updateUser: Scalars['ID']['output'];
};


export type MutationCreateRecoArgs = {
  data: RecoInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteRecoArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateRecoArgs = {
  data: RecoInput;
  id: Scalars['Float']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllRecos: Array<Reco>;
  getAllUser: Array<User>;
  getReco: Reco;
  getUser: User;
};


export type QueryGetRecoArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float']['input'];
};

export type Reco = {
  __typename?: 'Reco';
  content: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user: User;
};

export type RecoInput = {
  content: Scalars['String']['input'];
  link: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  recos: Array<Reco>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GetAllRecosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecosQuery = { __typename?: 'Query', getAllRecos: Array<{ __typename?: 'Reco', id: number, title: string, content: string, type: string, link: string, user: { __typename?: 'User', id: number, username: string } }> };


export const GetAllRecosDocument = gql`
    query GetAllRecos {
  getAllRecos {
    id
    title
    content
    type
    link
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useGetAllRecosQuery__
 *
 * To run a query within a React component, call `useGetAllRecosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRecosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRecosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRecosQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRecosQuery, GetAllRecosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRecosQuery, GetAllRecosQueryVariables>(GetAllRecosDocument, options);
      }
export function useGetAllRecosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRecosQuery, GetAllRecosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRecosQuery, GetAllRecosQueryVariables>(GetAllRecosDocument, options);
        }
export function useGetAllRecosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRecosQuery, GetAllRecosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRecosQuery, GetAllRecosQueryVariables>(GetAllRecosDocument, options);
        }
export type GetAllRecosQueryHookResult = ReturnType<typeof useGetAllRecosQuery>;
export type GetAllRecosLazyQueryHookResult = ReturnType<typeof useGetAllRecosLazyQuery>;
export type GetAllRecosSuspenseQueryHookResult = ReturnType<typeof useGetAllRecosSuspenseQuery>;
export type GetAllRecosQueryResult = Apollo.QueryResult<GetAllRecosQuery, GetAllRecosQueryVariables>;