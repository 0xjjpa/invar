import {
  SignProtocolClient,
  SpMode,
  AttestationResult,
  EvmChains,
} from '@ethsign/sp-sdk';
import { INVARAttestation } from '../types/invar';
import { privateKeyToAccount } from 'viem/accounts';
import { INVAR_PRIVATE_KEY } from '../constants/invar';

export const createAttestation = async ({ schemaId, attestationData, index }: { schemaId: string, attestationData: INVARAttestation, index: string }): Promise<AttestationResult> => {
  const privateKey = INVAR_PRIVATE_KEY as `0x${string}`;
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia,
    account: privateKeyToAccount(privateKey),
  });
  const attestationInfo = await client.createAttestation({
    schemaId,
    data: attestationData,
    indexingValue: index,
  });
  return attestationInfo;
}



