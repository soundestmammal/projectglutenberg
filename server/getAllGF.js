const Business = require('./Business');

module.exports = async function getAllGF() {
    const response = await Business.find({}).lean();

    for(let i = 0; i < response.length; i++) {
        response[i]["image"] = response[i].photos[0];
        response[i]["location"] = response[i].location.display_address;
        response[i]["phone"] = response[i].display_phone;
    }
    console.log(response[0]);
    return response;
}