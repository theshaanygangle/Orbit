import { FileText, Image, Link as LinkIcon, Plus, Send, Video } from "lucide-react";

const attachmentIcons = {
  document: FileText,
  image: Image,
  link: LinkIcon,
  video: Video,
};

const MessageThread = ({ messages, typingLabel = "Brooklyn is typing..." }) => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 space-y-5 p-4 md:p-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        <p className="text-sm font-bold text-[#FF6F91]">{typingLabel}</p>
      </div>

      <form className="flex gap-3 border-t border-current/10 p-4">
        <button
          type="button"
          className="corner-button flex h-12 w-12 shrink-0 items-center justify-center border border-current/15 bg-white/5 transition hover:border-[#2EA3F2]"
          aria-label="Add attachment"
        >
          <Plus size={20} />
        </button>

        <input
          type="text"
          placeholder="Type something..."
          className="min-w-0 flex-1 border border-current/15 bg-white/5 px-4 py-3 outline-none backdrop-blur-xl transition focus:border-[#2EA3F2]"
        />

        <button
          type="submit"
          className="corner-button flex h-12 w-12 shrink-0 items-center justify-center border border-[#2EA3F2] bg-[#2EA3F2] text-white shadow-lg shadow-[#2EA3F2]/25"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const Icon = attachmentIcons[message.type];

  return (
    <div className={`flex ${message.own ? "justify-end" : "justify-start"}`}>
      <article className={`max-w-[82%] md:max-w-[68%] ${message.own ? "text-right" : ""}`}>
        <div
          className={`border p-4 shadow-lg shadow-black/5 ${
            message.own
              ? "border-[#2EA3F2] bg-[#2EA3F2] text-white"
              : "border-white/10 bg-white/10 backdrop-blur-xl"
          }`}
        >
          {Icon ? (
            <div className="flex items-center gap-3 text-left">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center border ${
                  message.own ? "border-white/35" : "border-current/15"
                }`}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <p className="font-bold">{message.title}</p>
                <p className="mt-1 truncate text-sm opacity-75">
                  {message.text}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-left text-sm leading-6">{message.text}</p>
          )}
        </div>

        <div
          className={`mt-2 flex items-center gap-2 text-xs text-current/45 ${
            message.own ? "justify-end" : "justify-start"
          }`}
        >
          <span>{message.author}</span>
          <span>{message.time}</span>
          <span>{message.status}</span>
        </div>
      </article>
    </div>
  );
};

export default MessageThread;
