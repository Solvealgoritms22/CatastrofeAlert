import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    standalone: true,
    imports: [RouterModule],
    template: `
        <div class="pb-12 px-12 mx-0 lg:mx-20">
            <div class="grid grid-cols-12 gap-4">
                <!-- Logo y título -->
                <div class="col-span-12 md:col-span-2">
                    <a (click)="router.navigate(['/pages/landing'], { fragment: 'home' })" class="flex flex-wrap items-center justify-center md:justify-start md:mb-0 mb-6 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="h-12 mr-2">
                            <circle cx="32" cy="32" r="30" fill="#D32F2F" />
                            <rect x="28" y="16" width="8" height="32" fill="#FFFFFF" />
                            <rect x="16" y="28" width="32" height="8" fill="#FFFFFF" />
                        </svg>
                        <h4 class="font-medium text-2xl text-surface-900 dark:text-surface-0">EMERGENCIA.DO</h4>
                    </a>
                </div>

                <!-- Enlaces del footer -->
                <div class="col-span-12 md:col-span-10">
                    <div class="grid grid-cols-12 gap-8 text-center md:text-left">
                        <!-- Organismos de Rescate -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0">Organismos de Rescate</h4>
                            <a href="https://www.emergencia.do/coe" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                COE
                            </a>
                            <a href="https://www.policianacional.gov.do" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Policía Nacional
                            </a>
                            <a href="https://www.bomberos.gov.do" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Bomberos
                            </a>
                            <a href="https://www.defensacivil.gov.do" target="_blank" class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">
                                Defensa Civil
                            </a>
                        </div>

                        <!-- Sistemas y Ministerios -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0">Sistemas y Ministerios</h4>
                            <a href="https://www.911.gob.do" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Sistema 9-1-1
                            </a>
                            <a href="https://www.mop.gob.do" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Ministerio de Obras Públicas
                            </a>
                            <a href="https://www.mindef.gob.do" target="_blank" class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">
                                Ministerio de Defensa
                            </a>
                        </div>

                        <!-- Actualizaciones -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0">Actualizaciones</h4>
                            <a href="#" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Noticias de Emergencia
                            </a>
                            <a href="#" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Reportes en Vivo
                            </a>
                            <a href="#" target="_blank" class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">
                                Alertas y Avisos
                            </a>
                        </div>

                        <!-- Protocolos y Recursos -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0">Protocolos y Recursos</h4>
                            <a href="#" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Guías de Rescate
                            </a>
                            <a href="#" target="_blank" class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">
                                Procedimientos de Emergencia
                            </a>
                            <a href="#" target="_blank" class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">
                                Contacto de Emergencia
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class FooterWidget {
    constructor(public router: Router) {}
}
