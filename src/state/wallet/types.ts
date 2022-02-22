import { CurrencyAmount, Token } from '@123swap/core-sdk-v2'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>
