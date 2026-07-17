import { MessageCircleMore } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center px-6 text-center">
      <div className="border border-current/20 bg-white/5 p-8 backdrop-blur-xl">
        <MessageCircleMore size={80} strokeWidth={1.5} />
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.35em] text-current/45">
        orbit
      </p>

      <h2 className="mt-3 text-5xl font-bold max-sm:text-4xl">
        Start a Conversation
      </h2>

      <p className="mt-4 max-w-md text-current/55">
        Chat securely with end-to-end encryption.
      </p>
    </div>
  );
};

export default AppLayout(Home, { showHeader: false });
