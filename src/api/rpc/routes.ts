import express from 'express';
const rpcRoutes = express.Router();
import {
  getBlockcountHandler,
  getBlockHandler,
  getBlockhashHandler,
  getBlockchaininfoHandler,
  getDifficultyHandler,
  getNetworkhashpsHandler,
  getTxoutsetinfoHandler,
  getBlockstatsHandler,
} from './handlers.js';

/**
 * @openapi
 * /api/rpc/getblockcount:
 *   get:
 *     tags:
 *      - RPC
 *     summary: The current block count
 *     responses:
 *       200:
 *         description: |
 *           Returns the height of the most-work fully-validated chain. See: https://developer.bitcoin.org/reference/rpc/getblockcount.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/BlockcountResponse'
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getblockcount', getBlockcountHandler);

/**
 * @openapi
 * /api/rpc/getblock/{hash}:
 *  get:
 *     tags:
 *     - RPC
 *     summary: The block's information, including each transaction.
 *     parameters:
 *      - name: blockhash
 *        schema:
 *          type: string
 *        in: path
 *        description: The hash of the block
 *        required: true
 *     responses:
 *       200:
 *         description: |
 *           Returns an object with block's information and each transaction. See: https://developer.bitcoin.org/reference/rpc/getblock.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/BlockResponse'
 *       404:
 *         description: Block not found.
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getblock/:hash', getBlockHandler);

/**
 * @openapi
 * /api/rpc/getblockhash/{height}:
 *  get:
 *     tags:
 *     - RPC
 *     summary: The block's hash.
 *     parameters:
 *      - name: blockheight
 *        schema:
 *          type: integer
 *          minimun: 1
 *        in: path
 *        description: The height/index of the block
 *        required: true
 *     responses:
 *       200:
 *         description: |
 *           Returns hash of block in best-block-chain at height provided. See: https://developer.bitcoin.org/reference/rpc/getblockhash.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/BlockhashResponse'
 *       404:
 *         description: Block not found.
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getblockhash/:index', getBlockhashHandler);

/**
 * @openapi
 * /api/rpc/getblockstats/{hash_or_height}:
 *  get:
 *     tags:
 *     - RPC
 *     summary: The block statistics for a given window. Amounts are in satoshis.
 *     parameters:
 *      - name: hash_or_height
 *        schema:
 *          oneOf:
 *            - type: string
 *            - type: integer
 *        in: path
 *        description: The block hash or height of the target block
 *        required: true
 *     responses:
 *       200:
 *         description: |
 *           Returns an object with block's statistics. See: https://developer.bitcoin.org/reference/rpc/getblockstats.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/BlockstatsResponse'
 *       404:
 *         description: Block not found.
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getblockstats/:index', getBlockstatsHandler);

/**
 * @openapi
 * /api/rpc/getblockchaininfo:
 *  get:
 *     tags:
 *     - RPC
 *     summary: The state info regarding blockchain.
 *     responses:
 *       200:
 *         description: |
 *           Returns an object containing various state info regarding blockchain processing. See: https://developer.bitcoin.org/reference/rpc/getblockchaininfo.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/BlockchaininfoResponse'
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getblockchaininfo', getBlockchaininfoHandler);

/**
 * @openapi
 * /api/rpc/getdifficulty:
 *  get:
 *     tags:
 *     - RPC
 *     summary: The blockchain's proof-of-work difficulty.
 *     responses:
 *       200:
 *         description: |
 *           Returns the proof-of-work difficulty as a multiple of the minimum difficulty. See: https://developer.bitcoin.org/reference/rpc/getdifficulty.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/difficultyResponse'
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getdifficulty', getDifficultyHandler);

/**
 * @openapi
 * /api/rpc/getnetworkhashps:
 *  get:
 *     tags:
 *     - RPC
 *     summary: The estimated network hashes per second.
 *     responses:
 *       200:
 *         description: |
 *           Returns the estimated network hashes per second based on the last n blocks. See: https://developer.bitcoin.org/reference/rpc/getnetworkhashps.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/NetworkhashResponse'
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getnetworkhashps', getNetworkhashpsHandler);

/**
 * @openapi
 * /api/rpc/gettxoutsetinfo:
 *  get:
 *     tags:
 *     - RPC
 *     summary: The statistics about the unspent transaction output set.
 *     responses:
 *       200:
 *         description: |
 *           Returns statistics about the unspent transaction output set. See: https://developer.bitcoin.org/reference/rpc/gettxoutsetinfo.html
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/GettxoutsetinfoResponse'
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
rpcRoutes.get('/getTxoutsetinfo', getTxoutsetinfoHandler);

export default rpcRoutes;
