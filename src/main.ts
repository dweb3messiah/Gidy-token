/*import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { userKeypair } from "./helpers";
import { createV1, mintV1, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import { percentAmount } from '@metaplex-foundation/umi';
import { generateSigner } from "@metaplex-foundation/umi";


const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair))
    .use(mplTokenMetadata())

const metadata = {
        name: "Solana Gold",
        symbol: "GOLDSOL",
        uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
 };
    
const mint = generateSigner(umi);
    async function createMetadataDetails() {
        await createV1(umi, {
            mint,
            authority: umi.identity,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            sellerFeeBasisPoints: percentAmount(0),
            decimals: 9,
            tokenStandard: TokenStandard.Fungible,
        }).sendAndConfirm(umi)
}

async function mintToken() {
    await mintV1(umi, {
        mint: mint.publicKey,
        authority: umi.identity,
        amount: 10_000,
        tokenOwner: umi.identity.publicKey,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi)
}

createFungible(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 9,
}).sendAndConfirm(umi);*/

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { percentAmount } from '@metaplex-foundation/umi';
import { mplTokenMetadata, createV1, mintV1, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { userKeypair } from "./helpers";
import { generateSigner } from "@metaplex-foundation/umi";

const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair))
    .use(mplTokenMetadata());

const metadata = {
    name: "Gidy",
    symbol: "GID",
    uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
};

// Generate a new signer (mint account)
const mint = generateSigner(umi);

async function createMetadataDetails() {
    console.log('Creating token metadata...');
    await createV1(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi);
    console.log('Metadata created successfully.');
}

async function mintToken() {
    console.log('Minting tokens...');
    await mintV1(umi, {
        mint: mint.publicKey,
        authority: umi.identity,
        amount: 10_000,
        tokenOwner: umi.identity.publicKey,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi);
    console.log('Tokens minted successfully.');
}

// Self-invoking async function to run the token creation and minting process
(async () => {
    try {
        // Log the Solana public wallet address and the token (mint) address
        console.log('Solana Public Wallet Address:', keypair.publicKey.toString());
        console.log('Mint Address (Token Address):', mint.publicKey.toString());

        await createMetadataDetails();
        await mintToken();
    } catch (error) {
        console.error('Error running the token program:', error);
    }
})();



