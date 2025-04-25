import { InjectCls } from "../../decorator/inject-cls";
import { Request, Response } from "express";
import { PurchaseService } from "./purchase.service";

export class PurchaseController {

    @InjectCls(PurchaseService)
    private purchaseService : PurchaseService;

    //purchase product - only user
    public purchaseProduct = async(req: Request, res: Response) :Promise<any>=> {
        try {
            const {
                productId,
                quantity,
            } = req.body;
    
            const user = (req as any).user;
    
            if(!productId || !quantity || quantity<=0){
                return res.send({ message: "productId and quantity is required, quantity is positive" })
            }
    
            const product = await this.purchaseService.findProduct(parseInt(productId))
    
            if(!product){
                return res.send({ message: "product is notfound" })
            }
    
            let balance = 200000;
    
            const totalPrice = product.price * quantity;
    
            if(totalPrice>balance){
                return res.send({ message: "balance is insufficient" })
            }
    
            balance -= totalPrice;
    
            const purchase = await this.purchaseService.purchase({
                    userId: user.id,
                    productId: productId,
                    quantity,
                    totalPrice,
            })
            
            res.send({ message:"product purchase successfully",
                purchaseDetails: {
                    productId: productId,
                    productName: product.name,
                    quantity: quantity,
                    totalPrice: totalPrice,
                    balance
                }
            })
        } catch (error) {
            res.status(500).json({ message: "error in purchasing product" })
        }
    }
}