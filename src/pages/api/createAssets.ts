import { NextApiRequest, NextApiResponse } from 'next';
import { icons, illustrations } from '../../../data/assets';

interface AssetDocument {
  name: string;
  companyLogoUrl: string;
  formats: string[];
  assetUrl: string;
  imageUrl: string;
  category: string;
  author: string;
  price?: string;
  upvotes: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
}

interface AuthorDocument {
  [key: string]: AssetDocument;
}

interface BrandCollection {
  [key: string]: AuthorDocument;
}

interface AssetCategory {
  name: string;
  document: BrandCollection;
}

const createCollection = <T extends AssetDocument>(
  data: T[],
  category: string
): AssetCategory => {
  const collection: AssetCategory = {
    name: category,
    document: {},
  };

  const brandIcons: string[] = [];

  for (const item of data) {
    const companyName = item.author.toLowerCase().replace(/ /g, '');
    const assetKey = item.name.toLowerCase().replace(/ /g, '');

    if (!brandIcons.includes(companyName)) {
      brandIcons.push(companyName);
    }

    const assetDocument: AssetDocument = {
      ...item,
      category,
      upvotes: {},
      bookmarks: {},
    };

    if (!collection.document[companyName]) {
      collection.document[companyName] = {};
    }

    collection.document[companyName][assetKey] = assetDocument;
  }

  return collection;
};

const iconsCollection = createCollection(icons, 'icons');
const illustrationsCollection = createCollection(illustrations, 'illustrations');

const assets: AssetCategory[] = [iconsCollection, illustrationsCollection];

export default function createAssets(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(assets);
}
