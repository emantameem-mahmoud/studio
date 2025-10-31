'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

type EditModeContextType = {
  isEditing: boolean;
  toggleEditMode: () => void;
};

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <EditModeContext.Provider value={{ isEditing, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
}
