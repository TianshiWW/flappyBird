import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Birds extends Sprite{
    constructor() {
        const image = Sprite.getImage('birds');

        super(image,
            0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        this.clippingX = [9, 9 + 34 +18, 9 + 34 + 18 + 34 + 18];
        this.clippingY = [10, 10, 10];
        this.clippingW = [34, 34, 34];
        this.clippingH = [24, 24, 24];

        this.birdX = window.innerWidth / 4;
        this.birdsX = [this.birdX, this.birdX, this.birdX];

        this.birdY = window.innerHeight / 2;
        this.birdsY = [this.birdY, this.birdY, this.birdY];

        this.birdW = 34;
        this.birdsWidth = [this.birdW, this.birdW, this.birdW];

        this.birdH = 24;
        this.birdsHeight = [this.birdH, this.birdH, this.birdH];

        this.y = [this.birdY, this.birdY, this.birdY];

        this.index = 0;
        this.count = 0;
        this.time = 0;

    }

    draw() {
        let director = Director.getInstance();
        const speed = director.wingFlappingSpeed;
        this.count = this.count + speed;
        if (this.index >= 2) {
            this.count = 0;
        }
        this.index = Math.floor(this.count);

        const offsetY = (director.g * this.time * (this.time - director.offsetUp)) / 2;
        for (let i = 0; i < 3; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;
        super.draw(this.img, this.clippingX[this.index], this.clippingY[this.index],
            this.clippingW[this.index], this.clippingH[this.index],
            this.birdsX[this.index],  this.birdsY[this.index],
            this.birdsWidth[this.index],  this.birdsHeight[this.index]);
    }
}