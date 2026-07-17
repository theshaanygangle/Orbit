import { MessageCircleMore } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="rounded-full border border-slate-300 p-8">
        <MessageCircleMore size={80} strokeWidth={1.5} />
      </div>

      <h2 className="mt-8 text-4xl font-bold">Start a Conversation</h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        Chat securely with end-to-end encryption.
      </p>
    </div>
  );
};

export default EmptyState;
