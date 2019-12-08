// *
input = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L ',

]

function makeTree(input) {
    objs = {};
    for (let i of input) {
        let [a, b] = i.split(')');
        if (!(a in objs)) {
            objs[a] = {name: a, children: []}
        }
        if (!(b in objs)) {
            objs[b] = {name: b, children: []}
        }
        objs[b].parent = a;
        objs[a].children.push(b);
    }
    return objs;
}
function getCounts(tree, root = 'COM') {
    let direct = -1;
    let indirect = 0;
    let stack = [root];
    while (stack.length) {
        let node = tree[stack.pop()];
        stack = stack.concat(node.children);
        direct += 1;
        let parent = tree[node.parent];
        if (parent) {
            node.indirects = (parent.indirects == null ? -1 : parent.indirects) + 1;
            indirect += node.indirects;
        }
    }
    return {direct, indirect, all: direct + indirect};
}
t = makeTree(input)
getCounts(t);

// ** 
function getDistance(tree, a, b) {
    distsFromA = {}
    let p = tree[a].parent;
    let d = 1;
    while (p) {
        distsFromA[p] = d++;
        p = tree[p].parent;
    }
    distsFromB = {}
    p = tree[b].parent;
    d = 1;
    let lowestCommonParent = null;
    debugger;
    while (p) {
        distsFromB[p] = d++;
        if (distsFromA[p]) {
            lowestCommonParent = p;
            break;
        }
        p = tree[p].parent;
    }
    return distsFromA[lowestCommonParent] + distsFromB[lowestCommonParent]
}
getDistance(t, t['YOU'].parent, t['SAN'].parent)