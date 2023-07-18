//Need place to spawn stuff.


function spawnGenericItem(name, weight, colour) {

    if (colour === undefined)
        colour = 'lightblue'

    //first make a group, everything will be a group.
    var Item = new Konva.Group({
        x: 0,
        y: 0,
        draggable: true
    });
    //if weight isnt specified, or 0, spawn a 25 / 25 object
    if (weight === undefined || weight === 0) {
        Item.add(new Konva.Rect({
            x: 0,
            y: 0,
            width: 39,
            height: 39,
            fill: colour, //need to use colour depending on itemtype
            name: 'fillShape',
            stroke: "black",
            strokeWidth: 1,
            isColliding: false,
            fillColour: colour
        }));

        Item.add(new Konva.Text({
            text: name,
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: '#000',
            width: 50,
            padding: 5,
            align: 'center'
        }));
    }

    var under1lb = (weight % 1).toFixed(3)
    weight = Math.floor(weight)

    var rowlength = Math.round(Math.sqrt(weight))
    var rowCount = 0;
    var i = 0;
    while (true) {

        for (i = 0; i < rowlength; i++) {
            Item.add(new Konva.Rect({
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
            if (weight <= 0)
                break;
        }
        if (weight <= 0) {

            //attach anything extra
            if (under1lb >= .5) {
                i++;
                Item.add(new Konva.Rect({
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
            else if (under1lb < .5 && under1lb != 0) {
                Item.add(new Konva.Rect({
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
        rowCount++;
    }
    Item.add(new Konva.Text({
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