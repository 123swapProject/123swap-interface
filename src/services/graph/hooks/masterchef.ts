import {
  getMasterChefV1Farms,
  getMasterChefV1PairAddreses,
  getMasterChefV1SushiPerBlock,
  getMasterChefV1TotalAllocPoint,
  getMasterChefV2Farms,
  getMasterChefV2PairAddreses,
  getMiniChefFarms,
  getMiniChefPairAddreses,
} from '../fetchers'
import { useMemo } from 'react'
import useSWR, { SWRConfiguration } from 'swr'

import { ChainId } from '@123swap/core-sdk-v2'
import { Chef } from '../../../features/onsen/enum'
import concat from 'lodash/concat'
import { useActiveWeb3React } from '../../web3'

export function useMasterChefV1TotalAllocPoint(swrConfig = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && chainId === ChainId.ETHEREUM
  const { data } = useSWR(
    shouldFetch ? 'masterChefV1TotalAllocPoint' : null,
    () => getMasterChefV1TotalAllocPoint(),
    swrConfig
  )
  return data
}

export function useMasterChefV1SushiPerBlock(swrConfig = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && chainId === ChainId.ETHEREUM
  const { data } = useSWR(
    shouldFetch ? 'masterChefV1SushiPerBlock' : null,
    () => getMasterChefV1SushiPerBlock(),
    swrConfig
  )
  return data
}

interface useFarmsProps {
  chainId: number
  swrConfig?: SWRConfiguration
}

export function useMasterChefV1Farms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const shouldFetch = chainId && [ChainId.MATIC, ChainId.XDAI, ChainId.HARMONY, ChainId.ARBITRUM, ChainId.CELO, ChainId.MOONRIVER].includes(chainId)
  const { data } = useSWR(shouldFetch ? ['masterChefV1Farms'] : null, () => getMasterChefV1Farms(undefined), swrConfig)
  return useMemo(() => {
    if (!data) return []
    return data.map((data) => ({ ...data, chef: Chef.MASTERCHEF }))
  }, [data])
}

export function useMasterChefV2Farms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const shouldFetch = chainId && chainId === ChainId.ETHEREUM
  const { data } = useSWR(shouldFetch ? 'masterChefV2Farms' : null, () => getMasterChefV2Farms(), swrConfig)
  return useMemo(() => {
    if (!data) return []
    return data.map((data) => ({ ...data, chef: Chef.MASTERCHEF_V2 }))
  }, [data])
}

export function useMiniChefFarms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const shouldFetch =
    chainId &&
    [ChainId.MATIC, ChainId.XDAI, ChainId.HARMONY, ChainId.ARBITRUM, ChainId.CELO, ChainId.MOONRIVER].includes(chainId)
  const { data } = useSWR(
    shouldFetch ? ['miniChefFarms', chainId] : null,
    (_, chainId) => getMiniChefFarms(chainId),
    swrConfig
  )
  return useMemo(() => {
    if (!data) return []
    return data.map((data) => ({ ...data, chef: Chef.MINICHEF }))
  }, [data])
}

export function useFarms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const masterChefV1Farms = useMasterChefV1Farms({ chainId })
  const masterChefV2Farms = useMasterChefV2Farms({ chainId })
  const miniChefFarms = useMiniChefFarms({ chainId })
  // used with BSC masterchef as subgraph doesnt support BSC trace_filter and can't find pair creation event and address
  const staticFarms = [{
          id: 0,
          pair: "0x7f5471e38336da86f6087744afbff496acc9af8c",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      },
      {
          id: 0,
          pair: "0x595519dab18166f23d3a0592d83dcad4ab88cf25",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      },
      {
          id: 0,
          pair: "0xde938d3d727b72964759ee69d7437eb7e87bab15",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      },
      {
          id: 0,
          pair: "0xcd105cf8f2388a6da2778d42ed9edf0e4a7eada6",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      },
      {
          id: 0,
          pair: "0x52c4eec7cb81016781c4d3934f6dbbf04a5ce7b9",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      },
      {
          id: 0,
          pair: "0xc91F4be2da12a0b105DB0A83b6Fd94000B041Bb3",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      },
      {
          id: 0,
          pair: "0x4093c50CC472Cd8816E53E8A221254acC0962b9b",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      },
      {
          id: 0,
          pair: "0x4d9bb69acdf53561a61a92f7cc35b67a9f769eae",
          owner: {id: '0xe7f2dd6b7bf80f703adcf30155c16fc308a455ef', sushiPerBlock: '1000000000000000000', totalAllocPoint: '1000'},
          chef: 0,
      }
  ]
  return useMemo(
    () => concat(masterChefV1Farms, masterChefV2Farms, miniChefFarms, staticFarms).filter((pool) => pool && pool.pair),
    [masterChefV1Farms, masterChefV2Farms, miniChefFarms, staticFarms]
  )
}

export function useMasterChefV1PairAddresses() {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && chainId === ChainId.ETHEREUM
  const { data } = useSWR(shouldFetch ? ['masterChefV1PairAddresses', chainId] : null, (_) =>
    getMasterChefV1PairAddreses()
  )
  return useMemo(() => {
    if (!data) return []
    return data.map((data) => data.pair)
  }, [data])
}

export function useMasterChefV2PairAddresses() {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && chainId === ChainId.ETHEREUM
  const { data } = useSWR(shouldFetch ? ['masterChefV2PairAddresses', chainId] : null, (_) =>
    getMasterChefV2PairAddreses()
  )
  return useMemo(() => {
    if (!data) return []
    return data.map((data) => data.pair)
  }, [data])
}

export function useMiniChefPairAddresses() {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && [ChainId.MATIC, ChainId.XDAI, ChainId.HARMONY, ChainId.ARBITRUM].includes(chainId)
  const { data } = useSWR(shouldFetch ? ['miniChefPairAddresses', chainId] : null, (_, chainId) =>
    getMiniChefPairAddreses(chainId)
  )
  return useMemo(() => {
    if (!data) return []
    return data.map((data) => data.pair)
  }, [data])
}

export function useFarmPairAddresses() {
  const masterChefV1PairAddresses = useMasterChefV1PairAddresses()
  const masterChefV2PairAddresses = useMasterChefV2PairAddresses()
  const miniChefPairAddresses = useMiniChefPairAddresses()
  return useMemo(
    () => concat(masterChefV1PairAddresses, masterChefV2PairAddresses, miniChefPairAddresses),
    [masterChefV1PairAddresses, masterChefV2PairAddresses, miniChefPairAddresses]
  )
}
