import { TestBed } from '@angular/core/testing';
import { SignalStateService } from './signal-state.service';

// Ensure testing globals are available
declare const describe: any;
declare const beforeEach: any;
declare const afterEach: any;
declare const it: any;
declare const expect: any;

describe('SignalStateService', () => {
  let service: SignalStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalStateService);
    
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    const state = service.getState();
    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.language).toBe('es');
    expect(state.theme).toBe('light');
    expect(state.notifications).toEqual([]);
  });

  it('should update loading state', () => {
    service.setLoading(true);
    expect(service.isLoading()).toBe(true);
    
    service.setLoading(false);
    expect(service.isLoading()).toBe(false);
  });

  it('should update authentication state', () => {
    service.setAuthenticated(true);
    expect(service.isAuthenticated()).toBe(true);
    
    service.setAuthenticated(false);
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should update language', () => {
    service.setLanguage('en');
    expect(service.currentLanguage()).toBe('en');
    
    service.setLanguage('fr');
    expect(service.currentLanguage()).toBe('fr');
  });

  it('should update theme', () => {
    service.setTheme('dark');
    expect(service.currentTheme()).toBe('dark');
    
    service.setTheme('light');
    expect(service.currentTheme()).toBe('light');
  });

  it('should add notifications', () => {
    const initialCount = service.notifications().length;
    
    service.addNotification({
      message: 'Test notification',
      type: 'info'
    });
    
    expect(service.notifications().length).toBe(initialCount + 1);
    expect(service.notifications()[0].message).toBe('Test notification');
    expect(service.notifications()[0].type).toBe('info');
  });

  it('should remove notifications', () => {
    service.addNotification({ message: 'Test 1', type: 'info' });
    service.addNotification({ message: 'Test 2', type: 'warning' });
    
    const notifications = service.notifications();
    const idToRemove = notifications[0].id;
    
    service.removeNotification(idToRemove);
    
    expect(service.notifications().length).toBe(1);
    expect(service.notifications()[0].message).toBe('Test 2');
  });

  it('should clear all notifications', () => {
    service.addNotification({ message: 'Test 1', type: 'info' });
    service.addNotification({ message: 'Test 2', type: 'warning' });
    
    service.clearNotifications();
    
    expect(service.notifications()).toEqual([]);
  });

  it('should load state from localStorage', () => {
    const savedState = {
      language: 'en',
      theme: 'dark'
    };
    localStorage.setItem('app-state', JSON.stringify(savedState));
    
    // Crear nuevo servicio para probar carga desde localStorage
    const newService = new SignalStateService();
    
    expect(newService.currentLanguage()).toBe('en');
    expect(newService.currentTheme()).toBe('dark');
  });

  it('should handle invalid localStorage data gracefully', () => {
    localStorage.setItem('app-state', 'invalid-json');
    
    const newService = new SignalStateService();
    
    expect(newService.currentLanguage()).toBe('es');
    expect(newService.currentTheme()).toBe('light');
  });

  it('should save state to localStorage', () => {
    service.setLanguage('fr');
    service.setTheme('dark');
    
    const saved = localStorage.getItem('app-state');
    expect(saved).toBeTruthy();
    
    if (saved) {
      const parsed = JSON.parse(saved);
      expect(parsed.language).toBe('fr');
      expect(parsed.theme).toBe('dark');
    }
  });
});