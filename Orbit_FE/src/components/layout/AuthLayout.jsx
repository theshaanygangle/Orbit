const AuthLayout = ({ title, children }) => {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#F3F4F8] font-display text-[#202020]">
      {/* Left Side */}
      <section className="hidden lg:flex w-1/2 border-r border-[#D9DCE4] relative flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-[#D9DCE4] flex items-center justify-between px-8">
          <div className="text-xs uppercase tracking-[0.3em]">Orbit</div>

          <div className="text-xl font-bold">orbit.</div>

          <div className="text-xs uppercase">2026</div>
        </div>

        {/* Huge Background Text */}
        <h1 className="absolute left-8 top-28 text-[9rem] font-bold leading-none text-[#D9DCE4] select-none">
          ORBIT
        </h1>

        {/* Card */}
        <div className="relative mt-36 ml-32 w-[420px] border border-[#D9DCE4] bg-white shadow-sm">
          <div className="border-b border-[#D9DCE4] p-8">
            <h2 className="text-5xl font-bold">connect</h2>

            <p className="mt-3 text-sm text-gray-500">
              Secure messaging platform built for modern teams.
            </p>
          </div>

          <div className="h-40 bg-gradient-to-t from-blue-500 to-cyan-300 relative overflow-hidden">
            <div className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/20 backdrop-blur-sm" />
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-12 left-8 text-xs uppercase tracking-[0.35em] text-gray-500 rotate-180 [writing-mode:vertical-rl]">
          realtime communication
        </div>

        <div className="absolute bottom-10 right-8 text-xs text-gray-400">
          MERN • Socket.io • JWT
        </div>
      </section>

      {/* Right Side */}
      <section className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md border border-[#D9DCE4] bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D9DCE4] px-8 py-6">
            <span className="text-xs uppercase tracking-[0.3em]">
              Authentication
            </span>

            <span className="text-sm">{new Date().getFullYear()}</span>
          </div>

          {/* Body */}
          <div className="p-8">
            <h1 className="mb-8 text-4xl font-bold tracking-tight">{title}</h1>

            {children}
          </div>
        </div>
      </section>

      {/* Decorative Lines */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[#D9DCE4]" />

      <div className="pointer-events-none absolute top-16 left-0 h-px w-full bg-[#D9DCE4]" />
    </main>
  );
};

export default AuthLayout;
