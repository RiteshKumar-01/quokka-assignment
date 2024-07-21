const middleware = (req, res, next) => {
    console.log("\n", {
        path: req.path,
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        files: req.files,
        method: req.method,
        header: req.headers,
        ip: req.ip
    }, "\n")
    next()
}

module.exports = middleware
