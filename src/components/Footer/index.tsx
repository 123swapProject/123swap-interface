import { ANALYTICS_URL } from '../../constants'
import { ChainId } from '@123swap/core-sdk-v2'
import ExternalLink from '../ExternalLink'
import Polling from '../Polling'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../services/web3'
import { useLingui } from '@lingui/react'

const Footer = () => {
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()
  return (
    // <footer className="absolute bottom-0 flex items-center justify-between w-screen h-20 p-4 mx-auto text-center text-low-emphesis">
    <footer className="flex-shrink-0 w-full border-t border-bcolor bg-dark-900">
      <div className="flex items-center justify-between h-20 px-4">
        {chainId && chainId === ChainId.MATIC && (
          <ExternalLink
            id={`polygon-bridge-link`}
            href="https://wallet.matic.network/bridge/"
            className="text-low-emphesis"
          >
            {i18n._(t`Matic Bridge`)}
          </ExternalLink>
        )}
        {chainId && chainId === ChainId.CELO && (
          <ExternalLink id={`celo-bridge-link`} href="https://app.optics.xyz/" className="text-low-emphesis">
            {i18n._(t`Celo Bridge`)}
          </ExternalLink>
        )}
        {chainId && chainId === ChainId.HARMONY && (
          <ExternalLink
            id={`harmony-bridge-link`}
            href=" https://bridge.harmony.one/tokens"
            className="text-low-emphesis"
          >
            {i18n._(t`Harmony Bridge`)}
          </ExternalLink>
        )}
        {chainId && chainId === ChainId.XDAI && (
          <ExternalLink id={`xdai-bridge-link`} href=" https://omni.xdaichain.com/" className="text-low-emphesis">
            {i18n._(t`xDai Bridge`)}
          </ExternalLink>
        )}

        {chainId && chainId === ChainId.PALM && (
          <ExternalLink id={`palm-bridge-link`} href=" https://app.palm.io/bridge" className="text-low-emphesis">
            {i18n._(t`Palm Bridge`)}
          </ExternalLink>
        )}

        {chainId && chainId === ChainId.ARBITRUM && (
          <ExternalLink id={`arbitrum-bridge-link`} href=" https://bridge.arbitrum.io/" className="text-low-emphesis">
            {i18n._(t`Arbitrum Bridge`)}
          </ExternalLink>
        )}

        {chainId && chainId === ChainId.MOONRIVER && (
          <ExternalLink
            id={`moonriver-bridge-link`}
            href="https://movr.anyswap.exchange/#/bridge"
            className="text-low-emphesis"
          >
            {i18n._(t`Moonriver Bridge`)}
          </ExternalLink>
        )}
        <Polling />
      </div>
    </footer>
  )
}

export default Footer
