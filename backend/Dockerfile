# Stage 1: Build with Maven
FROM maven:3.9.3-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the project (skip tests for faster build)
RUN mvn package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the built jar from stage 1 (wildcard version to avoid mismatch)
COPY --from=build /app/target/*.jar ./audio-intel-backend.jar

# Expose port 8080
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "audio-intel-backend.jar"]
