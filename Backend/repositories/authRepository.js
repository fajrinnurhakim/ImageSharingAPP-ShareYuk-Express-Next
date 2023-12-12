const prisma = require("../lib/prisma.js");

class AuthRepository {
    static async findByEmail(email) {
        try {
            const user = await prisma.users.findOne({
                where: {
                    email,
                },
            });

            if (!user) {
                throw { name: "UserNotFound" };
            }

            return user;
        } catch (err) {
            throw err;
        }
    }

    static async create(user) {
        try {
            const newUser = await prisma.users.create(user);

            return newUser;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = AuthRepository;
