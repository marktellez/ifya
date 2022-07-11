import HeartIcon from "@/ui/icons/heart";

export default function Layout({ children, creator }) {
  return (
    <main className="container mx-auto">
      <div>
        <div className="mt-8 italic text-2xl text-blue-500 font-medium">
          If ya like it...
        </div>

        <h1 className="-my-14 ml-3 flex items-center text-5xl font-black">
          Show some
          <HeartIcon className="transform -rotate-6 text-red-500 -mx-4 h-48 w-48" />
          {creator ? `to ${creator.name}` : ""}!
        </h1>
      </div>

      {children}
    </main>
  );
}
