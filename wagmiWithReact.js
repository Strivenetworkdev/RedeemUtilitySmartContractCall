import React, { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import contractABI from "./contractABI.json";
import { polygon } from "wagmi/chains";

function CreateOrder() {
  const [utilityIdOnChain, setUtilityIdOnChain] = useState(3);
  const [tokenIdOnChain, setTokenIdOnChain] = useState(5);
 
  const { isConnected, address } = useAccount();

  const {
    data: signer,
  } = useSigner({ chainId: polygon.id });

  const contract = useContract({
    address: "0xb335121a11ECB1310089425a8dB8EaF7900cb224,      //Update the contract address
    abi: contractABI,
    signerOrProvider: signer,
  });

  // const gasprice = signer.getGasPrice();


  const redeemed = async () => {
    console.log(`Redeeming Utility Token utilityIdOnChain: ${utilityIdOnChain} and tokenIdOnChain: ${tokenIdOnChain}`)
    const transaction = await contract
      .RedeemUtility(
        utilityIdOnChain,
        tokenIdOnChain
        { gasLimit: 10000000, value: String(amount * Math.pow(10, 18)) }
      )
      .catch((e) => {
        console.log(e);
        return;
      });

    console.log("Utility Token Redeemed ");
    const txn_receipt = await transaction.wait();
    console.log(txn_receipt);
    //Proceed with the control flow, the transaction will be captured by strive and updated automaticaly 
    
    } else {
      console.log("Something went wrong, Couldn't redeem");
    }

   
  return (
    <>
      <button onClick=(()=>{
        redeemed()
      })>Redeem</button>
    </>
  );
}

export default CreateOrder;
