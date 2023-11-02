function createGridLayer(strength, useEncumbrance) {

  var strengthCount = strength;

  gridLayer = new Konva.Layer({
    id: 'gridLayer'
  });

  //Text around the grid
  gridLayer.add(new Konva.Text({
    x: 0,
    y: (GRID_SIZE * (strength / 2)) + 10 + 200, //numbers to get it to fit better
    rotation: -90,
    text: 'STRENGTH',
    fontSize: 40,
    fontFamily: 'Calibri',
    fontStyle: 'bold',
    fill: '#000',
    width: 200,
    align: 'center'
  }));

  if (useEncumbrance) {

    gridLayer.add(new Konva.Text({
      x: GRID_PADDING,
      y: 0, //(GRID_SIZE * (strength / 2)) + 20 + 200, //numbers to get it to fit better
      //rotation: -90,
      text: 'NOT ENCUMBERED!',
      fontSize: GRID_SIZE / 2,
      fontFamily: 'Calibri',
      fontStyle: 'bold',
      fill: '#000',
      width: GRID_SIZE * 5,
      align: 'center'
    }));

    gridLayer.add(new Konva.Text({
      x: GRID_SIZE * 5 + GRID_PADDING,
      y: 0,
      text: 'ENCUMBERED',
      fontSize: GRID_SIZE / 2,
      fontFamily: 'Calibri',
      fontStyle: 'bold',
      fill: '#000',
      width: GRID_SIZE * 5,
      //padding: 5,
      align: 'center',
    }));

    gridLayer.add(new Konva.Text({
      x: GRID_SIZE * 5 + GRID_PADDING,
      y: 32,
      text: '(-10 speed)',
      fontSize: GRID_SIZE / 4,
      fontFamily: 'Calibri',
      //fontStyle: 'bold',
      fill: '#000',
      width: GRID_SIZE * 5,
      //padding: 5,
      align: 'center',
    }));

    gridLayer.add(new Konva.Text({
      x: GRID_SIZE * 10 + GRID_PADDING,
      y: 0,
      text: 'HEAVILY ENCUMBERED',
      fontSize: GRID_SIZE / 2.5,
      fontFamily: 'Calibri',
      fontStyle: 'bold',
      fill: '#000',
      width: GRID_SIZE * 5,
      //padding: 5,
      align: 'center',
    }));

    gridLayer.add(new Konva.Text({
      x: GRID_SIZE * 10 + GRID_PADDING,
      y: 32,
      text: '(-20 speed)\nDisadvantage on:\n Ability checks, Attack rolls, Str, Dex, & Con saves',
      fontSize: GRID_SIZE / 5,
      fontFamily: 'Calibri',
      //fontStyle: 'bold',
      fill: '#000',
      width: GRID_SIZE * 5,
      //padding: 5,
      align: 'center',
    }));
  }

  //numbers for grid
  for (let y = 0; y < strength; y++) {
    gridLayer.add(new Konva.Text({
      x: 50,
      y: (y * GRID_SIZE) + GRID_PADDING + 55,//the 55 is to better center them. so its 40 + length of textbox I guess.
      rotation: -90,
      text: strengthCount--,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: '#000',
      width: 50,
      //padding: 5,
      align: 'center'
    }));
  }

  //grid
  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < strength; y++) {
      var gridColour = ''
      if (useEncumbrance) {
        if (x < 5)
          gridColour = '#B9FF9F'//green
        else if (x >= 5 && x < 10)
          gridColour = '#EBB60A'//yellowy orange
        else if (x >= 10)
          gridColour = '#B70000'//red
      }
      else
        gridColour = '#B9FF9F'//green

      var rect = new Konva.Rect({
        x: (x * GRID_SIZE) + GRID_PADDING,
        y: (y * GRID_SIZE) + GRID_PADDING,
        width: GRID_SIZE,
        height: GRID_SIZE,
        fill: gridColour,
        stroke: 'grey',
        strokeWidth: 2,
      });
      gridLayer.add(rect)
    }
  }

  //spawning area
  gridLayer.add(new Konva.Rect({
    x: (GRID_SIZE * 15) + GRID_PADDING + 20,
    y: GRID_PADDING,
    width: 480,
    height: GRID_SIZE * strength,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
    cornerRadius: 10,
  }));

  // //example square
  // gridLayer.add(new Konva.Rect({
  //   x: (STAGE_WIDTH - GRID_SIZE * 2) - 5, //(GRID_SIZE * 15) + GRID_PADDING + 20,
  //   y: GRID_PADDING / 2 - GRID_SIZE / 2,
  //   width: GRID_SIZE,
  //   height: GRID_SIZE,
  //   //fill: 'white',
  //   stroke: 'black',
  //   strokeWidth: 2,
  //   //cornerRadius: 10,
  // }));

  // gridLayer.add(new Konva.Text({
  //   x: STAGE_WIDTH - GRID_SIZE,//(GRID_SIZE * 15) + GRID_PADDING + 20 + GRID_SIZE + 5,
  //   y: GRID_PADDING / 2 - GRID_SIZE / 6,
  //   text: "= 1 lb.",
  //   fontSize: GRID_SIZE / 3,
  //   fontFamily: 'Calibri',
  //   fill: '#000',
  //   //width: 100,
  //   height: GRID_SIZE / 3,
  //   align: 'left',
  //   verticalAlign: 'left',

  // }));
  

  return gridLayer;
}

