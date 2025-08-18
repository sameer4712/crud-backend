
export const checking = async (req, res) => {
    const { email, password } = req.body;
    if (email === " ") {
        res.json({ message: "email is required" })
    }
    if (password === " ") {
        res.json("password required")
    }
}