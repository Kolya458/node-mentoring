const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on("line", (line) => {
    const newLine = line.split('').reverse().join('');
    console.log(newLine, '\n');
})