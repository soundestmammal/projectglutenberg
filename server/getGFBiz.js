const Business = require('./models/Business');

module.exports = async function getGFBiz(id) {
    const response = await Business.find({id: id}).lean();
    if(!response) {
        console.log("I wasn't able to find this restaurant!", response);
    }
    return response;
}