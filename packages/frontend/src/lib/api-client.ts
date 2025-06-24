import { hc } from "hono/client";

import type { AppType } from "../../../backend/src/index.js";

export const client = hc<AppType>("http://localhost:3000");
