import { useSession, signIn, signOut } from "next-auth/react";

import HeartIcon from "@/ui/icons/heart";

export default function Layout({ children, creator }) {
  const { data: session } = useSession();
  return (
    <main className="w-full md:w-[824px] mx-auto text-white">
      <div className="mx-auto relative w-[260px] flex items-center justify-center ">
        <div>
          <div className="z-40 absolute left-0 top-[40px] md:top-[70px] text-3xl font-medium tracking-wide drop-shadow-sm">
            If ya like it...
          </div>
          <div className="absolute right-0 top-[70px] md:top-[100px] z-50  text-4xl font-bold drop-shadow-sm">
            Show some
          </div>
        </div>

        <HeartIcon className="transform -mt-8 md:mt-0 -rotate-6 text-red-500  h-[220px] w-[220px] drop-shadow-lg" />
      </div>

      <div className="-mt-20 border bg-white text-gray-900 md:rounded-2xl md:p-6">
        <div className="md:relative  mb-12 md:mb-0 ">
          <div className="absolute top-2 right-2 z-40 ">
            {session ? (
              <button
                className="font-light bg-white text-red-600 rounded  py-1 px-4 border border-red-400"
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}`,
                  })
                }>
                Sign out
              </button>
            ) : (
              <button
                className="font-light bg-white text-blue-600  rounded  py-1 px-4 border border-blue-400"
                onClick={() =>
                  signIn("github", {
                    callbackUrl: `${window.location.origin}/creator`,
                  })
                }>
                Sign in
              </button>
            )}
          </div>
        </div>

        <div className="relative"> {children}</div>
      </div>
    </main>
  );
}
