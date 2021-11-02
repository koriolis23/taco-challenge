import restaurants from "../../../data/restaurants.json"

export default function handler(req, res) {
    res.status(200).json(restaurants)
}