import React, { useEffect, useState } from 'react'
import { Asset } from '../../../../../data/assets'
import { AssetArtwork } from './asset-artwork'
import { Search } from '../../search'

interface MyBookmarksProps {
  userId: string
}

export function MyBookmarks({ userId }: MyBookmarksProps) {
  const [bookmarkedAssets, setBookmarkedAssets] = useState<Asset[]>([])
  const [searchInput, setSearchInput] = useState('')

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

  const filteredAssets = bookmarkedAssets.filter((item) => {
    const lowerCaseSearch = searchInput.toLowerCase()
    return (
      item.name.toLowerCase().includes(lowerCaseSearch) ||
      item.author.toLowerCase().includes(lowerCaseSearch) ||
      item.category.toLowerCase().includes(lowerCaseSearch)
    )
  })

  return (
    <div>
      {/* search component here */}
      <div className="relative">
        <div className="pr-5 mb-6">
          <Search
            className="w-full"
            value={searchInput}
            onChange={(e: {
              target: { value: React.SetStateAction<string> }
            }) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {filteredAssets.map((item) => (
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
