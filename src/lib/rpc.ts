import {
  RpcBlock,
  RpcBlockCount,
  RpcBlockStats,
  RpcBlockchainInfo,
  RpcBlockhash,
  RpcDifficulty,
  RpcHashrate,
  RpcMethod,
  RpcRawTx,
  RpcResponse,
  RpcTxoutSetInfo,
} from '../types/rpc.types.js';

export function rpcFetch<T>(rpcMethod: RpcMethod, params = '[]') {
  const bodyData = `{"jsonrpc":"1.0","id":"curltext","method":"${rpcMethod}","params":${params}}`; // params should be ["<params>"] for strings and [<params>] for numbers
  return fetch(`http://localhost:8638/`, {
    method: 'POST',
    headers: {
      'Content-type': 'text/plain',
      Authorization: `Basic ${Buffer.from('user:password', 'binary').toString(
        'base64',
      )}`,
    },
    body: bodyData,
  })
    .then(
      (response: {
        ok: any;
        statusText: string;
        json: () => Promise<RpcResponse<T>>;
      }) => {
        if (!response.ok) {
          throw new Error('BAD RESPONSE FROM RPC CLIENT');
        }
        return response.json();
      },
    )
    .then((data: RpcResponse<T>) => {
      return data.result;
    })
    .catch((error: Error) => {
      console.log(error);
      throw new Error('RPC fetch failed. Check if coind is running...');
    });
}

export async function fetchBlockcount(): Promise<RpcBlockCount> {
  return await rpcFetch<RpcBlockCount>('getblockcount');
}

export async function fetchBlock(hash: string): Promise<RpcBlock> {
  return await rpcFetch<RpcBlock>('getblock', `["${hash}", 2]`);
}

export async function fetchBlockhash(index: number): Promise<RpcBlockhash> {
  return await rpcFetch<RpcBlockhash>('getblockhash', `[${index}]`);
}

export async function fetchBlockstats(
  blockId: string | number,
): Promise<RpcBlockStats> {
  if (typeof blockId === 'string') {
    // find by hash
    return await rpcFetch(
      'getblockstats',
      `["${blockId}", ["height","blockhash","time","txs","total_out","subsidy"]]`,
    );
  }
  // find by height(index)
  return await rpcFetch(
    'getblockstats',
    `[${blockId}, ["height","blockhash","time","txs","total_out","subsidy"]]`,
  );
}

export async function fetchBlockchaininfo(): Promise<RpcBlockchainInfo> {
  return await rpcFetch<RpcBlockchainInfo>('getblockchaininfo');
}

export async function fetchDifficulty(): Promise<RpcDifficulty> {
  return await rpcFetch<RpcDifficulty>('getdifficulty');
}

export async function fetchNetworkhashps(): Promise<RpcHashrate> {
  return await rpcFetch<RpcHashrate>('getnetworkhashps');
}

export async function fetchTxoutsetinfo(): Promise<RpcTxoutSetInfo> {
  return await rpcFetch<RpcTxoutSetInfo>('gettxoutsetinfo');
}

export async function fetchRawtransction(txHash: string): Promise<RpcRawTx> {
  return await rpcFetch<RpcRawTx>('getrawtransaction', `["${txHash}", true]`);
}

const rpc = {
  fetchBlock,
  fetchBlockcount,
  fetchBlockhash,
  fetchBlockstats,
  fetchBlockchaininfo,
  fetchDifficulty,
  fetchNetworkhashps,
  fetchTxoutsetinfo,
};

export default rpc;
