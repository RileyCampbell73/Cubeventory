
//some items may have odd shapes and require their own function
function spawnPaddedArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 4), 0,
        (GRID_SIZE * 4), GRID_SIZE,
        (GRID_SIZE * 3), GRID_SIZE,
        (GRID_SIZE * 3), (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 3),
        GRID_SIZE, GRID_SIZE,
        0, GRID_SIZE,
        0, 0
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)



    return Item;

}

function spawnLeatherArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 4), 0,
        (GRID_SIZE * 4), GRID_SIZE,
        (GRID_SIZE * 3), GRID_SIZE,
        (GRID_SIZE * 3), (GRID_SIZE * 4),
        GRID_SIZE, (GRID_SIZE * 4),
        GRID_SIZE, GRID_SIZE,
        0, GRID_SIZE,
        0, 0
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnStuddedArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        GRID_SIZE, 0,
        (GRID_SIZE * 2), 0,
        (GRID_SIZE * 2), GRID_SIZE,
        (GRID_SIZE * 3), GRID_SIZE,
        (GRID_SIZE * 3), 0,
        (GRID_SIZE * 4), 0,
        (GRID_SIZE * 4), GRID_SIZE,
        (GRID_SIZE * 5), GRID_SIZE,
        (GRID_SIZE * 5), (GRID_SIZE * 2),
        (GRID_SIZE * 4), (GRID_SIZE * 2),
        (GRID_SIZE * 4), (GRID_SIZE * 4),
        GRID_SIZE, (GRID_SIZE * 4),
        GRID_SIZE, (GRID_SIZE * 2),
        0, (GRID_SIZE * 2),
        0, GRID_SIZE,
        GRID_SIZE, GRID_SIZE,

    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)



    return Item;

}

function spawnHideArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 4), 0,
        (GRID_SIZE * 4), (GRID_SIZE * 2),
        (GRID_SIZE * 3), (GRID_SIZE * 2),
        (GRID_SIZE * 3), (GRID_SIZE * 4),
        GRID_SIZE, (GRID_SIZE * 4),
        GRID_SIZE, (GRID_SIZE * 2),
        0, (GRID_SIZE * 2),
    ]

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnChainShirtArmor(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 5), 0,
        (GRID_SIZE * 5), (GRID_SIZE * 3),
        (GRID_SIZE * 4), (GRID_SIZE * 3),
        (GRID_SIZE * 4), (GRID_SIZE * 5),
        GRID_SIZE + .5, (GRID_SIZE * 5),
        GRID_SIZE + .5, (GRID_SIZE * 2),
        0, (GRID_SIZE * 2),
    ]

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnShield(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();
    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        GRID_SIZE, 0,
        GRID_SIZE, GRID_SIZE,
        (GRID_SIZE * 2), GRID_SIZE,
        (GRID_SIZE * 2), 0,
        (GRID_SIZE * 3), 0,
        (GRID_SIZE * 3), (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 2),
        0, (GRID_SIZE * 2),
    ]

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnMace(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    ItemLines.add(generateOutline(ItemShapes))

    return Item;

}

function spawnLineItem(index, name, colour, weight) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)


    for (let i = 0; i < weight; i++) {
        ItemShapes.add(createCube(
            GRID_SIZE * i,
            0,
            colour
        ));
    }

    ItemText.add(addItemText(name, ItemShapes))

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * weight), 0,
        (GRID_SIZE * weight), GRID_SIZE,
        0, GRID_SIZE,
    ]

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnLightCrossbow(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 3), 0,
        (GRID_SIZE * 3), GRID_SIZE,
        (GRID_SIZE * 2), GRID_SIZE,
        (GRID_SIZE * 2), (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 3),
        GRID_SIZE, GRID_SIZE,
        0, GRID_SIZE,
    ]

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)



    return Item;

}

function spawnGlaive(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    ItemLines.add(generateOutline(ItemShapes))

    return Item;

}

