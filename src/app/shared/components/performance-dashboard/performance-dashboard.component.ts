import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { PerformanceService } from '../../../core/services/performance.service';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-performance-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressBarModule, ButtonModule, BadgeModule],
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">📊 Performance Dashboard</h2>
      
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-3">
          <p-card header="Time to Interactive" subheader="Meta: < 2000ms">
            <div class="text-3xl font-bold" [ngClass]="ttiClass()">
              {{ metrics().tti }}ms
            </div>
            <p-progressBar 
              [value]="ttiProgress()" 
              [styleClass]="ttiClass()"></p-progressBar>
          </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
          <p-card header="Bundle Size" subheader="Meta: < 500KB">
            <div class="text-3xl font-bold" [ngClass]="bundleClass()">
              {{ metrics().bundleSize }}KB
            </div>
            <p-progressBar 
              [value]="bundleProgress()" 
              [styleClass]="bundleClass()"></p-progressBar>
          </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
          <p-card header="Lighthouse Score" subheader="Meta: > 90">
            <div class="text-3xl font-bold" [ngClass]="lighthouseClass()">
              {{ metrics().lighthouseScore }}%
            </div>
            <p-progressBar 
              [value]="metrics().lighthouseScore" 
              [styleClass]="lighthouseClass()"></p-progressBar>
          </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
          <p-card header="Overall Status">
            <div class="text-center">
              <i class="pi text-5xl" 
                 [ngClass]="overallStatus() ? 'pi-check-circle text-green-500' : 'pi-times-circle text-red-500'"></i>
              <div class="mt-2">
                <p-badge 
                  [value]="overallStatus() ? '✅ OK' : '❌ Issues'" 
                  [severity]="overallStatus() ? 'success' : 'danger'">
                </p-badge>
              </div>
            </div>
          </p-card>
        </div>
      </div>

      <div class="col-12 mt-4">
        <p-card header="📈 Métricas Detalladas">
          <div class="grid">
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-100 p-3 border-round">
                <h4 class="mt-0 mb-2">First Contentful Paint</h4>
                <div class="text-2xl font-bold">{{ metrics().fcp }}ms</div>
              </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-100 p-3 border-round">
                <h4 class="mt-0 mb-2">Largest Contentful Paint</h4>
                <div class="text-2xl font-bold">{{ metrics().lcp }}ms</div>
              </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-100 p-3 border-round">
                <h4 class="mt-0 mb-2">Cumulative Layout Shift</h4>
                <div class="text-2xl font-bold">{{ metrics().cls }}</div>
              </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-100 p-3 border-round">
                <h4 class="mt-0 mb-2">First Input Delay</h4>
                <div class="text-2xl font-bold">{{ metrics().fid }}ms</div>
              </div>
            </div>
          </div>

          <div *ngIf="issues().length > 0" class="mt-4">
            <h4 class="text-red-500">⚠️ Issues encontrados:</h4>
            <ul class="list-disc pl-4">
              <li *ngFor="let issue of issues()" class="text-red-600">
                {{ issue }}
              </li>
            </ul>
          </div>
        </p-card>
      </div>

      <div class="col-12 mt-4 text-center">
        <p-button 
          label="Refrescar Métricas" 
          icon="pi pi-refresh" 
          (onClick)="refreshMetrics()"
          [loading]="loading">
        </p-button>
        
        <p-button 
          label="Exportar Reporte" 
          icon="pi pi-download" 
          (onClick)="exportReport()"
          [outlined]="true"
          class="ml-2">
        </p-button>
      </div>
    </div>
  `
})
export class PerformanceDashboardComponent implements OnInit {
  private performanceService = inject(PerformanceService);
  
  metrics = toSignal(this.performanceService.metrics$, { initialValue: this.performanceService.getCurrentMetrics() });
  loading = false;

  // Computed properties para clases CSS
  ttiClass = computed(() => 
    this.metrics().tti <= 2000 ? 'text-green-500' : 'text-red-500'
  );

  bundleClass = computed(() => 
    this.metrics().bundleSize <= 500 ? 'text-green-500' : 'text-red-500'
  );

  lighthouseClass = computed(() => 
    this.metrics().lighthouseScore >= 90 ? 'text-green-500' : 'text-red-500'
  );

  // Computed properties para progress bars
  ttiProgress = computed(() => 
    Math.min((this.metrics().tti / 2000) * 100, 100)
  );

  bundleProgress = computed(() => 
    Math.min((this.metrics().bundleSize / 500) * 100, 100)
  );

  overallStatus = computed(() => {
    const metrics = this.metrics();
    return metrics.tti <= 2000 && 
           metrics.bundleSize <= 500 && 
           metrics.lighthouseScore >= 90;
  });

  issues = computed(() => {
    const result = this.performanceService.checkPerformanceGoals();
    return result.issues;
  });

  ngOnInit(): void {
    this.refreshMetrics();
  }

  async refreshMetrics(): Promise<void> {
    this.loading = true;
    try {
      await this.performanceService.measureBundleSize();
      this.performanceService.logMetrics();
    } catch (error) {
      console.error('Error al refrescar métricas:', error);
    } finally {
      this.loading = false;
    }
  }

  exportReport(): void {
    const metrics = this.performanceService.getCurrentMetrics();
    const report = {
      timestamp: new Date().toISOString(),
      metrics,
      goals: {
        tti: 2000,
        bundleSize: 500,
        lighthouseScore: 90
      },
      status: this.performanceService.checkPerformanceGoals()
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}