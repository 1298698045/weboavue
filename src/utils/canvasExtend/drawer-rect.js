import { DRAWER_UI } from './constants';
// type Options = {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     isFill?: boolean;
//     color?: string;
// };
export default class Rect{
    constructor(options, params) {
        console.log("options",options);
        this.options = options;
        this.path = new Path2D();
        this.tag = DRAWER_UI.RECT;
        this.params = params;
        this.init();
    }
    init(){
        this.path = this.draw();
    }
    draw() {
        const { x, y, width, height } = this.options;
        const path = new Path2D();
        path.rect(x, y, width, height);
        return path;
    }
    
    on(category, clickCallBack) {
        if (category === 'click') {
          this.clickCallBack = clickCallBack;
        }
    }
}