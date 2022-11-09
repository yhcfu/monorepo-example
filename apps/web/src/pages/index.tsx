import { Suspense } from 'react';

import Head from 'next/head';

import { SkeletonCard } from '@/components/ui/Skeleton/SkeletonCard';
import User from '@/components/user1';
import { withUrql } from '@/hocs/urql';

export function Index() {
  return (
    <>
      <Head>
        <title>Next.js + TypeScript + GraphQL</title>
      </Head>

      <h1>Hoge</h1>

      <Suspense fallback={<SkeletonCard />}>
        <User id='2' />
      </Suspense>
    </>
  );
}

export default withUrql(Index);
