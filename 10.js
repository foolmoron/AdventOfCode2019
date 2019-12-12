// *
input = [
'.###.#...#.#.##.#.####..',
'.#....#####...#.######..',
'#.#.###.###.#.....#.####',
'##.###..##..####.#.####.',
'###########.#######.##.#',
'##########.#########.##.',
'.#.##.########.##...###.',
'###.#.##.#####.#.###.###',
'##.#####.##..###.#.##.#.',
'.#.#.#####.####.#..#####',
'.###.#####.#..#..##.#.##',
'########.##.#...########',
'.####..##..#.###.###.#.#',
'....######.##.#.######.#',
'###.####.######.#....###',
'############.#.#.##.####',
'##...##..####.####.#..##',
'.###.#########.###..#.##',
'#.##.#.#...##...#####..#',
'##.#..###############.##',
'##.###.#####.##.######..',
'##.#####.#.#.##..#######',
'...#######.######...####',
'#....#.#.#.####.#.#.#.##',
]
function getTargets(map, w, h) {
    let targets = [];
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            if (map[y][x] === '#') {
                targets.push([x, y]);
            }
        }
    }
    return targets;
}
ts = getTargets(input, input[0].length, input.length);
console.log(ts);

function raycastAll(x, y, map, targets) {
    let hit = [];
    let usedDs = {};
    for (let t of targets) {
        let dX = t[0] - x;
        let dY = t[1] - y;
        if (dX === 0 && dY === 0) {
            continue;
        }
        let max = Math.max(Math.abs(dX), Math.abs(dY));
        let d = [dX, dY];
        let steps = 1;
        for (let i = 1; i <= max; i++) {
            if (Number.isInteger(dX / i) && Number.isInteger(dY / i)) {
                d = [dX / i, dY / i];
                steps = i;
            }
        }
        if (usedDs[d[0]*1000+d[1]]) {
            continue;
        }
        usedDs[d[0]*1000+d[1]] = true;
        for (let s = 1; s <= steps; s++) {
            if (map[y + d[1]*s][x + d[0]*s] === '#') {
                hit.push([x + d[0]*s, y + d[1]*s]);
                break;
            }
        }
    }
    return hit;
}
function getBest(map, targets) {
    let best = [];
    let bestCoord = [0, 0];
    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] !== '#') {
                continue;
            }
            let count = raycastAll(x, y, map, targets);
            if (count.length >= best.length) {
                best = count;
                bestCoord = [x, y];
            }
        }
    }
    return {best, bestCoord};
}
console.log(getBest(input, ts));

// **
function getTargetsSorted(map, cX, cY) {
    let targets = [];
    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] === '#') {
                targets.push([x, y]);
            }
        }
    }
    getAngle = ([x, y]) => {return (Math.atan2(y - cY, x - cX) + Math.PI/2 + 2*Math.PI) % (Math.PI * 2);}
    targets.sort((a,b) => getAngle(a) - getAngle(b));
    debugger;
    return targets;
}
console.log(getTargetsSorted(input, 8, 3));

function wipe(map) {
    map = Array.from(map);
    debugger;
    let destroyed = [];
    let targets = getTargetsSorted(map, 20, 18);
    while (targets.length) {
        let best = getBest(map, targets).best;
        destroyed = destroyed.concat(best);
        if (destroyed.length > 200) {
            console.log("200th: ", destroyed[199], destroyed);
            break;
        }
        for (let coord in best) {
            map[coord[1]][coord[0]] = '.';
        }
        targets = getTargets(map, map[0].length, map.length);
    }
}
wipe(input);