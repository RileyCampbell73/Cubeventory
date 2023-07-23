
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
            layer.add(spawnPaddedArmor(item.name, colour))
            break;
        case 'leather-armor':
            layer.add(spawnLeatherArmor(item.name, colour))
            break;
        case 'studded-leather-armor':
            layer.add(spawnStuddedArmor(item.name, colour))
            break;
        case 'hide-armor':
            layer.add(spawnHideArmor(item.name, colour))
            break;
        case 'chain-shirt':
        case 'breastplate':
            layer.add(spawnChainShirtArmor(item.name, colour))
            break;
        case 'shield':
            layer.add(spawnShield(item.name, colour))
            break;
        case 'greatclub':
            layer.add(spawnGreatClub(item.name, colour))
            break;
        case 'mace':
        case 'battleaxe':
            layer.add(spawnMace(item.name, colour))
            break;
        case 'quarterstaff':
        case 'spear':
        case 'lance':
        case 'longsword':
        case 'staff':
        case 'pole-10-foot':
            layer.add(spawnLineItem(item.name, colour, item.weight))
            break;
        case 'crossbow-light':
            layer.add(spawnLightCrossbow(item.name, colour))
            break;
        case 'glaive':
        case 'halberd':
            layer.add(spawnGlaive(item.name, colour))
            break;
        case 'greataxe':
            layer.add(spawnGreataxe(item.name, colour))
            break;
        case 'greatsword':
            layer.add(spawnGreatsword(item.name, colour))
            break;
        case 'maul':
            layer.add(spawnMaul(item.name, colour));
            break;
        case 'pike':
        case 'chain':
        case 'climbers-kit':
            layer.add(spawnMultiLineItem(item.name, colour, 2, item.weight / 2))
            break;
        case 'crossbow-heavy':// too bulky?
            layer.add(spawnHeavyCrossbow(item.name, colour))
            break;
        case 'crowbar':
            layer.add(spawnCrowbar(item.name, colour))
            break;
        case 'pick-miners':
            layer.add(spawnMinersPick(item.name, colour))
            break;
        case 'pot-iron':
            layer.add(spawnIronPot(item.name, colour))
            break;
        case 'rope-hempen-50-feet':
            layer.add(spawnHempRope(item.name, colour))
            break;


        default:
            layer.add(spawnGenericItem(item.name, item.weight, colour));
    }
}

function SpawnPackContents(packJson){

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
            ItemShapes.add(createCube(0, 0, colour, 39));
        }
        else {
            ItemShapes.add(createCube(0, 0, colour, 39, 39));
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

            ItemShapes.add(createCube(
                i * 80,
                rowCount * 80,
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
                            i * 80,
                            rowCount * 80,
                            colour,
                            39
                        ));
                    }
                    else {
                        ItemShapes.add(createCube(
                            i * 80,
                            rowCount * 80,
                            colour,
                            79,
                            39
                        ));
                    }
                }
                else if (under1lb < .5 && under1lb != 0) {
                    ItemShapes.add(createCube(
                        i * 80,
                        rowCount * 80,
                        colour,
                        39,
                        39
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

function createCube(x, y, colour, width = GRID_SIZE - 1, height = GRID_SIZE - 1) {
    return new Konva.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: colour,
        name: 'fillShape',
        stroke: "black",
        strokeWidth: 1,
        isColliding: false,
        fillColour: colour
    })
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

    ItemText.add(new Konva.Text({
        x: 88,
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

    ItemText.add(new Konva.Text({
        x: 88,
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

    ItemText.add(new Konva.Text({
        x: 88,
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
    
    ItemText.add(new Konva.Text({
        x: 8,
        y: 74,
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
    

    ItemText.add(new Konva.Text({
        x: 8,
        y: 74,
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

    return Maul;

}