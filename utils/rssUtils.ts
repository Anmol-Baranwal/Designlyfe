import Parser from 'rss-parser';

interface FeedItem {
  title: string;
  link: string;
  // Add other fields as needed
}

async function fetchRssFeed(url: string): Promise<FeedItem[]> {
  const response = await fetch(url);
  const xmlText = await response.text();
  const parser = new Parser();
  const feed = await parser.parseString(xmlText);
  console.log(feed);

  // Filter out items with missing or undefined title/link
  const items: FeedItem[] = feed.items
    // .filter((item) => item.title && item.link)
    .map((item) => ({
      title: item.title!,
      link: item.link!,
      // Map other fields accordingly
    }));

  return items;
}

export default fetchRssFeed;
