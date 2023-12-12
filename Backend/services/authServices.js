const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthRepository = require("../repositories/authRepository");

class AuthService {
    static async register(user) {
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const { name, email, password } = user;
            const newUser = await AuthRepository.create({
                name,
                email,
                password: hashedPassword,
            });

            return newUser;
        } catch (err) {
            throw err;
        }
    }

    static async login(credentials) {
        try {
            const { email, password } = credentials;
            const user = await AuthRepository.findByEmail(email);
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw { name: "InvalidCredentials" };
            }

            const token = jwt.sign({ id_user: user.id }, "secret-key", {
                expiresIn: "1h",
            });

            return token;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = AuthService;
