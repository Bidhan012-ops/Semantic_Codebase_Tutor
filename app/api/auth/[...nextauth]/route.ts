// app/api/auth/[...nextauth]/route.ts
import { handlers } from "./option"; // Imports from your logic file
export const { GET, POST } = handlers;