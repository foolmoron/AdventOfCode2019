// **
a = 171309;
b = 643603;

count = 0;
for (let i = a; i <= b; i++) {
    let pair = false;
    let nodec = true;

    let str = i.toString();
    for (let s = 0; s < str.length; s++) {
        if (str[s] == str[s - 1] && str[s] != str[s - 2] && str[s] != str[s + 1]) {
            pair = true;
        }
        if (str[s - 1] && str[s] < str[s - 1]) {
            nodec = false;
        }
    }
    if (!pair) {
        continue;
    }
    if (!nodec) {
        continue;
    }
    count++;
}
console.log(count)