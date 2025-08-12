import { Injectable, signal, computed, effect } from '@angular/core';

export interface AppState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any | null;
  language: string;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SignalStateService {
  // Estado principal de la aplicación
  private readonly _state = signal<AppState>({
    isLoading: false,
    isAuthenticated: false,
    user: null,
    language: 'es',
    theme: 'light',
    notifications: []
  });

  // Selectores computados para acceso eficiente
  public readonly isLoading = computed(() => this._state().isLoading);
  public readonly isAuthenticated = computed(() => this._state().isAuthenticated);
  public readonly currentUser = computed(() => this._state().user);
  public readonly currentLanguage = computed(() => this._state().language);
  public readonly currentTheme = computed(() => this._state().theme);
  public readonly notifications = computed(() => this._state().notifications);
  public readonly unreadNotifications = computed(() =>
    this._state().notifications
  );

  // Métodos de actualización
  setLoading(loading: boolean): void {
    this._state.update(state => ({ ...state, isLoading: loading }));
  }

  setAuthenticated(authenticated: boolean): void {
    this._state.update(state => ({ ...state, isAuthenticated: authenticated }));
  }

  setUser(user: any): void {
    this._state.update(state => ({ ...state, user }));
  }

  setLanguage(language: string): void {
    this._state.update(state => ({ ...state, language }));
  }

  setTheme(theme: 'light' | 'dark'): void {
    this._state.update(state => ({ ...state, theme }));
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };

    this._state.update(state => ({
      ...state,
      notifications: [...state.notifications, newNotification]
    }));
  }

  removeNotification(id: string): void {
    this._state.update(state => ({
      ...state,
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  }

  clearNotifications(): void {
    this._state.update(state => ({ ...state, notifications: [] }));
  }

  // Método para acceso directo al estado (para debugging)
  getState() {
    return this._state();
  }

  // Efecto para sincronizar con localStorage
  constructor() {
    effect(() => {
      const state = this._state();
      localStorage.setItem('app-state', JSON.stringify({
        language: state.language,
        theme: state.theme
      }));
    });

    // Cargar estado desde localStorage
    const savedState = localStorage.getItem('app-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        this._state.update(state => ({
          ...state,
          language: parsed.language || 'es',
          theme: parsed.theme || 'light'
        }));
      } catch (error) {
        console.error('Error loading state from localStorage:', error);
      }
    }
  }
}
