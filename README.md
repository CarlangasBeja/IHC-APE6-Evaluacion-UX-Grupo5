# IHC APE 6 — Evaluación y Validación de Interfaces

Aplicación web interactiva desarrollada para la exposición del **APE 6 de Interacción Humano–Computador**, enfocada en:

**Evaluación y validación + métodos de evaluación**

La aplicación funciona como material de apoyo para la exposición y, al mismo tiempo, como una herramienta práctica para realizar una evaluación básica de usabilidad.

---

## Universidad Técnica de Ambato

**Carrera:** Software  
**Asignatura:** Interacción Humano–Computador  
**Nivel:** Quinto  
**Paralelo:** B  
**Grupo:** Grupo 5  
**Unidad:** Unidad Evaluativa II  
**Año:** 2026  

---

# Integrantes

- Carlos
- Karen
- Bryan
- Thomas

---

# Tema

## Evaluación y validación + métodos de evaluación

El proyecto demuestra que una interfaz puede funcionar correctamente desde el punto de vista técnico y, al mismo tiempo, presentar problemas de:

- Usabilidad.
- Navegación.
- Comprensión.
- Feedback.
- Consistencia.
- Prevención de errores.
- Eficiencia.

Por esta razón, una interfaz debe ser evaluada mediante métodos que permitan obtener evidencia sobre la experiencia real del usuario.

---

# Pregunta principal

> ¿Una interfaz que funciona técnicamente puede ser una mala interfaz?

Sí.

Una aplicación puede ejecutar correctamente todas sus funciones y aun así provocar confusión, errores o dificultades para completar una tarea.

---

# Objetivo

Evaluar un flujo de interacción mediante tareas, métricas y métodos de evaluación de usabilidad para identificar problemas, determinar su severidad y convertir los resultados obtenidos en mejoras priorizadas.

---

# Funcionalidades de la aplicación

La página web permite:

- Presentar el contenido de la exposición.
- Separar el contenido por integrante.
- Mostrar el guion de exposición por secciones.
- Mostrar ejemplos relacionados con cada concepto.
- Practicar preguntas tipo test.
- Mostrar cuatro alternativas por pregunta.
- Validar automáticamente las respuestas.
- Mostrar animaciones cuando una respuesta es correcta.
- Utilizar tema claro y oscuro.
- Ejecutar una demostración de laboratorio de usabilidad.
- Registrar tareas.
- Registrar tiempos.
- Registrar errores.
- Registrar intentos.
- Calcular la tasa de éxito.
- Calcular el tiempo promedio.
- Aplicar evaluación heurística.
- Evaluar las diez heurísticas de Nielsen.
- Asignar severidad de 0 a 4.
- Registrar hallazgos.
- Realizar triangulación.
- Generar un backlog UX.
- Simular la rúbrica de evaluación académica.

---

# Tecnologías utilizadas

El proyecto fue desarrollado únicamente con tecnologías web:

- HTML5
- CSS3
- JavaScript
- LocalStorage

No requiere:

- Backend.
- Base de datos.
- Framework.
- Instalación de dependencias.
- Servidor externo.

---

# Estructura del proyecto

```text
IHC-APE6-Evaluacion-UX-Grupo5/
│
├── index.html
├── styles.css
├── app.js
└── README.md
```

---

# Exposición

La aplicación divide la presentación entre los cuatro integrantes.

## Carlos

### Introducción, evaluación y validación

Explica:

- Pregunta inicial.
- Diferencia entre evaluación y validación.
- Importancia de evaluar la experiencia.
- Métodos utilizados.
- Pilotaje.

---

## Karen

### Prueba de usabilidad

Explica:

- Prueba de usabilidad moderada.
- Diseño de tareas.
- Rol del usuario.
- Rol del moderador.
- Pensamiento en voz alta.
- Evidencia cualitativa.

---

## Bryan

### Métricas de usabilidad

Explica:

- Tasa de éxito.
- Tiempo.
- Número de errores.
- Número de intentos.
- Interpretación de resultados.

---

## Thomas

### Evaluación heurística y backlog

Explica:

- Heurísticas de Nielsen.
- Severidad.
- Triangulación.
- Hallazgos.
- Priorización.
- Backlog UX.

---

# Exposición interactiva

El contenido no se muestra completamente al mismo tiempo.

Cada integrante dispone de secciones desplegables:

```text
Parte 1
↓
Parte 2
↓
Parte 3
↓
Parte 4
```

Esto permite utilizar la aplicación como guía durante la exposición sin llenar la pantalla de texto.

