
function spawnGenericItem(name, weight, colour) {

    if (colour === undefined)
        colour = 'lightblue'

    //first make a group, everything will be a group.
    var Item = new Konva.Group({
        x: (GRID_SIZE * 15) + GRID_PADDING + 100,//100 is just a lil padding
        y: GRID_PADDING,
        draggable: true
    });

    //group for shape
    var ItemShapes = new Konva.Group({
        x: 0,
        y: 0,
        name: 'itemShapes'
    });

    //group for text
    var ItemText = new Konva.Group({
        x: 0,
        y: 0,
        name: 'itemText'
    });

    Item.add(ItemShapes)
    Item.add(ItemText)

    //if weight isnt specified, or under 1
    if (weight === undefined || weight < 1) {

        if (weight >= .5) {
            ItemShapes.add(new Konva.Rect({
                x: 0,
                y: 0,
                width: 39,
                height: 79,
                fill: colour,
                name: 'fillShape',
                stroke: "black",
                strokeWidth: 1,
                isColliding: false,
                fillColour: colour
            }));
        }
        else {
            ItemShapes.add(new Konva.Rect({
                x: 0,
                y: 0,
                width: 39,
                height: 39,
                fill: colour,
                name: 'fillShape',
                stroke: "black",
                strokeWidth: 1,
                isColliding: false,
                fillColour: colour
            }));
        }
        ItemText.add(new Konva.Text({
            x: 8,
            y: -6,
            rotation: 45,
            text: name,
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: '#000',
            width: 50,
            padding: 5,
            align: 'center'
        }));

        return Item;
    }

    var totalweight = weight;
    var under1lb = (weight % 1).toFixed(3)
    weight = Math.floor(weight)

    var ColumnCount = Math.round(Math.sqrt(weight))
    var rowCount = 0;

    while (true) { // this loop logic could be improved, but at theis point I'm scared to touch this further.

        for (let i = 0; i < ColumnCount; i++) {

            ItemShapes.add(new Konva.Rect({
                x: i * 80,
                y: rowCount * 80,
                width: 79,
                height: 79,
                fill: colour,
                name: 'fillShape',
                stroke: "black",
                strokeWidth: 1,
                isColliding: false,
                fillColour: colour
            }));

            weight--;
            if (weight <= 0) {
                
                //funky logic to determine where extra goes and what orientation it should be
                //want any extra weight to appear in the spot a full cube would
                var newColumnCount = Math.round(Math.sqrt(Math.floor(totalweight) + 1))
                var halfCubeUpright = true;

                i++
                if (i >= newColumnCount){
                    i=0
                    rowCount++;
                    halfCubeUpright = false;
                }
                else if (newColumnCount > ColumnCount)
                    rowCount = 0

                if (under1lb >= .5) {
                    if (halfCubeUpright){
                        ItemShapes.add(new Konva.Rect({
                            x: i * 80,
                            y: rowCount * 80,
                            width: 39,
                            height: 79,
                            fill: colour,
                            name: 'fillShape',
                            stroke: "black",
                            strokeWidth: 1,
                            isColliding: false,
                            fillColour: colour
                        }));
                    }
                    else{
                        ItemShapes.add(new Konva.Rect({
                            x: i * 80,
                            y: rowCount * 80,
                            width: 79,
                            height: 39,
                            fill: colour,
                            name: 'fillShape',
                            stroke: "black",
                            strokeWidth: 1,
                            isColliding: false,
                            fillColour: colour
                        }));
                    }
                }
                else if (under1lb < .5 && under1lb != 0) {
                    ItemShapes.add(new Konva.Rect({
                        x: i * 80,
                        y: rowCount * 80,
                        width: 39,
                        height: 39,
                        fill: colour,
                        name: 'fillShape',
                        stroke: "black",
                        strokeWidth: 1,
                        isColliding: false,
                        fillColour: colour
                    }));
                }
                break;
            }
        }
        if (weight <= 0) {
            break;
        }
        rowCount++;
    }

    ItemText.add(new Konva.Text({
        x: 8,
        y: -6,
        rotation: 45,
        text: name,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 105,
        //padding: 5,
        align: 'center',
        name: 'text'
    }));

    return Item;
}

//some items may have odd shapes and require their own function
function spawnMaul() {


    var Maul = new Konva.Group({
        x: 0,
        y: 0,
        draggable: true
    });

    Maul.add(new Konva.Rect({
        x: 0,
        y: 0,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 80,
        y: 0,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 160,
        y: 0,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 0,
        y: 80,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 80,
        y: 80,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 80,
        y: 160,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 80,
        y: 240,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 80,
        y: 320,
        width: 79,
        height: 79,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));

    Maul.add(new Konva.Text({
        text: 'maul',
        fontSize: 14,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 50,
        padding: 5,
        align: 'center'
    }));

    return Maul;

}