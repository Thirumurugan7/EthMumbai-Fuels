import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import { FuelLogo } from "@/components/FuelLogo";
import { bn } from "fuels";
import { useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";

const contractId = contractIds.testContract;

const hasContract = process.env.NEXT_PUBLIC_HAS_CONTRACT === "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";

export default function Home() {
  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
  const [contract, setContract] = useState<TestContractAbi>();
  const [counter, setCounter] = useState<number>();

  /**
   * useAsync is a wrapper around useEffect that allows us to run asynchronous code
   * See: https://github.com/streamich/react-use/blob/master/docs/useAsync.md
   */
  useAsync(async () => {
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const { value } = await testContract.functions.get_count().get();
      setCounter(value.toNumber());
    }
  }, [wallet]);

  // eslint-disable-next-line consistent-return
  const onIncrementPressed = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const { value } = await contract.functions.increment_counter(bn(1)).call();
    setCounter(value.toNumber());

    await refreshWalletBalance?.();
  };

  return (
    <>
    <div className="grid grid-cols-2">
      <div>
        <div className="text-6xl text-green-400 font-semibold">CLAIM YOUR TOKEN</div>
        <div className="text-6xl text-white font-semibold">AND RIDE THE WAVE</div>
        <div className="text-6xl text-white font-semibold">OF OUR AIRDROP</div>
        <div className="text-6xl text-white font-semibold">OPPORTUNITY!</div>
      </div>
      <div>
        <div className="text-lg">
        TokenRain is here to shower you with rewards through our exclusive airdrop. Don't miss out on your chance to claim your share. Join us today and let the tokens rain into your wallet!
        </div>
      <Button onClick={onIncrementPressed} className="mt-6">
            Increment Counter
      </Button>
      </div>
   
    </div>
               
    </>
  );
}
