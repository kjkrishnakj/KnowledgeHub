import pincodes from '../../pinodes.json'
export default function handler(req, res) {

    
    res.status(200).json(pincodes)
}