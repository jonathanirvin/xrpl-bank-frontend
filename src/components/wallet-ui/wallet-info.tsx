import { useWalletAddress } from "@nice-xrpl/react-xrpl";

export function WalletInfo() {
  // The useWalletAddress hook gives you the address
  // of the wallet used up in the tree.
  const address = useWalletAddress();
  console.log( 'addy from wallet-info', address );

  return <div className="WalletRow">Address: {address}</div>;
}
