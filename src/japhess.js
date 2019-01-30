var board;
var cell_height;
var cell_width;
var piece_height;
var piece_width;
var selected_piece;
var stand_by_second_side;
var stand_by_first_side;
var first_move;

var comparePiece = function(p1, p2){
    return p1.order > p2.order;
};

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
    let aspect = screen.height / screen.width;
    var table_height;
    var table_width;
    if(aspect < 1.34){
        table_height = document.documentElement.clientHeight - 100;
        table_width = table_height * 3 / 4;
    } else {
        table_width = document.documentElement.clientWidth - 100;
        table_height = table_height * 4 / 3;
    }
    table.width = table_width;
    cell_width = table_width / 9;
    cell_height = table_height / 11;
    piece_height = cell_height - 10;
    piece_width = piece_height - 10;
}

function initialize(){
    var table = document.getElementById("japhess_board");
    setSize(table);
    adjustHeight(table, cell_height);
    startGame(table);
}

function resetBoard(){
    var div = document.getElementById(stand_by_first_id);
    div.style.height = cell_height + 'px';
    var div = document.getElementById(stand_by_second_id);
    div.style.height = cell_height + 'px';

    board = new Array(9);
    for(let y = 0; y < 9; y++) {
        board[y] = new Array(9).fill(null);
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

            dest.img = imgs[dest.type].first;
            stand_by_first_side.push(dest);
            board[dest_row][dest_col] = board[src_row][src_col];
        } else {
            if(!board[dest_row][dest_col].first){
                return false;
            }

            dest.img = imgs[dest.type].second;
            stand_by_second_side.push(dest);
            board[dest_row][dest_col] = board[src_row][src_col];
        }
    }

    board[src_row][src_col] = null;
    return true;
}

function movePieceFromStandBy(src_index, dest_row, dest_col){
    var dest = board[dest_row][dest_col];
    if(dest == null){
        if(first_move){
            board[dest_row][dest_col] = stand_by_first_side[src_index];
            stand_by_first_side.splice(src_index, 1);
        } else {
            board[dest_row][dest_col] = stand_by_second_side[src_index];
            stand_by_second_side.splice(src_index, 1);
        }
    } else {
        return false;
    }

    return true;
}

function indexOfPiece(parentNode, img){
    for(var i = 0; i < parentNode.childNodes.length; i++){
        if(parentNode.childNodes[i] === img){
            return i;
        }
    }
    
    return -1;
}

function position(elem){
    var par = elem.parentNode;
    switch(par.id){
        case stand_by_first_id:
            return "first-" + indexOfPiece(par, elem);
        case stand_by_second_id:
            return "second-" + indexOfPiece(par, elem);
        default:
            return elem.parentNode.id;
    }
}

function clickPiece(){
    var click_own_piece = pieceDirectionFromId(this.parentNode.id) == first_move;
    if(selected_piece == this.parentNode.id){
        selected_piece = "";
        this.parentNode.bgColor = "";
        this.height = piece_height;
    } else if(selected_piece == "" && click_own_piece){
        selected_piece = position(this);
        this.parentNode.bgColor = "#EF9500";
        this.height = piece_height * 1.1;
    } else if(selected_piece == "" && !click_own_piece){
        // message
    } else if(click_own_piece){
        var position_splits = seleted_piece.split("-");
        switch(position_splits[0]){
            case "first":
                var index = position_splits[1];
                var div = document.getElementById(stand_by_first_id);
                div.childNodes[Number(index)].height = piece_height;
            case "second":
                var index = position_splits[1];
                var div = document.getElementById(stand_by_second_id);
                div.childNodes[Number(index)].height = piece_height;
            default:
                var previous = document.getElementById(selected_piece);
                previous.bgColor = "";
                previous.firstChild.height = piece_height;
        }
            
        selected_piece = "";
    } else {
        moveCell(selected_piece, this.parentNode.id);
    }
}

function pieceDirectionFromId(id){
    switch(id){
        case stand_by_first_id:
            return true;
        case stand_by_second_id:
            return false;
        default:
            var splits = id.split("-");
            var row = Number(splits[0]) - 1;
            var col = Number(splits[1]) - 1;
            return board[row][col].first;
    }
}

function moveCell(src_id, dest_id){
    var src_splits = src_id.split("-");
    var dest_splits = dest_id.split("-");
    switch(src_splits[0]){
        case "first":
        case "second":
            var src_index = Number(src_splits[1]);
            var [dest_row, dest_col] = dest_splits.map(Number);
            var success = movePieceFromStandBy(src_index, dest_row - 1, dest_col - 1);
            if(success){
                drawPiece(dest_row, dest_col);
                if(first_move){
                    let id = stand_by_first_id;
                    drawStandBy(id, stand_by_first_side);
                } else {
                    let id = stand_by_second_id;
                    drawStandBy(id, stand_by_second_side);
                }
                first_move = !first_move
            }
            break;
        default:
            var [src_row, src_col] = src_splits.map(Number);
            var [dest_row, dest_col] = dest_splits.map(Number);
            var success = movePiece(src_row - 1, src_col - 1, dest_row - 1, dest_col - 1);
            if(success){
                drawPiece(src_row, src_col);
                drawPiece(dest_row, dest_col);
                if(first_move){
                    let id = stand_by_first_id;
                    stand_by_first_side.sort(comparePiece);
                    drawStandBy(id, stand_by_first_side);
                } else {
                    let id = stand_by_second_id;
                    stand_by_first_side.sort(comparePiece);
                    drawStandBy(id, stand_by_second_side);
                }
                first_move = !first_move
            }
    }
    selected_piece = ""
}

function drawStandBy(id, stand_by_array){
    var div = document.getElementById(id);
    removeAllChildlen(div);
    stand_by_array.forEach(function(p){
        var img = document.createElement('img');
        img.src = p.img;
        img.height = piece_height;
        img.width = piece_width;
        img.addEventListener("click", clickPiece);
        div.appendChild(img);
    });
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
        img.src = piece.img;

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


