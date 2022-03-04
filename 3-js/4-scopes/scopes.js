// var a = 2;
// {
//     let a = 3;
//     console.log(a);
// }
// console.log(a);

// let a = 2;
// {
//     var a = 3;
//     console.log(a);
// }
// console.log(a);


function countDown(num) {
    for (let i = num; i >= 0; i--) {
        setTimeout(function() {
            console.log(i || "Lift-off!");
        }, (num - i) * 1000);
    }
}
// countDown(5);

function forlessCountdown(num) {
    console.log(num || "Lift-off!");
    if (num > 0) {
        setTimeout(function() {
            forlessCountdown(num - 1)
        }, 1000)
    }
}

forlessCountdown(5);