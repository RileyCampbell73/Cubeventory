//Need place to spawn stuff.


function spawnGenericItem(name, weight) {

    //first make a grouip, everything will be a group.

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
            width: 49,
            height: 49,
            fill: 'lightblue', //need to use colour depending on itemtype
            name: 'fillShape',
            stroke: "black",
            strokeWidth: 1,
            isColliding: false,
            fillColour: 'lightblue'
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
                x: i * 100,
                y: rowCount * 100,
                width: 99,
                height: 99,
                fill: 'lightblue', //need to use colour depending on itemtype
                name: 'fillShape',
                stroke: "black",
                strokeWidth: 1,
                isColliding: false,
                fillColour: 'lightblue'
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
                    x: i * 100,
                    y: rowCount * 100,
                    width: 49,
                    height: 99,
                    fill: 'lightblue', //need to use colour depending on itemtype
                    name: 'fillShape',
                    stroke: "black",
                    strokeWidth: 1,
                    isColliding: false,
                    fillColour: 'lightblue'
                }));
            }
            else if (under1lb < .5 && under1lb != 0) {
                Item.add(new Konva.Rect({
                    x: i * 100,
                    y: rowCount * 100,
                    width: 49,
                    height: 49,
                    fill: 'lightblue', //need to use colour depending on itemtype
                    name: 'fillShape',
                    stroke: "black",
                    strokeWidth: 1,
                    isColliding: false,
                    fillColour: 'lightblue'
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
        width: 99,
        height: 99,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 100,
        y: 0,
        width: 99,
        height: 99,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 200,
        y: 0,
        width: 99,
        height: 99,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 0,
        y: 100,
        width: 99,
        height: 99,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 100,
        y: 100,
        width: 99,
        height: 99,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 100,
        y: 200,
        width: 99,
        height: 99,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 100,
        y: 300,
        width: 99,
        height: 99,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'green',
        name: 'fillShape',
        isColliding: false,
        fillColour: 'green'
    }));
    Maul.add(new Konva.Rect({
        x: 100,
        y: 400,
        width: 99,
        height: 99,
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