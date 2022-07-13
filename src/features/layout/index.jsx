import HeartIcon from "@/ui/icons/heart";

export default function Layout({ children, creator }) {
  return (
    <main className="w-full md:w-[824px] mx-auto text-white">
      <div className="mx-auto w-full relative ">
        <div className="absolute z-30 left-[100px] md:left-[300px] -top-[90px] font-thin drop-shadow-xl  text-[42px] tracking-tighter">
          If ya like it...
        </div>
        <div className="absolute z-30 font-black left-[160px] md:left-[340px] drop-shadow-xl -top-[52px]  text-[46px] tracking-tighter">
          Show some
        </div>

        <HeartIcon className="absolute z-20  drop-shadow-2xl left-[120px] md:left-[440px] -top-[140px]  transform -rotate-6 text-red-500  h-[220px] w-[220px]" />
      </div>

      <div className="mt-28 text-gray-800 md:rounded-2xl p-6">{children}</div>
    </main>
  );
}
