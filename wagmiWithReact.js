import React, { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import contractABI from "./contractABI.json";
import { goerli } from "wagmi/chains";

function CreateOrder() {
  const [smartContractAddress, setSmartContractAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isConnected, address } = useAccount();

  const {
    data: signer,
  } = useSigner({ chainId: goerli.id });

  const contract = useContract({
    address: smartContractAddress,
    abi: contractABI,
    signerOrProvider: signer,
  });

  // const gasprice = signer.getGasPrice();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(goerli.id);
    if (!isConnected) {
      navigate("/");
    }
  }, []);

  // const contractRead = useContractRead({
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: contractABI,
  //   functionName: 'getSleep',
  // })

  const gun = Gun({
    peers: ["http://localhost:3500/gun"],
    localStorage:false
  });

  const createOrder = async () => {
    if (smartContractAddress === "") {
      toast.error("Smart contract address cannot be empty!");
    }
    if (sellerAddress === "") {
      toast.error("Seller address cannot be empty!");
    }
    if (amount === undefined) {
      toast.error("Amount cannot be empty!");
    }
    if (date === null) {
      toast.error("contract expiry cannot be empty!");
    }
    if (
      smartContractAddress === "" ||
      sellerAddress === "" ||
      amount === 0 ||
      date === null
    ) {
      return;
    }
    toast.info("Aprrove transaction in metamask");
    const unix = Math.floor(date / 1000);

    setLoading(true);
    const transaction = await contract
      .Redeem(
        String(amount * Math.pow(10, 18)),
        sellerAddress,
        address,
        unix,
        { gasLimit: 10000000, value: String(amount * Math.pow(10, 18)) }
      )
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return;
      });

    console.log("Creating Contract On Blockchain");
    const txn_receipt = await transaction.wait();
    console.log(txn_receipt);
    
    } else {
      console.log("Something went wrong, couldn't deploy contract!");
    }

   
  return (
    <>
      <button>Redeem</button>
    </>
  );
}

export default CreateOrder;
