/**
 * @openapi
 * components:
 *   schemas:
 *     BlockcountResponse:
 *       type: object
 *       properties:
 *         blockcount:
 *           type: number
 *
 *     BlockResponse:
 *       type: object
 *       properties:
 *         block:
 *           type: object
 *           properties:
 *             hash:
 *               type: string
 *             confirmations:
 *               type: number
 *             strippedsize:
 *               type: number
 *             size:
 *               type: number
 *             weight:
 *               type: number
 *             height:
 *               type: number
 *             version:
 *               type: number
 *             versionHex:
 *               type: string
 *             merkleroot:
 *               type: string
 *             tx:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *             time:
 *               type: number
 *             mediantime:
 *               type: number
 *             nonce:
 *               type: number
 *             bits:
 *               type: string
 *             difficulty:
 *               type: number
 *             auxdifficulty:
 *               type: number
 *             chainwork:
 *               type: string
 *             nTx:
 *               type: number
 *             previousblockhash:
 *               type: string
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         txid:
 *           type: string
 *         hash:
 *           type: string
 *         version:
 *           type: number
 *         size:
 *           type: number
 *         vsize:
 *           type: number
 *         weight:
 *           type: number
 *         locktime:
 *           type: number
 *         lockheight:
 *           type: number
 *         vin:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vin'
 *         vout:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vout'
 *         hex:
 *           type: string
 *
 *     Vin:
 *       type: object
 *       properties:
 *         coinbase:
 *           type: string
 *         txid:
 *           type: string
 *         vout:
 *           type: number
 *         scriptSig:
 *           type: object
 *           properties:
 *             asm:
 *               type: string
 *             hex:
 *               type: string
 *         sequence:
 *           type: number
 *
 *     Vout:
 *       type: object
 *       properties:
 *         value:
 *           type: number
 *         n:
 *           type: number
 *         scriptPubKey:
 *           type: object
 *           properties:
 *             asm:
 *               type: string
 *             hex:
 *               type: string
 *             reqSigs:
 *               type: number
 *             type:
 *               type: string
 *             addresses:
 *               type: array
 *               items:
 *                 type: string
 *
 *     BlockhashResponse:
 *       type: object
 *       properties:
 *         blockhash:
 *           type: string
 *
 *     BlockstatsResponse:
 *       type: object
 *       properties:
 *         avgfee:
 *           type: number
 *         avgfeerate:
 *           type: number
 *         avgtxsize:
 *           type: number
 *         blockhash:
 *           type: string
 *         feerate_percentiles:
 *           type: array
 *           items:
 *             type: number
 *         height:
 *           type: number
 *         ins:
 *           type: number
 *         maxfee:
 *           type: number
 *         maxfeerate:
 *           type: number
 *         maxtxsize:
 *           type: number
 *         medianfee:
 *           type: number
 *         mediantime:
 *           type: number
 *         mediantxsize:
 *           type: number
 *         minfee:
 *           type: number
 *         minfeerate:
 *           type: number
 *         mintxsize:
 *           type: number
 *         outs:
 *           type: number
 *         subsidy:
 *           type: number
 *         swtotal_size:
 *           type: number
 *         swtotal_weight:
 *           type: number
 *         swtxs:
 *           type: number
 *         time:
 *           type: number
 *           description: The block time
 *         total_out:
 *           type: number
 *         total_size:
 *           type: number
 *         total_weight:
 *           type: number
 *         totalfee:
 *           type: number
 *         txs:
 *           type: number
 *         utxo_increase:
 *           type: number
 *         utxo_size_inc:
 *           type: number
 *
 *     BlockchaininfoResponse:
 *       type: object
 *       properties:
 *         chain:
 *           type: string
 *         blocks:
 *           type: number
 *         headers:
 *           type: number
 *         bestblockhash:
 *           type: string
 *         difficulty:
 *           type: number
 *         mediantime:
 *           type: number
 *         verificationprogress:
 *           type: number
 *         initialblockdownload:
 *           type: boolean
 *         chainwork:
 *           type: string
 *         size_on_disk:
 *           type: number
 *         pruned:
 *           type: boolean
 *         pruneheight:
 *           type: number
 *         automatic_pruning:
 *           type: boolean
 *         prune_target_size:
 *           type: number
 *         softforks:
 *           type: object
 *           additionalProperties:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               bip9:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   bit:
 *                     type: number
 *                   start_time:
 *                     type: number
 *                   timeout:
 *                     type: number
 *                   since:
 *                     type: number
 *                   statistics:
 *                     type: object
 *                     properties:
 *                       period:
 *                         type: number
 *                       threshold:
 *                         type: number
 *                       elapsed:
 *                         type: number
 *                       count:
 *                         type: number
 *                       possible:
 *                         type: boolean
 *               height:
 *                 type: number
 *               active:
 *                 type: boolean
 *         warnings:
 *           type: string
 *
 *     DifficultyResponse:
 *       type: object
 *       properties:
 *         difficulty:
 *           type: number
 * 
 *     NetworkhashResponse:
 *       type: object
 *       properties:
 *         networkhash:
 *           type: number
 * 
 *     GettxoutsetinfoResponse:
 *       type: object
 *       properties:
 *         height:
 *           type: number
 *         bestblock:
 *           type: string
 *         transactions:
 *           type: number
 *         txouts:
 *           type: number
 *         bogosize:
 *           type: number
 *         hash_serialized_2:
 *           type: string
 *         disk_size:
 *           type: number
 *         total_amount:
 *           type: number
 *
 */
