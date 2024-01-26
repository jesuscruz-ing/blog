const sql = require('mssql')
const config = require('../database/config')

async function index (req, res) {
  try {
    const { title, author, content } = req.query

    await sql.connect(config)

    let queryConditions = ''

    if (title) {
      queryConditions = `WHERE [title] LIKE '%${title}%'`
    } else if (author) {
      queryConditions = `WHERE [author] LIKE '%${author}%'`
    } else if (content) {
      queryConditions = `WHERE [content] LIKE '%${content}%'`
    }

    const result = await sql.query(
      `SELECT [id_entrie] AS [key],[id_entrie],[title],[author],[content],FORMAT([created_at], 'dd/MM/yyyy') AS created_at FROM [blog].[dbo].[entries] ${queryConditions}`
    )

    return res.json({
      error: null,
      value: result.recordset
    })
  } catch (err) {
    return res.json({
      error: err,
      value: null
    })
  }
}

async function create (req, res) {
  await sql.connect(config)

  const { title, author, content } = req.body

  const result = await sql.query(
    `INSERT INTO entries (title, author, content, created_at) VALUES ('${title}', '${author}', '${content}', GETDATE())`
  )

  if (result.rowsAffected.length === 0) {
    return res.json({
      error: 'no se inserto ningún registro',
      value: null
    })
  }

  return res.json({
    error: null,
    value: 'insertado correctamente'
  })
}

module.exports = { index, create }
