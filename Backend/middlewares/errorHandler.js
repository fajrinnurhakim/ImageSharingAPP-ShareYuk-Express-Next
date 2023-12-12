const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err.name === "ErrorNotFound") {
        return res.status(404).json({ message: "ErrorNotFound" });
    } else if (err.name === "EmailAlreadyExists") {
        return res.status(400).json({ message: err.message });
    } else {
        return res.status(500).json({ message: "Internal Service Error" });
    }
};

module.exports = errorHandler;
