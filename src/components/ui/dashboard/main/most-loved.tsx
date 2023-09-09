// import React, { useEffect, useState } from 'react'
// import { Asset } from '../../../../../data/assets'
// import { AssetArtwork } from './asset-artwork'

export default function MostLoved() {
  //   const [mostLovedAssets, setMostLovedAssets] = useState<Asset[]>([])

  // console.log({ mostLovedAssets })

  return (
    <div>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          Coming Soon
          {/* {mostLovedAssets.map((item) => (
            <AssetArtwork
              key={item.name}
              asset={item}
              className="w-[300px]"
              aspectRatio="square"
              width={300}
              height={380}
            />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    // Fetch most loved assets from your API route
    const response = await fetch('/api/getMostUpvotedAssets')
    if (response.ok) {
      const data = await response.json()
      console.log('API Response:', data)
      return {
        props: {
          mostLovedAssets: data,
        },
        revalidate: 40, // Revalidate every 40 seconds
      }
    } else {
      console.error('Error fetching most loved assets:', response.status)
    }
  } catch (error) {
    console.error('Error fetching most loved assets:', error)
  }

  return {
    props: {
      mostLovedAssets: [],
    },
    revalidate: 40, // Revalidate every 40 seconds even in case of an error
  }
}
