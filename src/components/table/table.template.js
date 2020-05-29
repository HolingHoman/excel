const CODES = {
    A: 65,
    Z: 90
}

// function createCell(i,index) {
//     return `
//         <div class="cell" contenteditable="true" data-col="${index}" data-row="${i}"></div>
//     `
// }

function toCell(row) {
    return function (_,y) {
        return `
        <div class="cell" contenteditable="true" data-col="${y}" data-id="${row}:${y}" data-type="cell"></div>
    `
    }
}

function createCol(el, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
        ${el}
        <div class="col-resize" data-resize="coll"></div>
    </div>`
}



function createRow(index,content) {
    const resize = index ? `<div class="row-resiaze" data-resize="row"></div>` : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">${index ? index : ''}${resize}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_,index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {

    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount).fill('').map(toChar).map(createCol).join('');

    rows.push(createRow(null,cols))

    for(let y = 0; y < rowsCount; y++){
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, index) => createCell(y, index))
            .map(toCell(y))
            .join('')
        rows.push(createRow(y + 1,cells))
    }



    return rows.join('')
}