function spawnGreataxe(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 4), 0,
        (GRID_SIZE * 4), GRID_SIZE,
        (GRID_SIZE * 2), GRID_SIZE,
        (GRID_SIZE * 2), (GRID_SIZE * 2),
        GRID_SIZE, (GRID_SIZE * 2),
        GRID_SIZE, (GRID_SIZE * 3),
        0, (GRID_SIZE * 3),
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnGreatsword(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        GRID_SIZE, 0,
        (GRID_SIZE * 2), 0,
        (GRID_SIZE * 2), GRID_SIZE,
        (GRID_SIZE * 4), GRID_SIZE,
        (GRID_SIZE * 4), (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 2),
        0, (GRID_SIZE * 2),
        0, GRID_SIZE,
        GRID_SIZE, GRID_SIZE,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnMultiLineItem(index, name, colour, columns, rows) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * columns), 0,
        (GRID_SIZE * columns), (GRID_SIZE * rows),
        0, (GRID_SIZE * rows),
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnHeavyCrossbow(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();
    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        (GRID_SIZE * 2), 0,
        (GRID_SIZE * 3), 0,
        (GRID_SIZE * 3), GRID_SIZE,
        (GRID_SIZE * 5), GRID_SIZE,
        (GRID_SIZE * 5), (GRID_SIZE * 3),
        (GRID_SIZE * 4), (GRID_SIZE * 3),
        (GRID_SIZE * 4), (GRID_SIZE * 4),
        (GRID_SIZE * 3), (GRID_SIZE * 4),
        (GRID_SIZE * 3), (GRID_SIZE * 8),
        (GRID_SIZE * 2), (GRID_SIZE * 8),
        (GRID_SIZE * 2), (GRID_SIZE * 4),
        GRID_SIZE, (GRID_SIZE * 4),
        GRID_SIZE, (GRID_SIZE * 3),
        0, (GRID_SIZE * 3),
        0, GRID_SIZE,
        (GRID_SIZE * 2), GRID_SIZE,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnMaul(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 3), 0,
        (GRID_SIZE * 3), (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 6),
        GRID_SIZE, (GRID_SIZE * 6),
        GRID_SIZE, (GRID_SIZE * 2),
        0, (GRID_SIZE * 2),
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnCrowbar(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    ItemLines.add(generateOutline(ItemShapes))

    return Item;

}

function spawnMinersPick(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        GRID_SIZE, 0,
        (GRID_SIZE * 2), 0,
        (GRID_SIZE * 2), (GRID_SIZE * 2),
        (GRID_SIZE * 5), (GRID_SIZE * 2),
        (GRID_SIZE * 5), (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 3),

        GRID_SIZE, (GRID_SIZE * 4),
        (GRID_SIZE * 2), (GRID_SIZE * 4),

        (GRID_SIZE * 2), (GRID_SIZE * 5),
        GRID_SIZE, (GRID_SIZE * 5),

        GRID_SIZE, (GRID_SIZE * 4),
        0, (GRID_SIZE * 4),
        0, GRID_SIZE,
        GRID_SIZE, GRID_SIZE,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnIronPot(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        GRID_SIZE, 0,
        (GRID_SIZE * 2), 0,
        (GRID_SIZE * 2), GRID_SIZE,
        (GRID_SIZE * 3), GRID_SIZE,
        (GRID_SIZE * 3), (GRID_SIZE * 4),
        0, (GRID_SIZE * 4),
        0, GRID_SIZE,
        GRID_SIZE, GRID_SIZE,
    ]
    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}

function spawnHempRope(index, name, colour) {

    var randItemSpawn = randomSpawnLocation();

    //first make a group, everything will be a group.
    var Item = createBaseItemGroup(randItemSpawn.x, randItemSpawn.y, name, index)

    //group for shape
    var ItemShapes = createItemShapesGroup();

    //group for text
    var ItemText = createItemTextGroup();

    //group for lines
    var ItemLines = createItemLinesGroup();

    Item.add(ItemShapes)
    Item.add(ItemText)
    Item.add(ItemLines)

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

    createInnerDashedLines(ItemShapes, ItemLines)

    var outlinePoints = [
        0, 0,
        (GRID_SIZE * 4), 0,
        (GRID_SIZE * 4), GRID_SIZE,
        (GRID_SIZE * 3), GRID_SIZE,
        (GRID_SIZE * 3), (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 2),

        (GRID_SIZE * 2), GRID_SIZE,
        GRID_SIZE, GRID_SIZE,
        GRID_SIZE, (GRID_SIZE * 2),
        (GRID_SIZE * 2), (GRID_SIZE * 2),

        (GRID_SIZE * 2), (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 3),
        GRID_SIZE, (GRID_SIZE * 4),
        0, (GRID_SIZE * 4),
    ]

    var line = new Konva.Line({
        points: outlinePoints,
        stroke: 'black',
        strokeWidth: 3,
        closed: true,
        name: 'shapeOutline'
    });
    ItemLines.add(line)

    return Item;

}