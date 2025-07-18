# 📚 Documentación Técnica - CatastrofeAlert

<div align="center">
  <img src="src/assets/img/emergenciado.svg" alt="CatastrofeAlert Logo" width="150"/>
</div>

## 📋 Índice

- [Arquitectura](#-arquitectura)
- [Componentes Principales](#-componentes-principales)
- [Flujo de Datos](#-flujo-de-datos)
- [Autenticación y Seguridad](#-autenticación-y-seguridad)
- [Internacionalización](#-internacionalización)
- [Estado Global](#-estado-global)
- [Guía de Estilo](#-guía-de-estilo)
- [Optimización](#-optimización)
- [Pruebas](#-pruebas)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)

## 🏗️ Arquitectura

### Visión General

CatastrofeAlert está construido siguiendo una arquitectura modular basada en componentes, utilizando Angular como framework principal. La aplicación sigue el patrón de diseño de Arquitectura Limpia (Clean Architecture), separando claramente las responsabilidades en capas:

```
┌─────────────────────────────────────┐
│            Presentación             │
│  (Componentes, Páginas, Directivas) │
├─────────────────────────────────────┤
│              Aplicación             │
│        (Servicios, Guardias)        │
├─────────────────────────────────────┤
│               Dominio               │
│         (Modelos, Interfaces)       │
├─────────────────────────────────────┤
│            Infraestructura          │
│     (API, Interceptores, Store)     │
└─────────────────────────────────────┘
```

### Principios de Diseño

- **Modularidad**: Componentes independientes y reutilizables
- **Responsabilidad Única**: Cada componente tiene una única responsabilidad
- **Separación de Preocupaciones**: Clara división entre presentación, lógica y datos
- **Reactividad**: Uso de Observables para manejar flujos de datos asincrónicos

## 🧩 Componentes Principales

### Landing Page

La página de inicio presenta una interfaz intuitiva para la búsqueda de personas afectadas:

- **HeroWidget**: Componente principal con buscador prominente
- **FeaturesWidget**: Muestra la tabla de resultados de búsqueda
- **FloatingCustomersCarouselComponent**: Carrusel de logos de entidades colaboradoras

```typescript
@Component({
    selector: 'app-landing',
    template: `
        <div [ngClass]="{'dark': isDarkTheme()}" class="bg-surface-0 dark:bg-surface-900">
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget></topbar-widget>
                <hero-widget (searchEvent)="onSearch($event)"></hero-widget>
                <features-widget [searchTerm]="currentSearch"></features-widget>
                <footer-widget></footer-widget>
            </div>
        </div>
    `
})
export class Landing implements OnInit {
    // Implementación...
}
```

### Sistema de Búsqueda

El sistema de búsqueda permite localizar rápidamente información sobre personas afectadas:

- **Búsqueda en tiempo real**: Filtrado instantáneo de resultados
- **Resaltado automático**: Desplazamiento automático al primer resultado
- **Interfaz adaptativa**: Diseño responsivo para cualquier dispositivo

```typescript
// Ejemplo de método de filtrado
filterPatients(searchTerm: string) {
    if (!searchTerm) {
        this.filteredPatients = [...this.registroPacientes];
        return;
    }
    this.filteredPatients = this.registroPacientes.filter(paciente => 
        paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
}
```

### Panel de Administración

El panel de administración proporciona herramientas para la gestión de la información:

- **Dashboard**: Visualización de estadísticas y métricas
- **Gestión de Usuarios**: Control de acceso y permisos
- **Administración de Datos**: CRUD para entidades principales

## 📊 Flujo de Datos

### Diagrama de Flujo

```
┌──────────┐    ┌───────────┐    ┌─────────────┐    ┌──────────┐
│ Usuario  │───>│ Componente│───>│  Servicio   │───>│   API    │
└──────────┘    └───────────┘    └─────────────┘    └──────────┘
                      │                 ▲                 │
                      │                 │                 │
                      ▼                 │                 ▼
                ┌──────────┐      ┌──────────┐      ┌──────────┐
                │  Store   │<─────│ Efectos  │<─────│ Respuesta│
                └──────────┘      └──────────┘      └──────────┘
                      │
                      ▼
                ┌──────────┐
                │  Vista   │
                └──────────┘
```

### Integración con Backend

La aplicación se integra con el backend disponible en [https://github.com/Solvealgoritms22/CatasfrofeAlertBackend](https://github.com/Solvealgoritms22/CatasfrofeAlertBackend) para obtener y procesar datos en tiempo real sobre personas afectadas en situaciones de emergencia.

### Comunicación entre Componentes

La comunicación entre componentes se realiza mediante:

1. **Input/Output**: Para comunicación padre-hijo
2. **Servicios**: Para comunicación entre componentes no relacionados
3. **Store (NgRx)**: Para estado global compartido

## 🔐 Autenticación y Seguridad

### Sistema de Autenticación

La aplicación implementa un sistema de autenticación basado en tokens JWT:

- **Login**: Autenticación mediante credenciales
- **Interceptor HTTP**: Inyección automática de token en peticiones
- **Guards**: Protección de rutas según roles y permisos

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    
    return next.handle(req);
  }
}
```

### Seguridad

- **Sanitización de Datos**: Prevención de ataques XSS
- **CSRF Protection**: Protección contra falsificación de solicitudes
- **Validación de Entradas**: Verificación de datos de usuario

## 🌐 Internacionalización

La aplicación soporta múltiples idiomas mediante NGX-Translate:

- **Archivos de Traducción**: JSON con pares clave-valor
- **Selector de Idioma**: Componente para cambiar el idioma
- **Detección Automática**: Configuración según preferencias del navegador

```typescript
// Ejemplo de archivo de traducción (es.json)
{
  "SEARCH": {
    "TITLE": "Encuentra a tus seres queridos",
    "PLACEHOLDER": "Escribe un nombre...",
    "BUTTON": "Buscar"
  }
}
```

## 🔄 Estado Global

### NgRx Store

La gestión del estado global se realiza con NgRx:

- **Store**: Almacén centralizado de estado
- **Actions**: Eventos que describen cambios de estado
- **Reducers**: Funciones puras que actualizan el estado
- **Effects**: Manejo de operaciones asíncronas
- **Selectors**: Consultas para obtener datos del estado

```typescript
// Ejemplo de selector
export const selectAllPatients = createSelector(
  selectPatientsState,
  (state) => state.patients
);

// Ejemplo de efecto
loadPatients$ = createEffect(() => this.actions$.pipe(
  ofType(loadPatients),
  mergeMap(() => this.patientsService.getAll().pipe(
    map(patients => loadPatientsSuccess({ patients })),
    catchError(error => of(loadPatientsFailure({ error })))
  ))
));
```

## 🎨 Guía de Estilo

### Diseño Visual

La interfaz de usuario sigue un diseño moderno y accesible:

- **Sistema de Diseño**: Basado en PrimeNG y personalizado con Tailwind CSS
- **Tema Oscuro/Claro**: Soporte para ambos modos con cambio dinámico
- **Componentes Consistentes**: Biblioteca de componentes reutilizables

### Convenciones de Código

- **Nomenclatura**: camelCase para variables y métodos, PascalCase para clases
- **Estructura de Archivos**: Organización por funcionalidad y tipo
- **Comentarios**: Documentación de código compleja o no obvia
- **Linting**: ESLint con reglas personalizadas para mantener consistencia

## ⚡ Optimización

### Rendimiento

- **Lazy Loading**: Carga diferida de módulos
- **Tree Shaking**: Eliminación de código no utilizado
- **Optimización de Imágenes**: Compresión y carga progresiva
- **Memorización**: Caché de resultados de operaciones costosas

### Accesibilidad

- **ARIA**: Atributos para lectores de pantalla
- **Contraste**: Colores con suficiente contraste
- **Navegación por Teclado**: Soporte completo para uso sin ratón
- **Textos Alternativos**: Descripciones para elementos visuales

## 🧪 Pruebas

### Estrategia de Pruebas

- **Unitarias**: Pruebas de componentes y servicios aislados
- **Integración**: Pruebas de interacción entre componentes
- **E2E**: Pruebas de flujos completos de usuario

```typescript
// Ejemplo de prueba unitaria
describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should authenticate with correct credentials', async () => {
    const result = await service.login('emergencydo@admin.com', 'emergencydoQA123');
    expect(result).toBeTrue();
    expect(service.isLoggedIn).toBeTrue();
  });
});
```

## 🚀 Despliegue

### Entornos

- **Desarrollo**: Servidor local para desarrollo activo
- **Pruebas**: Entorno para QA y pruebas de integración
- **Producción**: Entorno optimizado para usuarios finales

### Proceso de Despliegue

1. **Construcción**: Generación de artefactos optimizados
2. **Pruebas**: Verificación de calidad y rendimiento
3. **Despliegue**: Publicación en servidor de producción
4. **Monitoreo**: Seguimiento de rendimiento y errores

```bash
# Construcción para producción
npm run build

# Despliegue en Vercel
vercel --prod
```

## 👥 Contribución

### Flujo de Trabajo

1. **Fork**: Crear una copia del repositorio
2. **Branch**: Crear una rama para la nueva funcionalidad
3. **Commit**: Realizar cambios siguiendo las convenciones
4. **Pull Request**: Solicitar la integración de los cambios
5. **Review**: Revisión de código por pares
6. **Merge**: Integración en la rama principal

### Convenciones de Commits

Seguimos el estándar de Conventional Commits:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Cambios en documentación
- `style`: Cambios de formato
- `refactor`: Refactorización de código
- `test`: Adición o corrección de pruebas
- `chore`: Tareas de mantenimiento

---

<div align="center">
  <p>
    <strong>CatastrofeAlert</strong> - Desarrollado con ❤️ para salvar vidas
  </p>
</div>