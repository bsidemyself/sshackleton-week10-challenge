const inquirer = require("inquirer");
const fs = require('fs');
const {Square, Circle, Triangle} = require("./lib/shapes");

class SVG {
    constructor() {
        this.textElement = ''
        this.shapeElement = ''
    }
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="55" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render()
    }
}

const questions = [
    {
        type: "input",
        name: "text",
        message: "LOGO TEXT: Enter up to three characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color key word or a hexidecimal color:",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Enter a color key word or a hexidecimal color:",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "LOGO SHAPE: Choose which logo shape you would like:",
        choices: ["Cirlce", "Square", "Triangle"],
    },
];

function writetoFile(fileName, data) {
    console.log("Writing [" + data +"] to file [" + fileName + "]")
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("You have generated a logo.svg!");
        }

    });
}

async function init() {
    var svgString = "";
    var svgFile = "logo.svg";

    const answers = await inquirer.prompt(questions);
        var userText = "";
        if (answers.text.length > 0 && answers.text.length < 4) {
            userText = answers.text;
        } else {
            console.log("Please enter up to three characters only");
        return;
        }

        userFontColor = answers["text-color"];
        userShapeColor = answers.shape;
        userShapeType = answers["pixel-image"];

        let userShape;
        if (userShapeType === "Square" || userShapeType === "square") {
            userShape = new Square();
        } else if (userShapeType === "Circle" || userShapeType === "circle") {
            userShape = new Circle();
        } else (userShapeType === "Triangle" || userShapeType === "triangle") 
            userShape = new Triangle();
        
        userShape.setColor(userShapeColor);

        var svg = new SVG();
        svg.setShapeElement(userShape);
        svg.setTextElement(userText, userFontColor);
        svgString = svg.render();

        writetoFile(svgFile, svgString);
}
init()