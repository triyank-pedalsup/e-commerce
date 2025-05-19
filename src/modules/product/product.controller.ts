import { InjectCls } from "../../decorator/inject-cls";
import { Request, Response } from "express"
import { ProductService } from "./product.service";

export class ProductController {

    @InjectCls(ProductService)
    private productService : ProductService;

    //create product - only admin
    public create = async(req: Request, res: Response) => {
        try {
            const {
                name,
                price,
                description,
            } = req.body;
    
            const data = await this.productService.create({
                name,
                price,
                description,
            })
    
            res.status(201).json({ message: "product created successfully", data })
        } catch (error) {
            res.status(500).json({ message: "error in adding product" })
        }
    }

    //getProduct
    public get = async(req: Request, res: Response) => {
        try {
            const data = await this.productService.get();
            res.json({ message: "fetch all product successfully", data })
        } catch (error) {
            res.status(500).json({ message: "can't get product. something wrong." })
        }
    }

    //deleteProduct - only admin
    public delete = async(req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const data = await this.productService.delete(id);
            res.json({ message: "deleted product successfully", data })
        } catch (error) {
            res.status(500).json({ message: "can't delete product. something wrong." })
        }
        
    }

    //updateProduct - only admin
    public update = async(req:Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const {
                name,
                price,
                description,
            } = req.body;

            const updatedData = {
                ...(name && { name }),
                ...(price && { price }),
                ...(description && { description }),
            }

            const data = await this.productService.update(id,updatedData);
            res.json({ message: "update data successfully", data: data })
        } catch (error) {
            res.status(500).json({ message: "can't update product. something wrong." })
        }
    }
}