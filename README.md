# Redis Test

This project demonstrates how to connect to Azure Redis Cache using either Azure Entra ID authentication or an access key.

## Prerequisites

- Node.js (v22.14.0 as specified in `.nvmrc`)
- Azure Redis Cache instance
- Azure Entra ID credentials (if using Entra ID authentication)

## Setup

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone <repository-url>
   cd azure-redis-test
   
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Azure Redis Cache connection details:

   ```bash
   cp .env.example .env
   ```

    Fill in the `.env` file with your Redis Cache details...

4. Ensure you are using the correct Node.js version:

    ```bash
    nvm use
    ```

## Usage

Run the project using the following command:

   ```bash
   npm start
   ```

By default, the project uses Azure Entra ID authentication. To switch to access key authentication, modify the main function call in src/main.ts:

```typescript
main("key");
```

## Scripts

- `npm start`: Starts the application.
- `npm run lint`: Lints the code using ESLint.
- `npm run format`: Formats the code using Prettier.

## License

This project is licensed as UNLICENSED.
