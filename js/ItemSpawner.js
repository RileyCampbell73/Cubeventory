
function SpawnItemfromJSON(json) {
    var item = JSON.parse(json);

    //check if its a pack
    //  Will have to search the json for it. Just call this method again with the fouind json

    var itemCategory = item.gear_category
    if (itemCategory === undefined)
        itemCategory = item.equipment_category

    var colour = determineColour(itemCategory.index);
    switch (item.index) {
        case 'maul':
            layer.add(spawnMaul());
            break;
        default:
            layer.add(spawnGenericItem(item.name, item.weight, colour));
    }
}


function spawnGenericItem(name, weight, colour) {

    if (colour === undefined)
        colour = 'lightblue'

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = new Konva.Group({
        // x: (GRID_SIZE * 15) + GRID_PADDING + 100,//100 is just a lil padding
        // y: GRID_PADDING,
        x: randItemSpawn.x,
        y: randItemSpawn.y,
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
                if (i >= newColumnCount) {
                    i = 0
                    rowCount++;
                    halfCubeUpright = false;
                }
                else if (newColumnCount > ColumnCount)
                    rowCount = 0

                if (under1lb >= .5) {
                    if (halfCubeUpright) {
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
                    else {
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

function randomSpawnLocation() {

    var xMin = (GRID_SIZE * 15) + GRID_PADDING + 30;
    var xMax = width - ((GRID_SIZE * 3) - 5);

    var yMin = GRID_PADDING + 5;
    var yMax = (GRID_SIZE * (strength - 2)) - 5;

    return {
        'x': Math.floor(Math.random() * (xMax - xMin + 1) + xMin),
        'y': Math.floor(Math.random() * (yMax - yMin + 1) + yMin)
    }
}

function determineColour(gearCategory) {
    switch (gearCategory) {
        case 'standard-gear':
            return '#FFFF90'
        case 'adventuring-gear':
            return '#FFD268'
        case 'arcane-foci':
            return '#ABF5FF'
        case 'medium-armor':
        case 'heavy-armor':
        case 'light-armor':
        case 'shields':
        case 'armor':
            return '#989898'
        case 'artisans-tools':
        case 'tools':
            return '#6D7F81'
        case 'druidic-foci':
            return '#00C642'
        case 'gaming-sets':
            return '#7D4DFF'
        case 'holy-symbols':
            return '#ECF751'
        case 'kits':
            return '#EAA2FC'
        case 'martial-ranged-weapons':
        case 'martial-weapons':
        case 'martial-melee-weapons':
        case 'melee-weapons':
        case 'ranged-weapons':
        case 'simple-melee-weapons':
        case 'simple-ranged-weapons':
        case 'simple-weapons':
        case 'weapon':
            return '#C1C1C1'
        case 'musical-instruments':
            return '#A34AD0'
        case 'potion':
            return '#FF8383'
        case 'ring':
        case 'rod':
            return '#C6C6C6'
        case 'scroll':
            return '#EBD5B3'
        case 'staff':
            return '##BA8C63'
        case 'wand':
            return '#956E50'
        case 'wondrous-items':
            return '#6EA8FF'
        case 'other-tools':
        default:
            return 'lightblue'
    }
}

function createCube(x, y, colour) { // need this?
    return new Konva.Rect({
        x: x,
        y: y,
        width: 79,
        height: 79,
        fill: colour,
        name: 'fillShape',
        stroke: "black",
        strokeWidth: 1,
        isColliding: false,
        fillColour: colour
    })
}

//some items may have odd shapes and require their own function
function spawnMaul() {

    var randItemSpawn = randomSpawnLocation();

    var Maul = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
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