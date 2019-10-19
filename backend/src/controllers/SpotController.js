const Spot = require('../models/Spot');
const User = require('../models/User');


module.exports = {
    async index(req,res) {
        const {tech} = req.query;
        const spots = await Spot.find({techs:tech});

        return res.json(spots);

    },

    async store(req, res) {
        const { filename } = req.file;
        const { enterprise, techs, price } = req.body;
        const { user_id } = req.headers;


        const user_exist = await User.findById(user_id);

        if (!user_exist) {
            return res.status(400).json({error:'Dont exist'});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company:enterprise,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });
        return res.json(spot);



    }
}