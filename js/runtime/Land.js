import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Land extends Sprite{
    constructor() {
        const landImage = Sprite.getImage('land');
        super(landImage,
            0,
            0,
            landImage.width,
            landImage.height,
            0,
            window.innerHeight - landImage.height,
            landImage.width,
            landImage.height);

        this.landX = 0;
        this.landSpeed = Director.getInstance().landSpeed;
    }

    draw(){
        if (this.landX > (this.img.width - window.innerWidth)) {
            this.landX = 0;
        }

        this.landX = this.landSpeed + this.landX;
        super.draw(this.img, this.srcX, this.srcY,this.srcW, this.srcH, -this.landX, this.y, this.width, this.height);

    }

}