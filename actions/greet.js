const greetings = [
    'Oh, hello there %s'
];

module.exports = (output, data, user) => {
    output(util.format(greetings[0], user));
};