export type AuthErrorCode =
  | "WEAK_PASSWORD"
  | "EMAIL_TAKEN"
  | "INVALID_EMAIL"
  | "INVALID_NAME"
  | "INVALID_CREDENTIALS"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN";

export type AuthFieldErrors = {
  emailOrPhone?: string;
  password?: string;
  fullName?: string;
};

export type FormattedAuthError = {
  message: string;
  code: AuthErrorCode;
  fieldErrors?: AuthFieldErrors;
};

type GatewayErrorBody = {
  message?: string | string[];
  error?: string;
  code?: string;
  statusCode?: number;
  errors?: Record<string, string | string[]>;
  details?: unknown;
};

type FormatAuthErrorOptions = {
  operation?: "signup" | "login";
};

function collectMessages(data: GatewayErrorBody): string[] {
  const parts: string[] = [];

  if (Array.isArray(data.message)) {
    parts.push(...data.message);
  } else if (typeof data.message === "string") {
    parts.push(data.message);
  }

  if (typeof data.error === "string") parts.push(data.error);
  if (typeof data.code === "string") parts.push(data.code);

  if (data.errors && typeof data.errors === "object") {
    for (const value of Object.values(data.errors)) {
      if (Array.isArray(value)) parts.push(...value);
      else if (typeof value === "string") parts.push(value);
    }
  }

  return parts.filter(Boolean);
}

function matchesAny(haystack: string, needles: string[]): boolean {
  const lower = haystack.toLowerCase();
  return needles.some((n) => lower.includes(n));
}

function loginInvalidCredentials(
  passwordHint = "Check your email and password.",
): FormattedAuthError {
  return {
    code: "INVALID_CREDENTIALS",
    message: "Email or password is incorrect.",
    fieldErrors: { password: passwordHint },
  };
}

function formatLoginAuthError(
  body: GatewayErrorBody,
  status: number,
  messages: string[],
  joined: string,
): FormattedAuthError {
  if (status >= 500) {
    return {
      code: "SERVER_ERROR",
      message: "Something went wrong. Try again in a moment.",
    };
  }

  if (
    status === 401 ||
    status === 403 ||
    body.code === "AUTH_003" ||
    matchesAny(joined, [
      "invalid credentials",
      "unauthorized",
      "wrong password",
      "incorrect password",
    ])
  ) {
    return loginInvalidCredentials();
  }

  if (matchesAny(joined, ["email", "e-mail"]) && matchesAny(joined, ["invalid", "must be", "format"])) {
    return {
      code: "INVALID_EMAIL",
      message: "Enter a valid email address.",
      fieldErrors: { emailOrPhone: "Enter a valid email or phone number." },
    };
  }

  if (status >= 400 && status < 500) {
    return loginInvalidCredentials();
  }

  return {
    code: "UNKNOWN",
    message: "Something went wrong. Try again.",
  };
}

