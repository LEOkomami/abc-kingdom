// ABC Kingdom - Alphabet content data.
// For every letter: `items` = emoji + English word. Levels 1, 2 and 3 all draw
// from `items` (Level 2 shows the word and flips to reveal the emoji, so each
// word needs a picture). `words` is an extra plain-word list, currently unused
// by the game but kept (and validated) for future word-only content.
// INVARIANT: every item word and every word MUST start with its letter (validated below at load time).
const LETTERS_DATA = {
    A: {
        items: [
            { e: "🍎", w: "Apple" },
            { e: "✈️", w: "Airplane" },
            { e: "🐜", w: "Ant" },
            { e: "🐊", w: "Alligator" },
            { e: "⚓", w: "Anchor" },
            { e: "👽", w: "Alien" },
            { e: "🥑", w: "Avocado" },
        ],
        words: ["Apple", "Ant", "Arm", "Air", "Acorn", "Arrow", "Animal", "Apron"],
    },
    B: {
        items: [
            { e: "🍌", w: "Banana" },
            { e: "🐻", w: "Bear" },
            { e: "⚽", w: "Ball" },
            { e: "🦋", w: "Butterfly" },
            { e: "🚌", w: "Bus" },
            { e: "🐝", w: "Bee" },
            { e: "📚", w: "Books" },
        ],
        words: ["Banana", "Bear", "Ball", "Bed", "Bird", "Boat", "Box", "Bug"],
    },
    C: {
        items: [
            { e: "🐱", w: "Cat" },
            { e: "🚗", w: "Car" },
            { e: "🎂", w: "Cake" },
            { e: "🐄", w: "Cow" },
            { e: "👑", w: "Crown" },
            { e: "🥕", w: "Carrot" },
            { e: "🤡", w: "Clown" },
        ],
        words: ["Cat", "Car", "Cake", "Cow", "Cup", "Corn", "Coat", "Cloud"],
    },
    D: {
        items: [
            { e: "🐶", w: "Dog" },
            { e: "🦆", w: "Duck" },
            { e: "🐬", w: "Dolphin" },
            { e: "🥁", w: "Drum" },
            { e: "🦖", w: "Dinosaur" },
            { e: "🚪", w: "Door" },
            { e: "🍩", w: "Donut" },
        ],
        words: ["Dog", "Duck", "Door", "Doll", "Drum", "Dish", "Dance", "Day"],
    },
    E: {
        items: [
            { e: "🐘", w: "Elephant" },
            { e: "🥚", w: "Egg" },
            { e: "🦅", w: "Eagle" },
            { e: "👂", w: "Ear" },
            { e: "🌍", w: "Earth" },
            { e: "✉️", w: "Envelope" },
            { e: "👁️", w: "Eye" },
        ],
        words: ["Egg", "Ear", "Eye", "Elephant", "Elbow", "Eight", "Earth", "Elf"],
    },
    F: {
        items: [
            { e: "🐸", w: "Frog" },
            { e: "🐟", w: "Fish" },
            { e: "🦊", w: "Fox" },
            { e: "🌸", w: "Flower" },
            { e: "🔥", w: "Fire" },
            { e: "🦩", w: "Flamingo" },
            { e: "🍟", w: "Fries" },
        ],
        words: ["Fish", "Fox", "Frog", "Fan", "Foot", "Fork", "Farm", "Fun"],
    },
    G: {
        items: [
            { e: "🦒", w: "Giraffe" },
            { e: "🍇", w: "Grapes" },
            { e: "🎸", w: "Guitar" },
            { e: "🐐", w: "Goat" },
            { e: "👻", w: "Ghost" },
            { e: "🎁", w: "Gift" },
            { e: "🧤", w: "Gloves" },
        ],
        words: ["Goat", "Gift", "Game", "Girl", "Gold", "Grass", "Green", "Glue"],
    },
    H: {
        items: [
            { e: "🏠", w: "House" },
            { e: "🐴", w: "Horse" },
            { e: "🍔", w: "Hamburger" },
            { e: "❤️", w: "Heart" },
            { e: "🎩", w: "Hat" },
            { e: "🚁", w: "Helicopter" },
            { e: "🦛", w: "Hippo" },
        ],
        words: ["Hat", "Hand", "House", "Horse", "Heart", "Hen", "Hill", "Honey"],
    },
    I: {
        items: [
            { e: "🍦", w: "Ice cream" },
            { e: "🧊", w: "Ice" },
            { e: "🏝️", w: "Island" },
            { e: "🦎", w: "Iguana" },
            { e: "💡", w: "Idea" },
            { e: "🐛", w: "Insect" },
            { e: "⛸️", w: "Ice skate" },
        ],
        words: ["Ice", "Ink", "Insect", "Igloo", "Island", "Iron", "Idea", "Inch"],
    },
    J: {
        items: [
            { e: "🧃", w: "Juice" },
            { e: "🃏", w: "Joker" },
            { e: "🕹️", w: "Joystick" },
            { e: "💎", w: "Jewel" },
            { e: "🧥", w: "Jacket" },
            { e: "🫙", w: "Jar" },
            { e: "🤹", w: "Juggler" },
        ],
        words: ["Jam", "Jar", "Jet", "Job", "Jump", "Juice", "Jacket", "Jelly"],
    },
    K: {
        items: [
            { e: "🔑", w: "Key" },
            { e: "🪁", w: "Kite" },
            { e: "🐨", w: "Koala" },
            { e: "🤴", w: "King" },
            { e: "🥝", w: "Kiwi" },
            { e: "🦘", w: "Kangaroo" },
        ],
        words: ["Key", "Kite", "King", "Kid", "Kiss", "Kitchen", "Kitten", "Kiwi"],
    },
    L: {
        items: [
            { e: "🦁", w: "Lion" },
            { e: "🍋", w: "Lemon" },
            { e: "🍃", w: "Leaf" },
            { e: "🐞", w: "Ladybug" },
            { e: "🔒", w: "Lock" },
            { e: "🦙", w: "Llama" },
            { e: "🍭", w: "Lollipop" },
        ],
        words: ["Lion", "Leg", "Leaf", "Lamp", "Lake", "Lips", "Log", "Love"],
    },
    M: {
        items: [
            { e: "🌙", w: "Moon" },
            { e: "🐵", w: "Monkey" },
            { e: "🍈", w: "Melon" },
            { e: "🧲", w: "Magnet" },
            { e: "🗺️", w: "Map" },
            { e: "🐭", w: "Mouse" },
            { e: "🎤", w: "Microphone" },
        ],
        words: ["Moon", "Map", "Milk", "Mouse", "Mom", "Mud", "Mouth", "Music"],
    },
    N: {
        items: [
            { e: "🥜", w: "Nut" },
            { e: "👃", w: "Nose" },
            { e: "🪺", w: "Nest" },
            { e: "📰", w: "Newspaper" },
            { e: "🌃", w: "Night" },
            { e: "🪡", w: "Needle" },
            { e: "🎵", w: "Note" },
        ],
        words: ["Net", "Nose", "Nest", "Nut", "Nine", "Name", "Night", "Nurse"],
    },
    O: {
        items: [
            { e: "🐙", w: "Octopus" },
            { e: "🍊", w: "Orange" },
            { e: "🦉", w: "Owl" },
            { e: "🌊", w: "Ocean" },
            { e: "🫒", w: "Olive" },
            { e: "🦧", w: "Orangutan" },
            { e: "🧅", w: "Onion" },
        ],
        words: ["Owl", "Orange", "Ocean", "Onion", "One", "Open", "Oven", "Ox"],
    },
    P: {
        items: [
            { e: "🐧", w: "Penguin" },
            { e: "🍕", w: "Pizza" },
            { e: "🐷", w: "Pig" },
            { e: "🎹", w: "Piano" },
            { e: "🥞", w: "Pancake" },
            { e: "🦜", w: "Parrot" },
            { e: "✏️", w: "Pencil" },
        ],
        words: ["Pig", "Pen", "Pizza", "Park", "Pear", "Pool", "Pot", "Puppy"],
    },
    Q: {
        items: [
            { e: "👸", w: "Queen" },
            { e: "❓", w: "Question" },
            { e: "🪶", w: "Quill" },
            { e: "🤫", w: "Quiet" },
            { e: "🌗", w: "Quarter moon" },
        ],
        words: ["Queen", "Question", "Quick", "Quiet", "Quilt", "Quack", "Quiz", "Quarter"],
    },
    R: {
        items: [
            { e: "🌈", w: "Rainbow" },
            { e: "🤖", w: "Robot" },
            { e: "🚀", w: "Rocket" },
            { e: "🐰", w: "Rabbit" },
            { e: "🌹", w: "Rose" },
            { e: "🦏", w: "Rhino" },
            { e: "💍", w: "Ring" },
        ],
        words: ["Rat", "Red", "Ring", "Rain", "Rock", "Rose", "Run", "Road"],
    },
    S: {
        items: [
            { e: "☀️", w: "Sun" },
            { e: "⭐", w: "Star" },
            { e: "🐍", w: "Snake" },
            { e: "🍓", w: "Strawberry" },
            { e: "🕷️", w: "Spider" },
            { e: "🚢", w: "Ship" },
            { e: "🧦", w: "Socks" },
        ],
        words: ["Sun", "Star", "Sea", "Sock", "Sand", "Six", "Song", "Soup"],
    },
    T: {
        items: [
            { e: "🐯", w: "Tiger" },
            { e: "🌳", w: "Tree" },
            { e: "🚂", w: "Train" },
            { e: "🐢", w: "Turtle" },
            { e: "🍅", w: "Tomato" },
            { e: "🦷", w: "Tooth" },
            { e: "🌮", w: "Taco" },
        ],
        words: ["Tree", "Ten", "Toy", "Train", "Table", "Tail", "Time", "Top"],
    },
    U: {
        items: [
            { e: "☂️", w: "Umbrella" },
            { e: "🦄", w: "Unicorn" },
            { e: "🛸", w: "UFO" },
            { e: "⬆️", w: "Up" },
            { e: "🩲", w: "Underwear" },
        ],
        words: ["Umbrella", "Unicorn", "Up", "Under", "Uncle", "Uniform", "Universe", "Use"],
    },
    V: {
        items: [
            { e: "🌋", w: "Volcano" },
            { e: "🎻", w: "Violin" },
            { e: "🚐", w: "Van" },
            { e: "🦺", w: "Vest" },
            { e: "🧛", w: "Vampire" },
            { e: "✌️", w: "Victory" },
            { e: "🎮", w: "Video game" },
        ],
        words: ["Van", "Vest", "Vase", "Vet", "Vine", "Violin", "Voice", "Volcano"],
    },
    W: {
        items: [
            { e: "🐺", w: "Wolf" },
            { e: "🍉", w: "Watermelon" },
            { e: "🐳", w: "Whale" },
            { e: "⌚", w: "Watch" },
            { e: "🪟", w: "Window" },
            { e: "👋", w: "Wave" },
            { e: "🧙", w: "Wizard" },
            { e: "🪱", w: "Worm" },
        ],
        words: ["Wolf", "Web", "Wind", "Wave", "Water", "Wing", "Worm", "Wheel"],
    },
    X: {
        // The hardest letter - only real X words with real emoji are used.
        items: [
            { e: "🩻", w: "X-ray" },
            { e: "❌", w: "X mark" },
            { e: "🎄", w: "Xmas tree" },
        ],
        words: ["X-ray", "Xmas", "X mark", "Xylophone"],
    },
    Y: {
        items: [
            { e: "🪀", w: "Yo-yo" },
            { e: "🟡", w: "Yellow" },
            { e: "🧶", w: "Yarn" },
            { e: "🥱", w: "Yawn" },
            { e: "🛥️", w: "Yacht" },
            { e: "🧘", w: "Yoga" },
        ],
        words: ["Yes", "Yellow", "Yarn", "Yawn", "Yard", "Year", "Yogurt", "Yolk"],
    },
    Z: {
        items: [
            { e: "🦓", w: "Zebra" },
            { e: "0️⃣", w: "Zero" },
            { e: "🤐", w: "Zipper" },
            { e: "🧟", w: "Zombie" },
            { e: "⚡", w: "Zap" },
        ],
        words: ["Zebra", "Zero", "Zoo", "Zipper", "Zigzag", "Zombie", "Zone", "Zap"],
    },
};

// Dev-time dataset validation: every entry must start with its own letter.
(function validateLettersData() {
    let errors = 0;
    for (const letter of Object.keys(LETTERS_DATA)) {
        const data = LETTERS_DATA[letter];
        for (const item of data.items) {
            if (item.w[0].toUpperCase() !== letter) {
                console.error(`[LETTERS_DATA] Item "${item.w}" does not start with "${letter}"`);
                errors++;
            }
        }
        for (const word of data.words) {
            if (word[0].toUpperCase() !== letter) {
                console.error(`[LETTERS_DATA] Word "${word}" does not start with "${letter}"`);
                errors++;
            }
        }
    }
    if (errors === 0) {
        console.log("[LETTERS_DATA] Dataset valid: 26 letters, all entries start with their letter.");
    }
})();
