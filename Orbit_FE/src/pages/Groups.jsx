import AppLayout from "../components/layout/AppLayout";
import MessageThread from "../components/layout/MessageThread";
import { groupMessages } from "../data/mockChatData";

const Groups = () => {
  return (
    <MessageThread
      messages={groupMessages}
      typingLabel="Meera is typing in Orbit Design Room..."
    />
  );
};

export default AppLayout(Groups, { profile: "group" });
