import { paper } from 'paper';
import TWEEN from 'tween.js';

import { circleRadius, borderCollision, idleTimer, animationTimer  } from './varJumbo.js';
//import { displayGrid, displayCollisions, resetCollisions } from './debugJumbo.js';

let loopState = 'ANIMATION_READY';
let stopWatch = null;

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

const getRandomPoint = () => {
    let maxPoint = new paper.Point(paper.view.size.width - borderCollision, paper.view.size.height - borderCollision);
    let randomPoint;
    let finalPoint;

    randomPoint = paper.Point.random();
    finalPoint = Object.assign({}, maxPoint);
    finalPoint.x = Math.round(finalPoint.x * randomPoint.x);
    finalPoint.y = Math.round(finalPoint.y * randomPoint.y);
    if (finalPoint.x < borderCollision)
        finalPoint.x = borderCollision;
    if (finalPoint.y < borderCollision)
        finalPoint.y = borderCollision;
    return (finalPoint);
};

const getRandomPoints = (pointNb) => {
    let i = 0;
    let pointList = [];
    let fail = false;
    let maxLoop = 0;

    while (i < pointNb) {
        let randomPoint = getRandomPoint();
        let candidateSquare = {
            top: randomPoint.y - circleRadius,
            bottom: randomPoint.y + circleRadius,
            left: randomPoint.x - circleRadius,
            right: randomPoint.x + circleRadius,
        };

        if (i === 0) {
            pointList.push(randomPoint);
            i++;
        }
        else {
            for (let k = 0; k < pointList.length; k++) {
                if (k !== i) {
                    let testerSquare = {
                        top: pointList[k].y - circleRadius,
                        bottom: pointList[k].y + circleRadius,
                        left: pointList[k].x - circleRadius,
                        right: pointList[k].x + circleRadius,
                    };
                    if (((candidateSquare.left < testerSquare.right && candidateSquare.left > testerSquare.left) ||
                        (candidateSquare.right > testerSquare.left && candidateSquare.right < testerSquare.right)) &&
                        ((candidateSquare.top < testerSquare.bottom && candidateSquare.top > testerSquare.top) ||
                        (candidateSquare.bottom < testerSquare.bottom && candidateSquare.bottom > candidateSquare.top))) {
                        fail = true;
                        maxLoop++;
                        //displayCollisions(maxLoop, randomPoint.x, randomPoint.y, pointList[k].x, pointList[k].y);
                        break;
                    }
                }
            }
            if (fail && maxLoop < 40)
                fail = false;
            else {
                pointList.push(randomPoint);
                i++;
                maxLoop = 0;
            }
        }
    }
    return (pointList);
};

const getRaster = (id) => {
    let raster = new paper.Raster(id);
    raster.position = paper.view.center;
    raster.scale(0.35);
    return (raster);
};

/*const getLinks = (rasterList) => {
  for (let el in rasterList) {
      let curEl = rasterList[el];
      for (let el1 in rasterList) {
          if (curEl !== rasterList[el1]) {
          }
      }
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
            raster: getRaster(iconList[el]),
            tween: null,
        });
    }
    //linkList = getLinks(rasters);

    //displayGrid();

    return (rasters);
};

const startTween = (rasterList) => {
    let randomPoints = getRandomPoints(rasterList.length);

    for (let el = 0; el < rasterList.length; el++) {
        rasterList[el].tween = new TWEEN.Tween(rasterList[el].raster.position);
        rasterList[el].tween.to(randomPoints[el] , animationTimer);
        rasterList[el].tween.easing(TWEEN.Easing.Quartic.InOut);
        rasterList[el].tween.start();
    }
    rasterList[0].tween.onComplete(() => {
        loopState = 'ANIMATION_OVER';
    });
};

const drawLinks = (rasterList) => {
};

const updateLink = (path, pointA, pointB) => {

    let tmp = new paper.Path();
    tmp.add(pointA);
    tmp.add(pointB);

    let startPoint = tmp.getPointAt(circleRadius);
    let destPoint = tmp.getPointAt(tmp.length - circleRadius);

    path.removeSegments();
    path.addSegments([startPoint, destPoint]);
    path.opacity = 0.5;
    tmp.remove();
};

export const startJumbo = (canvas) => {
    paper.setup(canvas);

    let rasterList = initScene(canvas);

    loopState = "ANIMATION_READY";
    stopWatch = null;

    //sandbox
    let myPath = new paper.Path();
    myPath.strokeColor = 'white';
    myPath.add(new paper.Point(0, 0));
    myPath.add(new paper.Point(100, 50));

    myPath.strokeWidth = 2;

    let src = new paper.Path.Circle(new paper.Point(100, 70), circleRadius);
    src.strokeColor = 'green';
    src.strokeWidth = 2;

    let dest = new paper.Path.Circle(new paper.Point(600, 400), circleRadius);
    dest.strokeColor = 'green';
    dest.strokeWidth = 2;

    updateLink(myPath, {x:100, y:70}, {x:600, y:400});
    //

    paper.view.onFrame = function(event) {
        //drawLinks(rasterList);
        switch (loopState) {
            case 'ANIMATION_READY':
                loopState = 'ANIMATION_IN_PROGRESS';
                startTween(rasterList);
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
                        //resetCollisions();
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