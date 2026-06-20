# SportClub - Aplicación Web SPA

## Descripción del Proyecto

SportClub es una aplicación web de una sola página (SPA) desarrollada con React, diseñada para gestionar una comunidad deportiva. La plataforma permite a usuarios, coaches y administradores acceder a funcionalidades específicas según su rol, con autenticación segura y control de acceso basado en roles (RBAC).

## Integrantes

- Rodrigo B.

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn como gestor de paquetes

## Instalación de Dependencias

Para instalar todas las dependencias del proyecto, ejecuta:

```bash
npm install
```

O si prefieres usar yarn:

```bash
yarn install
```

## Ejecutar el Frontend

Para iniciar el servidor de desarrollo del frontend:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Ejecutar el Backend

Asegúrate de tener el servidor backend ejecutándose en `http://localhost:3000`

Para iniciar el backend (en una terminal separada):

```bash
# Navega a la carpeta del backend
cd ../backend-sportclub

# Instala las dependencias
npm install

# Inicia el servidor
npm start
```

## Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca de JavaScript para construir interfaces de usuario
- **React Router 6.20.0** - Enrutamiento de aplicación SPA
- **React-Bootstrap 2.9.0** - Componentes de interfaz de usuario basados en Bootstrap
- **Bootstrap 5.3.0** - Framework CSS para diseño responsive
- **Axios 1.6.0** - Cliente HTTP para consumo de APIs
- **SweetAlert2 11.10.0** - Alertas y diálogos personalizados

### Herramientas
- **Vite 5.0.0** - Bundler y servidor de desarrollo ultra rápido

## Características Principales

### 1. Autenticación
- Login funcional conectado al backend
- Registro de nuevos usuarios
- Persistencia de sesión
- Cierre de sesión seguro
- Validaciones de formulario

### 2. Control de Acceso por Roles
- **Usuario**: Acceso a reservas y comunidad
- **Coach**: Gestión de alumnos y clases
- **Administrador**: Panel administrativo completo

### 3. Dashboards Personalizados
- Dashboard Usuario (tema azul)
- Dashboard Coach (tema verde)
- Dashboard Administrador (tema rojo/morado)

### 4. Módulo Administrativo
- Gestión CRUD completa de usuarios
- Tabla con opciones de editar y eliminar
- Modales React-Bootstrap para crear/editar
- Confirmaciones con SweetAlert2

### 5. Protección de Rutas
- Rutas protegidas que validan autenticación
- Control de acceso basado en roles
- Redirección automática según permisos

## Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── Header.jsx      # Encabezado con navegación
│   ├── Navbar.jsx      # Barra lateral de navegación
│   └── UserManagement.jsx # Módulo CRUD de usuarios
├── layouts/            # Layouts de la aplicación
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx       # Página de inicio
│   ├── Login.jsx      # Página de login
│   ├── Register.jsx   # Página de registro
│   ├── Profile.jsx    # Perfil del usuario
│   ├── UserDashboard.jsx
│   ├── CoachDashboard.jsx
│   └── AdminDashboard.jsx
├── routes/            # Configuración de rutas
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── services/          # Servicios para API
│   ├── apiClient.js
│   ├── authService.js
│   └── userService.js
├── contexts/          # Contextos de React
│   └── AuthContext.jsx
├── utils/             # Funciones utilitarias
│   └── validators.js
└── App.jsx           # Componente raíz
```

## Notas Importantes

- La aplicación requiere que el backend esté ejecutándose para funcionar correctamente
- Las credenciales de ejemplo se proporcionan durante el desarrollo
- La sesión se mantiene en el localStorage y se restaura automáticamente

