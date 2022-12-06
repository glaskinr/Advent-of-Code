const fs = require('fs');

const readFile = (filename, utf8 = 'utf8') => {
    return fs.readFileSync(filename, utf8).trimEnd();
}

const day1 = () => {
    const input = readFile('./inputs/day1.txt');

    function solve(input) {
        const elves = input
            .split('\n\n')
            .map((elf) =>
                elf
                    .split('\n')
                    .map(Number)
                    .reduce((acc, n) => acc + n)
            )
            .sort((a, b) => b - a);
        console.log("Part 1", elves[0]);
        console.log("Part 2", elves.slice(0, 3).reduce((acc, n) => acc + n));
    }
    solve(input);
}


const day2 = () => {
    const input = readFile('./inputs/day2.txt');

    const matchResultScore = {
        A: { X: 3, Y: 6, Z: 0 },
        B: { X: 0, Y: 3, Z: 6 },
        C: { X: 6, Y: 0, Z: 3 },
    };

    const handPlayedScore = { X: 1, Y: 2, Z: 3 };

    const strategyGuideGuide = {
        A: { X: 'Z', Y: 'X', Z: 'Y' },
        B: { X: 'X', Y: 'Y', Z: 'Z' },
        C: { X: 'Y', Y: 'Z', Z: 'X' },
    };

    function solve(input, part) {
        let score = 0;
        for (const line of input.split('\n')) {
            let [a, b] = line.split(' ');
            if (part === 2) b = strategyGuideGuide[a][b];
            score += matchResultScore[a][b] + handPlayedScore[b];
        }
        console.log(score);
    }
    solve(input, 1);
    solve(input, 2);
}

const day3 = () => {

    const input = readFile('./inputs/day3.txt');

    function getPriority(char) {
        return char === char.toLowerCase()
            ? char.codePointAt(0) - 'a'.codePointAt(0) + 1
            : char.codePointAt(0) - 'A'.codePointAt(0) + 27;
    }

    function solve1(input) {
        let sum = 0;
        for (const line of input.split('\n')) {
            const [a, b] = [
                line.slice(0, line.length / 2),
                line.slice(line.length / 2),
            ].map((str) => [...str]);
            const intersection = a.filter((char) => b.includes(char));
            sum += getPriority(intersection[0]);
        }
        console.log(sum);
    }
    solve1(input);

    function solve2(input) {
        let sum = 0;
        const lines = input.split('\n');
        for (let i = 0; i < lines.length; i += 3) {
            const sacks = lines.slice(i, i + 3).map((line) => [...line]);
            let intersection = sacks[0];
            for (const sack of sacks.slice(1)) {
                intersection = intersection.filter((char) => sack.includes(char));
            }
            sum += getPriority(intersection[0]);
        }
        console.log(sum);
    }
    solve2(input);
}

const day4 = () => {
    const input = readFile('./inputs/day4.txt');

    function solve1(input) {
        let count = 0;
        for (const line of input.split('\n')) {
            const [[a1, b1], [a2, b2]] = line
                .split(',')
                .map((elf) => elf.split('-').map(Number));
            if ((a1 <= a2 && b1 >= b2) || (a1 >= a2 && b1 <= b2)) {
                count++;
            }
        }
        console.log(count);
    }
    solve1(input);

    function solve2(input) {
        let count = 0;
        for (const line of input.split('\n')) {
            const [[a1, b1], [a2, b2]] = line
                .split(',')
                .map((elf) => elf.split('-').map(Number));
            if ((a1 >= a2 && a1 <= b2) || (a2 >= a1 && a2 <= b1)) {
                count++;
            }
        }
        console.log(count);
    }
    solve2(input);
}

const day5 = () => {
    const input = readFile('./inputs/day5.txt');

    function parseTable(containers) {
        let stacks = [];
        for (const line of containers.split('\n').slice(0, -1)) {
            for (let i = 0; i < line.length; i += 4) {
                if (line[i + 1] !== ' ') {
                    stacks[i / 4] = stacks[i / 4] ?? [];
                    stacks[i / 4].unshift(line[i + 1]);
                }
            }
        }
        return stacks;
    }

    function solve1(input) {
        let [containers, moves] = input.split('\n\n');
        let stacks = parseTable(containers);
        for (const move of moves.split('\n')) {
            const [n, from, to] = move.match(/\d+/g).map(Number);
            for (let i = 0; i < n; i++) {
                stacks[to - 1].push(stacks[from - 1].pop());
            }
        }
        console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
    }
    solve1(input);

    function solve2(input) {
        let [containers, moves] = input.split('\n\n');
        let stacks = parseTable(containers);
        for (const move of moves.split('\n')) {
            const [n, from, to] = move.match(/\d+/g).map(Number);
            stacks[to - 1].push(...stacks[from - 1].slice(-n));
            stacks[from - 1].length -= n;
        }
        console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
    }
    solve2(input);
}

const day6 = () => {
    const input = readFile('./inputs/day6.txt');

    function solve(input, part) {
        const n = part === 2 ? 14 : 4;
        for (let i = 0; i < input.length; i++) {
            const chars = input.slice(i, i + n);
            if (new Set(chars).size === chars.length) {
                console.log(i + n);
                break;
            }
        }
    }
    solve(input, 1);
    solve(input, 2);
}
day6()