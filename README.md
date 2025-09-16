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

## Features

- **View Available Budgets:**  
  A team member can view all available budgets for their team, including the remaining amount for each budget.  
  _Endpoint:_  
  ```
  GET /api/budgets/:teamId
  ```
  _Example response:_
  ```json
  [
    {
      "id": "2025",
      "teamId": "rubberduck",
      "amount": 200,
      "remaining": 150,
      "validFrom": "2025-01-01T00:00:00.000Z",
      "validTo": "2025-12-31T00:00:00.000Z"
    }
  ]
  ```

- **Execute a Transaction:**  
  A team member can execute a transaction by specifying the amount.  
  The system will automatically apply the transaction to the optimal available budget (the one that is valid, has enough remaining, and expires soonest).  
  _Endpoint:_  
  ```
  POST /api/transaction
  ```
  _Example request:_
  ```json
  {
    "teamId": "rubberduck",
    "memberId": "a.feather",
    "amount": 10
  }
  ```
  _Example response:_
  ```json
  {
    "id": "1718200000000",
    "memberId": "a.feather",
    "budgetId": "2025",
    "amount": 10,
    "date": "2025-06-12T12:00:00.000Z"
  }
  ```

---

## Business Rules

- **A team member can only belong to a single team:**  
  Each team member is associated with exactly one team. The system does not allow a member to be part of multiple teams at the same time.

- **A purchase can only be made if a single budget has enough funds:**  
  When a team member executes a transaction, the system will only allow the purchase if there is a single available budget that can fully cover the requested amount.  
  The system will not split a transaction over multiple budgets.

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

## API Reference

| Endpoint                      | Method | Parameters (location)                | Description                                               | Success Response Example |
|-------------------------------|--------|--------------------------------------|-----------------------------------------------------------|-------------------------|
| `/api/budgets/:teamId`        | GET    | `teamId` (URL path)                  | Get all available budgets for a team, including remaining | `200 OK`, JSON array of budgets |
| `/api/transaction`            | POST   | `teamId`, `memberId`, `amount` (body)| Execute a transaction for a team member; system applies to optimal budget | `200 OK`, JSON transaction object |

### Details

#### `GET /api/budgets/:teamId`

- **Description:** Returns all budgets for the given team, including the remaining amount for each.
- **URL Params:**  
  - `teamId` (string, required): The unique identifier of the team.
- **Success Response:**
  ```json
  [
    {
      "id": "2025",
      "teamId": "rubberduck",
      "amount": 200,
      "remaining": 150,
      "validFrom": "2025-01-01T00:00:00.000Z",
      "validTo": "2025-12-31T00:00:00.000Z"
    }
  ]
  ```
- **Error Responses:**  
  - `400 Bad Request` if `teamId` is missing or invalid  
  - `404 Not Found` if no budgets are found

---

#### `POST /api/transaction`

- **Description:** Executes a transaction for a team member. The system automatically applies the transaction to the optimal available budget.
- **Body Params:**  
  - `teamId` (string, required): The team ID  
  - `memberId` (string, required): The member's ID  
  - `amount` (number, required): The amount to spend
- **Success Response:**
  ```json
  {
    "id": "1718200000000",
    "memberId": "a.feather",
    "budgetId": "2025",
    "amount": 10,
    "date": "2025-06-12T12:00:00.000Z"
  }
  ```
- **Error Responses:**  
  - `400 Bad Request` if any parameter is missing or invalid  
  - `404 Not Found` if no suitable budget is available

---

**For questions or contributions, open an issue or pull request on GitHub.**