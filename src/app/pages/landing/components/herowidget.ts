import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatingCustomersCarouselComponent } from './floating-customers-section';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { HERO_STYLES, HeroStyleConfig } from '../../../core/config/hero-styles.config';

@Component({
    selector: 'hero-widget',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule, FloatingCustomersCarouselComponent, FormsModule],
    template: `
        <!-- Emergency Alert Banner -->
        <div *ngIf="showEmergencyBanner" class="fixed top-0 left-0 right-0 z-60 text-white p-3 animate-pulse" [ngClass]="currentStyle.theme.emergencyColor">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <i class="pi pi-exclamation-triangle animate-bounce"></i>
                    <span class="font-bold">🚨 EMERGENCIA ACTIVA - Derrumbe Jet Set</span>
                    <span class="hidden md:inline">| 24/7 Línea Directa: <a href="tel:{{ emergencyPhone }}" class="underline font-bold">{{ emergencyPhone }}</a></span>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="text-sm">
                        Actualizado: {{ currentTime }}
                    </div>
                    <button (click)="dismissEmergencyBanner()"
                            class="text-white hover:opacity-80 p-1 rounded-full transition-colors">
                        <i class="pi pi-times text-lg"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Hero Section -->
        <section class="relative w-full h-screen overflow-hidden">
            <!-- Video Background -->
            <div class="absolute inset-0" [class.cursor-pointer]="!videoStarted" (click)="startVideo()">
                <video #heroVideo muted loop playsinline autoplay
                       class="absolute inset-0 w-full h-full object-cover z-0 filter grayscale brightness-75"
                       [style.display]="videoError ? 'none' : 'block'"
                       (error)="onVideoError()"
                       (loadeddata)="onVideoLoaded()"
                       (stalled)="onVideoPlayError()"
                       (suspend)="onVideoPlayError()">
                    <source src="assets/videos/background.mp4" type="video/mp4" muted>
                    <!-- Fallback for browsers that don't support video -->
                </video>

                <!-- Video Loading Indicator -->
                <div *ngIf="!videoStarted && !videoError"
                     class="absolute inset-0 flex items-center justify-center z-15">
                    <div class="bg-black/50 rounded-full p-6 hover:bg-black/70 transition-colors">
                        <i class="pi pi-play text-white text-4xl"></i>
                    </div>
                </div>

                <!-- Fallback Background -->
                <div *ngIf="videoError" class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-600"></div>

                <!-- Transparent Overlay -->
                <div class="absolute inset-0 z-10" [ngClass]="currentStyle.theme.background"></div>
                <div class="absolute inset-0 bg-black/30 z-10"></div>

                <!-- Animated Emergency Icons -->
                <div class="absolute inset-0 opacity-10 z-20">
                    <div class="floating-icon absolute top-1/4 left-1/4 animate-float">
                        <i class="pi pi-heart-fill text-6xl text-white"></i>
                    </div>
                    <div class="floating-icon absolute top-3/4 right-1/4 animate-float-delayed">
                        <i class="pi pi-shield text-6xl text-white"></i>
                    </div>
                    <div class="floating-icon absolute bottom-1/4 left-1/2 animate-float">
                        <i class="pi pi-phone text-6xl text-white"></i>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="relative z-30 h-full flex items-center justify-center px-4">
                <div class="text-center max-w-6xl mx-auto">
                    <!-- Animated Headline -->
                    <div class="mb-8">
                        <h1 [ngClass]="currentStyle.typography.titleSize + ' font-black ' + currentStyle.theme.textColor + ' mb-4 animate-fade-in-up'">
                            <span class="block" [ngClass]="currentStyle.theme.textColor">Encuentra a tus</span>
                            <span class="block bg-gradient-to-r bg-clip-text text-transparent animate-pulse" [ngClass]="currentStyle.theme.accentGradient">
                                seres queridos
                            </span>
                        </h1>
                        <div [ngClass]="[currentStyle.typography.titleSize, 'font-black', currentStyle.theme.textColor, 'animate-fade-in-up', 'animation-delay-200']">
                            <span *ngFor="let letter of ['R','E','S','C','A','T','E']; let i = index"
                                  [ngClass]="['inline-block', currentStyle.animations.letterAnimation, 'animation-delay-' + (300 + i * 100)]">
                                {{ letter }}
                            </span>
                        </div>
                    </div>

                    <!-- Statistics Cards -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
                        <div *ngFor="let stat of [{count: rescuedCount, label: 'Rescatados'}, {count: hospitalsCount, label: 'Hospitales'}, {count: volunteersCount, label: 'Voluntarios'}, {count: activeCases, label: 'Casos Activos'}]"
                             [ngClass]="currentStyle.theme.cardBg + ' backdrop-blur-md rounded-xl p-4 border border-white/20'">
                            <div class="text-2xl md:text-3xl font-bold animate-count-up" [ngClass]="currentStyle.theme.textColor">{{ stat.count }}</div>
                            <div class="text-sm" [ngClass]="currentStyle.theme.textColor">{{ stat.label }}</div>
                        </div>
                    </div>

                    <!-- Enhanced Search -->
                    <div class="max-w-4xl mx-auto">
                        <div [ngClass]="currentStyle.theme.cardBg + ' backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl'">
                            <div class="flex flex-col md:flex-row gap-4 items-center">
                                <div class="relative flex-1 w-full">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i class="pi pi-search text-white/60 text-xl"></i>
                                    </div>
                                    <input
                                        type="text"
                                        [(ngModel)]="searchTerm"
                                        (keyup.enter)="search()"
                                        (input)="onSearchInput()"
                                        placeholder="Buscar por nombre, edad o ubicación..."
                                        class="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-all"
                                        [class.scale-105]="isSearching"
                                        [ngClass]="'focus:ring-' + currentStyle.theme.buttonGradient.split('-')[2] + '-400/50'"
                                    />
                                    <!-- Search Suggestions -->
                                    <div *ngIf="searchSuggestions.length > 0" class="absolute top-full mt-2 w-full dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 z-50">
                                        <div *ngFor="let suggestion of searchSuggestions"
                                             (click)="selectSuggestion(suggestion)"
                                             class="px-4 py-3 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                                            <i class="pi pi-user text-gray-400 mr-2"></i>
                                            {{ suggestion }}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    (click)="search()"
                                    [disabled]="!searchTerm.trim()"
                                    [ngClass]="'w-full md:w-auto bg-gradient-to-r ' + currentStyle.theme.buttonGradient + ' ' + currentStyle.theme.buttonTextColor + ' font-bold px-8 py-4 rounded-2xl hover:opacity-90 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed'">
                                    <i class="pi pi-search mr-2"></i>
                                    Buscar Ahora
                                </button>
                            </div>

                            <!-- Quick Filters -->
                            <div class="flex flex-wrap gap-2 mt-4 justify-center">
                                <button *ngFor="let filter of quickFilters"
                                        (click)="applyQuickFilter(filter)"
                                        class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-all"
                                        [ngClass]="currentStyle.theme.textColor">
                                    {{ filter }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Emergency Actions -->
                    <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            (click)="emergencyCall()"
                            [ngClass]="[currentStyle.theme.emergencyColor, 'hover:opacity-90 font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-105', currentStyle.theme.buttonTextColor]">
                            <i class="pi pi-phone text-xl"></i>
                            <span>Llamada de Emergencia</span>
                        </button>
                        <button
                            class="rounded-2xl border border-white/20 border-dashed"
                            (click)="shareLocation()"
                            [ngClass]="[currentStyle.theme.buttonGradient, currentStyle.theme.buttonTextColor, 'hover:opacity-90 font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-105']">
                            <i class="pi pi-map-marker text-xl"></i>
                            <span>Compartir Ubicación</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <i [ngClass]="'pi pi-chevron-down text-2xl ' + currentStyle.theme.textColor"></i>
            </div>
        </section>

        <floating-customers-carousel></floating-customers-carousel>
    `
})
export class HeroWidget implements OnInit {
    @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
    @Output() searchEvent = new EventEmitter<string>();
    searchTerm: string = '';

