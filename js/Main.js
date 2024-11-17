var VERSION_NUM = "1.1.2"

var GUIDELINE_OFFSET = 10;
var GRID_PADDING = 80;
var GRID_SIZE = 60;

var strength = 10;

var STAGE_WIDTH;
var STAGE_HEIGHT;

var stage;
var gridLayer;
var Itemlayer;
var EquipmentJSON;

var lastCenter = null;
var lastDist = 0;
var dragStopped = false;

var SelectedItem = undefined;

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

        // if (strength > 50) {
        //     $('#CharacterStrength')[0].value = 50
        //     strength = 50
        // }

        STAGE_HEIGHT = calcStageHeight()
        stage.height(STAGE_HEIGHT);

        gridLayer.destroy()
        gridLayer = createGridLayer(strength, $('#EncumbranceRule')[0].checked)

        //redraw
        stage.add(gridLayer);
        gridLayer.moveToBottom();
    });

    //SIDEBAR
    $('#dismiss, .overlay').on('click', function () {
        closeSidebar()
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

    // load save from local storage
    const lastSave = window.localStorage.getItem("local-save");

    if (lastSave !== null) {
        LoadSaveFile(lastSave);
    }

    window.addEventListener("beforeunload", SaveLocal);


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //check local storage 
        if (window.localStorage.getItem("shownMobileHelpModal") == null){
            //show modal explaining mobile controls 
            $('#mobileUserModal').modal('show');
            window.localStorage.setItem("shownMobileHelpModal", true);
        }
    }
});

function closeSidebar(){
    // hide sidebar
    $('#sidebar').removeClass('active');
    // hide overlay
    $('.overlay').removeClass('active');
}

function getCenter(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
    };
}

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function calcStageHeight() {
    return (strength * GRID_SIZE) + GRID_PADDING + GRID_SIZE + 200; //200 for spawning area and a little extra bottom clearance
}

function SetStage() {

    //STAGE_WIDTH = (15 * GRID_SIZE) + GRID_PADDING;
    STAGE_WIDTH = document.documentElement.clientWidth;
    STAGE_HEIGHT = calcStageHeight()

    // first we need to create a stage
    stage = new Konva.Stage({
        container: 'container',
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
        x: 0,
        y: 0
    });

    strength = $('#CharacterStrength')[0].value;

    var gridLayer = createGridLayer(strength, $('#EncumbranceRule')[0].checked)
    stage.add(gridLayer);
    stage.draw();

    // create layer for shapes
    Itemlayer = new Konva.Layer();
    // add the layer to the stage

    ['mousedown', 'touchstart'].forEach(function(e) {
        stage.on(e, function(){
            const mousePos = stage.getPointerPosition();
            var item = stage.getIntersection(mousePos)
    
            if (item === null || item.getLayer().getAttr('id') === 'gridLayer')//so they can't manipulate the grid.
                item = null;
            else
                item = item.parent.parent
    
            onShapeClick(item);
        });
    });

    stage.on('mousedown, touchstart', function () {

     
    });
    stage.add(Itemlayer);

    InitializeMenu();
    InitializeCollisionSnapping()

    stage.on('touchmove', function (e) {
        e.evt.preventDefault();
        var touch1 = e.evt.touches[0];
        var touch2 = e.evt.touches[1];

        // we need to restore dragging, if it was cancelled by multi-touch
        if (touch1 && !touch2 && !stage.isDragging() && dragStopped) {
            stage.startDrag();
            dragStopped = false;
        }

        if (touch1 && touch2) {
            // if the stage was under Konva's drag&drop
            // we need to stop it, and implement our own pan logic with two pointers
            if (stage.isDragging()) {
                dragStopped = true;
                stage.stopDrag();
            }

            var p1 = {
                x: touch1.clientX,
                y: touch1.clientY,
            };
            var p2 = {
                x: touch2.clientX,
                y: touch2.clientY,
            };

            if (!lastCenter) {
                lastCenter = getCenter(p1, p2);
                return;
            }
            var newCenter = getCenter(p1, p2);

            var dist = getDistance(p1, p2);

            if (!lastDist) {
                lastDist = dist;
            }

            // local coordinates of center point
            var pointTo = {
                x: (newCenter.x - stage.x()) / stage.scaleX(),
                y: (newCenter.y - stage.y()) / stage.scaleX(),
            };

            var scale = stage.scaleX() * (dist / lastDist);

            // calculate new position of the stage
            var dx = newCenter.x - lastCenter.x;
            var dy = newCenter.y - lastCenter.y;

            var newPos = {
                x: newCenter.x - pointTo.x * scale + dx,
                y: newCenter.y - pointTo.y * scale + dy,
            };

            stage.position(newPos);

            lastDist = dist;
            lastCenter = newCenter;
        }
    });

    stage.on('touchend', function (e) {
        lastDist = 0;
        lastCenter = null;
    });

}

