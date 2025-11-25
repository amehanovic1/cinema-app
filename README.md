# CinemaApp

CinemaApp is a web-based ticketing application that allows online movie ticket purchases for a specific movie company with multiple subsidiaries across the country/world. The application provides the users with different easy-to-use services like purchasing tickets, seat reservations, projection schedule overview, etc.

The ERD for this project is available at the link: [View ERD on dbdiagram.io](https://dbdiagram.io/d/[ERD]-CinebhApp-68ffc275357668b732db6ea3)

---

## Technologies

**Backend**: Spring Boot 3.5.7 | Java 21  | PostgreSQL 18.0

**Frontend**: React 19.2.0 | TailwindCSS 3.4.18


## Key Dependencies

**Backend**: 
- Spring Data JPA
- Spring Validation
- Lombok
- Flyway
- MapStruct
- SpringDoc OpenAPI

**Frontend**: 
- React 19
- React Router
- Axios
- TailwindCSS
- FontAwesome

---
## Setup

### Database Setup

```
# Create database
psql -h <HOST> -U <USER> -c "CREATE DATABASE <DB_NAME>"

# Reset database (optional)
psql -h <HOST> -U <USER> -c "DROP DATABASE IF EXISTS <DB_NAME>"
```

### Backend Setup

Configure Environment Variables:
```
cd backend
cp .env.example .env
```
Update ```.env``` file:

```
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/cinebh
DB_USERNAME=username
DB_PASSWORD=password

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

Run the application:

```
cd backend

# Using Maven Wrapper
./mvnw spring-boot:run

# Or with global Maven 
mvn spring-boot:run

#From IDE: run the main application class
```

### Seed Database

```
# Navigate to the seed folder
cd backend/src/main/resources/db/seed

# Run the seed script
psql -h <HOST> -U <USER> -d <DB_NAME> -f <SEED_SCRIPT>.sql
```

### Frontend Setup

Configure Environment Variables:

```
cd frontend
cp .env.example .env
```

Update ```.env``` file:
```
# Backend API URL
REACT_APP_API_URL=http://localhost:8080/api
```

Install dependencies and run:
```
cd frontend
npm install 
npm start
```

## Running Backend Tests

### In IntelliJ IDEA
1. Open the `backend` project in IntelliJ IDEA.
2. Navigate to the test class, file or the `test` folder.
3. Right-click and select **Run**.
4. View the test results in the **Run** window.

### From Terminal
```
cd backend 

./mvnw test

# Or with global Maven
mvn test
````

## Development Tools

### API Documentation (Swagger): 
```
http://localhost:<PORT>/swagger-ui/index.html
```

### PMD Static Analysis:

```
cd backend

# Run analysis
./mvnw pmd:check 

# Generate report
./mvnw pmd:pmd
```
Reports are generated in ```target/reports/pmd.html```
