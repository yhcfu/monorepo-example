import { useFindUserQuery } from '@/graphql/FetchUserList.generated';

export function User2({ id }: { id: string }) {
  const [{ data }] = useFindUserQuery({ variables: { id } });

  return (
    <div>
      <div key={data.user.exampleField}>{data.user.exampleField}</div>
    </div>
  );
}

export default User2;
