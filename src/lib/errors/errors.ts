export type ActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
        fieldErrors?: Record<string, string[]>;
        requestId?: string;
      };
    };

export class AppError extends Error {
  code: string;
  fieldErrors?: Record<string, string[]>;

  constructor(message: string, code = 'INTERNAL_ERROR', fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Unauthenticated access') {
    super(message, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 'AUTHORIZATION_ERROR');
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', fieldErrors?: Record<string, string[]>) {
    super(message, 'VALIDATION_ERROR', fieldErrors);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Record not found') {
    super(message, 'NOT_FOUND_ERROR');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource state conflict') {
    super(message, 'CONFLICT_ERROR');
  }
}

export class BusinessRuleError extends AppError {
  constructor(message = 'Business rule violated') {
    super(message, 'BUSINESS_RULE_ERROR');
  }
}

export class StorageError extends AppError {
  constructor(message = 'Storage provider error') {
    super(message, 'STORAGE_ERROR');
  }
}

export class IntegrationError extends AppError {
  constructor(message = 'External system integration error') {
    super(message, 'INTEGRATION_ERROR');
  }
}

export function handleActionError(error: any): ActionResult<never> {
  console.error('❌ Action execution failed:', error);
  
  if (error instanceof AppError) {
    return {
      success: 	false,
      error: {
        code: error.code,
        message: error.message,
        fieldErrors: error.fieldErrors,
      },
    };
  }

  // Map known Prisma DB errors into clean domain exceptions
  if (error?.code && typeof error.code === 'string' && error.code.startsWith('P')) {
    if (error.code === 'P2002') {
      return {
        success: false,
        error: {
          code: 'CONFLICT_ERROR',
          message: 'A duplicate record violation occurred on unique constraints.',
        },
      };
    }
    if (error.code === 'P2025') {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'The requested record or parent association does not exist.',
        },
      };
    }
  }

  return {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected internal error occurred. Please contact system support.',
    },
  };
}
