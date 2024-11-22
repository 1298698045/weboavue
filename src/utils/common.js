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
export const compareIgnoreCase = (str1, str2) => {
    console.log("str1", str1, str2)
    return str1.toLowerCase() === str2.toLowerCase();
}
export const girdFormatterValue = (key,row,nameField) => {
    let val = '';
    let typename = row[key] && row[key].__typeName;
    if(typename == 'StatusField'){
        val = row[key].name;
    }else if(typename == 'LookupField'){
        val = row[key].lookupValue.displayName;
    } else if(typename == 'DateTimeField'){
        val = row[key].dateTime;
    } else if(typename=="UserField"){
        val = row[key].userValue.DisplayName;
    } else if(typename=="PicklistField"){
        val = row[key].name;
    } else if(typename=="DateField"){
        val = row[key] && row[key].date;
    } else if (typename == "TextField") {
        val = row[key] && row[key].textValue;
    } else if (typename == "CheckboxField") {
        if(row[key] && row[key].img){
            let imglink='@/assets'+row[key].img
            val = '<img style="height:18px;width:24px;margin-left:7px;" src="'+imglink+'">';
        }
        else{
            val = row[key] && row[key].selected;
        }
    } else {
        val = row[key] && row[key].value;
    }
    if(nameField&&nameField==key&&row['viewUrl']){
        val = '<a style="text-decoration: none;color:#1677ff;" href="/#'+row['viewUrl']+'" target="_blank">'+val+'</a>'
    }
    return val;
}