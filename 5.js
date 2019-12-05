// **
input = []

function param(mem, modes, pos, offset) {
    switch(modes[offset - 1]) {
    case 0:
        return mem[mem[pos + offset]];
    case 1:
        return mem[pos + offset];
    }
}
function process(mem, input, output, pos) {
    mem = Array.from(mem)
    while (true) {
        let inst = mem[pos];
        let op = inst % 100;
        let modes=[Math.floor(inst/100) % 10, Math.floor(inst/1000) % 10, Math.floor(inst/10000) % 10]
        // console.log([inst, mem[pos + 1], mem[pos + 2], mem[pos + 2]], 'pos:', pos, 'op:', op, 'modes:', modes);
        // debugger;
        switch(op) {
        case 1:
            mem[mem[pos + 3]] = param(mem, modes, pos, 1) + param(mem, modes, pos, 2);
            pos += 4;
            break;
        case 2:
            mem[mem[pos + 3]] = param(mem, modes, pos, 1) * param(mem, modes, pos, 2);
            pos += 4;
            break;
        case 3:
            mem[mem[pos + 1]] = parseInt(input('input:'), 10);
            console.log('input: ', mem[mem[pos + 1]]);
            pos += 2;
            break;
        case 4:
            output('output:', param(mem, modes, pos, 1));
            pos += 2;
            break;
        case 5:
        case 6:
            if ((op == 5) == !!param(mem, modes, pos, 1)) {
                pos = param(mem, modes, pos, 2);
            } else {
                pos += 3;
            }
            break;
        case 7:
            mem[mem[pos + 3]] = param(mem, modes, pos, 1) < param(mem, modes, pos, 2) ? 1 : 0;
            pos += 4;
            break;
        case 8:
            mem[mem[pos + 3]] = param(mem, modes, pos, 1) === param(mem, modes, pos, 2) ? 1 : 0;
            pos += 4;
            break;
        default:
            console.log('DONE', mem);
            return mem;
        }
    }
}
process(input, prompt, console.log, 0);