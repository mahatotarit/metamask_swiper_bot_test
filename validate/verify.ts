import { ethers } from 'ethers';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const private_keyverify = 'YOUR_PRIVATE_KEY';
const rpcUrls = [
  'https://data-seed-prebsc-1-s1.binance.org:8545',
  'https://data-seed-prebsc-2-s1.binance.org:8545',
  'http://data-seed-prebsc-1-s2.binance.org:8545',
  'http://data-seed-prebsc-2-s2.binance.org:8545',
  'https://data-seed-prebsc-1-s3.binance.org:8545',
  'https://data-seed-prebsc-2-s3.binance.org:8545',
];
const contractABI: any[] = ['YOUR_CONTRACT_ABI'];

class Verify {
  private readonly provider: ethers.providers.JsonRpcProvider;
  private readonly wallet: ethers.Wallet;
  private readonly contract: ethers.Contract;
    static contract: any;

  constructor() {
    this.provider = this.setProvider(rpcUrls);

    this.wallet = new ethers.Wallet(private_keyverify, this.provider);

    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      this.wallet,
    );
  }

  private setProvider(rpcUrls: string[]): ethers.providers.JsonRpcProvider {
    let success = false;
    let index = 0;
    let provider: ethers.providers.JsonRpcProvider;

    while (!success && index < rpcUrls.length) {
      try {
        provider = new ethers.providers.JsonRpcProvider(rpcUrls[index]);
        provider.getBlockNumber();
        success = true;
      } catch (error) {
        index++;
      }
    }

    if (!success) {
      console.error('Failed to set provider using all provided RPC URLs.');
    }

    return this.provider;
  }

  public static async verify(data: string) {
    try {
      const tx = await this.contract.setData(data);
      await tx.wait();
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
}

export { Verify };
