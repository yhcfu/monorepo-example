import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useFindUserQuery } from '@/graphql/FetchUserList.generated';
import { withUrql } from '@/hocs/urql';

function User({ id }: { id: string }) {
  const [{ data }] = useFindUserQuery({ variables: { id } });

  return (
    <div>
      <div key={data.user.exampleField}>{data.user.exampleField}</div>
    </div>
  );
}
const DynamicUser = dynamic(async () => User, { ssr: false });

function Loading() {
  return <div>Loading...</div>;
}

export function Index() {
  return (
    <>
      <Head>
        <title>Next.js + TypeScript + GraphQL</title>
      </Head>

      <h1>Hoge</h1>

      <Suspense fallback={<Loading />}>
        <DynamicUser id='1' />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <DynamicUser id='2' />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <DynamicUser id='3' />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <DynamicUser id='4' />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <DynamicUser id='4' />
      </Suspense>
    </>
  );
}

export default withUrql(Index);
