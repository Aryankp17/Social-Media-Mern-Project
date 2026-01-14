
import jwt from 'jsonwebtoken'
export const isloggedin = (req, res, next) => {
    try {
        if (!req.cookies.token) {
            return res.status(401).json({
                success: false,
                error: "User not logged in"
            })
        }
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, function (err, decoded) {
                if (!decoded) {
                    return res.status(401).json({
                        success: false,
                        error: "UnAuthorized access"
                    })
                }
                if (decoded) {
                    req.user = decoded

                }
                next();
            });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })

    }

}