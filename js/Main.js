
//TODO


//BUGS

//Dashes in items are misaligned

//Grid resizing 
//  displaces items sometimes?
//  spawning area changes / gets cut off
//      need to make stage width and height globals

//Collision is removed when interacting with a different shape.
//  eg, two objects collide and turn red, move third not touching either and the og two are now fine.
//  change who/where gets their 'isColliding' set false


//FUTURE

//tooltips on items
//  make it an option? turns on when size gets small enough be fefault
//  Can show other stuff in tooltip - desc etc

//Save feature
//  throw save into cookie? 
//    Will need to add clear / new button with a confirm

//Ability to switch to only generic shapes

//Coin weight

//edit items
//  name, weight, colour
//      Note? Desc?
//  Set Equipped and show that visually
//  this handles magic items as well, can ass base item and then edit its name colour or weight

//Bag of Holding and other tools to aid in Encumberance
//  Like a mule or horse.

//Custom Items

//have some other graphic to tell when something is colliding? - May wanna use red colour. 
//  Yeah use an image or something.
//    image turned out to be dead end
//    For now, we store the intended colour to be reverted to. Want a different solution.




var GUIDELINE_OFFSET = 10;
var GRID_PADDING = 80;
var GRID_SIZE = 60;

var strength = 10;

var width = (15 * GRID_SIZE) + GRID_PADDING + 500; //500 is for extra room for spawning items and controls
var height = (20 * GRID_SIZE) + GRID_PADDING; // 20 is max strength

var stage;
var gridLayer;
var Itemlayer;
var EquipmentJSON;

$(document).ready(function () {

    SetStage();

    $('#EquipmentComboBox').append($('<option>', {
        value: '',
        text: ''
    }));

    //loop through and create html Options for all
    for (let i = 0; i < EquipmentJSON.length; i++) {
        $('#EquipmentComboBox').append($('<option>', {
            value: JSON.stringify(EquipmentJSON[i]),
            text: EquipmentJSON[i].name
        }));
    }

    initializeItemCombobox()

    $('#EncumbranceRule').change(function () {
        //remove old grid layer
        gridLayer.destroy()
        gridLayer = createGridLayer(strength, this.checked)

        //redraw
        stage.add(gridLayer);
        gridLayer.moveToBottom();
    });

    $('#CharacterStrength').change(function () {
        strength = $('#CharacterStrength')[0].value;

        gridLayer.destroy()
        gridLayer = createGridLayer(strength, $('#EncumbranceRule')[0].checked)

        //redraw
        stage.add(gridLayer);
        gridLayer.moveToBottom();
    });

    //SIDEBAR
    $('#dismiss, .overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('#CharacterName').on("focusout", function () {
        document.title = this.value + "'s Cubeventory";
    });

    $('#saveUploadFile').on("change", function () {
        uploadSaveFile();
    });

});

function SetStage() {

    // first we need to create a stage
    stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
    });

    strength = $('#CharacterStrength')[0].value;

    var gridLayer = createGridLayer(strength, $('#EncumbranceRule')[0].checked)
    stage.add(gridLayer);
    stage.draw();

    // create layer for shapes
    Itemlayer = new Konva.Layer();
    // add the layer to the stage
    stage.add(Itemlayer);

    InitializeMenu();
    InitializeCollisionSnapping()

}

function increaseGridSize() {
    if ($('#GridSize')[0].value != "80") {
        $('#GridSize')[0].value = parseInt($('#GridSize')[0].value) + 10
        ResizeGrid();
    }
}
function decreaseGridSize() {
    if ($('#GridSize')[0].value != "40") {
        $('#GridSize')[0].value = parseInt($('#GridSize')[0].value) - 10
        ResizeGrid();
    }
}

function ResizeItem(itemShape, prevGridSize, index) {

    //check if complex
    if (itemShape.getAttr('complexItem') != undefined) {
        var name = itemShape.children[1].children[0].text()
        var colour = itemShape.children[0].children[0].fill();
        var weight = itemShape.children[0].find('.fillShape').length

        //how to determine which one to spawn 
        var complexItem = determineSpawnMethod(itemShape.getAttr('complexItem'), name, colour, weight)
        complexItem.x(itemShape.x())
        complexItem.y(itemShape.y())
        complexItem.rotation(itemShape.rotation())
        if (itemShape.children[0].scaleX() < 0)
            FlipItem(complexItem)
        
        //itemShape.destroy()
        //Itemlayer.add(complexItem)
        //itemShape = complexItem
        //Itemlayer.children[index] = complexItem

        return complexItem

    }
    else {

        var shapeFlipped = false
        if (itemShape.children[0].scaleX() < 0){
            FlipItem(itemShape)
            shapeFlipped = true
        }

        for (const shape of itemShape.children[0].children) {

            if (shape.name() == 'fillShape') {

                shape.width(GRID_SIZE - 1)
                shape.height(GRID_SIZE - 1)

                if (shape.x() > 0) {
                    var shapeX = shape.x();
                    var Xplacment = shapeX / prevGridSize
                    shapeX = Xplacment * GRID_SIZE
                    shape.x(shapeX)
                }

                if (shape.y() > 0) {
                    var shapeY = shape.y();
                    var Yplacment = shapeY / prevGridSize
                    shapeY = Yplacment * GRID_SIZE
                    shape.y(shapeY)
                }
            }
            else if (shape.name() == 'shapeOutline') {
                //delete outline
                shape.destroy()
            }
        }

        //remove text
        var name = itemShape.children[1].children[0].text()
        itemShape.children[1].children[0].destroy()
        //add text
        itemShape.children[1].add(addItemText(name, itemShape.children[0]))

        //redraw outline
        itemShape.children[0].add(generateOutline(itemShape.children[0]))

        if (shapeFlipped)
            FlipItem(itemShape)

        return itemShape
    }

}

