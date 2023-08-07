const nouns = [
  'bird',
  'clock',
  'boy',
  'plastic',
  'duck',
  'teacher',
  'old lady',
  'professor',
  'hamster',
  'dog',
];
const verbs = [
  'kicked',
  'ran',
  'flew',
  'dodged',
  'sliced',
  'rolled',
  'died',
  'breathed',
  'slept',
  'killed',
];
const adjectives = [
  'beautiful',
  'lazy',
  'professional',
  'lovely',
  'dumb',
  'rough',
  'soft',
  'hot',
  'vibrating',
  'slimy',
];
const adverbs = [
  'slowly',
  'elegantly',
  'precisely',
  'quickly',
  'sadly',
  'humbly',
  'proudly',
  'shockingly',
  'calmly',
  'passionately',
];
const preposition = [
  'down',
  'into',
  'up',
  'on',
  'upon',
  'below',
  'above',
  'through',
  'across',
  'towards',
];

const randGen = () => {
  return Math.floor(Math.random() * 5);
};

export const generateSentence = () =>
  'The ' +
  adjectives[randGen()] +
  ' ' +
  nouns[randGen()] +
  ' ' +
  adverbs[randGen()] +
  ' ' +
  verbs[randGen()] +
  ' because some ' +
  nouns[randGen()] +
  ' ' +
  adverbs[randGen()] +
  ' ' +
  verbs[randGen()] +
  ' ' +
  preposition[randGen()] +
  ' a ' +
  adjectives[randGen()] +
  ' ' +
  nouns[randGen()] +
  ' which, became a ' +
  adjectives[randGen()] +
  ', ' +
  adjectives[randGen()] +
  ' ' +
  nouns[randGen()] +
  '.';
