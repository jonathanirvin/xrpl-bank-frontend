import { SendXRP } from "./wallet-ui/send-xrp";
import WalletBalance from "./wallet-ui/wallet-balance";
import { WalletInfo } from "./wallet-ui/wallet-info";
import { WalletSeed } from "./wallet-ui/wallet-seed";

interface WalletProps {
  address?: string;
}

export const SourceWallet: React.FC<WalletProps> = ( { address } ) => {

  return (
    <div className="Wallet">
      <div className="WalletRow header">Source Wallet</div>

      <WalletSeed />
      <WalletInfo />
      <WalletBalance />  
      <SendXRP />
      
    </div>
  );
}