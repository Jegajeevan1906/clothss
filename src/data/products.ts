import type { Product, Review, CategoryType } from './types';

const SAREE_PHOTOS: Record<CategoryType, string[]> = {
  silk: [
    'photo-1610030469983-98e550d6193c', // Kanjivaram Crimson Gold Silk
    'photo-1617627143750-d86bc21e42bb', // Banarasi Brocade Zari
    'photo-1584917865442-de89df76afd3', // Soft Mulberry Silk
    'photo-1572804013309-59a88b7e92f1', // Emerald Tussar Silk
  ],
  cotton: [
    'photo-1609357605129-26f69add5d6e', // Handloom Cotton Texture
    'photo-1563178406-4cdc2923acbc', // Chanderi Cotton Weave
    'photo-1601924994987-69e26d50dc26', // Mulmul Printed Cotton
    'photo-1583391733956-3750e0ff4e8b', // Linen Cotton Pastel
  ],
  traditional: [
    'photo-1595777457583-95e059d581b8', // Royal Bridal Red Kanjivaram
    'photo-1583391733956-3750e0ff4e8b', // Traditional Festive Weave
    'photo-1520006403909-838d6b92c22e', // Bandhani & Patola Pink
    'photo-1610030469983-98e550d6193c', // Paithani Peacock Motif
  ],
  designer: [
    'photo-1604014237800-1c9102c219da', // Organza Floral Printed
    'photo-1509631179647-0177331693ae', // Georgette Sequin Party Drape
    'photo-1584917865442-de89df76afd3', // Bollywood Glam Chiffon
    'photo-1617627143750-d86bc21e42bb', // Modern Fusion Ready-to-wear
  ],
};

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?w=800&h=1000&fit=crop&auto=format&q=80`;

const sampleReviews = (seed: string): Review[] => [
  {
    id: `${seed}-r1`,
    author: 'Priya Sundaram',
    rating: 5,
    title: 'Breathtaking Silk Quality & Pure Zari Shine!',
    body: 'The Kanjivaram weave texture and golden zari border are beyond beautiful. It draped like a dream at my cousin’s wedding.',
    date: '2026-06-18',
    verified: true,
  },
  {
    id: `${seed}-r2`,
    author: 'Ananya Deshmukh',
    rating: 5,
    title: 'Authentic Handloom & Fast Insured Delivery',
    body: 'True to description! Came with Silk Mark authorization card and matching 0.8m unstitched blouse piece.',
    date: '2026-05-30',
    verified: true,
  },
];

export const products: Product[] = [
  // --- SILK SAREES ---
  {
    id: 's1', sku: 'SWR-SILK-KANJI-RED-01', slug: 'royal-kanjivaram-pure-silk-saree-crimson-gold', brand: 'Kanjivaram Weaves', name: 'Royal Crimson Gold Kanjivaram Pure Silk Saree',
    category: 'silk', price: 18999, mrp: 24999, rating: 4.9, reviewCount: 942, stock: 25,
    images: [unsplash('photo-1610030469983-98e550d6193c'), unsplash('photo-1595777457583-95e059d581b8'), unsplash('photo-1584917865442-de89df76afd3')],
    shortDescription: 'Woven with 100% Mulberry silk yarns and heavy pure gold zari Korvai border.',
    description: 'A masterpiece of South Indian textile artistry. Handcrafted in Kanchipuram, this heirloom Kanjivaram features intricate Annapakshi motifs across the body, a rich contrasting pallu in temple gold zari, and heavy pure silk texture that drapes gracefully.',
    size: 'Free Size', color: 'Crimson Red & Gold Zari', fabric: 'Pure Kanjivaram Silk', gender: 'Women', occasion: 'Bridal & Wedding', weaveCraft: 'Kanjivaram Jacquard', sareeLength: '5.5 meters', blouseDetails: '0.8 meter unstitched blouse piece included', ageGroup: 'Adults',
    careInstructions: 'Dry clean only. Store wrapped in muslin cloth.',
    specialFeatures: ['100% Pure Silk Mark Certified', 'Real Gold Zari Pallu', 'Korvai Weave Technique', 'Includes Unstitched Blouse Piece'],
    deliveryDays: 3, badges: ['Bestseller', 'Silk Mark Certified'], reviews: sampleReviews('s1-rev'),
  },
  {
    id: 's2', sku: 'SWR-SILK-BANARASI-NVY-02', slug: 'banarasi-kadwa-brocade-silk-saree-midnight-gold', brand: 'Banaras Zari House', name: 'Banarasi Kadwa Brocade Silk Saree in Midnight Gold',
    category: 'silk', price: 16499, mrp: 21999, rating: 4.8, reviewCount: 680, stock: 30,
    images: [unsplash('photo-1617627143750-d86bc21e42bb'), unsplash('photo-1610030469983-98e550d6193c'), unsplash('photo-1572804013309-59a88b7e92f1')],
    shortDescription: 'Classic Varanasi Kadwa weave with silver and antique gold zari floral jaal.',
    description: 'Crafted by master weavers in Varanasi, this Banarasi silk saree showcases intricate Kadwa embroidery where each motif is individually hand-woven into the lustrous midnight blue silk base.',
    size: 'Free Size', color: 'Midnight Blue & Antique Gold', fabric: 'Banarasi Katan Silk', gender: 'Women', occasion: 'Festive & Reception', weaveCraft: 'Banarasi Zari Brocade', sareeLength: '5.5 meters', blouseDetails: '0.8 meter heavy brocade unstitched blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean only. Cool iron on reverse side.',
    specialFeatures: ['Handwoven Varanasi Craftsmanship', 'Kadwa Jaal Weave', 'Dual Gold-Silver Zari Work'],
    deliveryDays: 2, badges: ['Festive Pick'], reviews: sampleReviews('s2-rev'),
  },
  {
    id: 's3', sku: 'SWR-SILK-SOFT-GRN-03', slug: 'emerald-soft-silk-lightweight-saree', brand: 'Swarna Heritage', name: 'Emerald Soft Silk Saree with Antique Copper Zari',
    category: 'silk', price: 9499, mrp: 12999, rating: 4.7, reviewCount: 510, stock: 40,
    images: [unsplash('photo-1572804013309-59a88b7e92f1'), unsplash('photo-1584917865442-de89df76afd3')],
    shortDescription: 'Ultra-lightweight soft silk saree with subtle copper zari pinstripes and temple border.',
    description: 'Designed for effortless grace and comfort. Spun from soft silk threads that feel weightless against the body while delivering a regal copper luster.',
    size: 'Free Size', color: 'Emerald Green & Copper', fabric: 'Soft Silk', gender: 'Women', occasion: 'Festive & Puja', weaveCraft: 'Temple Border Zari', sareeLength: '5.5 meters', blouseDetails: '0.8 meter contrasting unstitched blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean recommended.',
    specialFeatures: ['Featherlight Soft Silk Finish', 'Non-Prickly Zari Border', 'Easy Drape Pleats'],
    deliveryDays: 2, badges: ['Easy Drape'], reviews: sampleReviews('s3-rev'),
  },
  {
    id: 's4', sku: 'SWR-SILK-TUSSAR-BEI-04', slug: 'tussar-geometrical-kantha-embroidered-saree', brand: 'Boutique Royal', name: 'Tussar Silk Saree with Hand-Done Kantha Stitch',
    category: 'silk', price: 11999, mrp: 15499, rating: 4.8, reviewCount: 320, stock: 18,
    images: [unsplash('photo-1584917865442-de89df76afd3'), unsplash('photo-1601924994987-69e26d50dc26')],
    shortDescription: 'Rich textured wild Tussar silk adorned with intricate Bengal Kantha embroidery.',
    description: 'Celebrate artisanal heritage with wild Tussar silk. Features natural beige sheen, hand-stitched geometric running threads across the pallu, and organic rustic elegance.',
    size: 'Free Size', color: 'Beige & Terracotta', fabric: 'Wild Tussar Silk', gender: 'Women', occasion: 'Traditional Ceremonies', weaveCraft: 'Hand Kantha Stitch', sareeLength: '5.5 meters', blouseDetails: '0.8 meter matching Tussar blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean only.',
    specialFeatures: ['Authentic Wild Tussar', 'Handmade Bengal Kantha Embroidery', 'Eco-Dye Tones'],
    deliveryDays: 3, badges: ['Artisanal Edition'], reviews: sampleReviews('s4-rev'),
  },

  // --- COTTON SAREES ---
  {
    id: 's5', sku: 'SWR-COT-CHANDERI-YEL-05', slug: 'chanderi-cotton-silk-saree-mustard-yellow', brand: 'Chanderi Silk Co.', name: 'Chanderi Cotton Silk Saree in Mustard Yellow & Gold',
    category: 'cotton', price: 5499, mrp: 7499, rating: 4.9, reviewCount: 780, stock: 50,
    images: [unsplash('photo-1563178406-4cdc2923acbc'), unsplash('photo-1609357605129-26f69add5d6e'), unsplash('photo-1583391733956-3750e0ff4e8b')],
    shortDescription: 'Sheer translucent Chanderi weave with hand-crafted zari booties and gold border.',
    description: 'Light, crisp, and regal. Handwoven in Madhya Pradesh using fine cotton-silk yarn blend. Perfect for daytime festivities, summer weddings, and formal puja occasions.',
    size: 'Free Size', color: 'Mustard Yellow & Gold', fabric: 'Chanderi Cotton Silk', gender: 'Women', occasion: 'Festive & Daytime', weaveCraft: 'Chanderi Zari Booti', sareeLength: '5.5 meters', blouseDetails: '0.8 meter running blouse piece included', ageGroup: 'Adults',
    careInstructions: 'Dry clean or gentle hand wash in mild cold water.',
    specialFeatures: ['Handwoven Chanderi Weave', 'Translucent Sheen Finish', 'Gold Zari Motif Booties'],
    deliveryDays: 2, badges: ['Summer Essential', 'Handloom Pure'], reviews: sampleReviews('s5-rev'),
  },
  {
    id: 's6', sku: 'SWR-COT-MULMUL-BLU-06', slug: 'handloom-mulmul-cotton-printed-saree-indigo', brand: 'Mulmul Crafts', name: 'Dabu Handblock Printed Mulmul Cotton Saree',
    category: 'cotton', price: 3299, mrp: 4499, rating: 4.8, reviewCount: 640, stock: 60,
    images: [unsplash('photo-1601924994987-69e26d50dc26'), unsplash('photo-1609357605129-26f69add5d6e')],
    shortDescription: 'Butter-soft 100% fine mulmul cotton with authentic Bagru Dabu mud print.',
    description: 'Experience unmatched breathability. Crafted from high-thread-count Jaipur mulmul cotton, hand-dyed with natural indigo mud block prints for an ultra-airy everyday drape.',
    size: 'Free Size', color: 'Indigo Blue & Off-White', fabric: '100% Mulmul Cotton', gender: 'Women', occasion: 'Everyday & Office', weaveCraft: 'Hand Block Dabu Print', sareeLength: '5.5 meters', blouseDetails: '0.8 meter printed mulmul blouse piece', ageGroup: 'Adults',
    careInstructions: 'Hand wash cold separately with eco-liquid detergent.',
    specialFeatures: ['Natural Indigo Dye', 'Jaipur Handblock Craft', 'Butter-Soft Texture'],
    deliveryDays: 2, badges: ['Pure Comfort', 'Natural Dye'], reviews: sampleReviews('s6-rev'),
  },
  {
    id: 's7', sku: 'SWR-COT-LINEN-PNK-07', slug: 'pure-linen-silver-zari-border-saree-blush-pink', brand: 'Mulmul Crafts', name: 'Organic Organic Linen Saree with Silver Metallic Border',
    category: 'cotton', price: 6999, mrp: 8999, rating: 4.7, reviewCount: 420, stock: 35,
    images: [unsplash('photo-1583391733956-3750e0ff4e8b'), unsplash('photo-1609357605129-26f69add5d6e')],
    shortDescription: '100s count French flax organic linen saree with subtle silver zari border.',
    description: 'Modern minimalist luxury. High-density linen weave that softens with every wash, featuring crisp selvedge lines, silver zari woven borders, and a contemporary airy silhouette.',
    size: 'Free Size', color: 'Blush Pastel Pink', fabric: '100% Organic Linen Cotton', gender: 'Women', occasion: 'Office & Formal', weaveCraft: 'Linen Zari Weave', sareeLength: '5.5 meters', blouseDetails: '0.8 meter matching linen blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean recommended. Starch optional.',
    specialFeatures: ['100 Count Pure Flax Linen', 'Silver Zari Border', 'Cool Breathability'],
    deliveryDays: 2, badges: ['Modern Classic'], reviews: sampleReviews('s7-rev'),
  },
  {
    id: 's8', sku: 'SWR-COT-TANT-WHT-08', slug: 'bengal-handloom-tant-cotton-saree-ivory-red', brand: 'Swarna Heritage', name: 'Traditional Bengal Tant Cotton Saree in Ivory & Crimson',
    category: 'cotton', price: 2899, mrp: 3999, rating: 4.6, reviewCount: 310, stock: 45,
    images: [unsplash('photo-1609357605129-26f69add5d6e'), unsplash('photo-1563178406-4cdc2923acbc')],
    shortDescription: 'Authentic Bengal Tant weave with bold red temple border and light starched drape.',
    description: 'The quintessential Bengali festive saree. Handwoven with high-twist cotton yarn, featuring crisp structure, traditional red zari border, and comfortable drape for Durga Puja and celebrations.',
    size: 'Free Size', color: 'Ivory & Crimson Red', fabric: 'Bengal Tant Cotton', gender: 'Women', occasion: 'Festive & Puja', weaveCraft: 'Bengal Tant Temple Weave', sareeLength: '5.5 meters', blouseDetails: 'Includes 0.8m red cotton blouse piece', ageGroup: 'Adults',
    careInstructions: 'Gently hand wash cold. Light starch preserves signature crisp pleats.',
    specialFeatures: ['Traditional Bengal Handloom', 'Crisp Starched pleats', 'Authentic Zari Border'],
    deliveryDays: 3, badges: ['Puja Special'], reviews: sampleReviews('s8-rev'),
  },

  // --- TRADITIONAL SAREES ---
  {
    id: 's9', sku: 'SWR-TRAD-BRIDAL-RED-09', slug: 'heavy-bridal-kanjivaram-zari-brocade-saree', brand: 'Kanjivaram Weaves', name: 'Grand Bridal Kanjivaram Zari Brocade Silk Saree',
    category: 'traditional', price: 29999, mrp: 38999, rating: 5.0, reviewCount: 450, stock: 12,
    images: [unsplash('photo-1595777457583-95e059d581b8'), unsplash('photo-1610030469983-98e550d6193c'), unsplash('photo-1617627143750-d86bc21e42bb')],
    shortDescription: 'Heavy double-warp pure silk bridal saree with solid gold zari pallu and Mayil motifs.',
    description: 'Designed for the bride’s unforgettable moment. Double-ply mulberry silk woven with pure heavy gold zari work depicting peacock (Mayil) and rudraksha motifs throughout.',
    size: 'Free Size', color: 'Deep Scarlet Red & Imperial Gold', fabric: 'Heavy Pure Kanjivaram Silk', gender: 'Women', occasion: 'Bridal & Wedding', weaveCraft: 'Double Warp Zari Brocade', sareeLength: '5.5 meters', blouseDetails: '0.8m heavy brocade blouse piece with zari border', ageGroup: 'Adults',
    careInstructions: 'Dry clean only. Store in wooden box or muslin sleeve.',
    specialFeatures: ['Double-Warp Pure Silk', 'Heavy Gold Zari Weight', 'Silk Mark Certified', 'Heirloom Keepsake'],
    deliveryDays: 4, badges: ['Bridal Couture', 'Heirloom Grade'], reviews: sampleReviews('s9-rev'),
  },
  {
    id: 's10', sku: 'SWR-TRAD-BANDHANI-PNK-10', slug: 'pure-georgette-bandhani-ghatchola-saree-magenta', brand: 'Boutique Royal', name: 'Pure Georgette Bandhani Ghatchola Saree in Magenta',
    category: 'traditional', price: 14499, mrp: 18999, rating: 4.9, reviewCount: 380, stock: 15,
    images: [unsplash('photo-1520006403909-838d6b92c22e'), unsplash('photo-1584917865442-de89df76afd3')],
    shortDescription: 'Authentic Kutchi hand-tied Bandhej dots over gold zari Ghatchola grid.',
    description: 'Traditional Gujarati bridal art. Features thousands of hand-bound Bandhani dots inside zari check squares (Ghatchola grid) crafted on flowing pure georgette silk.',
    size: 'Free Size', color: 'Rani Pink & Gold Zari', fabric: 'Pure Georgette Bandhani', gender: 'Women', occasion: 'Traditional Ceremonies', weaveCraft: 'Bandhani & Ghatchola', sareeLength: '5.5 meters', blouseDetails: '0.8m embroidered georgette blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean only. Roll fold to protect bandhej knots.',
    specialFeatures: ['Hand-Tied Kutch Bandhej', 'Gold Zari Grid Weave', 'Vibrant Natural Colors'],
    deliveryDays: 3, badges: ['Craft Heritage'], reviews: sampleReviews('s10-rev'),
  },
  {
    id: 's11', sku: 'SWR-TRAD-PAITHANI-PUR-11', slug: 'yeola-paithani-pure-silk-saree-peacock-pallu', brand: 'Paithani Grace', name: 'Handwoven Yeola Paithani Pure Silk Saree with Peacock Pallu',
    category: 'traditional', price: 21999, mrp: 27999, rating: 4.9, reviewCount: 290, stock: 10,
    images: [unsplash('photo-1610030469983-98e550d6193c'), unsplash('photo-1572804013309-59a88b7e92f1')],
    shortDescription: 'Maharashtrian heritage Paithani silk with tapestry woven multi-color peacock pallu.',
    description: 'Known as the Queen of Sarees in Maharashtra. Features signature oblique square border and grand tapestry woven Mor (peacock) pallu created using pure silk and zari threads.',
    size: 'Free Size', color: 'Royal Purple & Multi-Zari', fabric: 'Yeola Paithani Pure Silk', gender: 'Women', occasion: 'Bridal & Festive', weaveCraft: 'Tapestry Peacock Weave', sareeLength: '5.5 meters', blouseDetails: '0.8m matching Paithani blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean only.',
    specialFeatures: ['Handwoven Yeola Craft', 'Multi-Colored Tapestry Pallu', 'Pure Silk Mark Tag'],
    deliveryDays: 4, badges: ['Heritage Legend'], reviews: sampleReviews('s11-rev'),
  },
  {
    id: 's12', sku: 'SWR-TRAD-IKAT-ORG-12', slug: 'pochampally-ikat-silk-saree-rust-orange', brand: 'Swarna Heritage', name: 'Pochampally Double Ikat Silk Saree in Rust Orange',
    category: 'traditional', price: 13999, mrp: 17999, rating: 4.8, reviewCount: 210, stock: 20,
    images: [unsplash('photo-1583391733956-3750e0ff4e8b'), unsplash('photo-1601924994987-69e26d50dc26')],
    shortDescription: 'Telangana double-ikat handloom silk saree with intricate geometric tie-dye weave.',
    description: 'Precision hand-dyed warp and weft threads woven into striking geometric diamonds. Made in Pochampally with GI-tagged weaving heritage.',
    size: 'Free Size', color: 'Rust Orange & Charcoal', fabric: 'Pochampally Pure Silk', gender: 'Women', occasion: 'Festive & Ceremonies', weaveCraft: 'Double Ikat Weave', sareeLength: '5.5 meters', blouseDetails: '0.8m plain ikat border blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean only.',
    specialFeatures: ['GI Tagged Pochampally Weave', 'Double Ikat Alignment', '100% Pure Silk'],
    deliveryDays: 3, badges: ['GI Tagged'], reviews: sampleReviews('s12-rev'),
  },

  // --- DESIGNER & EVERYDAY SAREES ---
  {
    id: 's13', sku: 'SWR-DES-ORGANZA-FLR-13', slug: 'floral-organza-silk-saree-hand-painted-pastel', brand: 'Boutique Royal', name: 'Pastel Organza Silk Saree with Hand-Painted Florals & Cutwork',
    category: 'designer', price: 7999, mrp: 10999, rating: 4.8, reviewCount: 540, stock: 35,
    images: [unsplash('photo-1604014237800-1c9102c219da'), unsplash('photo-1509631179647-0177331693ae')],
    shortDescription: 'Crisp semi-sheer organza silk featuring soft watercolor lotus prints and scalloped border.',
    description: 'Ethereal and chic for modern soirées. Sheer pastel organza base adorned with hand-highlighted watercolor blooms and intricate scalloped cutwork zari borders.',
    size: 'Free Size', color: 'Pastel Mint & Blush', fabric: 'Organza Silk', gender: 'Women', occasion: 'Party & Reception', weaveCraft: 'Cutwork & Digital Print', sareeLength: '5.5 meters', blouseDetails: '0.8m satin silk unstitched blouse piece', ageGroup: 'Adults',
    careInstructions: 'Dry clean only. Steam iron gently on low setting.',
    specialFeatures: ['Scalloped Cutwork Edge', 'Ultra-Lightweight Sheer Organza', 'Includes Premium Satin Liner Blouse'],
    deliveryDays: 2, badges: ['Trending', 'Cocktail Wear'], reviews: sampleReviews('s13-rev'),
  },
  {
    id: 's14', sku: 'SWR-DES-GEORGETTE-SEQ-14', slug: 'black-sequin-georgette-bollywood-designer-saree', brand: 'Boutique Royal', name: 'Bollywood Glam Midnight Black Georgette Sequin Saree',
    category: 'designer', price: 6499, mrp: 8999, rating: 4.7, reviewCount: 480, stock: 40,
    images: [unsplash('photo-1509631179647-0177331693ae'), unsplash('photo-1617627143750-d86bc21e42bb')],
    shortDescription: 'Fluid viscose georgette encrusted with micro matte-black and gold sequins.',
    description: 'Turn heads at evening galas and cocktail parties. Features full-body tonal sequin embroidery that catches candlelight with every step, paired with a slinky silhouette.',
    size: 'Free Size', color: 'Jet Black & Champagne Gold', fabric: 'Viscose Georgette', gender: 'Women', occasion: 'Party & Reception', weaveCraft: 'Micro Sequin Embroidery', sareeLength: '5.5 meters', blouseDetails: '0.8m unstitched sequined blouse fabric', ageGroup: 'Adults',
    careInstructions: 'Dry clean only.',
    specialFeatures: ['Fluid Non-Stiff Drape', 'Matte Micro-Sequin Shimmer', 'Party Ready Silhouette'],
    deliveryDays: 2, badges: ['Party Edit'], reviews: sampleReviews('s14-rev'),
  },
  {
    id: 's15', sku: 'SWR-DES-CHIFFON-BLU-15', slug: 'everyday-chiffon-ombre-saree-ocean-blue', brand: 'Chanderi Silk Co.', name: 'Ombré Ocean Blue Everyday Chiffon Saree with Satin Border',
    category: 'designer', price: 3999, mrp: 5499, rating: 4.6, reviewCount: 390, stock: 45,
    images: [unsplash('photo-1584917865442-de89df76afd3'), unsplash('photo-1604014237800-1c9102c219da')],
    shortDescription: 'Breezy dual-tone ombré chiffon saree with sleek gold satin piping.',
    description: 'Effortless elegance for daily wear, lunch dates, and casual get-togethers. Soft poly-chiffon with seamless color transition from sky blue to deep navy.',
    size: 'Free Size', color: 'Ocean Blue Ombré', fabric: 'Pure Chiffon', gender: 'Women', occasion: 'Everyday & Office', weaveCraft: 'Ombré Dip Dye', sareeLength: '5.5 meters', blouseDetails: '0.8m navy blue satin blouse piece', ageGroup: 'Adults',
    careInstructions: 'Gentle machine wash or hand wash in cold water.',
    specialFeatures: ['Wrinkle-Resistant Poly-Chiffon', 'Soft Satin Edge Piping', 'Easy Maintenance'],
    deliveryDays: 2, badges: ['Daily Glam'], reviews: sampleReviews('s15-rev'),
  },
  {
    id: 's16', sku: 'SWR-DES-READY-TEAL-16', slug: 'ready-to-wear-stitched-pleated-saree-teal-gold', brand: 'Swarna Heritage', name: 'Ready-to-Wear Stitched Pleated Saree in Royal Teal',
    category: 'designer', price: 8499, mrp: 11499, rating: 4.8, reviewCount: 260, stock: 25,
    images: [unsplash('photo-1617627143750-d86bc21e42bb'), unsplash('photo-1595777457583-95e059d581b8')],
    shortDescription: 'Pre-stitched pleated drape with elasticated waist belt and metallic zari accent.',
    description: 'Drape in under 60 seconds! Features pre-stitched waist pleats, adjustable hook enclosure, and structured shoulder drape for stress-free party wear.',
    size: 'Stitched M', color: 'Royal Teal & Antique Gold', fabric: 'Poly Silk Satin', gender: 'Women', occasion: 'Party & Reception', weaveCraft: 'Pre-Stitched Pleated Drape', sareeLength: 'Pre-stitched 5.5m drape', blouseDetails: 'Fully stitched matching blouse included', ageGroup: 'Adults',
    careInstructions: 'Dry clean recommended.',
    specialFeatures: ['1-Minute Pre-Stitched Drape', 'Elastic Waist Fit', 'Includes Stitched Blouse'],
    deliveryDays: 3, badges: ['1-Min Drape'], reviews: sampleReviews('s16-rev'),
  },
];

export const brands = ['Kanjivaram Weaves', 'Banaras Zari House', 'Swarna Heritage', 'Chanderi Silk Co.', 'Mulmul Crafts', 'Boutique Royal', 'Paithani Grace'];

export const categories: { id: CategoryType; label: string; description: string; image: string }[] = [
  { id: 'silk', label: 'Silk Sarees', description: 'Heirloom Kanjivaram, Banarasi brocades, soft Mulberry silks & Tussar weaves', image: unsplash('photo-1610030469983-98e550d6193c') },
  { id: 'cotton', label: 'Cotton Sarees', description: 'Breezy Jaipur Mulmul, translucent Chanderi, pure Linen & Bengal handlooms', image: unsplash('photo-1563178406-4cdc2923acbc') },
  { id: 'traditional', label: 'Traditional Sarees', description: 'Grand bridal drapes, Kutch Bandhani, Yeola Paithani & GI-tagged Pochampally Ikat', image: unsplash('photo-1595777457583-95e059d581b8') },
  { id: 'designer', label: 'Designer & Everyday', description: 'Pastel hand-painted Organza, Bollywood sequin Georgette & 1-minute pre-stitched drapes', image: unsplash('photo-1604014237800-1c9102c219da') },
];

export const sizeFilters = ['Free Size', 'Unstitched Blouse', 'Stitched S', 'Stitched M', 'Stitched L', 'Stitched XL'];
export const colorFilters = ['Crimson Red & Gold Zari', 'Midnight Blue & Antique Gold', 'Emerald Green & Copper', 'Mustard Yellow & Gold', 'Indigo Blue & Off-White', 'Blush Pastel Pink', 'Royal Purple & Multi-Zari', 'Jet Black & Champagne Gold', 'Pastel Mint & Blush', 'Ocean Blue Ombré'];
export const fabricFilters = ['Pure Kanjivaram Silk', 'Banarasi Katan Silk', 'Soft Silk', 'Wild Tussar Silk', 'Chanderi Cotton Silk', '100% Mulmul Cotton', '100% Organic Linen Cotton', 'Pure Georgette Bandhani', 'Yeola Paithani Pure Silk', 'Organza Silk', 'Pure Chiffon'];
export const occasionFilters = ['Bridal & Wedding', 'Festive & Puja', 'Party & Reception', 'Everyday & Office', 'Traditional Ceremonies'];
export const craftWeaveFilters = ['Kanjivaram Jacquard', 'Banarasi Zari Brocade', 'Temple Border Zari', 'Hand Kantha Stitch', 'Chanderi Zari Booti', 'Hand Block Dabu Print', 'Bandhani & Ghatchola', 'Tapestry Peacock Weave', 'Micro Sequin Embroidery'];
