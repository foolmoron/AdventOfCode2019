// *
input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,6,19,23,2,23,6,27,2,6,27,31,2,13,31,35,1,10,35,39,2,39,13,43,1,43,13,47,1,6,47,51,1,10,51,55,2,55,6,59,1,5,59,63,2,9,63,67,1,6,67,71,2,9,71,75,1,6,75,79,2,79,13,83,1,83,10,87,1,13,87,91,1,91,10,95,2,9,95,99,1,5,99,103,2,10,103,107,1,107,2,111,1,111,5,0,99,2,14,0,0]
function process(mem, n, v, pos) {
    mem = Array.from(mem)
    mem[1] = n;
    mem[2] = v;
    while (true) {
        let op = mem[pos];
        switch(op) {
        case 1:
            mem[mem[pos + 3]] = mem[mem[pos + 1]] + mem[mem[pos + 2]]
            break;
        case 2:
            mem[mem[pos + 3]] = mem[mem[pos + 1]] * mem[mem[pos + 2]]
            break;
        default:
            return mem;
        }
        pos += 4;
    }
}
process(input, 12, 2, 0);

// **
function find(x) {
    let res = 0;
    for(let n = 0; n < 100; n++) {
        for(let v = 0; v < 100; v++) {
            res = process(input, n, v, 0)[0];
            console.log(n, v, res);
            if (res === x) {
                return 100*n + v;
            }
        }
    }
}
find(19690720)