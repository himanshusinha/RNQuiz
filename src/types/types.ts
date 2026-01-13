// Root Stack Param List
export type RootStackParamList = {
  Home: undefined;
  Categories: { category: Category };
  Quiz: { category: Category };
  BookMark: undefined;
  MyAccount: undefined;
  Rules: undefined;
  Login: undefined;
  SignUp: undefined;
  Questions: undefined;
};

// Categories Item Props
export type CategoriesItemProps = {
  item: {
    id: string;
    title: string;
    progress: number;
  };
};
export interface Category {
  id: string;
  name: string;
  noOfTests: number;
}

// Category Card Props
export interface CategoryCardProps {
  item: Category;
  onPress: () => void;
}

// Custom Header Props
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

// Drawer Param List
export type DrawerParamList = {
  Home: undefined;
  BookMark: undefined;
  Rules: undefined;
  Score: undefined;
};

// Bottom Tab Param List
export type BottomTabParamList = {
  Home: undefined;
  Account: undefined;
};
// types/types.ts
export type TestItem = {
  id: string;
  title: string;
  progress: number;
};
