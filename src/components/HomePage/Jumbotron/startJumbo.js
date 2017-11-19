import { paper } from 'paper';
import TWEEN from 'tween.js';

//import { displayGrid, displayCollisions, resetCollisions } from './debugJumbo.js';
import { circleRadius, borderCollision, idleTimer, animationTimer, iconList, linkOptions, /*tweenEases*/ } from './varJumbo.js';

let loopState = 'ANIMATION_READY';
let stopWatch = null;
let linksList = [];


const getPointFromRaster = (name, rasterList) => {
    for (let raster = 0; raster < rasterList.length; raster++) {
        if (name === rasterList[raster].name)
            return (rasterList[raster].raster.position);
    }
    return (-1);
};
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
const getLinks = (linkList, rasterList) => {
    let cnt = 0;
    for (let el = 0; el < rasterList.length; el++) {
        for (let el1 = el; el1 < rasterList.length; el1++) {
            if (el !== el1) {
                linkList.push({
                    seg1: rasterList[el].name,
                    seg2: rasterList[el1].name,
                    path: new paper.Path(linkOptions),
                });
                linkList[cnt].path.sendToBack();
                cnt++;
            }
        }
    }
    return (linkList);
};

const initScene = () => {
    let linkList = [];

    let rasters = [];
    for (let el = 0; el < iconList.length; el++) {
        rasters.push({
            name: iconList[el] + "-" + el,
            raster: getRaster(iconList[el]),
            tween: null,
        });
    }
    linkList = getLinks(linkList, rasters);

    ////////////////////////////////////////////
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
    /////////////////////////////////////////////

    //displayGrid();

    return ({links: linkList, rasters: rasters});
};
const startTween = (rasterList) => {
    let randomPoints = getRandomPoints(rasterList.length);

    //let randomEase = tweenEases[Math.floor(Math.random() * tweenEases.length)];

    for (let el = 0; el < rasterList.length; el++) {
        if (!rasterList[el].tween)
            rasterList[el].tween = new TWEEN.Tween(rasterList[el].raster.position);
        rasterList[el].tween.to(randomPoints[el] , animationTimer);
        rasterList[el].tween.easing(TWEEN.Easing.Quintic.InOut);
        rasterList[el].tween.start();
    }
    rasterList[0].tween.onUpdate(() => {
        updateLinks(linksList, rasterList);
    });
    rasterList[0].tween.onComplete(() => {
        loopState = 'ANIMATION_OVER';
    });
};

//needs opacity handler
const updateLink = (path, pointA, pointB) => {
    let tmp = new paper.Path({visible: false});
    tmp.add(pointA);
    tmp.add(pointB);

    let startPoint = tmp.getPointAt(circleRadius);
    let destPoint = tmp.getPointAt(tmp.length - circleRadius);

    path.removeSegments();
    path.addSegments([startPoint, destPoint]);
    if (path.length > 300)
        path.visible = false;
    else {
        path.visible = true;
    }
    path.opacity = (((300 / path.length) - 1) / 2);
    tmp.remove();
    return (path);
};
const updateLinks = (linksList, rasterList) => {
    //updateLink(myPath, {x:100, y:70}, {x:600, y:400});

    for (let link = 0; link < linksList.length; link++) {
        linksList[link].path = updateLink(
            linksList[link].path,
            getPointFromRaster(linksList[link].seg1, rasterList),
            getPointFromRaster(linksList[link].seg2, rasterList)
        );
    }
};

export const startJumbo = (canvas) => {
    paper.setup(canvas);

    //let first
    let initRes = initScene();
    let rasterList = initRes.rasters;
    linksList = initRes.links;

    loopState = "ANIMATION_READY";
    stopWatch = null;

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