---

# Preguntas interactivas

Cada integrante dispone de preguntas para practicar antes de la defensa.

Las preguntas contienen cuatro opciones:

```text
A
B
C
D
```

Cuando se selecciona la respuesta correcta:

- Se identifica visualmente.
- Se muestra un mensaje de respuesta correcta.
- Se reproduce una pequeña animación de celebración.

Cuando la respuesta es incorrecta, la aplicación muestra cuál era la opción correcta para facilitar el repaso.

---

# Tema claro y oscuro

La interfaz dispone de un botón para cambiar entre:

```text
☀ Tema claro
```

y:

```text
☾ Tema oscuro
```

La preferencia se guarda mediante `localStorage`.

---

# Laboratorio de usabilidad

La aplicación incluye una demostración práctica en la que participan los cuatro integrantes.

| Integrante | Rol |
|---|---|
| Carlos | Moderador |
| Karen | Usuario |
| Bryan | Registro de métricas |
| Thomas | Observador heurístico |

---

# Carlos — Moderador

Durante la práctica:

1. Presenta el escenario.
2. Lee una tarea.
3. No indica dónde hacer clic.
4. No proporciona pistas.
5. Registra dudas y observaciones.

### ¿Para qué sirve?

Permite mantener una prueba neutral y evitar que la ayuda del moderador oculte problemas reales de la interfaz.

---

# Karen — Usuario

Durante la práctica:

1. Recibe una tarea.
2. Utiliza la interfaz.
3. No recibe ayuda.
4. Piensa en voz alta.
5. Explica qué fue fácil o difícil.

### ¿Para qué sirve?

Permite obtener evidencia directa sobre cómo una persona interpreta y utiliza la interfaz.

---

# Bryan — Métricas

Durante la práctica:

1. Inicia el cronómetro.
2. Registra éxito o fracaso.
3. Cuenta errores.
4. Cuenta intentos.
5. Ingresa los datos.
6. Calcula los resultados.

### ¿Para qué sirve?

Permite convertir la experiencia del usuario en datos cuantitativos.

---

# Thomas — Evaluación heurística

Durante la práctica:

1. Observa sin intervenir.
2. Identifica problemas.
3. Relaciona los problemas con las heurísticas.
4. Asigna severidad.
5. Completa la matriz de hallazgos.
6. Genera el backlog.

### ¿Para qué sirve?

Permite complementar la prueba con usuario mediante un segundo método sistemático de evaluación.

---

# Pilotaje

Antes de registrar los resultados definitivos se realiza un pilotaje.

El proceso es:

```text
Diseñar tareas
      ↓
Ejecutar prueba piloto
      ↓
Detectar instrucciones ambiguas
      ↓
Corregir tareas
      ↓
Realizar evaluación definitiva
```

El pilotaje permite evitar errores en el procedimiento de evaluación.

---

# Método 1 — Prueba de usabilidad

La prueba de usabilidad permite observar qué ocurre cuando una persona intenta completar tareas reales.

Se registran:

- Éxito.
- Fracaso.
- Tiempo.
- Errores.
- Intentos.
- Observaciones.

---

# Matriz de tareas y métricas

La aplicación permite modificar las tareas directamente.

Ejemplo:

| Tarea | Descripción |
|---|---|
| T01 | Iniciar sesión y acceder a una sección |
| T02 | Encontrar una opción y registrar información |
| T03 | Consultar o completar una operación |

Posteriormente se registran los resultados.

---

# Métricas

## Tasa de éxito

```text
Tasa de éxito =
Tareas completadas correctamente
-------------------------------- × 100
Total de tareas
```

Por ejemplo:

```text
2 / 3 × 100 = 66,7 %
```

---

## Tiempo promedio

Permite identificar tareas que requieren más tiempo del esperado.

---

## Errores

Permite registrar acciones incorrectas realizadas por el usuario.

---

## Intentos

Indica cuántas veces el usuario intenta completar una acción antes de obtener el resultado esperado.

---

# Método 2 — Evaluación heurística

El segundo método utilizado es la evaluación heurística basada en las diez heurísticas de Jakob Nielsen.

---

# Heurísticas de Nielsen

1. Visibilidad del estado del sistema.
2. Correspondencia entre el sistema y el mundo real.
3. Control y libertad del usuario.
4. Consistencia y estándares.
5. Prevención de errores.
6. Reconocimiento antes que recuerdo.
7. Flexibilidad y eficiencia.
8. Diseño estético y minimalista.
9. Recon
