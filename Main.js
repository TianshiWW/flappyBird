
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";


export class Main {
    constructor() {
        console.log("HelloWorld");
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d')
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));



    }
    onResourceFirstLoaded(map) {
        console.log(map);
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();

    }

    init() {

        this.director.isGameOver = false;

        this.dataStore
            .put('background', new BackGround())
            .put('land', new Land())
            .put('pencils', [])
            .put('birds', new Birds())
            .put('startButton', new StartButton())
            .put('score', new Score());
        this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }


    registerEvent(){
        this.canvas.addEventListener('touchstart', e =>{
            e.preventDefault();
            // console.log("Touched");
            if (this.director.isGameOver) {
                console.log("Start");
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });
    }



}