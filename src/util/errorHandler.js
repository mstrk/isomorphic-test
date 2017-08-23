
const dev = (err, req, res, next) => {
  res.status(err.status || 500).json({
      message: err.message,
      error: err
  })
}

const prod  = (err, req, res, next) => {
  res.status(err.status || 500).json({
      message: err.message,
      error: {}
  })
}

export default { dev, prod }
