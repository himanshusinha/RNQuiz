//NAVIGATION TYPES
export type RootStackParamList = {
  Home: undefined;
  Score: {
    score: number;
    totalQuestions: number;
    correct: number;
    wrong: number;
    unAttempted: number;
    timeTaken: string;
  };
  Categories: {
    category: Category;
  };
  Start: {
    category: Category;
    testId: string;
    testTitle: string;
    testNumber: number;
  };

  Questions: {
    categoryId: string;
    testId: string;
    time: number;
    categoryName: string;
  };

  BookMark: undefined;
  MyAccount: undefined;
  Rules: undefined;
  Login: undefined;
  SignUp: undefined;
  DrawerQuiz: undefined;
};

// DRAWER
export type DrawerParamList = {
  Home: undefined;
  BookMark: undefined;
  Rules: undefined;
  Score: undefined;
};
// CUSTOM HEADER
export type CustomHeaderProps = {
  title: string;
  navigation: {
    goBack: () => void;
    getParent?: () =>
      | {
          openDrawer: () => void;
        }
      | undefined;
  };
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
  Account: undefined;
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
  bestScore: number;
  testTime: number;
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
