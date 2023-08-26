import fetchRssFeed from '../../utils/rssUtils'

export async function getServerSideProps() {
  const urls = [
    // 'https://craftwork.design/home/feed/',
    // 'https://craftwork.design/feed',
    // 'https://notioly.com/feed',
    // https://designspace.io/feed/,
    // https://freeillustrations.xyz/feed/,
    // 'https://growwwkit.com/feed/',
    // 'https://drawer.design/feed',
  ]

  const allFeedData = []

  for (const url of urls) {
    const feedItems = await fetchRssFeed(url)
    allFeedData.push(...feedItems)
    // console.log(feedItems)
  }

  return {
    props: {
      feedData: allFeedData,
    },
  }
}

const FeedPage = ({ feedData }) => {
  return (
    <div>
      {/* {feedData.map((item) => (
        <div key={item.link}>
          <h2>{item.title}</h2>
          <a href={item.link}>{item.link}</a>
        </div>
      ))} */}
    </div>
  )
}

export default FeedPage
