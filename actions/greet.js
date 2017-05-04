const greetings = [
    "Oh, hello there %s"
];

module.exports = (output, data, user) => {
    output(parse(greetings[0], user));
};