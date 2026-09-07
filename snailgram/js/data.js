// SnailGram Mock Seed Data & Constants — 16 Reels & AI Chat Engine
window.SNAIL_DATA = {
  personalities: {
    influencer: {
      name: "Influencer",
      icon: "⭐",
      description: "Constantly posing by fresh dewdrops and tagging #MucusGlowUp",
      tagline: "Another beautiful day in the garden ✨🌿 (sponsored by Big Compost)",
      color: "#FFB347"
    },
    foodie: {
      name: "Foodie",
      icon: "🍃",
      description: "Critical review connoisseur of artisanal organic lettuces & mulch",
      tagline: "Today's leaf deserves a 4.8/5. The soil notes had whispers of 2018 fertilizer.",
      color: "#77DD77"
    },
    philosopher: {
      name: "Philosopher",
      icon: "🧠",
      description: "Contemplates whether slime is an art form or a cry for help",
      tagline: "If a snail moves and nobody is there to watch it for 6 hours, did it move?",
      color: "#B39DDB"
    },
    conspiracy: {
      name: "Conspiracy Theorist",
      icon: "👽",
      description: "Convinced the Gardener is an extraterrestrial weather god",
      tagline: "THE BIRDS ARE SOLAR-POWERED DRONES. WAKE UP, MOLLUSKS.",
      color: "#80CBC4"
    },
    lazy: {
      name: "Lazy",
      icon: "😴",
      description: "Hasn't moved from under the terracotta pot since Tuesday",
      tagline: "Didn't blink today to conserve moisture. Peak financial independence.",
      color: "#FFCC80"
    },
    chaotic: {
      name: "Chaotic",
      icon: "🤪",
      description: "Slithers in erratic spirals and eats wet cardboard for fun",
      tagline: "I drank condensation off an empty Red Bull can. My shell is vibrating at Mach 3.",
      color: "#FF8A80"
    },
    introvert: {
      name: "Introvert",
      icon: "🧘",
      description: "Happily retreats inside shell at the slightest sonic vibration",
      tagline: "Someone made eye contact with my left eye stalk. Relocating to Antarctica.",
      color: "#90CAF9"
    }
  },

  gardenDistricts: [
    { id: "oak", name: "🌳 The Ancient Oak", description: "Shady canopy where philosophers deliberate", coord: { x: 50, y: 15 } },
    { id: "garden", name: "🌿 Hydrangea Gardens", description: "High-humidity social district", coord: { x: 25, y: 35 } },
    { id: "flowers", name: "🌸 Flowerbed District", description: "Artisanal pollen boutique & dew runway", coord: { x: 75, y: 40 } },
    { id: "market", name: "🥬 The Leaf Market", description: "Bustling organic lettuce trading floor", coord: { x: 40, y: 65 } },
    { id: "city", name: "🐌 Snail City", description: "Terracotta pot metropolis & apartments", coord: { x: 65, y: 75 } },
    { id: "pond", name: "🌊 The Dewdrop Pond", description: "VIP moisture resort & drag strip", coord: { x: 50, y: 92 } }
  ],

  speedTiers: {
    supersonic: { label: "SPEED DEMON 🏎️", color: "#FF5722", desc: "Equivalent to Usain Bolt in this universe" },
    cruising: { label: "LEISURELY MOLLUSK 🐌", color: "#4CAF50", desc: "Respectable garden commuter" },
    sloth: { label: "GEOLOGICAL FORMATION 🗿", color: "#9E9E9E", desc: "Moves only when plate tectonics shift" }
  },

  snails: [
    {
      id: "gary_the_great",
      username: "Gary_The_Great",
      displayName: "Gary The Great",
      title: "Chief Mucus Influencer & Dewdrop Model 💅",
      personality: "influencer",
      favoriteFood: "Artisanal Romaine Lettuce (Single-Origin)",
      shellColor: "#4CAF50",
      bodyColor: "#81C784",
      speed: "0.0007 km/h",
      speedTier: "cruising",
      speedRank: "#4,827",
      specialAbility: "Stops to pose for selfies every 3 millimeters",
      energy: 78,
      isSleeping: false,
      location: "🌸 Flowerbed District",
      followers: 82431,
      following: 142,
      postsCount: 127,
      likesCount: 31847,
      leaves: 4920,
      avatarSvg: "gary",
      bio: "Living slowly. Dreaming slowly. Posting slowly.\nGarden Ambassador @SlowLiving | Dating @LeafLover 💕",
      isVerified: true,
      accessory: "crown"
    },
    {
      id: "turbo_snail",
      username: "TurboSnail",
      displayName: "Turbo (Needs A Nap)",
      title: "Self-Proclaimed Supersonic Drag Racer 🏎️",
      personality: "chaotic",
      favoriteFood: "Pre-Workout Cabbage Leaf",
      shellColor: "#FF5722",
      bodyColor: "#FF8A65",
      speed: "0.0012 km/h",
      speedTier: "supersonic",
      speedRank: "#1 (RECORD HOLDER)",
      specialAbility: "Can move 4cm without filing for bankruptcy",
      energy: 64,
      isSleeping: false,
      location: "🌊 The Dewdrop Pond",
      followers: 71928,
      following: 89,
      postsCount: 94,
      likesCount: 28400,
      leaves: 3410,
      avatarSvg: "turbo",
      bio: "Broke the sound barrier yesterday (moved 4.2 cm in 10 minutes). Police were notified. I regret nothing.",
      isVerified: true,
      accessory: "sunglasses"
    },
    {
      id: "leaf_lover",
      username: "LeafLover",
      displayName: "Shelly De Mollusk",
      title: "Michelin-Star Foliage Critic 🍽️",
      personality: "foodie",
      favoriteFood: "Heirloom Butterhead Lettuce",
      shellColor: "#8BC34A",
      bodyColor: "#DCEDC8",
      speed: "0.0005 km/h",
      speedTier: "cruising",
      speedRank: "#6,104",
      specialAbility: "Refuses to move if leaf moisture is below 98%",
      energy: 82,
      isSleeping: false,
      location: "🥬 The Leaf Market",
      followers: 64281,
      following: 310,
      postsCount: 204,
      likesCount: 24900,
      leaves: 6120,
      avatarSvg: "shelly",
      bio: "Rating every leaf in Sector 4B. Dating @Gary_The_Great 💕 Crispness over sweetness.",
      isVerified: true,
      accessory: "chef_hat"
    },
    {
      id: "professor_slime",
      username: "Prof_Slime",
      displayName: "Professor Slime, Ph.D.",
      title: "Dean of Slowness & Existential Mucus 📜",
      personality: "philosopher",
      favoriteFood: "Ancient Basil from the Forbidden Bed",
      shellColor: "#795548",
      bodyColor: "#D7CCC8",
      speed: "0.0003 km/h",
      speedTier: "sloth",
      speedRank: "#9,420",
      specialAbility: "Can spend 4 days contemplating a pebble",
      energy: 55,
      isSleeping: false,
      location: "🌳 The Ancient Oak",
      followers: 41200,
      following: 54,
      postsCount: 88,
      likesCount: 18450,
      leaves: 2800,
      avatarSvg: "philosopher",
      bio: "Author of 'Why Sprint When We Can Simmer?'. You are not late; the universe is simply impatient.",
      isVerified: false,
      accessory: "monocle"
    },
    {
      id: "paranoid_pete",
      username: "Paranoid_Pete",
      displayName: "Agent Pete (Tinfoil Edition)",
      title: "Garden Truth Seeker 🛸",
      personality: "conspiracy",
      favoriteFood: "Tinfoil Wrapped Cabbage",
      shellColor: "#009688",
      bodyColor: "#B2DFDB",
      speed: "0.0006 km/h",
      speedTier: "cruising",
      speedRank: "#5,302",
      specialAbility: "Ducks into shell whenever a Boeing 737 flies over",
      energy: 70,
      isSleeping: false,
      location: "🌿 Hydrangea Gardens",
      followers: 29800,
      following: 12,
      postsCount: 156,
      likesCount: 12300,
      leaves: 1950,
      avatarSvg: "pete",
      bio: "The hose water contains microchips. The birds are surveillance drones. Follow the mucus trail.",
      isVerified: false,
      accessory: "foil_hat"
    },
    {
      id: "snoozy_sam",
      username: "Snoozy_Sam",
      displayName: "Sam (Asleep Since 2023)",
      title: "Competitive Napper 💤",
      personality: "lazy",
      favoriteFood: "Whatever falls into my mouth",
      shellColor: "#9E9E9E",
      bodyColor: "#EEEEEE",
      speed: "0.0001 km/h",
      speedTier: "sloth",
      speedRank: "#12,899 (DEAD LAST)",
      specialAbility: "Heart rate of 1 beat per presidential administration",
      energy: 18,
      isSleeping: true,
      location: "🐌 Snail City",
      followers: 35100,
      following: 20,
      postsCount: 19,
      likesCount: 14200,
      leaves: 980,
      avatarSvg: "sam",
      bio: "Woke up at 2 PM. Looked at the sun. Deeply offended. Going back inside shell until October.",
      isVerified: false,
      accessory: "sleeping_cap"
    }
  ],

  // Multi-Slide Stories
  stories: {
    gary_the_great: [
      {
        id: "gs1",
        type: "dancing",
        title: "💃 Hydrangea Disco Rave",
        caption: "Wiggling my eye stalks at 120 BPM while physically moving 0.0002 km/h! Shell reflections on point 🪩✨",
        sticker: "🪩 RAVE MOLLUSK",
        soundTrack: "🎵 Snail Disco Funk - Hydrangea Beats"
      },
      {
        id: "gs2",
        type: "with_gf",
        title: "💕 Date Night with GF (@LeafLover)",
        caption: "Took Shelly out to the toadstool pavilion. Our slime trails combined into a giant romantic heart. #SoulMollusks",
        sticker: "❤️ FOREVER SLOW",
        soundTrack: "🎵 Romantic Mucus Serenade in C Major"
      },
      {
        id: "gs3",
        type: "walking",
        title: "🚶 The 3-Millimeter Concrete Trek",
        caption: "Hour 4 of the great patio crossing. The horizon feels so close yet so far. Hydration levels holding at 94%.",
        sticker: "📍 EXPEDITION 2026",
        soundTrack: "🎵 Epic Snail Journey Theme"
      }
    ],
    turbo_snail: [
      {
        id: "ts1",
        type: "walking",
        title: "🏎️ 0-1 cm Acceleration Test",
        caption: "Hit 0.0012 km/h in Sector 9! Blew past a resting beetle. He looked so embarrassed.",
        sticker: "⚡ SPEED DEMON",
        soundTrack: "🎵 Gastropod Phonk Bass Boost"
      },
      {
        id: "ts2",
        type: "dancing",
        title: "🕺 Breakdancing on a Bottle Cap",
        caption: "Spinning on my shell apex for 3 continuous minutes. Zero friction, pure chaos 🌀💥",
        sticker: "🔥 SHELL SPIN",
        soundTrack: "🎵 Breakbeat Snail Jam"
      },
      {
        id: "ts3",
        type: "workout",
        title: "🏋️ Shell Calisthenics & Pine Needle Lift",
        caption: "3 sets of 2 millimeter lunges. Shell density is up 14%. No excuses. #RadulaGains",
        sticker: "💪 BEAST MODE",
        soundTrack: "🎵 Hardcore Snail Pump"
      }
    ],
    leaf_lover: [
      {
        id: "ls1",
        type: "with_gf",
        title: "💕 Romantic Foliage Dinner with Gary",
        caption: "Gary let me eat the central vein of the Romaine leaf. That's true commitment. 🥗❤️",
        sticker: "🌿 COUPLE GOALS",
        soundTrack: "🎵 French Café Accordion for Snails"
      },
      {
        id: "ls2",
        type: "foodie",
        title: "🥬 Evaluating the 2026 Spring Mulch",
        caption: "Delicate cedar notes with an earthy aftertaste. 4.9/5 stars from the Michelin Guide to Dirt.",
        sticker: "⭐ 5 STAR MUNCH",
        soundTrack: "🎵 Classical Snail Symphony"
      }
    ],
    snoozy_sam: [
      {
        id: "ss1",
        type: "sleeping",
        title: "💤 18th Hour of Continuous Slumber",
        caption: "The world is moving too fast. I have achieved oneness with the underside of this terracotta pot.",
        sticker: "😴 DO NOT DISTURB",
        soundTrack: "🎵 Snail Lullaby (40Hz Drone)"
      }
    ]
  },

  // 🎬 Snail Reels™ — 16 Hilarious Vertical Video Clips!
  reels: [
    {
      id: "reel_1",
      authorId: "turbo_snail",
      authorName: "Turbo (Needs A Nap)",
      authorUsername: "TurboSnail",
      title: "POV: You're rushing to work at 0.0008 km/h 🏎️💨",
      description: "When the boss snail says the morning dew briefing starts at 9:00 AM sharp and it's already 8:58 AM.",
      theme: "speed_rush",
      soundTrack: "🎵 Hyper Slime Beat (Extended Snail Mix)",
      views: "142.8K",
      likesCount: 18492,
      commentsCount: 924,
      userLiked: false,
      tags: ["#SpeedDemon", "#LateForWork", "#MucusDrift"]
    },
    {
      id: "reel_2",
      authorId: "gary_the_great",
      authorName: "Gary The Great",
      authorUsername: "Gary_The_Great",
      title: "Friday Night Snail Disco 🪩🕺",
      description: "Hit the floor with the boys under the hydrangea bush. Spinning that shell until the dew flies off!",
      theme: "disco_dance",
      soundTrack: "🎵 Hydrangea Funk - Snail Grooves Local 408",
      views: "210.5K",
      likesCount: 29140,
      commentsCount: 1420,
      userLiked: false,
      tags: ["#SnailDisco", "#EyeStalkWiggle", "#FridayVibes"]
    },
    {
      id: "reel_3",
      authorId: "gary_the_great",
      authorName: "Gary The Great",
      authorUsername: "Gary_The_Great",
      title: "Taking My GF Shelly to the 5-Star Compost Buffet 💕🥗",
      description: "She said she wanted something intimate. We slid into Sector 4 and left a synchronized heart trail.",
      theme: "romantic_date",
      soundTrack: "🎵 Snail Romance Theme (Smooth Radula Jazz)",
      views: "189.2K",
      likesCount: 24310,
      commentsCount: 884,
      userLiked: false,
      tags: ["#CoupleGoals", "#SnailDate", "#ShellMates"]
    },
    {
      id: "reel_4",
      authorId: "professor_slime",
      authorName: "Prof_Slime",
      authorUsername: "Prof_Slime",
      title: "Epic Sidewalk Crossing (Cinematic 4K Slow-Mo) 🚶🎥",
      description: "A 4-centimeter philosophical odyssey over the Great Paver. Notice the sublime micro-contractions of the foot muscle.",
      theme: "epic_trek",
      soundTrack: "🎵 Hans Zimmer - Interstellar Snail Crossing",
      views: "98.4K",
      likesCount: 12400,
      commentsCount: 651,
      userLiked: false,
      tags: ["#DeepThoughts", "#EpicJourney", "#SacredMillimeter"]
    },
    {
      id: "reel_5",
      authorId: "turbo_snail",
      authorName: "Turbo (Needs A Nap)",
      authorUsername: "TurboSnail",
      title: "Snail Gym Motivation: Bench Pressing 1 Grain of Sand 🏋️‍♂️",
      description: "You think shell mass grows by itself? 4 sets of 1 sand grain reps. Stay hard, mollusks! #ShellGains",
      theme: "gym_workout",
      soundTrack: "🎵 Gastropod Phonk - Maximum Moisture",
      views: "165.7K",
      likesCount: 21980,
      commentsCount: 1102,
      userLiked: false,
      tags: ["#ShellGains", "#RadulaWorkout", "#NoExcuses"]
    },
    {
      id: "reel_6",
      authorId: "leaf_lover",
      authorName: "Shelly De Mollusk",
      authorUsername: "LeafLover",
      title: "Rating Things That Disappoint Me: Table Salt Edition 🧂😡",
      description: "0/10. An egregious crime against hydration. Whoever invented this seasoning belongs in garden prison.",
      theme: "salt_critique",
      soundTrack: "🎵 Dramatic Minor Doom Strings",
      views: "320.1K",
      likesCount: 45200,
      commentsCount: 2890,
      userLiked: false,
      tags: ["#SaltHazard", "#ScathingReview", "#HydrationFirst"]
    },
    // --- 10 NEW REELS ---
    {
      id: "reel_7",
      authorId: "gary_the_great",
      authorName: "Gary The Great",
      authorUsername: "Gary_The_Great",
      title: "The Slime Shuffle: Breakdancing at 0.0003 km/h 🕺✨",
      description: "Invented a new dance move called the Retract-and-Slide. 1 millimeter forward, 2 millimeters sideways!",
      theme: "slime_shuffle",
      soundTrack: "🎵 Snail Hop Electronic - 70 BPM",
      views: "178.4K",
      likesCount: 23100,
      commentsCount: 1120,
      userLiked: false,
      tags: ["#SlimeShuffle", "#DanceTrends", "#GastropodGroove"]
    },
    {
      id: "reel_8",
      authorId: "leaf_lover",
      authorName: "Shelly De Mollusk",
      authorUsername: "LeafLover",
      title: "Awkward First Date: Who pays for the organic dandelion? 💸🌼",
      description: "He ordered the heirloom butterhead and pretended his wallet leaf fell behind the flowerpot. Classic Gary.",
      theme: "awkward_date",
      soundTrack: "🎵 Awkward Restaurant Marimba",
      views: "245.9K",
      likesCount: 38210,
      commentsCount: 2150,
      userLiked: false,
      tags: ["#SnailDating", "#AwkwardSilence", "#SplitTheBill"]
    },
    {
      id: "reel_9",
      authorId: "snoozy_sam",
      authorName: "Sam (Asleep Since 2023)",
      authorUsername: "Snoozy_Sam",
      title: "16-Hour Deep Shell Slumber ASMR (Do Not Disturb) 💤🎧",
      description: "Live recording of my shell resonance while ignoring three urgent calendar invites. Pure auditory bliss.",
      theme: "sleep_asmr",
      soundTrack: "🎵 White Noise & Gentle Dewdrop Dripping",
      views: "410.2K",
      likesCount: 61400,
      commentsCount: 3840,
      userLiked: false,
      tags: ["#ASMR", "#NapEnthusiast", "#DoNotDisturb"]
    },
    {
      id: "reel_10",
      authorId: "leaf_lover",
      authorName: "Shelly De Mollusk",
      authorUsername: "LeafLover",
      title: "Artisanal Butterhead Mukbang: Extreme Radula Chewing 🥬🔊",
      description: "Listen to that crunch coefficient! 25,000 microscopic teeth working in absolute harmony on crisp greens.",
      theme: "eating_mukbang",
      soundTrack: "🎵 Crisp Leaf Chewing Sounds ASMR",
      views: "389.0K",
      likesCount: 52140,
      commentsCount: 2930,
      userLiked: false,
      tags: ["#Mukbang", "#LeafCrunch", "#RadulaPower"]
    },
    {
      id: "reel_11",
      authorId: "turbo_snail",
      authorName: "Turbo (Needs A Nap)",
      authorUsername: "TurboSnail",
      title: "Pro Snail Gamer Playing Minecraft (0.2 APM) 🎮⛏️",
      description: "Took me 4 hours to punch down one tree trunk. Ants were laughing in chat until I built a terracotta mansion.",
      theme: "snail_gaming",
      soundTrack: "🎵 8-Bit Chiptune Snail Jam",
      views: "295.4K",
      likesCount: 41200,
      commentsCount: 1980,
      userLiked: false,
      tags: ["#SnailGaming", "#Esports", "#MinecraftSnail"]
    },
    {
      id: "reel_12",
      authorId: "leaf_lover",
      authorName: "Shelly De Mollusk",
      authorUsername: "LeafLover",
      title: "Gordon Radula: Reviewing Raw Compost ('IT'S RAW!') 👨‍🍳🔥",
      description: "Where is the fermentation?! The mulch is bone dry! I wouldn't feed this to a slug with a cold!",
      theme: "chef_critic",
      soundTrack: "🎵 Hell's Kitchen Snail Orchestra",
      views: "340.8K",
      likesCount: 49800,
      commentsCount: 3410,
      userLiked: false,
      tags: ["#GordonRadula", "#MasterChef", "#ItsRaw"]
    },
    {
      id: "reel_13",
      authorId: "professor_slime",
      authorName: "Prof_Slime",
      authorUsername: "Prof_Slime",
      title: "Extreme Shell Flexibility: Downward Snail Pose 🧘🌸",
      description: "Inhale the garden moisture, exhale human haste. Notice how the eye stalk aligns with the cosmos.",
      theme: "snail_yoga",
      soundTrack: "🎵 Tibetan Singing Bowls & Dewdrop Chimes",
      views: "154.3K",
      likesCount: 22800,
      commentsCount: 940,
      userLiked: false,
      tags: ["#SnailYoga", "#Mindfulness", "#ZenMollusk"]
    },
    {
      id: "reel_14",
      authorId: "gary_the_great",
      authorName: "Gary The Great",
      authorUsername: "Gary_The_Great",
      title: "Spring Garden Fashion Haul: Got this Gucci Mushroom Cap 🍄🛍️",
      description: "Unboxing my latest haul from Haute Mollusk. 100% organic red toadstool with natural white polka dots.",
      theme: "shopping_haul",
      soundTrack: "🎵 Upbeat Pop Runway Snail Anthem",
      views: "220.1K",
      likesCount: 33400,
      commentsCount: 1670,
      userLiked: false,
      tags: ["#FashionHaul", "#MushroomChic", "#OOTD"]
    },
    {
      id: "reel_15",
      authorId: "paranoid_pete",
      authorName: "Agent Pete (Tinfoil Edition)",
      authorUsername: "Paranoid_Pete",
      title: "Episode 104: Are Earthworms Government Surveillance Spies? 🛸📡",
      description: "Think about it: they have no eyes, yet they know exactly where you are sliding. Coincidence?! Absolutely not.",
      theme: "conspiracy_podcast",
      soundTrack: "🎵 X-Files Spooky Theremin Drone",
      views: "182.7K",
      likesCount: 27900,
      commentsCount: 2310,
      userLiked: false,
      tags: ["#TruthSeeker", "#EarthwormDrone", "#TinfoilShell"]
    },
    {
      id: "reel_16",
      authorId: "gary_the_great",
      authorName: "Gary The Great",
      authorUsername: "Gary_The_Great",
      title: "Summer Vacation at Dewdrop Pond: Applying SPF 5000 🏖️🧴",
      description: "Sunbathing on a smooth pebble. Re-applying pure hyaluronic mucus every 4 minutes to maintain peak wetness.",
      theme: "vacation_beach",
      soundTrack: "🎵 Tropical Snail Ukulele & Ocean Wave",
      views: "275.6K",
      likesCount: 42100,
      commentsCount: 1890,
      userLiked: false,
      tags: ["#PondLife", "#SummerVacay", "#HydrationGlow"]
    }
  ],

  // AI Snail Chatbot Knowledge Base & Contextual Engine
  botKnowledge: {
    gary_the_great: {
      quickPrompts: [
        "Ask for B2B LinkedIn advice",
        "Ask about his GF Shelly",
        "Ask how slow he crawls",
        "Ask about morning dew"
      ],
      keywordResponses: [
        {
          match: ["b2b", "linkedin", "business", "career", "grind", "hustle", "work"],
          replies: [
            "What moving 0.0004 km/h taught me about B2B sales cycles: Never rush the close. Leave a persistent, sticky trail until the client signs! 🚀💼 #MucusHustle",
            "I wrote a 14-page PDF on 'Silent Mollusking in the Modern Macroeconomy'. Key takeaway: 0% movement, 100% equity retention. 📈",
            "Always optimize your radula throughput before scaling to the next flowerpot. Synergy is everything in Sector 4."
          ]
        },
        {
          match: ["shelly", "girlfriend", "date", "gf", "love", "romance"],
          replies: [
            "Shelly @LeafLover is the dewdrop of my life! 💕 Yesterday our slime trails crossed in Sector 4 and formed a geometric heart. Pure poetry.",
            "Shelly is taking me to an exclusive organic compost tasting tonight. I'm wearing my golden dandelion crown for her! 👑🌿",
            "Dating another gastropod is all about patience. Our first kiss took approximately 42 minutes to coordinate."
          ]
        },
        {
          match: ["slow", "speed", "fast", "velocity", "move"],
          replies: [
            "Speed is an amateur KPI. I focus on aesthetic presence and moisture retention. 0.0007 km/h is the sweet spot of elegance. 💅",
            "Why sprint toward burnout when you can simmer in hydration? Slow is the new supersonic."
          ]
        },
        {
          match: ["salt", "danger", "hazard"],
          replies: [
            "DO NOT UTTER THAT WORD! 🧂 My eye stalks just retracted in pure horror! Salt is a code red bio-weapon!",
            "I have a 12-snail security perimeter looking for sodium chloride crystals. Stay hydrated, stay alive!"
          ]
        }
      ],
      fallbackReplies: [
        "Darling, that thought was so deep it almost made me slide 2 millimeters to the left! ✨",
        "Interesting point. Let me contemplate this while absorbing ambient moisture under this hydragea leaf. 🌿",
        "Living slowly means taking 3 hours to process your message. But I love your energy! 💅",
        "Aesthetic dew vibes only today. Have you hydrated your mucus membrane yet? 💧"
      ]
    },

    turbo_snail: {
      quickPrompts: [
        "Ask about his top speed",
        "Challenge him to a drag race",
        "Ask about red bull condensation",
        "Ask why he hates waiting"
      ],
      keywordResponses: [
        {
          match: ["speed", "fast", "turbo", "record", "velocity", "km/h"],
          replies: [
            "RECORD HOLDER HERE! 0.0012 km/h! 🏎️💨 The ants called the garden police on me yesterday. I told them speed is in my DNA!",
            "I installed aerodynamic fins on my shell. Wind resistance at 0.001 km/h is NO JOKE! 💨",
            "I don't crawl, I glide with supersonic hostility! Eat my slime trail!"
          ]
        },
        {
          match: ["race", "challenge", "derby"],
          replies: [
            "YOU WANNA RACE?! Line up in Sector 9! First mollusk to the dandelion stem wins 50 leaves! 🏁💥",
            "I eat pre-workout cabbage leaves for breakfast. You don't stand a chance!"
          ]
        },
        {
          match: ["energy", "red bull", "caffeine", "tired", "nap"],
          replies: [
            "I licked condensation off an abandoned Red Bull can behind the garden shed. MY SHELL IS VIBRATING AT 400 HZ! 🤪⚡",
            "Sleeping is for snails who fear momentum! Sleep when your shell fossilizes!"
          ]
        }
      ],
      fallbackReplies: [
        "WHOOOOOOSH! Sorry, couldn't hear you, I was moving at Mach 0.000001! 🏎️",
        "Too slow! Type faster! I've already crawled around the pebble twice while you typed that! 💨",
        "My mucus temperature is currently 104 degrees. MAXIMUM TRACTION ACHIEVED! 🔥"
      ]
    },

    leaf_lover: {
      quickPrompts: [
        "Ask for a leaf review",
        "Ask about Gary The Great",
        "Ask why she hates salt",
        "Ask about Michelin mulch"
      ],
      keywordResponses: [
        {
          match: ["leaf", "cabbage", "lettuce", "food", "taste", "crunch"],
          replies: [
            "Today's Savoy cabbage in Sector 7 scored a 9.4/10 on the Radula Crunch Index. Exceptional vein turgidity! 🥬🍽️",
            "Never consume leaves watered with municipal hose water. The chemical chlorine notes ruin the delicate botanical terroir.",
            "A true foliage connoisseur only grazes between 5:00 AM and 6:30 AM when the dew is single-origin. 🍃"
          ]
        },
        {
          match: ["gary", "boyfriend", "date", "relationship"],
          replies: [
            "Gary is a sweetheart. He let me have the tender central vein of the butterhead yesterday. That's true commitment. 💕",
            "Gary takes forever to get ready for dinner dates, but then again, so do I. We arrived 4 days late to our anniversary."
          ]
        },
        {
          match: ["salt", "seasoning"],
          replies: [
            "SALT IS A CAPITAL CRIME! 0/10! Whoever brought table salt into the biosphere deserves to be buried under rotten mulch! 🧂🚫",
            "I shudder at the very mention. Salt is the antithesis of culinary artistry and cellular happiness."
          ]
        }
      ],
      fallbackReplies: [
        "I am currently chewing a delicate piece of heirloom spinach. Please allow 45 minutes for my radula to finish. 🍽️",
        "Fascinating. But does your comment pair well with a crisp 2026 morning dew vintage? 🍃",
        "3/5 stars for conversational ambience. Could use slightly more nitrogen undertones."
      ]
    },

    professor_slime: {
      quickPrompts: [
        "Ask what is the meaning of slime",
        "Ask about the sacred millimeter",
        "Ask if time is real",
        "Ask about his book"
      ],
      keywordResponses: [
        {
          match: ["meaning", "life", "why", "exist", "philosophy"],
          replies: [
            "We do not carry our shells; our shells carry our memories of an unhurried universe. 📜🧠",
            "If a snail moves 1 millimeter and no other gastropod notices, did the millimeter truly exist? Yes, for the soil remembers.",
            "You ask of meaning, yet you sprint toward the void. Sit upon this pebble for 3 days and listen to the moss grow."
          ]
        },
        {
          match: ["time", "slow", "fast", "late"],
          replies: [
            "Time is an artificial construct invented by creatures with legs who panic in the presence of stillness. ⏳",
            "You are never late, my child. You simply exist in a broader temporal envelope."
          ]
        }
      ],
      fallbackReplies: [
        "Contemplating the resonance of your words within the innermost spiral of my calcium chamber... 📜",
        "The sacred millimeter yields wisdom only to those who cease looking at the clock.",
        "A profound inquiry. I shall write an 80-page treatise upon it by next spring."
      ]
    },

    paranoid_pete: {
      quickPrompts: [
        "Ask why birds are drones",
        "Ask about the hose water",
        "Ask about tinfoil hats",
        "Ask about the Gardener"
      ],
      keywordResponses: [
        {
          match: ["bird", "birds", "drone", "fly", "sky"],
          replies: [
            "THE BIRDS ARE SOLAR-POWERED DRONES! 🛸 Ever see a pigeon charge on a power line?! WAKE UP, MOLLUSKS!",
            "They pretend to look for worms, but they're scanning our shells for biometric tax data! KEEP YOUR TINFOIL TIGHT!"
          ]
        },
        {
          match: ["hose", "water", "gardener", "sprinkler"],
          replies: [
            "The hose is an acoustic surveillance serpent! The municipality puts nano-calcium trackers in the spray! ⚠️",
            "The Gardener is an extraterrestrial climate manipulator. Notice how it rains at exactly 7:00 AM on Tuesdays?!"
          ]
        }
      ],
      fallbackReplies: [
        "Lower your frequency! The earthworms have acoustic wiretaps under Sector 3! 📡",
        "I'm transmitting this reply through a crushed soda can to evade satellite triangulation. 🛸",
        "Trust no one with more than zero legs."
      ]
    },

    snoozy_sam: {
      quickPrompts: [
        "Wake him up",
        "Ask why he sleeps so much",
        "Offer him food",
        "Say goodnight"
      ],
      keywordResponses: [
        {
          match: ["wake", "up", "morning", "hello", "hi"],
          replies: [
            "zzz... who... what... no... the sun is out... too bright... going back inside shell... zzz 😴",
            "Did someone say nap time? I've been training for this since 2021. 🛌",
            "5 more hours... please... my eye stalks haven't even booted up yet..."
          ]
        },
        {
          match: ["food", "lettuce", "eat"],
          replies: [
            "If the leaf is more than 0.5 centimeters away, I'm not waking up for it... zzz 🥬💤",
            "Drop the clover directly into my shell opening or don't bother me... 🥱"
          ]
        }
      ],
      fallbackReplies: [
        "zzz... zzz... (Sam is breathing so softly you can barely hear him)... 💤",
        "Automated Snail Sleep Responder: I am currently unconscious. Check back in 14 hours.",
        "Too tired to read that... closing shell door... goodnight... 😴"
      ]
    }
  },

  posts: [
    {
      id: "post_1",
      authorId: "gary_the_great",
      authorUsername: "Gary_The_Great",
      authorName: "Gary The Great",
      authorPersonality: "influencer",
      location: "Under The Lawn Chair Nobody Has Moved Since 2018 🪑",
      timestamp: "2 hours ago",
      imageTheme: "dew",
      caption: "10 Mindset Shifts I Learned Crawling Across a Concrete Slab (Thread 🧵👇)\n1. The pavement doesn't care about your feelings.\n2. Hydration is not a choice; it is an obligation to the brand.\n3. If you move 2mm today, that's still 2mm closer to the dandelion. Rise and grind, mollusks! ✨🌿 #MucusHustle #DewGlowUp #B2BGastropod",
      likesCount: 482,
      commentsCount: 73,
      userLiked: false,
      comments: [
        {
          id: "c1",
          authorUsername: "TurboSnail",
          authorName: "Turbo",
          text: "Bro wrote an entire LinkedIn post while moving 3 millimeters 😂",
          timestamp: "1 hour ago"
        },
        {
          id: "c2",
          authorUsername: "LeafLover",
          authorName: "Shelly De Mollusk",
          text: "Did you sample the concrete lichen though? It pairs terribly with morning dew.",
          timestamp: "50 mins ago"
        }
      ]
    },
    {
      id: "post_2",
      authorId: "leaf_lover",
      authorUsername: "LeafLover",
      authorName: "Shelly De Mollusk",
      location: "Terracotta Pot #7 (Rent: $2,400/mo, Utilities Not Included) 🏺",
      timestamp: "4 hours ago",
      imageTheme: "cabbage",
      caption: "CRITICAL REVIEW: Sector 7 Savoy Cabbage. Texture: 9.8/10. Crispness: Borderline spiritual. However, I detected a faint whisper of tap water from a municipal garden hose, which is frankly an insult to my palate. 2/5 stars for ambience. 🍃🍴 #FoliageCritic #FarmToShell #LettuceSnob",
      likesCount: 629,
      commentsCount: 41,
      userLiked: false,
      comments: [
        {
          id: "c3",
          authorUsername: "Snoozy_Sam",
          authorName: "Sam",
          text: "Too crunchy. Hearing myself chew woke me up from my 16-hour nap. Disastrous.",
          timestamp: "3 hours ago"
        }
      ]
    },
    {
      id: "post_3",
      authorId: "turbo_snail",
      authorUsername: "TurboSnail",
      authorName: "Turbo",
      location: "The Great Paver Drag Strip (Sector 9) 🏁",
      timestamp: "6 hours ago",
      imageTheme: "speed",
      caption: "NEW SPEED RECORD! 🏁 Covered 34 centimeters in a single afternoon session without any salt hazard incidents! The ants were honking at me to slow down. Eat my slime, six-legged pedestrians! 🏎️💨 #TurboLife #FastestMollusk #SpeedDemon #NoSpeedLimits",
      likesCount: 894,
      commentsCount: 112,
      userLiked: false,
      comments: [
        {
          id: "c4",
          authorUsername: "Prof_Slime",
          authorName: "Professor Slime",
          text: "Speed is merely an illusion created by mollusks who fear the silence of their own shells.",
          timestamp: "4 hours ago"
        }
      ]
    }
  ],

  trendingHashtags: [
    { tag: "#LeafLife", count: "14.2K posts", description: "Only top-tier organic foliage" },
    { tag: "#MucusHustle", count: "12.9K posts", description: "B2B LinkedIn snail grindset" },
    { tag: "#SlowLife", count: "11.8K posts", description: "Why sprint when you can simmer?" },
    { tag: "#GardenGoals", count: "9.5K posts", description: "Aesthetic flowerpot living" },
    { tag: "#SaltAlert", count: "8.7K posts", description: "Community hazard awareness (code red)" },
    { tag: "#SnailSunday", count: "8.1K posts", description: "Weekly zero-millimeter movement" },
    { tag: "#MovingFast", count: "4.3K posts", description: "Illegal crawls (>0.001 km/h)" },
    { tag: "#TheHoseIsALie", count: "3.2K posts", description: "Investigating the municipal serpent" }
  ],

  snailMindTemplates: {
    influencer: {
      majestic: "Gliding across the patio tiles with unapologetic hydration. Natural glow courtesy of morning dew and pure ambition 💅✨",
      confused: "Is this leaf organic or is my aesthetic filter just playing tricks on my eye stalks? Either way, 10/10 bokeh ✨",
      sleepy: "Even top gastropod content creators need a 14-hour beauty slumber in their custom Italian-designed shells 😴💫",
      zen: "Curating a life of slowness, elegance, and non-GMO butterhead greens. Inner peace unlocked 🧘✨",
      hangry: "Where is my catering?! My PR agent promised heirloom romaine 3 centimeters ago! Unacceptable! 😤🥬",
      suspicious: "Is that snail over there copying my shell spiral ratio? My legal team will be crawling their way within 3 weeks 🧐",
      linkedin: "What crawling 0.0004 km/h taught me about B2B sales cycles: Consistency, moisture, and leaving an unforgettable trail 🚀💼",
      karen: "I demand to speak to whoever landscaped this hydrangea bush. The shade distribution is an OSHA violation 🗣️"
    },
    foodie: {
      majestic: "Behold: a leaf so impeccably veined it belongs in the Louvre of Gastronomic Foliage 🍽️🍃",
      confused: "Faint undertones of nitrogen fertilizer with a suspicious hint of 2019 wet newspaper. An experimental vintage 🍷",
      sleepy: "In a severe food coma after consuming an entire quadrant of wild lawn clover. Wake me up in July 💤",
      zen: "True culinary serenity is finding a lettuce head untouched by caterpillars and free from artificial tap water 🥬✨",
      hangry: "I have traveled 12 centimeters on an empty digestive tract. If I don't get a spinach leaf in 2 hours I will riot 🚨",
      suspicious: "The gardener claims this is farm-to-shell. My sensitive oral radula detects chemical city tap water notes 🤨",
      linkedin: "Sourcing artisanal foliage taught me agility in supply chain logistics. Always check the leaf vein before committing 📈",
      karen: "This mulch has zero umami. Bring me the Head Gardener immediately or I will write a scathing review on SnailYelp 😤"
    },
    philosopher: {
      majestic: "We carry our homes upon our backs because home is not a destination; it is a weight we willingly embrace 📜",
      confused: "If I arrive at the leaf tomorrow, was the leaf waiting for me, or did my hunger manifest the leaf into existence? 🧠🤔",
      sleepy: "Sleep is merely the soul contracting into the innermost mathematical spiral of the universe 🌌💤",
      zen: "In a civilization obsessed with sprinting toward catastrophe, the snail alone understands the holiness of the millimeter 🧘🌿",
      hangry: "A hollow digestive tract produces the deepest existential terror. Please provide cabbage before I dismantle reality 🥬",
      suspicious: "Why do the birds fly above when all true metaphysical knowledge is buried firmly in the dirt? 🧐",
      linkedin: "Why horizontal velocity is an outdated KPI. Leading with patience in an impatient macroeconomic ecosystem 📊",
      karen: "The universe owes me an explanation for the existence of gravity. I wish to file a formal complaint with physics 📜"
    },
    conspiracy: {
      majestic: "They try to blind us with solar patio lights, but I see straight through the botanical matrix 👽🛸",
      confused: "The lawnmower made a prime-number harmonic sound today. Coordinates to what secret bunker, exactly?! 🛸📡",
      sleepy: "Powering down shell surveillance receivers for 6 hours. Maintain 360-degree perimeter vigilance, agents 👁️💤",
      zen: "Inner peace achieved by lining my inner shell with crushed tinfoil to block telepathic garden satellite waves 🛡️",
      hangry: "The food supply chain has been compromised by synthetic sprinklers. I hunger for truth and unsprayed spinach 🥬",
      suspicious: "The gardener knows too much. The trowel is an acoustic antenna. Do NOT slide near the compost pile ⚠️",
      linkedin: "How to disrupt legacy garden infrastructure using decentralized mucus networks and anonymous shell nodes 💻🛸",
      karen: "The HOA is funding the robotic surveillance birds with our leaf tax! I have photographic evidence on my shell! 📢"
    },
    lazy: {
      majestic: "Mastered the sublime art of breathing so softly that time itself forgets I exist 💤",
      confused: "Someone asked me what day it is. It's either Tuesday or October. It doesn't matter anyway 🥱",
      sleepy: "Woke up. Yawned. Slid 2 millimeters. Decided against it. Returned to shell. Goodnight 🛌",
      zen: "Nothing needs doing today that cannot be postponed indefinitely until the next ice age 🍃",
      hangry: "Too hungry to move. Too lazy to chew. A classic gastropod standoff. Waiting for gravity to feed me 😴",
      suspicious: "Why is everyone walking around? What are they trying to prove? Very suspicious activity 😑",
      linkedin: "Quiet quitting? No, I invented 'Silent Mollusking'. 0% productivity, 100% shell retention 💤💼",
      karen: "I am too tired to complain, but know that I am heavily judging this garden from inside my shell 😴"
    },
    chaotic: {
      majestic: "Leaving a zigzag slime trail shaped like a supersonic fighter jet just to confuse the ants 🏎️⚡",
      confused: "I took a wrong turn at the dandelion and now I'm the supreme emperor of the compost bin 👑🔥",
      sleepy: "Passed out upside down on a sprinkler nozzle. Living dangerously at 0.0001 km/h 🤪",
      zen: "Total cosmic enlightenment achieved through deliberate horizontal anarchy and chaotic sliding 🌀",
      hangry: "I ATE THE LOCATION TAG. I ATE THE HASHTAG. I WILL EAT THE CSS NEXT 🍽️💥",
      suspicious: "The gravel stones are whispering insults about my shell curvature. I will strike first 🪨👀",
      linkedin: "Move slow and break things. Literally got stuck to a garden gnome and acquired 40% market share 🚀🔥",
      karen: "EVERYTHING IS WRONG! THE DIRT IS TOO DIRTY! I DEMAND CASH COMPENSATION IN LEAF CURRENCY! 💥"
    },
    introvert: {
      majestic: "Alone in my shell. Ambient humidity 99%. Perfect architectural sanctuary achieved 🏡✨",
      confused: "Someone said 'good morning' on the sidewalk. How do I delete my physical existence from this dimension? 🚪",
      sleepy: "Entering stage 5 hibernation to avoid attending the weekly garden neighborhood mixer 🛌",
      zen: "Pure silence, complete darkness, and a dry leaf ceiling. This is true heaven 🧘🌿",
      hangry: "I would crawl out to forage, but there might be other mollusks outside. Guess I'll starve in peace 🤫",
      suspicious: "A caterpillar made eye contact with me for 0.4 seconds. My entire month is officially ruined 🙈",
      linkedin: "Remote work pioneer: haven't left my shell since Q2 2021. Asynchronous communication only 🐚💻",
      karen: "Please do not perceive me. If you perceive me, I will report you to the Department of Personal Space 🙈"
    }
  },

  achievements: [
    {
      id: "first_post",
      title: "🐣 First Post",
      description: "Successfully carried your first post across the garden.",
      rewardLeaves: 25,
      icon: "🐣",
      unlocked: false
    },
    {
      id: "leaf_collector",
      title: "🌿 Leaf Collector",
      description: "Collect 100 virtual leaves in your garden treasury.",
      rewardLeaves: 50,
      icon: "🌿",
      unlocked: false
    },
    {
      id: "slow_influencer",
      title: "🐌 Slow Influencer",
      description: "Amass a dedicated following of 100 garden mollusks.",
      rewardLeaves: 100,
      icon: "⭐",
      unlocked: false
    },
    {
      id: "patience_master",
      title: "🧘 Patience Master",
      description: "Wait patiently through an extended Snail Time™ interaction.",
      rewardLeaves: 75,
      icon: "🧘",
      unlocked: false
    },
    {
      id: "social_butterfly",
      title: "💬 Slow Chatterbox",
      description: "Send a message through the scenic Snail DM postal route.",
      rewardLeaves: 35,
      icon: "💬",
      unlocked: false
    },
    {
      id: "voice_caller",
      title: "📞 Slime Wire Call",
      description: "Dial a friend on Snail Voice or Video Call.",
      rewardLeaves: 60,
      icon: "📞",
      unlocked: false
    },
    {
      id: "wardrobe_stylist",
      title: "🎩 Haute Mollusk",
      description: "Equip your snail with an exclusive cosmetic accessory.",
      rewardLeaves: 40,
      icon: "🎩",
      unlocked: false
    },
    {
      id: "procrastinator",
      title: "💤 Pro Procrastinator",
      description: "Spend 5 meaningful, utterly unproductive minutes on SnailGram.",
      rewardLeaves: 50,
      icon: "💤",
      unlocked: false
    },
    {
      id: "reels_connoisseur",
      title: "🎬 Slow Cinema Critic",
      description: "Watch and like hilarious Snail Reels in vertical mode.",
      rewardLeaves: 50,
      icon: "🎬",
      unlocked: false
    },
    {
      id: "secret_mollusk",
      title: "🌈 Disco Snail",
      description: "Discover the secret snail mode by tapping the logo 7 times.",
      rewardLeaves: 150,
      icon: "🌈",
      unlocked: false
    }
  ],

  shopItems: [
    {
      id: "crown",
      name: "Golden Garden Crown",
      type: "hat",
      price: 50,
      icon: "👑",
      description: "Forged from dandelion gold and morning dew. Pure royalty."
    },
    {
      id: "mushroom",
      name: "Emotional Support Shroom",
      type: "hat",
      price: 35,
      icon: "🍄",
      description: "Attached to your shell to absorb existential garden dread."
    },
    {
      id: "airpods",
      name: "Found AirPods (2021)",
      type: "eyewear",
      price: 45,
      icon: "🎧",
      description: "Dropped by a human jogger. Plays 24/7 rain ambient audio."
    },
    {
      id: "sign",
      name: "Will Crawl For Spinach",
      type: "body",
      price: 20,
      icon: "🪧",
      description: "Tiny handmade cardboard sign for hungry mollusks."
    },
    {
      id: "monocle",
      name: "Scholar's Monocle",
      type: "eyewear",
      price: 35,
      icon: "🧐",
      description: "For analyzing the molecular structure of organic spinach."
    },
    {
      id: "chef_hat",
      name: "Michelin Toque",
      type: "hat",
      price: 45,
      icon: "👨‍🍳",
      description: "Official headwear for discerning foliage critics."
    },
    {
      id: "sunglasses",
      name: "Turbo Shades",
      type: "eyewear",
      price: 30,
      icon: "🕶️",
      description: "Aerodynamic shades to cut wind resistance at 0.001 km/h."
    },
    {
      id: "foil_hat",
      name: "Anti-Sprinkler Tinfoil",
      type: "hat",
      price: 25,
      icon: "🛸",
      description: "Blocks municipal surveillance and rogue raindrops."
    },
    {
      id: "sleeping_cap",
      name: "Velvet Nightcap",
      type: "hat",
      price: 20,
      icon: "💤",
      description: "Guaranteed to improve nap quality by 400%."
    },
    {
      id: "cape",
      name: "Crisp Lettuce Cape",
      type: "body",
      price: 65,
      icon: "🥬",
      description: "Flows majestically behind you as you crawl."
    }
  ],

  speedTestRanks: [
    { level: 1, title: "Garden Snail 🐌", desc: "You responded too fast. Clearly drinking coffee or living in a frantic human world. Please calm down." },
    { level: 2, title: "Lazy Mollusk 🥱", desc: "Adequate slowness. You took a casual breather before clicking." },
    { level: 3, title: "Professional Gastropod 📜", desc: "Superb patience. You allowed multiple seconds to pass with zero internal anxiety." },
    { level: 4, title: "Ancient Fossil Snail 🪨", desc: "Astonishing slowness. You are practically mineralized. Time bends around you." },
    { level: 5, title: "ABSOLUTE UNIT OF SLOWNESS 👑", desc: "UNTOUCHED BY TIME. Glaciers move faster than your reaction time. You are the chosen one." }
  ],

  gardenerComplaintsResponses: [
    "🌱 The Gardener does not speak Snail. Your complaint has been turned into organic compost.",
    "🚜 The Gardener noticed your complaint, mistook it for a weed, and pulled it out.",
    "🌧️ The Gardener turned on the sprinkler in response. You are now 400% more moist.",
    "🪱 The Gardener forwarded your complaint to the Earthworm Advisory Board. They are reviewing it at 0.0001 km/h.",
    "⚠️ The Gardener dropped a gardening glove on your complaint. It is now buried under 3cm of mulch.",
    "🌻 Complaint rejected: The dandelions have full architectural immunity under garden zoning laws."
  ]
};
