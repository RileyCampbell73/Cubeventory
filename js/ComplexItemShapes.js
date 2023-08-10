
//some items may have odd shapes and require their own function
function spawnPaddedArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    

    return Padded_Armor;

}

function spawnLeatherArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnStuddedArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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



    return Padded_Armor;

}

function spawnHideArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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
        GRID_SIZE * 3,
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnChainShirtArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnShield(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnMace(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

    ItemShapes.add(generateOutline(ItemShapes))

    return Padded_Armor;

}

function spawnLineItem(index, name, colour, weight) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnLightCrossbow(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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



    return Padded_Armor;

}

function spawnGlaive(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

    ItemShapes.add(generateOutline(ItemShapes))

    return Padded_Armor;

}

function spawnGreataxe(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnGreatsword(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnMultiLineItem(index, name, colour, columns, rows) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnHeavyCrossbow(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Padded_Armor = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Padded_Armor;

}

function spawnMaul(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Maul;

}

function spawnCrowbar(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

    ItemShapes.add(generateOutline(ItemShapes))

    return Maul;

}

function spawnMinersPick(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Maul;

}

function spawnIronPot(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Maul;

}

function spawnHempRope(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Maul = new Konva.Group({
        x: randItemSpawn.x,
        y: randItemSpawn.y,
        draggable: true,
        complexItem: index
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

    ItemText.add(addItemText(name, ItemShapes))

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

    return Maul;

}