import dynamic from 'next/dynamic';

import { useFindUserQuery } from '@/graphql/FetchUserList.generated';

function User({ id }: { id: string }) {
  const [{ data }] = useFindUserQuery({ variables: { id } });

  return (
    <div>
      <div key={data.user.exampleField}>{data.user.exampleField}</div>
    </div>
  );
}

export default dynamic(async () => User, { ssr: false });
