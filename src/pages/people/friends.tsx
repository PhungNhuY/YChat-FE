import { useEffect } from 'react';
import { AppDispatch, getFriendsThunk, useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';

export function PeopleFriendsPage() {
  const friendsState = useAppSelector((state) => state.friends);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getFriendsThunk({
        page: 1,
      }),
    );
  }, []);

  return (
    <div className="w-100 h-100 p-3 overflow-y-auto">
      <h5>Friends ({friendsState.total})</h5>
    </div>
  );
}