function ResizeGrid() {

    var items = Itemlayer.toJSON();
    var prevGridSize = GRID_SIZE;

    stage.destroy();
    GRID_SIZE = parseInt($('#GridSize')[0].value)
    SetStage();

    Itemlayer = Konva.Node.create(items);

    //complex items need to be remade. This requires destroying the old one, but we can't do that while looping through its container.
    var newComplexItems = {}

    //for (var shape of Itemlayer.children) {
    for (let i = 0; i < Itemlayer.children.length; i++) {
        var shape = Itemlayer.children[i]
        shape = ResizeItem(shape, prevGridSize, i)

        if (shape.getAttr('complexItem') != undefined) {
            newComplexItems[i] = shape
        }

        var shapeX = shape.x();
        //take off padding 
        shapeX -= GRID_PADDING;
        //mod rest off
        var access = shapeX % prevGridSize
        shapeX -= access
        //and divide by prev grid size to get its placment on grid
        var Xplacment = shapeX / prevGridSize
        //then just do new grid size * that number
        //throw grid padding back on
        //multiply remainder by 1.665
        if (access < 2)
            access = 0
        shapeX = (Xplacment * GRID_SIZE) + GRID_PADDING + (access)
        shape.x(shapeX)

        var shapeY = shape.y();
        shapeY -= GRID_PADDING;
        var access = shapeY % prevGridSize
        shapeY -= access
        var Xplacment = shapeY / prevGridSize
        if (access < 2)
            access = 0
        shapeY = (Xplacment * GRID_SIZE) + GRID_PADDING + (access)

        shape.y(shapeY)

    }

    for (const property in newComplexItems) {
        Itemlayer.children[property].destroy()
        Itemlayer.add(newComplexItems[property])
    }


    stage.add(Itemlayer);

    InitializeCollisionSnapping()

};

function SaveInventory() {

    var name = $('#CharacterName')[0].value

    var saveFile = {
        name: $('#CharacterName')[0].value,
        strength: strength,
        encumbranceRule: $('#EncumbranceRule')[0].checked,
        gridSize: parseInt($('#GridSize')[0].value),
        items: Itemlayer.toJSON()
    }

    var saveJSON = JSON.stringify(saveFile);

    const file = new File([saveJSON], name + ' cubeventory.json')
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

function uploadSaveFile() {
    var fileInput = $('#saveUploadFile')[0];
    if (!fileInput.value.length) return;

    // Create a new FileReader() object
    let reader = new FileReader();

    // Setup the callback event to run when the file is read
    reader.onload = LoadSaveFile;

    // Read the file
    reader.readAsText(fileInput.files[0]);

}

function LoadSaveFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);

    //update fields with save data
    $('#CharacterName')[0].value = json.name

    $('#CharacterStrength')[0].value = json.strength
    $('#CharacterStrength')[0].dispatchEvent(new Event('change'))

    $('#EncumbranceRule')[0].checked = json.encumbranceRule
    $('#EncumbranceRule')[0].dispatchEvent(new Event('change'))

    $('#GridSize')[0].value = json.gridSize
    GRID_SIZE = json.gridSize
    stage.destroy();
    SetStage();

    //create layer from save file
    Itemlayer.destroy()
    Itemlayer = Konva.Node.create(json.items);
    stage.add(Itemlayer);
    InitializeMenu();
    InitializeCollisionSnapping()
}

function ShowGenericItemModal(itemName) {

    //set name in modal
    $('#ItemName')[0].value = itemName

    $('#genericItemModal').modal('show');
}

function SpawnGenericItem() {

    Itemlayer.add(spawnGenericItem($('#ItemName')[0].value, $('#ItemWeight')[0].value, $('#ItemColour')[0].value))

    //clear modal fields
    $('#ItemName')[0].value = ''
    $('#ItemWeight')[0].value = ''
    $('#ItemColour')[0].value = '#ADD8E6'
}

