import { DRAWER_UI } from './constants';

export default class Line {
  options;
  path;
  tag;
  params;
  clickCallBack;
  constructor(options, params) {
    this.options = options;
    this.path = new Path2D();
    this.tag = DRAWER_UI.LINE;
    this.params = params;
    this.init();
  }

  init() {
    this.path = this.draw();
  }

  draw() {
    const { x1, y1, x2, y2 } = this.options;
    const path = new Path2D();
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    return path;
  }

  on(category, clickCallBack) {
    if (category === 'click') {
      this.clickCallBack = clickCallBack;
    }
  }
}
