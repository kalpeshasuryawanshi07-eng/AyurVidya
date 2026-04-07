/**
 * Request sanitization middleware
 *
 * Prevents basic NoSQL injection and strips malformed input by:
 * - Removing keys that start with '$' or include '.'
 * - Trimming string values
 * - Removing null bytes from strings
 */

function sanitizeString(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\0/g, '').trim();
}

function sanitizeObject(input) {
  if (Array.isArray(input)) {
    return input.map(sanitizeObject);
  }

  if (!input || typeof input !== 'object') {
    return sanitizeString(input);
  }

  const output = {};
  for (const [key, value] of Object.entries(input)) {
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }
    output[key] = sanitizeObject(value);
  }

  return output;
}

function sanitizeRequest(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params);
  }
  next();
}

module.exports = sanitizeRequest;
