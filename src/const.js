var imgs = { fu: { first: "./img/Sfu.png", second: "./img/Gfu.png", order: 1 },
             hi: { first: "./img/Shi.png", second: "./img/Ghi.png", order: 7 },
             kaku: { first: "./img/Skaku.png", second: "./img/Gkaku.png", order: 6 },
             kyo: { first: "./img/Skyo.png", second: "./img/Gkyo.png", order: 2 },
             kei: { first: "./img/Skei.png", second: "./img/Gkei.png", order: 3 },
             gin: { first: "./img/Sgin.png", second: "./img/Ggin.png", order: 4 },
             kin: { first: "./img/Skin.png", second: "./img/Gkin.png", order: 5 },
             ou: { first: "./img/Sou.png", second: "./img/Gou.png", order: 8 }
           };

let stand_by_first_id = "stand_by_pieces_first_side";
let stand_by_second_id = "stand_by_pieces_second_side";

class Piece {
    constructor(first, type, promoted) {
        this.first = first;
        this.type = type;
        this.promoted = promoted;
        if(first){
            this.img = imgs[type].first;
        } else {
            this.img = imgs[type].second;
        }
    }

    promote() {
        this.promoted = true;
    }
}

