const greetings = [
    "Oh, hello there %s"
];

module.exports.action = (output, data, user) => {
    output(parse(greetings[0], user));
};