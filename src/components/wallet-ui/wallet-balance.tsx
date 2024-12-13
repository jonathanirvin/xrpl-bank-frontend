import { useBalance, useWalletAddress } from "@nice-xrpl/react-xrpl";

export function WalletBalance() {
  const balance = useBalance();
  const address = useWalletAddress();
  console.log( 'destination balance', balance );
  console.log( 'destination address', address );
  return <div className="WalletRow">Balance: {balance}</div>;
}

export default WalletBalance;