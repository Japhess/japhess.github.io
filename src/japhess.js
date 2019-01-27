
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
var stand_by_second_side;
var stand_by_first_side;
var first_move;

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

function movePiece(src_row, src_col, dest_row, dest_col){
    var dest = board[dest_row][dest_col];
    if(dest == null){
        board[dest_row][dest_col] = board[src_row][src_col];
    } else {
        if(first_move){
            if(board[dest_row][dest_col].first){
                return false;
            }

            stand_by_first_side.push(board[dest_row][dest_col]);
            board[dest_row][dest_col] = board[src_row][src_col];
        } else {
            if(!board[dest_row][dest_col].first){
                return false;
            }

            stand_by_second_side.push(board[dest_row][dest_col]);
            board[dest_row][dest_col] = board[src_row][src_col];
        }
    }

    first_move = !first_move
    board[src_row][src_col] = null;
    return true;
}

function clickPiece(){
    var click_own_piece = pieceFromId(this.parentNode.id).first == first_move;
    if(selected_piece == this.parentNode.id){
        selected_piece = "";
        this.parentNode.bgColor = "";
        this.height = piece_height;
    } else if(selected_piece == "" && click_own_piece){
        selected_piece = this.parentNode.id;
        this.parentNode.bgColor = "#EF9500";
        this.height = piece_height * 1.1;
    } else if(selected_piece == "" && !click_own_piece){
        // message
    } else if(click_own_piece){
        var previous = document.getElementById(selected_piece);
        previous.bgColor = "";
        previous.firstChild.height = piece_height;
        selected_piece = "";
    } else {
        moveCell(selected_piece, this.parentNode.id);
    }
}

function pieceFromId(id){
    var splits = id.split("-");
    var row = Number(splits[0]) - 1;
    var col = Number(splits[1]) - 1;
    return board[row][col];
}

function moveCell(src_id, dest_id){
    var src_splits = src_id.split("-");
    var dest_splits = dest_id.split("-");
    var src_row = Number(src_splits[0]);
    var src_col = Number(src_splits[1]);
    var dest_row = Number(dest_splits[0]);
    var dest_col = Number(dest_splits[1]);
    var success = movePiece(src_row - 1, src_col - 1, dest_row - 1, dest_col - 1);
    if(success){
        drawPiece(src_row, src_col);
        drawPiece(dest_row, dest_col);
    }
    selected_piece = ""
}

function clickEmptyCell(){
    if(selected_piece != ""){
        moveCell(selected_piece, this.id);
    }
}

function removeAllChildlen(node){
    while (node.firstChild){
        node.removeChild(node.firstChild);
    }
}

function drawPiece(x, y){
    var piece = board[x - 1][y - 1];
    var cell = document.getElementById(x + "-" + y);
    if(cell.childNodes.length > 0){
        removeAllChildlen(cell);
    }
    if(piece == null){
        addClickEventOnEmptyCell(x, y);
    } else {
        var img = document.createElement('img');
        if(piece.first){
            img.src = imgs[piece.type].first;
        } else {
            img.src = imgs[piece.type].second;
        }

        img.height = piece_height;
        img.width = piece_width;
        img.addEventListener("click", clickPiece);

        cell.appendChild(img);
        cell.removeEventListener("click", clickEmptyCell);
    }
    cell.bgColor = "";
}

function addClickEventOnEmptyCell(x, y){
    var cell = document.getElementById(String(x) + "-" + String(y));
    cell.addEventListener("click", clickEmptyCell);
}

function draw(){
    for(var i = 1; i < 10; i++){
        for(var j = 1; j < 10; j++){
            if(board[i - 1][j - 1] == null){
                addClickEventOnEmptyCell(i, j);
            } else {
                drawPiece(i, j);
            }
        }
    }
}

function startGame(table){
    selected_piece = "";
    stand_by_first_side = [];
    stand_by_second_side = [];
    resetBoard();
    initializeBoard();
    draw();
    first_move = true;
}


