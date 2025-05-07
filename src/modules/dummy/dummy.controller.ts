export class DummyController {
    public dummy = async (req: any, res: any): Promise<any> => {
        try {
            res.status(200).json({ message: "Dummy route" });
        } catch (error) {
            res.status(500).json({ message: "Error in dummy route" });
        }
    } 
}