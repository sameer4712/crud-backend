function user(req, res, next){
    if (req.session.user) {
        next()
    }
    else {
        res.json({ message: "You are not Logged in" })
    }
}

export default user
