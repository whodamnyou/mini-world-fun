// import { PayBlock } from "@/components/pay-block";
// import { SignIn } from "@/components/sign-in";
// import { VerifyBlock } from "@/components/verify-block";
import SwipeFeature from "@/components/swipe-feature";
// import ethers from "ethers";

// const getAbiMethods = () => {
//   const abi = require("../public/abi.json");
//   const tokenFactoryAbi = abi.sources["contracts/contracts/TokenFactory.sol"];
//   const tokenAbi = abi.sources["contracts/contracts/Token.sol"];
  
//   const tokenFactoryMethods = Object.keys(tokenFactoryAbi.content.match(/function\s+(\w+)/g) || [])
//     .map(key => tokenFactoryAbi.content.match(/function\s+(\w+)/g)[key].split(" ")[1]);

//   const tokenMethods = Object.keys(tokenAbi.content.match(/function\s+(\w+)/g) || [])
//     .map(key => tokenAbi.content.match(/function\s+(\w+)/g)[key].split(" ")[1]);

//   return {
//     tokenFactory: tokenFactoryMethods,
//     token: tokenMethods
//   };
// };

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