import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
try {
    const publicKey = new PublicKey(suppliedPublicKey);
    if (!PublicKey.isOnCurve(publicKey)) {
        throw new Error("Public key does is not valid, not being on the ed25519 curve.");

    }
    const balanceInLamports = await connection.getBalance(publicKey);
    
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    
    console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
    );
} catch (error) {
    console.log(error.message)
}
 