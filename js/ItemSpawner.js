
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
    switch (item.index) {
        case 'padded-armor':
            Itemlayer.add(spawnPaddedArmor(item.name, colour))
            break;
        case 'leather-armor':
            Itemlayer.add(spawnLeatherArmor(item.name, colour))
            break;
        case 'studded-leather-armor':
            Itemlayer.add(spawnStuddedArmor(item.name, colour))
            break;
        case 'hide-armor':
            Itemlayer.add(spawnHideArmor(item.name, colour))
            break;
        case 'chain-shirt':
        case 'breastplate':
            Itemlayer.add(spawnChainShirtArmor(item.name, colour))
            break;
        case 'shield':
            Itemlayer.add(spawnShield(item.name, colour))
            break;
        case 'greatclub':
            Itemlayer.add(spawnGreatClub(item.name, colour))
            break;
        case 'mace':
        case 'battleaxe':
            Itemlayer.add(spawnMace(item.name, colour))
            break;
        case 'quarterstaff':
        case 'spear':
        case 'lance':
        case 'longsword':
        case 'staff':
        case 'pole-10-foot':
            Itemlayer.add(spawnLineItem(item.name, colour, item.weight))
            break;
        case 'crossbow-light':
            Itemlayer.add(spawnLightCrossbow(item.name, colour))
            break;
        case 'glaive':
        case 'halberd':
            Itemlayer.add(spawnGlaive(item.name, colour))
            break;
        case 'greataxe':
            Itemlayer.add(spawnGreataxe(item.name, colour))
            break;
        case 'greatsword':
            Itemlayer.add(spawnGreatsword(item.name, colour))
            break;
        case 'maul':
            Itemlayer.add(spawnMaul(item.name, colour));
            break;
        case 'pike':
        case 'chain-10-feet':
        case 'climbers-kit':
            Itemlayer.add(spawnMultiLineItem(item.name, colour, 2, item.weight / 2))
            break;
        case 'crossbow-heavy':// too bulky?
            Itemlayer.add(spawnHeavyCrossbow(item.name, colour))
            break;
        case 'crowbar':
            Itemlayer.add(spawnCrowbar(item.name, colour))
            break;
        case 'pick-miners':
            Itemlayer.add(spawnMinersPick(item.name, colour))
            break;
        case 'pot-iron':
            Itemlayer.add(spawnIronPot(item.name, colour))
            break;
        case 'rope-hempen-50-feet':
            Itemlayer.add(spawnHempRope(item.name, colour))
            break;


        default:
            Itemlayer.add(spawnGenericItem(item.name, item.weight, colour));
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
            ItemShapes.add(createCube(0, 0, colour, GRID_SIZE / 2 - 1));
        }
        else {
            ItemShapes.add(createCube(0, 0, colour, GRID_SIZE / 2 - 1, GRID_SIZE / 2 - 1));
        }

        ItemShapes.add(generateOutline(ItemShapes))

        ItemText.add(new Konva.Text({
            x: 2,
            y: -4,
            rotation: 45,
            text: name,
            fontSize: 10,
            fontFamily: 'Calibri',
            fill: '#000',
            width: 40,
            align: 'center'
        }));

        return Item;
    }

    var totalweight = weight;
    var under1lb = (weight % 1).toFixed(3)
    weight = Math.floor(weight)

    var ColumnCount = Math.round(Math.sqrt(weight))
    var rowCount = 0;

    if (ColumnCount > 5)
        ColumnCount = 5

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
                            GRID_SIZE / 2 - 1
                        ));
                    }
                    else {
                        ItemShapes.add(createCube(
                            i * GRID_SIZE,
                            rowCount * GRID_SIZE,
                            colour,
                            GRID_SIZE - 1,
                            GRID_SIZE / 2 - 1
                        ));
                    }
                }
                else if (under1lb < .5 && under1lb != 0) {
                    ItemShapes.add(createCube(
                        i * GRID_SIZE,
                        rowCount * GRID_SIZE,
                        colour,
                        GRID_SIZE / 2 - 1,
                        GRID_SIZE / 2 - 1
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

    ItemShapes.add(generateOutline(ItemShapes))

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
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

function createCube(x, y, colour, width = GRID_SIZE - 1, height = GRID_SIZE - 1) {
    return new Konva.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: colour,
        name: 'fillShape',
        stroke: "black",
        strokeWidth: .5,
        dash: [10, 10],// apply dashed stroke that is 10px long and 10px apart
        isColliding: false,
        fillColour: colour
    })
}

function generateOutline(shapelayer) { // this out outta hand fast
    //this is assuming we are using generic shape spawner

    var maxX = 0;

    // record 0,0
    var outlinePoints = [];
    outlinePoints.push(0 + .5)
    outlinePoints.push(0 + .5)

    if (shapelayer.children.length === 1) {
        var cube = shapelayer.children[0]

        outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
        outlinePoints.push(cube.y() + .5)

        outlinePoints.push((0 + (cube.getWidth() + 1)) - 1.5)
        outlinePoints.push((0 + (cube.getHeight() + 1)) - 1.5)

        outlinePoints.push(0 + .5)
        outlinePoints.push((0 + (cube.getHeight() + 1)) - 1.5)


        outlinePoints.push(0 + .5)
        outlinePoints.push(0 + .5)
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
                    outlinePoints.push((cube.x() + GRID_SIZE) - 1.5)
                    outlinePoints.push(cube.y() + .5)

                    if (maxX < cube.x() + GRID_SIZE)
                        maxX = cube.x() + GRID_SIZE
                }

            }
            else {
                //last cube
                var prevCube = shapelayer.children[index - 1]

                outlinePoints.push(maxX - 1.5)
                outlinePoints.push(cube.y() - 1.5)

                if ((cube.x() + GRID_SIZE) > maxX && cube.y() !== prevCube.y()) { // smaller shape on new column
                    //cut off beginning of array, add in the needed coords, put all that back onto array and finish

                    //pop out the first two coords, thats always 0,0 and top right
                    var newOutlinePoints = [];
                    newOutlinePoints.push(outlinePoints.shift())
                    newOutlinePoints.push(outlinePoints.shift())

                    newOutlinePoints.push(outlinePoints.shift())
                    newOutlinePoints.push(outlinePoints.shift())

                    newOutlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    newOutlinePoints.push(cube.y() + .5)

                    newOutlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    newOutlinePoints.push((cube.y() + (cube.getHeight() + 1)) + .5)

                    if ((cube.getWidth() + 1) < GRID_SIZE) {
                        newOutlinePoints.push((cube.x()) - 1.5)
                        newOutlinePoints.push((cube.y() + (cube.getHeight() + 1)) + .5)
                    }

                    newOutlinePoints.concat(outlinePoints);

                    outlinePoints = newOutlinePoints;

                    //use prev cube to fill in the rest
                    outlinePoints.push((prevCube.x() + (prevCube.getWidth() + 1)) - 1.5)
                    outlinePoints.push((prevCube.y() + (prevCube.getHeight() + 1)) - 1.5)

                    outlinePoints.push(0 + .5)
                    outlinePoints.push((prevCube.y() + (prevCube.getHeight() + 1)) - 1.5)

                }
                else if (cube.x() === 0){//first on new row
                    outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    outlinePoints.push(cube.y() - 1.5)

                    outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)

                    outlinePoints.push(cube.x() + .5)
                    outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)
                }
                else if (cube.x() !== prevCube.x()) { //incomplete row
                    outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    outlinePoints.push(cube.y() - 1.5)


                    outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)

                    outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)

                    //if width < GRIDSIZE
                    if ((cube.getWidth() + 1) < GRID_SIZE ) {
                        //need another two points
                        outlinePoints.push((cube.x()) - 1.5)
                        outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)

                        outlinePoints.push((cube.x()) - 1.5)
                        outlinePoints.push((cube.y() + GRID_SIZE) - 1.5)
                    }
                }

                if (cube.x() > 0) {
                    outlinePoints.push(0 + .5)
                    outlinePoints.push((cube.y() + (prevCube.getHeight() + 1)) - 1.5)
                }
                else {
                    // outlinePoints.push((cube.x() + (cube.getWidth() + 1)) - 1.5)
                    // outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)

                    outlinePoints.push(0 + .5)
                    outlinePoints.push((cube.y() + (cube.getHeight() + 1)) - 1.5)
                }

                outlinePoints.push(0 + .5)
                outlinePoints.push(0 + .5)
            }

        })
    }

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });


    return line;




}

