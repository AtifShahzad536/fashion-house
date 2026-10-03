export const categoriesData = [
  {
    name: 'Bridal Couture',
    slug: 'bridal-couture',
    description: 'Regal crimson, deep vermilion, and ruby bridal lehengas adorned with heirloom handcrafted zardozi, dabka, and pearls.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    banner: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    order: 1,
  },
  {
    name: 'Walima Splendor',
    slug: 'walima-splendor',
    description: 'Ethereal champagne, soft rose gold, icy mint, and silver-threaded couture lehengas with trailing royal dupattas.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1000&q=80',
    banner: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    order: 2,
  },
  {
    name: 'Mehndi & Mayun',
    slug: 'mehndi-mayun',
    description: 'Vibrant mustard, saffron yellow, parrot green, and fuchsia ensembles detailed with gotapatti, mirrorwork, and resham.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80',
    banner: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    order: 3,
  },
  {
    name: 'Engagement & Reception',
    slug: 'engagement-reception',
    description: 'Modern silhouettes, pastel organza flares, sculpted corsets, and crystal embellishments for modern brides.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    order: 4,
  },
  {
    name: 'Luxury Festive & Party Wear',
    slug: 'luxury-festive',
    description: 'Lightweight luxury cholis and kalidar lehengas tailored for bridal sisters, bridesmaids, and wedding guests.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    order: 5,
  }
];

export const heroSlidesData = [
  {
    eyebrow: 'THE BRIDAL COUTURE EDIT 2026',
    title: 'Heirloom Craftsmanship & Royal Silhouettes',
    subtitle: 'Step into eternity with bespoke handcrafted bridal lehengas woven in pure raw silks, antique zari, and hand-embellished dabka work.',
    primaryBtnText: 'Shop Bridal Collection',
    primaryBtnLink: '/shop?occasion=Bridal',
    secondaryBtnText: 'Customize Your Lehenga',
    secondaryBtnLink: '/customize/atelier',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=85',
    badgeText: 'Masterpiece Atelier',
    order: 1,
    isActive: true,
  },
  {
    eyebrow: 'WALIMA & RECEPTION SPLENDOR',
    title: 'Ethereal Champagne & Rose Gold Whispers',
    subtitle: 'Glistening Swarovski crystals, French lace drapes, and luminous champagne silks engineered for unforgettable wedding receptions.',
    primaryBtnText: 'Explore Walima Edit',
    primaryBtnLink: '/shop?occasion=Walima',
    secondaryBtnText: 'Book Bridal Consultation',
    secondaryBtnLink: '/customize/atelier',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1920&q=85',
    badgeText: 'Haute Couture',
    order: 2,
    isActive: true,
  },
  {
    eyebrow: 'MEHNDI & FESTIVE CELEBRATION',
    title: 'Saffron Sunshine & Emerald Gotapatti',
    subtitle: 'Playful yet majestic heritage ensembles featuring hand-carved mirrorwork, vibrant jewel tones, and cascading organza kalis.',
    primaryBtnText: 'View Mehndi Luxe',
    primaryBtnLink: '/shop?occasion=Mehndi',
    secondaryBtnText: 'Design Custom Color',
    secondaryBtnLink: '/customize/atelier',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1920&q=85',
    badgeText: 'Artisanal Heritage',
    order: 3,
    isActive: true,
  }
];

