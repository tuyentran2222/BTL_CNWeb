const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://tuyentv:1qaz2wsx@cluster0.beyrs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );

        console.log('Connect successfully!!');
    } catch (error) {
        console.log(error);
        console.log('Connect failed!!');
    }
}

module.exports = { connect };
