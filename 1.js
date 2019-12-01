// *
input.map(z=>Math.floor(z/3)-2).reduce((a, i) => a + i, 0)

// **
function calcFuel(m) {
    let total = 0;
    while (true) {
        let fuel = Math.floor(m/3)-2;
        if (fuel > 0) {
            total += fuel;
        }
        m = fuel;
        if (m <= 0) {
            return total;
        }
    }
}

input.map(z=>calcFuel(z)).reduce((a, i) => a + i, 0)