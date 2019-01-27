
var board;
var imgs = { fu: { first: "./img/Sfu.png", second: "./img/Gfu.png" },
             hi: { first: "./img/Shi.png", second: "./img/Ghi.png" },
             kaku: { first: "./img/Skaku.png", second: "./img/Gkaku.png" },
             kyo: { first: "./img/Skyo.png", second: "./img/Gkyo.png" },
             kei: { first: "./img/Skei.png", second: "./img/Gkei.png" },
             gin: { first: "./img/Sgin.png", second: "./img/Ggin.png" },
             kin: { first: "./img/Skin.png", second: "./img/Gkin.png" },
             ou: { first: "./img/Sou.png", second: "./img/Gou.png" }
           };
var cell_height;
var cell_width;
var piece_height;
var piece_width;
var selected_piece;

function adjustHeight(table, height){
    for(var i = 0; i < table.rows.length; i++){
        table.rows[i].cells[0].height = height;
    }
}

function setPiece(table, row, col, img, width, height){
    table.rows[row - 1].cells[col - 1].img
}

function removePiece(table, row, col){
    table.rows[row - 1].cells[col - 1].innerHTML = "";
}

function arrangePieces(table){
    var cells = table.getElementsByTagName("td");
    for(var i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
    }
}

function setSize(table){
    let screen_width = document.documentElement.clientWidth;
    let table_width = (document.documentElement.clientHeight) * 3 / 4;
    table.width = table_width;
    cell_width = (table_width - 120) / 9;
    cell_height = (table_width * 4 / 3 - 200) / 9;
    piece_height = cell_height - 10;
    piece_width = piece_height * 43 / 48;
}

function initialize(){
    var table = document.getElementById("japhess_board");
    setSize(table);
    adjustHeight(table, cell_height);
    startGame(table);
}

function resetBoard(){
    board = new Array(9);
    for(let y = 0; y < 9; y++) {
        board[y] = new Array(9).fill(null);
    }
}

class Piece {
    constructor(first, type, promoted) {
        this.first = first;
        this.type = type;
        this.promoted = promoted;
    }

    promote() {
        this.promoted = true;
    }
}

function initializeBoard(){
    board[0][0] = new Piece(false, "kyo", false);
    board[8][0] = new Piece(false, "kyo", false);
    board[0][8] = new Piece(true, "kyo", false);
    board[8][8] = new Piece(true, "kyo", false);

    board[1][0] = new Piece(false, "kei", false);
    board[7][0] = new Piece(false, "kei", false);
    board[1][8] = new Piece(true, "kei", false);
    board[7][8] = new Piece(true, "kei", false);

    board[2][0] = new Piece(false, "gin", false);
    board[6][0] = new Piece(false, "gin", false);
    board[2][8] = new Piece(true, "gin", false);
    board[6][8] = new Piece(true, "gin", false);

    board[3][0] = new Piece(false, "kin", false);
    board[5][0] = new Piece(false, "kin", false);
    board[3][8] = new Piece(true, "kin", false);
    board[5][8] = new Piece(true, "kin", false);

    board[4][0] = new Piece(false, "ou", false);
    board[4][8] = new Piece(true, "ou", false);

    board[1][1] = new Piece(false, "kaku", false);
    board[7][7] = new Piece(true, "kaku", false);

    board[7][1] = new Piece(false, "hi", false);
    board[1][7] = new Piece(true, "hi", false);

    board[0][2] = new Piece(false, "fu", false);
    board[1][2] = new Piece(false, "fu", false);
    board[2][2] = new Piece(false, "fu", false);
    board[3][2] = new Piece(false, "fu", false);
    board[4][2] = new Piece(false, "fu", false);
    board[5][2] = new Piece(false, "fu", false);
    board[6][2] = new Piece(false, "fu", false);
    board[7][2] = new Piece(false, "fu", false);
    board[8][2] = new Piece(false, "fu", false);

    board[0][6] = new Piece(true, "fu", false);
    board[1][6] = new Piece(true, "fu", false);
    board[2][6] = new Piece(true, "fu", false);
    board[3][6] = new Piece(true, "fu", false);
    board[4][6] = new Piece(true, "fu", false);
    board[5][6] = new Piece(true, "fu", false);
    board[6][6] = new Piece(true, "fu", false);
    board[7][6] = new Piece(true, "fu", false);
    board[8][6] = new Piece(true, "fu", false);
}

function selectPiece(){
    if(selected_piece == this.parentNode.id){
        selected_piece = "";
        this.parentNode.bgColor = "";
        this.height = piece_height;
    } else if(selected_piece == ""){
        selected_piece = this.parentNode.id;
        this.parentNode.bgColor = "#EF9500";
        this.height = piece_height * 1.1;
    } else {
        var previous_select = document.getElementById(selected_piece);
        previous_select.firstChild.click();
    }
}

function removeAllChildlen(node){
    while (node.firstChild){
        node.removeChild(node.firstChild);
    }
}

function draw(table){
    for(var i = 1; i < 10; i++){
        for(var j = 1; j < 10; j++){
            var piece = board[i - 1][j - 1];
            var cell = document.getElementById(i + "-" + j);
            if(piece == null){
                removeAllChildlen(cell);
            } else {
                var img = document.createElement('img');
                if(piece.first){
                    img.src = imgs[piece.type].first;
                } else {
                    img.src = imgs[piece.type].second;
                }

                img.height = piece_height;
                img.width = piece_width;
                img.addEventListener("click", selectPiece);

                cell.appendChild(img);
            }
        }
    }
}

function startGame(table){
    selected_piece = "";
    resetBoard();
    initializeBoard();
    draw(table);
}


