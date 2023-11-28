import { Request, Response } from 'express';
import rpc from '../../lib/rpc.js';

export async function getBlockcountHandler(_req: Request, res: Response) {
  const blockcount = await rpc.fetchBlockcount();
  return res.status(200).send({ blockcount });
}

export async function getBlockHandler(req: Request, res: Response) {
  // test block hash: 0000000001d895e7a5056d414aacdef3f5c00cd6135ba9b533dbd912273fc74d
  if (!req.params.hash) {
    throw new Error('A block hash is required.');
  }

  const block = await rpc.fetchBlock(req.params.hash);
  return res.status(200).send({ block });
}

export async function getBlockhashHandler(req: Request, res: Response) {
  if (!req.params.index || isNaN(parseInt(req.params.index))) {
    throw new Error('Block index/height invalid.');
  }

  const blockhash = await rpc.fetchBlockhash(parseInt(req.params.index));
  return res.status(200).send({ blockhash });
}

export async function getBlockstatsHandler(req: Request, res: Response) {
  if (!req.params.index || isNaN(parseInt(req.params.index))) {
    throw new Error('Block index/height invalid.');
  }

  const blockstats = await rpc.fetchBlockstats(parseInt(req.params.index));
  return res.status(200).send({ blockstats });
}

export async function getBlockchaininfoHandler(_req: Request, res: Response) {
  const blockchaininfo = await rpc.fetchBlockchaininfo();
  return res.status(200).send({ blockchaininfo });
}

export async function getDifficultyHandler(_req: Request, res: Response) {
  const difficulty = await rpc.fetchDifficulty();
  return res.status(200).send({ difficulty });
}

export async function getNetworkhashpsHandler(_req: Request, res: Response) {
  const hashrate = await rpc.fetchNetworkhashps();
  return res.status(200).send({ hashrate });
}

export async function getTxoutsetinfoHandler(_req: Request, res: Response) {
  const txoutsetinfo = await rpc.fetchTxoutsetinfo();
  return res.status(200).send({ txoutsetinfo });
}
