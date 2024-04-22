export const formTreeData = (list, id, pid) => {
    var result = [];
    if (!Array.isArray(list)) {
        return result;
    }
    var map = {};
    list.forEach(function (item) {
        map[item[id]] = item;
    });
    list.forEach(function (item) {
        var parent = map[item[pid]];
        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}
export const unique = (list, field) => {
    for(let i = 0; i < list.length; i++){
        for(let j = i + 1; j < list.length; j++) {
            if(list[i][field]==list[j][field]){
                list.splice(j, 1);
                j--;
            }
        }
    }
    return list;
}