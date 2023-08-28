# SixthSense: Financial Data Visualization - ConUHacks 2023
Final Project for ConUHacks 2023 National Bank of Canada Challenge.
Challenge: Render and visualize order book data in real time; your work should result in a ~4 minute animated visualization. The goal is to expose patterns in the data that would not be obvious if looking on a message per message basis.

## Project description
SixthSense aims to deliver financial insights by leveraging market data feeds. Developed using React and Spring Boot, the platform offers immediate updates on stock prices, maintains a message counter for tracking market activities, and incorporates a specialized anomaly detection system to flag irregularities in market orders.

## Demo
![Screenshot 2023-08-27 at 5 53 04 PM](https://github.com/Jatin-Pat/SixthSense-ConUHacks/assets/86209713/2d1bccee-d955-45b4-9ed8-2c0dc4b96b85)

## Prerequisites
Prerequisites:
* Java 11 or higher
* Node.js and npm

## Repository Organization

1. `.mvn/`
   * Maven wrapper configuration and library files.
   
2. `client/`
   * Contains all React related files for the frontend.
     * `public/`
       * Public assets like HTML files and favicons.
     * `src/`
       * React components, services, and other JavaScript files.
     * `package.json`
       * Defines scripts, dependencies, and other configurations for the React application.
     * `package-lock.json`
       * Locks the versions of dependencies for consistent installs.

3. `src/`
   * Contains all Spring Boot backend related files.
     * `main/`
       * Main application source code.
         * `java/`
           * Java classes for the Spring Boot application.
             * `stockvisualizer/`
               * Contains specific classes like controllers, models, and services.
         * `resources/`
           * Configuration files, static resources, and templates.

4. `mvnw` and `mvnw.cmd`
   * Maven wrapper scripts for Unix-based systems and Windows, respectively.
   
5. `pom.xml`
   * Defines project information, dependencies, plugins, goals, etc., for Maven.

6. `.vscode/`
   * Configuration and settings files for the VS Code editor.
   
7. `.idea/`
   * Configuration and settings files for the IntelliJ IDEA.

8. `node_modules/`
   * Installed npm packages (this folder should be in `.gitignore`).

9. `StockVisualizerApplication`
   * (Description of this file or directory was not provided. If this is an important part, provide a brief description.)

(Note: Adjust the hierarchy and add more details as needed based on your specific project structure.)

## Running the Application Locally

1. **Backend Setup (Spring Boot)**
   * Navigate to the root directory of the repository.
   * Build the Spring Boot application using Maven:
     ```bash
     ./mvnw clean install
     ```
   * Run the application:
     ```bash
     ./mvnw spring-boot:run
     ```

2. **Frontend Setup (React)**
   * Navigate to the `client` directory:
     ```bash
     cd client
     ```
   * Install required npm packages:
     ```bash
     npm install
     ```
   * Start the React development server:
     ```bash
     npm start
     ```

3. **Access the Application**
   * Once both backend and frontend are running, open a web browser and navigate to:
     ```
     http://localhost:3000/
     ```
   * (Replace the port `3000` if your React app runs on a different port.)

(Note: Please ensure you have the required software installed, as mentioned in the 'Prerequisites' section.)
