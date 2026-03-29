import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Direction = 'ltr' | 'rtl';
type Language = 'en' | 'ar';

interface AppState {
  language: Language;
  direction: Direction;
  sidebarCollapsed: boolean;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem('kemyan-language') as Language) || 'en',
      direction: localStorage.getItem('kemyan-language') === 'ar' ? 'rtl' : 'ltr',
      sidebarCollapsed: false,
      setLanguage: (language) =>
        set({
          language,
          direction: language === 'ar' ? 'rtl' : 'ltr',
        }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'kemyan-app',
      partialize: (state) => ({
        language: state.language,
        direction: state.direction,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);
