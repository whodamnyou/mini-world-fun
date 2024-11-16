// import { PayBlock } from "@/components/pay-block";
// import { SignIn } from "@/components/sign-in";
// import { VerifyBlock } from "@/components/verify-block";
import SwipeFeature from "@/components/swipe-feature";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center mt-4 p-4">
      {/* <SignIn /> */}
      {/* <VerifyBlock />
      <PayBlock /> */}
      <SwipeFeature />
    </main>
  );
}