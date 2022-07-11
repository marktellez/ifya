import HeartIcon from "@/ui/icons/heart";

export default function HomepageLayout({ children, creator }) {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="relative">
        <div>
          <div className="absolute z-20 -top-4 left-48 text-white text-[25px] font-light">
            If ya like it...
          </div>

          <h1 className="absolute z-20 -top-6 flex items-center text-white text-[72px] font-black drop-shadow-sm">
            show some
          </h1>
          <HeartIcon className="absolute left-[140px] -top-[140px] z-10 transform rotate-[17deg] text-red-500 -mx-4 h-[360px] w-[360px]" />
        </div>

        <div className="relative mt-[120px] z-50 ">{children}</div>
      </div>
    </main>
  );
}
