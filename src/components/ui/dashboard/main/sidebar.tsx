import { cn } from '@/lib/utils'
import { Button } from '../../button'
import { ScrollArea } from '../../scroll-area'

import { PersonalList } from '../../../../../data/personalLists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faHeart,
  faIcons,
  faImage,
  faDesktop,
  faPuzzlePiece,
  faGlobe,
  faExternalLinkAlt,
  faBookmark,
  faList,
  faTag,
  faLink,
} from '@fortawesome/free-solid-svg-icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../dialog'
import { Input } from '../../input'
import { Label } from '../../label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../dropdown-menu'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  personalLists: PersonalList[]
}

export function Sidebar({ className, personalLists }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <FontAwesomeIcon icon={faChartLine} />
              &nbsp; Trending
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faHeart} />
              &nbsp; Most Loved
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faTag} />
              &nbsp; Recommended For You
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faBookmark} />
              &nbsp; My bookmarks
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faImage} />
              &nbsp; Illustrations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faIcons} />
              &nbsp; Icons
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp; Mockups
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faPuzzlePiece} />
              &nbsp; UI Kits
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faGlobe} />
              &nbsp; Awesome Websites
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-1">
            <Dialog>
              <DialogTrigger>
                <Button variant="ghost" className="w-full justify-start">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  &nbsp; Submit Source Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Website</DialogTitle>
                  <DialogDescription>
                    Copy and paste the podcast feed URL to import.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="url">Website URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com/feed.xml"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Submit Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <Button variant="ghost" className="w-full justify-start">
                  <FontAwesomeIcon icon={faLink} />
                  &nbsp; Submit New Asset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Name of Asset</DialogTitle>
                  <DialogDescription>
                    Mention the details of the asset
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name of Asset</Label>
                    <Input id="name" placeholder="Google Illustrations" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">Website URL</Label>
                    <Input id="url" placeholder="https://example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type of Asset</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-left pl-6 text-sm p-2 border-bg-muted border">
                        Click to see options
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-50">
                        <DropdownMenuItem>Icon</DropdownMenuItem>
                        <DropdownMenuItem>Illustration</DropdownMenuItem>
                        <DropdownMenuItem>Mockup</DropdownMenuItem>
                        <DropdownMenuItem>UI Kit</DropdownMenuItem>
                        <DropdownMenuItem>Useful Website</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <DialogFooter>
                  <Button>Submit Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Personal Lists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {personalLists?.map((list, i) => (
                <Button
                  key={`${list}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <FontAwesomeIcon icon={faList} />
                  &nbsp;
                  {list}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
