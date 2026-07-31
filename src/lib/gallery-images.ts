export const galleryImages = [
  {
    id: 'waterfront-exterior',
    src: '/26.jpg',
    alt: 'Luxury villa exterior with large windows overlooking calm turquoise water, warm afternoon light, white architecture',
    caption: 'Waterfront Exterior',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-2',
    aspectClass: 'aspect-[4/3] lg:aspect-auto lg:h-full',
  },
  {
    id: 'master-bedroom',
    src: '/27.jpg',
    alt: 'Elegant master bedroom interior with ocean view, white linen bedding, natural light, tropical setting',
    caption: 'Master Bedroom',
    colSpan: 'lg:col-span-1',
    rowSpan: '',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'ensuite-bathroom',
    src: '/28.jpg',
    alt: 'Luxury bathroom with freestanding tub, white tile, natural light, spa-like atmosphere',
    caption: 'En-Suite Bathroom',
    colSpan: 'lg:col-span-1',
    rowSpan: '',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'living-area',
    src: '/30.jpg',
    alt: 'Open-plan living area with coastal decor, large windows, ocean view, bright and airy, relaxed luxury',
    caption: 'Living Area',
    colSpan: 'lg:col-span-1',
    rowSpan: '',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'waterfront-porch',
    src: '/31.jpg',
    alt: 'Waterfront porch with outdoor seating, dock view, calm sea, golden hour light, tropical paradise',
    caption: 'Waterfront Porch',
    colSpan: 'lg:col-span-1',
    rowSpan: '',
    aspectClass: 'aspect-[4/3]',
  },
  { id: 'villa-view-1', src: '/1.jpg', alt: 'Bright tropical villa interior with warm wooden finishes and expansive views', caption: 'Island Villa View', colSpan: 'lg:col-span-1', rowSpan: '', aspectClass: 'aspect-[4/3]' },
  { id: 'villa-view-2', src: '/2.jpg', alt: 'Relaxed indoor lounge area with natural materials and sunset tones', caption: 'Coastal Lounge' },
  { id: 'villa-view-3', src: '/3.jpg', alt: 'Open-air dining and lounge setting beside the water', caption: 'Dining by the Water' },
  { id: 'villa-view-4', src: '/4.jpg', alt: 'Contemporary villa room with soft lighting and sea views', caption: 'Oceanfront Suite' },
  { id: 'villa-view-5', src: '/5.jpg', alt: 'Curved architecture and clean lines wrapped by lush tropical greenery', caption: 'Architectural Detail' },
  { id: 'villa-view-6', src: '/6.jpg', alt: 'Scenic path leading to the waterfront and dock', caption: 'Garden Path' },
  { id: 'villa-view-7', src: '/12.jpg', alt: 'Luxury patio seating facing the calm sea and sky', caption: 'Patio Retreat' },
  { id: 'villa-view-8', src: '/13.jpg', alt: 'Whitewashed interiors with natural textures and island charm', caption: 'Island Interior' },
  { id: 'villa-view-9', src: '/16.jpg', alt: 'Sunlit open living room designed for relaxed waterfront living', caption: 'Sunlit Living' },
  { id: 'villa-view-10', src: '/17.jpg', alt: 'Beautifully styled bedroom with a view toward the shoreline', caption: 'Bedroom Escape' },
  { id: 'villa-view-11', src: '/20.jpg', alt: 'Tropical terrace and lounge space designed for memorable evenings', caption: 'Evening Terrace' },
  { id: 'villa-view-12', src: '/21.jpg', alt: 'Waterfront poolside atmosphere with comfortable lounge seating', caption: 'Poolside Calm' },
  { id: 'villa-view-13', src: '/22.jpg', alt: 'Wide water view and inviting outdoor furniture for a private stay', caption: 'Waterfront Seating' },
  { id: 'villa-view-14', src: '/33.jpg', alt: 'Warm interior tones and modern comforts in a luxurious villa setting', caption: 'Modern Comfort' },
  { id: 'villa-view-15', src: '/35.jpg', alt: 'A relaxing island setting with open views and serene coastal atmosphere', caption: 'Serene Shoreline' },
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  colSpan?: string;
  rowSpan?: string;
  aspectClass?: string;
};
