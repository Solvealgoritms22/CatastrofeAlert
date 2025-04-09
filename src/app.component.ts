import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from './app/core/services/app-config.service';
import { ScrollTop } from 'primeng/scrolltop';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ScrollTop],
    template: `<router-outlet>
        <p-scrolltop [threshold]="100" icon="pi pi-arrow-up" [buttonProps]="{ raised: true, rounded: true }" />
    </router-outlet>`
})
export class AppComponent implements OnInit {
    constructor(
        private translateService: TranslateService,
        private configService: AppConfigService
    ) {}

    ngOnInit() {
        // Idioma por defecto
        this.translateService.setDefaultLang('es');

        // (Opcional) Podrías sobrescribir configService.appName aquí
        this.configService.appName = 'Cosevi';
    }

    switchToEnglish() {
        this.translateService.use('en');
    }

    switchToSpanish() {
        this.translateService.use('es');
    }
}
