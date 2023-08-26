import { Metadata } from 'next'
// import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../button'
import { ScrollArea, ScrollBar } from '../../scroll-area'
import { Separator } from '../../separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../tabs'

import { AssetArtwork } from './asset-artwork'
import { Sidebar } from './sidebar'
import { illustrations } from '../../../../../data/assets'
import { personalLists } from '../../../../../data/personalLists'
import { UserNav } from './user-nav'
import { Search } from './search'
import React, { useState } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard of UIVerse',
  description: 'Keep track of your best resources',
}

export default function DashboardInterface() {
  const [selectedTab, setSelectedTab] = useState('All') // Default selected tab
  const [selectedSidebarOption, setSelectedSidebarOption] = useState<
    string | null
  >('Illustrations') // Default selected sidebar option

  const handleSidebarOptionSelect = (option: string | null) => {
    setSelectedSidebarOption(option)
  }

  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        /> */}
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="pl-6 font-semibold text-2xl">UIVerse</div>
            <div className="ml-auto flex items-center space-x-4">
              <Button className="bg-foreground">Feedback</Button>
              <Search />
              <FontAwesomeIcon
                icon={faBell}
                className="mr-2 h-4 w-4 rounded-full bg-muted p-2"
              />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar
                personalLists={personalLists}
                className="hidden lg:block"
                onSelectSidebarOption={handleSidebarOptionSelect}
                selectedSidebarOption={selectedSidebarOption}
              />
              <div className="col-span-4 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-10">
                  <Tabs defaultValue="All" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger
                          value="All"
                          className="relative"
                          onClick={() => setSelectedTab('All')}
                        >
                          All Types
                        </TabsTrigger>
                        <TabsTrigger
                          value="Free"
                          onClick={() => setSelectedTab('Free')}
                        >
                          Free
                        </TabsTrigger>
                        <TabsTrigger
                          value="Paid"
                          onClick={() => setSelectedTab('Paid')}
                        >
                          Paid
                        </TabsTrigger>
                        <TabsTrigger
                          value="Premium"
                          onClick={() => setSelectedTab('Premium')}
                        >
                          Premium
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <FontAwesomeIcon
                            icon={faChartSimple}
                            className="mr-2 h-4 w-4"
                          />
                          Filter Cards
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value={selectedTab}
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            {selectedSidebarOption || 'All'}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {selectedTab
                              ? `${selectedTab} resources for you. Updated daily.`
                              : 'Top resources for you. Updated daily.'}
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                          {illustrations.map((item) => (
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
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
