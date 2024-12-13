import { useWalletAddress } from "@nice-xrpl/react-xrpl";
import { Suspense } from "react";
import WalletBalance from "./wallet-ui/wallet-balance";
import { WalletInfo } from "./wallet-ui/wallet-info";

export const DestinationWallet: React.FC = () => {

  const address = useWalletAddress();
  console.log('addy from destination wallet', address);
  return (
    <div className="Wallet">
      <div className="WalletRow header">Destination Wallet</div>
      <WalletBalance />
     
        <WalletInfo />
        
    

    </div>
  );
}