//some items may have odd shapes and require their own function
function spawnPaddedArmor(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 3) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, GRID_SIZE - 1.5,
        0 + .5, GRID_SIZE - 1.5,
        0 + .5, 0 + .5
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnLeatherArmor(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 3,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 3,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 3) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 4) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 4) - 1.5,
        GRID_SIZE + .5, GRID_SIZE - 1.5,
        0 + .5, GRID_SIZE - 1.5,
        0 + .5, 0 + .5
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnStuddedArmor(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 4,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 3,
        colour
    ));

    var outlinePoints = [
        GRID_SIZE + .5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 3) + .5, GRID_SIZE + .5,
        (GRID_SIZE * 3) + .5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 5) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 5) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 4) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 4) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 2) - 1.5,
        0 + .5, (GRID_SIZE * 2) - 1.5,
        0 + .5, GRID_SIZE + .5,
        GRID_SIZE + .5, GRID_SIZE + .5,
        
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnHideArmor(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_PADDING * 3,
        GRID_PADDING,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 3,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 2) -1.5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 2) -1.5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 4) -1.5,
        GRID_SIZE + .5, (GRID_SIZE * 4) -1.5,
        GRID_SIZE + .5, (GRID_SIZE * 2) -1.5,
        0 + .5, (GRID_SIZE * 2) -1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnChainShirtArmor(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 4,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 4,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 4,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 3,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 4,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 4,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 4,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 5) - 1.5, 0 + .5,
        (GRID_SIZE * 5) - 1.5, (GRID_SIZE * 3) - 1.5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 3) - 1.5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 5) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 5) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 2) - 1.5,
        0 + .5, (GRID_SIZE * 2) - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnShield(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        GRID_SIZE - 1.5, 0 + .5,
        GRID_SIZE - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 2) + .5, GRID_SIZE + .5,
        (GRID_SIZE * 2) + .5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 2) - 1.5,
        0 + .5, (GRID_SIZE * 2) - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)


    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnGreatClub(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 5; y++) {
            ItemShapes.add(createCube(
                x * GRID_SIZE,
                y * GRID_SIZE,
                colour
            ));
        }
    }

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 5) - 1.5,
        0 + .5, (GRID_SIZE * 5) - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnMace(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(generateOutline(ItemShapes))

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnLineItem(name, colour, weight) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)


    for (let i = 0; i < weight; i++) {
        ItemShapes.add(createCube(
            GRID_SIZE * i,
            0,
            colour
        ));
    }

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * weight) - 1.5, 0 + .5,
        (GRID_SIZE * weight) - 1.5, GRID_SIZE - 1.5,
        0 + .5, GRID_SIZE - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnLightCrossbow(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, GRID_SIZE - 1.5,
        (GRID_SIZE * 2) - 1.5, GRID_SIZE - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, GRID_SIZE - 1.5,
        0 + .5, GRID_SIZE - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnGlaive(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(generateOutline(ItemShapes))

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnGreataxe(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 2,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, GRID_SIZE - 1.5,
        (GRID_SIZE * 2) - 1.5, GRID_SIZE - 1.5,
        (GRID_SIZE * 2) - 1.5,  (GRID_SIZE * 2) - 1.5,
        GRID_SIZE - 1.5,  (GRID_SIZE * 2) - 1.5,
        GRID_SIZE - 1.5, (GRID_SIZE * 3) - 1.5,
        0 + .5, (GRID_SIZE * 3) - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnGreatsword(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    var outlinePoints = [
        GRID_SIZE + .5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 4) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 2) - 1.5,
        0 + .5, (GRID_SIZE * 2) - 1.5,
        0 + .5, GRID_SIZE + .5,
        GRID_SIZE + .5, GRID_SIZE + .5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnMultiLineItem(name, colour, columns, rows) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            ItemShapes.add(createCube(
                GRID_SIZE * x,
                GRID_SIZE * y,
                colour
            ));
        }
    }

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * columns) - 1.5, 0 + .5,
        (GRID_SIZE * columns) - 1.5, (GRID_SIZE * rows) - 1.5,
        0 + .5, (GRID_SIZE * rows) - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnHeavyCrossbow(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
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

    Padded_Armor.add(ItemShapes)
    Padded_Armor.add(ItemText)

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 4,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 4,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 3,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 4,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 5,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 6,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 7,
        colour
    ));

    var outlinePoints = [
        (GRID_SIZE * 2) + .5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 5) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 5) - 1.5, (GRID_SIZE * 3) - 1.5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 3) - 1.5,
        (GRID_SIZE * 4) - 1.5, (GRID_SIZE * 4) - 1.5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 4) - 1.5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 8) - 1.5,
        (GRID_SIZE * 2) + .5, (GRID_SIZE * 8) - 1.5,
        (GRID_SIZE * 2) + .5, (GRID_SIZE * 4) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 4) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 3) - 1.5,
        0 + .5, (GRID_SIZE * 3) - 1.5,
        0 + .5, GRID_SIZE + .5,
        (GRID_SIZE * 2) + .5, GRID_SIZE + .5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Padded_Armor;

}

