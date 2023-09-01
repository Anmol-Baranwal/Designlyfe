// MyBookmarksSection.tsx

import React, { useEffect, useState } from 'react'
import { Asset } from '../../../../../data/assets'
import { AssetArtwork } from './asset-artwork'

interface MyBookmarksProps {
  userId: string
}

export function MyBookmarks({ userId }: MyBookmarksProps) {
  const [bookmarkedAssets, setBookmarkedAssets] = useState<Asset[]>([])

  useEffect(() => {
    // Fetch the user's bookmarked assets based on the userId
    async function fetchBookmarkedAssets() {
      try {
        const response = await fetch(
          `/api/getUserBookmarkedAssets/?userId=${userId}`
        )

        if (response.ok) {
          const bookmarkedAssetsData = await response.json()
          setBookmarkedAssets(bookmarkedAssetsData.bookmarkedAssets)
        } else {
          console.error(
            'Error fetching bookmarked assets:',
            response.statusText
          )
        }
      } catch (error) {
        console.error('Error fetching bookmarked assets:', error)
      }
    }

    fetchBookmarkedAssets()
  }, [userId])

  return (
    <div>
      {/* search component here */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {bookmarkedAssets.map((item) => (
            <AssetArtwork
              key={item.name}
              asset={item}
              className="w-[300px]"
              aspectRatio="square"
              width={300}
              height={380}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
