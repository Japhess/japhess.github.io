var cell_height;
var cell_width;
var piece_height;
var piece_width;
var selected_piece;

var comparePiece = function(p1, p2){
    return piece_info[p2.type].order - piece_info[p1.type].order;
};

function adjustHeight(table){
    for(var i = 0; i < table.rows.length; i++){
        table.rows[i].cells[0].height = cell_height;
    }
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
        table_height = document.documentElement.clientHeight - 30;
        table_width = table_height * 3 / 4;
    } else {
        table_width = document.documentElement.clientWidth - 30;
        table_height = table_width * 4 / 3;
    }
    table.width = table_width;
    cell_width = table_width / 9;
    cell_height = table_height / 11;
    piece_height = cell_height - 10;
    piece_width = piece_height - 10;
}

function adjustHeightOfStandByArea(){
    var div = document.getElementById(stand_by_id.first);
    div.style.height = cell_height + 'px';
    var div = document.getElementById(stand_by_id.second);
    div.style.height = cell_height + 'px';
}

function initialize(){
    var table = document.getElementById("japhess_board");
    setSize(table);
    adjustHeight(table);
    adjustHeightOfStandByArea();
    startGame(table);
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
        case stand_by_id.first:
            return "first-" + indexOfPiece(par, elem);
        case stand_by_id.second:
            return "second-" + indexOfPiece(par, elem);
        default:
            return elem.parentNode.id;
    }
}

function clickPiece(){
    var click_own_piece = pieceDirectionFromId(this.parentNode.id) == current_move;
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
            case "second":
                var index = position_splits[1];
                var div = document.getElementById(stand_by_id[current_move]);
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
        case stand_by_id.first:
            return "first";
        case stand_by_id.second:
            return "second";
        default:
            var splits = id.split("-");
            var row = Number(splits[0]) - 1;
            var col = Number(splits[1]) - 1;
            return board[row][col].side;
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
                drawStandBy(stand_by_id[current_move], stand_by_pieces[current_move]);
                current_move = reverseSide(current_move);
            }
            break;
        default:
            var [src_row, src_col] = src_splits.map(Number);
            var [dest_row, dest_col] = dest_splits.map(Number);
            var success = movePiece(src_row - 1, src_col - 1, dest_row - 1, dest_col - 1);
            if(success){
                drawPiece(src_row, src_col);
                drawPiece(dest_row, dest_col);
                stand_by_pieces[current_move].sort(comparePiece);
                drawStandBy(stand_by_id[current_move], stand_by_pieces[current_move]);
                current_move = reverseSide(current_move);
            }
    }
    selected_piece = ""
}

function imageSource(piece){
    if(piece.promoted){
        return piece_info[piece.type]["img"][piece.side + "_promoted"];
    } else {
        return piece_info[piece.type]["img"][piece.side];
    }
}


function drawStandBy(id, stand_by_array){
    var div = document.getElementById(id);
    removeAllChildlen(div);
    stand_by_array.forEach(function(p){
        var img = document.createElement('img');
        img.src = imageSource(p);
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
        img.src = imageSource(piece);

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
    stand_by_pieces = { "first": [], "second": [] };
    resetBoard();
    initializeBoard();
    draw();
    current_move = "first";
}