function mapFieldErrors(
  messages: string[],
  code: AuthErrorCode,
): AuthFieldErrors | undefined {
  const joined = messages.join(" ").toLowerCase();
  const fieldErrors: AuthFieldErrors = {};

  if (
    code === "WEAK_PASSWORD" ||
    matchesAny(joined, ["password", "newpassword", "new_password", "strong"])
  ) {
    fieldErrors.password =
      "Use at least 8 characters with both letters and numbers (avoid common passwords like 12345678).";
  }

  if (
    code === "EMAIL_TAKEN" ||
    matchesAny(joined, ["email", "e-mail", "already", "exists", "duplicate", "registered"])
  ) {
    if (matchesAny(joined, ["email", "e-mail", "already", "exists", "duplicate", "registered"])) {
      fieldErrors.emailOrPhone =
        code === "EMAIL_TAKEN"
          ? "This email is already registered."
          : "Enter a valid email or phone number.";
    }
  }

  if (matchesAny(joined, ["firstname", "first name", "lastname", "last name", "full name"])) {
    fieldErrors.fullName = "Enter your full name.";
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

export function formatAuthError(
  data: unknown,
  status: number,
  options?: FormatAuthErrorOptions,
): FormattedAuthError {
  const body = (data ?? {}) as GatewayErrorBody;
  const messages = collectMessages(body);
  const joined = messages.join(" ").toLowerCase();
  const isGenericBadRequest =
    messages.length === 0 ||
    messages.every((m) => /bad request exception/i.test(m) || m === "Bad Request");

  if (options?.operation === "login") {
    return formatLoginAuthError(body, status, messages, joined);
  }

  if (status >= 500) {
    return {
      code: "SERVER_ERROR",
      message: "Something went wrong. Try again in a moment.",
    };
  }

  if (matchesAny(joined, ["invalid credentials", "unauthorized", "wrong password", "incorrect password"])) {
    return loginInvalidCredentials("Check your password and try again.");
  }

  if (
    status === 409 ||
    matchesAny(joined, [
      "already exists",
      "already registered",
      "duplicate",
      "email taken",
      "user exists",
      "conflict",
    ])
  ) {
    return {
      code: "EMAIL_TAKEN",
      message: "An account with this email already exists. Sign in instead.",
      fieldErrors: { emailOrPhone: "This email is already registered." },
    };
  }

  if (
    matchesAny(joined, [
      "password",
      "newpassword",
      "new_password",
      "strong password",
      "password strength",
      "too weak",
    ])
  ) {
    return {
      code: "WEAK_PASSWORD",
      message:
        "Password must be stronger: use at least 8 characters with letters and numbers (and avoid common passwords like 12345678).",
      fieldErrors: {
        password:
          "Use at least 8 characters with both letters and numbers (avoid common passwords like 12345678).",
      },
    };
  }

  if (matchesAny(joined, ["email", "e-mail"]) && matchesAny(joined, ["invalid", "must be", "format"])) {
    return {
      code: "INVALID_EMAIL",
      message: "Enter a valid email address.",
      fieldErrors: { emailOrPhone: "Enter a valid email or phone number." },
    };
  }

  if (matchesAny(joined, ["firstname", "lastname", "first name", "last name"])) {
    return {
      code: "INVALID_NAME",
      message: "Enter your full name.",
      fieldErrors: { fullName: "Enter your first name and last name." },
    };
  }

  if (isGenericBadRequest && options?.operation === "signup") {
    return {
      code: "VALIDATION_ERROR",
      message:
        "We couldn't create your account. Use a stronger password (letters and numbers), or sign in if this email is already registered.",
      fieldErrors: {
        password:
          "Use at least 8 characters with both letters and numbers (avoid common passwords like 12345678).",
      },
    };
  }

  if (isGenericBadRequest) {
    return {
      code: "VALIDATION_ERROR",
      message: "We couldn't complete your request. Check your details and try again.",
    };
  }

  if (messages.length > 0) {
    const fieldErrors = mapFieldErrors(messages, "VALIDATION_ERROR");
    return {
      code: "VALIDATION_ERROR",
      message: messages.join(" "),
      fieldErrors,
    };
  }

  return {
    code: "UNKNOWN",
    message:
      status === 400
        ? "We couldn't complete your request. Check your details and try again."
        : "Something went wrong. Try again.",
  };
}

/** Reference shapes from gateway/NestJS — tune matchers when capturing real responses. */
export const AUTH_ERROR_GATEWAY_FIXTURES = {
  weakPassword: {
    status: 400,
    body: { message: ["password must be stronger", "password should not be empty"], statusCode: 400 },
    operation: "signup" as const,
  },
  loginUnauthorized: {
    status: 401,
    body: { message: "Unauthorized", code: "AUTH_003", statusCode: 401 },
    operation: "login" as const,
  },
  loginPasswordPolicyOnSignIn: {
    status: 400,
    body: { message: ["password must be stronger"], statusCode: 400 },
    operation: "login" as const,
  },
  emailTaken: {
    status: 409,
    body: { message: "User with this email already exists", statusCode: 409 },
    operation: "signup" as const,
  },
  genericBadRequest: {
    status: 400,
    body: { message: "Bad Request Exception", statusCode: 400 },
    operation: "signup" as const,
  },
} satisfies Record<string, { status: number; body: GatewayErrorBody; operation: "signup" | "login" }>;
