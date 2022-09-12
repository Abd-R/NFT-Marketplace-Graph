import { useQuery } from '@apollo/client'
import { useMoralis } from "react-moralis"
import NftBox from '../components/NftBox'
import GET_ACTIVE_ITEMS from "../constants/subgraphQuery"
import networkMappings from "../constants/networkMappings.json"

export default function Home() {
  const { isWeb3Enabled } = useMoralis()          // hook
  const { chainId } = useMoralis()
  const chainIdString = chainId ? parseInt(chainId).toString() : "31337"

  if (isWeb3Enabled && chainIdString != "5") {
    return (
      <div className='container mx-auto'>
        <div className='py-4  font-bold text-2xl'>
          Network not supported. Switch to Goerli
        </div>
      </div>
    )
  }
  const addressArray = networkMappings[chainIdString]["NftMarketplace"]

  const marketplaceAddress = addressArray[addressArray.length - 1]

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

  return (
    <div className="py-8 px-8">
      <div className='container mx-auto'>
        <h1 className='py-4  font-bold text-2xl'> Recently Listed</h1>
        <div className='flex flex-wrap'>
          {
            isWeb3Enabled
              ?
              loading ? `Loading` : listedNfts.activeItems.map(nft => {
                const { price, nftAddress, seller, tokenId } = nft

                return (
                  <>
                    <NftBox
                      price={price}
                      nftAddress={nftAddress}
                      tokenId={tokenId}
                      marketplaceAddress={marketplaceAddress}
                      seller={seller}
                      key={`${nftAddress}${tokenId}`}
                    />
                  </>
                )
              })
              :
              `Web3 is disabled`
          }
        </div>
      </div>
    </div>
  )
}
