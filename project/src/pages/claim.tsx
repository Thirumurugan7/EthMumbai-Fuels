import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import { FuelLogo } from "@/components/FuelLogo";
import { Wallet, bn } from "fuels";
import { useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";

const contractId = contractIds.testContract;

const hasContract = process.env.NEXT_PUBLIC_HAS_CONTRACT === "true";




export default function Claim() {

    const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
    const [contract, setContract] = useState<TestContractAbi>();
    const [counter, setCounter] = useState<boolean>();


    useAsync(async () => {
        if (hasContract && wallet) {
          const testContract = TestContractAbi__factory.connect(contractId, wallet);
          setContract(testContract);
        }
      }, [wallet]);

    const onPressed = async () => {
        alert("button clicked");
        if (!contract) {
          return toast.error("Contract not loaded");
        }
        const adminAddress = "0x1a8368dA55fE1f0E35DBdBA6E3D75374Af199fa5"; // The admin's Ethereum address
        const claimTime = 123; // Number of blocks for the claiming period
        const merkleRoot = "0x34sfwhy886g"; // The Merkle root hash
        const numLeaves = 456; 
    
        const { value } = await contract.functions.constructor(adminAddress, claimTime, merkleRoot, numLeaves).call();
        setCounter(value);
    
        await refreshWalletBalance?.();
      };


    return(
        <div>
        <div>claim</div>
        <Button onClick={onPressed} className="mt-6">
            claim function
        </Button>
        <div>
            Counter is :{counter}
        </div>
      </div>
    );
}