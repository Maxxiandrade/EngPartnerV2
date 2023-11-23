const axios = require('axios');
const URL = 'https://restcountries.com/v3.1/all'

const getAllCountries = async (req, res) => {
    try {
        const allCountries = []
        const { data } = await axios(URL);
        data.map((countries) => {
            const country = {
                country: countries.name.common,
                flag: countries.flags.png,
                languages: countries.languages,
            }
            allCountries.push(country)
        })
        res.status(200).json(allCountries)
    }
    catch {
        res.status(404).send('Dont work')

    }
};

module.exports = getAllCountries;