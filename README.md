# diks-budget

A Node.js/TypeScript backend for budget management, built with a layered architecture.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (install with `npm install -g pnpm`)
- [TypeScript](https://www.typescriptlang.org/) (install with `pnpm add -D typescript`)

### Installation & Running

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd diks-budget
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Start the server:**
   ```sh
   pnpm exec ts-node src/index.ts
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

---

## Architecture

This project uses a **layered architecture** (also known as "clean architecture") to separate concerns and improve maintainability:

- **Business Layer**  
  Contains core domain logic, such as budget selection and validation.  
  Example: [`BudgetBusiness`](src/business/BudgetBusiness.ts)

- **Service Layer**  
  Handles validation, error handling, and coordinates business logic.  
  Example: [`BudgetService`](src/services/BudgetService.ts)

- **Controller Layer**  
  Handles HTTP requests, validates input, and calls the service layer.  
  Example: [`BudgetController`](src/controllers/BudgetController.ts)

- **Routes**  
  Maps Express routes to controller methods.  
  Example: [`budgetRoutes`](src/routes/BudgetRoutes.ts)

- **Entry Point**  
  [`index.ts`](src/index.ts) starts the Express server and wires everything together.

### How the Layers Work Together

1. **Express** receives an HTTP request.
2. The **route** calls the appropriate method on the **controller**.
3. The **controller** validates input and calls the **service**.
4. The **service** performs further validation and uses the **business layer** for domain logic.
5. The **business layer** executes the core logic (e.g., finding a suitable budget).
6. The result is returned through the controller to the client.

---

## Testing

Unit tests are provided for controllers and services using [Vitest](https://vitest.dev/):

- Example: [`src/controllers/BudgetController.test.ts`](src/controllers/BudgetController.test.ts)
- Example: [`src/services/BudgetService.test.ts`](src/services/BudgetService.test.ts)

**Run all tests:**
```sh
pnpm test
```

Tests use mocks for dependencies to ensure each layer is tested in isolation.

---

## Example API Usage

- **Get budgets for a team:**
  ```sh
  curl http://localhost:3000/api/budgets/rubberduck
  ```

- **Execute a transaction:**
  ```sh
  curl -X POST http://localhost:3000/api/transaction ^
    -H "Content-Type: application/json" ^
    -d "{\"teamId\":\"rubberduck\",\"memberId\":\"a.feather\",\"amount\":10}"
  ```

---

## Project Structure

```
src/
  index.ts
  business/
    BudgetBusiness.ts
    errorMessages.ts
    errors.ts
    seed.ts
    types/
      Budget.ts
      Team.ts
      TeamMember.ts
      Transaction.ts
  controllers/
    BudgetController.ts
    BudgetController.test.ts
  routes/
    BudgetRoutes.ts
  services/
    BudgetService.ts
    BudgetService.test.ts
```

---

## Linting

Run ESLint to check code style:

```sh
pnpm run lint
```

---

## License

MIT

---

**For questions or contributions, open an issue or pull request on GitHub.**