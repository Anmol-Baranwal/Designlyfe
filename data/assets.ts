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
  upvotes: Record<string, boolean>
  bookmarks: Record<string, boolean>
}

export interface brandInterface {
  brand: string[]
}

export const brandIcons: brandInterface = {
  brand: ['Drawkit', 'Getillustrations'],
}

export const brandIllustrations: brandInterface = {
  brand: [
    'Craftwork',
    'Drawer',
    'Drawkit',
    'Getillustrations',
    'Growww',
    'Ls Graphics',
  ],
}

export const brandData: { [key: string]: brandInterface } = {
  Icons: {
    brand: ['Drawkit', 'Getillustrations'],
  },
  Illustrations: {
    brand: [
      'Craftwork',
      'Drawer',
      'Drawkit',
      'Getillustrations',
      'Growww',
      'Ls Graphics',
    ],
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
  {
    name: '3D Black Friday Mini Icons',
    companyLogoUrl: '/companies/drawkit.png',
    formats: ['PNG', 'Figma'],
    assetUrl: 'https://www.drawkit.com/product/3d-black-friday-mini-icons',
    imageUrl:
      'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
    category: 'Free',
    type: 'Icons',
    author: 'Drawkit',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: '3D Wooden Icons',
    companyLogoUrl: '/companies/drawkit.png',
    formats: ['PNG'],
    assetUrl: 'https://www.drawkit.com/product/3d-wooden-icons',
    imageUrl:
      'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
    category: 'Free',
    type: 'Icons',
    author: 'Drawkit',
    upvotes: {},
    bookmarks: {},
  },
]

export const Illustrations: Asset[] = [
  {
    name: 'Control',
    companyLogoUrl: '/companies/craftwork.png',
    formats: ['PNG', 'AI'],
    assetUrl: 'https://craftwork.gumroad.com/l/ZWiR',
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
  {
    name: 'Distance Learning',
    companyLogoUrl: '/companies/drawer.png',
    formats: ['Sketch', 'Figma', 'AI', 'Lottie'],
    assetUrl: 'https://drawer.design/products/distance-learning/',
    imageUrl:
      'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80',
    category: 'Paid',
    type: 'Illustrations',
    author: 'Drawer',
    price: '$29',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Dr. Vector',
    companyLogoUrl: '/companies/drawer.png',
    formats: [
      'Sketch',
      'Figma',
      'AI',
      'Lottie',
      'SVG',
      'EPS',
      'PNG',
      'Adobe After Effects',
    ],
    assetUrl: 'https://drawer.design/products/dr-vector/',
    imageUrl:
      'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80',
    category: 'Paid',
    type: 'Illustrations',
    author: 'Drawer',
    price: '$29',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Phonies 2',
    companyLogoUrl: '/companies/growww.png',
    formats: ['PNG', 'AI', 'SVG', 'PDF'],
    assetUrl: 'https://growwwkit.com/illustrations/phonies-2/',
    imageUrl:
      'https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80',
    category: 'Paid',
    type: 'Illustrations',
    author: 'Growww',
    price: '$22',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Circuit',
    companyLogoUrl: '/companies/growww.png',
    formats: ['PNG', 'AI', 'SVG', 'PDF'],
    assetUrl: 'https://growwwkit.com/illustrations/circuit/',
    imageUrl:
      'https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80',
    category: 'Paid',
    type: 'Illustrations',
    author: 'Growww',
    price: '$24',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Black Friday & Online Shopping',
    companyLogoUrl: '/companies/drawkit.png',
    formats: ['Figma', 'SVG', 'PNG', 'AI'],
    assetUrl:
      'https://www.drawkit.com/product/black-friday-online-shopping-illustrations',
    imageUrl:
      'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
    category: 'Free',
    type: 'Illustrations',
    author: 'Drawkit',
    upvotes: {},
    bookmarks: {},
  },
  {
    name: 'Creativity & Design Animations',
    companyLogoUrl: '/companies/drawkit.png',
    formats: ['Lottie'],
    assetUrl: 'https://www.drawkit.com/product/creative-design-animated-pack',
    imageUrl:
      'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
    category: 'Paid',
    type: 'Illustrations',
    author: 'Drawkit',
    price: '$30',
    upvotes: {},
    bookmarks: {},
  },
]
