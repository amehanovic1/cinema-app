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
- Spring Security
- JWT (JSON Web Token)
- Mail
- Thymeleaf

**Frontend**: 
- React 19
- React Router
- Axios
- TailwindCSS
- FontAwesome
- react-datepicker
- date-fns

---
## Setup

### Local HTTPS Setup with `mkcert` 

### Install `mkcert`

**Windows**
1. Visit :  [mkcert Releases](https://github.com/FiloSottile/mkcert/releases)
2. Download the latest Windows executable (`mkcert-vX.X.X-windows-amd64.exe`)
3. Add it to your system `PATH`
4. Initialize `mkcert`:

```
mkcert -install
```
**Note:** This is one way to install `mkcert` on Windows. Alternative methods, such as using **Chocolatey** or **Scoop**, are also available. See the [mkcert GitHub](https://github.com/FiloSottile/mkcert) page for details.

**Other operating systems (macOS / Linux ):**

Refer to the official `mkcert` documentation: [mkcert GitHub](https://github.com/FiloSottile/mkcert)

Follow the instructions for your platform to install and initialize `mkcert`.

### Configure Hosts File

**Windows**
1. Open Notepad (or any text editor) as Administrator.
2. Open the hosts file located at: `C:\Windows\System32\drivers\etc\hosts`
3. Add the following at the end of the file:

```
# CineBH
127.0.0.1 cinebh-api.yourdomain.com
127.0.0.1 cinebh.yourdomain.com
# End of section
```

### Generate Local Certificates
After installing `mkcert` and configuring your hosts, generate certificates for both frontend and backend environments.

Frontend Certificate:
```
cd frontend
mkdir .cert
mkcert -cert-file .cert/cert.pem -key-file .cert/key.pem cinebh.yourdomain.com localhost 127.0.0.1
```
Backend Keystore:
```
cd backend
mkdir .cert
mkcert -pkcs12 -p12-file .cert/keystore.p12 cinebh-api.yourdomain.com localhost 127.0.0.1
```

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

# Frontend URL
FRONTEND_URL=https://cinebh.yourdomain.com:3000

# SSL configuration
SERVER_PORT=8080
SERVER_SSL_KEY_STORE_PASSWORD=password

# Mail configuration
MAIL_USERNAME=your_consumer_key
MAIL_PASSWORD=your_consumer_secret
MAIL_FROM=noreply@cinebh.com
```
***Mail Configuration (Turbo-SMTP)***

1. Create a free account at [Turbo-SMTP](https://serversmtp.com/)
2. Generate SMTP credentials (Consumer Key/Secret)
3. Configure environment variables:
   - `MAIL_USERNAME` = Consumer Key
   - `MAIL_PASSWORD` = Consumer Secret
   - `MAIL_FROM` = Verified sender email address


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
REACT_APP_API_URL=https://cinebh-api.yourdomain.com:8080/api

# SSL configuration
HTTPS=true
SSL_CRT_FILE=./.cert/cert.pem 
SSL_KEY_FILE=./.cert/key.pem
HOST=cinebh.yourdomain.com
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
https://cinebh-api.yourdomain.com:<PORT>/swagger-ui/index.html
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
