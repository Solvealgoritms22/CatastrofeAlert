import { TestBed } from '@angular/core/testing';
import { PerformanceService } from './performance.service';

// Ensure testing globals are available
declare const describe: any;
declare const beforeEach: any;
declare const afterEach: any;
declare const it: any;
declare const expect: any;

interface DoneFn {
  (): void;
  fail: (message?: string | Error) => void;
}

describe('PerformanceService', () => {
  let service: PerformanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default metrics', () => {
    const metrics = service.getCurrentMetrics();
    expect(metrics.tti).toBe(0);
    expect(metrics.fcp).toBe(0);
    expect(metrics.lcp).toBe(0);
    expect(metrics.cls).toBe(0);
    expect(metrics.fid).toBe(0);
    expect(metrics.bundleSize).toBe(0);
    expect(metrics.lighthouseScore).toBe(0);
  });

it('should provide observable metrics', (done: DoneFn) => {
    service.metrics$.subscribe(metrics => {
      expect(metrics).toBeDefined();
      done();
    });
  });
  it('should check performance goals correctly', () => {
    const result = service.checkPerformanceGoals();
    expect(result).toBeDefined();
    expect(typeof result.met).toBe('boolean');
    expect(Array.isArray(result.issues)).toBe(true);
  });

  it('should log metrics without errors', () => {
    expect(() => {
      service.logMetrics();
    }).not.toThrow();
  });

  it('should handle bundle size measurement', async () => {
    const size = await service.measureBundleSize();
    expect(typeof size).toBe('number');
    expect(size).toBeGreaterThanOrEqual(0);
  });
});