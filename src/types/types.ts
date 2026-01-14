//NAVIGATION TYPES
export type RootStackParamList = {
  Home: undefined;

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
    categoryName: string; // ✅ ADD THIS
  };

  BookMark: undefined;
  MyAccount: undefined;
  Rules: undefined;
  Login: undefined;
  SignUp: undefined;
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
export type QuestionWithAnswer = Question & {
  selected?: string | null;
};
export type Question = {
  id: string;
  QUESTION: string;
  A: string;
  B: string;
  C: string;
  D: string;
  ANSWER: string;
  CATEGORY: string;
  TEST: string;
};
export interface QuizTopHeaderProps {
  current: number;
  total: number;
  time: string;
  title: string;
  onBack: () => void;
  onSubmit: () => void;
  timerRunning: boolean;
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
