# Use Maven + JDK 17 image
FROM maven:3.9.3-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the project (skip tests for faster build)
RUN mvn package -DskipTests

# Use smaller JDK runtime image for final app
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/audio-intel-backend-0.0.1-SNAPSHOT.jar ./audio-intel-backend.jar

# Expose port
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "audio-intel-backend.jar"]
