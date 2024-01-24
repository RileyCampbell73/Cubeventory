
function SpawnItemfromJSON(json) {
    var item = JSON.parse(json);

    //check if its a pack
    //  Will have to search the json for it. Just call this method again with the found json
    var itemCategory = item.gear_category
    if (itemCategory === undefined)
        itemCategory = item.equipment_category

    if (itemCategory.index == 'equipment-packs')
        return SpawnPackContents(item);

    var colour = determineColour(itemCategory.index);
    var item = determineSpawnMethod(item.index, item.name, colour, item.weight)

    Itemlayer.add(item)
    
}

function determineSpawnMethod(index, name, colour, weight)
{
    
    switch (index) {
        case 'padded-armor':
            return spawnPaddedArmor(index, name, colour)
            break;
        case 'leather-armor':
            return spawnLeatherArmor(index, name, colour)
            break;
        case 'studded-leather-armor':
            return spawnStuddedArmor(index, name, colour)
            break;
        case 'hide-armor':
            return spawnHideArmor(index, name, colour)
            break;
        case 'chain-shirt':
        case 'breastplate':
            return spawnChainShirtArmor(index, name, colour)
            break;
        case 'shield':
            return spawnShield(index, name, colour)
            break;
        case 'mace':
        case 'battleaxe':
            return spawnMace(index, name, colour)
            break;
        case 'quarterstaff':
        case 'spear':
        case 'lance':
        case 'longsword':
        case 'staff':
        case 'pole-10-foot':
            return spawnLineItem(index, name, colour, weight)
            break;
        case 'crossbow-light':
            return spawnLightCrossbow(index, name, colour)
            break;
        case 'glaive':
        case 'halberd':
            return spawnGlaive(index, name, colour)
            break;
        case 'greataxe':
            return spawnGreataxe(index, name, colour)
            break;
        case 'greatsword':
            return spawnGreatsword(index, name, colour)
            break;
        case 'maul':
            return spawnMaul(index, name, colour)
            break;
        case 'pike':
        case 'chain-10-feet':
        case 'climbers-kit':
        case 'greatclub':
            return spawnMultiLineItem(index, name, colour, weight / 2, 2)
            break;
        case 'crossbow-heavy':// too bulky?
            return spawnHeavyCrossbow(index, name, colour)
            break;
        case 'crowbar':
            return spawnCrowbar(index, name, colour)
            break;
        case 'pick-miners':
            return spawnMinersPick(index, name, colour)
            break;
        case 'pot-iron':
            return spawnIronPot(index, name, colour)
            break;
        case 'rope-hempen-50-feet':
            return spawnHempRope(index, name, colour)
            break;

        default:
            return spawnGenericItem(name, weight, colour);
    }
}

function SpawnPackContents(packJson) {

    var packContents = packJson.contents;

    for (let i = 0; i < packContents.length; i++) {
        var item = EquipmentJSON.filter((item) => item.index == packContents[i].item.index)[0];
        for (let x = 0; x < packContents[i].quantity; x++) {
            SpawnItemfromJSON(JSON.stringify(item));
        }

    }
}

function spawnGenericItem(name, weight, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = new Konva.Group({
        // x: (GRID_SIZE * 15) + GRID_PADDING + 100,//100 is just a lil padding
        // y: GRID_PADDING,
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        itemName: name,
        id: ""
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

    //group for lines
    var ItemLines = new Konva.Group({
        x: 0,
        y: 0,
        name: 'itemLines'
    });

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

    //if weight isnt specified, or under 1
    if (weight === undefined || weight < 1) {

        if (weight >= .5) {
            ItemShapes.add(createCube(0, 0, colour, GRID_SIZE / 2));
        }
        else {
            ItemShapes.add(createCube(0, 0, colour, GRID_SIZE / 2, GRID_SIZE / 2));
        }

        ItemText.add(addItemText(name, ItemShapes))

        ItemLines.add(generateOutline(ItemShapes))

        return Item;
    }

    var totalweight = weight;
    var under1lb = (weight % 1).toFixed(3)
    weight = Math.floor(weight)

    var ColumnCount = Math.round(Math.sqrt(weight))
    var rowCount = 0;

    if (ColumnCount > 5){
        ColumnCount = 5

        if (weight / ColumnCount > strength)
            ColumnCount = weight / strength
    }


    while (true) { // this loop logic could be improved, but at this point I'm scared to touch it further.

        for (let i = 0; i < ColumnCount; i++) {

            ItemShapes.add(createCube(
                i * GRID_SIZE,
                rowCount * GRID_SIZE,
                colour
            ));

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
                        ItemShapes.add(createCube(
                            i * GRID_SIZE,
                            rowCount * GRID_SIZE,
                            colour,
                            GRID_SIZE / 2
                        ));
                    }
                    else {
                        ItemShapes.add(createCube(
                            i * GRID_SIZE,
                            rowCount * GRID_SIZE,
                            colour,
                            GRID_SIZE,
                            GRID_SIZE / 2
                        ));
                    }
                }
                else if (under1lb < .5 && under1lb != 0) {
                    ItemShapes.add(createCube(
                        i * GRID_SIZE,
                        rowCount * GRID_SIZE,
                        colour,
                        GRID_SIZE / 2,
                        GRID_SIZE / 2
                    ));
                }
                break;
            }
        }
        if (weight <= 0) {
            break;
        }
        rowCount++;
    }


    ItemText.add(addItemText(name, ItemShapes))

    createInnerDashedLines(ItemShapes, ItemLines)

    ItemLines.add(generateOutline(ItemShapes))

    

    return Item;
}

