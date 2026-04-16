# Amazon Clone (Full-Stack E-Commerce Platform)

A full-stack Amazon India clone. The project encompasses a scalable, decoupled architecture focused on an end-to-end shopping experience, spanning from catalog browsing to cart management and checkout.

## 🚀 Tech Stack

### Frontend (Client)
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components + Lucide React icons
- **State Management**: Zustand (modular slices for Cart, UI, and App state)
- **Architecture**: Domain-driven feature slicing (`src/features/*`) combined with reusable design system primitives (`src/ui/*`)

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma Client
- **Database Engine**: PostgreSQL
- **Data Validation**: Zod
- **Architecture**: Modular layout with specific layer boundaries (Router ➔ Controller ➔ Service ➔ Repository)

---

## 💡 Key Features
- **Responsive E-Commerce UI**: Clean UI with standard Amazon coloring and dynamic grid/flex-box layout.
- **Product Catalog & Search**: Filtering capabilities (by category and text) leveraging backend queries.
- **Cart Management**: Synchronizes cart state across the browser and database.
- **Checkout Workflow**: Checkout sequence including fake delivery address inputs and payment selector (COD, UPI, Card, etc.).
- **Inventory Synchronization**: Transaction handling in the backend Prisma layer preventing checkout if items lose stock dynamically.

---

## ⚙️ Setup Instructions

Ensure you have Node.js (v20+) and access to a PostgreSQL instance.

### 1. Backend Setup (`/server`)

Configure the backend database connection and fire up the server.

```bash
cd server
npm install
```

Create an `.env` file inside the `server/` root and add your PostgreSQL connection URL:
```env
PORT=4000
DATABASE_URL="postgresql://user:password@hostname:port/db_name?sslmode=require"
```

Sync the Prisma schema to generate your SQL tables and seed the initial mock products:
```bash
npx prisma db push
npx prisma generate
npm run seed
```

Start the backend environment:
```bash
npm run dev
```

### 2. Frontend Setup (`/client`)

Link the frontend to your local API backend and launch the Next.js process.

```bash
cd client
npm install
```

Create an `.env.local` file inside the `client/` root containing your API proxy endpoint (default `http://localhost:4000`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start the frontend environment:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔒 Assumptions & Architectural Decisions

1. **Guest Browsing & Authentication**: 
   - A traditional JWT-based login is omitted in favor of "Guest Sessions".
   - The Next.js client generates a UUID pseudo-token stored in the browser's `localStorage` (as `x-guest-id`).
   - The backend validates this token via middleware and automatically associates or creates an implicit shadow user/cart row in PostgreSQL for tracking their activities without a rigorous signup phase.
2. **Transaction & Payment Simulation**: 
   - The checkout completion flow generates "successful" orders using fake endpoints. Actual external payment gateways (e.g., Stripe, Razorpay) are not implemented. Selecting UPI or Card simulates a completed intent and locks off the cart items securely in the database.
3. **Optimistic UI vs Synchronized State**: 
   - The Zustand store relies rigorously on the server truth. Most modifications to the cart state dynamically fetch verification from the database through API channels rather than performing pure optimistic UI modifications. This explicitly avoids visual mismatch bugs.
4. **Prisma Environment Context**: 
   - Prisma relies entirely natively on `process.env.DATABASE_URL` via dotenv parsing. Brittle `.ts` config file injectors were purposely cleaned to ensure no environment race condition.
