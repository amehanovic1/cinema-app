FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw package -Dmaven.test.skip=true -B

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

COPY --from=builder /app/target/*.jar app.jar

RUN mkdir -p /app/.cert && chown -R appuser:appgroup /app

USER appuser

EXPOSE 8443

ENTRYPOINT ["java", "-jar", "app.jar"]
