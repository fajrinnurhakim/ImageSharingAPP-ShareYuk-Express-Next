const AuthService = require("../services/authServices");

class AuthController {
    static async register(req, res, next) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json({
                message: "User registered successfully",
                user,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const token = await AuthService.login(req.body);
            res.status(200).json({ message: "Login successful", token });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