    // UI State
    isSearching = false;
    currentTime = new Date().toLocaleTimeString('es-DO');
    showEmergencyBanner = true;
    videoStarted = false;

    // Style Configuration
    currentStyle!: HeroStyleConfig;
    styleClasses: any = {};
    emergencyPhone = environment.emergencyPhone;
    videoError = false;

    // Statistics (would connect to real API)
    rescuedCount = 247;
    hospitalsCount = 12;
    volunteersCount = 1543;
    activeCases = 89;

    // Search functionality
    searchSuggestions: string[] = [];
    quickFilters = ['Urgentes', 'Niños', 'Adultos Mayores', 'Heridos Leves'];

    ngOnInit(): void {
        // Check if banner was previously dismissed
        const bannerDismissed = localStorage.getItem('emergencyBannerDismissed');
        if (bannerDismissed === 'true') {
            this.showEmergencyBanner = false;
        }

        // Load style from environment
        this.loadStyle();

        // Update time every minute
        setInterval(() => {
            this.currentTime = new Date().toLocaleTimeString('es-DO');
        }, 60000);

        // Animate counters on load
        setTimeout(() => {
            this.animateCounters();
        }, 1000);

        // Try to start video automatically after component initialization
        setTimeout(() => {
            this.attemptAutoplay();
        }, 2000);
    }