function spawnMaul(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
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

    Maul.add(ItemShapes)
    Maul.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 3,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 4,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 5,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, 0 + .5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 6) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 6) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 2) - 1.5,
        0 + .5, (GRID_SIZE * 2) - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Maul;

}

function spawnCrowbar(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
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

    Maul.add(ItemShapes)
    Maul.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(generateOutline(ItemShapes))

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Maul;

}

function spawnMinersPick(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
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

    Maul.add(ItemShapes)
    Maul.add(ItemText)

    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 4,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 3,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 4,
        colour
    ));

    var outlinePoints = [
        GRID_SIZE + .5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 2) + .5,
        (GRID_SIZE * 5) - 1.5, (GRID_SIZE * 2) + .5,
        (GRID_SIZE * 5) - 1.5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE - 1.5, (GRID_SIZE * 3) - 1.5,

        GRID_SIZE - 1.5, (GRID_SIZE * 4) + .5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 4) + .5,
        
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 5) - 1.5,
        GRID_SIZE + .5, (GRID_SIZE * 5) - 1.5,

        GRID_SIZE + .5, (GRID_SIZE * 4) - 1.5,
        0 + .5, (GRID_SIZE * 4) - 1.5,
        0 + .5, GRID_SIZE + .5,
        GRID_SIZE + .5, GRID_SIZE + .5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Maul;

}

