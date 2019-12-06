import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

export const first = rl.on("line", (line) => {
    const newLine = line.split('').reverse().join('');
    console.log(newLine, '\n');
})