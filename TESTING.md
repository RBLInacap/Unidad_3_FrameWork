# 🚀 INSTRUCCIONES DE PRUEBA - SportClub

## 📋 REQUISITOS PREVIOS

✅ Node.js instalado (v16+)
✅ npm instalado
✅ Backend ejecutándose en `http://localhost:3000`

---

## 🏃 PASOS PARA PROBAR LA APLICACIÓN

### 1️⃣ INSTALAR DEPENDENCIAS (si aún no las has instalado)

```bash
npm install
```

### 2️⃣ CONFIGURAR VARIABLES DE ENTORNO

Verifica que el archivo `.env` tenga:
```
VITE_API_URL=http://localhost:3000/api
```

### 3️⃣ EJECUTAR EL SERVIDOR DE DESARROLLO

```bash
npm run dev
```

La aplicación se abrirá automáticamente en:
```
http://localhost:5173
```

---

## 🧪 FLUJO DE PRUEBA RECOMENDADO

### A. PÁGINA DE INICIO
1. Verás la página de inicio con:
   - Logo "⚽ SportClub"
   - Botones "Iniciar Sesión" y "Registrarse"
   - Características principales

### B. REGISTRARSE (NUEVO USUARIO)
1. Haz clic en "Registrarse"
2. Llena el formulario:
   - **Nombre**: Juan
   - **Apellido**: Pérez
   - **Email**: juan@example.com
   - **Contraseña**: Password123
   - **Confirmar Contraseña**: Password123
3. El rol se asigna **automáticamente como "usuario"**
4. Haz clic en "Registrarse"
5. Deberías ver un mensaje de éxito

### C. INICIAR SESIÓN
1. Serás redirigido a la página de login
2. Ingresa tus credenciales:
   - **Email**: juan@example.com
   - **Contraseña**: Password123
3. Haz clic en "Iniciar Sesión"
4. Serás redirigido al **Dashboard Usuario** (AZUL)

### D. EXPLORAR DASHBOARD USUARIO
- Verás el **fondo azul claro**
- **Header** con gradiente azul
- **Navegación** lateral con iconos
- **Tarjetas** de funcionalidades
- Botón "Mi Perfil" y "Cerrar Sesión"

### E. PROBAR MI PERFIL
1. Haz clic en "Mi Perfil" en el header
2. Verás tu información con un **avatar dinámico**
3. Puedes editar tu perfil

### F. PROBAR CIERRE DE SESIÓN
1. Haz clic en "Cerrar Sesión"
2. Se mostrará un SweetAlert de confirmación
3. Serás redirigido a la página de inicio

---

## 👤 CUENTAS DE PRUEBA PREDEFINIDAS

Si el backend tiene usuarios de prueba, usa:

### USUARIO
- Email: `usuario@test.com`
- Contraseña: `Password123`
- Dashboard: **Azul**

### COACH
- Email: `coach@test.com`
- Contraseña: `Password123`
- Dashboard: **Verde**

### ADMINISTRADOR
- Email: `admin@test.com`
- Contraseña: `Password123`
- Dashboard: **Rojo/Morado** + Módulo de Gestión de Usuarios

---

## 🎨 CARACTERÍSTICAS POR DASHBOARD

### 📘 DASHBOARD USUARIO (AZUL #0066cc)
✅ Fondo azul claro
✅ Tarjetas con funcionalidades
✅ Mis Reservas
✅ Mi Progreso
✅ Comunidad
✅ Estadísticas

### 📗 DASHBOARD COACH (VERDE #28a745)
✅ Fondo verde claro
✅ Mis Alumnos
✅ Mis Clases
✅ Reportes
✅ Mensajes

### 📕 DASHBOARD ADMIN (ROJO/MORADO #dc3545 + #8B2E6B)
✅ Fondo rojo claro
✅ Estadísticas del sistema (128 usuarios, 45 coaches, etc)
✅ **CRUD COMPLETO DE USUARIOS** con:
  - Tabla de usuarios
  - Botón "+ Crear Usuario" (Modal React-Bootstrap)
  - Editar usuario (Modal)
  - Eliminar usuario (SweetAlert2)
  - Validaciones de formulario

---

## 🔄 FLUJO DE RUTAS PROTEGIDAS

```
/ → Home (Público)
/login → Login (Público)
/register → Registro (Público)
/dashboard/usuario → Dashboard Usuario (Protegido - rol: usuario)
/dashboard/coach → Dashboard Coach (Protegido - rol: coach)
/dashboard/admin → Dashboard Admin (Protegido - rol: admin)
/profile → Mi Perfil (Protegido - todos los roles)
/* → 404 (Página no encontrada)
```

---

## ✅ CHECKLIST DE VALIDACIÓN

- [ ] Página de inicio carga correctamente
- [ ] Botones de login/registro funcionan
- [ ] Registro sin selector de rol
- [ ] Login redirige al dashboard correcto
- [ ] Dashboard usuario es AZUL
- [ ] Dashboard coach es VERDE
- [ ] Dashboard admin es ROJO/MORADO
- [ ] CRUD de usuarios funciona (admin)
- [ ] Mi Perfil muestra avatar dinámico
- [ ] Cerrar sesión funciona
- [ ] Mensajes de validación aparecen
- [ ] SweetAlert2 en confirmaciones
- [ ] Rutas protegidas funcionan

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "La página no carga"
```bash
npm run dev
```
Asegúrate de que el servidor está ejecutándose.

### "Error: Cannot POST /auth/register"
```
⚠️ El backend no está corriendo
Inicia el backend en puerto 3000
```

### "La contraseña no es válida"
```
✅ Requiere: 6+ caracteres, 1 mayúscula, 1 número
❌ No válidas: "password", "123456"
✅ Válidas: "Password123", "Secure@Pass1"
```

### "No puedo acceder a dashboard/admin"
```
✅ Necesitas tener rol: admin
❌ Los usuarios normales no pueden verlo
→ Intenta con la cuenta de admin
```

---

## 📞 NOTAS

- La persistencia de sesión funciona (localStorage + AuthContext)
- Las validaciones son en tiempo real
- Todos los formularios tienen feedback visual
- El diseño es responsive (funciona en móvil)
- Los colores corresponden a cada rol como se pidió

¡Listo para probar! 🎯
