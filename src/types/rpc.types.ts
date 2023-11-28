// for more info: https://developer.bitcoin.org/reference/rpc/

export type RpcBlockCount = number;
export type RpcBlockhash = string;
export type RpcDifficulty = number;
export type RpcHashrate = number;
export type RpcMethod =
  | 'getbestblockhash'
  | 'getblock'
  | 'getblockchaininfo'
  | 'getblockcount'
  | 'getblockhash'
  | 'getblockheader'
  | 'getblockstats'
  | 'getblocktemplate'
  | 'getchaintips'
  | 'getchaintxstats'
  | 'getdifficulty'
  | 'getmemoryinfo'
  | 'getmempoolinfo'
  | 'getmininginfo'
  | 'getnetworkhashps'
  | 'getnetworkinfo'
  | 'getpeerinfo'
  | 'getrawmempool'
  | 'getrawtransaction'
  | 'gettxoutsetinfo';

export interface RpcResponse<T> {
  result: T;
  error: null | {
    code: number;
    message: string;
  };
  id: string;
}

export interface RpcBlock {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: Transaction[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  auxdifficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
}

export interface RpcBlockStats {
  avgfee: number;
  avgfeerate: number;
  avgtxsize: number;
  blockhash: string;
  feerate_percentiles: number[];
  height: number;
  ins: number;
  maxfee: number;
  maxfeerate: number;
  maxtxsize: number;
  medianfee: number;
  mediantime: number;
  mediantxsize: number;
  minfee: number;
  minfeerate: number;
  mintxsize: number;
  outs: number;
  subsidy: number;
  swtotal_size: number;
  swtotal_weight: number;
  swtxs: number;
  time: number;
  total_out: number;
  total_size: number;
  total_weight: number;
  totalfee: number;
  txs: number;
  utxo_increase: number;
  utxo_size_inc: number;
}

export interface SoftFork {
  type: string;
  active: boolean;
  height: number;
}
export interface RpcBlockchainInfo {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  auxdifficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  softforks: {
    bip34: SoftFork;
    bip66: SoftFork;
    locktime: SoftFork;
    segwit: SoftFork;
    finaltx: {
      type: string;
      bip9: {
        status: string;
        start_time: number;
        timeout: number;
        since: number;
      };
      height: number;
      active: boolean;
    };
  };
  warnings: string;
}

export interface RpcTxoutSetInfo {
  height: number;
  bestblock: string;
  transactions: number;
  txouts: number;
  bogosize: number;
  hash_serialized_2: string;
  disk_size: number;
  total_value: number;
  total_amount: number;
}

export interface RpcRawTx {
  in_active_chain?: boolean;
  hex: string;
  txid: string;
  hash: string;
  size: number;
  vsize: number;
  weight: number;
  version: number;
  locktime: number;
  vin: Array<{
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    };
    sequence: number;
    txinwitness: string[];
  }>;
  vout: Array<{
    value: number;
    n: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      reqSigs: number;
      type: string;
      addresses: string[];
    };
  }>;
  blockhash: string;
  confirmations: number;
  blocktime: number;
  time: number;
}

export interface Transaction {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  lockheight: number;
  vin: Vin[];
  vout: Vout[];
  hex: string;
}

interface Vin {
  coinbase?: string;
  txid?: string;
  vout?: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
}

interface Vout {
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs?: number;
    type: string;
    addresses?: string[];
  };
}
