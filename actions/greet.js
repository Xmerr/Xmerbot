const greetings = [
    `Oh, hello there ${user}`
];

module.exports = (output, data, user) => {
    output(greetings[0]);
};