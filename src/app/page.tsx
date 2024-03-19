import { SignInButton, auth } from "@clerk/nextjs";

import Main from "@/components/main";

export default function Home() {
  const { userId }: { userId: string | null } = auth();
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      {!userId ? (
        <SignInButton>
          <button className="bg-blue-400 p-4 w-52 hover:bg-blue-600">
            Signin
          </button>
        </SignInButton>
      ) : (
        <Main />
      )}
    </div>
  );
}
