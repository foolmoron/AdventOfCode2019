const {
performance
} = require('perf_hooks');

// *
input = [
    [13, -13, -2],
    [16, 2, -15],
    [7, -18, -12],
    [-3, -8, -8],
];

planets = input.map((pos, i) => ({id: i, pos, vel: [0,0,0]}));

function process(ps, axis) {
    // grav
    for (let i = 0; i < ps.length; i++) {
        let p = ps[i];
        for (let ii = 0; ii < ps.length; ii++) {
            if (p.pos[axis] > ps[ii].pos[axis]) {
                p.vel[axis]--;
            } else if (p.pos[axis] < ps[ii].pos[axis]) {
                p.vel[axis]++;
            }
        }
    };
    // vel
    for (let i = 0; i < ps.length; i++) {
        let p = ps[i];
        p.pos[axis] += p.vel[axis];
    };
    return ps;
}
function energy(ps) {
    return ps.reduce((acc, p) => {
        let pe = Math.abs(p.pos[0]) + Math.abs(p.pos[1]) + Math.abs(p.pos[2]);
        let ke = Math.abs(p.vel[0]) + Math.abs(p.vel[1]) + Math.abs(p.vel[2]);
        let e = pe * ke;
        return acc + e;
    }, 0);
}

z = performance.now();
for (let i = 0; i < 1000; i++) {
    for (let axis = 0; axis < 3; axis++) {
        planets = process(planets, axis);
    }
}
console.log('z', performance.now() - z);
console.log(energy(planets));

// **
input = [
    [13, -13, -2],
    [16, 2, -15],
    [7, -18, -12],
    [-3, -8, -8],
];
// input = [
//     [-1, 0, 2],
//     [2, -10, -7],
//     [4, -8, 8],
//     [3, 5, -1],
// ];
input = [
[-8, -10, 0],
[5, 5, 10],
[2, -7, 3],
[9, -8, -3],
]
    
planets = input.map((pos, i) => ({id: i, pos, vel: [0,0,0]}));

function hash(ps, axis) {
    return ps.map(p => `${p.pos[axis]}:${p.vel[axis]}`).join('|');
}
let periods = [];
for (let axis = 0; axis < 3; axis++) {
    hashes = {};
    steps = 0;
    initialHash = hash(planets, axis);
    currentHash = '';
    while (currentHash !== initialHash) {
        steps++;
        planets = process(planets, axis);
        currentHash = hash(planets, axis);
    }
    console.log('axis:', axis, 'steps:', steps);
    periods[axis] = steps;
}

function gcd(a, b) {
    while (a != 0) {
        swap = b;
        b = a;
        a = swap % a;
    }
    return b;
}
g = gcd(gcd(periods[0], periods[1]), periods[2]);
console.log('gcd', gcd(gcd(periods[0], periods[1]), periods[2]));

console.log('final', (periods[0]/g) * (periods[1]/g) * (periods[2]/g));