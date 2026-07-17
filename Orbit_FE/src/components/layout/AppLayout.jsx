import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  CalendarClock,
  FileText,
  Image,
  Link as LinkIcon,
  Mic,
  Phone,
  Settings,
  Shield,
  Video,
} from "lucide-react";
import Sidebar from "./Sidebar";
import ChatList from "./ChatList";
import Header from "./Header";
import Title from "../Shared/Title";
import {
  callLogs,
  friends,
  groupProfile,
  sharedMedia,
} from "../../data/mockChatData";

const AppLayout = (WrappedComponent, options = {}) => {
  return function Layout(props) {
    const [listMode, setListMode] = useState("chats");
    const [isMediaOpen, setIsMediaOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [activePanel, setActivePanel] = useState("content");
    const [theme, setTheme] = useState("light");
    const shellRef = useRef(null);
    const activeFriend = friends[0];
    const isDark = theme === "dark";
    const showHeader = options.showHeader !== false;
    const headerProfile = options.profile === "group" ? groupProfile : activeFriend;
    const isUtilityPanel = activePanel === "calls" || activePanel === "profile";

    useEffect(() => {
      if (!shellRef.current) return;

      gsap.fromTo(
        shellRef.current.querySelectorAll(".glass-motion"),
        { opacity: 0, y: 18, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.05,
        },
      );
    }, [activePanel, listMode]);

    return (
      <>
        <Title />

        <main
          className={`liquid-bg min-h-screen p-3 font-display transition-colors md:p-5 ${
            isDark ? "is-dark text-[#F7F8FB]" : "text-[#202020]"
          }`}
        >
          <div
            ref={shellRef}
            className="glass-shell relative grid h-[calc(100vh-24px)] grid-cols-[76px_minmax(260px,340px)_1fr] gap-3 overflow-hidden border border-white/20 p-3 shadow-2xl max-xl:grid-cols-[76px_300px_1fr] max-lg:grid-cols-[72px_1fr] max-md:h-auto max-md:min-h-[calc(100vh-24px)] max-md:grid-cols-1"
          >
            <Sidebar
              activeMode={listMode}
              activePanel={activePanel}
              isDark={isDark}
              onChatsClick={() => {
                setListMode("chats");
                setActivePanel("content");
              }}
              onCallsClick={() => {
                setListMode("calls");
                setActivePanel("calls");
              }}
              onMediaClick={() => setIsMediaOpen(true)}
              onProfileClick={() => setActivePanel("profile")}
              onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
            />

            <ChatList mode={listMode} isDark={isDark} />

            <section
              className="glass-panel glass-motion relative flex min-h-0 flex-col overflow-hidden border border-white/20"
            >
              {showHeader && !isUtilityPanel && (
                <Header
                  profile={headerProfile}
                  isDark={isDark}
                  onContactClick={() => setIsContactOpen(true)}
                />
              )}

              <div className="flex-1 overflow-y-auto">
                {activePanel === "calls" ? (
                  <CallPage isDark={isDark} />
                ) : activePanel === "profile" ? (
                  <ProfileSettings isDark={isDark} />
                ) : (
                  <WrappedComponent {...props} isDark={isDark} />
                )}
              </div>

              {isContactOpen && (
                <ContactDrawer
                  profile={headerProfile}
                  isDark={isDark}
                  onClose={() => setIsContactOpen(false)}
                />
              )}
            </section>
          </div>

          {isMediaOpen && (
            <MediaModal
              isDark={isDark}
              onClose={() => setIsMediaOpen(false)}
            />
          )}
        </main>
      </>
    );
  };
};

const ContactDrawer = ({ profile, isDark, onClose }) => (
  <aside className="glass-panel absolute right-0 top-0 z-20 h-full w-[340px] border-l border-white/20 p-6 shadow-2xl max-sm:w-full">
    <div className="flex items-center justify-between border-b border-current/10 pb-5">
      <h3 className="text-lg font-bold">Contact Info</h3>

      <button
        type="button"
        onClick={onClose}
        className="corner-button h-9 w-9 border border-current/20 text-lg transition hover:bg-current/10"
        aria-label="Close contact info"
      >
        ×
      </button>
    </div>

    <div className="mt-8 flex flex-col items-center text-center">
      <div className="flex h-24 w-24 items-center justify-center bg-gradient-to-br from-[#FF6F91] to-[#536DFE] text-3xl font-bold text-white">
        {profile.avatar}
      </div>

      <h2 className="mt-5 text-2xl font-bold">{profile.name}</h2>

      <p className={isDark ? "text-[#AEB4C2]" : "text-gray-500"}>
        {profile.username}
      </p>

      <p className="mt-2 text-sm text-green-500">{profile.status}</p>
    </div>

    <div className="mt-8">
      <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.25em]">
        Media Shared
      </h4>

      <div className="grid grid-cols-3 gap-2">
        {sharedMedia.media.map((item) => (
          <div
            key={item.id}
            className={`aspect-square border border-white/20 bg-gradient-to-br ${item.color} p-2 text-xs text-white`}
          >
            <span className="block truncate font-bold">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

const MediaModal = ({ isDark, onClose }) => {
  const [activeType, setActiveType] = useState("media");
  const [previewItem, setPreviewItem] = useState(null);
  const tabs = [
    ["media", "Media", Image],
    ["links", "Links", LinkIcon],
    ["docs", "Docs", FileText],
  ];

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/45 p-4 backdrop-blur-md">
    <section
      className={`glass-panel w-full max-w-4xl border border-white/20 shadow-2xl ${
        isDark
          ? "text-[#F7F8FB]"
          : "text-[#202020]"
      }`}
    >
      <div className="flex items-center justify-between border-b border-current/10 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-current/50">
            Shared
          </p>

          <h2 className="text-2xl font-bold">Media Library</h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="corner-button h-10 w-10 border border-current/20 text-xl transition hover:bg-current/10"
          aria-label="Close media library"
        >
          ×
        </button>
      </div>

      <div className="border-b border-current/10 px-6 py-4">
        <div className="grid grid-cols-3 border border-current/15">
          {tabs.map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveType(key)}
              className={`flex items-center justify-center gap-2 px-3 py-3 text-sm font-bold transition ${
                activeType === key
                  ? "bg-[#2EA3F2] text-white"
                  : "hover:bg-current/10"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {sharedMedia[activeType].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPreviewItem(item)}
            className="group border border-current/15 p-3 text-left transition hover:border-[#2EA3F2]"
          >
            <PreviewTile item={item} />
          </button>
        ))}
      </div>

      {previewItem && (
        <PreviewDialog item={previewItem} onClose={() => setPreviewItem(null)} />
      )}
    </section>
  </div>
  );
};

const PreviewTile = ({ item }) => (
  <>
    <div className={`flex aspect-[4/3] items-end border border-white/20 bg-gradient-to-br ${item.color} p-3 text-white`}>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] opacity-75">
          {item.kind}
        </p>
        <p className="mt-1 font-bold">{item.preview}</p>
      </div>
    </div>

    <p className="mt-3 truncate font-bold">{item.title}</p>
    <p className="mt-1 truncate text-xs text-current/55">{item.meta}</p>
  </>
);

const PreviewDialog = ({ item, onClose }) => (
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md">
    <div className="glass-panel w-full max-w-xl border border-white/20 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{item.title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="corner-button h-9 w-9 border border-current/20"
          aria-label="Close preview"
        >
          ×
        </button>
      </div>
      <div className={`mt-5 flex aspect-video items-center justify-center border border-white/20 bg-gradient-to-br ${item.color} p-6 text-center text-white`}>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] opacity-70">
            {item.kind}
          </p>
          <p className="mt-3 text-2xl font-bold">{item.preview}</p>
          <p className="mt-2 text-sm opacity-75">{item.meta}</p>
        </div>
      </div>
    </div>
  </div>
);

const CallPage = () => (
  <div className="p-5 md:p-8">
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="glass-motion border border-current/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-current/45">
          Call
        </p>
        <h1 className="mt-3 text-4xl font-bold">Video and Audio Calls</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-current/55">
          Start a quick audio call, jump into video, or review recent logs from
          one focused call page.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <CallAction icon={Video} title="Start video call" tone="bg-[#2EA3F2]" />
          <CallAction icon={Phone} title="Start audio call" tone="bg-[#18B26B]" />
        </div>
      </section>

      <section className="glass-motion border border-current/10 bg-white/5 p-5">
        <h2 className="text-xl font-bold">Live controls</h2>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <ControlButton icon={Mic} label="Mute" />
          <ControlButton icon={Video} label="Camera" />
          <ControlButton icon={CalendarClock} label="Schedule" />
        </div>
      </section>
    </div>

    <section className="glass-motion mt-4 border border-current/10 bg-white/5 p-5">
      <h2 className="text-xl font-bold">Call Logs</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {callLogs.map((call) => (
          <article key={call.id} className="border border-current/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-current/15">
                {call.type.includes("Video") ? <Video size={18} /> : <Phone size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold">{call.name}</h3>
                <p className="text-sm text-current/55">
                  {call.direction} - {call.time}
                </p>
              </div>
              <span className="text-xs text-current/50">{call.duration}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
);

const CallAction = ({ icon: Icon, title, tone }) => (
  <button className={`flex items-center justify-between border border-white/20 ${tone} p-5 text-left font-bold text-white shadow-lg shadow-black/10`}>
    <span>{title}</span>
    <Icon size={22} />
  </button>
);

const ControlButton = ({ icon: Icon, label }) => (
  <button className="flex flex-col items-center gap-2 border border-current/15 p-4 text-sm font-bold transition hover:border-[#2EA3F2]">
    <Icon size={20} />
    {label}
  </button>
);

const ProfileSettings = () => (
  <div className="p-5 md:p-8">
    <div className="glass-motion border border-current/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-current/45">
        Settings
      </p>
      <h1 className="mt-3 text-4xl font-bold">User Profile</h1>

      <div className="mt-8 grid gap-5 lg:grid-cols-[260px_1fr]">
        <div className="border border-current/10 p-5 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center bg-gradient-to-br from-[#FF6F91] to-[#2EA3F2] text-3xl font-bold text-white">
            SG
          </div>
          <h2 className="mt-5 text-2xl font-bold">Shaany Gangle</h2>
          <p className="mt-1 text-sm text-current/55">@shaany</p>
        </div>

        <div className="grid gap-4">
          <SettingRow icon={Settings} label="Display name" value="Shaany Gangle" />
          <SettingRow icon={Shield} label="Privacy" value="End-to-end encrypted" />
          <SettingRow icon={Phone} label="Call preference" value="Ask before video" />
        </div>
      </div>
    </div>
  </div>
);

const SettingRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 border border-current/10 p-4">
    <div className="flex h-11 w-11 items-center justify-center border border-current/15">
      <Icon size={18} />
    </div>
    <div>
      <p className="font-bold">{label}</p>
      <p className="mt-1 text-sm text-current/55">{value}</p>
    </div>
  </div>
);

export default AppLayout;
