data = "Publication Date,Title,Authors\n29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien\n01/08/1996,A Game of Thrones,George Raymond Martin\n21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling";

// console.log("=============".length)
// // first section (date)     13 chars - 2
// console.log("===============================".length)
// // second second (title)    31 chars - 2
// console.log("=======================".length)
// // third section (author)   23 chars - 2

const getFormattedDate = (dateString) => {
    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }
    let dateBits = dateString.split("/");
    let date = new Date(`${dateBits[2]}-${dateBits[1]}-${dateBits[0]}`);
    return ` ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()} `;
}

const truncateString = (string, num) => {
    return string.slice(0,num - 3) + "...";
}

const getPrintableLine = (line) => {
    let pubDate = line[0];
    const formattedDate = getFormattedDate(pubDate)
    const title = (line[1].length > 29) ? truncateString(line[1], 29) : line[1].padStart(29);
    const author = (line[2].length > 21) ? truncateString(line[2], 21) : line[2].padStart(21);
    return `|${formattedDate}| ${title} | ${author} |`
}

const printTable = (dataString) => {
    var lines = data.split("\n").map(line => line.split(","));
    console.log("| Pub Date    |                         Title | Authors               |")
    console.log("|=====================================================================|")
    lines.shift();
    lines.forEach(line => {
        let printableLine = getPrintableLine(line);
        console.log(printableLine);
    })
}

printTable(data);

// let exampleLine = [ '29/07/1954', 'Lord of the Rings', 'John Ronald Reuel Tolkien' ]

// getPrintableLine(exampleLine);