import express, { Request, Response } from 'express';
const routes = express.Router();
import {
  getBlockHandler,
  getLatestBlocksHandler,
  getCoinStatsHandler,
} from './handlers.js';

/**
 * @openapi
 * /api/healthcheck:
 *  get:
 *     tags:
 *     - Server stats
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
routes.get('/healthcheck', (_req: Request, res: Response) =>
  res.sendStatus(200),
);

/**
 * @openapi
 * /api/latestblocks:
 *  get:
 *     tags:
 *     - General
 *     summary: |
 *          The latest 500 blocks retrieved from the blockchain. Steps: 5 -> 100 -> 500
 *     responses:
 *       200:
 *         description: |
 *           Returns an array of latest blocks.
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/LatestBlocksResponse'
 *       500:
 *         description: RPC fetch failed. coind/coin-qt is probably not running.
 */
routes.get('/latestblocks', getLatestBlocksHandler);
routes.get('/block', getBlockHandler);
routes.get('/coinstats', getCoinStatsHandler);

export default routes;
