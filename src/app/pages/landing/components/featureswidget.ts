import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Paciente {
    id?: string;
    nombre: string;
    edad: number;
    centroMedico: string;
    observaciones: string;
}

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule, TableModule],
    template: `
        <div class="p-4">
            <div class="flex justify-center items-center mb-2">
                <img src="https://daeh.gob.do/wp-content/uploads/2023/04/logo-daeh-00.png" alt="DAFH Logo" style="width:250px;" />
            </div>

            <h2 class="text-xl font-bold mb-2 text-center">TIPIFICADO: Rescate</h2>
            <p class="mb-6 text-center">Personal de la unidad reporta que se trata del derrumbe del techo de la discoteca Jet Set, donde están reportándose personas atrapadas y fallecidas.</p>

            <p-table 
                #dt
                [value]="filteredPatients" 
                [rows]="10" 
                scrollable="true" 
                scrollHeight="400px" 
                class="p-datatable-gridlines p-datatable-sm -z-10">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Centro Médico</th>
                        <th>Observaciones</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-paciente let-rowIndex="rowIndex">
                    <tr [attr.id]="'row-' + rowIndex">
                        <td>{{ paciente.nombre }}</td>
                        <td>{{ paciente.edad }}</td>
                        <td>{{ paciente.centroMedico }}</td>
                        <td>{{ paciente.observaciones }}</td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="4" class="text-center py-12">No hay datos</td>
                    </tr>
                </ng-template>
            </p-table><br>

            <div class="mt-28">
                <h2 class="text-xl font-bold mb-2 text-center">Video en Vivo del Suceso</h2>
                <div class="flex justify-center">
                    <div class="relative" style="width: 100%; max-width: 1200px; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 1rem;">
                        <iframe
                            class="absolute top-0 left-0 w-full h-[600px] rounded-lg"
                            src="https://www.youtube-nocookie.com/embed/eQ8YjRSJFvM"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        >
                        </iframe>
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
        this.filterPatients(value);
        this.scrollToFirstMatch(value); // Ejecutamos el scroll inmediatamente
    }

    registroPacientes: Paciente[] = [];
    filteredPatients: Paciente[] = [];
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadPacientes();
    }

    loadPacientes() {
        this.http.get<Paciente[]>(`${this.apiUrl}/pacientes`).subscribe({
            next: (data) => {
                this.registroPacientes = data;
                this.filteredPatients = [...data];
                // Aplicar filtro inicial si hay searchTerm
                if (this._searchTerm) {
                    this.filterPatients(this._searchTerm);
                    this.scrollToFirstMatch(this._searchTerm);
                }
            },
            error: (err) => {
                console.error('Error al cargar pacientes:', err);
                // Datos por defecto en caso de error
                this.registroPacientes = [
                    {
                        nombre: 'Alfred Guillermo Gil',
                        edad: 33,
                        centroMedico: 'Clínica Abreu',
                        observaciones: 'UCI Politraumatizado'
                    },
                    {
                        nombre: 'Abel Guzmán',
                        edad: 0,
                        centroMedico: 'Clínica Abreu',
                        observaciones: ''
                    },
                    {
                        nombre: 'Adriana De Gil',
                        edad: 0,
                        centroMedico: 'Clínica Abreu',
                        observaciones: ''
                    },
                    {
                        nombre: 'Alex Augusto Martínez García',
                        edad: 36,
                        centroMedico: 'Hospiten Santo Domingo',
                        observaciones: ''
                    },
                    {
                        nombre: 'Amanda Murray',
                        edad: 42,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: ''
                    },
                    {
                        nombre: 'Ambar Montero',
                        edad: 33,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: ''
                    },
                    {
                        nombre: 'Ámbar Montero',
                        edad: 0,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: ''
                    },
                    {
                        nombre: 'Ana María Fernández',
                        edad: 0,
                        centroMedico: 'Clínica Independencia',
                        observaciones: ''
                    },
                    {
                        nombre: 'Ana Montero',
                        edad: 32,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: ''
                    },
                    {
                        nombre: 'Ana Ramirez',
                        edad: 39,
                        centroMedico: 'Hospital General de la Plaza de la Salud',
                        observaciones: 'UCI Polivalente'
                    },
                    {
                        nombre: 'Anastasio Peguero Concepcion',
                        edad: 56,
                        centroMedico: 'Hospital Central De las Fuerzas Armadas',
                        observaciones: ''
                    },
                    {
                        nombre: 'Anny Marisol Aybar',
                        edad: 0,
                        centroMedico: 'Hospital Regional Doctor Marcelino Vélez Santana, Hospital Central de las Fuerzas Armadas',
                        observaciones: ''
                    },
                    {
                        nombre: 'Anny Montero',
                        edad: 0,
                        centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
                        observaciones: ''
                    },
                    {
                        nombre: 'Aracelis Altagracia Santana',
                        edad: 0,
                        centroMedico: 'Centro Médico UCE',
                        observaciones: ''
                    },
                    {
                        nombre: 'Berenice Enrique Baez',
                        edad: 35,
                        centroMedico: 'Hospital Central De las Fuerzas Armadas',
                        observaciones: 'Referido a otro Centro'
                    }
                    
                    
                    
                ];
                this.filteredPatients = [...this.registroPacientes];
                if (this._searchTerm) {
                    this.filterPatients(this._searchTerm);
                    this.scrollToFirstMatch(this._searchTerm);
                }
            }
        });
    }

    filterPatients(searchTerm: string) {
        if (!searchTerm) {
            this.filteredPatients = [...this.registroPacientes];
            return;
        }
        this.filteredPatients = this.registroPacientes.filter(paciente => 
            paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    scrollToFirstMatch(searchTerm: string) {
        if (!searchTerm || !this.table) return;

        // Usamos setTimeout con un pequeño retraso para asegurar el renderizado
        setTimeout(() => {
            const tableElement = this.table.el.nativeElement;
            const scrollContainer = tableElement.querySelector('.p-datatable-scrollable-body');
            
            if (!scrollContainer) return;

            // Calculamos la posición de la tabla respecto al documento
            const tableRect = tableElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const offset = tableRect.top + window.scrollY - (windowHeight / 2) + (tableRect.height / 2);

            // Primero hacemos scroll a la tabla, centrándola en la ventana
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });

            // Luego hacemos scroll al primer resultado dentro de la tabla
            const firstMatchIndex = this.filteredPatients.findIndex(paciente =>
                paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (firstMatchIndex !== -1) {
                const row = scrollContainer.querySelector(`tr[id='row-${firstMatchIndex}']`);
                if (row) {
                    // Calculamos la posición exacta de la fila dentro del contenedor
                    const rowOffset = row.offsetTop - scrollContainer.offsetTop;
                    const scrollContainerHeight = scrollContainer.clientHeight;
                    const rowHeight = row.offsetHeight;
                    
                    // Centramos la fila en el contenedor scrollable
                    scrollContainer.scrollTo({
                        top: rowOffset - (scrollContainerHeight / 2) + (rowHeight / 2),
                        behavior: 'smooth'
                    });
                }
            }
        }, 100); // Pequeño retraso para asegurar que el DOM esté listo
    }
}