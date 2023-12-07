import * as chains from "viem/chains";
import scaffoldConfig from "~~/scaffold.config";
import { ContractName, contracts } from "~~/utils/scaffold-eth/contract";

export const getContractNames = (targetNetwork?: chains.Chain) => {
  targetNetwork = targetNetwork ?? scaffoldConfig.targetNetwork;
  const contractsData = contracts?.[targetNetwork.id];
  return contractsData ? (Object.keys(contractsData) as ContractName[]) : [];
};
