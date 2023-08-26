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
    <div className={cn('space-y-3', className)} {...props}>
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
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{asset.name}</h3>
        <p className="text-xs text-muted-foreground">{asset.author}</p>
      </div>
    </div>
  )
}
