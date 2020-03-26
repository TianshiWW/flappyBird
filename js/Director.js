import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    isGameOver;
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.landSpeed = 2;
        this.gap = window.innerHeight / 4;
        this.wingFlappingSpeed = 0.2;
        this.g = 0.2;
        this.offsetUp = 30;
    }

    run() {
        const backGroundSprite = this.dataStore.get('background');
        const landSprite = this.dataStore.get('land');
        const birds = this.dataStore.get('birds');
        const startButton = this.dataStore.get('startButton');
        const score = this.dataStore.get('score');

        if (!this.isGameOver) {
            backGroundSprite.draw();

            const pencils = this.dataStore.get('pencils');
            if ((pencils[0].x + pencils[0].width) <= 0 && pencils.length <= 4) {
                pencils.shift();
                pencils.shift();
                score.isScore = true;
            }

            if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && (pencils.length === 2)) {
                this.createPencil();
            }
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });

            landSprite.draw();
            score.draw();
            birds.draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);

        } else {
            startButton.draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();

        }
        this.check();

    }

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for (let i = 0; i < 3; i++){
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const length = pencils.length;
        const score = this.dataStore.get('score');
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦');
                this.isGameOver = true;
                return;
            }
        }

        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log("End")
            this.isGameOver = true;
            return;
        }

        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            // wx.vibrateShort({
            //     success: function () {
            //         console.log('振动成功');
            //     }
            // });
            score.isScore = false;
            score.score++;
        }
    }

    static isStrike(bird, pencil) {
        let res = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            res = true;
        }
        return !res;
    }
}