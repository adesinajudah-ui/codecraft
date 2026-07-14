import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import router from "./routes";
import { logger } from "./lib/logger";
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
} from "./middlewares/clerkProxyMiddleware";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());

app.use(cors({ credentials: true, origin: true }));
// Capture the exact raw request body bytes alongside the parsed JSON so the
// Paystack webhook handler can verify the `x-paystack-signature` HMAC, which
// must be computed over the untouched raw payload, not a re-serialized copy.
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as unknown as { rawBody: Buffer }).rawBody = Buffer.from(buf);
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

// Use env vars directly — publishableKeyFromHost is for multi-tenant apps where
// the key is embedded in the domain name. Using it here (host = 127.0.0.1:8080
// from Vite's proxy) computed the wrong key, causing every session verification
// to fail and requireAuth() to redirect every request.
app.use(clerkMiddleware());

app.use("/api", router);

export default app;
