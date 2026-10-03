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
    sku: 'FHS-BD-001',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 385000,
    salePrice: 345000,
    shortDescription: 'Regal deep crimson velvet bridal lehenga drenched in 300+ hours of heirloom antique gold zardozi and hand-cut sequins.',
    description: 'An ode to Mughal royalty, the Shahzadi Begum ensemble is tailored in rich 9000-grade Italian micro-velvet. Featuring a 24-kali flared skirt with intricate archways (mehrab) of floral vines, zardozi embroidery, semi-precious stone work, and fine naqshi.',
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
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85', alt: 'Royal Crimson Bridal Lehenga front view', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Shahzadi Begum Lehenga close up embroidery' }
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
    sku: 'FHS-WL-002',
    category: categoryMap['walima-splendor'],
    occasion: 'Walima',
    price: 295000,
    salePrice: 265000,
    shortDescription: 'Luminous champagne silk and tissue tulle lehenga shimmering with hand-inlaid Swarovski crystals and silver dabka embroidery.',
    description: 'The Nur-e-Jahan bridal ensemble represents contemporary luxury for modern brides. Crafted from delicate metallic tissue organza layered over pure silk satin with crystal drops and soft rose gold undertones.',
    fabric: 'Pure Silk Satin & Metallic Tissue Organza',
    embroideryWork: 'Swarovski Crystals, Silver Wire Dabka, Pearl Drops, and Cutwork Borders',
    colors: [
      { name: 'Champagne Rose Gold', hex: '#E6C280' },
      { name: 'Icy Silver Oyster', hex: '#D8D4D0' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 4 },
      { size: 'Custom', stock: 12 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85', alt: 'Champagne Walima Lehenga front view', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', alt: 'Walima Lehenga embroidery craftsmanship' }
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
    sku: 'FHS-MH-003',
    category: categoryMap['mehndi-mayun'],
    occasion: 'Mehndi',
    price: 215000,
    salePrice: 195000,
    shortDescription: 'Vibrant saffron raw silk lehenga festooned with multi-colored floral resham embroidery and geometric gotapatti motifs.',
    description: 'Radiate joyful festival energy in the Jahanara Mehndi piece. Featuring a warm saffron gold base layered with emerald green and hot fuchsia borders.',
    fabric: 'Pure Raw Silk (80g) & Chiffon Dupatta',
    embroideryWork: 'Gotapatti, Real Mirrors, Resham Threadwork, and Gilded Tassels',
    colors: [
      { name: 'Saffron Mustard', hex: '#E6A100' },
      { name: 'Emerald Mehndi Green', hex: '#0B6623' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 8 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Saffron Mehndi Lehenga full flair', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Mehndi choli design and back tassels' }
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
    sku: 'FHS-BD-004',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 320000,
    salePrice: 288000,
    shortDescription: 'Heavily embellished romantic dusty rose organza lehenga with champagne pearls, rose gold foil work, and delicate scallop hem.',
    description: 'An ethereal romantic vision, the Dilruba bridal set captures the delicate charm of pastel luxury. Over 20 panels of sheer silk organza woven with floral vines and micro-pearls.',
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
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', alt: 'Dusty Rose Bridal Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85', alt: 'Pastel bridal dupatta border' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.92,
    numReviews: 15,
  },
  {
    name: 'Mumtaz Ivory & Antique Gold Heritage Lehenga',
    slug: 'mumtaz-ivory-antique-gold-heritage-lehenga',
    sku: 'FHS-EG-005',
    category: categoryMap['engagement-reception'],
    occasion: 'Engagement',
    price: 260000,
    salePrice: 235000,
    shortDescription: 'Regal ivory raw silk lehenga with antique gold marodi embroidery, kora, and crushed tissue dupatta.',
    description: 'A timeless classic designed for Nikah and Engagement celebrations. Features an ivory base richly worked with antique gold kora, intricate jaali work, and geometric borders.',
    fabric: 'Pure Raw Silk (80g) & Zari Chiffon',
    embroideryWork: 'Antique Gold Marodi, Kora, Dabka, and Fine Sequins',
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Champagne Gold', hex: '#D4AF37' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 10 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Ivory Antique Gold Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85', alt: 'Ivory Nikah Lehenga details' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    numReviews: 9,
  },
  {
    name: 'Anarkali Emerald Jewel Tone Festive Lehenga',
    slug: 'anarkali-emerald-jewel-tone-festive-lehenga',
    sku: 'FHS-PV-006',
    category: categoryMap['luxury-festive'],
    occasion: 'Party Wear',
    price: 165000,
    salePrice: 148000,
    shortDescription: 'Emerald green banarasi brocade and organza festive lehenga with handworked zardozi blouse.',
    description: 'Perfect for bridal sisters and high-fashion evening receptions. The skirt features a rich woven banarasi brocade with gold bootis paired with a sweetheart zardozi choli.',
    fabric: 'Banarasi Brocade & Silk Organza',
    embroideryWork: 'Zardozi Handwork, Cutdana, and Sequin Motifs',
    colors: [
      { name: 'Emerald Jewel Green', hex: '#0B6623' },
      { name: 'Royal Navy Blue', hex: '#000080' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 4 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Emerald Party Wear Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Festive lehenga back choli detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.85,
    numReviews: 7,
  },
  {
    name: 'Maharani Royal Ruby 24-Kali Bridal Lehenga',
    slug: 'maharani-royal-ruby-24-kali-bridal-lehenga',
    sku: 'FHS-BD-007',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 410000,
    salePrice: 369000,
    shortDescription: 'Magnificent 24-kali flared ruby red bridal lehenga with 3D floral bullion embroidery, tilla, and crystal drops.',
    description: 'Crafted for the grand Barat stage, this bridal piece incorporates traditional Mughal garden paisleys rendered in gold bullion thread and deep ruby Swarovski crystals.',
    fabric: 'Pure Raw Silk & Micro-Velvet Shawl',
    embroideryWork: '3D Floral Bullion, Zardozi, Tilla, and Gilded Pearls',
    colors: [
      { name: 'Royal Ruby Red', hex: '#9B111E' },
      { name: 'Classic Crimson', hex: '#8B0000' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 8 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85', alt: 'Maharani Ruby Bridal Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Ruby lehenga hem detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.98,
    numReviews: 21,
  },
  {
    name: 'Koh-i-Noor Icy Mint & Silver Tilla Walima Gown Lehenga',
    slug: 'koh-i-noor-icy-mint-silver-tilla-walima-gown-lehenga',
    sku: 'FHS-WL-008',
    category: categoryMap['walima-splendor'],
    occasion: 'Walima',
    price: 335000,
    salePrice: 299000,
    shortDescription: 'Pastel icy mint net and organza lehenga encrusted with fine silver tilla work, cutdana, and shimmering sequins.',
    description: 'A modern fairytale ensemble for contemporary Walima brides. Features an extended trail, crystalline lattice embroidery, and a sheer embroidered scalloped dupatta.',
    fabric: 'French Tulle Net & Pure Silk Lining',
    embroideryWork: 'Silver Tilla, Micro Cutdana, Austrian Crystals, and Sequin Spray',
    colors: [
      { name: 'Icy Mint Green', hex: '#D8F3DC' },
      { name: 'Powder Silver Grey', hex: '#E5E7EB' }
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 3 },
      { size: 'Custom', stock: 12 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85', alt: 'Icy Mint Walima Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', alt: 'Walima silver dupatta detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.93,
    numReviews: 16,
  },
  {
    name: 'Gulbahar Fuchsia & Mustard Gotapatti Kalidar',
    slug: 'gulbahar-fuchsia-mustard-gotapatti-kalidar',
    sku: 'FHS-MH-009',
    category: categoryMap['mehndi-mayun'],
    occasion: 'Mehndi',
    price: 195000,
    salePrice: 175000,
    shortDescription: 'Festive dual-tone fuchsia and mustard yellow kalidar adorned with traditional handcrafted gotapatti and mirror lace.',
    description: 'Capturing the vibrant essence of traditional Mehndi nights. The tiered skirt blends warm saffron and deep rani pink, bordered with intricate gotta flowers and mirror work.',
    fabric: 'Pure Raw Silk & Organza Dupatta',
    embroideryWork: 'Gota Patti, Mirror Work, Resham Threadwork, and Pearl Latkans',
    colors: [
      { name: 'Rani Pink & Mustard', hex: '#E0115F' },
      { name: 'Lime Green & Tangerine', hex: '#32CD32' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Gulbahar Mehndi Kalidar', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Mehndi Dupatta and Gota details' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.87,
    numReviews: 11,
  },
  {
    name: 'Mehrunisa Plum Velvet Antique Dabka Bridal Lehenga',
    slug: 'mehrunisa-plum-velvet-antique-dabka-bridal-lehenga',
    sku: 'FHS-BD-010',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 395000,
    salePrice: 355000,
    shortDescription: 'Deep royal plum micro-velvet bridal lehenga adorned with antique copper dabka, maroon resham, and gold marodi work.',
    description: 'A regal statement piece for brides seeking distinct aristocratic tones. The plush velvet fabric provides a rich canvas for multi-dimensional antique copper and gold craftsmanship.',
    fabric: 'Italian Micro Velvet & Organza Veil',
    embroideryWork: 'Antique Copper Dabka, Marodi Embroidery, Pearls, and Zari',
    colors: [
      { name: 'Royal Plum Violet', hex: '#58111A' },
      { name: 'Deep Burgundy', hex: '#65000B' }
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 3 },
      { size: 'Custom', stock: 9 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Plum Velvet Bridal Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85', alt: 'Mehrunisa bridal choli details' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.96,
    numReviews: 14,
  },
  {
    name: 'Zeenat Powder Blue Crystal Draped Walima Lehenga',
    slug: 'zeenat-powder-blue-crystal-draped-walima-lehenga',
    sku: 'FHS-WL-011',
    category: categoryMap['walima-splendor'],
    occasion: 'Walima',
    price: 285000,
    salePrice: 255000,
    shortDescription: 'Powder blue silk organza lehenga with all-over Swarovski crystal lattice, delicate pearl drapes, and a scalloped veil.',
    description: 'Designed for a serene, luminous reception entrance. The skirt features hand-worked geometric arches with pearl drops, accompanied by a sculpted sweetheart neckline blouse.',
    fabric: 'Silk Organza & Tissue Satin',
    embroideryWork: 'Swarovski Crystals, Hand-sewn Pearls, Silver Threadwork, and Net Applique',
    colors: [
      { name: 'Powder Blue', hex: '#B0E0E6' },
      { name: 'Ice Grey', hex: '#DCDCDC' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', alt: 'Powder Blue Walima Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85', alt: 'Zeenat veil embroidery detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.91,
    numReviews: 10,
  },
  {
    name: 'Basant Parrot Green & Tangerine Resham Lehenga',
    slug: 'basant-parrot-green-tangerine-resham-lehenga',
    sku: 'FHS-MH-012',
    category: categoryMap['mehndi-mayun'],
    occasion: 'Mehndi',
    price: 180000,
    salePrice: 162000,
    shortDescription: 'Lively parrot green pure raw silk lehenga with vibrant tangerine border, mirrorwork embroidery, and gotta tassels.',
    description: 'A celebration of heritage color harmony. The skirt flare is accented with traditional peacock motifs, bright orange resham threadwork, and sparkling mirror inserts.',
    fabric: 'Pure Raw Silk (80g) & Chiffon',
    embroideryWork: 'Mirrorwork, Multi-color Resham, Gotta Flowers, and Tilla Borders',
    colors: [
      { name: 'Parrot Green & Orange', hex: '#50C878' },
      { name: 'Saffron Yellow', hex: '#F4C430' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 3 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Parrot Green Mehndi Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Basant gotta work detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.86,
    numReviews: 8,
  },
  {
    name: 'Heer Pearl White & Rose Gold Nikah Lehenga',
    slug: 'heer-pearl-white-rose-gold-nikah-lehenga',
    sku: 'FHS-EG-013',
    category: categoryMap['engagement-reception'],
    occasion: 'Engagement',
    price: 275000,
    salePrice: 245000,
    shortDescription: 'Graceful pearl white raw silk lehenga with rose gold zari jaali, hand-set micro-pearls, and delicate net dupatta.',
    description: 'An angelic composition for sacred Nikah vows and high-profile engagements. Features intricate rose gold foliage vines and a soft champagne blush inner underlay.',
    fabric: 'Pure Raw Silk & Tissue Net',
    embroideryWork: 'Rose Gold Zari, Cultured Pearls, Sequins, and Resham',
    colors: [
      { name: 'Pearl White', hex: '#FDFBF7' },
      { name: 'Rose Gold Blush', hex: '#B4533C' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 11 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Heer Pearl White Nikah Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85', alt: 'Nikah lehenga dupatta drape' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.94,
    numReviews: 13,
  },
  {
    name: 'Subh-e-Benares Royal Purple Banarasi Brocade Lehenga',
    slug: 'subh-e-benares-royal-purple-banarasi-brocade-lehenga',
    sku: 'FHS-PV-014',
    category: categoryMap['luxury-festive'],
    occasion: 'Party Wear',
    price: 175000,
    salePrice: 155000,
    shortDescription: 'Woven royal purple Banarasi silk brocade lehenga paired with an antique gold zardozi embroidered choli.',
    description: 'Rich artisanal heritage tailored for wedding guests and celebratory galas. Woven with pure gold zari threads and accompanied by a featherlight organza dupatta.',
    fabric: 'Pure Banarasi Brocade & Silk Organza',
    embroideryWork: 'Gold Zari Weaving, Zardozi Choli Embroidery, and Pearl Border',
    colors: [
      { name: 'Royal Purple Wine', hex: '#4B0082' },
      { name: 'Imperial Magenta', hex: '#8B008B' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 3 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Royal Purple Banarasi Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Brocade weave detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.89,
    numReviews: 9,
  },
  {
    name: 'Noor Mahal Scarlet & Gold Zardozi Barat Lehenga',
    slug: 'noor-mahal-scarlet-gold-zardozi-barat-lehenga',
    sku: 'FHS-BD-015',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 430000,
    salePrice: 385000,
    shortDescription: 'Opulent scarlet red silk bridal lehenga embroidered with heavy gold zardozi arches, antique naqshi, and stone florets.',
    description: 'A showstopper Barat lehenga radiating royal Mughal dignity. Features intricate tree-of-life motifs hand-embroidered on pure silk panels with an attached structured cancan.',
    fabric: 'Pure Raw Silk (80g) & Velvet Scallop Dupatta',
    embroideryWork: 'Imperial Zardozi, Naqshi, Antique Kora, Dabka, and Fine Sequins',
    colors: [
      { name: 'Scarlet Red', hex: '#FF2400' },
      { name: 'Imperial Crimson', hex: '#8B0000' }
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 14 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85', alt: 'Scarlet Barat Lehenga front', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Noor Mahal embroidery detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.97,
    numReviews: 20,
  },
  {
    name: 'Shalimar Lavender & Lilac Organza Gown Lehenga',
    slug: 'shalimar-lavender-lilac-organza-gown-lehenga',
    sku: 'FHS-WL-016',
    category: categoryMap['walima-splendor'],
    occasion: 'Walima',
    price: 310000,
    salePrice: 279000,
    shortDescription: 'Dreamy lavender organza lehenga embellished with iridescent crystals, lilac threadwork, and silver filigree cutwork.',
    description: 'Pastel poetry in motion. Designed with cascading multi-layered flares that capture light beautifully under evening ballroom chandeliers.',
    fabric: 'Pure Silk Organza & Shimmer Net',
    embroideryWork: 'Iridescent Crystals, Lilac Resham, Silver Filigree, and Cutdana',
    colors: [
      { name: 'Lavender Blush', hex: '#E6E6FA' },
      { name: 'Lilac Rose', hex: '#D8BFD8' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85', alt: 'Lavender Walima Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', alt: 'Shalimar cutwork detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.92,
    numReviews: 15,
  },
  {
    name: 'Rang-e-Hina Lemon Yellow & Mirrorwork Kalidar',
    slug: 'rang-e-hina-lemon-yellow-mirrorwork-kalidar',
    sku: 'FHS-MH-017',
    category: categoryMap['mehndi-mayun'],
    occasion: 'Mehndi',
    price: 185000,
    salePrice: 165000,
    shortDescription: 'Lemon yellow raw silk flared kalidar with dense mirrorwork borders, gota patti bouquets, and emerald green accents.',
    description: 'Infuse traditional festive vibrancy into your Mayun celebration. Features lightweight construction for joyful dancing with a heavily bordered dupatta.',
    fabric: 'Raw Silk (80g) & Pure Chiffon',
    embroideryWork: 'Authentic Mirrorwork, Gota Patti, Resham Bootis, and Pearl Finishing',
    colors: [
      { name: 'Lemon Yellow', hex: '#FFF44F' },
      { name: 'Emerald Green', hex: '#0B6623' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 3 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Lemon Yellow Mehndi Kalidar', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Mirrorwork craftsmanship' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.88,
    numReviews: 10,
  },
  {
    name: 'Pari Mahal Peach Blossom Heavily Embellished Lehenga',
    slug: 'pari-mahal-peach-blossom-heavily-embellished-lehenga',
    sku: 'FHS-EG-018',
    category: categoryMap['engagement-reception'],
    occasion: 'Engagement',
    price: 290000,
    salePrice: 259000,
    shortDescription: 'Delicate peach blossom tissue organza lehenga hand-inlaid with champagne sequins, pearls, and fine silver zari.',
    description: 'Subtle romance rendered in supreme craftsmanship. Ideal for outdoor sunset Nikahs and daytime engagement banquets.',
    fabric: 'Tissue Organza & Pure Silk Lining',
    embroideryWork: 'Champagne Sequins, Handcrafted Pearls, Silver Wire Work, and Resham',
    colors: [
      { name: 'Peach Blossom', hex: '#FFDAB9' },
      { name: 'Rosewater Pink', hex: '#FFE4E1' }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', alt: 'Peach Blossom Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Pari Mahal embroidery closeup' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.93,
    numReviews: 12,
  },
  {
    name: 'Dastaan-e-Ishq Deep Maroon Micro-Velvet Heirloom Lehenga',
    slug: 'dastaan-e-ishq-deep-maroon-micro-velvet-heirloom-lehenga',
    sku: 'FHS-BD-019',
    category: categoryMap['bridal-couture'],
    occasion: 'Bridal',
    price: 450000,
    salePrice: 399000,
    shortDescription: 'Masterpiece deep maroon Italian velvet bridal lehenga with royal court motifs, antique gold dabka, and real semi-precious rubies.',
    description: 'The pinnacle of bespoke bridal heritage. Taking over 450 artisan hours to complete, each kali features architectural archways and intricate gold bullion work.',
    fabric: '9000 Italian Micro-Velvet & Tissue Veil',
    embroideryWork: 'Gold Bullion, Real Rubies, Antique Dabka, Naqshi, and Pearl Latkans',
    colors: [
      { name: 'Deep Maroon Wine', hex: '#4A0E17' },
      { name: 'Imperial Crimson', hex: '#8B0000' }
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 16 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85', alt: 'Dastaan-e-Ishq Maroon Bridal Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85', alt: 'Velvet embroidery closeup' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.99,
    numReviews: 26,
  },
  {
    name: 'Sultana Sapphire Blue & Silver Zardozi Luxury Ensemble',
    slug: 'sultana-sapphire-blue-silver-zardozi-luxury-ensemble',
    sku: 'FHS-PV-020',
    category: categoryMap['luxury-festive'],
    occasion: 'Party Wear',
    price: 185000,
    salePrice: 165000,
    shortDescription: 'Royal sapphire blue raw silk flared skirt with dense silver zardozi borders and sculpted sweetheart neckline blouse.',
    description: 'A striking jewel-toned ensemble created for wedding formal evenings and reception guests. Shimmers with fine silver tilla and cutdana embroidery.',
    fabric: 'Pure Raw Silk (80g) & Chiffon Dupatta',
    embroideryWork: 'Silver Zardozi, Cutdana, Austrian Crystals, and Resham',
    colors: [
      { name: 'Sapphire Blue', hex: '#0F52BA' },
      { name: 'Midnight Navy', hex: '#000080' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 3 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Sapphire Blue Festive Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Silver zardozi border detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.88,
    numReviews: 8,
  },
  {
    name: 'Aasman-e-Noor Sterling Silver Metallic Tissue Walima Lehenga',
    slug: 'aasman-e-noor-sterling-silver-metallic-tissue-walima-lehenga',
    sku: 'FHS-WL-021',
    category: categoryMap['walima-splendor'],
    occasion: 'Walima',
    price: 340000,
    salePrice: 305000,
    shortDescription: 'Shimmering sterling silver metallic tissue lehenga with cascading crystal spray, pearl drops, and 2-meter train.',
    description: 'Breathtaking metallic radiance tailored for glamorous reception nights. Featuring fine silver wire embroidery, translucent organza layering, and a matching scalloped head veil.',
    fabric: 'Metallic Tissue Organza & Pure Silk Lining',
    embroideryWork: 'Sterling Silver Wire Work, Swarovski Crystals, Pearl Drops, and Sequin Spray',
    colors: [
      { name: 'Sterling Silver', hex: '#C0C0C0' },
      { name: 'Platinum Oyster', hex: '#E5E4E2' }
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 },
      { size: 'Custom', stock: 10 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85', alt: 'Sterling Silver Walima Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', alt: 'Metallic tissue embroidery detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.95,
    numReviews: 17,
  },
  {
    name: 'Jashn-e-Bahar Coral Pink Silk Embroidered Festive Lehenga',
    slug: 'jashn-e-bahar-coral-pink-silk-embroidered-festive-lehenga',
    sku: 'FHS-PV-022',
    category: categoryMap['luxury-festive'],
    occasion: 'Party Wear',
    price: 170000,
    salePrice: 152000,
    shortDescription: 'Warm coral pink raw silk lehenga with floral resham jaal, gold gota borders, and pearl-fringed blouse.',
    description: 'Youthful elegance and effortless charm for festive celebrations. Handcrafted with delicate peach and coral threads, accented with twinkling cutdana.',
    fabric: 'Pure Raw Silk & Shimmer Net Dupatta',
    embroideryWork: 'Resham Floral Jaal, Gota Borders, Cutdana, and Pearl Fringes',
    colors: [
      { name: 'Coral Pink', hex: '#F88379' },
      { name: 'Rosewater Blush', hex: '#FFE4E1' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 3 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', alt: 'Coral Pink Festive Lehenga', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85', alt: 'Floral resham embroidery detail' }
    ],
    isCustomizable: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.87,
    numReviews: 11,
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
