"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.trustlySerializeData = void 0;
const trustlySerializeData = function (data, method, uuid) {
    const dataType = Object.prototype.toString.call(data);
    const isObj = dataType === '[object Object]';
    const isArr = dataType === '[object Array]';
    if (isObj || isArr) {
        let keys = Object.keys(data);
        let serializedData = '';
        keys.sort();
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            if (data[k] === undefined) {
                throw `TrustlyClient: Method=${method} uuid=${uuid} Error serializing data, this field are "undefined". "${k}"`;
            }
            if (data[k] === null) {
                serializedData = serializedData + k;
            }
            else {
                serializedData =
                    serializedData +
                        (!isArr ? k : '') +
                        (0, exports.trustlySerializeData)(data[k], method, uuid);
            }
        }
        return serializedData;
    }
    else {
        return data.toString();
    }
};
exports.trustlySerializeData = trustlySerializeData;
const serialize = function (method, uuid, data) {
    return method + uuid + (0, exports.trustlySerializeData)(data, method, uuid);
};
exports.serialize = serialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RydXN0bHlTZXJpYWxpemVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sb0JBQW9CLEdBQUcsVUFBUyxJQUFJLEVBQUUsTUFBTyxFQUFFLElBQUs7SUFDN0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JELE1BQU0sS0FBSyxHQUFHLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQTtJQUM1QyxNQUFNLEtBQUssR0FBRyxRQUFRLEtBQUssZ0JBQWdCLENBQUE7SUFFM0MsSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUE7UUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBRVgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDZixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSx5QkFBeUIsTUFBTSxTQUFTLElBQUkseURBQXlELENBQUMsR0FBRyxDQUFBO1lBQ25ILENBQUM7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsY0FBYyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUE7WUFDdkMsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLGNBQWM7b0JBQ1YsY0FBYzt3QkFDZCxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDakIsSUFBQSw0QkFBb0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ25ELENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxjQUFjLENBQUE7SUFDekIsQ0FBQztTQUFNLENBQUM7UUFDSixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBNUJZLFFBQUEsb0JBQW9CLHdCQTRCaEM7QUFFTSxNQUFNLFNBQVMsR0FBRyxVQUFTLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUNoRCxPQUFPLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBQSw0QkFBb0IsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ25FLENBQUMsQ0FBQTtBQUZZLFFBQUEsU0FBUyxhQUVyQiJ9