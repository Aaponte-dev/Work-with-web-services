# Work-with-web-services

## 📄 Release notes v1.0.0
* ⚙ Implementación de ejemplos funcionales de servicios web.

## Pre-requisitos 📋
* NodeJS 12.16.0 LTS.
* MongoDB 4.2.6 (BDD).

## Instalación 🔧

1. Instalar las dependencias ejecutando el comando `npm install`.
3. Copiar el archivo *.env.example* del repositorio y pegarlo como *.env*.
4. Configurar el archivo *.env*.
   * Los datos de Nodemailer no se proveen en el archivo. Se pueden configurar [Nodemailer](https://nodemailer.com/about/) para hacer testing.
   * Los valores de las variables JWT_SECRET, JWT_REGISTER_SECRET, JWT_RESET_PASSWORD_SECRET son strig con valores random, debe proporcionar los mismo al iniciar el proyecto
5. Cree una Bd con el mismo nombre que el del archivo .env y cree data.
6. Ejecutar `npm run dev`.
