import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class DownPencil extends Pencil{
    constructor(top) {
        const image = Sprite.getImage('pencilDown');
        super(image, top);
    }
    draw() {
        this.y = this.top + Director.getInstance().gap;
        super.draw();
    }
}