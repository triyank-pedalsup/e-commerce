import { InjectCls } from "../../decorator/inject-cls";
import { Request, Response } from "express";
import { PurchaseService } from "./purchase.service";
import { customLogger } from "../../helpers/logger.helpers";

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

            customLogger.info("successfully purchase product")
            
            res.send({ message: "product purchase successfully",
                purchaseDetails: {
                    productId: productId,
                    productName: product.name,
                    quantity: quantity,
                    totalPrice: totalPrice,
                    balance
                }
            })
        } catch (error) {
            customLogger.error(`Error in purchasing product: ${(error as any).message}`);
            res.status(500).json({ message: "error in purchasing product" })
        }
    }

    //purchaseHistory
    public purchaseHistory = async(req: Request,res: Response): Promise<any> => {
        try {
            const id = parseInt(req.params.id);
            const purchaseHistory = await this.purchaseService.purchaseHistory(id);
    
            if (!purchaseHistory || purchaseHistory.length === 0) {
                return res.status(404).json({ message: "No purchase history found" });
            }

            const formattedHistory = purchaseHistory.map(purchase => ({
                productName: purchase.product.name,
                quantity: purchase.quantity,
                totalPrice: purchase.totalPrice,               
            }));

            res.status(200).json({
                message: "purchase history",
                purchaseHistory: formattedHistory
            })
        } catch (error) {
            res.status(500).json({ message: "error to find purchase history" })
        }
    }
}