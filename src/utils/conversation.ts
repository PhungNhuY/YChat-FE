import { EConversationType, IConversation, IUser } from '../types';

export function genConversationName(
  conversation: IConversation,
  user: IUser,
): string {
  if (conversation.name) {
    return conversation.name;
  }
  if (conversation.type === EConversationType.ONE_TO_ONE) {
    return (conversation.members[0].user as IUser)._id === user._id
      ? (conversation.members[1].user as IUser).name
      : (conversation.members[0].user as IUser).name;
  } else {
    return conversation.members.map((m) => (m.user as IUser).name).join(', ');
  }
}
