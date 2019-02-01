
var board;
var stand_by_pieces;
var current_move;

function reverseSide(side){
    if(side == "first"){
        return "second";
    } else {
        return "first";
    }
}

function resetBoard(){
    board = new Array(9);
    for(let y = 0; y < 9; y++) {
        board[y] = new Array(9).fill(null);
    }
}

function movePiece(src_row, src_col, dest_row, dest_col){
    var dest = board[dest_row][dest_col];
    if(dest == null){
        board[dest_row][dest_col] = board[src_row][src_col];
    } else if(current_move == board[dest_row][dest_col].side){
        return false;
    } else {
        dest.promoted = false;
        dest.side = reverseSide(dest.side);
        stand_by_pieces[current_move].push(dest);

        if((dest_col < 3) && (current_move == "first") || (dest_col > 5) && (current_move == "second")){
            board[dest_row][dest_col] = intoEnemyTerritory(board[src_row][src_col]);
        } else {
            board[dest_row][dest_col] = board[src_row][src_col];
        }
    }

    board[src_row][src_col] = null;
    return true;
}

function movePieceFromStandBy(src_index, dest_row, dest_col){
    var dest = board[dest_row][dest_col];
    if(dest != null){
        return false;
    }

    board[dest_row][dest_col] = stand_by_pieces[current_move][src_index];
    stand_by_pieces[current_move].splice(src_index, 1);

    return true;
}

function intoEnemyTerritory(piece){
    var promote = window.confirm("成りますか？");
    if(promote){
        return piece.promote();
    } else {
        return piece;
    }
}

function initializeBoard(){
    board[0][0] = new Piece("second", "kyo");
    board[8][0] = new Piece("second", "kyo");
    board[0][8] = new Piece("first", "kyo");
    board[8][8] = new Piece("first", "kyo");

    board[1][0] = new Piece("second", "kei");
    board[7][0] = new Piece("second", "kei");
    board[1][8] = new Piece("first", "kei");
    board[7][8] = new Piece("first", "kei");

    board[2][0] = new Piece("second", "gin");
    board[6][0] = new Piece("second", "gin");
    board[2][8] = new Piece("first", "gin");
    board[6][8] = new Piece("first", "gin");

    board[3][0] = new Piece("second", "kin");
    board[5][0] = new Piece("second", "kin");
    board[3][8] = new Piece("first", "kin");
    board[5][8] = new Piece("first", "kin");

    board[4][0] = new Piece("second", "ou");
    board[4][8] = new Piece("first", "ou");

    board[1][1] = new Piece("second", "kaku");
    board[7][7] = new Piece("first", "kaku");

    board[7][1] = new Piece("second", "hi");
    board[1][7] = new Piece("first", "hi");

    board[0][2] = new Piece("second", "fu");
    board[1][2] = new Piece("second", "fu");
    board[2][2] = new Piece("second", "fu");
    board[3][2] = new Piece("second", "fu");
    board[4][2] = new Piece("second", "fu");
    board[5][2] = new Piece("second", "fu");
    board[6][2] = new Piece("second", "fu");
    board[7][2] = new Piece("second", "fu");
    board[8][2] = new Piece("second", "fu");

    board[0][6] = new Piece("first", "fu");
    board[1][6] = new Piece("first", "fu");
    board[2][6] = new Piece("first", "fu");
    board[3][6] = new Piece("first", "fu");
    board[4][6] = new Piece("first", "fu");
    board[5][6] = new Piece("first", "fu");
    board[6][6] = new Piece("first", "fu");
    board[7][6] = new Piece("first", "fu");
    board[8][6] = new Piece("first", "fu");
}

