# Revisión técnica del portfolio — 16 de noviembre de 2026

Trabajo local sobre `feat/contact-form-codex`, a partir de `8f07a3c`.
Al comenzar solo estaban modificados los dos PDF del CV. Se han conservado
sin editar ni incluir en los commits de esta revisión. No se ha hecho push,
merge, despliegue ni envío real del formulario.

## 1. Formulario de contacto

La valoración previa a los cambios fue favorable. `ContactSection` organiza la
sección, `ContactForm` gestiona la interacción y `utils/contact.js` concentra la
validación y la petición HTTP. Esta separación es suficiente para el proyecto;
no hace falta añadir un composable, una librería de formularios ni un backend.

Ya estaban implementados correctamente:

- Etiquetas asociadas, campos obligatorios, límites de longitud, errores con
  `aria-invalid`/`aria-describedby` y foco en el primer campo inválido.
- Asunto opcional, validación de espacios en blanco y formato básico de email.
- Estado de envío, bloqueo de envíos simultáneos y timeout de 20 segundos.
- Mensajes diferenciados para validación, indisponibilidad, HTTP 429, timeout,
  error general y aceptación; conservación del texto cuando hay un fallo.
- Honeypot `_gotcha`, sin exponerlo a teclado ni lectores de pantalla.
- Configuración por ID público y funcionamiento sin backend en GitHub Pages.
- Textos ES/EN, distribución responsive y colores mediante variables de tema.

Correcciones aplicadas:

- Payload explícito: solo nombre, email, asunto, mensaje y honeypot. Un dato
  añadido accidentalmente al estado de interfaz no se enviará al servicio.
- Petición sin credenciales ni referrer. Los campos no se guardan en
  `localStorage`, no se registran en consola y no se añaden a la URL.
- Respuestas JSON nulas o no confirmadas se tratan como fallo. Se conserva el
  criterio existente de exigir `ok: true` para mostrar aceptación.
- Recuperación del foco después de habilitar el formulario, solo si el navegador
  lo ha dejado en `body`; no se roba el foco si el visitante lo ha movido.
- Instrucciones y privacidad asociadas al grupo de campos; aviso completo del
  asunto opcional y enlace a la política de Formspree.
- Retirada de la opacidad global del formulario deshabilitado para conservar
  legibilidad mientras se espera.

La integración AJAX sigue usando `fetch` y mensajes propios; no se ha instalado
el SDK. El honeypot es una protección básica que Formspree también interpreta
en el servidor. No se ha cambiado la configuración de la cuenta ni comprobado
su panel: las restricciones de dominio y filtros del servicio quedan bajo el
control del propietario. La aceptación de la API sigue diferenciándose de la
entrega a la bandeja de entrada.

Referencias oficiales consultadas:
[AJAX](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/)
y [honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering).

`.env.local` está excluido por `*.local` y no está versionado. Contiene una única
clave, `VITE_FORMSPREE_FORM_ID`; su valor no se reproduce en este informe.
`.env.example` contiene un valor vacío. El workflow utiliza una variable de
Actions durante el build. Cualquier variable `VITE_` utilizada por la aplicación
es pública en el frontend: aquí se necesita un ID de formulario, nunca un token
privado. La búsqueda de patrones comunes de claves en los archivos versionados
no ha encontrado coincidencias; no equivale a una auditoría del historial.

## 2. CV

Solo existen estos PDF en el proyecto:

| Idioma  | Archivo actual                      |       Tamaño |
| ------- | ----------------------------------- | -----------: |
| Inglés  | `public/cv/IvanJimenezAlonsoEN.pdf` | 84 843 bytes |
| Español | `public/cv/IvanJimenezAlonsoES.pdf` | 88 787 bytes |

Ambos JSON ya apuntaban a los archivos correctos. No había referencias activas
a versiones antiguas o inexistentes. Los enlaces siguen construyéndose con
`import.meta.env.BASE_URL`, con base `/ivan-portfolio/`; se han añadido los
atributos `download` y `hreflang` correspondientes.

Los hashes SHA-256 iniciales y finales coinciden:

```text
EN F113669A0843E7B9E4942936E7373828A11FA8636F022BBA218C475237AC5824
ES FCC3B4B931EDAC4844E79900EB64825285D307F50B9E0BE8149732E1DAFC5161
```

No se ha alterado el contenido, renombrado ni eliminado ningún documento.

## 3. GitHub

Se ha añadido un único enlace a `https://github.com/IvanJialo` en el Hero, junto
a LinkedIn. Es visible antes de llegar al formulario y utiliza `BrutalButton`,
los colores existentes y la misma distribución responsive. No se repite en
contacto. La marca GitHub es igual en ambos idiomas; el aviso accesible de nueva
pestaña sí está traducido.

Los enlaces externos de los botones y del proyecto tienen
`rel="noopener noreferrer"`, con aviso de nueva pestaña para lectores de pantalla.
Las descargas de CV siguen siendo enlaces locales.

## 4. Comprobación de los diez hallazgos anteriores

