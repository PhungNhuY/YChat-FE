import clsx from 'clsx';
import { ChatContainerHeading } from './heading';
import { InputContainer } from './input-container';
import { Messages } from './messages';

export function ChatContainer({
  isOpenInfoContainerState,
}: {
  isOpenInfoContainerState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
}) {
  return (
    <div className={clsx('h-100 d-flex flex-column')}>
      <div className="flex-fixed-size">
        <ChatContainerHeading
          isOpenInfoContainerState={isOpenInfoContainerState}
        />
      </div>

      <div className="flex-expanding-size position-relative">
        <Messages />
      </div>

      <div className="flex-fixed-size">
        <InputContainer />
      </div>
    </div>
  );
}
