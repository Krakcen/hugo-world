import { paper } from 'paper';

const borderCollision = (125*0.35) + 25;
const iconList = [
    "bootstrap-logo-jumbo",
    "github-logo-jumbo",
    "heroku-logo-jumbo",
    "meteor-logo-jumbo",
    "react-logo-jumbo",
    "slack-logo-jumbo",
    "trello-logo-jumbo",
];

const getRaster = (id, canvas) => {
    let raster = new paper.Raster(id);
    let maxPoint = new paper.Point(canvas.width - borderCollision, canvas.height - borderCollision);
    let randomPoint = paper.Point.random();
    let finalPoint = maxPoint;
    finalPoint.x = Math.round(finalPoint.x * randomPoint.x);
    finalPoint.y = Math.round(finalPoint.y * randomPoint.y);
    if (finalPoint.x < borderCollision)
        finalPoint.x = borderCollision;
    if (finalPoint.y < borderCollision)
        finalPoint.y = borderCollision;
    raster.position = finalPoint;
    raster.scale(0.35);
    return (raster);
};

const loadRasters = (canvas) => {
    let rasters = [];

    for (let el in iconList) {
        rasters.push({
            name: iconList[el],
            raster: getRaster(iconList[el], canvas),
        });
    }
    return (rasters);
};

export const startJumbo = (canvas) => {
    paper.setup(canvas);

    let rasterList = loadRasters(canvas);
    console.log(rasterList);

    paper.view.onFrame = function(event) {

    };
    paper.view.draw();
};