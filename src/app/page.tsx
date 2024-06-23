import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { BackgroundBeams } from "./components/ui/background-beams";
import { FlipWords } from "./components/ui/flipwords";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const words = ["Organize", "Plan", "Design", "Grow"];

  return (
    <main className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased ">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex flex-col">
          <FlipWords
            words={words}
            className=" text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold py-1"
          />{" "}
          <br />
          <h1 className="text-center text-lg md:text-4xl text-neutral-500 ">
            {" "}
            with
          </h1>
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            CreatorX
          </h1>
        </div>

        <div className="flex flex-col py-3 items-end">
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-lg text-center relative z-10 py-3">
            A platform for creators to share their work, connect with others,
            and grow their audience. Get started today!
          </p>
          <button className="w-2/5  h-12 animate-shimmer  justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]  font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer">
            Get Started
          </button>
        </div>
        <BackgroundBeams />
      </div>
      <div className="border-red-500 border-2 rounded-lg absolute top-0 right-0 flex gap-2">
        {!(await isAuthenticated()) ? (
          <>
            <LoginLink className="btn btn-ghost sign-in-btn">Sign in</LoginLink>
            <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
          </>
        ) : (
          <div className="profile-blob">
            {user?.picture ? (
              <img
                className="avatar"
                src={user?.picture}
                alt="user profile avatar"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="avatar">
                {user?.given_name?.[0]}
                {user?.family_name?.[0]}
              </div>
            )}
            <div>
              <p className="text-heading-2">
                {user?.given_name} {user?.family_name}
              </p>

              <LogoutLink className="text-subtle">Log out</LogoutLink>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
