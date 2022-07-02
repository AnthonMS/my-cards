// /* Adding myDeflate() to the Object prototype */
// Object.prototype.myDeflate = function (pathArray, result) {
//     pathArray = (typeof pathArray === 'undefined') ? [] : pathArray;
//     result = (typeof result === 'undefined') ? {} : result;

//     var key, value, newKey;

//     for (var i in this) {

//         if (this.hasOwnProperty(i)) {
//             key = i;
//             value = this[i];
//             pathArray.push(key);
            
//             if (typeof value === 'object' && value !== null) {
//                 result = value.myDeflate(pathArray, result);
//             } else {
//                 //newKey = pathArray.join('.'); // Use this for useful application
//                 newKey = pathArray[pathArray.length-1] // I use this because I just want the original keyname. This way each nested object cannot hold the same keys, as they will overwrite eachother. I use this in a way each object will always only have 1 key
//                 result[newKey] = value;
//             }

//             pathArray.pop();
//         }
//     }

//     return result;
// };

/* Creating deflate() as a standalone function */
export const deflate = function (source, pathArray, result) {
    pathArray = (typeof pathArray === 'undefined') ? [] : pathArray;
    result = (typeof result === 'undefined') ? {} : result;
    var key, value, newKey;

    for (var i in source) {
        if (source.hasOwnProperty(i)) {

            key = i;
            value = source[i];

            pathArray.push(key);

            if (typeof value === 'object' && value !== null) {

                result = deflate(value, pathArray, result);

            } else {
                //newKey = pathArray.join('.'); // Use this for useful application
                newKey = pathArray[pathArray.length-1] // I use this because I just want the original keyname. This way each nested object cannot hold the same keys, as they will overwrite eachother. I use this in a way each object will always only have 1 key
                result[newKey] = value;
            }

            pathArray.pop();
        }
    }

    return result;
};

// /*----------- Usage examples -----------*/

// var obj = {
//     foo : {
//         bar : {
//             baz : 'SUCCESS!',
//             biz : ['first','second','third']
//         }
//     }
// };

// /* Using the Object prototype version */
// obj.deflate();

// // RETURNS:
// // {
// //     "foo.bar.baz": "SUCCESS!",
// //     "foo.bar.biz.0": "first",
// //     "foo.bar.biz.1": "second",
// //     "foo.bar.biz.2": "third"
// // }

// /* Using the standalone function version */
// deflate(obj);

// // RETURNS:
// // {
// //     "foo.bar.baz": "SUCCESS!",
// //     "foo.bar.biz.0": "first",
// //     "foo.bar.biz.1": "second",
// //     "foo.bar.biz.2": "third"
// // }