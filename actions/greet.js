const greetings = [
    "Oh, hello there %s"
];

module.exports = (output, data, user) => {
    output(stringReplace(greetings[0], user));
};