import {
    computePairAddress,
    Currency,
    CurrencyAmount,
    FACTORY_ADDRESS,
    ROUTER_ADDRESS,
    Pair,
    Trade,
    Router,
    TradeType
} from '@123swap/core-sdk-v2'
import {
    Currency as SushiCurrency,
    CurrencyAmount as SushiCurrencyAmount,
    Pair as SushiPair,
    Router as SushiRouter,
    Trade as SushiTrade,
    TradeType as SushiTradeType,
    FACTORY_ADDRESS as SUSHI_FACTORY_ADDRESS,
    ROUTER_ADDRESS as SUSHI_ROUTER_ADDRESS,
    computePairAddress as SushiComputePairAddress
} from '@sushiswap/core-sdk'

export const enum EXCHANGE {
    INTERNAL = "INTERNAL",
    SUSHI = "SUSHI"
}

export const Exchanges = {
    [EXCHANGE.INTERNAL]: {
        pair: Pair,
        router: Router,
        trade: Trade,
        currency: Currency,
        currencyAmount: CurrencyAmount,
        tradeType: TradeType,
        factoryAddress: FACTORY_ADDRESS,
        routerAddress: ROUTER_ADDRESS,
        computePairAddress: computePairAddress
    },
    [EXCHANGE.SUSHI]: {
        pair: SushiPair,
        router: SushiRouter,
        trade: SushiTrade,
        currency: SushiCurrency,
        currencyAmount: SushiCurrencyAmount,
        tradeType: SushiTradeType,
        factoryAddress: SUSHI_FACTORY_ADDRESS,
        routerAddress: SUSHI_ROUTER_ADDRESS,
        computePairAddress: SushiComputePairAddress
    }
};
