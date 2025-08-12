import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalStateService } from '../../../core/services/signal-state.service';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-state-demo',
  standalone: true,
  imports: [CommonModule, ButtonModule, BadgeModule, CardModule],
  template: `
    <div class="p-4">
      <p-card header="Signal State Demo">
        <div class="flex flex-column gap-3">
          <div class="flex align-items-center justify-content-between">
            <span>Estado de carga:</span>
            <span [class.text-green-500]="!isLoading()" [class.text-red-500]="isLoading()">
              {{ isLoading() ? 'Cargando...' : 'Listo' }}
            </span>
          </div>

          <div class="flex align-items-center justify-content-between">
            <span>Autenticado:</span>
            <span [class.text-green-500]="isAuthenticated()" [class.text-red-500]="!isAuthenticated()">
              {{ isAuthenticated() ? 'Sí' : 'No' }}
            </span>
          </div>

          <div class="flex align-items-center justify-content-between">
            <span>Idioma:</span>
            <span>{{ currentLanguage() }}</span>
          </div>

          <div class="flex align-items-center justify-content-between">
            <span>Tema:</span>
            <span>{{ currentTheme() }}</span>
          </div>

          <div class="flex align-items-center justify-content-between">
            <span>Notificaciones:</span>
            <p-badge [value]="notifications().length.toString()" severity="info"></p-badge>
          </div>

          <div class="flex gap-2 flex-wrap">
            <p-button 
              label="Toggle Loading" 
              (onClick)="toggleLoading()"
              [outlined]="true">
            </p-button>
            
            <p-button 
              label="Toggle Auth" 
              (onClick)="toggleAuth()"
              [outlined]="true">
            </p-button>
            
            <p-button 
              label="Cambiar Idioma" 
              (onClick)="toggleLanguage()"
              [outlined]="true">
            </p-button>
            
            <p-button 
              label="Cambiar Tema" 
              (onClick)="toggleTheme()"
              [outlined]="true">
            </p-button>
            
            <p-button 
              label="Añadir Notificación" 
              (onClick)="addTestNotification()"
              severity="success"
              [outlined]="true">
            </p-button>
          </div>

          <div *ngIf="notifications().length > 0" class="mt-3">
            <h4>Notificaciones activas:</h4>
            <div *ngFor="let notification of notifications()" 
                 class="p-2 mb-2 border-round border-1 surface-border">
              <div class="flex justify-content-between align-items-center">
                <span>{{ notification.message }}</span>
                <p-button 
                  icon="pi pi-times" 
                  (onClick)="removeNotification(notification.id)"
                  [text]="true"
                  severity="danger">
                </p-button>
              </div>
              <small class="text-color-secondary">
                {{ notification.timestamp | date:'short' }}
              </small>
            </div>
          </div>
        </div>
      </p-card>
    </div>
  `
})
export class StateDemoComponent {
  private stateService = inject(SignalStateService);

  // Signals del servicio
  isLoading = this.stateService.isLoading;
  isAuthenticated = this.stateService.isAuthenticated;
  currentLanguage = this.stateService.currentLanguage;
  currentTheme = this.stateService.currentTheme;
  notifications = this.stateService.notifications;

  toggleLoading(): void {
    this.stateService.setLoading(!this.isLoading());
  }

  toggleAuth(): void {
    this.stateService.setAuthenticated(!this.isAuthenticated());
  }

  toggleLanguage(): void {
    const currentLang = this.currentLanguage();
    const newLang = currentLang === 'es' ? 'en' : 'es';
    this.stateService.setLanguage(newLang);
  }

  toggleTheme(): void {
    const currentTheme = this.currentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.stateService.setTheme(newTheme);
  }

  addTestNotification(): void {
    this.stateService.addNotification({
      message: `Notificación de prueba ${Math.floor(Math.random() * 1000)}`,
      type: 'info'
    });
  }

  removeNotification(id: string): void {
    this.stateService.removeNotification(id);
  }
}