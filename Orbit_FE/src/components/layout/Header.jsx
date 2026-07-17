import { FileImage, Info, Phone, Video } from "lucide-react";

const Header = ({ profile, isDark, onContactClick }) => {
  return (
    <header
      className={`flex min-h-20 items-center justify-between border-b px-4 md:px-6 ${
        isDark ? "border-white/10" : "border-black/10"
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center bg-gradient-to-br from-[#FF6F91] to-[#2EA3F2] font-bold text-white">
          {profile.avatar}
          <span className="absolute -right-1 -top-1 h-3 w-3 border border-white bg-green-400" />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold md:text-xl">
            {profile.name}
          </h2>

          <p className="text-sm text-green-500">{profile.status}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Action Icon={FileImage} label="Images" />

        <Action Icon={Phone} label="Audio call" />

        <Action Icon={Video} label="Video call" />

        <Action Icon={Info} label="Contact info" onClick={onContactClick} />
      </div>
    </header>
  );
};

const Action = ({ Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    className="corner-button flex h-10 w-10 items-center justify-center border border-current/15 transition hover:border-[#2EA3F2] hover:bg-current/10 md:h-11 md:w-11"
  >
    <Icon size={20} />
  </button>
);

export default Header;
