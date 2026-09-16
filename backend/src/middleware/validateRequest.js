export class RequestValidationError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = "RequestValidationError";
    this.status = 422;
    this.fields = fields;
  }
}

export function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object || {}, key);
}

export function requiredString(value, field, options = {}) {
  const {
    min = 1,
    max = 5000,
    trim = true,
  } = options;

  if (typeof value !== "string") {
    throw new RequestValidationError(`${field} is required.`, {
      [field]: "Must be a text value.",
    });
  }

  const result = trim ? value.trim() : value;

  if (result.length < min) {
    throw new RequestValidationError(`${field} is required.`, {
      [field]: `Must contain at least ${min} character${min === 1 ? "" : "s"}.`,
    });
  }

  if (result.length > max) {
    throw new RequestValidationError(`${field} is too long.`, {
      [field]: `Must not exceed ${max} characters.`,
    });
  }

  return result;
}

export function optionalString(value, field, options = {}) {
  const {
    max = 5000,
    trim = true,
    nullable = true,
  } = options;

  if (value === undefined) return undefined;
  if (value === null && nullable) return null;

  if (typeof value !== "string") {
    throw new RequestValidationError(`${field} must be text.`, {
      [field]: "Must be a text value.",
    });
  }

  const result = trim ? value.trim() : value;

  if (result.length > max) {
    throw new RequestValidationError(`${field} is too long.`, {
      [field]: `Must not exceed ${max} characters.`,
    });
  }

  return result || (nullable ? null : "");
}

export function optionalBoolean(value, field) {
  if (value === undefined) return undefined;

  if (typeof value !== "boolean") {
    throw new RequestValidationError(`${field} must be true or false.`, {
      [field]: "Must be a boolean.",
    });
  }

  return value;
}

export function optionalEnum(value, field, allowedValues) {
  if (value === undefined) return undefined;

  if (!allowedValues.includes(value)) {
    throw new RequestValidationError(`${field} is invalid.`, {
      [field]: `Allowed values: ${allowedValues.join(", ")}.`,
    });
  }

  return value;
}

export function optionalDate(value, field) {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new RequestValidationError(`${field} must be a valid date.`, {
      [field]: "Use an ISO date string.",
    });
  }

  return date;
}

export function optionalUrl(value, field) {
  const result = optionalString(value, field, {
    max: 2048,
  });

  if (!result) return result;

  try {
    const parsed = new URL(result);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Unsupported protocol");
    }

    return result;
  } catch {
    throw new RequestValidationError(`${field} must be a valid URL.`, {
      [field]: "Use a full http or https URL.",
    });
  }
}

export function optionalIdArray(value, field) {
  if (value === undefined) return undefined;

  if (!Array.isArray(value)) {
    throw new RequestValidationError(`${field} must be an array.`, {
      [field]: "Must be an array of IDs.",
    });
  }

  const ids = [...new Set(value.map((item) => String(item || "").trim()))]
    .filter(Boolean);

  if (ids.length !== value.length) {
    throw new RequestValidationError(`${field} contains invalid values.`, {
      [field]: "Each item must be a non-empty ID.",
    });
  }

  if (ids.length > 20) {
    throw new RequestValidationError(`${field} contains too many items.`, {
      [field]: "A post may have at most 20 tags.",
    });
  }

  return ids;
}

export function validateSlug(value, field = "slug") {
  const slug = requiredString(value, field, {
    min: 3,
    max: 120,
  }).toLowerCase();

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new RequestValidationError(`${field} is invalid.`, {
      [field]:
        "Use lowercase letters, numbers, and single hyphens only.",
    });
  }

  return slug;
}

export function requireBodyObject(req) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    throw new RequestValidationError("Request body must be a JSON object.");
  }

  return req.body;
}