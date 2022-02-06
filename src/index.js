import getDistances from "./getDistances.js"

getDistances("59110", ["31000", "33000", "75015", "06000"])
    .then(function (response) {
        // Add your own result handling here
        console.log("response", response);
    })
    .catch(function (err) {
        var str = "An error occurred: " + err;
        console.log(str);
    });