const Business = require('./models/Business');

module.exports = async function getAllGF() {
    const response = await Business.find({}).lean();

    for(let i = 0; i < response.length; i++) {
        response[i]["image"] = response[i].photos[0];
        response[i]["location"] = response[i].location.display_address;
        response[i]["phone"] = response[i].display_phone;
    }
    
    return response;
}