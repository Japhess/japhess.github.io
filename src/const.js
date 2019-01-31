let piece_info = { fu: { img: { first: "./img/Sfu.png",
                                second: "./img/Gfu.png",
                                first_promoted: "./img/Sto.png",
                                second_promoted: "./img/Gto.png",
                              },
                         order: 1
                       },
                   hi:   { img: { first: "./img/Shi.png",
                                  second: "./img/Ghi.png",
                                  first_promoted: "./img/Gryu.png",
                                  second_promoted: "./img/Sryu.png",
                                },
                           order: 7
                         },
                   kaku: { img: { first: "./img/Skaku.png",
                                  second: "./img/Gkaku.png",
                                  first_promoted: "./img/Suma.png",
                                  second_promoted: "./img/Guma.png"
                                },
                           order: 6
                         },
                   kyo:  { img: { first: "./img/Skyo.png",
                                  second: "./img/Gkyo.png",
                                  first_promoted: "./img/Snkyo.png",
                                  second_promoted: "./img/Gnkyo.png"
                                },
                           order: 2
                         },
                   kei:  { img: { first: "./img/Skei.png",
                                  second: "./img/Gkei.png",
                                  first_promoted: "./img/Snkei.png",
                                  second_promoted: "./img/Gnkei.png"
                                },
                           order: 3
                         },
                   gin:  { img: { first: "./img/Sgin.png",
                                  second: "./img/Ggin.png",
                                  first_promoted: "./img/Sngin.png",
                                  second_promoted: "./img/Gngin.png"
                                },
                           order: 4
                         },
                   kin:  { img: { first: "./img/Skin.png",
                                  second: "./img/Gkin.png",
                                  first_promoted: "./img/Skin.png",
                                  second_promoted: "./img/Gkin.png"
                                },
                           order: 5
                         },
                   ou:   { img: { first: "./img/Sou.png",
                                  second: "./img/Gou.png",
                                  first: "./img/Sou.png",
                                  second: "./img/Gou.png"
                                },
                           order: 8
                         },
};

let stand_by_first_id = "stand_by_pieces_first_side";
let stand_by_second_id = "stand_by_pieces_second_side";

class Piece {
    constructor(first, type, promoted) {
        this.first = first;
        this.type = type;
        this.promoted = promoted;
        if(first){
            this.img = piece_info[type].img.first;
        } else {
            this.img = piece_info[type].img.second;
        }
    }

    promote() {
        this.promoted = true;
        if(this.first){
            this.img = piece_info[this.type].img.first_promoted;
        } else {
            this.img = piece_info[this.type].img.second_promoted;
        }
        return this;
    }
}

