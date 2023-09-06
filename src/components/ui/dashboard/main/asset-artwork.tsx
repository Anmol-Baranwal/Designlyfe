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
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../../../../lib/firebase/context/AuthContext'
import { useToast } from '../../use-toast'
// import { doc, onSnapshot, query, where } from 'firebase/firestore'
// import { db } from '../../../../../firebaseConfig'
import Link from 'next/link'

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

  const initialUpvoteCount = asset.upvotes
    ? Object.keys(asset.upvotes).length
    : 0

  const [upvoteCount, setUpvoteCount] = useState<number>(initialUpvoteCount)
  const [shareClicked, setShareClicked] = useState(false)

  const { user } = useAuthContext()

  useEffect(() => {
    // Check if the user has bookmarked this asset
    if (user && asset.bookmarks && asset.bookmarks[user.uid]) {
      setReactions((prevReactions) => ({
        ...prevReactions,
        bookmark: true,
      }))
    }

    if (user && asset.upvotes && asset.upvotes[user.uid]) {
      setReactions((prevReactions) => ({
        ...prevReactions,
        upvote: true,
      }))
    }
  }, [user, asset])

  // firebase listener sample project
  // const assetDocRef = doc(db, 'assets', asset.type, asset.author, asset.name)
  // // const assetQuery = query(assetsDocRef, where('name', '==', asset.name))
  // // const assetQuerySnapshot = await getDocs(assetQuery)
  // // const assetDocSnapshot = assetQuerySnapshot.docs[0]
  // //   const assetDocRef = doc(db, 'assets', type, author, assetDocSnapshot.id)
  // useEffect(() => {
  //   // Check if the user has upvoted this asset

  //   const unsubscribe = onSnapshot(assetDocRef, (docSnapshot) => {
  //     console.log('Document updated:', docSnapshot.data())
  //     if (docSnapshot.exists()) {
  //       const upvotes = docSnapshot.data().upvotes || {}
  //       const upvoteCount = Object.keys(upvotes).length
  //       setUpvoteCount(upvoteCount)
  //     }
  //   })

  //   // Clean up the listener when the component unmounts
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [user, asset, assetDocRef])

  const handleUpvoteReactionClick = async (reaction: keyof Reactions) => {
    if (!user) {
      // Handle the case when user is null
      console.log('User is not authenticated')
      return
    }

    if (reaction === 'upvote') {
      setReactions((prevReactions) => ({
        ...prevReactions,
        upvote: !prevReactions['upvote'],
      }))
    }

    try {
      if (!reactions['upvote']) {
        // add user id in upvotes field of asset
        const addUserToAssetUpvotesResponse = await fetch(
          '/api/addUserToAssetUpvotes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.uid,
              asset: asset,
            }),
          }
        )

        const addUserToAssetUpvotesData =
          await addUserToAssetUpvotesResponse.json()
        console.log(addUserToAssetUpvotesData.message)

        const updatedUpvoteCount = addUserToAssetUpvotesData.upvoteCount
        setUpvoteCount(updatedUpvoteCount)

        const addUserToBookmarkUpvoteResponse = await fetch(
          '/api/addUserToBookmarkUpvote',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.uid,
              asset: asset,
            }),
          }
        )

        const addUserToBookmarkUpvoteData =
          await addUserToBookmarkUpvoteResponse.json()
        console.log(addUserToBookmarkUpvoteData.message)
      } else {
        // remove user id from upvotes field of asset
        const removeUserFromAssetUpvotesResponse = await fetch(
          '/api/removeUserFromAssetUpvotes',
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

        const removeUserFromAssetUpvotesData =
          await removeUserFromAssetUpvotesResponse.json()
        console.log(removeUserFromAssetUpvotesData.message)

        const updatedUpvoteCount = removeUserFromAssetUpvotesData.upvoteCount
        setUpvoteCount(updatedUpvoteCount)

        const removeUserUpvoteFromUserResponse = await fetch(
          '/api/removeUserUpvoteFromUser',
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

        const removeUserUpvoteFromUserData =
          await removeUserUpvoteFromUserResponse.json()
        console.log(removeUserUpvoteFromUserData.message)
      }
    } catch (error) {
      console.error('Error adding upvote:', error)
    }
  }

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
              asset: asset,
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

  const { toast } = useToast()
  const handleShareReactionClick = () => {
    const urlWithRef = `${asset.assetUrl}?ref=UIVerse`

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(urlWithRef).then(() => {
      toast({
        title: 'URL Copied! ',
        description: 'You can now paste the link',
      })
    })

    setShareClicked(true)

    // Reset the shareClicked state after a delay (for the focus effect)
    setTimeout(() => {
      setShareClicked(false)
    }, 1000)
  }

  const getReactionImageName = (reaction: keyof Reactions) => {
    if (reactions[reaction]) {
      return `${reaction}-filled.png` // Use the filled icon when the reaction is true
    } else if (shareClicked && reaction === 'share') {
      return `${reaction}-filled.png` // Use the filled icon when shareClicked is true (focused)
    } else {
      return `${reaction}.png` // Use the regular icon
    }
  }
  // reactions[reaction] ? `${reaction}-filled.png` : `${reaction}.png`

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
        <h3 className="font-medium leading-none text-lg hover:underline hover:text-bg-300">
          <Link href={`${asset.assetUrl}?ref=UIVerse`}>{asset.name}</Link>
        </h3>
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
                className="text-bg-300 bg-slate-200 dark:bg-black mr-2 hover:bg-slate-200 mt-2"
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
          onClick={() => handleUpvoteReactionClick('upvote')}
        >
          <Image
            src={`/reactions/${getReactionImageName('upvote')}`}
            alt="upvote reaction"
            width={20}
            height={20}
          />
          {upvoteCount > 0 && (
            <span className="text-lg text-foreground pl-1 ">{upvoteCount}</span>
          )}
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
          onClick={() => handleShareReactionClick()}
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
