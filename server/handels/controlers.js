const axios = require('axios');
const URL = 'https://restcountries.com/v3.1/all'

const getAllContries = async (req, res) => {
    try {
        const allContries = []
        const { data } = await axios(URL);
        data.map((countrys) => {
            const country = {
                country: countrys.name.common,
                flag: countrys.flags.png,
                languages: countrys.languages,
            }
            allContries.push(country)
        })
        res.status(200).json(allContries)
    }
    catch {
        res.status(404).send('no funca')

    }
}

module.exports={
    getAllContries
}