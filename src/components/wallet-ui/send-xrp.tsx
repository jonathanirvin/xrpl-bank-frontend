import {
  ReserveRequirement,
  useBalance,
  useSendXRP
} from "@nice-xrpl/react-xrpl";
import { useState } from "react";

export function SendXRP() {
  // The useSendXRP hook can be used to send XRP to
  // another account.  This is a transactional hook and
  // requires a wallet.
  const sendXRP = useSendXRP();
  const balance = useBalance();

  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(48);
  const [sending, setSending] = useState(false);

  let reserveRequirement = ReserveRequirement;
  if ( reserveRequirement > 1 ) {
    reserveRequirement = 1;
  }

  return (
    <div className="WalletRow">
      Send{" "}
      <input
        value={amount}
        onChange={(e) => setAmount(parseInt(e.currentTarget.value, 10))}
        type="number"
      />{" "}
      XRP to{" "}
      <input
        value={destinationAddress}
        onChange={(e) => setDestinationAddress(e.currentTarget.value)}
        type="text"
      />{" "}
      -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          onClick={async () => {
            setSending(true);
            try {
              const result = await sendXRP(destinationAddress, amount);
              console.log("UI: ", result);
            } catch (e) {
              alert(e);
            }

            setSending(false);
          }}
          disabled={
            !amount ||
            amount >= balance - reserveRequirement ||
            !destinationAddress
          }
        >
          Send
        </button>
      )}
    </div>
  );
}
