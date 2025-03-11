import { useEffect, useState } from 'react';
import { getUsers } from '../../../../services';
import { IUserWithFriendshipStatus } from '../../../../types';
import { User } from './user';

export function UsersTab({ text }: { text: string }) {
  // const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Array<IUserWithFriendshipStatus>>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      // setIsLoading(true);
      setUsers([]);

      if (text !== '') {
        const res = await getUsers(text, 1);
        setUsers(res.items);
      }

      // setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  return (
    <div className="" id="user-tab">
      {users.map((u) => (
        <User key={u._id} data={u} />
      ))}
    </div>
  );
}
