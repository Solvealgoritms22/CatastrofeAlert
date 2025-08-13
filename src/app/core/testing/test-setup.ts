// Test setup para Angular Testing Library
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const beforeAll: (fn: () => void) => void;
declare const afterEach: (fn: () => void) => void;

// Configuración global de tests
beforeAll(() => {
  // Configurar TestBed para testing standalone components
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
});

afterEach(() => {
  TestBed.resetTestingModule();
});

// Mock services globales
export const mockSignalStateService = {
  isLoading: () => false,
  isAuthenticated: () => true,
  currentUser: () => ({ name: 'Test User' }),
  currentLanguage: () => 'es',
  currentTheme: () => 'light',
  notifications: () => [],
  setLoading: () => {},
  setAuthenticated: () => {},
  setUser: () => {},
  setLanguage: () => {},
  setTheme: () => {},
  addNotification: () => {},
  removeNotification: () => {},
  clearNotifications: () => {}
};

export const mockPerformanceService = {
  metrics$: {
    subscribe: () => ({}),
    pipe: () => ({})
  },
  measureBundleSize: () => Promise.resolve(450),
  getCurrentMetrics: () => ({
    tti: 1800,
    fcp: 1200,
    lcp: 1500,
    cls: 0.1,
    fid: 50,
    bundleSize: 450,
    lighthouseScore: 92
  }),
  logMetrics: () => {},
  checkPerformanceGoals: () => ({
    met: true,
    issues: []
  })
};