function increaseGridSize() {
    if ($('#GridSize')[0].value != "80") {
        $('#GridSize')[0].value = parseInt($('#GridSize')[0].value) + 10
        ResizeGrid();
    }
}
function decreaseGridSize() {
    if ($('#GridSize')[0].value != "20") {
        $('#GridSize')[0].value = parseInt($('#GridSize')[0].value) - 10
        ResizeGrid();
    }
}

function ResizeItem(itemShape, prevGridSize) {

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

        itemShape.destroy()
        Itemlayer.add(complexItem)

        return complexItem

    }
    else {

        var shapeFlipped = false
        if (itemShape.children[0].scaleX() < 0) {
            FlipItem(itemShape)
            shapeFlipped = true
        }

        for (const shape of itemShape.children[0].children) {

            if (shape.name() == 'fillShape') {


                if (shape.width() === (prevGridSize / 2))
                    shape.width((GRID_SIZE / 2))
                else
                    shape.width(GRID_SIZE)

                if (shape.height() === (prevGridSize / 2))
                    shape.height((GRID_SIZE / 2))
                else
                    shape.height(GRID_SIZE)

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

        //remove all lines
        itemShape.children[2].children = []

        //redraw dashed lines
        createInnerDashedLines(itemShape.children[0], itemShape.children[2])

        //redraw outline
        itemShape.children[2].add(generateOutline(itemShape.children[0]))

        if (shapeFlipped)
            FlipItem(itemShape)

        return itemShape
    }

}

function ResizeGrid() {

    unselectAll()

    var items = Itemlayer.toJSON();
    var prevGridSize = GRID_SIZE;
    var prevGridPadding = GRID_PADDING;

    stage.destroy();
    GRID_SIZE = parseInt($('#GridSize')[0].value)
    GRID_PADDING = Math.round((GRID_SIZE + GRID_SIZE / 3) / 10) * 10; //adjusting padding. rounding to nearest 10. 
    SetStage();

    Itemlayer = Konva.Node.create(items);

    for (let i = Itemlayer.children.length - 1; i >= 0; i--) {//loop backwards because we may delete shapes in container
        var shape = Itemlayer.children[i]
        shape = ResizeItem(shape, prevGridSize, i)

        var shapeX = shape.x();
        //take off padding 
        shapeX -= prevGridPadding;
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
        else if (access === prevGridSize / 2) // for half items
            access = (GRID_SIZE / 2)

        shapeX = (Xplacment * GRID_SIZE) + (GRID_PADDING) + (access)
        shape.x(shapeX)

        var shapeY = shape.y();
        shapeY -= prevGridPadding;
        var access = shapeY % prevGridSize
        shapeY -= access
        var Xplacment = shapeY / prevGridSize
        if (access < 2)
            access = 0
        else if (access === prevGridSize / 2)
            access = (GRID_SIZE / 2)
        shapeY = (Xplacment * GRID_SIZE) + GRID_PADDING + (access)

        shape.y(shapeY)

    }

    stage.add(Itemlayer);

    InitializeCollisionSnapping()

};

function makeSave() {
    
    unselectAll()
    
    var saveFile = {
        version: VERSION_NUM,
        name: $('#CharacterName')[0].value,
        strength: strength,
        encumbranceRule: $('#EncumbranceRule')[0].checked,
        gridSize: parseInt($('#GridSize')[0].value),
        items: Itemlayer.toJSON()
    }

    return JSON.stringify(saveFile);
}

function SaveDownload() {
    closeSidebar();

    var name = $('#CharacterName')[0].value

    var saveJSON = makeSave();

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

function SaveLocal() {
    closeSidebar();
    
    const saveJson = makeSave();

    window.localStorage.setItem("local-save", saveJson);

    alert("Saved!")
}


function uploadSaveFile() {
    var fileInput = $('#saveUploadFile')[0];
    if (!fileInput.value.length) return;

    // Create a new FileReader() object
    let reader = new FileReader();

    // Setup the callback event to run when the file is read
    reader.onload = function (event) {
        LoadSaveFile(event.target.result);
    };

    // Read the file
    reader.readAsText(fileInput.files[0]);

}

function LoadSaveFile(str) {
    let json = JSON.parse(str);

   

    //update fields with save data
    $('#CharacterName')[0].value = json.name

    $('#CharacterStrength')[0].value = json.strength
    $('#CharacterStrength')[0].dispatchEvent(new Event('change'))

    $('#EncumbranceRule')[0].checked = json.encumbranceRule
    $('#EncumbranceRule')[0].dispatchEvent(new Event('change'))

    $('#GridSize')[0].value = json.gridSize
    GRID_SIZE = json.gridSize
    GRID_PADDING = Math.round((GRID_SIZE + GRID_SIZE / 3) / 10) * 10; //adjusting padding. rounding to nearest 10. 
    stage.destroy();
    SetStage();

    //create layer from save file
    Itemlayer.destroy()
    Itemlayer = Konva.Node.create(json.items);
    stage.add(Itemlayer);
    InitializeMenu();
    InitializeCollisionSnapping()

     //check version number
     if (json.version == "1.0.1"){
        //add 'name': "shapeOutline" to the complex items
        //changing grid size fixes this...
        ResizeGrid()
    }

}

function ShowGenericItemModal(itemName) {

    closeSidebar();

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

    // hide sidebar
    $('#sidebar').removeClass('active');
    // hide overlay
    $('.overlay').removeClass('active');
}


function ResetEverything() {
    closeSidebar()

    if (confirm("SAVED CHANGES WILL BE LOST FOREVER! DOWNLOAD YOUR INVENTORY IF YOU WANT TO KEEP IT!\n\nproceed with reset?")) {
        window.localStorage.removeItem("local-save");

        //clear everything
        $('#EncumbranceRule').prop("checked", true);
        $('#GridSize')[0].value = 60
        $('#CharacterStrength')[0].value = 10
        $('#CharacterName')[0].value = ''

        Itemlayer.children = []

        ResizeGrid();
    }
}

function unselectAll(){
     //clear all selected 
    var selected = Itemlayer.find(item => {
        return item.getAttr('isSelected') === true
    })
    for (let i = 0; i < selected.length; i++) {
        selected[i].find('.shapeOutline')[0].stroke('black')
        selected[i].setAttr('isSelected', false);
    }

    $('.ItemManipulateButtons').prop('disabled', true);
    SelectedItem = null;
}

function onShapeClick(item) {

    unselectAll()

    if (item != null){
        //$("#SelectedItem").html(item.getAttr('itemName'))//for debugging
        
        //change border
        item.find('.shapeOutline')[0].stroke('blue')

        //set internal selected
        item.setAttr('isSelected', true);
        
        //enable buttons
        $('.ItemManipulateButtons').removeAttr('disabled');
        
        SelectedItem = item;
    }

}
