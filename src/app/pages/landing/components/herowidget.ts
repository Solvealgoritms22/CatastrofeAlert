import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatingCustomersCarouselComponent } from './floating-customers-section';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'hero-widget',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule, FloatingCustomersCarouselComponent, FormsModule],
    template: `
        <div
            class="relative w-full h-[100vh] bg-cover bg-center flex flex-col justify-center [mask-image:_linear-gradient(to_bottom,transparent_0,_white_128px,_white_calc(100%-128px),transparent_100%)]"
            style="background-image: url('https://dukx4ewcvnyp6.cloudfront.net/wp-content/uploads/2025/04/Tragedia-Jet-Set.webp');"
        >
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>

            <div class="absolute left-1/2 -translate-x-1/2 top-64 z-30 flex flex-col items-center">
                <div class="text-3xl lg:text-5xl leading-none text-center" style="background: linear-gradient(180deg, rgba(255,255,255,0.80) 4.92%, rgba(255,255,255,0.40) 89.39%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    Encuentra a tus seres queridos
                </div>
                <div
                    class="text-8xl lg:text-[17rem] leading-none font-black text-center lg:-mt-14"
                    style="background: linear-gradient(180deg, #FFF -16.99%, rgba(255,255,255,0) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
                >
                    Rescate
                </div>
            </div>
        </div>

        <div class="absolute left-1/2 bottom-0 transform -translate-x-1/2 z-50" style="mask-image: none; -webkit-mask-image: none; width: 92%; max-width: 68rem;">
            <div class="bg-surface-0 dark:bg-surface-950 mx-auto shadow-blue-card dark:shadow-none border border-white/15 rounded-4xl lg:rounded-full sm:rounded-lg rounded-lg p-6 lg:p-10 flex flex-col lg:flex-row gap-4">
                <div class="relative flex-1">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fa-duotone fa-family text-surface-500 dark:text-surface-400 fa-lg"></i>
                    </div>
                    <input 
                        type="text" 
                        [(ngModel)]="searchTerm"
                        (keyup.enter)="search()"
                        placeholder="Escribe un nombre..." 
                        class="w-full pl-12 pr-4 py-3 rounded-full shadow-stroke border border-white/10 focus:outline-none focus:ring-2" />
                </div>

                <button 
                    type="button" 
                    (click)="search()"
                    class="button-gradient w-full lg:w-auto flex bg-slate-50 border-0 text-black items-center justify-center gap-2 px-6 py-3 rounded-full">
                    <i class="pi pi-search"></i>
                    <span>Buscar</span>
                </button>
            </div>
        </div>

        <floating-customers-carousel></floating-customers-carousel>
    `
})
export class HeroWidget {
    @Output() searchEvent = new EventEmitter<string>();
    searchTerm: string = '';

    search() {
        this.searchEvent.emit(this.searchTerm);
    }
}