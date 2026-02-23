const jwt = require('jsonwebtoken')

module.exports = (...roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization
    //   console.log(authHeader)

      // ไม่มี Authorization header
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'ไม่มี token'
        })
      }

      // ดึง token
      const token = authHeader.split(' ')[1]

      // verify token
      const payload = jwt.verify(token, process.env.JWT_SECRETFILE)

      // เช็ค role (ถ้ามีการกำหนด role)
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({
          success: false,
          message: 'คุณไม่มีสิทธิ์เข้าใช้งาน'
        })
      }

      // แนบข้อมูล user
      req.user = payload
      next()

    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token ไม่ถูกต้องหรือหมดอายุ'
      })
    }
  }
}
