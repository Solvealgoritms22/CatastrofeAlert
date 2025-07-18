# 🤝 Guía de Contribución - CatastrofeAlert

<div align="center">
  <img src="src/assets/img/emergenciado.svg" alt="CatastrofeAlert Logo" width="150"/>
  <h3>¡Gracias por tu interés en contribuir a CatastrofeAlert!</h3>
</div>

## 📋 Índice

- [Código de Conducta](#-código-de-conducta)
- [Cómo Puedo Contribuir](#-cómo-puedo-contribuir)
- [Flujo de Trabajo](#-flujo-de-trabajo)
- [Estilo de Código](#-estilo-de-código)
- [Commits y Mensajes](#-commits-y-mensajes)
- [Pull Requests](#-pull-requests)
- [Reportar Bugs](#-reportar-bugs)
- [Sugerir Mejoras](#-sugerir-mejoras)
- [Preguntas](#-preguntas)

## 📜 Código de Conducta

Este proyecto y todos sus participantes están regidos por nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que respetes este código. Por favor, reporta comportamientos inaceptables a [contacto@catastrofealert.com](mailto:contacto@catastrofealert.com).

## 🚀 Cómo Puedo Contribuir

Hay muchas formas de contribuir a CatastrofeAlert:

### 👨‍💻 Desarrollo de Código

- Implementar nuevas características
- Corregir bugs
- Mejorar el rendimiento
- Refactorizar código existente

### 📝 Documentación

- Mejorar la documentación existente
- Traducir documentación
- Crear tutoriales o guías
- Documentar APIs

### 🧪 Pruebas

- Escribir pruebas unitarias
- Realizar pruebas manuales
- Reportar bugs encontrados
- Mejorar la cobertura de pruebas

### 🎨 Diseño

- Mejorar la interfaz de usuario
- Crear recursos gráficos
- Optimizar la experiencia de usuario
- Mejorar la accesibilidad

## 🔄 Flujo de Trabajo

Seguimos un flujo de trabajo basado en Git Flow:

### 1. Preparación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/CatastrofeAlert.git

# Acceder al directorio
cd CatastrofeAlert

# Instalar dependencias
npm install
```

### 2. Crear una Rama

```bash
# Actualizar la rama principal
git checkout main
git pull origin main

# Crear una nueva rama para tu contribución
git checkout -b tipo/descripcion-corta

# Ejemplos:
# git checkout -b feature/sistema-notificaciones
# git checkout -b fix/error-autenticacion
# git checkout -b docs/guia-instalacion
```

Tipos de ramas recomendados:
- `feature/` - Para nuevas características
- `fix/` - Para correcciones de bugs
- `docs/` - Para cambios en documentación
- `refactor/` - Para refactorizaciones de código
- `test/` - Para añadir o mejorar pruebas

### 3. Desarrollar

```bash
# Realizar cambios en el código
# ...

# Ejecutar pruebas para verificar que todo funciona
npm test

# Ejecutar linting para asegurar calidad de código
npm run lint
```

### 4. Commit y Push

```bash
# Añadir cambios
git add .

# Realizar commit (ver sección de mensajes de commit)
git commit -m "feat: implementa sistema de notificaciones en tiempo real"

# Subir cambios a tu fork
git push origin tipo/descripcion-corta
```

### 5. Pull Request

- Crea un Pull Request desde tu rama a la rama `main` del repositorio original
- Completa la plantilla de Pull Request
- Espera la revisión de los mantenedores

## 💻 Estilo de Código

Seguimos un conjunto de reglas de estilo para mantener la consistencia en el código:

### TypeScript/JavaScript

- Usamos [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/) para el formato de código
- La configuración está en los archivos `.eslintrc.json` y `.prettierrc.json`

```typescript
// ✅ Correcto
function calculateTotal(items: Item[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

// ❌ Incorrecto
function calculate_total( items:Item[] )
{
  return items.reduce((t,i)=>t+i.price,0)
}
```

### HTML/CSS

- Usamos clases de Tailwind CSS para estilos
- Mantenemos el HTML semántico y accesible

```html
<!-- ✅ Correcto -->
<button 
  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" 
  aria-label="Buscar personas"
>
  Buscar
</button>

<!-- ❌ Incorrecto -->
<div onclick="search()" class="btn">Buscar</div>
```

### Componentes Angular

- Un componente por archivo
- Nombres descriptivos
- Documentación con JSDoc

```typescript
/**
 * Componente que muestra la información de un paciente
 * y permite actualizar su estado.
 */
@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {
  @Input() patient: Patient;
  @Output() statusChange = new EventEmitter<PatientStatus>();
  
  // ...
}
```

## 📝 Commits y Mensajes

Seguimos la convención de [Conventional Commits](https://www.conventionalcommits.org/) para los mensajes de commit:

```
<tipo>[alcance opcional]: <descripción>

[cuerpo opcional]

[pie opcional]
```

### Tipos de Commit

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el significado del código (espacios, formato, etc.)
- `refactor`: Cambios en el código que no corrigen bugs ni añaden características
- `perf`: Cambios que mejoran el rendimiento
- `test`: Añadir o corregir pruebas
- `build`: Cambios en el sistema de build o dependencias externas
- `ci`: Cambios en la configuración de CI
- `chore`: Otros cambios que no modifican código ni pruebas

### Ejemplos

```
feat(auth): implementa autenticación con Google

Añade la capacidad de iniciar sesión con cuentas de Google
usando OAuth 2.0.

Closes #123
```

```
fix: corrige error en la búsqueda de pacientes

El filtro de búsqueda no funcionaba correctamente con nombres
que contienen caracteres especiales.
```

## 🔍 Pull Requests

### Plantilla de Pull Request

Cada Pull Request debe incluir:

1. **Descripción clara** de los cambios realizados
2. **Motivación y contexto** de por qué son necesarios
3. **Capturas de pantalla** si aplica (para cambios visuales)
4. **Pasos para probar** los cambios
5. **Tipo de cambio** (nueva característica, corrección, etc.)
6. **Lista de verificación** completada

### Proceso de Revisión

1. Los mantenedores revisarán tu PR
2. Se pueden solicitar cambios o aclaraciones
3. Una vez aprobado, se realizará el merge

## 🐛 Reportar Bugs

Si encuentras un bug, por favor crea un issue siguiendo estos pasos:

1. **Verifica** que el bug no haya sido reportado antes
2. **Usa la plantilla** de reporte de bugs
3. **Describe claramente** el problema
4. **Incluye pasos** para reproducirlo
5. **Añade capturas de pantalla** si es posible
6. **Menciona tu entorno** (navegador, SO, etc.)

## 💡 Sugerir Mejoras

Para sugerir mejoras:

1. **Verifica** que la idea no haya sido sugerida antes
2. **Usa la plantilla** de sugerencias
3. **Describe claramente** tu idea
4. **Explica por qué** sería beneficiosa
5. **Proporciona ejemplos** si es posible

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir:

1. **Revisa la documentación** existente
2. **Busca en los issues** por preguntas similares
3. **Pregunta en las discusiones** del repositorio
4. **Contacta al equipo** en [contacto@catastrofealert.com](mailto:contacto@catastrofealert.com)

---

<div align="center">
  <p>
    <strong>¡Gracias por hacer de CatastrofeAlert un mejor proyecto!</strong><br>
    Tu contribución marca la diferencia en nuestra misión de ayudar en situaciones de emergencia.
  </p>
</div>