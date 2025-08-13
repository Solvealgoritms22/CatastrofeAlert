import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    standalone: true,
    imports: [RouterModule],
    template: `
        <footer class="bg-gray-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <!-- Emergency Banner -->
                <div class="bg-red-600 rounded-lg p-6 mb-8 text-center">
                    <h3 class="text-xl font-bold mb-2">🚨 EMERGENCIA ACTIVA - DERRUMBE JET SET 🚨</h3>
                    <p class="text-lg">Para reportar personas desaparecidas o solicitar ayuda</p>
                    <div class="mt-4 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="tel:911" class="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                            <i class="pi pi-phone mr-2"></i>Llamar 911
                        </a>
                        <a href="tel:809-549-0000" class="bg-red-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-800 transition-colors">
                            <i class="pi pi-phone mr-2"></i>COE Nacional: 809-549-0000
                        </a>
                    </div>
                </div>

                <!-- Main Footer Content -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Brand Section -->
                    <div class="lg:col-span-1">
                        <div class="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="h-12 mr-2">
                                <circle cx="32" cy="32" r="30" fill="#D32F2F" />
                                <rect x="28" y="16" width="8" height="32" fill="#FFFFFF" />
                                <rect x="16" y="28" width="32" height="8" fill="#FFFFFF" />
                            </svg>
                            <span class="ml-3 text-xl font-bold">EMERGENCIA.DO</span>
                        </div>
                        <p class="text-gray-300 mb-4">
                            Sistema integral de alerta temprana y gestión de emergencias para situaciones de desastre.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white transition-colors">
                                <i class="pi pi-facebook text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors">
                                <i class="pi pi-twitter text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors">
                                <i class="pi pi-instagram text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors">
                                <i class="pi pi-youtube text-xl"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Emergency Services -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4 text-red-400">Servicios de Emergencia</h4>
                        <ul class="space-y-2">
                            <li><a href="tel:911" class="text-gray-300 hover:text-white transition-colors">911 - Emergencias</a></li>
                            <li><a href="tel:809-549-0000" class="text-gray-300 hover:text-white transition-colors">COE Nacional</a></li>
                            <li><a href="tel:809-683-0000" class="text-gray-300 hover:text-white transition-colors">Cuerpo de Bomberos</a></li>
                            <li><a href="tel:809-689-0000" class="text-gray-300 hover:text-white transition-colors">Cruz Roja Dominicana</a></li>
                            <li><a href="https://www.911.gob.do" target="_blank" class="text-gray-300 hover:text-white transition-colors">Sistema 9-1-1</a></li>
                        </ul>
                    </div>

                    <!-- Government Agencies -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4 text-white">Agencias Gubernamentales</h4>
                        <ul class="space-y-2">
                            <li><a href="https://mide.gob.do/" target="_blank" class="text-gray-300 hover:text-white transition-colors">Ministerio de Defensa</a></li>
                            <li><a href="https://www.mopc.gob.do/" target="_blank" class="text-gray-300 hover:text-white transition-colors">Ministerio de Obras Públicas</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Dirección General de Emergencias</a></li>
                            <li><a href="https://www.policianacional.gob.do/" target="_blank" class="text-gray-300 hover:text-white transition-colors">Policía Nacional</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Fuerza Aérea Dominicana</a></li>
                        </ul>
                    </div>

                    <!-- Resources & Updates -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4 text-white">Recursos y Actualizaciones</h4>
                        <ul class="space-y-2">
                            <li><a href="https://www.coe.gob.do/index.php/noticias" target="_blank" class="text-gray-300 hover:text-white transition-colors">Últimas Noticias</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Mapa de Emergencias</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Centros de Acopio</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Voluntariado</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Donaciones</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Contact Info -->
                <div class="border-t border-gray-800 mt-8 pt-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                        <div>
                            <h5 class="font-semibold mb-2">Contacto General</h5>
                            <p class="text-gray-400">info&#64;emergencia.gob.do</p>
                            <p class="text-gray-400">809-555-0123</p>
                        </div>
                        <div>
                            <h5 class="font-semibold mb-2">Soporte Técnico</h5>
                            <p class="text-gray-400">soporte&#64;emergencia.gob.do</p>
                            <p class="text-gray-400">809-555-0124</p>
                        </div>
                        <div>
                            <h5 class="font-semibold mb-2">Emergencias 24/7</h5>
                            <p class="text-gray-400">emergencia&#64;emergencia.gob.do</p>
                            <p class="text-gray-400">809-555-0125</p>
                        </div>
                    </div>
                </div>

                <!-- Copyright -->
                <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p class="text-gray-400">
                        © 2024 EMERGENCIA.DO - Sistema Nacional de Gestión de Emergencias.
                        Todos los derechos reservados.
                    </p>
                    <p class="text-gray-500 text-sm mt-2">
                        Desarrollado por el Ministerio de Defensa y el Centro de Operaciones de Emergencia (COE)
                    </p>
                </div>
            </div>
        </footer>
    `
})
export class FooterWidget {
    constructor(public router: Router) {}
}
