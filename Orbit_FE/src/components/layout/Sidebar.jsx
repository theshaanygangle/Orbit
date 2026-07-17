import {
  Images,
  MessageSquare,
  Moon,
  Phone,
  Sun,
  UserRound,
} from "lucide-react";

const Sidebar = ({
  activeMode,
  activePanel,
  isDark,
  onChatsClick,
  onCallsClick,
  onMediaClick,
  onProfileClick,
  onThemeToggle,
}) => {
  return (
    <aside
      className="glass-panel glass-motion flex flex-col justify-between border border-white/20 p-3 max-md:min-h-20 max-md:flex-row"
    >
      <div className="flex flex-col gap-3 max-md:flex-row">
        <NavButton
          Icon={MessageSquare}
          active={activeMode === "chats" && activePanel === "content"}
          label="Chats"
          onClick={onChatsClick}
        />

        <NavButton
          Icon={Phone}
          active={activeMode === "calls"}
          label="Calls"
          onClick={onCallsClick}
        />

        <NavButton Icon={Images} label="Media" onClick={onMediaClick} />
      </div>

      <div className="flex flex-col gap-3 max-md:flex-row">
        <NavButton
          Icon={isDark ? Sun : Moon}
          label={isDark ? "Light theme" : "Dark theme"}
          onClick={onThemeToggle}
        />

        <NavButton
          Icon={UserRound}
          active={activePanel === "profile"}
          label="Profile"
          onClick={onProfileClick}
        />
      </div>
    </aside>
  );
};

const NavButton = ({ Icon, active, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`corner-button flex h-12 w-12 items-center justify-center border transition ${
      active
        ? "border-[#2EA3F2] bg-[#2EA3F2] text-white shadow-lg shadow-[#2EA3F2]/25"
        : "border-white/10 hover:border-current/20 hover:bg-current/10"
    }`}
  >
    <Icon size={22} />
  </button>
);

export default Sidebar;
