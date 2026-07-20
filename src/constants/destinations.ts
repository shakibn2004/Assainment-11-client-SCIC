export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface WeatherInfo {
  season: string;
  tempRange: string;
  info: string;
}

export interface Destination {
  id: string;
  title: string;
  location: string;
  price: "low" | "medium" | "high";
  priceAmount: string;
  climate: "tropical" | "cold" | "temperate" | "arid";
  rating: number;
  image: string;
  images: string[];
  tagline: string;
  description: string;
  duration: string;
  bestTimeToVisit: string;
  activities: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  reviews: Review[];
  weather: WeatherInfo;
}

export const destinations: Destination[] = [
  {
    id: "1",
    title: "Bali Retreat",
    location: "Indonesia",
    price: "medium",
    priceAmount: "$1,250",
    climate: "tropical",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Unwind in a tropical paradise of ancient temples, lush rice fields, and pristine beaches.",
    description: "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or commune with the tropical creatures as you dive along coral ridges. On shore, the lush jungle shelters stone temples and mischievous monkeys. The artistic capital of Ubud is the perfect place to see a cultural dance performance, take a batik or silver-smithing workshop, or invigorate your mind and body in a yoga class.",
    duration: "7 Days / 6 Nights",
    bestTimeToVisit: "April to October (Dry Season)",
    activities: ["Temple Tours", "Rice Terrace Trekking", "Surfing", "Yoga & Wellness"],
    highlights: [
      "Walk through the breathtaking Tegallalang Rice Terraces",
      "Explore the historic Uluwatu Temple perched on a coastal cliff",
      "Meet native macaques in the Sacred Monkey Forest Sanctuary",
      "Enjoy a traditional Balinese spa treatment and flower bath"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Ubud Transfer",
        activities: ["Airport pickup and transfer to Ubud villa", "Welcome Balinese dinner with local dances", "Evening leisure walk around Ubud center"]
      },
      {
        day: 2,
        title: "Ubud Culture & Nature",
        activities: ["Guided tour of Sacred Monkey Forest Sanctuary", "Visit Ubud Palace and Traditional Art Market", "Scenic lunch overlooking Campuhan Ridge Walk"]
      },
      {
        day: 3,
        title: "Tegallalang & Spiritual Purification",
        activities: ["Morning trek in Tegallalang Rice Terraces", "Water purification ritual at Tirta Empul Temple", "Organic farm-to-table lunch cooking class"]
      },
      {
        day: 4,
        title: "Volcano Sunrise Trek",
        activities: ["Early morning climb of Mount Batur for sunrise views", "Soak in local natural hot springs", "Afternoon rest and wellness spa session"]
      },
      {
        day: 5,
        title: "Coastal Uluwatu & Beaches",
        activities: ["Transfer to Nusa Dua beach resort", "Relaxation on Geger beach", "Evening Uluwatu Temple tour with Kecak fire dance overlooking the ocean"]
      },
      {
        day: 6,
        title: "Nusa Penida Day Trip",
        activities: ["Speedboat trip to Nusa Penida island", "Visit Kelingking T-Rex cliff and Angel's Billabong", "Snorkeling with Manta Rays at Manta Point"]
      },
      {
        day: 7,
        title: "Departure",
        activities: ["Morning beach walk and souvenir shopping", "Transfer to Denpasar International Airport for departure"]
      }
    ],
    reviews: [
      {
        author: "Emma Watson",
        rating: 5,
        text: "Absolutely magical experience! The itinerary planned by NomadAI was seamless, taking us to both famous sights and hidden gems.",
        date: "June 14, 2026"
      },
      {
        author: "Liam Neeson",
        rating: 4.5,
        text: "Incredible resort choices and great guides. The sunrise trek on Mt. Batur was challenging but completely worth the views.",
        date: "May 29, 2026"
      }
    ],
    weather: {
      season: "Dry Season",
      tempRange: "26°C - 31°C",
      info: "Sunny days, low humidity, and pleasant ocean breezes. Ideal for snorkeling, swimming, and exploring outdoors."
    }
  },
  {
    id: "2",
    title: "Swiss Alps",
    location: "Switzerland",
    price: "high",
    priceAmount: "$2,850",
    climate: "cold",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Experience the peak of luxury amidst snow-covered summits and crystal-clear lakes.",
    description: "The Swiss Alps offer some of the most dramatic, majestic alpine landscapes on earth. From the striking pyramid peak of the Matterhorn in Zermatt to the massive glaciers of the Jungfrau region, this destination is a wonderland for outdoor enthusiasts and luxury travelers alike. Travel on world-class mountain railways, ski on legendary slopes, and warm up with traditional cheese fondue in cozy wood cabins.",
    duration: "6 Days / 5 Nights",
    bestTimeToVisit: "December to March (Winter Sports) or July to September (Hiking)",
    activities: ["Skiing & Snowboarding", "Alpine Hiking", "Scenic Train Rides", "Cheese Fondue Tasting"],
    highlights: [
      "Ride the Glacier Express, the world's slowest express train",
      "Gaze at the legendary Matterhorn peak in Zermatt",
      "Ascend to Jungfraujoch, the 'Top of Europe' railway station",
      "Relax in natural hot springs overlooking snow-capped peaks"
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Zurich & Transfer to Zermatt",
        activities: ["Arrive in Zurich and board a first-class train to car-free Zermatt", "Check into a luxury alpine boutique hotel", "Evening walk through Zermatt with Matterhorn views"]
      },
      {
        day: 2,
        title: "Matterhorn Glacier Paradise",
        activities: ["Ascend via cable car to Zermatt's highest viewing platform (3,883m)", "Walk through glacier palaces and snow tubes", "Authentic Swiss cheese fondue dinner in Zermatt town"]
      },
      {
        day: 3,
        title: "Glacier Express to Interlaken",
        activities: ["Board the panoramic Glacier Express train ride", "Cross high mountain passes and spectacular bridges", "Arrive in Interlaken and settle in at a lakeside chalet"]
      },
      {
        day: 4,
        title: "Jungfraujoch - Top of Europe",
        activities: ["Board the historic cogwheel train up to Jungfraujoch", "Explore the Ice Palace, Sphinx Observatory, and snow plateau", "Warm up with hot chocolate at the Lindt Swiss Chocolate Heaven"]
      },
      {
        day: 5,
        title: "Lauterbrunnen Valley & Grindelwald",
        activities: ["Take a morning walk through the 'Valley of 72 Waterfalls' in Lauterbrunnen", "Cable car to Grindelwald First for the thrill-seeking Cliff Walk", "Sunset hot-tub session overlooking alpine meadows"]
      },
      {
        day: 6,
        title: "Departure via Geneva",
        activities: ["Morning boat cruise on Lake Thun", "Scenic train ride to Geneva International Airport for departure flight"]
      }
    ],
    reviews: [
      {
        author: "Christopher Nolan",
        rating: 5,
        text: "The snow-capped peaks and glaciers were cinematic. Sledding down Grindelwald was a highlight. Exemplary organization.",
        date: "January 20, 2026"
      },
      {
        author: "Sophia Loren",
        rating: 4.8,
        text: "Zermatt is simply charming. The train rides are incredibly beautiful, clean, and run exactly on time. A luxury dream.",
        date: "February 12, 2026"
      }
    ],
    weather: {
      season: "Alpine Winter",
      tempRange: "-6°C - 3°C",
      info: "Crisp mountain air, heavy snow cover, and gorgeous blue-sky winter days. Essential to pack warm layers and ski gear."
    }
  },
  {
    id: "3",
    title: "Kyoto Gardens",
    location: "Japan",
    price: "medium",
    priceAmount: "$1,600",
    climate: "temperate",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Discover serene zen gardens, historic wooden temples, and elegant tea ceremonies.",
    description: "Kyoto, once the capital of Japan, is a city of thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses. It is famous for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.",
    duration: "5 Days / 4 Nights",
    bestTimeToVisit: "April (Cherry Blossoms) or November (Autumn Foliage)",
    activities: ["Zen Meditation", "Tea Ceremony", "Historical Temple Tours", "Kimono Walking Tour"],
    highlights: [
      "Walk through the thousands of vermilion torii gates at Fushimi Inari",
      "Marvel at Kinkaku-ji, the famous Golden Pavilion temple",
      "Stroll through the towering Arashiyama Bamboo Grove",
      "Experience an authentic Matcha Tea Ceremony in Gion"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kyoto & Gion Evening walk",
        activities: ["Board Bullet Train (Shinkansen) from Tokyo to Kyoto", "Check into traditional Ryokan with tatami mats", "Evening walking tour of historic Gion district, spotting geishas"]
      },
      {
        day: 2,
        title: "Golden Pavilion & Bamboo Groves",
        activities: ["Morning visit to Kinkaku-ji (Golden Pavilion)", "Stroll through Arashiyama Bamboo Forest and Tenryu-ji Zen temple", "Traditional multi-course Kaiseki dinner at Ryokan"]
      },
      {
        day: 3,
        title: "Fushimi Inari Shrine & Kiyomizu-dera",
        activities: ["Early morning hike up Mount Inari through vermilion torii gates", "Explore Kiyomizu-dera Temple with panoramic Kyoto views", "Matcha tasting and sweet-making class in Higashiyama district"]
      },
      {
        day: 4,
        title: "Nara Day Trip & Tea Ceremony",
        activities: ["Short train ride to Nara Park to feed friendly bow-bow deer", "Visit Todai-ji Temple housing the Great Bronze Buddha", "Private evening Japanese tea ceremony experience back in Kyoto"]
      },
      {
        day: 5,
        title: "Zen Gardens & Departure",
        activities: ["Morning meditation session at Ryoan-ji rock garden", "Souvenir shopping for green tea and fans at Kyoto Station", "Bullet train back to Tokyo airport for departure flight"]
      }
    ],
    reviews: [
      {
        author: "Yuki Tanaka",
        rating: 5,
        text: "Outstanding cultural immersion! Staying in a traditional ryokan with hot spring baths and multi-course meals was unforgettable.",
        date: "April 15, 2026"
      },
      {
        author: "Mark Evans",
        rating: 4.4,
        text: "Kyoto is beautiful, but very crowded during Cherry Blossom season. The early morning tips from the AI helped us beat the crowds.",
        date: "April 08, 2026"
      }
    ],
    weather: {
      season: "Temperate Spring",
      tempRange: "12°C - 20°C",
      info: "Mild pleasant days with occasional light showers. Perfect weather for strolling in traditional kimonos and taking photos under pink cherry blossoms."
    }
  },
  {
    id: "4",
    title: "Sahara Desert",
    location: "Morocco",
    price: "low",
    priceAmount: "$790",
    climate: "arid",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1509662536033-fd381e43b4e7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1509662536033-fd381e43b4e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Embark on an ancient caravan route and sleep under a canopy of infinite desert stars.",
    description: "The Sahara Desert is the world's largest hot desert, wrapping travellers in an endless sea of rolling orange dunes and star-filled skies. Traverse the dramatic Erg Chebbi dunes on camelback, enjoy rich tagines cooked over an open fire, listen to traditional Berber music, and sleep in a luxury nomad tent under the brightest stars you will ever see.",
    duration: "4 Days / 3 Nights",
    bestTimeToVisit: "October to April (Cooler Desert Months)",
    activities: ["Camel Trekking", "Stargazing", "Sandboarding", "Berber Camp Music"],
    highlights: [
      "Ride a camel across the majestic dunes of Erg Chebbi at sunset",
      "Sleep in a traditional Berber desert camp with modern comforts",
      "Glide down towering sand dunes on a sandboard",
      "Stargaze in one of the world's cleanest, dark-sky environments"
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech to Dades Valley",
        activities: ["Depart Marrakech through the Tizi n'Tichka Atlas pass", "Explore the ancient UNESCO world heritage Kasbah Ait Benhaddou", "Arrive in Dades Gorge for overnight stay in a traditional hotel"]
      },
      {
        day: 2,
        title: "Journey to Merzouga & Camel Trek",
        activities: ["Drive through Todra Gorge with high limestone cliffs", "Reach Merzouga, the gate of the Sahara", "Mount camels for a 2-hour sunset trek into the heart of the Erg Chebbi dunes"]
      },
      {
        day: 3,
        title: "Desert Exploration & Sandboarding",
        activities: ["Watch a spectacular desert sunrise over the dunes", "Try sandboarding down the massive dunes", "Visit local Gnawa musicians in Khamlia village, enjoy traditional tea and couscous"]
      },
      {
        day: 4,
        title: "Return to Marrakech",
        activities: ["Morning camel ride back to Merzouga base", "Scenic drive back through Draa Valley palm groves", "Arrive in Marrakech by late evening for departure"]
      }
    ],
    reviews: [
      {
        author: "Ray Mears",
        rating: 4.8,
        text: "The desert landscape is breathtaking. Sleeping under the stars in a luxury tent was incredible. Highly recommended budget adventure.",
        date: "November 10, 2025"
      },
      {
        author: "Sarah Jenkins",
        rating: 4.2,
        text: "The long drives from Marrakech are tiring but the Sahara experience is absolutely worth every hour on the road.",
        date: "March 02, 2026"
      }
    ],
    weather: {
      season: "Desert Autumn/Winter",
      tempRange: "8°C - 24°C",
      info: "Warm, sunny desert days with very low humidity, but temperatures drop rapidly at night. Packing high-quality thermal layers for the night is vital."
    }
  },
  {
    id: "5",
    title: "Santorini Getaway",
    location: "Greece",
    price: "high",
    priceAmount: "$2,200",
    climate: "temperate",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Soak in the postcard views of whitewashed houses, blue domes, and legendary volcanic sunsets.",
    description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The giant, water-filled caldera is overlooked by white, cliff-clinging houses in the principal towns of Fira and Oia. Experience world-renowned luxury cave hotels, infinity pools, fine dining, and breathtaking panoramic sunsets.",
    duration: "5 Days / 4 Nights",
    bestTimeToVisit: "May to October (Sunny Mediterranean Season)",
    activities: ["Caldera Sunset Cruises", "Wine Tasting Tours", "Ancient History Exploring", "Beach Relaxation"],
    highlights: [
      "Watch the famous Oia sunset from the ruins of a Byzantine Castle",
      "Sail inside the active volcanic caldera on a luxury catamaran",
      "Sip local Assyrtiko white wines at cliffside vineyards",
      "Stay in a historic whitewashed cave suite with private plunge pool"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Santorini & Oia Cliff Walk",
        activities: ["Private transfer from Santorini Airport to Oia cave resort", "Settle into cave suite overlooking the caldera", "Sunset walk along Oia cliffside path and dinner at a local taverna"]
      },
      {
        day: 2,
        title: "Catamaran Sailing Cruise",
        activities: ["Morning board a luxury catamaran sailing cruise", "Swim in volcanic hot springs and red/white beaches", "Barbecue lunch and drinks served on board"]
      },
      {
        day: 3,
        title: "Volcanic Wine Tasting & Fira Hike",
        activities: ["Hike the scenic cliffside trail from Imerovigli to Fira town", "Private tour of three family estate vineyards with wine pairings", "Gourmet seafood dinner overlooking the illuminated caldera"]
      },
      {
        day: 4,
        title: "Akrotiri Archaeological Site & Red Beach",
        activities: ["Visit the prehistoric Bronze Age city of Akrotiri (the 'Greek Pompeii')", "Sunbathe and relax at the striking Red Beach", "Evening cocktail mixing class at a cliffside lounge"]
      },
      {
        day: 5,
        title: "Departure",
        activities: ["Morning breakfast on private terrace", "Last-minute photo stroll and shopping in Oia", "Transfer to airport/ferry port for departure"]
      }
    ],
    reviews: [
      {
        author: "Victoria Beckham",
        rating: 5,
        text: "The absolute height of romance. The cave suite was breathtaking, and the sunset cruise was an experience of a lifetime.",
        date: "September 18, 2025"
      },
      {
        author: "Chris Hemsworth",
        rating: 4.8,
        text: "Amazing food, local wine is superb. Hiking the caldera path is highly recommended, keep a camera handy at all times.",
        date: "July 05, 2026"
      }
    ],
    weather: {
      season: "Mediterranean Summer",
      tempRange: "22°C - 29°C",
      info: "Perfect sunny days with dry heat and the refreshing meltemi winds. Ideal for beach days, sailing, and dining alfresco."
    }
  },
  {
    id: "6",
    title: "Phuket Shores",
    location: "Thailand",
    price: "low",
    priceAmount: "$650",
    climate: "tropical",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528181304800-2f170b89896f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Dive into turquoise waters, explore limestone caves, and enjoy vibrant night markets.",
    description: "Phuket is Thailand's largest island, nestled in the Andaman Sea. It boasts powdery white sand beaches, towering limestone karsts rising out of the water, and exotic temples. With options ranging from lively nightlife streets in Patong to tranquil beach retreats in Kata and Karon, Phuket offers a tropical experience at an incredibly accessible price point.",
    duration: "6 Days / 5 Nights",
    bestTimeToVisit: "November to April (Sunny Dry Monsoon)",
    activities: ["Island Hopping", "Thai Cooking Class", "Sea Kayaking", "Street Food Market Exploring"],
    highlights: [
      "Take a speedboat to the famous Phi Phi Islands and Maya Bay",
      "Sea kayak through the limestone caves and sea tunnels of Phang Nga Bay",
      "Visit the majestic 45-meter tall Big Buddha temple on Nakkerd Hill",
      "Indulge in authentic Thai pad thai and mango sticky rice at night markets"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Phuket & Night Market",
        activities: ["Airport pickup and transfer to beach resort", "Relax on Patong Beach", "Evening exploring street food stalls at Chillva Night Market"]
      },
      {
        day: 2,
        title: "Phi Phi Islands Speedboat Day Trip",
        activities: ["Morning speedboat to Phi Phi Don and Phi Phi Leh", "Snorkel in Loh Samah Bay and Pileh Lagoon", "Relax on the sand at Maya Bay (made famous by the movie 'The Beach')"]
      },
      {
        day: 3,
        title: "Phuket Heritage & Big Buddha",
        activities: ["Visit the historic Phuket Old Town with Sino-Portuguese architecture", "Climb to the Big Buddha for panoramic views of Chalong Bay", "Tour Wat Chalong, Phuket's largest and most sacred temple"]
      },
      {
        day: 4,
        title: "Phang Nga Bay Kayaking",
        activities: ["Scenic boat cruise in Phang Nga Bay", "Canoe inside sea caves (hongs) and explore James Bond Island", "Seafood buffet served onboard the ship"]
      },
      {
        day: 5,
        title: "Thai Cooking Class & Spa",
        activities: ["Morning market trip and hands-on Thai culinary class", "Afternoon authentic Thai massage and herbal spa", "Farewell sunset dinner at a clifftop restaurant in Promthep Cape"]
      },
      {
        day: 6,
        title: "Departure",
        activities: ["Morning leisure at resort pool", "Transfer to Phuket International Airport for flight home"]
      }
    ],
    reviews: [
      {
        author: "Gordon Ramsay",
        rating: 4.6,
        text: "The street food is absolutely top class. Spicy, aromatic, and dirt cheap. The Phang Nga Bay trip was spectacular.",
        date: "December 12, 2025"
      },
      {
        author: "Leo DiCaprio",
        rating: 4.5,
        text: "Maya Bay is back to its natural glory. Swimming in the turquoise waters of Pileh Lagoon is a memory I will cherish.",
        date: "January 04, 2026"
      }
    ],
    weather: {
      season: "Tropical Dry Season",
      tempRange: "27°C - 33°C",
      info: "Hot and sunny days with clear blue skies and calm seas. Ideal for marine excursions, snorkeling, and sunbathing."
    }
  },
  {
    id: "7",
    title: "Banff National Park",
    location: "Canada",
    price: "medium",
    priceAmount: "$1,450",
    climate: "cold",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1553184118-d20774c4c197?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1553184118-d20774c4c197?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Immerse yourself in postcard-perfect glacial lakes, rugged peak views, and pine forests.",
    description: "Banff National Park is Canada's oldest national park, established in 1885. Located in the Rocky Mountains, Banff encompasses mountainous terrain, with numerous glaciers and ice fields, dense coniferous forest, and alpine landscapes. The park is famous for its bright turquoise lakes, abundant wildlife (grizzly bears, elk, bighorn sheep), and alpine resort town charm.",
    duration: "5 Days / 4 Nights",
    bestTimeToVisit: "June to September (Lakes Melted & Hiking) or December to April (Skiing)",
    activities: ["Lake Canoeing", "Wildlife Spotting", "Glacier Walking", "Mountain Gondola Rides"],
    highlights: [
      "Canoe on the vibrant turquoise waters of Lake Louise",
      "Gaze at the spectacular Valley of the Ten Peaks from Moraine Lake",
      "Take the Banff Gondola to the summit of Sulphur Mountain",
      "Drive the Icefields Parkway, one of the world's most scenic highways"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Calgary & Drive to Banff",
        activities: ["Pick up rental SUV at Calgary Airport and drive to Banff town", "Stroll through the alpine streets of Banff", "Dinner at a local craft brewery serving game meats"]
      },
      {
        day: 2,
        title: "Iconic Lake Louise & Moraine Lake",
        activities: ["Early morning visit to Moraine Lake to watch sunrise on the peaks", "Drive to Lake Louise for morning canoeing on turquoise waters", "Hike up to the historic Lake Agnes Tea House for tea and scones"]
      },
      {
        day: 3,
        title: "Icefields Parkway & Athabasca Glacier",
        activities: ["Full-day scenic drive on the Icefields Parkway", "Board the Ice Explorer all-terrain vehicle onto Athabasca Glacier", "Walk on the glass-floored Columbia Icefield Skywalk"]
      },
      {
        day: 4,
        title: "Banff Gondola & Hot Springs",
        activities: ["Ride the Banff Gondola up Sulphur Mountain for 360-degree Rocky Mountain views", "Soak in the warm mineral waters of Banff Upper Hot Springs", "Starlight dinner at Sky Bistro at the mountain summit"]
      },
      {
        day: 5,
        title: "Johnston Canyon Hike & Departure",
        activities: ["Morning hike along steel catwalks in Johnston Canyon to view waterfalls", "Transfer back to Calgary Airport for departure flight"]
      }
    ],
    reviews: [
      {
        author: "David Attenborough",
        rating: 5,
        text: "The Canadian Rockies possess an raw wilderness beauty that is hard to match. Spotting a grizzly bear from a safe distance was magnificent.",
        date: "July 24, 2025"
      },
      {
        author: "Alex Honnold",
        rating: 4.6,
        text: "Great trails, clean air, challenging hikes. Lake Moraine is one of the most stunning sights in North America.",
        date: "August 12, 2025"
      }
    ],
    weather: {
      season: "Alpine Summer",
      tempRange: "8°C - 22°C",
      info: "Warm, sunny mountain days, but temperatures can drop near freezing quickly at night or at high altitudes. Layers are highly recommended."
    }
  },
  {
    id: "8",
    title: "Dubai Skyline",
    location: "UAE",
    price: "high",
    priceAmount: "$3,200",
    climate: "arid",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168a?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Witness architectural wonders, luxury shopping, and thrilling desert dune bashing.",
    description: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with chorographed lights and music. On artificial islands just offshore is Atlantis, The Palm, a resort with water and marine-animal parks.",
    duration: "5 Days / 4 Nights",
    bestTimeToVisit: "November to March (Pleasant Warm Months)",
    activities: ["Desert Dune Bashing", "Burj Khalifa Viewing", "Luxury Shopping", "Yacht Cruise"],
    highlights: [
      "Ascend to the 148th floor of the Burj Khalifa, the world's tallest building",
      "Experience a 4x4 dune bashing adventure in the Dubai desert",
      "Stroll through the Gold and Spice Souks in Deira",
      "Watch the spectacular choreographed Dubai Fountain show"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Marina Dinner Cruise",
        activities: ["VIP airport pickup and luxury hotel transfer", "Check-in at hotel overlooking Palm Jumeirah", "5-star buffet dinner cruise along Dubai Marina on a traditional wooden dhow"]
      },
      {
        day: 2,
        title: "Burj Khalifa & Modern Dubai",
        activities: ["Visit Burj Khalifa 'At the Top SKY' observatory", "Shop at Dubai Mall, explore the giant indoor Aquarium", "Evening watching the Dubai Fountain show with synchronized light and music"]
      },
      {
        day: 3,
        title: "Desert Safari Adventure",
        activities: ["Morning at leisure or lounging by the infinity pool", "Afternoon 4x4 dune bashing in the desert", "Barbecue dinner, belly dancing, and camel riding at a desert camp"]
      },
      {
        day: 4,
        title: "Old Dubai & Yacht Cruise",
        activities: ["Cross Dubai Creek on a traditional Abra boat", "Explore the bustling Gold and Spice Souks", "Private 2-hour sunset yacht cruise around Palm Jumeirah and Burj Al Arab"]
      },
      {
        day: 5,
        title: "Departure",
        activities: ["Relax at the hotel spa", "Souvenir shopping at Souk Madinat Jumeirah", "Transfer to Dubai International Airport for departure flight"]
      }
    ],
    reviews: [
      {
        author: "Kylie Jenner",
        rating: 4.8,
        text: "The shopping is unmatched. The Burj Khalifa VIP experience was amazing, and the views are unreal. Everything is so luxurious.",
        date: "February 22, 2026"
      },
      {
        author: "Tom Cruise",
        rating: 4.9,
        text: "Dubai is always spectacular. Climbing... well, visiting the Burj Khalifa was great. The desert dune safari is high adrenaline.",
        date: "March 15, 2026"
      }
    ],
    weather: {
      season: "Warm Winter",
      tempRange: "18°C - 28°C",
      info: "Beautifully warm, sunny days with low humidity and cool evening breezes. Perfect for rooftop dining, pool days, and outdoor shopping."
    }
  }
];
