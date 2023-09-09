export interface Asset {
  name: string
  companyLogoUrl: string
  formats: string[]
  assetUrl: string
  imageUrl: string
  category: string
  type: string
  author: string
  price?: string
  upvoteCount?: number
  upvotes: Record<string, boolean>
  bookmarks: Record<string, boolean>
}

export interface brandInterface {
  brand: string[]
}

export const categoriesBrands: brandInterface = {
  brand: ['Icons', 'Illustrations'],
}

export const brandIcons: brandInterface = {
  brand: ['Getillustrations'],
}

export const brandIllustrations: brandInterface = {
  brand: ['Craftwork', 'Getillustrations', 'Ls Graphics'],
}

export const brandData: { [key: string]: brandInterface } = {
  Icons: {
    brand: ['Getillustrations'],
  },
  Illustrations: {
    brand: ['Craftwork', 'Getillustrations', 'Ls Graphics'],
  },
}

export const Icons: Asset[] = [
  {
    name: '3D App Icons',
    companyLogoUrl: '/companies/getillustrations.png',
    formats: ['Figma', 'Sketch', 'Adobe XD', 'PNG'],
    assetUrl:
      'https://www.getillustrations.com/illustration-pack/download-free-3d-app-icons-for-iphone',
    imageUrl:
      'https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80',
    category: 'Free',
    type: 'Icons',
    author: 'Getillustrations',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: '3D Finance Icons',
    companyLogoUrl: '/companies/getillustrations.png',
    formats: ['Figma', 'PNG'],
    assetUrl:
      'https://www.getillustrations.com/illustration-pack/3d-finance-icons',
    imageUrl:
      'https://www.getillustrations.com/packs/download-free-3d-app-icons-for-iphone/elements/_1x/app%20icons,%20social%20media,%20search%20_%20logo,%20google,%20engine,%20software_sm.png',
    category: 'Paid',
    type: 'Icons',
    author: 'Getillustrations',
    price: '$20',
    upvotes: {},
    bookmarks: {},
  },
]

export const Illustrations: Asset[] = [
  {
    name: 'Control',
    companyLogoUrl: '/companies/craftwork.png',
    formats: ['PNG', 'AI'],
    assetUrl: 'https://craftwork.design/downloads/control-illustrations',
    imageUrl:
      'https://assets-global.website-files.com/625816a3416990dd61391b9b/6443e2a00d01ac13dc690218_6273fc6c5f3ead368742f07f_626922e48c21ed8e906dc8a6_5fe1c7bf6d3bcd6b02483485_widgets.webp',
    category: 'Free',
    type: 'Illustrations',
    author: 'Craftwork',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Error 404',
    companyLogoUrl: '/companies/craftwork.png',
    formats: ['Figma', 'Sketch', 'PNG', 'SVG'],
    assetUrl: 'https://craftwork.design/downloads/error-404-illustrations/',
    imageUrl:
      'https://assets-global.website-files.com/625816a3416990dd61391b9b/6443e2a00d01ac13dc690218_6273fc6c5f3ead368742f07f_626922e48c21ed8e906dc8a6_5fe1c7bf6d3bcd6b02483485_widgets.webp',
    category: 'Free',
    type: 'Illustrations',
    author: 'Craftwork',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Halloween',
    companyLogoUrl: '/companies/craftwork.png',
    formats: ['PNG', 'SVG'],
    assetUrl: 'https://craftwork.design/downloads/halloween/',
    imageUrl:
      'https://assets-global.website-files.com/625816a3416990dd61391b9b/6443e2a00d01ac13dc690218_6273fc6c5f3ead368742f07f_626922e48c21ed8e906dc8a6_5fe1c7bf6d3bcd6b02483485_widgets.webp',
    category: 'Free',
    type: 'Illustrations',
    author: 'Craftwork',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Blues',
    companyLogoUrl: '/companies/getillustrations.png',
    formats: ['Figma', 'Sketch', 'XD', 'AI', 'SVG'],
    assetUrl:
      'https://www.getillustrations.com/illustration-pack/blues-dual-tone-free-illustrations',
    imageUrl:
      'https://assets-global.website-files.com/625816a3416990dd61391b9b/6443e2a00d01ac13dc690218_6273fc6c5f3ead368742f07f_626922e48c21ed8e906dc8a6_5fe1c7bf6d3bcd6b02483485_widgets.webp',
    category: 'Free',
    type: 'Illustrations',
    author: 'Getillustrations',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Loomies 39',
    companyLogoUrl: '/companies/getillustrations.png',
    formats: ['Figma', 'Sketch', 'XD', 'InVision Studio', 'SVG'],
    assetUrl:
      'https://www.getillustrations.com/illustration-pack/loomies-free-vector-illustrations',
    imageUrl:
      'https://assets-global.website-files.com/625816a3416990dd61391b9b/6443e2a00d01ac13dc690218_6273fc6c5f3ead368742f07f_626922e48c21ed8e906dc8a6_5fe1c7bf6d3bcd6b02483485_widgets.webp',
    category: 'Free',
    type: 'Illustrations',
    author: 'Getillustrations',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Clusck 2.0',
    companyLogoUrl: '/companies/lsgraphics.png',
    formats: ['Sketch', 'Figma', 'SVG', 'PNG', 'AI', 'XD', 'Affinity'],
    assetUrl: 'https://www.ls.graphics/products/clusck-2-0-illustration-kit',
    imageUrl:
      'https://assets-global.website-files.com/625816a3416990dd61391b9b/6443e2a00d01ac13dc690218_6273fc6c5f3ead368742f07f_626922e48c21ed8e906dc8a6_5fe1c7bf6d3bcd6b02483485_widgets.webp',
    category: 'Paid',
    type: 'Illustrations',
    author: 'Ls Graphics',
    price: '$24',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: '	Ding',
    companyLogoUrl: '/companies/lsgraphics.png',
    formats: ['Sketch', 'Figma', 'SVG', 'PNG', 'AI', 'XD', 'Affinity'],
    assetUrl: 'https://www.ls.graphics/illustrations/ding',
    imageUrl:
      'https://assets-global.website-files.com/625816a3416990dd61391b9b/6443e2a00d01ac13dc690218_6273fc6c5f3ead368742f07f_626922e48c21ed8e906dc8a6_5fe1c7bf6d3bcd6b02483485_widgets.webp',
    category: 'Paid',
    type: 'Illustrations',
    author: 'Ls Graphics',
    price: '$32',
    upvotes: {},
    bookmarks: {},
  },
]
