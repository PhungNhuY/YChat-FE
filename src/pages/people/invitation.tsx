import { useDispatch } from 'react-redux';
import {
  AppDispatch,
  getReceivedRequestThunk,
  loadMoreReceivedRequestThunk,
  useAppSelector,
} from '../../store';
import { useEffect } from 'react';
import { InvitationCard } from '../../modules/friendship-invitation';
import { Button, Spin } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

export function PeopleInvitationPage() {
  const receivedRequestState = useAppSelector((state) => state.receivedRequest);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getReceivedRequestThunk({
        page: 1,
      }),
    );
  }, []);

  return (
    <div className="w-100 h-100 p-3 overflow-y-auto">
      <h5>Received invitations ({receivedRequestState.total})</h5>
      <div className="row g-3">
        {receivedRequestState.requests.map((r) => (
          <div key={r._id} className="col-6">
            <InvitationCard
              invitation={r}
              accepting={receivedRequestState.accepting.includes(r._id)}
            />
          </div>
        ))}
      </div>
      {receivedRequestState.loading && (
        <div className="w-100 p-4 d-flex justify-content-center">
          <Spin />
        </div>
      )}
      {!receivedRequestState.loading &&
        receivedRequestState.page < receivedRequestState.numberOfPages && (
          <Button
            className="w-100 mt-3"
            icon={<CaretDownOutlined />}
            onClick={() => dispatch(loadMoreReceivedRequestThunk())}
          >
            {' '}
            More
          </Button>
        )}
    </div>
  );
}
