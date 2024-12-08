import { useDispatch } from 'react-redux';
import {
  AppDispatch,
  getReceivedRequestThunk,
  useAppSelector,
} from '../../store';
import { useEffect } from 'react';
import { InvitationCard } from '../../modules/friendship-invitation';

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
            <InvitationCard invitation={r} />
          </div>
        ))}
      </div>
    </div>
  );
}
