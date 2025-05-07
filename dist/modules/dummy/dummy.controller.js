"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyController = void 0;
class DummyController {
    constructor() {
        this.dummy = async (req, res) => {
            try {
                res.status(200).json({ message: "Dummy route" });
            }
            catch (error) {
                res.status(500).json({ message: "Error in dummy route" });
            }
        };
    }
}
exports.DummyController = DummyController;
