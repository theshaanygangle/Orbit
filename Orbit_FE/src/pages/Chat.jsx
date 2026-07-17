import AppLayout from "../components/layout/AppLayout";
import MessageThread from "../components/layout/MessageThread";
import { chatMessages } from "../data/mockChatData";

const Chat = () => {
  return <MessageThread messages={chatMessages} />;
};

export default AppLayout(Chat);
