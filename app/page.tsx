// import { PayBlock } from "@/components/pay-block";
// import { SignIn } from "@/components/sign-in";
// import { VerifyBlock } from "@/components/verify-block";
import SwipeFeature from "@/components/swipe-feature";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      {/* <SignIn /> */}
      {/* <VerifyBlock />
      <PayBlock /> */}
      <SwipeFeature />
    </main>
  );
}