| Hallazgo                               | Estado comprobado y decisión                                                                                                                                                                                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lang` vacío                           | Confirmado. Se fija `en` en HTML y se sincroniza reactivamente con ES/EN.                                                                                                                                                                                       |
| Contraste Brutal/Neon                  | Parcialmente corregido antes: existían variantes legibles. Persistían texto blanco sobre magenta/rosa, acentos brillantes sobre blanco y numeración que usaba el acento directo. Se corrigen esos usos, el foco Brutal y la opacidad de las tarjetas laterales. |
| Laterales mediante `div @click`        | Confirmado. Ahora son botones nativos, con nombres traducidos; al seleccionarlos se enfoca la tarjeta activa.                                                                                                                                                   |
| Movimiento reducido                    | Confirmado. Se desactivan animaciones, transiciones y desplazamiento suave con `prefers-reduced-motion`. Se suaviza además el mínimo de opacidad del parpadeo normal.                                                                                           |
| Tooltips móviles ocultos               | Confirmado. Los acrónimos definidos son botones con descripción, apertura táctil, foco/hover y cierre mediante Escape. En móvil el texto se muestra dentro del flujo.                                                                                           |
| Etiquetas en inglés                    | Confirmado en controles, nombres de sistema, carrusel, tarjetas y nivel de idiomas. Se pasan a los JSON ES/EN. Se conservan marcas y comandos decorativos de terminal.                                                                                          |
| Certificaciones inconsistentes         | Confirmado: ES contiene «Prueba» y EN una planificación antigua. La sección sigue comentada. Se conservan los borradores sin inventar certificaciones ni decidir cuáles son válidas.                                                                            |
| `localStorage` sin protección          | Confirmado tanto al leer como al escribir. Se capturan errores y se validan idioma/tema; se conserva la migración `terminal` → `neon`.                                                                                                                          |
| Renderizado móvil/escritorio duplicado | Confirmado en el carrusel. Se conserva: solo una versión es visible y la refactorización no aporta suficiente beneficio en esta revisión.                                                                                                                       |
| Comprobaciones antes de desplegar      | Confirmado: solo se compilaba. Ahora `pnpm check` ejecuta lint sin autofijado, pruebas y build antes de subir el artefacto.                                                                                                                                     |

Se ha añadido también `aria-current` a los selectores del carrusel, un estado
anunciable con el proyecto activo y selectores de al menos 24 px que pueden
envolverse en pantallas estrechas. Las clases de los tres temas, los bordes,
sombras y colores de fondo se conservan.

## 5. Validación

- `pnpm check`: lint de Oxlint y ESLint sin `--fix`, nueve pruebas de Node y
  build de Vite. `lint:fix` queda como opción explícita.
- Pruebas de contacto con `fetch` simulado: validación, payload, aceptación,
  HTTP 400/403/422/429/500, respuesta vacía/nula/no aceptada, JSON inválido,
  fallo de red y propagación de cancelación.
- Pruebas de preferencias: valores válidos, ausentes e inválidos, almacenamiento
  bloqueado y fallo de escritura por cuota.
- Pruebas de contenido: estructura publicada ES/EN, archivos PDF y contraste
  mínimo 4,5:1 en 48 pares de texto/fondo. Los borradores de certificaciones se
  excluyen explícitamente de la comparación editorial.
- Edge sin interfaz: 24 combinaciones de dos idiomas, tres temas y anchos
  320/390/768/1440 px. Sin elementos activos fuera del viewport; GitHub visible
  una sola vez y atributos de CV correctos.
- Interacción en Edge: Enter en tarjetas laterales y foco posterior, apertura
  móvil de acrónimos y Escape, movimiento reducido, idioma del documento,
  preferencias inválidas y almacenamiento bloqueado.
- Formulario en navegador con respuestas simuladas: validación/foco, errores,
  carga, timeout, aceptación y conservación/limpieza de campos. Las conexiones
  a Formspree se bloquearon además a nivel de red: cero peticiones reales.
- Sin errores ni advertencias de consola o recursos fallidos durante esas
  comprobaciones locales. No se ha enviado ningún correo de prueba.
- Se ha repetido la matriz e interacción sobre el build servido por
  `vite preview` en `/ivan-portfolio/`. Ambos PDF responden HTTP 200, con tipo
  de contenido PDF y firma `%PDF-`; los assets compilados cargan correctamente.

Estas comprobaciones no sustituyen la revisión visual del propietario en VS
Code y localhost, ni confirman la configuración remota de Formspree o Pages.

## 6. Archivos y revisión local

Formulario: `src/components/ContactForm.vue`, `src/utils/contact.js`,
`tests/contact.test.js` y textos de ambos idiomas.

GitHub/CV: `HeroSection.vue`, `BrutalButton.vue`, `ContactSection.vue` y textos.

Accesibilidad/robustez: `src/App.vue`, `index.html`, `src/assets/main.css`,
`LanguagesSection.vue`, `ProjectCard.vue`, `ProjectPreviewCard.vue`,
`ProjectsSection.vue`, `SkillBadge.vue` y `src/utils/preferences.js`.

Validación/documentación: `package.json`, `.github/workflows/deploy.yml`,
`tests/preferences.test.js`, `tests/site.test.js`, `README.md` y este informe.
No cambian las dependencias ni el lockfile.

Para revisar, ejecutar `pnpm dev` y abrir la URL impresa con
`/ivan-portfolio/`. En PowerShell puede usarse `pnpm.cmd dev`. Para el build,
ejecutar `pnpm build` seguido de `pnpm preview`. Comprobar ambos idiomas, los
tres temas, teclado, contacto y descargas. No hacer envíos reales sin autorización.

Se dejan como mejoras opcionales la unificación del carrusel, la decisión
editorial sobre certificaciones y las comprobaciones en otros navegadores y con
lector de pantalla real. No se ha añadido CAPTCHA, dependencias ni abstracciones
de formulario; cualquier ampliación de información de privacidad necesita datos
reales del tratamiento que no están documentados en el repositorio.

Los cambios se organizan en tres commits locales:

1. `f1c8d07` — `refactor: improve contact form quality`.
2. `d109e44` — `feat: add GitHub profile and update CV links`.
3. `fix: improve accessibility and localization` — incluye las comprobaciones
   de despliegue y este informe; su hash se obtiene con `git log -3 --oneline`.
