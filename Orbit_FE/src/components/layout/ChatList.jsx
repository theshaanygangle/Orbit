import { ChevronDown, PhoneCall, Search, Video } from "lucide-react";
import { callLogs, friends } from "../../data/mockChatData";

const ChatList = ({ mode, isDark }) => {
  const isCalls = mode === "calls";
  return (
    <aside
      className="glass-panel glass-motion min-h-0 overflow-y-auto border border-white/20 p-4 max-lg:hidden"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-current/45">
            Orbit
          </p>

          <h2 className="text-3xl font-bold">{isCalls ? "Calls" : "Chats"}</h2>
        </div>

        <Search size={20} />
      </div>

      <input
        placeholder={isCalls ? "Search calls..." : "Search chats..."}
        className={`mb-6 w-full border bg-white/5 px-4 py-3 outline-none backdrop-blur-xl transition focus:border-[#2EA3F2] ${
          isDark ? "border-white/10 placeholder:text-[#727887]" : "border-black/10 placeholder:text-gray-400"
        }`}
      />

      {isCalls ? (
        <div className="space-y-3">
          {callLogs.map((call) => (
            <CallItem key={call.id} call={call} />
          ))}
        </div>
      ) : (
        <>
          <ListSection title="New Messages" />
          <div className="space-y-3">
            {friends.slice(0, 2).map((friend) => (
              <ChatItem key={friend.id} friend={friend} active={friend.id === "shaany"} />
            ))}
          </div>

          <ListSection title="Last Messages" className="mt-7" />
          <div className="space-y-3">
            {friends.slice(2).map((friend) => (
              <ChatItem key={friend.id} friend={friend} />
            ))}
          </div>
        </>
      )}
    </aside>
  );
};

const ListSection = ({ title, className = "" }) => (
  <div className={`mb-3 flex items-center justify-between text-sm text-current/55 ${className}`}>
    <span>{title}</span>
    <ChevronDown size={16} />
  </div>
);

const ChatItem = ({ friend, active }) => (
  <article
    className={`border p-3 transition hover:border-[#2EA3F2] ${
      active
        ? "border-[#2EA3F2] bg-[#2EA3F2] text-white shadow-xl shadow-[#2EA3F2]/20"
        : "border-white/10 bg-white/5"
    }`}
  >
    <div className="flex items-start gap-3">
      <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center bg-gradient-to-br ${friend.tone} text-sm font-bold text-white`}>
        {friend.avatar}
        <span className="absolute -right-1 top-0 h-3 w-3 border border-white bg-green-400" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-bold">{friend.name}</h3>

          <span className="text-xs text-current/45">{friend.time}</span>
        </div>

        <p className={`mt-1 truncate text-sm ${active ? "text-white/70" : "text-current/55"}`}>
          {friend.lastMessage}
        </p>
      </div>

      {friend.unread > 0 && (
        <span className="flex h-6 min-w-6 items-center justify-center bg-[#FF4D61] px-2 text-xs font-bold text-white">
          {friend.unread}
        </span>
      )}
    </div>
  </article>
);

const CallItem = ({ call }) => (
  <article
    className="border border-white/10 bg-white/5 p-3 transition hover:border-[#2EA3F2]"
  >
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
          call.missed ? "border-[#FF4D61] text-[#FF4D61]" : "border-green-500 text-green-500"
        }`}
      >
        {call.type.includes("Video") ? <Video size={19} /> : <PhoneCall size={19} />}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold">{call.name}</h3>

        <p className="mt-1 truncate text-sm text-current/55">
          {call.direction} · {call.type}
        </p>
      </div>

      <span className="text-right text-xs text-current/45">{call.time}</span>
    </div>
  </article>
);

export default ChatList;