function spawnIronPot(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
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

    Maul.add(ItemShapes)
    Maul.add(ItemText)

    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 3,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 3,
        colour
    ));

    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE * 3,
        colour
    ));

    var outlinePoints = [
        GRID_SIZE + .5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, 0 + .5,
        (GRID_SIZE * 2) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 3) - 1.5, GRID_SIZE + .5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 4) - 1.5,
        0 + .5, (GRID_SIZE * 4) - 1.5,
        0 + .5, GRID_SIZE + .5,
        GRID_SIZE + .5, GRID_SIZE + .5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Maul;

}

function spawnHempRope(name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
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

    Maul.add(ItemShapes)
    Maul.add(ItemText)

    ItemShapes.add(createCube(
        0,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        0,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 3,
        0,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE * 2,
        GRID_SIZE,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));
    ItemShapes.add(createCube(
        GRID_SIZE,
        GRID_SIZE * 2,
        colour
    ));

    ItemShapes.add(createCube(
        0,
        GRID_SIZE * 3,
        colour
    ));

    var outlinePoints = [
        0 + .5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, 0 + .5,
        (GRID_SIZE * 4) - 1.5, GRID_SIZE - 1.5,
        (GRID_SIZE * 3) - 1.5, GRID_SIZE - 1.5,
        (GRID_SIZE * 3) - 1.5, (GRID_SIZE * 2) - 1.5,
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 2) - 1.5,
        
        (GRID_SIZE * 2) + .5, GRID_SIZE - 1.5,
        GRID_SIZE - 1.5, GRID_SIZE - 1.5,
        GRID_SIZE - 1.5, (GRID_SIZE * 2) + .5,
        (GRID_SIZE * 2) + .5, (GRID_SIZE * 2)  + .5,
        
        (GRID_SIZE * 2) - 1.5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE - 1.5, (GRID_SIZE * 3) - 1.5,
        GRID_SIZE - 1.5, (GRID_SIZE * 4) - 1.5,
        0 + .5, (GRID_SIZE * 4) - 1.5,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 2,
        closed: true
    });
    ItemShapes.add(line)

    ItemText.add(new Konva.Text({
        x: 8,
        y: 0,
        rotation: 45,
        text: name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 70,
        align: 'center',
        name: 'text'
    }));

    return Maul;

}