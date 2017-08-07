/* eslint-disable no-console */
/* global window, MouseEvent, FileReader, Image, html2canvas, FormData, Blob, XMLHttpRequest */
import Mads from 'mads-custom';
import Dragi from 'draggabilly';
import 'blueimp-canvas-to-blob';
import './main.css';


class AdUnit extends Mads {
  constructor() {
    super();
    this.bg = 1;
    this.photo = null;
    this.url = '';
  }

  render() {
    const bgs = [1, 2, 3, 4].map(i => `<div id="bg${i}" class="bg${i === 1 ? ' active' : ''}"></div>`).join('');

    return `
      <div class="container" id="ad-container">
        <img src="${this.data.tap.replace(/\s/g, '%20')}" id="tap" class="overlay">
        <img src="${this.data.water_can.replace(/\s/g, '%20')}" id="water_can" class="overlay">
        <img src="${this.data.arrow.replace(/\s/g, '%20')}" id="arrow_can" class="overlay">
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
          <img src="${this.data.upload.replace(/\s/g, '%20')}" id="upload" class="overlay">
          <img src="${this.data.package.replace(/\s/g, '%20')}" id="package" class="overlay">
          <input type="file" id="inputFile" style="display: none;" />
        </div>
        <div id="fourth">
          <img src="${this.data.install.replace(/\s/g, '%20')}" id="install" class="overlay">
          <img src="${this.data.share.replace(/\s/g, '%20')}" id="share" class="overlay">
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

    const uploadHTML = (timestamp, info) => {
      const title = info.name;
      const description = info.desc;
      const image = info.url;
      const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta property="og:type" content="image">
        <meta property="og:title" content="${description}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        <meta name="description" content="${description}">
        <meta name="DC.title" content="${description}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <style>
        body {
          padding-top: 20px;
          padding-bottom: 20px;
          background-color: #B8E4F8;
        }
        /* Everything but the jumbotron gets side spacing for mobile first views */
        .header, .marketing, .footer {
          padding-right: 15px;
          padding-left: 15px;
        }
        /* Custom page header */
        .header {
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e5e5;
        }
        /* Make the masthead heading the same height as the navigation */
        .header h3 {
          margin-top: 0;
          margin-bottom: 0;
          line-height: 40px;
        }
        /* Custom page footer */
        .footer {
          padding-top: 19px;
          color: #777;
          border-top: 1px solid #e5e5e5;
        }
        /* Customize container */
        @media (min-width: 768px) {
          .container {
            max-width: 730px;
          }
        }
        .container-narrow > hr {
          margin: 30px 0;
        }
        /* Main marketing message and sign up button */
        .jumbotron {
          text-align: center;
          border-bottom: 1px solid #e5e5e5;
          background-color: #788C0A;
        }
        .jumbotron .btn {
          padding: 14px 24px;
          font-size: 21px;
        }
        /* Supporting marketing content */
        .marketing {
          margin: 40px 0;
        }
        .marketing p + h4 {
          margin-top: 28px;
        }
        /* Responsive: Portrait tablets and up */
        @media screen and (min-width: 768px) {
          /* Remove the padding we set earlier */
          .header, .marketing, .footer {
            padding-right: 0;
            padding-left: 0;
          }
          /* Space out the masthead */
          .header {
            margin-bottom: 30px;
          }
          /* Remove the bottom border on the jumbotron for visual effect */
          .jumbotron {
            border-bottom: 0;
          }
        } </style>
      </head>
      <body>
      <div class="container">
        <div class="jumbotron">
          <div class="row marketing"><img src="${image}" alt="${description}">
            <h1 class="title" style="color: #FDFEFE;">${description}</h1>
            <!--<p class="description">${description}</p>-->
            <!--<p><strong>You'll be redirected to our site. Please wait for 5 seconds.</strong></p>--></div>
        </div>
      </div> <!-- Latest compiled and minified JavaScript -->
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
              integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
              crossorigin="anonymous"></script>
      </body>
      </html>
      `;

      return new Promise((resolve, reject) => {
        const data = new FormData();

        try {
          data.append('pic[]', new Blob([html], {
            type: 'text/html',
          }));
          data.append('path', `3575/custom/somersby.p2/uploads/${info.name}-${timestamp}`);
          data.append('name', 'index.html');

          const xhr = new XMLHttpRequest();

          xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
              this.tracker('E', 'uploaded');
              resolve(`https://rmarepo.richmediaads.com/3575/custom/somersby.p2/uploads/${info.name}-${timestamp}/index.html`);
            }
          });

          xhr.open('POST', 'https://www.mobileads.com/upload-image-twtbk');
          xhr.setRequestHeader('cache-control', 'no-cache');

          xhr.send(data);
        } catch (e) {
          reject(e);
        }
      });
    };

    const uploadImage = (b, info) => new Promise((resolve, reject) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const data = new FormData();

      try {
        const n = info.name.replace(/\s/g, '.');
        const fileName = `${n}-${timestamp}.png`;
        data.append('pic[]', b);
        data.append('path', `3575/custom/somersby.p2/uploads/${n}-${timestamp}`);
        data.append('name', fileName);

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () => {
          if (xhr.readyState === 4) {
            uploadHTML(timestamp, {
              name: n,
              desc: 'Live Your #MagicMoments',
              url: `https://rmarepo.richmediaads.com/3575/custom/somersby.p2/uploads/${n}-${timestamp}/${fileName}`,
            }).then((urlOfIndex) => {
              this.url = urlOfIndex;
              resolve({
                fileName,
                urlOfIndex,
              });
            });
          }
        });

        xhr.open('POST', 'https://www.mobileads.com/upload-image-twtbk');
        xhr.setRequestHeader('cache-control', 'no-cache');

        xhr.send(data);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });

    const pushImage = () => new Promise((resolve, reject) => {
      this.loadJS(`${this.resolve('js/html2canvas.js')}`).then(() => {
        html2canvas(this.elems['ad-container'], {
          onrendered: (canvas) => {
            canvas.toBlob((blob) => {
              this.elems.fourth.style.left = '0px';
              uploadImage(blob, { name: new Date().toDateString() }).then(() => {
                resolve();
              }).catch(() => {
                reject();
              });
            });
          },
        });
      });
    });

    this.elems.upload.addEventListener('mousedown', () => {
      this.tracker('E', 'upload');
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      const cancelled = !this.elems.inputFile.dispatchEvent(event);
      if (cancelled) {
        console.log('cancelled');
      }
    });

    this.elems.share.addEventListener('mousedown', () => {
      this.tracker('E', 'share');
      if (this.url === '') {
        window.alert('Image still uploading. Try again later.');
      } else {
        const url = encodeURIComponent(this.url);
        this.linkOpener(`https://www.facebook.com/sharer.php?u=${url}`);
      }
    });

    this.elems.inputFile.onchange = () => {
      const file = this.elems.inputFile.files[0];
      if (file) {
        if (FileReader) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            const img = new Image();
            const imgContainer = window.document.createElement('div');
            imgContainer.className = 'overlay photo';
            imgContainer.append(img);
            img.src = fileReader.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.onload = () => {
              this.elems.third.append(imgContainer);
              pushImage().then(() => {

              });
            };
            this.photo = img;
          };
          fileReader.readAsDataURL(file);
        }
      }
    };

    this.elems.inputFile.addEventListener('mousedown', function inputFileOnClick() {
      this.value = null;
    });

    this.elems.install.addEventListener('mousedown', () => {
      this.tracker('E', 'install');
      this.linkOpener('https://www.mcliqonapps.net/somersby/app/');
    });

    const waterClick = () => {
      if (typeof this.ending !== 'undefined') {
        return;
      }
      this.bg = this.bg === 3 ? 3 : this.bg + 1;
      if (!watering) {
        this.elems.water_can.className = 'overlay hide';
        this.elems.arrow_can.className = 'overlay hide';
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
                  this.ending = true;
                  this.elems.second.style.display = 'none';
                }, 1000);
              }, 200);
            }
          });
        }, 2200);
      }
    };
    this.elems.water_can.addEventListener('mousedown', waterClick);
    this.elems.water_can_w.addEventListener('mousedown', waterClick);
  }
}

window.ad = new AdUnit();
