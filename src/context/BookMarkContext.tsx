import React, { createContext, useContext, useState } from 'react';
import { QuestionWithAnswer } from '../types/types';

type BookmarkContextType = {
  bookmarks: QuestionWithAnswer[];
  toggleBookmark: (q: QuestionWithAnswer) => void;
};

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<QuestionWithAnswer[]>([]);

  const toggleBookmark = (question: QuestionWithAnswer) => {
    setBookmarks(prev => {
      const exists = prev.find(q => q.id === question.id);
      if (exists) {
        return prev.filter(q => q.id !== question.id); // remove
      }
      return [...prev, { ...question, marked: true }]; // add
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx)
    throw new Error('useBookmarks must be used inside BookmarkProvider');
  return ctx;
};
