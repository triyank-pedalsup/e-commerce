import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { InjectCls } from "../../decorator/inject-cls";
import { UserService } from "./user.service";
import { JwtMiddleWare } from "../../middleware/jwt.middleware";
import { customLogger } from "../../helpers/logger.helpers"

export class UserController {

    @InjectCls(UserService)
    private userService: UserService;

    @InjectCls(JwtMiddleWare)
    private jwtMiddleWare : JwtMiddleWare;

    public register = async (req: Request, res: Response): Promise<any> => {
        try {
            const { name, email, password, role } = req.body;

            const existingUser = await this.userService.findUserByEmail(email);
            if(existingUser){
                return res.send("email already registered")
            }

            if(role!=='admin' && role!=='user'){
                return res.send({message: "Invalid role. Role must be 'admin' or 'user'"})
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const data = await this.userService.register({
                name,
                email,
                password: hashPassword,
                role,
            }); 

            customLogger.info("new user created");
            
            res.status(201).json({ message: `${role} account created successfully`, data });

        } catch (error) {
            customLogger.error(`error in creating user: ${(error as any).message}`)
            res.status(500).json({ message: "error in registration" });
        }
       
    };

    public login = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.send("Email and password required");
            }

            const user = await this.userService.login({email});

            if (!user) {
                return res.send("User not found");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.send("Password is invalid");
            }

            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
            }

            const token = await this.jwtMiddleWare.generateToken(payload);

            res.status(200).json({ message: "Logged in successfully", token });
        } catch (error) {
            res.status(500).json({ message: "Logged in fail" });
        }
    };

    public adminLogin = async(req: Request, res: Response) => {
        try {
            res.status(200).json({message: 'admin login successfully'});
        } catch (error) {
            res.status(500).json({ message: 'admin not found', error: error });
        }
    }

    public userLogin = async(req: Request, res: Response) => {
        try {
            res.status(200).json({message: 'user login successfully'});
        } catch (error) {
            res.status(500).json({ message: 'user not found', error: error });
        }
    }

}
