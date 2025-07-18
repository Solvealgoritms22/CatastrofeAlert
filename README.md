# 🚨 CatastrofeAlert

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Angular](https://img.shields.io/badge/Angular-19.0.0-red.svg)
![PrimeNG](https://img.shields.io/badge/PrimeNG-19.0.8-orange.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue.svg)

<div align="center">
  <img src="src/assets/img/emergenciado.svg" alt="CatastrofeAlert Logo" width="200"/>
  <h3>Plataforma de Respuesta a Emergencias y Catástrofes</h3>
</div>

## 📋 Índice

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [API](#-api)
- [Colaboradores](#-colaboradores)
- [Licencia](#-licencia)

## 📝 Descripción

**CatastrofeAlert** es una plataforma web diseñada para facilitar la respuesta rápida y eficiente ante situaciones de emergencia y catástrofes. Permite la coordinación entre diferentes entidades de rescate, proporciona información en tiempo real sobre personas afectadas y ofrece herramientas para la localización de personas desaparecidas.

> 💡 **Misión**: Conectar a las personas con información vital durante situaciones de emergencia, facilitando la reunificación familiar y la coordinación de recursos de ayuda.

## ✨ Características

### 🔍 Búsqueda de Personas
- **Búsqueda Instantánea**: Localiza rápidamente información sobre personas afectadas
- **Filtrado Avanzado**: Encuentra personas por nombre, ubicación o estado
- **Notificaciones**: Recibe alertas cuando se actualiza la información

### 📊 Panel de Control
- **Visualización de Datos**: Estadísticas en tiempo real sobre la emergencia
- **Mapas Interactivos**: Ubicación de centros de atención y zonas afectadas
- **Reportes Dinámicos**: Generación de informes personalizados

### 🔐 Gestión de Usuarios
- **Roles Diferenciados**: Acceso personalizado según el tipo de usuario
- **Autenticación Segura**: Protección de datos sensibles
- **Perfiles de Organización**: Gestión de entidades de rescate y ayuda

### 📱 Experiencia Multiplataforma
- **Diseño Responsivo**: Adaptable a cualquier dispositivo
- **Modo Offline**: Funcionalidades básicas sin conexión a internet
- **Bajo Consumo de Datos**: Optimizado para situaciones con conectividad limitada

## 🛠️ Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| **Frontend** | ![Angular](https://img.shields.io/badge/Angular-19.0.0-DD0031?style=flat&logo=angular) ![PrimeNG](https://img.shields.io/badge/PrimeNG-19.0.8-6f42c1?style=flat) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=flat&logo=tailwind-css) |
| **Estado** | ![NgRx](https://img.shields.io/badge/NgRx-19.1.0-BA2BD2?style=flat&logo=redux) |
| **Internacionalización** | ![NGX-Translate](https://img.shields.io/badge/NGX--Translate-16.0.4-yellow?style=flat) |
| **Visualización** | ![Chart.js](https://img.shields.io/badge/Chart.js-4.4.2-FF6384?style=flat&logo=chart.js) |
| **Desarrollo** | ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat&logo=typescript) ![ESLint](https://img.shields.io/badge/ESLint-9.14.0-4B32C3?style=flat&logo=eslint) ![Prettier](https://img.shields.io/badge/Prettier-3.0.0-F7B93E?style=flat&logo=prettier) |

## 📂 Estructura del Proyecto

```
CatastrofeAlert/
├── src/
│   ├── app/
│   │   ├── core/                # Servicios, guardias, interceptores y modelos
│   │   ├── layout/              # Componentes de estructura de la aplicación
│   │   ├── pages/               # Páginas principales de la aplicación
│   │   │   ├── auth/            # Autenticación y acceso
│   │   │   ├── dashboard/       # Panel de control
│   │   │   ├── landing/         # Página de inicio
│   │   │   └── ...
│   │   ├── shared/              # Componentes, directivas y pipes compartidos
│   │   └── store/               # Estado global con NgRx
│   ├── assets/                  # Recursos estáticos
│   │   ├── i18n/                # Archivos de traducción
│   │   ├── img/                 # Imágenes
│   │   └── layout/              # Estilos de layout
│   └── environments/            # Configuraciones por entorno
├── public/                      # Archivos públicos
└── ...                          # Archivos de configuración
```

## 🚀 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm (v9 o superior)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/CatastrofeAlert.git
cd CatastrofeAlert
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm start
```

4. **Acceder a la aplicación**

Abre tu navegador y visita `http://localhost:4200`

## 📖 Uso

### Búsqueda de Personas

1. Accede a la página principal
2. Utiliza el buscador en la sección principal
3. Ingresa el nombre de la persona que buscas
4. Revisa los resultados en la tabla de pacientes

### Panel de Administración

1. Inicia sesión con credenciales de administrador
   - Usuario: `emergencydo@admin.com`
   - Contraseña: `emergencydoQA123`
2. Accede al panel de control
3. Visualiza estadísticas y gestiona la información

## 🔌 API

La aplicación se conecta a una API REST para obtener y actualizar información:

- **URL Base**: `http://localhost:3000` (desarrollo)
- **Repositorio Backend**: [https://github.com/Solvealgoritms22/CatasfrofeAlertBackend](https://github.com/Solvealgoritms22/CatasfrofeAlertBackend)
- **Endpoints principales**:
  - `/pacientes`: Información de personas afectadas
  - `/auth/login`: Autenticación de usuarios
  - `/auth/user`: Información del usuario actual

## 👥 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/usuario1">
        <img src="https://github.com/identicons/usuario1.png" width="100px;" alt="Usuario 1"/><br />
        <sub><b>Nombre Apellido</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/usuario2">
        <img src="https://github.com/identicons/usuario2.png" width="100px;" alt="Usuario 2"/><br />
        <sub><b>Nombre Apellido</b></sub>
      </a>
    </td>
  </tr>
</table>

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

<div align="center">
  <p>
    <a href="https://github.com/tu-usuario/CatastrofeAlert/issues">Reportar Bug</a> ·
    <a href="https://github.com/tu-usuario/CatastrofeAlert/issues">Solicitar Función</a>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/Hecho%20con%20%E2%9D%A4%EF%B8%8F%20en-República%20Dominicana-blue?style=flat" alt="Hecho en República Dominicana" />
  </p>
</div>