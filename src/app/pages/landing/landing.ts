import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component';
import { HeroWidget } from './components/herowidget';
import { FeaturesWidget } from './components/featureswidget';
import { FooterWidget } from './components/footerwidget';
import { LayoutService } from '../../core/services/layout.service';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      TopbarWidget,
      HeroWidget,
      FeaturesWidget,
      FooterWidget,
      RippleModule,
      StyleClassModule,
      ButtonModule,
      DividerModule
    ],
    template: `
        <!-- Se aplica ngClass para activar la clase 'dark' basado en isDarkTheme -->
        <div [ngClass]="{'dark': isDarkTheme()}" class="bg-surface-0 dark:bg-surface-900">
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="fixed top-0 left-0 right-0 z-50"></topbar-widget>
                <div class="pt-16"> <!-- Padding for fixed topbar -->
                    <hero-widget (searchEvent)="onSearch($event)"></hero-widget>
                    <features-widget [searchTerm]="currentSearch"></features-widget>
                    <footer-widget></footer-widget>
                </div>
            </div>
        </div>
    `
})
export class Landing implements OnInit {
    private layoutService = inject(LayoutService);

    // Propiedad computada para obtener el valor actual de darkTheme
    isDarkTheme = computed(() => this.layoutService.layoutConfig().darkTheme);

    ngOnInit() {
        // Recupera el valor guardado; si no hay valor, por defecto se establece true (o false, según prefieras)
        const storedTheme = localStorage.getItem('darkTheme');
        const darkTheme = storedTheme !== null ? storedTheme === 'true' : true;
    
        // Actualiza la configuración en el LayoutService
        this.layoutService.layoutConfig.update(state => ({ ...state, darkTheme }));
    }
    

    currentSearch: string = '';

    onSearch(searchTerm: string) {
        this.currentSearch = searchTerm;
    }
}
