import { Request, Response } from 'express';
import db, { getBlock } from '../lib/database.js';
import BadRequestError from '../errors/BadRequestError.js';
import { isEmpty } from '../utils/index.js';

export async function getLatestBlocksHandler(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const amount = parseInt(req.query.amount as string) || 5;

  // Calculate start and end indexes for pagination
  const startIndex = (page - 1) * amount;
  const endIndex = page * amount;

  const latestBlocks = await db.getLatestBlocks(amount);
  return res.status(200).send(latestBlocks);
}

export async function getBlockHandler(req: Request, res: Response) {
  // queries supported: height(number), hash(string)

  // do not allow more than two URL queries
  if (Object.keys(req.query).length > 1) {
    throw new BadRequestError({
      message: 'Only one query is permitted.',
      context: {
        msg: 'Queries available for "block": <height> or <hash>',
      },
    });
  }

  if (isEmpty(req.query)) {
    throw new BadRequestError({
      message: 'No query found.',
      context: {
        msg: 'Queries available for "block": <height> or <hash>',
      },
    });
  }

  if (req.query.height) {
    if (isNaN(parseInt(req.query.height as string))) {
      throw new BadRequestError({
        message: 'Invalid block height.',
        context: {
          msg: 'Block height must be a number',
        },
      });
    } else {
      const block = await getBlock(parseInt(req.query.height as string));
      if (block) {
        return res.status(200).send(block);
      }
      return res.status(404).send({ msg: 'Block not found' });
    }
  }

  if (req.query.hash) {
    const block = await getBlock(req.query.hash as string);
    if (block) {
      return res.status(200).send(block);
    }
    return res.status(404).send({ msg: 'Block not found' });
  }

  // user made up a query ?
  throw new BadRequestError({
    message: 'Invalid query.',
    context: {
      msg: 'Queries available for "block": <height> or <hash>',
    },
  });
}
