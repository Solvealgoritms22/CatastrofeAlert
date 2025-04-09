import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../../core/services/layout.service';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AuthService } from '../../core/services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, TieredMenuModule, DialogModule, ButtonModule],
    template: `
        <div class="layout-topbar shadow-md">
            <div class="layout-topbar-logo-container">
                <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                    <i class="pi pi-bars"></i>
                </button>
                <a class="layout-topbar-logo" routerLink="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="h-12 mr-2">
                        <circle cx="32" cy="32" r="30" fill="#D32F2F" />
                        <rect x="28" y="16" width="8" height="32" fill="#FFFFFF" />
                        <rect x="16" y="28" width="32" height="8" fill="#FFFFFF" />
                    </svg>
                    <span>EMERGENCIA.DO</span>
                </a>
            </div>

            <div class="layout-topbar-actions">
                <div class="layout-config-menu">
                    <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                        <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                    </button>
                    <div class="relative">

                        <app-configurator />
                    </div>
                </div>
            </div>
        </div>
        <!-- Dialog de confirmación para logout -->
        <p-dialog header="Confirm Logout" [(visible)]="displayLogoutConfirm" modal="true" [closable]="false" maskStyleClass="backdrop-blur-sm">
            <p>Are you sure you want to log out?</p>
            <div class="button-container">
                <button pButton label="Cancel" class="p-button-text cancel-button" (click)="displayLogoutConfirm = false"></button>
                <button pButton label="Confirm" class="p-button-danger confirm-button" (click)="confirmLogout()"></button>
            </div>
        </p-dialog>
    `,
    styles: [
        `
            /* Agregamos separación entre los botones */
            .button-container {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1rem;
            }

            /* Aseguramos que el botón Cancel tenga margen a la derecha (si se prefiere, se usa gap en el contenedor) */
            .cancel-button {
                /* margen opcional si no se usa gap */
            }

            /* Sobrescribir el color del label del botón Confirm para que siempre sea blanco */
            :host ::ng-deep .confirm-button .p-button-label {
                color: #fff !important;
            }
        `
    ]
})
export class AppTopbar implements OnInit {
    items: MenuItem[] | undefined;
    displayLogoutConfirm: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    ngOnInit() {
        this.items = [
            { label: 'Profile', icon: 'fa-duotone fa-solid fa-user' },
            { label: 'Setting', icon: 'fa-duotone fa-solid fa-gear' },
            { label: 'Activity', icon: 'fa-duotone fa-regular fa-wave-pulse' },
            { separator: true },
            {
                label: 'Logout',
                icon: 'fa-duotone fa-solid fa-arrow-right-from-bracket',
                command: () => this.showLogoutConfirm()
            }
        ];
    }

    showLogoutConfirm() {
        this.displayLogoutConfirm = true;
    }

    confirmLogout() {
        this.displayLogoutConfirm = false;
        this.authService.logout();
    }
}
