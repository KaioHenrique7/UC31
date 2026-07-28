import { Request, Response, NextFunction } from "express";

export default function auth(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const sessao = (req as any).session;

    if (!sessao || !sessao.usuario) {
        res.redirect("/auth/login");
        return;
    }

    next();
}