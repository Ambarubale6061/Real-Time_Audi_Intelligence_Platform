# Use OpenJDK 17 (Alpine for smaller image)
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for caching dependencies)
COPY mvnw .
COPY .mvn/ .mvn
COPY pom.xml .

# Copy source code
COPY src ./src

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the Spring Boot application (skip tests for faster build)
RUN ./mvnw package -DskipTests

# Expose port 8080 (Render default)
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "target/audio-intel-backend-0.0.1-SNAPSHOT.jar"]
