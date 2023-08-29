import Navbar from '@/components/navbar/Navbar'
import { useEffect, useState } from 'react'

export default function Home() {
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/createAssets')

        if (!response.ok) {
          throw new Error(
            `Fetch error: ${response.status} - ${response.statusText}`
          )
        }

        const data = await response.json()
        console.log(data)

        setAssets(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <main>
      <Navbar />
      <ul>
        {/* {assets.map((asset) => (
          <li key={asset.id}>{asset.name}</li>
        ))} */}
      </ul>
    </main>
  )
}
