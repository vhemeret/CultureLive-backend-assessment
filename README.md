
# 🎬 Film Rental Notification System
## 📖 About
This project develops an automated notification system for film rentals. The system logs reminders to customers about the deadlines of their rentals, 5 and 3 days before the due return date, considering the time zones.

## 🛠️ Prerequisites
- Docker
- Docker Compose
- Postman (for testing the API)
- A `.env` file for environment variables (an example provided in `.env.example`)

## 🚀 Installation and Usage
Clone the repository:

```bash
git clone https://github.com/vhemeret/CultureLive-backend-assessment.git
```
Navigate to the project folder:

```bash
cd CultureLive-backend-assessment
```
Install dependencies and start the services:

```bash
docker compose up --build
```
Set up the environment variables:
Create a `.env` file in the root directory following the example provided in `.env.example`.

Test the application:
Use Postman to send requests to the API and test different functionalities.

## 🎨 Project Structure
- `/src`: Contains NestJS modules, controllers, and services
  - `/src/customer`: Customer management
  - `/src/rental`: Rental management
  - `/src/tasks`: Scheduled tasks for sending notifications
- `/prisma`: Database schemas using Prisma
- `/config`: Configuration of environment variables and other necessary settings

## 🖥️ Developed with ❤️ using NestJS, Docker, and Prisma.
