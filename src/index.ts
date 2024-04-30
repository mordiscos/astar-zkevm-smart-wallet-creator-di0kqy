import axios from 'axios';

// Function to create a new Crossmint custodial wallet for a user on Astar zkEVM
async function createCrossmintWallet(email: string, chain: string) {
    const apiKey = 'YOUR_CROSSMINT_API_KEY'; // Replace with your actual Crossmint API key
    const url = 'https://www.crossmint.com/api/v1-alpha1/wallets'; // Production environment URL

    try {
        const response = await axios.post(
            url,
            {
                email: email,
                chain: chain
            },
            {
                headers: {
                    'X-API-KEY': apiKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 201) {
            console.log('Wallet created:', response.data);
            return response.data;
        } else if (response.status === 200) {
            console.log('Wallet already exists:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error creating wallet:', error.response?.data || error.message);
        throw error;
    }
}

// Example usage
const userEmail = 'user@example.com';
const blockchain = 'arbitrum'; // Specify 'arbitrum' for Astar zkEVM or another chain as needed

createCrossmintWallet(userEmail, blockchain)
    .then(wallet => console.log('Created wallet:', wallet))
    .catch(error => console.error('Failed to create wallet:', error));
