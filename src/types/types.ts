export type RootStackParamList = {
  Home: undefined;

  Categories: {
    category: Category;
  };

  Quiz: {
    category: Category;
  };

  BookMark: undefined;
  MyAccount: undefined;
  Rules: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type CategoriesItemProps = {
  item: {
    id: string;
    title: string;
    progress: number;
  };
};
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

export interface Category {
  id: string;
  title: string;
  count: number;
}

export interface CategoryCardProps {
  item: Category;
  onPress: (item: Category) => void;
}
export type DrawerParamList = {
  Home: undefined;
  BookMark: undefined;
  Rules: undefined;
  Score: undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  Account: undefined;
};
