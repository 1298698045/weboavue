// 格式化树结构
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
// 去重
export const unique = (list, field) => {
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i][field] == list[j][field]) {
                list.splice(j, 1);
                j--;
            }
        }
    }
    return list;
}

export const compareIgnoreCase = (str1, str2) => {
    // console.log("str1", str1, str2)
    return str1.toLowerCase() === str2.toLowerCase();
}

//  格式化/api/listview/data/getNodes接口的数据 所有字段只输出name
export const girdFormatterValue = (key, row, nameField) => {
    let val = '';
    let typename = row[key] && row[key].__typeName;
    if (typename == 'StatusField') {
        val = row[key].name;
    } else if (typename == 'LookupField') {
        val = row[key].lookupValue.displayName;
    } else if (typename == 'DateTimeField') {
        val = row[key].dateTime;
    } else if (typename == "UserField") {
        val = row[key].userValue.DisplayName;
    } else if (typename == "PicklistField") {
        val = row[key].name || row[key].value;
    } else if (typename == "DateField") {
        val = row[key] && row[key].date;
    } else if (typename == "TextField") {
        val = row[key] && row[key].textValue;
    } else if (typename == "CheckboxField") {
        if (row[key] && row[key].img) {
            // let imglink = '/src/assets' + row[key].img
            let imglink = row[key].img;
            val = '<img style="height:18px;width:24px;margin-left:7px;" src="' + imglink + '">';
        }
        else {
            val = row[key] && row[key].selected;
        }
    } else {
        val = row[key] && row[key].value;
    }
    if (nameField && nameField == key && row['viewUrl']) {
        val = '<a style="text-decoration: none;color:#1677ff;" href="/#' + row['viewUrl'] + '" target="_blank">' + val + '</a>'
    }
    return val;
}

//  格式化/api/listview/data/getNodes接口的数据 form表单使用 搜索字段输出键值对{value, name} 其余输出name
export const formNodesValueObj = (key, row) => {
    let val = '';
    let typename = row[key] && row[key].__typeName;
    if (typename == 'StatusField') {
        val = row[key].name;
    } else if (typename == 'LookupField') {
        val = {
            ID: row[key].lookupValue.value,
            Name: row[key].lookupValue.displayName
        };
        // val = row[key].lookupValue.value
    } else if (typename == 'DateTimeField') {
        val = row[key].dateTime;
    } else if (typename == "UserField") {
        val = {
            ID: row[key].userValue.Value,
            Name: row[key].userValue.DisplayName
        };
    } else if (typename == "PicklistField") {
        val = row[key].name || '';
    } else if (typename == "DateField") {
        val = row[key] && row[key].date;
    } else if (typename == "TextField") {
        val = row[key] && row[key].textValue;
    } else if (typename == "CheckboxField") {
        val = row[key] && row[key].selected;
    } else {
        val = row[key] && row[key].value;
    }
    return val;
}

export const searchTree = (tree, keyword) => {
    let results = [];

    function traverse(nodes) {
        nodes.forEach(node => {
            if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
                results.push(node);
            }
            if (node.children && node.children.length > 0) {
                traverse(node.children);
            }
        });
    }
    traverse(tree);
    return results;
}

export const filterTreeWithParents = (tree, keyword) => {
    // 辅助函数来过滤并返回新的树结构  
    function traverse(nodes) {
        return nodes.reduce((acc, node) => {
            // 检查当前节点是否匹配  
            if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
                // 如果匹配，则将其添加到结果中  
                acc.push(node);
            }

            // 如果存在子节点，则递归过滤它们  
            if (node.children && node.children.length > 0) {
                const filteredChildren = traverse(node.children);
                // 如果子节点中有匹配的，则保留当前节点（即使它本身不匹配）  
                if (filteredChildren.length > 0) {
                    node.children = filteredChildren; // 更新子节点  
                    acc.push(node); // 将当前节点（现在包含过滤后的子节点）添加到结果中  
                }
            }

            return acc;
        }, []);
    }
    return traverse(tree);
}