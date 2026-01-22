import { NavigationProp, ParamListBase } from '@react-navigation/native';

//NAVIGATION TYPES
export type RootStackParamList = {
  Home: undefined;
  Categories: {
    category: Category;
  };

  Start: {
    categoryId: string;
    categoryName: string;
    testNumber: number;
  };

  Questions: {
    categoryId: string;
    testId: string;
    time: number;
    categoryName: string;
    testNumber: number;
  };

  Score: {
    score: number;
    totalQuestions: number;
    correct: number;
    wrong: number;
    unAttempted: number;
    marked: number; // ✅ ADD THIS
    timeTaken: string;
    questions: QuestionWithAnswer[];
    categoryId: string;
    categoryName: string;
    testNumber: number;
  };

  Answers: {
    questions: QuestionWithAnswer[];
    categoryName: string;
  };

  BookMark: undefined;
  MyAccount: undefined;
  Rules: undefined;
  Login: undefined;
  SignUp: undefined;
  DrawerQuiz: undefined;
  UpdateProfile: undefined;
  Profile: undefined;
};

// DRAWER
export type DrawerParamList = {
  Home: undefined;
  BookMark: undefined;
  Rules: undefined;
  Score: undefined;
  Settings: undefined;
  Profile: undefined;
};
// CUSTOM HEADER
export type CustomHeaderProps = {
  title: string;
  navigation: NavigationProp<ParamListBase>;
  showBack?: boolean;
};

export type CustomQuizBottomBarProps = {
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClear: () => void;
  onMark?: () => void;
};
//  BOTTOM TAB
export type BottomTabParamList = {
  Home: undefined;
  Settings: undefined;
};

//FIREBASE MODELS
export interface Category {
  id: string;
  name: string;
  noOfTests: number;
  categoryName: string;
}
export type TestItem = {
  id: string;
  title: string;
  progress: number;
  testNumber: number;
  questionCount: number;
};

export type Question = {
  id: string;
  QUESTION: string;
  A: string;
  B: string;
  C: string;
  D: string;
  ANSWER: number;
  CATEGORY: string;
  TEST: string;
  marked: boolean;
};
export type QuestionStatus =
  | 'notVisited'
  | 'notAnswered'
  | 'answered'
  | 'markedForReview';
export type QuestionWithAnswer = Question & {
  selected: number | null; // ✅ FIXED
};

export interface QuestionPaletteItem {
  questionNo: number;
  status: QuestionStatus;
}
export const COLORS: Record<QuestionStatus, string> = {
  answered: '#4CAF50', // ✅ matches 'answered'
  notAnswered: '#F44336', // ✅ matches 'notAnswered'
  markedForReview: '#9C27B0', // ✅ matches 'markedForReview'
  notVisited: '#BDBDBD', // ✅ matches 'notVisited'
};
export interface TestInfoCardProps {
  questionCount: number;
  testTime: number;
  bestScore: number;
}
export interface QuizTopHeaderProps {
  current: number;
  total: number;
  time: string;
  title: string;
  onBack: () => void;
  onSubmit: () => void;
  timerRunning: boolean;
  isPaused?: boolean;
}
//COMPONENT PROPS
export interface CategoryCardProps {
  item: Category;
  onPress: () => void;
}

export interface CategoriesItemProps {
  item: TestItem;
  category: Category;
}
export interface BookMarkItemProps {
  item: QuestionWithAnswer;
  index: number;
}
