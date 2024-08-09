

![ezgif-7-a2f904bbd5](https://github.com/user-attachments/assets/68e718db-3a8b-46e9-ad51-921cb0069a56)


### ESP
## Descripción del Proyecto

**Finance Dev** es una aplicación web robusta para la gestión de finanzas personales, construida utilizando un stack tecnológico moderno que optimiza tanto el desarrollo como el rendimiento de la aplicación.
La realizacion de esta Saas es un ejercicio autodidacta para seguir manteniendo mis conocimientos y habilidades técnicas actualizadas a los stacks y estructuras más modernas.

El proyecto cuenta la posibilidad de importar datos financieros mediante CSV, con un archivo de ejemplo incluido en el código o mediante un script de seeding de datos. Utiliza `bun run db:seed` para generar datos aleatorios que se puedan ajustar al filtro de calendario de los ultimos 30 días.

Puedes testear el deploy en vivo en vercel aqui:
[https://finance-gilt.vercel.app/](https://finance-gilt.vercel.app/)

### Tecnologías y Herramientas Utilizadas

- **Next.js**: Utilizado para la renderización del lado del servidor (SSR) y generación de sitios estáticos (SSG). Next.js facilita una carga rápida y una excelente experiencia de usuario, al tiempo que permite el uso de características avanzadas como el pre-renderizado y el enrutamiento dinámico.
- **React**: La biblioteca central para la construcción de la interfaz de usuario, permitiendo el desarrollo de componentes interactivos y reutilizables. La integración con Next.js proporciona una experiencia fluida y modular.
- **Hono.js**: Framework ligero para la creación de APIs, utilizado para gestionar la lógica del backend de manera rápida y eficiente. Hono.js permite una integración directa con el frontend, facilitando la comunicación entre el cliente y el servidor.
- **Zod**: Biblioteca de validación de esquemas que asegura la consistencia y precisión de los datos. Zod simplifica la validación de datos y ayuda a mantener la integridad del estado de la aplicación.
- **NeonDB**: Base de datos moderna para almacenar datos financieros. NeonDB ofrece una solución escalable y eficiente para manejar grandes volúmenes de información con alta disponibilidad.
- **Bun**: Utilizado para la ejecución rápida de JavaScript y la gestión de dependencias. Bun acelera el proceso de desarrollo y optimiza la construcción y ejecución de la aplicación.
- **Drizzle ORM**: Object-Relational Mapper (ORM) que facilita la interacción con la base de datos. Drizzle ORM simplifica las operaciones CRUD y las consultas complejas, proporcionando una capa de abstracción entre el código y la base de datos.

### Aspectos Técnicos Clave

- **Estructura del Código**: La aplicación sigue una arquitectura modular y escalable, con un enfoque en la separación de preocupaciones entre el frontend y el backend. Los componentes React se integran con las APIs proporcionadas por Hono.js para gestionar los datos de manera eficiente.
- **Validación de Datos**: Zod se emplea para validar la entrada del usuario y asegurar que se cumplan los requisitos de formato y consistencia antes de ser procesados por el backend.
- **Optimización del Rendimiento**: Next.js y Bun trabajan en conjunto para optimizar el rendimiento de la aplicación, garantizando tiempos de carga rápidos y una experiencia de usuario fluida.
- **Gestión de Datos**: NeonDB y Drizzle ORM proporcionan una solución robusta para el almacenamiento y la gestión de datos, con consultas eficientes y una estructura de datos bien definida.

**Finance Dev** combina estas tecnologías para ofrecer una solución financiera completa y moderna, centrada en la eficiencia del desarrollo y la optimización del rendimiento de la aplicación.


ENG

## Project Description

**Finance Dev** is a robust web application for personal finance management, built using a modern tech stack that optimizes both development and application performance. This project is a self-directed exercise to keep my knowledge and technical skills up-to-date with the latest technologies and structures.

### Technologies and Tools Used

- **Next.js**: Utilized for server-side rendering (SSR) and static site generation (SSG).
- **React**: The core library for building the user interface.
- **Hono.js**: Lightweight framework for creating APIs.
- **Zod**: Schema validation library.
- **NeonDB**: Modern database for storing financial data.
- **Bun**: Tool for fast JavaScript execution and dependency management.
- **Drizzle ORM**: Object-Relational Mapper (ORM) for database interaction.

### Key Technical Aspects

- **Code Structure**: Modular and scalable architecture, focusing on the separation between the frontend and backend.
- **Data Validation**: Use of Zod to validate user input.
- **Performance Optimization**: Next.js and Bun for fast load times and a smooth user experience.
- **Data Management**: NeonDB and Drizzle ORM for efficient data storage and management.

### Data Import

The application allows for importing financial data via CSV files, with a sample file included in the code. Alternatively, a seeding script can be used to generate random data adjusted to the calendar filter for the last 30 days. Use `bun run db:seed` for this purpose.

You can test the live deployment on Vercel here: [https://finance-gilt.vercel.app/](https://finance-gilt.vercel.app/)
