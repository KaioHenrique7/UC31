import session from "express-session";

const sessionConfig = session({
    secret: "oficina-mecanica-uc31",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hora
    }
});

export default sessionConfig;