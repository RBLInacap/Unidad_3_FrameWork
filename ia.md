# Documentación de Uso de IA - Proyecto SportClub

**Nombre del Estudiante:** [INGRESA TU NOMBRE AQUÍ]
**Carrera:** Analista Programador
**Sede:** INACAP La Serena

## 1. Herramienta Utilizada
Para el desarrollo de este proyecto frontend se utilizó **Google Gemini**.

## 2. Propósito del Uso de la IA
La IA fue utilizada como un asistente de desarrollo (Pair Programming) con los siguientes objetivos:
* **Aceleración de Maquetado:** Generación de la estructura base en HTML5.
* **Integración de Frameworks:** Traducción de los bocetos y requerimientos del cliente a clases responsivas de Bootstrap 5 (`container`, `row`, `col-lg-4`, `card`, `navbar`).
* **Validación Semántica:** Revisión de la correcta implementación de etiquetas HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) para asegurar el cumplimiento del máximo puntaje en la rúbrica de evaluación.

## 3. Evidencia de Modificación y Comprensión
El flujo de trabajo no consistió en una copia directa, sino en un diseño guiado por especificaciones:
1.  **Ingreso de Contexto (Prompts):** Se entregó a la IA la narrativa del cliente, los códigos de colores corporativos (#2E1A47, #F2B705) y se describieron las funcionalidades requeridas por módulo (Login, Registro, Dashboards).
2.  **Ajuste y Ensamblaje:** El código generado fue validado y estructurado en archivos separados. Se extrajeron las variables de color hacia un archivo `style.css` global y se aplicaron manualmente las lógicas de conexión entre vistas (ej: `login.html` redirigiendo a los dashboards).
3.  **Cumplimiento de Rúbrica:** Se reestructuró el código para asegurar la diferenciación visual dinámica según el rol del usuario (Azul para Usuario, Verde para Coach, Morado para Admin) modificando el CSS y aplicando las clases específicas (`.navbar-user`, `.navbar-coach`, `.navbar-admin`).

## 4. Conclusión
El uso de IA optimizó el tiempo de escritura de código repetitivo, permitiendo focalizar el esfuerzo en la arquitectura del sistema web, la consistencia visual y la estructuración del repositorio.