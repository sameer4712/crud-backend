function admin(req, res, next)  {
    if (req.session.admin) {
        next()
    }
    else {
        res.json({ message: "You are not Logged in" })
    }

}
export default admin