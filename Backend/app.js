require("dotenv");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

function authenticateTokenMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
}

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        allowedHeaders:
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        optionsSuccessStatus: 200,
    })
);

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, Date.now() + "-" + fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const { password: passwordDB, ...user } = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.json({ user });
    } catch (err) {
        res.status(400).json({ message: "User already exists" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Invalid credentials" });
    }
});

app.post(
    "/shares",
    authenticateTokenMiddleware,
    upload.single("image"),
    async (req, res) => {
        const { caption } = req.body;
        try {
            const share = await prisma.share.create({
                data: {
                    caption,
                    image: req.file.path,
                    user_id: req.userId,
                },
            });
            res.json({ share });
        } catch (err) {
            console.log("err", err);
            res.status(400).json({ message: "Share creation failed" });
        }
    }
);

app.get("/shares", async (req, res) => {
    const shares = await prisma.share.findMany();
    res.json({ shares });
});

app.put("/shares/:id", authenticateTokenMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { caption } = req.body;

        if (!caption) {
            return res.status(400).json({ message: "Caption is required" });
        }

        const share = await prisma.share.update({
            where: { id: Number(id) },
            data: { caption },
        });

        res.json({ share });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/shares/:id", authenticateTokenMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const share = await prisma.share.delete({
            where: { id: Number(id) },
        });
        res.json({ share });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something went wrong" });
    }
});

app.get("/shares/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const share = await prisma.share.findUnique({
            where: { id: Number(id) },
        });
        res.json({ share });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something went wrong" });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
