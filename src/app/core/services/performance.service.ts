import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PerformanceMetrics {
  tti: number; // Time to Interactive
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  bundleSize: number; // Bundle size in KB
  lighthouseScore: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private metricsSubject = new BehaviorSubject<PerformanceMetrics>({
    tti: 0,
    fcp: 0,
    lcp: 0,
    cls: 0,
    fid: 0,
    bundleSize: 0,
    lighthouseScore: 0
  });

  public metrics$ = this.metricsSubject.asObservable();

  constructor() {
    this.initPerformanceObserver();
  }

  private initPerformanceObserver(): void {
    // Observar métricas de performance cuando estén disponibles
    if ('PerformanceObserver' in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
    }

    // Medir TTI cuando la página esté completamente cargada
    window.addEventListener('load', () => {
      this.measureTTI();
    });
  }

  private observeLCP(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      this.updateMetric('lcp', lastEntry.startTime);
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  private observeFID(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.updateMetric('fid', (entry as any).processingStart - (entry as any).startTime);
      });
    });
    observer.observe({ type: 'first-input', buffered: true });
  }

  private observeCLS(): void {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.updateMetric('cls', clsValue);
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  }

  private measureTTI(): void {
    // Simplificación de TTI measurement
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const tti = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      this.updateMetric('tti', tti);
    }
  }

  private updateMetric(key: keyof PerformanceMetrics, value: number): void {
    const current = this.metricsSubject.value;
    this.metricsSubject.next({
      ...current,
      [key]: Math.round(value * 100) / 100
    });
  }

  public measureBundleSize(): Promise<number> {
    return new Promise((resolve) => {
      // Estimar bundle size usando Resource Timing API
      setTimeout(() => {
        const resources = performance.getEntriesByType('resource');
        const jsResources = resources.filter(r => r.name.includes('.js'));
        const totalSize = jsResources.reduce((sum, r) => sum + ((r as PerformanceResourceTiming).transferSize || 0), 0);
        const sizeKB = Math.round(totalSize / 1024);
        this.updateMetric('bundleSize', sizeKB);
        resolve(sizeKB);
      }, 1000);
    });
  }

  public getCurrentMetrics(): PerformanceMetrics {
    return this.metricsSubject.value;
  }

  public logMetrics(): void {
    const metrics = this.getCurrentMetrics();
    console.table({
      'Time to Interactive (TTI)': `${metrics.tti}ms`,
      'First Contentful Paint (FCP)': `${metrics.fcp}ms`,
      'Largest Contentful Paint (LCP)': `${metrics.lcp}ms`,
      'Cumulative Layout Shift (CLS)': metrics.cls,
      'First Input Delay (FID)': `${metrics.fid}ms`,
      'Bundle Size': `${metrics.bundleSize}KB`,
      'Lighthouse Score': `${metrics.lighthouseScore}%`
    });
  }

  public checkPerformanceGoals(): { met: boolean; issues: string[] } {
    const metrics = this.getCurrentMetrics();
    const issues: string[] = [];

    if (metrics.tti > 2000) {
      issues.push(`TTI (${metrics.tti}ms) excede el objetivo de 2000ms`);
    }

    if (metrics.bundleSize > 500) {
      issues.push(`Bundle size (${metrics.bundleSize}KB) excede el objetivo de 500KB`);
    }

    if (metrics.lighthouseScore < 90) {
      issues.push(`Lighthouse score (${metrics.lighthouseScore}%) está por debajo de 90%`);
    }

    return {
      met: issues.length === 0,
      issues
    };
  }
}