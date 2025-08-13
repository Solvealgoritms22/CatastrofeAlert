import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

interface Paciente {
    id?: string;
    nombre: string;
    edad: number;
    centroMedico: string;
    observaciones: string;
    status?: string;
}

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule, TableModule, FormsModule],
    template: `
        <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
            <!-- Header Section -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Alert Status Cards
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                            <i class="pi pi-exclamation-triangle text-red-500 text-2xl"></i>
                            </div>
                            <div class="ml-3">
                            <h3 class="text-lg font-medium text-red-800 dark:text-red-200">Estado de Emergencia</h3>
                            <p class="text-sm text-red-700 dark:text-red-300">Derrumbe activo en curso</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                            <i class="pi pi-clock text-blue-500 text-2xl"></i>
                            </div>
                            <div class="ml-3">
                            <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">Última Actualización</h3>
                            <p class="text-sm text-blue-700 dark:text-blue-300">{{ lastUpdate }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                            <i class="pi pi-check-circle text-green-500 text-2xl"></i>
                            </div>
                            <div class="ml-3">
                            <h3 class="text-lg font-medium text-green-800 dark:text-green-200">Operaciones Activas</h3>
                            <p class="text-sm text-green-700 dark:text-green-300">{{ activeOperations }} equipos en campo</p>
                            </div>
                        </div>
                    </div>
                </div>-->

                <!-- Logo and Title -->
                <div class="text-center mb-8">
                    <div class="flex justify-center items-center mb-4">
                        <img src="https://daeh.gob.do/wp-content/uploads/2023/04/logo-daeh-00.png" alt="DAFH Logo" class="w-48 h-auto" />
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        TIPIFICADO: Rescate Jet Set
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Personal de la unidad reporta el derrumbe del techo de la discoteca Jet Set.
                        Estamos coordinando esfuerzos de rescate con todos los organismos de emergencia.
                    </p>
                </div>

                <!-- Search and Filters -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-8 w-full">
                    <div class="flex flex-col space-y-4 w-full">
                        <!-- Search Bar - Full width on all screens -->
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="pi pi-search text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                [(ngModel)]="searchTerm"
                                (input)="onSearchChange()"
                                placeholder="Buscar por nombre, edad, ubicación..."
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 bg-transparent dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base" />
                        </div>

                        <!-- Filters - Responsive grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            <select
                                [(ngModel)]="selectedStatus"
                                class="w-full bg-transparent px-4 py-3 border dark:bg-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 text-sm sm:text-base">
                                <option value="">Todos los estados</option>
                                <option value="rescatado">Rescatado</option>
                                <option value="hospitalizado">Hospitalizado</option>
                                <option value="buscando">Buscando</option>
                            </select>
                            <select
                                [(ngModel)]="selectedHospital"
                                class="w-full bg-transparent px-4 py-3 border dark:bg-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 text-sm sm:text-base">
                                <option value="">Todos los hospitales</option>
                                <option *ngFor="let hospital of hospitals" [value]="hospital">{{ hospital }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Data Summary -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-white">{{ totalPatients }}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Total Registrados</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-white">{{ rescuedPatients }}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Rescatados</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-white">{{ hospitalizedPatients }}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Hospitalizados</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-white">{{ searchingPatients }}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Buscando</div>
                    </div>
                </div>

                <!-- Enhanced Data Table -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Lista de Pacientes
                            <span class="ml-2 text-sm text-gray-500">({{ filteredPatients.length }} resultados)</span>
                        </h2>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Edad</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Centro Médico</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Observaciones</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                <tr *ngFor="let paciente of filteredPatients; let i = index"
                                    class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span [class]="getStatusBadge(paciente)">
                                            {{ getStatusText(paciente) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900 dark:text-white">{{ paciente.nombre }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {{ paciente.edad || 'N/A' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {{ paciente.centroMedico }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                                        {{ paciente.observaciones }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-white hover:text-red-700 mr-2">
                                            <i class="pi pi-phone"></i>
                                        </button>
                                        <button class="text-white hover:text-blue-700">
                                            <i class="pi pi-map-marker"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div *ngIf="filteredPatients.length === 0" class="text-center py-12">
                        <i class="pi pi-search text-4xl text-gray-400 mb-4"></i>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No se encontraron resultados</h3>
                        <p class="text-gray-500 dark:text-gray-400">Intenta ajustar tus filtros de búsqueda</p>
                    </div>
                </div>

                <!-- Live Video Section -->
                <div class="mt-12">
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex flex-wrap items-center gap-2">
                                <i class="pi pi-video text-red-500"></i>
                                <span class="flex-1">Video en Vivo del Suceso</span>
                                <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full whitespace-nowrap">EN VIVO</span>
                            </h2>
                        </div>
                        <div class="aspect-w-16 aspect-h-9">
                            <iframe
                                class="w-full h-96"
                                src="https://www.youtube-nocookie.com/embed/eQ8YjRSJFvM"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class FeaturesWidget implements OnInit {
    @ViewChild('dt') table!: Table;

    private _searchTerm: string = '';
    @Input() set searchTerm(value: string) {
        this._searchTerm = value;
        this.filterPatients();
        this.scrollToFirstMatch(value); // Ejecutamos el scroll inmediatamente
    }

    registroPacientes: Paciente[] = [];
    filteredPatients: Paciente[] = [];
    private apiUrl = environment.apiUrl;

    selectedStatus: string = '';
    selectedHospital: string = '';

    lastUpdate: string = '';
    activeOperations: number = 3;
    hospitals: string[] = [];

    constructor(private http: HttpClient) {
        this.updateLastUpdate();
    }

    ngOnInit() {
        this.loadPacientes();
        this.startAutoUpdate();
    }

    loadPacientes() {
        this.http.get<any[]>(`${this.apiUrl}/pacientes`).subscribe({
            next: (data) => {
                this.registroPacientes = data.map(patient => ({
                    ...patient,
                    status: patient.status || this.getRandomStatus()
                }));
                this.extractHospitals();
                this.filterPatients();
                if (this._searchTerm) {
                    this.scrollToFirstMatch(this._searchTerm);
                }
            },
            error: (err) => {
                console.error('Error al cargar pacientes:', err);
                this.registroPacientes = [
                    {
                        nombre: 'Alfred Guillermo Gil',
                        edad: 33,
                        centroMedico: 'Clínica Abreu',
                        observaciones: 'UCI Politraumatizado',
                        status: 'hospitalizado'
                    },
                    {
                        nombre: 'Abel Guzmán',
                        edad: 0,
                        centroMedico: 'Clínica Abreu',
                        observaciones: '',
                        status: 'buscando'
                    },
                    {
                        nombre: 'Adriana De Gil',
                        edad: 0,
                        centroMedico: 'Clínica Abreu',
                        observaciones: '',
                        status: 'buscando'
                    },
                    {
                        nombre: 'Alex Augusto Martínez García',
                        edad: 36,
                        centroMedico: 'Hospiten Santo Domingo',
                        observaciones: '',
                        status: 'rescatado'
                    },
                    {
                        nombre: 'Amanda Murray',
                        edad: 42,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: '',
                        status: 'rescatado'
                    },
                    {
                        nombre: 'Ambar Montero',
                        edad: 33,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: '',
                        status: 'hospitalizado'
                    },
                    {
                        nombre: 'Ámbar Montero',
                        edad: 0,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: '',
                        status: 'buscando'
                    },
                    {
                        nombre: 'Ana María Fernández',
                        edad: 0,
                        centroMedico: 'Clínica Independencia',
                        observaciones: '',
                        status: 'buscando'
                    },
                    {
                        nombre: 'Ana Montero',
                        edad: 32,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: '',
                        status: 'rescatado'
                    },
                    {
                        nombre: 'Ana Ramirez',
                        edad: 39,
                        centroMedico: 'Hospital General de la Plaza de la Salud',
                        observaciones: 'UCI Polivalente',
                        status: 'hospitalizado'
                    },
                    {
                        nombre: 'Anastasio Peguero Concepcion',
                        edad: 56,
                        centroMedico: 'Hospital Central De las Fuerzas Armadas',
                        observaciones: '',
                        status: 'rescatado'
                    },
                    {
                        nombre: 'Anny Marisol Aybar',
                        edad: 0,
                        centroMedico: 'Hospital Regional Doctor Marcelino Vélez Santana',
                        observaciones: '',
                        status: 'buscando'
                    },
                    {
                        nombre: 'Anny Montero',
                        edad: 0,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: '',
                        status: 'buscando'
                    },
                    {
                        nombre: 'Aracelis Altagracia Santana',
                        edad: 0,
                        centroMedico: 'Centro Médico UCE',
                        observaciones: '',
                        status: 'buscando'
                    },
                    {
                        nombre: 'Berenice Enrique Baez',
                        edad: 35,
                        centroMedico: 'Hospital Central De las Fuerzas Armadas',
                        observaciones: 'Referido a otro Centro',
                        status: 'hospitalizado'
                    }
                ];
                this.extractHospitals();
                this.filterPatients();
                if (this._searchTerm) {
                    this.scrollToFirstMatch(this._searchTerm);
                }
            }
        });
    }

    extractHospitals() {
        const hospitalSet = new Set(this.registroPacientes.map((p: Paciente) => p.centroMedico).filter(h => h));
        this.hospitals = Array.from(hospitalSet).sort();
    }

    getRandomStatus(): string {
        const statuses = ['rescatado', 'hospitalizado', 'buscando'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    filterPatients() {
        this.filteredPatients = this.registroPacientes.filter(patient => {
            const matchesSearch = !this._searchTerm ||
                patient.nombre?.toLowerCase().includes(this._searchTerm.toLowerCase()) ||
                patient.centroMedico?.toLowerCase().includes(this._searchTerm.toLowerCase()) ||
                patient.observaciones?.toLowerCase().includes(this._searchTerm.toLowerCase());

            const matchesStatus = !this.selectedStatus || patient.status === this.selectedStatus;
            const matchesHospital = !this.selectedHospital || patient.centroMedico === this.selectedHospital;

            return matchesSearch && matchesStatus && matchesHospital;
        });
    }

    onSearchChange() {
        this.filterPatients();
    }

    getStatusText(patient: Paciente): string {
        const statusMap: { [key: string]: string } = {
            'rescatado': 'Rescatado',
            'hospitalizado': 'Hospitalizado',
            'buscando': 'Buscando'
        };
        return patient.status ? statusMap[patient.status] || 'Desconocido' : 'Desconocido';
    }

    getStatusBadge(patient: Paciente): string {
        const badgeMap: { [key: string]: string } = {
            'rescatado': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
            'hospitalizado': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
            'buscando': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
        };
        return patient.status ? badgeMap[patient.status] || 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800' : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
    }

    updateLastUpdate() {
        this.lastUpdate = new Date().toLocaleString('es-DO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    startAutoUpdate() {
        setInterval(() => {
            this.updateLastUpdate();
        }, 60000);
    }

    get totalPatients(): number {
        return this.registroPacientes.length;
    }

    get rescuedPatients(): number {
        return this.registroPacientes.filter(p => p.status === 'rescatado').length;
    }

    get hospitalizedPatients(): number {
        return this.registroPacientes.filter(p => p.status === 'hospitalizado').length;
    }

    get searchingPatients(): number {
        return this.registroPacientes.filter(p => p.status === 'buscando').length;
    }

    scrollToFirstMatch(searchTerm: string) {
        if (!searchTerm || !this.table) return;

        setTimeout(() => {
            const tableElement = this.table.el.nativeElement;
            const scrollContainer = tableElement.querySelector('.p-datatable-scrollable-body');

            if (!scrollContainer) return;

            const tableRect = tableElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const offset = tableRect.top + window.scrollY - (windowHeight / 2) + (tableRect.height / 2);

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });

            const firstMatchIndex = this.filteredPatients.findIndex(paciente =>
                paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (firstMatchIndex !== -1) {
                const row = scrollContainer.querySelector(`tr[id='row-${firstMatchIndex}']`);
                if (row) {
                    const rowOffset = row.offsetTop - scrollContainer.offsetTop;
                    const scrollContainerHeight = scrollContainer.clientHeight;
                    const rowHeight = row.offsetHeight;

                    scrollContainer.scrollTo({
                        top: rowOffset - (scrollContainerHeight / 2) + (rowHeight / 2),
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    }
}
