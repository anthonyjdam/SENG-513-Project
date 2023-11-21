import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../packages/api/server"

export const trpc = createTRPCReact<AppRouter>();