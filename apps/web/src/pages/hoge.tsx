import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { withUrql } from '@/hocs/urql';

// const User1 = dynamic(import('@/components/user1').then((c) => c.User1));
const User2 = dynamic(
  import('@/components/user2').then((c) => c.User2),
  { ssr: false },
);

function Loading() {
  return <div>Loading...</div>;
}

export function Hoge() {
  return (
    <>
      <Head>
        <title>Next.js + TypeScript + GraphQL</title>
      </Head>

      <h1>Hoge</h1>
      {/* <User1 /> */}
      <Suspense fallback={<Loading />}>
        <User2 id='1' />
      </Suspense>
    </>
  );
}

export default withUrql(Hoge, { ssr: true });
