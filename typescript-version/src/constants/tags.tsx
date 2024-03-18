export const generalTags = [
    'Inspiration', 'Love', 'Life Lessons', 'Motivation', 'Happiness', 'Mindfulness', 'Personal Growth', 'Resilience',
    'Success & Failure', 'Wisdom', 'Friendship', 'Family', 'Work & Career', 'Creativity', 'Nature', 'Philosophy', 'Others',
    'Finance', 'Health', 'Technology', 'Education', 'Travel', 'Art & Culture', 'Science', 'History', 'Sports', 'Entertainment',
    'Yoga', 'Meditation', 'Keto Diet', 'Intermittent Fasting', 'Carnivore Diet', 'NLP', 'Poetry', 'Body Langue', 'Dating', 'Relationships', 'Pickup (PUA)'
];

export const pickupArtists = [
    'Erik von Markovik (Mystery)', 'Ross Jeffries', 'Neil Strauss (Style)', 'Hypnotica', 'David DeAngelo', 'Owen Cook (RSD Tyler)', 'Roosh V', 'Chase Amante', 'Alpha', 'Nick Savoy', 'Brad P', 'Mehow', 'Derek Cajun', 'Richard La Ruina (Gambler)', 'Adam Lyons (AFC Adam)',
    'Hypnotica', 'Steve P', 'Swinggcat', 'Charlie Houpert'
];

export const famousPeople = [
    'Jordan Peterson', 'Joseph Campbell',
]

export const cryptos = [
    'Bitcoin', 'Monero', 'Altcoins', 'Arweave', 'Litecoin'
];

export const languages = [
    'Spanish', 'English', 'French', 'German', 'Mandarin'
];

export const economics = [
    'Economics', 'Austrian Economics', 'Keynesianism', 'Anarcho-Capitalism', 'Libertarianism', 'Free Market', 'Capitalism'
];

export const philosophicalConcepts = [
    'Existentialism', 'Stoicism', 'Nihilism', 'Absurdism', 'Utilitarianism'
];

export const videogames = [
    'League of Legends', 'Age of Empires', 'Dragon\'s Age'
];

export const movies = [
    'Harry Potter', 'LOTR', 'Star Wars', 'Inception', 'The Matrix', 'Fight Club'
];

// Combine all tags into a single array for use in Autocomplete components
export const tagOptions = [...new Set([
    ...generalTags,
    ...famousPeople,
    ...pickupArtists,
    ...cryptos,
    ...languages,
    ...economics,
    ...philosophicalConcepts,
    ...videogames,
    ...movies
])];