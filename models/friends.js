const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    name: String,
    dob: String,
    imageurl: String,
    hobbies: [String]
})

const Friends = mongoose.model('Friends', friendsSchema)


readFriends = async (options = {}) => {
    if (Object.entries(options).length == 0)
        return Friends.find().lean();

    else if (options.name)

        return Friends.findOne(options).lean();

    else
        return undefined;

}

createFriends = async (data) => {
    let friendsDoc = new Friends(data);
    await friendsDoc.save();
}


deleteFriends = async (name) => {
    const friends = await Friends.findOne({ name: name });
    await friends.remove();

}

updateFriends = async (data) => {
    var id = data._id;
    console.log(id);
    console.table(data)
    await Friends.findByIdAndUpdate({_id: id}, {...data})
}


exports.readFriends = readFriends;
exports.createFriends = createFriends;
exports.deleteFriends = deleteFriends;
exports.updateFriends = updateFriends;