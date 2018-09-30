function parseData(temp1) {
    var temp2 = temp1.reduce((sum, val, i, arr) => {
        if (i != 0) {
        if (sum.length > 1) {
            const exists = sum.some(item => {
                item.some(m => m == val);
            })
            if (exists) {
                return sum
            }
        }
        const bound = val.boundingPoly.vertices
        const str = "";
        const yThresh = Math.abs(bound[0].y-bound[2].y)/2
        const box = [bound[0].y-yThresh, bound[2].y+yThresh];
        const group = arr.filter(m => {
            const iBound = m.boundingPoly.vertices;
            return iBound[0].y > box[0] && iBound[2].y < box[1]
        })
        sum.push(group.reduce((sum2, val, i) => {
            if (i != 0)
                sum2.push(val.description);
            return sum2
        }, []));
        return sum;
        }
        return sum;
    }, [])
    
    function arraysEqual(arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }

    console.dir(temp2)

    var temp3 = temp2.map(m => m.join(' '))
    temp3 = temp3.filter((item, i) => {
        return temp3.indexOf(item) == i;
    })
    if (temp3.length == 1) return temp3;
    var temp4 = temp3.map(m => m.split(' ').splice(0,4));
    var temp5 = [];
    for(let i = 0; i < temp4.length-2; i++) {
        if (!arraysEqual(temp4[i], temp4[i+1]))
        temp5.push(temp3[i])
    }
    temp5.push(temp4[temp3.length-1])
    return temp5
}

export default parseData;