import Image from 'next/image'
// import { PlusCircledIcon } from '@radix-ui/react-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '../../context-menu'

import { Asset } from '../../../../../data/assets'
import { personalLists } from '../../../../../data/personalLists'
import { Avatar, AvatarFallback, AvatarImage } from '../../avatar'
import { Badge } from '../../badge'
import { useState } from 'react'
import { useAuthContext } from '../../../../../lib/firebase/context/AuthContext'

interface AssetArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: Asset
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

interface Reactions {
  upvote: boolean
  bookmark: boolean
  share: boolean
}

export function AssetArtwork({
  asset,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: AssetArtworkProps) {
  const [reactions, setReactions] = useState<Reactions>({
    upvote: false,
    bookmark: false,
    share: false,
  })

  const handleReactionClick = (reaction: keyof Reactions) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [reaction]: !prevReactions[reaction],
    }))
  }

  const { user } = useAuthContext()

  const handleBookmarkReactionClick = async (reaction: keyof Reactions) => {
    if (!user) {
      // Handle the case when user is null (not authenticated)
      console.log('User is not authenticated')
      return
    }

    if (reaction === 'bookmark') {
      setReactions((prevReactions) => ({
        ...prevReactions,
        bookmark: !prevReactions['bookmark'],
      }))
    }

    try {
      // Check if the bookmark reaction is now filled or not
      if (!reactions['bookmark']) {
        // Call the api to add asset to user id in bookmarks collection
        const addAssetToUserBookmarksResponse = await fetch(
          '/api/addAssetToUserBookmarks',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.uid,
              asset,
            }),
          }
        )

        const addAssetToUserBookmarksData =
          await addAssetToUserBookmarksResponse.json()
        console.log(addAssetToUserBookmarksData.message)

        // Call the api to add userId in bookmarks field of asset item
        const addUserToAssetBookmarkResponse = await fetch(
          '/api/addUserToAssetBookmark',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.uid,
              asset: asset, // Assuming asset has an 'id' property
            }),
          }
        )

        const addUserToAssetBookmarkData =
          await addUserToAssetBookmarkResponse.json()
        console.log(addUserToAssetBookmarkData.message)
      } else {
        // api route to remove asset item from bookmark collection in user id

        const removeAssetFromUserBookmarksResponse = await fetch(
          '/api/removeAssetFromUserBookmarks',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.uid,
              asset,
            }),
          }
        )

        const removeAssetFromUserBookmarksData =
          await removeAssetFromUserBookmarksResponse.json()
        console.log(removeAssetFromUserBookmarksData.message)

        // api route to remove user id from bookmark field of asset item
        const removeUserFromAssetBookmarkResponse = await fetch(
          '/api/removeUserFromAssetBookmark',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.uid,
              asset,
            }),
          }
        )

        const removeUserFromAssetBookmarkData =
          await removeUserFromAssetBookmarkResponse.json()
        console.log(removeUserFromAssetBookmarkData.message)
      }
    } catch (error) {
      console.error('Error adding bookmark:', error)
    }
  }

  const getReactionImageName = (reaction: keyof Reactions) =>
    reactions[reaction] ? `${reaction}-filled.png` : `${reaction}.png`

  return (
    <div
      className={cn('space-y-3 bg-muted p-2 mb-6 rounded-lg', className)}
      {...props}
    >
      <div className="bg-muted h-14 w-14 rounded-full flex justify-center items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={asset.companyLogoUrl}
            alt={` Logo of ${asset.author}`}
          />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-1 text-sm pb-2 overflow-hidden pl-2">
        <h3 className="font-medium leading-none text-lg">{asset.name}</h3>
        <div className="flex text-md pt-2">
          <p className="text-muted-foreground mr-2">• {asset.category}</p>
          <p className="text-muted-foreground mr-2">
            {asset.price && `• ${asset.price} `}
          </p>
        </div>
        <div className="h-16">
          <div className="flex text-sm flex-wrap">
            {asset.formats.map((format, idx) => (
              <Badge
                key={idx}
                className="text-foreground bg-slate-200 mr-2 hover:bg-slate-200 mt-2"
              >
                {format}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={asset.imageUrl}
              alt={asset.name}
              width={width}
              height={height}
              className={cn(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                {/* <PlusCircledIcon className="mr-2 h-4 w-4" /> */}
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {personalLists.map((list) => (
                <ContextMenuItem key={list}>
                  <FontAwesomeIcon icon={faList} />
                  &nbsp; {list}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Copy URL</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="flex flex-wrap justify-evenly pt-0 pb-1 transition-all duration-500">
        <div
          className="hover:bg-slate-300 h-34 w-34 rounded-full flex justify-center items-center p-2"
          onClick={() => handleReactionClick('upvote')}
        >
          <Image
            src={`/reactions/${getReactionImageName('upvote')}`}
            alt="upvote reaction"
            width={20}
            height={20}
          />
        </div>
        <div
          className="hover:bg-slate-300 h-34 w-34 rounded-full flex justify-center items-center p-2"
          onClick={() => handleBookmarkReactionClick('bookmark')}
        >
          <Image
            src={`/reactions/${getReactionImageName('bookmark')}`}
            alt="bookmark reaction"
            width={18}
            height={18}
          />
        </div>
        <div
          className="hover:bg-slate-300 h-34 w-34 rounded-full flex justify-center items-center p-2"
          onClick={() => handleReactionClick('share')}
        >
          <Image
            src={`/reactions/${getReactionImageName('share')}`}
            alt="share reaction"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )
}
