import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'topbar-widget',
  standalone: true,
  imports: [CommonModule, RouterModule, StyleClassModule, ButtonModule, RippleModule],
  template: `
        <nav class="bg-white/95 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo and Brand -->
                    <div class="flex items-center">
                        <a (click)="router.navigate(['/pages/landing'], { fragment: 'home' })" class="flex items-center cursor-pointer group">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="h-10 w-10 mr-2 group-hover:scale-110 transition-transform">
                                <circle cx="32" cy="32" r="30" fill="#D32F2F" class="group-hover:fill-red-600 transition-colors"/>
                                <rect x="28" y="16" width="8" height="32" fill="#FFFFFF"/>
                                <rect x="16" y="28" width="32" height="8" fill="#FFFFFF"/>
                            </svg>
                            <div>
                                <span class="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">EMERGENCIA.DO</span>
                                <div class="text-xs text-gray-500">Sistema Nacional de Emergencias</div>
                            </div>
                        </a>
                    </div>

                    <!-- Emergency Status Badge
                    <div class="hidden md:flex items-center">
                        <div class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <span class="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                            EMERGENCIA ACTIVA
                        </div>
                    </div>-->

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center space-x-8">
                        <a (click)="router.navigate(['/pages/landing'], { fragment: 'home' })"
                           class="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                            Inicio
                        </a>
                        <a (click)="router.navigate(['/pages/landing'], { fragment: 'features' })"
                           class="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                            Reportes
                        </a>
                        <a (click)="router.navigate(['/pages/landing'], { fragment: 'contact' })"
                           class="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                            Contacto
                        </a>
                    </div>

                    <!-- Emergency Contact Button -->
                    <div class="hidden md:flex items-center">
                        <a href="tel:809-549-0000"
                           class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center">
                            <i class="pi pi-phone mr-2"></i>
                            809-549-0000
                        </a>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button (click)="toggleMenu()"
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                            <i class="fa-duotone fa-solid text-xl" [class.fa-bars]="!showMenu" [class.fa-xmark]="showMenu" ></i>

                        </button>
                    </div>
                </div>

                <!-- Mobile menu -->
                <div *ngIf="showMenu" class="md:hidden border-t border-gray-200">
                    <div class="px-2 pt-2 pb-3 space-y-1">
                        <a (click)="router.navigate(['/pages/landing'], { fragment: 'home' }); showMenu = false"
                           class="text-gray-700 hover:bg-gray-100 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                            Inicio
                        </a>
                        <a (click)="router.navigate(['/pages/landing'], { fragment: 'features' }); showMenu = false"
                           class="text-gray-700 hover:bg-gray-100 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                            Reportes
                        </a>
                        <a (click)="router.navigate(['/pages/landing'], { fragment: 'contact' }); showMenu = false"
                           class="text-gray-700 hover:bg-gray-100 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                            Contacto
                        </a>
                        <div class="pt-4 pb-3 border-t border-gray-200">
                            <div class="px-3">
                                <a href="tel:809-549-0000"
                                   class="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center">
                                    <i class="pi pi-phone mr-2"></i>
                                    Llamar 809-549-0000
                                </a>
                            </div>
                            <div class="mt-3 px-3">
                                <div class="bg-red-100 text-red-800 px-3 py-2 rounded-full text-sm font-medium flex items-center justify-center">
                                    <span class="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                                    EMERGENCIA ACTIVA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
  `
})
export class TopbarWidget {
  showMenu = false;
  constructor(public router: Router) {}
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
