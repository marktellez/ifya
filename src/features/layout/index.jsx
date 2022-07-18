import { useSession, signIn, signOut } from "next-auth/react";

import HeartIcon from "@/ui/icons/heart";

export default function Layout({ children, creator }) {
  const { data: session } = useSession();
  return (
    <main className="w-full md:w-[824px] mx-auto text-white">
      <div className=" mx-auto relative w-[260px] flex items-center justify-center ">
        <div>
          <div className="z-50 absolute left-0 top-[70px] text-3xl font-medium tracking-wide drop-shadow-sm">
            If ya like it...
          </div>
          <div className="absolute right-0 top-[100px] z-50  text-4xl font-bold drop-shadow-sm">
            Show some
          </div>
        </div>

        <HeartIcon className="transform -rotate-6 text-red-500  h-[220px] w-[220px] drop-shadow-lg" />
      </div>

      <div className="-mt-20 border bg-white text-gray-900 md:rounded-2xl p-6">
        <div className="relative ">
          <div className="absolute right-0">
            {JSON.stringify(session)}
            {session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button
                onClick={() =>
                  signIn({
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
