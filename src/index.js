import getDistances from "./getDistances.js"

getDistances("33000", ["31000", "59110"])
    .then(function (response) {
        // Add your own result handling here
        console.log("response", JSON.stringify(response));
    })
    .catch(function (err) {
        var str = "An error occurred: " + err;
        console.log(str);
    });