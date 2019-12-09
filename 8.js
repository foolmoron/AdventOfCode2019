// *
input = '0222112222120000'
w = 2
h = 2
function layers(input) {
    const layers = [];
    const l = w*h;
    for (let i = 0; i < input.length; i += l) {
        layers.push(Array.from(input.slice(i, i + l)).map(x => parseInt(x)));
    }
    return layers;
}
// debugger;
ls = layers(input, w, h);
console.log(ls);
lowest = Infinity;
lowestIndex = null;
for (let i = 0; i < ls.length; i++) {
    const layer = ls[i];
    const zeros = layer.filter(c => c === 0).length;
    if (zeros < lowest) {
        lowest = zeros;
        lowestIndex = i;
    }
}
console.log(lowestIndex, ls[lowestIndex], ls[lowestIndex].filter(c => c == 1).length * ls[lowestIndex].filter(c => c == 2).length);

// **
decoded = [];
for (let p = 0; p < w*h; p++) {
    decoded.push(0);
    for (let l = 0; l < ls.length; l++) {
        const pixel = ls[l][p];
        if (pixel != 2) {
            decoded[p] = pixel;
            break;
        }
    }
}
console.log(decoded);
str = decoded.join('');
for (let i = 0; i < str.length; i += w) {
    console.log(str.slice(i, i + w).replace(/1/g, '<>').replace(/0/g, '  '));
}