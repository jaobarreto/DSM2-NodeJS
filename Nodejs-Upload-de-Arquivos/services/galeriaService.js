import Galeria from "../models/Galeria.js"

class GaleriaService {
    Save(file) {
        Galeria.create({
            file : file
        })
    }

}
export default new GaleriaService()