function FlipItem(currentShape){
  var scaleX = currentShape.find('.itemShapes')[0].scaleX()
  var shapes = currentShape.find('.itemShapes')[0];
  var lines = currentShape.find('.itemLines')[0];
  var text = currentShape.find('.itemText')[0];
  

  if (scaleX > 0) {
    var offsetvalue = shapes.getClientRect().width;
    if (shapes.parent.getRotation() == 90 || shapes.parent.getRotation() == 270)
      offsetvalue = shapes.getClientRect().height

    shapes.offsetX(offsetvalue)
    lines.offsetX(offsetvalue)

    shapes.scaleX(-Math.abs(shapes.scaleX()))
    lines.scaleX(-Math.abs(lines.scaleX()))
    text.scaleX(Math.abs(text.scaleX()))
  }
  else {
    shapes.offsetX(0) //fix offset
    lines.offsetX(0) 

    shapes.scaleX(Math.abs(shapes.scaleX()))
    lines.scaleX(Math.abs(lines.scaleX()))
    text.scaleX(Math.abs(text.scaleX()))
  }
}

function InitializeMenu() {

  var rotateButton = document.getElementById('rotate-button')
  var flipButton = document.getElementById('flip-button')
  var duplicateButton = document.getElementById('duplicate-button')
  var deleteButton = document.getElementById('delete-button')

  //remove old listeners
  rotateButton.replaceWith(rotateButton.cloneNode(true));
  flipButton.replaceWith(flipButton.cloneNode(true));
  duplicateButton.replaceWith(duplicateButton.cloneNode(true));
  deleteButton.replaceWith(deleteButton.cloneNode(true));

  // setup menu
  let currentShape;
  var menuNode = document.getElementById('menu');
  document.getElementById('rotate-button').addEventListener('click', () => {

    var itemGroup = currentShape.parent.parent;
    itemGroup.rotate(90);


    // itemGroup.find('.itemText')[0].rotate(-90);
    // itemGroup.find('.itemText')[0].setAttr('y', itemGroup.find('.itemText')[0].getAttr('y') + 80)
  });

  document.getElementById('flip-button').addEventListener('click', () => {
    FlipItem(currentShape.parent.parent)
  });

  document.getElementById('duplicate-button').addEventListener('click', () => {
    var randItemSpawn = randomSpawnLocation()
    var clone = currentShape.parent.parent.clone({
      x: randItemSpawn.x,
      y: randItemSpawn.y,
    });
    Itemlayer.add(clone);
  });
  
  document.getElementById('delete-button').addEventListener('click', () => {
    currentShape.parent.parent.destroy();
  });

  window.addEventListener('click', () => {
    // hide menu
    menuNode.style.display = 'none';
  });

  stage.on('contextmenu', function (e) {
    // prevent default behavior
    e.evt.preventDefault();
    if (e.target === stage) {
      // if we are on empty place of the stage we will do nothing
      return;
    }
    currentShape = e.target;

    if (currentShape.getLayer().getAttr('id') === 'gridLayer')//so they can't manipulate the grid.
      return;

    if (currentShape.parent.getAttr('name') == 'itemText') {
      currentShape = currentShape.parent.parent.find('.itemShapes')[0].children[0];
    }

    // show menu
    menuNode.style.display = 'initial';
    var containerRect = stage.container().getBoundingClientRect();

    menuNode.style.top = stage.getPointerPosition().y + 4 + 'px';
    menuNode.style.left = stage.getPointerPosition().x + 4 + 'px';
  });

}

