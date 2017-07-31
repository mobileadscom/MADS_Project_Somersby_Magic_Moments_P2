/* eslint-disable no-console */
/* global window */
import Mads from 'mads-custom';
import Dragi from 'draggabilly';
import './main.css';

class AdUnit extends Mads {
  constructor() {
    super();
    this.bg = 1;
  }

  render() {
    const bgs = [1, 2, 3, 4].map(i => `<div id="bg${i}" class="bg${i === 1 ? ' active' : ''}"></div>`).join('');

    return `
      <div class="container" id="ad-container">
        <img src="${this.data.tap.replace(/\s/g, '%20')}" id="tap" class="overlay">
        <img src="${this.data.water_can.replace(/\s/g, '%20')}" id="water_can" class="overlay">
        <img src="${this.data.water_can_w.replace(/\s/g, '%20')}" id="water_can_w" class="overlay hide">
        <div id="second" class="hide">
          <img src="${this.data.bottle_empty.replace(/\s/g, '%20')}" id="bottle_empty" class="overlay">
          <img src="${this.data.drag.replace(/\s/g, '%20')}" id="drag" class="overlay">
          <img src="${this.data.apple.replace(/\s/g, '%20')}" id="apple" class="overlay">
          <img src="${this.data.logo.replace(/\s/g, '%20')}" id="logo" class="overlay">
          <img src="${this.data.arrow.replace(/\s/g, '%20')}" id="arrow" class="overlay">
        </div>
        <div id="third" class="hide">
          <img src="${this.data.logo.replace(/\s/g, '%20')}" id="logo" class="overlay">
          <img src="${this.data.live.replace(/\s/g, '%20')}" id="live" class="overlay">
          <img src="${this.data.install.replace(/\s/g, '%20')}" id="install" class="overlay">
          <img src="${this.data.more.replace(/\s/g, '%20')}" id="more" class="overlay">
          <img src="${this.data.package.replace(/\s/g, '%20')}" id="package" class="overlay">
        </div>
        ${bgs}
      </div>
    `;
  }

  style() {
    return [`
      #bg1 { background: url(${this.data.bg1.replace(/\s/g, '%20')}) no-repeat -9999px -9999px; }
      #bg2 { background: url(${this.data.bg2.replace(/\s/g, '%20')}) no-repeat -9999px -9999px; }
      #bg3 { background: url(${this.data.bg3.replace(/\s/g, '%20')}) no-repeat -9999px -9999px; }
      #bg4 { background: url(${this.data.bg4.replace(/\s/g, '%20')}) no-repeat -9999px -9999px; }
      `];
  }

  events() {
    let watering = false;
    this.elems.tap.onclick = () => {
      this.bg = this.bg === 3 ? 3 : this.bg + 1;
      if (!watering) {
        this.elems.water_can.className = 'overlay hide';
        this.elems.water_can_w.className = 'overlay reveal';
        watering = true;
        this.tracker('E', 'tap1x');
        this.bg = 1;
      } else {
        this.elems[`bg${this.bg - 1}`].className = 'bg';
        this.elems[`bg${this.bg}`].className = 'bg active';
        this.tracker('E', `tap${this.bg}x`);
      }

      if (this.bg === 3) {
        this.tracker('E', `tap${this.bg}x`);
        setTimeout(() => {
          this.elems.water_can_w.className = 'overlay hide';
          this.elems.tap.className = 'overlay hide';
        }, 600);

        setTimeout(() => {
          this.elems.second.style.display = 'block';
          setTimeout(() => {
            this.elems.second.className = '';
          }, 1);
        }, 1000);

        setTimeout(() => {
          this.elems.apple.className = 'overlay fall-anim';
        }, 1600);

        setTimeout(() => {
          const draggie = new Dragi(this.elems.apple, {});

          draggie.on('dragMove', () => {
            if (draggie.position.x > 199 && draggie.position.y > 290) {
              this.tracker('E', 'drag');
              this.elems[`bg${this.bg}`].className = 'bg';
              this.elems[`bg${this.bg + 1}`].className = 'bg active';
              setTimeout(() => {
                this.elems.third.style.display = 'block';
                this.elems.second.className = 'hide';
                setTimeout(() => {
                  this.elems.third.className = 'reveal';
                }, 100);
                setTimeout(() => {
                  this.elems.second.style.display = 'none';
                }, 1000);
              }, 200);
            }
          });
        }, 2200);
      }
    };
  }
}

window.ad = new AdUnit();
