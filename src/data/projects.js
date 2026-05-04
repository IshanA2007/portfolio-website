export const PROJECTS = [
  {
    title: 'Clara',
    tagline: 'Game film for presentations — Clara breaks down your talk slide by slide.',
    slug: 'clara',
    year: 2026,
    techStack: ['Next.js', 'Python', 'Whisper', 'Snowflake Cortex'],
    liveUrl: 'https://clara-weld.vercel.app',
    sourceCode: 'https://github.com/IshanA2007/clara',
    description: `
      Game film, but for presentations. You upload your slides, record yourself talking through them, and Clara breaks down what actually happened slide by slide.<br/><br/>
      It runs Whisper for word-level transcription, maps each word back to the slide that was up at the time, and then runs two passes in parallel: a manual pass for things you can count (pace, fillers, pauses, repeats) and an LLM pass through Snowflake Cortex for the squishier stuff like hedging, false starts, and slide-reading. No scores, no "great job" — just where things happened and what to fix.
    `,
    role: `Built for HooHacks 2026 (Education track). I worked on the analytics pipeline and the results UI.`,
    images: [],
  },
  {
    title: 'HoosHungry',
    tagline: 'A nutrition-aware menu helper for UVA dining halls.',
    slug: 'hooshungry',
    year: 2026,
    techStack: ['Next.js', 'TypeScript', 'Python', 'FastAPI'],
    liveUrl: 'https://hooshungry.vercel.app',
    sourceCode: 'https://github.com/IshanA2007/hooshungry',
    description: `
      Eating decently in a UVA dining hall is harder than it sounds. HoosHungry pulls the dining hall menus, lets you set a few preferences, and helps you figure out what to actually grab.<br/><br/>
      The frontend is a Next.js app and the backend is a FastAPI service that handles the menu scraping and preference logic. Built it because I kept staring at the menu page trying to do macro math in my head.
    `,
    role: `Full stack. Wrote the scraper, the API, and the UI.`,
    images: [],
  },
  {
    title: 'Crosswizard',
    tagline: 'A recursive crossword solver tuned to fill nasty grids in milliseconds.',
    slug: 'crosswizard',
    year: 2025,
    techStack: ['Python', 'Backtracking', 'Constraint Solving'],
    liveUrl: '',
    sourceCode: 'https://github.com/IshanA2007/Crosswizard',
    description: `
      A recursive crossword-solving engine. You give it a partially filled grid and a word list, and it fills in the rest by backtracking with aggressive pruning.<br/><br/>
      The fun part was the optimization — even fairly nasty grids solve in milliseconds once you cut off bad branches early. It's not built to be a friendly UI, more a deep-dive into how far you can push a classic CSP algorithm.
    `,
    role: `Solo. Built the solver and spent most of the time tuning the pruning heuristics.`,
    images: [],
  },
  {
    title: 'GeneSIS',
    tagline: 'A privacy-first mobile gradebook for StudentVUE and Genesis portals.',
    slug: 'genesis',
    year: 2025,
    techStack: ['Flutter', 'Dart', 'GetX', 'StudentVUE API'],
    liveUrl: '',
    sourceCode: 'https://github.com/IshanA2007/GeneSIS',
    description: `
      A mobile gradebook that connects to StudentVUE and Genesis portals and gives students a much nicer view of their academic progress than the official sites do.<br/><br/>
      Dark theme, aqua-to-deep-blue grade scale, GPA computed for partial-year data, support for both rolling and standard gradebooks. Credentials live on-device only — I didn't want to be in the business of holding student passwords on a server.
    `,
    role: `Solo. Designed the UI in Figma and built the whole Flutter app.`,
    images: [
      'https://raw.githubusercontent.com/IshanA2007/GeneSIS/main/screenshots/dashboard.png',
      'https://raw.githubusercontent.com/IshanA2007/GeneSIS/main/screenshots/gradebook.png',
      'https://raw.githubusercontent.com/IshanA2007/GeneSIS/main/screenshots/feed.png',
    ],
  },
  {
    title: 'Munch.AI',
    tagline: 'Snap a recipe and get calorie, macro, and healthier-swap suggestions.',
    slug: 'munch-ai',
    year: 2024,
    techStack: ['Django', 'GPT-4 Vision', 'Nutritionix', 'OpenCV'],
    liveUrl: '',
    sourceCode: 'https://github.com/IshanA2007/munch.ai',
    description: `
      A nutrition web app: upload a recipe photo or punch in ingredients, and it gives you calorie and macro breakdowns plus healthier alternatives.<br/><br/>
      The backend is Django, the vision side runs through GPT-4 Vision, and nutrition data comes from Nutritionix. Built to make eating decently feel less like spreadsheet work.
    `,
    role: `Built the Django backend, wired up the vision and nutrition APIs, and helped on the UI.`,
    images: [
      'https://raw.githubusercontent.com/IshanA2007/munch.ai/main/homepage.jpg',
      'https://raw.githubusercontent.com/IshanA2007/munch.ai/main/ingredients.jpg',
    ],
  },
  {
    title: 'NavTJ',
    tagline: 'Turn-by-turn classroom navigation that ~1,000 high schoolers actually used.',
    slug: 'navtj',
    year: 2023,
    techStack: ['Flutter', 'Dart', 'C++', 'SQLite'],
    liveUrl: '',
    sourceCode: 'https://github.com/IshanA2007/NavTJ',
    description: `
      My old high school had three floors and confusing hallways, and freshmen would get lost trying to find their classes. A friend and I made this app to help.<br/><br/>
      It loads your schedule and gives you turn-by-turn directions between classes with dynamic rerouting and a hot/cold distance indicator. Works offline once you've opened it, which mattered because the building wifi was not great. Around a thousand students ended up using it.
    `,
    role: `Lead dev. Designed the map data, wrote the pathfinding, and shipped the iOS and Android builds.`,
    images: [],
  },
  {
    title: 'FaceID',
    tagline: 'A face-recognition network written from scratch in pure NumPy.',
    slug: 'faceid',
    year: 2023,
    techStack: ['Python', 'NumPy'],
    liveUrl: '',
    sourceCode: 'https://github.com/IshanA2007/FaceID',
    description: `
      A face recognition network written from scratch — no PyTorch, no TensorFlow, just NumPy. The point was to actually understand what the layers were doing instead of letting a framework hide it.<br/><br/>
      I generated my own training data, wrote the forward and backward passes by hand, and ended up with something that classifies faces in real time on a webcam. Accuracy is fine for a learning project; I wouldn't trust it to unlock anything.
    `,
    role: `Solo. Built the network, the training loop, and the live demo.`,
    images: [],
  },
];