function InitializeCollisionSnapping() {

  //guidelines demo
  // were can we snap our objects?
  function getLineGuideStops(skipShape) {
    // we can snap to stage borders and the center of the stage
    //var vertical = [0, stage.width()];
    //var horizontal = [0, stage.height()];

    var vertical = [];
    var horizontal = [];

    //find top left corner of underlying grid
    //  subtract grid padding / remove it from addition

    //this is close? I need to debugg on mobile or figure out how to do two touch on desktop
    //var offsetX = stage.children[0].children[16].x() - GRID_PADDING
    //var offsetY = stage.children[0].children[16].y() - GRID_PADDING

    var offsetX = stage.x() * stage.scaleX()
    var offsetY = stage.y()* stage.scaleY()

    //scale is fuckin me up


    for (let i = 0; i < strength * 2; i++) {
      vertical.push((i * (GRID_SIZE / 2)) + GRID_PADDING + offsetX); 
      horizontal.push((i * (GRID_SIZE / 2)) + GRID_PADDING + offsetY);
    }
    return {
      vertical: vertical.flat(),
      horizontal: horizontal.flat(),
    };
  }

  // what points of the object will trigger to snapping?
  // it can be just center of the object
  // but we will enable all edges and center
  function getObjectSnappingEdges(node) {
    var box = node.find('.itemShapes')[0].getClientRect();
    var absPos = node.absolutePosition();

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: 'start',
        },
        // {
        //   guide: Math.round(box.x + box.width / 2),
        //   offset: Math.round(absPos.x - box.x - box.width / 2),
        //   snap: 'center',
        // },
        // {
        //   guide: Math.round(box.x + box.width),
        //   offset: Math.round(absPos.x - box.x - box.width),
        //   snap: 'end',
        // },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: 'start',
        },
        // {
        //   guide: Math.round(box.y + box.height / 2),
        //   offset: Math.round(absPos.y - box.y - box.height / 2),
        //   snap: 'center',
        // },
        // {
        //   guide: Math.round(box.y + box.height),
        //   offset: Math.round(absPos.y - box.y - box.height),
        //   snap: 'end',
        // },
      ],
    };
  }

  // find all snapping possibilities
  function getGuides(lineGuideStops, itemBounds) {
    var resultV = [];
    var resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound) => {
        var diff = Math.abs(lineGuide - itemBound.guide);
        // if the distance between guild line and object snap point is close we can consider this for snapping
        if (diff < GUIDELINE_OFFSET) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        var diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    var guides = [];

    // find closest snap
    var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: 'V',
        snap: minV.snap,
      });
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: 'H',
        snap: minH.snap,
      });
    }
    return guides;
  }

  function drawGuides(guides) {
    guides.forEach((lg) => {
      if (lg.orientation === 'H') {
        var line = new Konva.Line({
          points: [-6000, 0, 6000, 0],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 1,
          name: 'guid-line',
          dash: [4, 6],
        });
        Itemlayer.add(line);
        line.absolutePosition({
          x: 0,
          y: lg.lineGuide,
        });
      } else if (lg.orientation === 'V') {
        var line = new Konva.Line({
          points: [0, -6000, 0, 6000],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 1,
          name: 'guid-line',
          dash: [4, 6],
        });
        Itemlayer.add(line);
        line.absolutePosition({
          x: lg.lineGuide,
          y: 0,
        });
      }
    });
  }

  Itemlayer.on('dragmove', function (e) {
    // clear all previous lines on the screen
    Itemlayer.find('.guid-line').forEach((l) => l.destroy());

    e.target.moveToTop();

    // find possible snapping lines
    var lineGuideStops = getLineGuideStops(e.target);
    // find snapping points of current object
    var itemBounds = getObjectSnappingEdges(e.target);

    // now find where can we snap current object
    var guides = getGuides(lineGuideStops, itemBounds);

    // do nothing of no snapping
    if (!guides.length) {
      return;
    }

    //drawGuides(guides); //Lines cause error from collision logic. Can label lines to not be checked for collision OR just not have them

    var absPos = e.target.absolutePosition();
    // now force object position
    guides.forEach((lg) => {
      switch (lg.snap) {
        case 'start': {
          switch (lg.orientation) {
            case 'V': {
              absPos.x = lg.lineGuide + lg.offset;
              break;
            }
            case 'H': {
              absPos.y = lg.lineGuide + lg.offset;
              break;
            }
          }
          break;
        }
        // case 'center': {
        //   switch (lg.orientation) {
        //     case 'V': {
        //       absPos.x = lg.lineGuide + lg.offset;
        //       break;
        //     }
        //     case 'H': {
        //       absPos.y = lg.lineGuide + lg.offset;
        //       break;
        //     }
        //   }
        //   break;
        // }
        // case 'end': {
        //   switch (lg.orientation) {
        //     case 'V': {
        //       absPos.x = lg.lineGuide + lg.offset;
        //       break;
        //     }
        //     case 'H': {
        //       absPos.y = lg.lineGuide + lg.offset;
        //       break;
        //     }
        //   }
        //   break;
        // }
      }
    });
    e.target.absolutePosition(absPos);
  });

  Itemlayer.on('dragend', function (e) {
    // clear all previous lines on the screen
    Itemlayer.find('.guid-line').forEach((l) => l.destroy());
  });

  //collision logic
  Itemlayer.on('dragmove', function (e) {
    var target = e.target;

    Itemlayer.children.forEach(function (shape) {
      shape.find('Rect').forEach(function (square) {
        square.setAttr('isColliding', false)
      })
    })

    //loop through target (shape being dragged) boxes
    target.children[0].find('Rect').forEach(function (square) {
      //square.setAttr('isColliding', false)
      //loop through each other shapes
      Itemlayer.children.forEach(function (group) {
        // do not check intersection with itself
        if (group === target) {
          return;
        }

        //loop through each of that shapes boxes
        group.children[0].find('Rect').forEach(function (rect) {
          //rect.setAttr('isColliding', false)
          if (haveIntersection(rect.getClientRect(), square.getClientRect())) {
            rect.fill('red')
            rect.setAttr('isColliding', true)
            square.fill('red')
            square.setAttr('isColliding', true)
          } else {
            if (!rect.getAttr('isColliding'))
              rect.fill(rect.getAttr('fillColour'))
            if (!square.getAttr('isColliding'))
              square.fill(square.getAttr('fillColour'))
          }
        })
      })
    })
  });

  function haveIntersection(r1, r2) {
    return !(
      r2.x > (r1.x + r1.width) - 1 ||
      (r2.x + r2.width) - 1 < r1.x ||
      r2.y > (r1.y + r1.height) - 1 ||
      (r2.y + r2.height) - 1 < r1.y
    );
  }

}

