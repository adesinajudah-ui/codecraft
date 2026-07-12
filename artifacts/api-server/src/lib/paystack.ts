// Minimal Paystack REST client. Uses the "redirect" checkout flow: we
// initialize a transaction from the backend (secret key only, never exposed
// to the browser), send the user to Paystack's hosted authorization_url, and
// verify the transaction reference on the backend when they return. No
// public key or Paystack.js is required for this flow.
import { logger } from "./logger";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export class PaystackNotConfiguredError extends Error {
  constructor() {
    super("Paystack is not configured. Set the PAYSTACK_SECRET_KEY secret to enable payments.");
    this.name = "PaystackNotConfiguredError";
  }
}

export class PaystackApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "PaystackApiError";
  }
}

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new PaystackNotConfiguredError();
  return key;
}

export function isPaystackConfigured(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

interface InitializeTransactionResult {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

/**
 * Initializes a Paystack transaction. Amount must be passed in kobo
 * (Naira * 100) per Paystack's API contract.
 */
export async function initializeTransaction(params: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}): Promise<InitializeTransactionResult> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  const body = (await res.json().catch(() => null)) as any;
  if (!res.ok || !body?.status) {
    logger.error({ status: res.status, body }, "Paystack initialize transaction failed");
    throw new PaystackApiError(body?.message ?? "Failed to initialize Paystack transaction", res.status);
  }

  return {
    authorizationUrl: body.data.authorization_url,
    accessCode: body.data.access_code,
    reference: body.data.reference,
  };
}

export type PaystackVerificationStatus = "success" | "failed" | "abandoned" | "pending" | "unknown";

interface VerifyTransactionResult {
  status: PaystackVerificationStatus;
  amountKobo: number;
  reference: string;
  currency: string;
}

/** Verifies a transaction reference directly with Paystack — never trust a client-reported status. */
export async function verifyTransaction(reference: string): Promise<VerifyTransactionResult> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${getSecretKey()}` },
  });

  const body = (await res.json().catch(() => null)) as any;
  if (!res.ok || !body?.status) {
    logger.error({ status: res.status, body }, "Paystack verify transaction failed");
    throw new PaystackApiError(body?.message ?? "Failed to verify Paystack transaction", res.status);
  }

  const paystackStatus: string = body.data?.status ?? "unknown";
  const status: PaystackVerificationStatus =
    paystackStatus === "success" || paystackStatus === "failed" || paystackStatus === "abandoned"
      ? paystackStatus
      : "pending";

  return {
    status,
    amountKobo: body.data?.amount ?? 0,
    reference: body.data?.reference ?? reference,
    currency: body.data?.currency ?? "NGN",
  };
}
