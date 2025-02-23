import { useEffect } from 'react';
import {
  AppDispatch,
  getFriendsThunk,
  loadMoreFriendsThunk,
  useAppSelector,
} from '../../store';
import { useDispatch } from 'react-redux';
import { Button, Spin } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { FriendCard } from '../../modules/friends/friend-card';

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
      <h5>Friends {!friendsState.loading && `(${friendsState.total})`}</h5>
      <div className="d-flex flex-wrap">
        {friendsState.friends.map((f) => (
          <div key={f._id} className="" style={{ width: 200, margin: '6px' }}>
            <FriendCard friendship={f} />
          </div>
        ))}
      </div>
      {friendsState.loading && (
        <div className="w-100 p-4 d-flex justify-content-center">
          <Spin />
        </div>
      )}
      {!friendsState.loading &&
        friendsState.page < friendsState.numberOfPages && (
          <Button
            className="w-100 mt-3"
            icon={<CaretDownOutlined />}
            onClick={() => dispatch(loadMoreFriendsThunk())}
          >
            {' '}
            More
          </Button>
        )}
    </div>
  );
}
