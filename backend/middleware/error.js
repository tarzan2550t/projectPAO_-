module.exports = (err, req, res, next) => {
    console.log('🔥 ERROR HIT:', err.message, err.status)
    const status = err.status || 500
    const message = err.message || 'inserver EORR'
    res.status(status).json({ message })
}