import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core';
import { NextPage } from 'next';
import { withUrqlClient, WithUrqlClientOptions } from 'next-urql';
import NextApp from 'next/app';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * urql client wrapper for Next.js pages
 * @param AppOrPage
 * @param clientOptions
 * @returns
 */
export const withUrql = <C extends NextPage<any, any> | typeof NextApp>(
  AppOrPage: C,
  options: WithUrqlClientOptions = { ssr: true },
) => {
  return withUrqlClient(
    () => ({
      url: isDevelopment ? 'proxy/graphql' : process.env.NEXT_PUBLIC_GRAPHQL_URL,
      suspense: true,
    }),
    options,
  )(AppOrPage);
};
