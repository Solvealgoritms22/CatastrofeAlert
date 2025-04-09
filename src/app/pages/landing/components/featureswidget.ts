import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';

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
                class="p-datatable-gridlines p-datatable-sm">
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
            </p-table>

            <div class="mt-28">
                <h2 class="text-xl font-bold mb-2 text-center">Video en Vivo del Suceso</h2>
                <div class="flex justify-center">
                    <div class="relative" style="width: 100%; max-width: 1200px; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 1rem;">
                        <iframe
                            class="absolute top-0 left-0 w-full h-full rounded-lg"
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
export class FeaturesWidget {
    @ViewChild('dt') table!: Table;

    @Input() set searchTerm(value: string) {
        this.filterPatients(value);
        if (value) {
            this.scrollToFirstMatch(value);
        }
    }
    registroPacientes = [
        {
            nombre: 'Alfred Guillermo Gil',
            edad: 33,
            centroMedico: 'Clínica Abreu',
            observaciones: 'UCI Politraumatizado'
        },
        {
            nombre: 'María Martínez García',
            edad: 36,
            centroMedico: 'Clínica Abreu',
            observaciones: 'Ingreso'
        },
        {
            nombre: 'Adolf Murray',
            edad: 42,
            centroMedico: 'Hospital Traumatológico Dr. Ney Arias Lora',
            observaciones: 'Referido a otro Centro'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        },
        {
            nombre: 'Paola Sánchez',
            edad: 25,
            centroMedico: 'Hospital Docente Dr. Darío Contreras',
            observaciones: 'Atención Médica UCI'
        }
        // ... Agregar más registros según sea necesario
    ];

    filteredPatients = [...this.registroPacientes];

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
        setTimeout(() => {
            const firstMatchIndex = this.registroPacientes.findIndex(paciente =>
                paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (firstMatchIndex !== -1 && this.table) {
                // Usamos el scroll nativo de PrimeNG Table
                const scrollableBody = this.table.el.nativeElement.querySelector('.p-datatable-scrollable-body');
                const row = scrollableBody.querySelector(`tr[id='row-${firstMatchIndex}']`);
                
                if (row) {
                    row.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        }, 200); // Aumentamos el timeout para asegurar que la tabla esté renderizada
    }
}