const { ethers } = require("ethers");

// Contract ABI
const contractABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "panelId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "expertIds",
        type: "uint256[]",
      },
    ],
    name: "PanelAdded",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_panelId", type: "uint256" },
      { internalType: "uint256[]", name: "_expertIds", type: "uint256[]" },
    ],
    name: "addPanelExperts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_panelId", type: "uint256" }],
    name: "getPanelExperts",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Contract Address (replace with your deployed contract address)
const contractAddress = "0x74d1e59464c08b545e95e828563eff9dd60af8a8";

async function interactWithContract() {
  try {
    // Connect to an Ethereum network (e.g., Sepolia testnet)
    const provider = new ethers.JsonRpcProvider(
      "https://sepolia.infura.io/v3/cffb67b8b2b940f0887d381c0b55eaf5"
    );

    // Create a wallet instance (replace with your private key)
    const privateKey =
      "0b9e476224a9b94ec44c5144519d08c3381b957520a216142c12142aa281cedb";
    const wallet = new ethers.Wallet(privateKey, provider);

    // Connect to the existing contract
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Add panel experts
    const panelId = 2;
    const expertIds = [101, 102, 103];
    const tx = await contract.addPanelExperts(panelId, expertIds);
    await tx.wait(); // Wait for transaction to be mined
    console.log("Panel experts added successfully");

    // Retrieve panel experts
    const retrievedExperts = await contract.getPanelExperts(panelId);
    console.log("Retrieved Experts:", retrievedExperts);
  } catch (error) {
    console.error("Error:", error);
  }
}


interactWithContract();
