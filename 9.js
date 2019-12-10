// *
input = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]
    
function addr(state, offset) {
    switch(state.modes[offset - 1]) {
    case 0:
        return state.mem[state.pos + offset];
    case 1:
        return state.pos + offset;
    case 2:
        return state.rel + state.mem[state.pos + offset];
    }
}
function get(state, offset) {
    return state.mem[addr(state, offset)] || 0;
}
function set(state, offset, value) {
    state.mem[addr(state, offset)] = value;
}
function run(mem, input, output, pos) {
    return new Promise(function(resolve, reject) {
        let state = {
            mem: Array.from(mem),
            pos,
            rel: 0,
        };
        const process = function() {
            while(true) {
                state.inst = state.mem[state.pos];
                state.op = state.inst % 100;
                state.modes=[Math.floor(state.inst/100) % 10, Math.floor(state.inst/1000) % 10, Math.floor(state.inst/10000) % 10]
                // console.log([state, state.mem.slice(state.pos, state.pos+4));
                // debugger;
                switch(state.op) {
                case 1:
                    set(state, 3, get(state, 1) + get(state, 2));
                    state.pos += 4;
                    break;
                case 2:
                    set(state, 3, get(state, 1) * get(state, 2));
                    state.pos += 4;
                    break;
                case 3:
                    let inputResponse = input('input:');
                    if (inputResponse === false) {
                        setTimeout(process, 1);
                        return;
                    }
                    set(state, 1, parseInt(inputResponse, 10));
                    state.pos += 2;
                    break;
                case 4:
                    let outputResponse = output(get(state, 1));
                    if (outputResponse === false) {
                        setTimeout(process, 1);
                        return;
                    }
                    state.pos += 2;
                    break;
                case 5:
                case 6:
                    if ((state.op == 5) == !!get(state, 1)) {
                        state.pos = get(state, 2);
                    } else {
                        state.pos += 3;
                    }
                    break;
                case 7:
                    set(state, 3, get(state, 1) < get(state, 2) ? 1 : 0);
                    state.pos += 4;
                    break;
                case 8:
                    set(state, 3, get(state, 1) === get(state, 2) ? 1 : 0);
                    state.pos += 4;
                    break;
                case 9:
                    state.rel += get(state, 1);
                    state.pos += 2;
                    break;
                default:
                    resolve(state);
                    return;
                }
            };
        };
        process();
    });
}
run(input, () => 1, console.log, 0);

// **
run(input, () => 2, console.log, 0);
