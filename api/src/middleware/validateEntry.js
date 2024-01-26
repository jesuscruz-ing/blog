const { body, validationResult } = require('express-validator')

async function validateEntry (req, res, next) {
  const validations = [
    body('title').trim().notEmpty().isLength({ max: 50 }),
    body('author').trim().notEmpty().isLength({ max: 50 }),
    body('content').trim().notEmpty()
  ]

  for (const validation of validations) {
    const result = await validation.run(req)
    if (result.errors.length) break
  }

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  res.json({
    error: errors.array(),
    value: null
  })
}

module.exports = { validateEntry }
