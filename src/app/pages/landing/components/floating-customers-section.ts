import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'floating-customers-carousel',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="relative overflow-hidden py-12 flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div class="w-full max-w-5xl flex flex-nowrap gap-6 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_white_128px,_white_calc(100%-128px),transparent_100%)]">
                <!-- Contenedor con animación infinita -->
                <div class="flex flex-nowrap items-center animate-infinite-scroll">
                    <!-- Elementos originales -->
                    <ng-container *ngFor="let item of carouselItems">
                        <div class="carousel-item flex flex-col items-center justify-center h-auto gap-4">
                            <div class="flex items-center justify-center" style="width: 6rem; height: 4rem;">
                                <img [src]="item.src" [alt]="item.alt" class="h-full w-full object-contain" loading="lazy" />
                            </div>
                        </div>
                    </ng-container>
                    <!-- Elementos duplicados para scroll infinito -->
                    <ng-container *ngFor="let item of carouselItems">
                        <div class="carousel-item flex flex-col items-center justify-center h-auto gap-4">
                            <div class="flex items-center justify-center" style="width: 6rem; height: 4rem;">
                                <img [src]="item.src" [alt]="item.alt" class="h-full w-full object-contain" loading="lazy" />
                            </div>
                        </div>
                    </ng-container>
                </div>
            </div>
        </section>
    `,
    styles: [
        `
            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }
            .animate-infinite-scroll {
                animation: scroll 20s linear infinite; /* Tiempo ajustado a 20s */
            }
            .carousel-item {
                flex-shrink: 0;
                width: 8rem; /* Reducido de 11rem a 8rem para hacerlo más compacto */
            }
            .animate-infinite-scroll:hover {
                animation-play-state: paused; /* Pausa al hacer hover */
            }
        `
    ]
})
export class FloatingCustomersCarouselComponent {
    carouselItems = [
        { src: 'assets/img/logo-911-hd.png', alt: 'Logo Trimzales' },
        { src: 'assets/img/logo-card-removebg-preview.png', alt: 'Logo ZenTrailMs' },
        { src: 'assets/img/maxresdefault-removebg-preview.png', alt: 'Logo Wavelength' },
        { src: 'assets/img/QZ-RbE_s_400x400.png', alt: 'Logo AlphaHex' },
        { src: 'assets/img/pn.png', alt: 'Logo Mistranet' },
        { src: 'assets/img/defensa_civil.png', alt: 'Logo BriteMank' },
    ];
}