    loadStyle(): void {
        const styleName = environment.heroStyle || 'emergency';
        this.currentStyle = HERO_STYLES[styleName as keyof typeof HERO_STYLES];
    }

    onVideoError(): void {
        this.videoError = true;
        this.videoStarted = true; // Mark as started to hide loading indicator
    }

    onVideoLoaded(): void {
        this.videoStarted = true; // Video is ready to play
    }

    onVideoPlayError(): void {
        // Handle browser autoplay policy
        this.videoStarted = false;
    }

    search() {
        if (this.searchTerm.trim()) {
            this.searchEvent.emit(this.searchTerm);
            this.isSearching = false;
            this.searchSuggestions = [];
        }
    }

    dismissEmergencyBanner() {
        this.showEmergencyBanner = false;
        // Persist the dismissal in localStorage
        localStorage.setItem('emergencyBannerDismissed', 'true');
    }

    onSearchInput() {
        if (this.searchTerm.length > 2) {
            this.isSearching = true;
            // Simulate API call for suggestions
            this.searchSuggestions = [
                'María González',
                'José Martínez',
                'Ana Rodríguez',
                'Carlos López'
            ].filter(name => name.toLowerCase().includes(this.searchTerm.toLowerCase()));
        } else {
            this.searchSuggestions = [];
            this.isSearching = false;
        }
    }

    selectSuggestion(suggestion: string) {
        this.searchTerm = suggestion;
        this.search();
    }

    applyQuickFilter(filter: string) {
        this.searchEvent.emit(`filter:${filter}`);
    }

    emergencyCall() {
        window.location.href = 'tel:809-604-3327';
    }

    shareLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

                if (navigator.share) {
                    navigator.share({
                        title: 'Mi Ubicación de Emergencia',
                        text: `Necesito ayuda. Mi ubicación: ${mapsUrl}`,
                        url: mapsUrl
                    });
                } else {
                    window.open(mapsUrl, '_blank');
                }
            });
        }
    }

    animateCounters() {
        // Animate counters from 0 to target values
        const duration = 2000;
        const counters = [
            { target: this.rescuedCount, element: 'rescued' },
            { target: this.hospitalsCount, element: 'hospitals' },
            { target: this.volunteersCount, element: 'volunteers' },
            { target: this.activeCases, element: 'active' }
        ];

        counters.forEach(counter => {
            let current = 0;
            const increment = counter.target / (duration / 16);
            const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                    current = counter.target;
                    clearInterval(timer);
                }

                switch(counter.element) {
                    case 'rescued': this.rescuedCount = Math.floor(current); break;
                    case 'hospitals': this.hospitalsCount = Math.floor(current); break;
                    case 'volunteers': this.volunteersCount = Math.floor(current); break;
                    case 'active': this.activeCases = Math.floor(current); break;
                }
            }, 16);
        });
    }

    startVideo(): void {
        if (!this.videoStarted && !this.videoError) {
            // Small delay to ensure the video element is visible before playing
            setTimeout(() => {
                if (this.heroVideo && this.heroVideo.nativeElement) {
                    const playPromise = this.heroVideo.nativeElement.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // Video started successfully
                            this.videoStarted = true;
                        }).catch(error => {
                            console.error('Error playing video:', error);
                            // Don't set videoError on autoplay failure, show play button instead
                            this.videoStarted = false;
                        });
                    } else {
                        // For older browsers that don't return a promise
                        this.videoStarted = true;
                    }
                }
            }, 100);
        }
    }

    attemptAutoplay(): void {
        if (!this.videoStarted && !this.videoError && this.heroVideo && this.heroVideo.nativeElement) {
            // Try to play with user interaction hint
            const playPromise = this.heroVideo.nativeElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Autoplay started successfully
                    this.videoStarted = true;
                }).catch(() => {
                    // Autoplay blocked, show play button
                    this.videoStarted = false;
                });
            }
        }
    }
}
