import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export class JwtMiddleWare {
    public generateToken = async(payload: any): Promise<any> => {
        const token = jwt.sign(payload,process.env.JWT_SECRET as string,{
            expiresIn:  '90d'
        });

        //refresh token - further use
        const refreshtoken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET as string,{
            expiresIn: '90d'
        })
        return {token, refreshtoken};
    }
    
    public verifyToken = async(req: Request, res: Response, next: NextFunction ): Promise<any> => {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.send("token missing");
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            (req as any).user = decoded;
            next();
        } catch (error: any) {
            return res.send("something went's wrong")
        }
    }

    public checkRole(role: string) {
        return (req:Request, res:Response, next:NextFunction): any => {
            if ((req as any).user?.role !== role) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        }
    }
}