function randomSpawnLocation() {

    var xMin = GRID_PADDING + 5;
    var xMax = (GRID_SIZE * 15) - 5;

    var yMin = (GRID_SIZE * strength) + GRID_PADDING + 30;
    var yMax = yMin + 120

    return {
        'x': Math.floor(Math.random() * (xMax - xMin + 1) + xMin),
        'y': Math.floor(Math.random() * (yMax - yMin + 1) + yMin)
    }
}

function determineColour(gearCategory) {
    switch (gearCategory) {
        case 'standard-gear':
            return '#FFFF90'
        //return getColourShade('#FFFF90')
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

function getColourShade(hex) {//for getting shades of a hex colour.
    //Was originally to differentiate between items. But have since added a hard border to items

    var rgb = hexToRgb(hex);

    var r = Math.floor(Math.random() * ((rgb.r + 40) - (rgb.r - 40) + 1) + (rgb.r - 40))
    if (r > 255)
        r = 255

    var g = Math.floor(Math.random() * ((rgb.g + 40) - (rgb.g - 40) + 1) + (rgb.g - 40))
    if (g > 255)
        g = 255

    var b = Math.floor(Math.random() * ((rgb.b + 40) - (rgb.b - 40) + 1) + (rgb.b - 40))
    if (b > 255)
        b = 255

    return "rgb(" + r + ", " + g + ", " + b + ")"

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function createCube(x, y, colour, width = GRID_SIZE, height = GRID_SIZE) {

    

    return new Konva.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: colour,
        name: 'fillShape',
        //stroke: "black",
        //strokeWidth: .5,
        //dash: [dashLineMeasurment, dashLineMeasurment],// apply dashed stroke that is Xpx long and Xpx apart
        isColliding: false,
        fillColour: colour
    })
}

function createInnerDashedLines(shapelayer, linesLayer){

    if (shapelayer.children.length === 1) {
        return
    }


    var dashLineMeasurment = Math.sqrt((GRID_SIZE))

    shapelayer.children.forEach(function (cube) {

        linesLayer.add(new Konva.Rect({
            x: cube.x(),
            y: cube.y(),
            width: cube.width(),
            height: cube.height(),
            name: 'DashShape',
            stroke: "black",
            strokeWidth: .5,
            dash: [dashLineMeasurment, dashLineMeasurment],// apply dashed stroke that is Xpx long and Xpx apart
        }))

    });




}

function generateOutline(shapelayer) { // this out outta hand fast
    //this is assuming we are using generic shape spawner

    var maxX = 0;

    // record 0,0
    var outlinePoints = [];
    outlinePoints.push(0)
    outlinePoints.push(0)

    if (shapelayer.children.length === 1) {
        var cube = shapelayer.children[0]

        outlinePoints.push((cube.x() + (cube.getWidth())))
        outlinePoints.push(cube.y())

        outlinePoints.push((0 + (cube.getWidth())))
        outlinePoints.push((0 + (cube.getHeight())))

        outlinePoints.push(0)
        outlinePoints.push((0 + (cube.getHeight())))


        outlinePoints.push(0)
        outlinePoints.push(0)
    }
    else {

        //loop through cubes
        //buffer of .5 on the left and top side,
        //buffer of 1.5 on the right and bottom side 
        //they add up to the stroke width for the line - which is 2
        shapelayer.children.forEach(function (cube, index) {
            if (index + 1 !== shapelayer.children.length) {

                //  always be looking at next cube
                var nextCube = shapelayer.children[index + 1]

                //  if next Y != current y (we are at end of line)
                if (cube.y() !== nextCube.y()) {
                    //record x + GRID_SIZE and y
                    outlinePoints.push((cube.x() + GRID_SIZE))
                    outlinePoints.push(cube.y())

                    if (maxX < cube.x() + GRID_SIZE)
                        maxX = cube.x() + GRID_SIZE
                }

            }
            else {
                //last cube
                var prevCube = shapelayer.children[index - 1]

                outlinePoints.push(maxX)
                outlinePoints.push(cube.y())

                if ((cube.x() + GRID_SIZE) > maxX && cube.y() !== prevCube.y()) { // smaller shape on new column
                    //cut off beginning of array, add in the needed coords, put all that back onto array and finish

                    //pop out the first two coords, thats always 0,0 and top right
                    var newOutlinePoints = [];
                    newOutlinePoints.push(outlinePoints.shift())
                    newOutlinePoints.push(outlinePoints.shift())

                    newOutlinePoints.push(outlinePoints.shift())
                    newOutlinePoints.push(outlinePoints.shift())

                    newOutlinePoints.push((cube.x() + (cube.getWidth())))
                    newOutlinePoints.push(cube.y())

                    newOutlinePoints.push((cube.x() + (cube.getWidth())))
                    newOutlinePoints.push((cube.y() + (cube.getHeight())))

                    if ((cube.getWidth()) < GRID_SIZE) {
                        newOutlinePoints.push((cube.x()))
                        newOutlinePoints.push((cube.y() + (cube.getHeight())))
                    }

                    newOutlinePoints.concat(outlinePoints);

                    outlinePoints = newOutlinePoints;

                    //use prev cube to fill in the rest
                    outlinePoints.push((prevCube.x() + (prevCube.getWidth())))
                    outlinePoints.push((prevCube.y() + (prevCube.getHeight())))

                    outlinePoints.push(0)
                    outlinePoints.push((prevCube.y() + (prevCube.getHeight())))

                }
                else if (cube.x() === 0){//first on new row
                    outlinePoints.push((cube.x() + (cube.getWidth())))
                    outlinePoints.push(cube.y())

                    outlinePoints.push((cube.x() + (cube.getWidth())))
                    outlinePoints.push((cube.y() + (cube.getHeight())))

                    outlinePoints.push(cube.x() + .5)
                    outlinePoints.push((cube.y() + (cube.getHeight())))
                }
                else if (cube.x() !== prevCube.x()) { //incomplete row
                    outlinePoints.push((cube.x() + (cube.getWidth())))
                    outlinePoints.push(cube.y())


                    outlinePoints.push((cube.x() + (cube.getWidth())))
                    outlinePoints.push((cube.y() + (cube.getHeight())))

                    outlinePoints.push((cube.x() + (cube.getWidth())))
                    outlinePoints.push((cube.y() + (cube.getHeight())))

                    //if width < GRIDSIZE
                    if ((cube.getWidth()) < GRID_SIZE ) {
                        //need another two points
                        outlinePoints.push((cube.x()))
                        outlinePoints.push((cube.y() + (cube.getHeight())))

                        outlinePoints.push((cube.x()))
                        outlinePoints.push((cube.y() + GRID_SIZE))
                    }
                }

                if (cube.x() > 0) {
                    outlinePoints.push(0)
                    outlinePoints.push((cube.y() + (prevCube.getHeight())))
                }
                else {
                    // outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    // outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)

                    outlinePoints.push(0)
                    outlinePoints.push((cube.y() + (cube.getHeight())))
                }

                outlinePoints.push(0)
                outlinePoints.push(0)
            }

        })
    }

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });

    return line;
}

