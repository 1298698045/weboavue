import { DRAWER_UI } from './constants';

// type Options = {
//   x: number;
//   y: number;
//   text: string;
//   font?: string;
//   isFill?: boolean;
//   color?: string;
// };

export default class Text {
  options;
  tag;
  params;
  clickCallBack;
  constructor(options, params) {
    this.options = options;
    this.tag = DRAWER_UI.TEXT;
    this.params = params;
  }

  on(category, clickCallBack) {
    if (category === 'click') {
      this.clickCallBack = clickCallBack;
    }
  }
}
