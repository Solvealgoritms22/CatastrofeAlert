import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'topbar-widget',
  standalone: true,
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
  template: `
    <!-- Topbar Container -->
    <div class="flex flex-col lg:flex-row items-center justify-between w-full px-6 py-4 lg:px-12">
      <!-- Logo y Título -->
      <a class="flex flex-col lg:flex-row items-center" href="#">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="h-12 mr-2">
            <circle cx="32" cy="32" r="30" fill="#D32F2F" />
            <rect x="28" y="16" width="8" height="32" fill="#FFFFFF" />
            <rect x="16" y="28" width="32" height="8" fill="#FFFFFF" />
          </svg>
          <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal">
            EMERGENCIA.DO
          </span>
        </div>
        <!-- Texto para dispositivos móviles (visible solo en mobile) -->
        <div class="flex lg:hidden mt-2">
          <span class="text-surface-900 dark:text-surface-0 font-medium text-base">
            Dona sangre: 809-604-3327
            <i class="fa-duotone fa-solid fa-hand-holding-droplet fa-lg"></i>
          </span>

        </div>
      </a>

      <!-- Menú para dispositivos de escritorio -->
      <div class="items-center bg-transparent grow justify-between hidden lg:flex w-full px-12 lg:px-0 z-20">
        <div class="mr-12">
          <!-- Espacio para contenido opcional o adicional si se requiere -->
        </div>
        <!-- Texto para escritorio -->
        <div class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl ml-12">
          Dona sangre: 809-604-3327
        </div>
      </div>
    </div>
  `
})
export class TopbarWidget {
  constructor(public router: Router) {}
}
