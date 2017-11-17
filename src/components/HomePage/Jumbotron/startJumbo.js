import { paper } from 'paper';
import TWEEN from 'tween.js';

let loopState = 'ANIMATION_READY';
let stopWatch = null;

const borderCollision = (125*0.35) + 25;
const idleTimer = 1.5;
const animationTimer = 1000;

const iconList = [
    "bootstrap-logo-jumbo",
    "github-logo-jumbo",
    "heroku-logo-jumbo",
    "meteor-logo-jumbo",
    "react-logo-jumbo",
    "slack-logo-jumbo",
    "trello-logo-jumbo",
];
/*let linkList = [{
    el1: 'hello',
    el2: 'world',
}];*/

//util
/*const displayPositions = (rasterList) => {
  for (let)
};*/
//

const getRandomPoint = (canvas) => {
    let maxPoint = new paper.Point(canvas.width - borderCollision, canvas.height - borderCollision);
    let randomPoint = paper.Point.random();
    let finalPoint = maxPoint;
    finalPoint.x = Math.round(finalPoint.x * randomPoint.x);
    finalPoint.y = Math.round(finalPoint.y * randomPoint.y);
    if (finalPoint.x < borderCollision)
        finalPoint.x = borderCollision;
    if (finalPoint.y < borderCollision)
        finalPoint.y = borderCollision;
    return (finalPoint);
};
const getRaster = (id, canvas) => {
    let raster = new paper.Raster(id);
    raster.position = getRandomPoint(canvas);
    raster.scale(0.35);
    return (raster);
};
/*const getLinks = (rasterList) => {
  for (let el in rasterList) {
      let curEl = rasterList[el];
      for (let el1 in rasterList) {
          if (curEl != rasterList[el1]) {
              console.log(el1);
          }
      }
      console.log(' ');
  }
};*/

const initScene = (canvas) => {
    let rect = new paper.Path.Rectangle({
        point: [-25, -25],
        size: [paper.view.size.width + 50, paper.view.size.height + 50],
        strokeColor: 'white',
    });
    rect.sendToBack();
    rect.fillColor = new paper.Color(0, 0, 0, 0.5);

    let space1 = new paper.Raster('space1-jumbo');
    space1.size = paper.view.viewSize;
    space1.position = paper.view.center;
    space1.sendToBack();

    let rasters = [];
    for (let el in iconList) {
        rasters.push({
            name: iconList[el],
            raster: getRaster(iconList[el], canvas),
            tween: null,
        });
    }
    //linkList = getLinks(rasters);

    return (rasters);
};

const startTween = (rasterList, canvas) => {
    for (let el in rasterList) {
        rasterList[el].tween = new TWEEN.Tween(rasterList[el].raster.position);
        rasterList[el].tween.to(getRandomPoint(canvas) , animationTimer);
        rasterList[el].tween.easing(TWEEN.Easing.Quartic.InOut);
        rasterList[el].tween.start();
    }
    rasterList[0].tween.onComplete(() => {
        loopState = 'ANIMATION_OVER';
    });
};

const drawLinks = (rasterList) => {

};

export const startJumbo = (canvas) => {
    paper.setup(canvas);

    let rasterList = initScene(canvas);

    paper.view.onFrame = function(event) {
        drawLinks(rasterList);
        switch (loopState) {
            case 'ANIMATION_READY':
                loopState = 'ANIMATION_IN_PROGRESS';
                startTween(rasterList, canvas);
                return (0);
            case 'ANIMATION_IN_PROGRESS':
                TWEEN.update();
                return (0);
            case 'ANIMATION_OVER':
                if (stopWatch === null)
                    stopWatch = event.time;
                else {
                    if ((event.time - stopWatch) > idleTimer) {
                        loopState = 'ANIMATION_READY';
                        stopWatch = null;
                    }
                }
                return (0);
            default:
                return (-1);
        }
    };
    paper.view.draw();
};