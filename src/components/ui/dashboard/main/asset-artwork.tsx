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

interface AssetArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: Asset
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

export function AssetArtwork({
  asset,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: AssetArtworkProps) {
  return (
    <div
      className={cn('space-y-3 bg-muted p-2 mb-6 rounded-lg', className)}
      {...props}
    >
      <div className="bg-muted h-10 w-10 rounded-full flex justify-center items-center">
        <Avatar className="h-6 w-6">
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
            {asset.formats.split(', ').map((format, index) => (
              <Badge
                key={index}
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
        <div className="hover:bg-slate-300 h-34 w-34 rounded-full flex justify-center items-center p-2">
          <Image
            src="/reactions/like.png"
            alt="like reaction"
            width={20}
            height={20}
          />
        </div>
        <div className="hover:bg-slate-300 h-34 w-34 rounded-full flex justify-center items-center p-2">
          <Image
            src="/reactions/bookmark.png"
            alt="bookmark reaction"
            width={15}
            height={15}
          />
        </div>
        <div className="hover:bg-slate-300 h-34 w-34 rounded-full flex justify-center items-center p-2">
          <Image
            src="/reactions/share.png"
            alt="share reaction"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )
}
