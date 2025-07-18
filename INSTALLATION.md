# 🛠️ Guía de Instalación y Configuración - CatastrofeAlert

<div align="center">
  <img src="src/assets/img/emergenciado.svg" alt="CatastrofeAlert Logo" width="150"/>
  <h3>Guía paso a paso para instalar y configurar CatastrofeAlert</h3>
</div>

## 📋 Índice

- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Entornos](#-entornos)
- [Solución de Problemas](#-solución-de-problemas)
- [Preguntas Frecuentes](#-preguntas-frecuentes)

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

| Requisito | Versión Mínima | Versión Recomendada | Comando para Verificar |
|-----------|----------------|---------------------|------------------------|
| Node.js   | 16.x           | 18.x                | `node --version`       |
| npm       | 8.x            | 9.x                 | `npm --version`        |
| Angular CLI | 19.x         | 19.x                | `ng version`           |
| Git       | 2.x            | 2.x                 | `git --version`        |

### Instalación de Dependencias Globales

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli

# Verificar la instalación
ng version
```

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
# Usando HTTPS
git clone https://github.com/tu-usuario/CatastrofeAlert.git

# O usando SSH
git clone git@github.com:tu-usuario/CatastrofeAlert.git

# Acceder al directorio del proyecto
cd CatastrofeAlert
```

### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias del proyecto
npm install

# O si prefieres usar yarn
yarn install
```

### 3. Verificar la Instalación

```bash
# Verificar que todas las dependencias se instalaron correctamente
npm ls --depth=0
```

## ⚙️ Configuración

### Configuración de Entornos

El proyecto utiliza archivos de entorno para manejar diferentes configuraciones:

1. **Abre y edita los archivos de entorno según sea necesario:**

```typescript
// src/environments/environment.ts (desarrollo)
export const environment = {
  production: false,
  mockLogin: true,
  apiUrl: 'http://localhost:3000',
  // Otras variables...
};

// src/environments/environment.prod.ts (producción)
export const environment = {
  production: true,
  mockLogin: false,
  apiUrl: 'https://api.catastrofealert.com',
  // Otras variables...
};
```

### Configuración de API Mock (Opcional)

Si deseas utilizar datos simulados sin necesidad de un backend:

1. **Mantén la configuración `mockLogin: true` en el archivo de entorno**
2. **Las credenciales de prueba son:**
   - Usuario: `emergencydo@admin.com`
   - Contraseña: `emergencydoQA123`

### Configuración de Tailwind CSS

El proyecto utiliza Tailwind CSS para los estilos:

1. **Verifica que el archivo de configuración esté presente:**

```bash
# Debe existir el archivo
cat tailwind.config.js
```

2. **Personaliza los temas según sea necesario:**

```javascript
// tailwind.config.js
module.exports = {
  // Configuración existente...
  theme: {
    extend: {
      colors: {
        // Personaliza los colores aquí
      }
    }
  }
}
```

## ▶️ Ejecución

### Iniciar el Servidor de Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm start

# O usando el comando directo de Angular CLI
ng serve
```

El servidor se iniciará en `http://localhost:4200` por defecto.

### Opciones de Ejecución

```bash
# Iniciar con un puerto específico
ng serve --port=4201

# Abrir automáticamente en el navegador
ng serve --open

# Usar un entorno específico
ng serve --configuration=production
```

### Compilar para Producción

```bash
# Compilar el proyecto para producción
npm run build

# O usando el comando directo de Angular CLI
ng build --configuration=production
```

Los archivos compilados se generarán en el directorio `dist/`.

## 🌐 Entornos

### Desarrollo

Entorno local para desarrollo activo:

```bash
ng serve
```

### Pruebas

Entorno para pruebas y QA:

```bash
ng serve --configuration=staging
```

### Producción

Compilación optimizada para producción:

```bash
ng build --configuration=production
```

## 🔧 Solución de Problemas

### Problemas Comunes y Soluciones

#### Error: Cannot find module '@angular/core'

**Solución:** Reinstala las dependencias

```bash
rm -rf node_modules
npm install
```

#### Error: Port 4200 is already in use

**Solución:** Usa un puerto diferente

```bash
ng serve --port=4201
```

#### Error: Cannot read property 'subscribe' of undefined

**Solución:** Verifica que los servicios estén correctamente inyectados y que los observables estén inicializados.

### Verificación de Dependencias

Si encuentras problemas con las dependencias:

```bash
# Verificar dependencias obsoletas
npm outdated

# Actualizar dependencias
npm update
```

## ❓ Preguntas Frecuentes

### ¿Cómo cambiar el puerto predeterminado?

Modifica el archivo `angular.json`:

```json
{
  "projects": {
    "CatastrofeAlert": {
      "architect": {
        "serve": {
          "options": {
            "port": 4201
          }
        }
      }
    }
  }
}
```

### ¿Cómo configurar un backend real?

1. Clona el repositorio del backend:

```bash
git clone https://github.com/Solvealgoritms22/CatasfrofeAlertBackend.git
cd CatasfrofeAlertBackend
# Sigue las instrucciones de instalación del backend
```

2. Configura la URL de la API en el archivo de entorno:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  mockLogin: false,
  apiUrl: 'http://localhost:3000', // O la URL donde esté ejecutándose tu backend
};
```

3. Asegúrate de que el backend implemente los endpoints necesarios:
   - `/auth/login`
   - `/auth/user`
   - `/pacientes`

### ¿Cómo añadir un nuevo idioma?

1. Crea un nuevo archivo de traducción en `src/assets/i18n/`:

```json
// src/assets/i18n/fr.json
{
  "SEARCH": {
    "TITLE": "Trouvez vos proches",
    "PLACEHOLDER": "Écrivez un nom...",
    "BUTTON": "Rechercher"
  }
}
```

2. Añade el nuevo idioma al selector de idiomas en el componente correspondiente.

---

<div align="center">
  <p>
    <strong>¿Necesitas más ayuda?</strong><br>
    Abre un issue en el <a href="https://github.com/tu-usuario/CatastrofeAlert/issues">repositorio</a> o contacta al equipo de desarrollo.
  </p>
</div>