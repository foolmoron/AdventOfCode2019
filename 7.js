// *
input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
    27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]

function param(mem, modes, pos, offset) {
    switch(modes[offset - 1]) {
    case 0:
        return mem[mem[pos + offset]];
    case 1:
        return mem[pos + offset];
    }
}
function process(mem, input, output, pos) {
    return new Promise(function(resolve, reject) {
        mem = Array.from(mem)
        const process = function() {
            while(true) {
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
                    let inputResponse = input('input:');
                    if (inputResponse === false) {
                        setTimeout(process, 1);
                        return;
                    }
                    mem[mem[pos + 1]] = parseInt(inputResponse, 10);
                    pos += 2;
                    break;
                case 4:
                    let outputResponse = output(param(mem, modes, pos, 1));
                    if (outputResponse === false) {
                        setTimeout(process, 1);
                        return;
                    }
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
                    resolve(mem);
                    return;
                }
            };
        };
        process();
    });
}

function perms(set) {
    if (set.length == 1) {
        return set;
    }
    let ret = [];
    for (let item of set) {
        let others = set.filter(i => i !== item);
        let otherPerms = perms(others);
        ret = ret.concat(otherPerms.map(perm => [item].concat(perm)));
    }
    return ret;
}

bestOutput = 0;
for (let perm of perms([5,6,7,8,9])) {
    let prevOutput = 0;
    let setPrevOutput = function(x) {
        // console.log('prevOutput:', x);
        prevOutput = x;
    }
    let z = -1;
    let phaseThenPrevOutput = function() {
        z++;
        if (z%2) {
            // console.log('input prev output:', prevOutput);
            return prevOutput;
        } else {
            // console.log('input phase:', perm[Math.floor(z/2)]);
            return perm[Math.floor(z/2)]
        }
    };
    // console.log('running with phases:', perm);
    for (let i = 0; i < 5; i++) {
        process(input, phaseThenPrevOutput, setPrevOutput, 0);
    }
    // console.log('phases:', perm, 'output:', prevOutput);
    if (prevOutput > bestOutput) {
        bestOutput = prevOutput;
    }
}
console.log('best:', bestOutput);

// **
input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
    27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
function run(perm) {
    let inits = [false, false, false, false, false];
    let shouldSetInput = [true, true, true, true, true];
    let inputs = [0,null,null,null,null];
    let makeSetInput = function(n) {
        let func = function(x) {
            let next = (n + 1) % 5;
            if (shouldSetInput[next]) {
                inputs[next] = x;
                shouldSetInput[next] = false;
                // console.log('output for:',next,'val:',x);
            } else {
                // console.log('output paused for:',next);
                return false;
            }
        };
        return func;
    };
    let makeTakeInputsForever = function(n) {
        let func = function() {
            if (!inits[n]) {
                inits[n] = true;
                // console.log('init:',n,'val:',perm[n]);
                return perm[n];
            } else if (inputs[n] != null) {
                let val = inputs[n];
                inputs[n] = null;
                shouldSetInput[n] = true;
                // console.log('input for:',n,'val:',val);
                return val;
            } else {
                // console.log('input paused for:',n);
                return false;
            }
        };
        return func;
    };
    console.log('running with phases:', perm);
    let ps = [0,1,2,3,4].map(i => process(input, makeTakeInputsForever(i), makeSetInput(i), 0));
    return Promise.all(ps).then(() => {
        console.log('phases:', perm, 'output:', inputs[0]);
        return inputs[0];
    });
}
results = perms([5,6,7,8,9]).map(perm => run(perm));
Promise.all(results).then(results => {
    bestOutput = 0;
    for (res of results) {
        if (res > bestOutput) {
            bestOutput = res;
        }
    }
    console.log('best:', bestOutput);
});