export const customizerOptionsData = [
  // Design Cuts
  { category: 'design', subType: 'lehengaFlair', name: 'Royal 24-Kali Flared Ghera', surcharge: 0, description: 'Sweeping 6-meter circular circumference with built-in dual cancan.' },
  { category: 'design', subType: 'lehengaFlair', name: 'Maharani Box-Pleated Ghera', surcharge: 5000, description: 'Traditional architectural box pleats with structured horsehair hemline.' },
  { category: 'design', subType: 'lehengaFlair', name: 'Paneled Mermaid Fluted Cut', surcharge: 4000, description: 'Fitted hips gently cascading into a dramatic floor train.' },

  { category: 'design', subType: 'choliStyle', name: 'Classic Sweetheart Choli', surcharge: 0, description: 'Flattering royal sweetheart neckline with padded cups and side zipper.' },
  { category: 'design', subType: 'choliStyle', name: 'Corset Structured Peplum Blouse', surcharge: 7000, description: 'Boning-reinforced corset with delicate scallop waist peplum.' },
  { category: 'design', subType: 'choliStyle', name: 'Angrakha Wrap Royal Blouse', surcharge: 6000, description: 'Regal overlapping tie-up silhouette with pearl tassel accents.' },

  { category: 'design', subType: 'sleeves', name: 'Elbow-Length Fitted Sleeves', surcharge: 0, description: 'Classic elbow-length cut embellished with cuff border work.' },
  { category: 'design', subType: 'sleeves', name: 'Full Sheer Embellished Sleeves', surcharge: 4500, description: 'Intricate zardozi climber motifs on transparent illusion net.' },
  { category: 'design', subType: 'sleeves', name: 'Cap Sleeves with Tassel Drops', surcharge: 3000, description: 'Contemporary cap cut finished with delicate micro-pearl tassels.' },

  // Base Fabrics
  { category: 'fabric', subType: 'baseFabric', name: 'Pure Raw Silk (80g Heavy)', surcharge: 8000, description: 'Heavy structured silk providing majestic volume and regal drape.', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80' },
  { category: 'fabric', subType: 'baseFabric', name: 'Italian Micro Velvet (9000)', surcharge: 12000, description: 'Ultra-luxurious rich velvet with deep plush luster and warmth.', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=300&q=80' },
  { category: 'fabric', subType: 'baseFabric', name: 'Handspun Tissue Organza', surcharge: 6000, description: 'Airy shimmering metallic sheen fabric creating dreamy lightness.', image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=300&q=80' },
  { category: 'fabric', subType: 'baseFabric', name: 'French Chantilly Tulle Net', surcharge: 5000, description: 'Delicate imported net with supreme softness and fine embroidery ground.', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=300&q=80' },

  // Embroidery Work
  { category: 'embroidery', subType: 'intensity', name: 'Imperial Heavy Zardozi & Dabka', surcharge: 25000, description: 'Full coverage hand-embroidery with gold bullion, real sequins, and crystals.' },
  { category: 'embroidery', subType: 'intensity', name: 'Refined Medium Resham & Gotapatti', surcharge: 15000, description: 'Balanced floral jaal with silk thread resham and delicate gold leaf gotapatti.' },
  { category: 'embroidery', subType: 'intensity', name: 'Minimalist Starlight Mirror Work', surcharge: 9000, description: 'Subtle scattering of micro mirrors and delicate antique zari borders.' },

  // Dupatta Styling
  { category: 'dupatta', subType: 'style', name: 'Signature Single Dupatta (2.75m)', surcharge: 0, description: 'Single broad border dupatta with all-around scalloped embroidery.' },
  { category: 'dupatta', subType: 'style', name: 'Double Bridal Dupatta (Head Drape + Veil)', surcharge: 14000, description: 'Includes a lightweight sheer head veil + a heavily worked shoulder shawl.' },

  // Personalization
  { category: 'personalization', subType: 'monogram', name: 'Bride & Groom Name Monogram', surcharge: 3500, description: 'Custom calligraphy embroidery of wedding date and couple names on waist or dupatta corner.' }
];

export const sampleProducts = (categoryMap) => [
  {
    name: 'Shahzadi Begum Royal Crimson Velvet Lehenga',
    slug: 'shahzadi-begum-royal-crimson-velvet-lehenga',
    sku: 'ZUR-BD-001',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 385000,
    salePrice: 345000,
    shortDescription: 'Regal deep crimson velvet bridal lehenga drenched in 300+ hours of heirloom antique gold zardozi and hand-cut sequins.',
    description: 'An ode to Mughal royalty, the Shahzadi Begum ensemble is tailored in rich 9000-grade Italian micro-velvet. Featuring a 24-kali flared skirt with intricate archways (mehrab) of floral vines, zardozi embroidery, semi-precious stone work, and fine naqshi. Accompanied by a sweetheart choli and dual dupattas—one in rich velvet and another in whisper-light organza veil.',
    fabric: 'Italian Micro Velvet & Handspun Tissue Organza',
    embroideryWork: 'Handcrafted Zardozi, Antique Dabka, Pearls, and Semi-Precious Stones',
    colors: [
      { name: 'Royal Crimson Red', hex: '#8B0000' },
      { name: 'Deep Maroon Wine', hex: '#4A0E17' },
      { name: 'Burgundy Velvet', hex: '#65000B' }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 2 },
      { size: 'Custom', stock: 10 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
        alt: 'Royal Crimson Bridal Lehenga front view',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
        alt: 'Shahzadi Begum Lehenga close up embroidery',
      },
      {
        url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bridal Dupatta drape detail',
      }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.95,
    numReviews: 18,
  },
  {
    name: 'Nur-e-Jahan Champagne Rose Gold Walima Lehenga',
    slug: 'nur-e-jahan-champagne-rose-gold-walima-lehenga',
    sku: 'ZUR-WL-002',
    category: categoryMap['walima-splendor'],
    occasion: 'Walima',
    price: 295000,
    salePrice: null,
    shortDescription: 'Luminous champagne silk and tissue tulle lehenga shimmering with hand-inlaid Swarovski crystals and silver dabka embroidery.',
    description: 'The Nur-e-Jahan bridal ensemble represents contemporary luxury for modern brides. Crafted from delicate metallic tissue organza layered over pure silk satin, this piece glimmers with crystal drops, French wire work, and soft rose gold undertones. Finished with a dramatic 2-meter floor-sweeping train.',
    fabric: 'Pure Silk Satin & Metallic Tissue Organza',
    embroideryWork: 'Swarovski Crystals, Silver Wire Dabka, Pearl Drops, and Cutwork Borders',
    colors: [
      { name: 'Imperial Terracotta Rosewood', hex: '#B4533C' },
      { name: 'Icy Silver Oyster', hex: '#D8D4D0' },
      { name: 'Soft Blush Pink', hex: '#F7EFEA' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 4 },
      { size: 'Custom', stock: 12 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
        alt: 'Champagne Walima Lehenga front view',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Walima Lehenga embroidery craftsmanship',
      }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 5.0,
    numReviews: 24,
  },
  {
    name: 'Jahanara Saffron Mustard Mehndi Kalidar',
    slug: 'jahanara-saffron-mustard-mehndi-kalidar',
    sku: 'ZUR-MH-003',
    category: categoryMap['mehndi-mayun'],
    occasion: 'Mehndi',
    price: 215000,
    salePrice: 195000,
    shortDescription: 'Vibrant saffron raw silk lehenga festooned with multi-colored floral resham embroidery and geometric gotapatti motifs.',
    description: 'Radiate joyful festival energy in the Jahanara Mehndi piece. Featuring a warm saffron gold base layered with emerald green and hot fuchsia borders. Handcrafted with traditional gota patti, mirror embellishments, and playful latkan tassels on the waistband.',
    fabric: 'Pure Raw Silk (80g) & Chiffon Dupatta',
    embroideryWork: 'Gotapatti, Real Mirrors, Resham Threadwork, and Gilded Tassels',
    colors: [
      { name: 'Saffron Mustard', hex: '#E6A100' },
      { name: 'Emerald Mehndi Green', hex: '#0B6623' },
      { name: 'Rani Pink', hex: '#E0115F' }
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 8 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85',
        alt: 'Saffron Mehndi Lehenga full flair',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Mehndi choli design and back tassels',
      }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.88,
    numReviews: 12,
  },
  {
    name: 'Dilruba Dusty Rose Pastel Bridal Lehenga',
    slug: 'dilruba-dusty-rose-pastel-bridal-lehenga',
    sku: 'ZUR-BD-004',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 320000,
    salePrice: null,
    shortDescription: 'Heavily embellished romantic dusty rose organza lehenga with champagne pearls, rose gold foil work, and delicate scallop hem.',
    description: 'An ethereal romantic vision, the Dilruba bridal set captures the delicate charm of pastel luxury. Over 20 panels of sheer silk organza are woven with intricate floral vines, iridescent sequins, and micro-pearls, finished with a heavy scalloped border.',
    fabric: 'Pure Silk Organza & Crushed Tissue Linings',
    embroideryWork: 'Champagne Pearls, Rose Gold Sequins, Naqshi & Filigree Cutwork',
    colors: [
      { name: 'Dusty Rose Blush', hex: '#C99E94' },
      { name: 'Powder Peach', hex: '#FFDAB9' }
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 3 },
      { size: 'Custom', stock: 15 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Dusty Rose Bridal Lehenga',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
        alt: 'Pastel bridal dupatta border',
      }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.92,
    numReviews: 15,
  },
  {
    name: 'Mumtaz Ivory & Antique Gold Heritage Lehenga',
    slug: 'mumtaz-ivory-antique-gold-heritage-lehenga',
    sku: 'ZUR-EG-005',
    category: categoryMap['engagement-reception'],
    occasion: 'Engagement',
    price: 260000,
    salePrice: 235000,
    shortDescription: 'Regal ivory raw silk lehenga with antique gold marodi embroidery, kora, and crushed tissue dupatta.',
    description: 'A timeless classic designed for Nikah and Engagement celebrations. Features an ivory base richly worked with antique gold kora, intricate jaali work, and geometric borders inspired by ancient Lahore palace frescoes.',
    fabric: 'Pure Raw Silk (80g) & Zari Chiffon',
    embroideryWork: 'Antique Gold Marodi, Kora, Dabka, and Fine Sequins',
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Imperial Terracotta Rosewood', hex: '#B4533C' }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 10 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
        alt: 'Ivory Antique Gold Lehenga',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
        alt: 'Ivory Nikah Lehenga details',
      }
    ],
    isCustomizable: true,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    numReviews: 9,
  },
  {
    name: 'Anarkali Emerald Jewel Tone Festive Lehenga',
    slug: 'anarkali-emerald-jewel-tone-festive-lehenga',
    sku: 'ZUR-PV-006',
    category: categoryMap['luxury-festive'],
    occasion: 'Party Wear',
    price: 165000,
    salePrice: null,
    shortDescription: 'Emerald green banarasi brocade and organza festive lehenga with handworked zardozi blouse.',
    description: 'Perfect for bridal sisters and high-fashion evening receptions. The skirt features a rich woven banarasi brocade with gold bootis, paired with a sweetheart zardozi handworked choli and an organza dupatta.',
    fabric: 'Banarasi Brocade & Silk Organza',
    embroideryWork: 'Zardozi Handwork, Cutdana, and Sequin Motifs',
    colors: [
      { name: 'Emerald Jewel Green', hex: '#0B6623' },
      { name: 'Royal Navy Blue', hex: '#000080' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 2 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Emerald Party Wear Lehenga',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85',
        alt: 'Festive lehenga back choli detail',
      }
    ],
    isCustomizable: true,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.85,
    numReviews: 7,
  }
];

export const couponsData = [
  {
    code: 'ROYAL10',
    discountPercent: 10,
    minPurchase: 100000,
    maxDiscount: 40000,
    expiryDate: new Date('2028-12-31'),
    usageLimit: 200,
    isActive: true,
  },
  {
    code: 'BRIDAL15',
    discountPercent: 15,
    minPurchase: 250000,
    maxDiscount: 60000,
    expiryDate: new Date('2028-12-31'),
    usageLimit: 100,
    isActive: true,
  }
];
