import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClient } from '@angular/common/http';

interface Paciente {
    id?: string;
    nombre: string;
    edad: number;
    centroMedico: string;
    observaciones: string;
}

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        DialogModule,
        ConfirmDialogModule
    ],
    template: `
        <div class="p-4">
            <div class="mb-4">
                <button pButton label="Nuevo Paciente" icon="pi pi-plus" class="p-button-secondary" (click)="openNew()"></button>
            </div>

            <p-table
                #dt
                [value]="pacientes()"
                [rows]="10"
                [paginator]="true"
                [tableStyle]="{ 'min-width': '50rem' }"
                [rowHover]="true"
                dataKey="id"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Centro Médico</th>
                        <th>Observaciones</th>
                        <th>Acciones</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-paciente>
                    <tr>
                        <td>{{ paciente.nombre }}</td>
                        <td>{{ paciente.edad }}</td>
                        <td>{{ paciente.centroMedico }}</td>
                        <td>{{ paciente.observaciones }}</td>
                        <td>
                            <button pButton icon="pi pi-pencil" class="p-button-rounded p-button-text mr-2" (click)="editPaciente(paciente)"></button>
                            <button pButton icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" (click)="deletePaciente(paciente)"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>

            <p-dialog [(visible)]="pacienteDialog" [style]="{ width: '450px' }" header="Detalles del Paciente" [modal]="true">
                <div class="flex flex-col gap-4">
                    <div>
                        <label for="nombre" class="block font-bold mb-2">Nombre</label>
                        <input pInputText id="nombre" [(ngModel)]="paciente.nombre" required class="w-full" />
                    </div>
                    <div>
                        <label for="edad" class="block font-bold mb-2">Edad</label>
                        <input pInputText id="edad" type="number" [(ngModel)]="paciente.edad" required class="w-full" />
                    </div>
                    <div>
                        <label for="centroMedico" class="block font-bold mb-2">Centro Médico</label>
                        <input pInputText id="centroMedico" [(ngModel)]="paciente.centroMedico" required class="w-full" />
                    </div>
                    <div>
                        <label for="observaciones" class="block font-bold mb-2">Observaciones</label>
                        <input pInputText id="observaciones" [(ngModel)]="paciente.observaciones" class="w-full" />
                    </div>
                </div>
                <ng-template pTemplate="footer">
                    <button pButton label="Cancelar" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
                    <button pButton label="Guardar" icon="pi pi-check" (click)="savePaciente()"></button>
                </ng-template>
            </p-dialog>

            <p-confirmDialog [style]="{ width: '450px' }" />
        </div>
    `,
    providers: [MessageService, ConfirmationService, HttpClient]
})
export class Crud implements OnInit {
    pacienteDialog: boolean = false;
    pacientes = signal<Paciente[]>([]);
    paciente: Paciente = { nombre: '', edad: 0, centroMedico: '', observaciones: '' };
    submitted: boolean = false;
    private apiUrl = 'http://localhost:3000/pacientes';

    @ViewChild('dt') dt!: Table;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.loadPacientes();
    }

    loadPacientes() {
        this.http.get<Paciente[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.pacientes.set(data);
            },
            error: (err) => {
                console.error('Error al cargar pacientes:', err);
                this.pacientes.set([]);
            }
        });
    }

    openNew() {
        this.paciente = { nombre: '', edad: 0, centroMedico: '', observaciones: '' };
        this.submitted = false;
        this.pacienteDialog = true;
    }

    editPaciente(paciente: Paciente) {
        this.paciente = { ...paciente };
        this.pacienteDialog = true;
    }

    deletePaciente(paciente: Paciente) {
        this.confirmationService.confirm({
            message: '¿Seguro que quieres eliminar a ' + paciente.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const updatedPacientes = this.pacientes().filter(p => p.id !== paciente.id);
                this.saveToBackend(updatedPacientes);
            }
        });
    }

    hideDialog() {
        this.pacienteDialog = false;
        this.submitted = false;
    }

    savePaciente() {
        this.submitted = true;
        
        if (this.paciente.nombre.trim() && this.paciente.edad && this.paciente.centroMedico) {
            const pacientesArray = [...this.pacientes()];
            
            if (this.paciente.id) {
                const index = this.findIndexById(this.paciente.id);
                pacientesArray[index] = this.paciente;
            } else {
                this.paciente.id = this.createId();
                pacientesArray.push(this.paciente);
            }

            this.saveToBackend(pacientesArray);
        }
    }

    saveToBackend(updatedPacientes: Paciente[]) {
        this.http.post(this.apiUrl, updatedPacientes).subscribe({
            next: () => {
                this.pacientes.set(updatedPacientes);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: this.paciente.id ? 'Paciente Actualizado' : 'Paciente Creado',
                    life: 3000
                });
                this.pacienteDialog = false;
                this.paciente = { nombre: '', edad: 0, centroMedico: '', observaciones: '' };
            },
            error: (err) => {
                console.error('Error al guardar:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo guardar los cambios',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        return this.pacientes().findIndex(p => p.id === id);
    }

    createId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}