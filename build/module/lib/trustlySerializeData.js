export const trustlySerializeData = function (data, method, uuid) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        let keys = Object.keys(data);
        let serializedData = '';
        keys.sort();
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            if (data[k] === undefined) {
                throw `TrustlyClient: Method=${method} uuid=${uuid} Error serializing data, this field are "undefined". "${k}"`;
            }
            if (data[k] === null || !data[k]) {
                serializedData = serializedData + k;
            }
            else {
                serializedData =
                    serializedData +
                        k +
                        trustlySerializeData(data[k], method, uuid);
            }
        }
        return serializedData;
    }
    else {
        return data.toString();
    }
};
export const serialize = function (method, uuid, data) {
    return method + uuid + trustlySerializeData(data, method, uuid);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RydXN0bHlTZXJpYWxpemVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLFVBQVUsSUFBSSxFQUFFLE1BQU8sRUFBRSxJQUFLO0lBQzlELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUE7UUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBRVgsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0seUJBQXlCLE1BQU0sU0FBUyxJQUFJLHlEQUF5RCxDQUFDLEdBQUcsQ0FBQTtZQUNuSCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLGNBQWMsR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFBO1lBQ3ZDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixjQUFjO29CQUNWLGNBQWM7d0JBQ2QsQ0FBQzt3QkFDRCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ25ELENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQTtJQUN6QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzFCLENBQUM7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsVUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDakQsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNuRSxDQUFDLENBQUEifQ==