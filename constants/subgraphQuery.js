import { gql } from "@apollo/client"


const GET_ACTIVE_ITEMS = gql`
    {
    activeItems(first: 5, where:{buyer: "0x0000000000000000000000000000000000000000"}) {
        id
        tokenId
        nftAddress
        buyer
        price
        seller
        nftAddress
  }
}
`

export default GET_ACTIVE_ITEMS