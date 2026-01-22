// data/categories.ts
export const categories = [
  { id: '1', title: 'GK', count: 20 },
  { id: '2', title: 'HISTORY', count: 30 },
  { id: '3', title: 'ENGLISH', count: 10 },
  { id: '4', title: 'SCIENCE', count: 25 },
  { id: '5', title: 'MATHS', count: 15 },
];
export const tests = [
  { id: '1', title: 'Test No : 1', progress: 50 },
  { id: '2', title: 'Test No : 2', progress: 80 },
  { id: '3', title: 'Test No : 3', progress: 0 },
  { id: '4', title: 'Test No : 4', progress: 10 },
];

export const menuItems = [
  { icon: 'bookmark-outline', title: 'BookMark', screen: 'BookMark' },
  { icon: 'person-outline', title: 'Profile', screen: 'Profile' },
  {
    icon: 'log-out-outline',
    title: 'Logout',
    screen: 'Logout',
    danger: true,
  },
];

export const rules = [
  'The quiz consists of multiple-choice questions.',
  'Each question has only one correct answer.',
  'You will provide time to answer each question.',
  'Once an option is selected, it can be changed.',
  'No points will be awarded for unanswered or wrong questions.',
  'Your final score will be shown at the end of the quiz.',
  'Do not exit the quiz while playing, otherwise progress will be lost.',
];
