import { paper } from 'paper';
import { circleRadius } from './varJumbo.js';

let lastCollisions = [];

export const resetCollisions = () => {
    if (lastCollisions.length) {
        for (let i = 0; i < lastCollisions.length; i++) {
            lastCollisions[i].circle.remove();
            lastCollisions[i].text.remove();
        }
        lastCollisions = [];
        return (0);
    }
};
export const displayCollisions = (cnt, x1, y1, x2, y2) => {
    let pointText;
    let text;

    let circle1 = new paper.Path.Circle(new paper.Point(x1, y1), circleRadius);
    circle1.fillColor = 'red';
    pointText = new paper.Point(x1, y1);
    text = new paper.PointText(pointText);
    text.fillColor = 'white';
    text.fontSize = '20px';
    text.content = cnt;
    lastCollisions.push({circle: circle1, text: text});

    let circle2 = new paper.Path.Circle(new paper.Point(x2, y2), circleRadius);
    circle2.fillColor = 'green';
    pointText = new paper.Point(x2, y2);
    text = new paper.PointText(pointText);
    text.fillColor = 'white';
    text.fontSize = '20px';
    text.content = cnt;
    lastCollisions.push({circle: circle2, text: text});
};

export const displayGrid = () => {
    let x = 100, y = 100;
    let P1, P2, line;
    let pointText;
    let text;
    let distX;
    let distY;

    //x grid
    while (x < paper.view.size.width) {
        if (x < 1000)
            distX = 50;
        else
            distX = 60;
        pointText = new paper.Point(x - distX, 20);
        text = new paper.PointText(pointText);
        text.fillColor = 'white';
        text.fontSize = '20px';
        text.content = x;

        P1 = new paper.Point(x,0);
        P2 = new paper.Point(x, paper.view.size.height);
        line = new paper.Path.Line(P1,P2);
        line.strokeColor = 'white';
        line.strokeWidth = 3;
        x += 100;
    }
    //y grid
    while (y < paper.view.size.height) {
        if (y < 1000)
            distY = 15;
        else
            distY = 25;
        pointText = new paper.Point(10, y - distY);
        text = new paper.PointText(pointText);
        text.fillColor = 'white';
        text.fontSize = '20px';
        text.content = y;

        P1 = new paper.Point(0,y);
        P2 = new paper.Point(paper.view.size.width, y);
        line = new paper.Path.Line(P1,P2);
        line.strokeColor = 'white';
        line.strokeWidth = 3;
        y += 100;
    }

};