function addItemText(name, itemShapes){

    var avaliableWidth;
    var textX = 0;
    var textY = 0;
    var fontsize = GRID_SIZE / 3.75;

    if (itemShapes.children.length > 1){
    
        const count = {};
        //THESE LOOPS SHOULD / COULD BE ONE LOOP
        for (const element of itemShapes.children) { // will count line if its done first. Can filter children
            if (count[element.getY()]) {
                count[element.getY()] += 1;
            } else {
                count[element.getY()] = 1;
            }
        }

        var longestHorizontal;
        var cubeCount = 0;
        for (const property in count) {

            if (longestHorizontal === undefined)
                longestHorizontal = property

            if (count[property]  > cubeCount){
                longestHorizontal = property
                cubeCount = count[property]
            }
        }


        avaliableWidth = cubeCount * GRID_SIZE
        textY = longestHorizontal;

    }
    else{
        //check if small cube
        avaliableWidth = itemShapes.children[0].width()

        if (avaliableWidth < GRID_SIZE - 1){// if extra small cube
            fontsize = (fontsize / 2)
        }
        
        var context = $('.konvajs-content')[0].children[0].getContext("2d")
        //use context.font = "italic 19pt Calibri";
        context.font = fontsize + "px Calibri"
        var textwidth = context.measureText(name); 

        //get Square diagonal width
        var diagonalLength = (Math.sqrt(2) * avaliableWidth) - 5 // 5 is for a lil padding

        if (textwidth.width < diagonalLength){
            return new Konva.Text({
                x: textX + fontsize / 1.2,
                y: textY + fontsize / 3.5,
                rotation: 45,
                text: name,
                fontSize: fontsize,
                fontFamily: 'Calibri',
                fill: '#000',
                width: textwidth.width,
                align: 'center',
                verticalAlign: 'middle',
                name: 'text'
            });
        }
        else{
            return new Konva.Text({
                x: textX,
                y: textY,
                text: name,
                fontSize: fontsize,
                fontFamily: 'Calibri',
                fill: '#000',
                width: avaliableWidth,
                height: avaliableWidth,
                align: 'center',
                verticalAlign: 'middle',
                name: 'text'
            });
        }
        
    }

    return new Konva.Text({
        x: textX,
        y: textY,
        text: name,
        fontSize: fontsize,
        fontFamily: 'Calibri',
        fill: '#000',
        width: avaliableWidth,
        height: GRID_SIZE,
        align: 'center',
        verticalAlign: 'middle',
        name: 'text'
    });

}
