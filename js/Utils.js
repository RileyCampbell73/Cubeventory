function DetermineItemWeightByShapes(){

    Itemlayer.children.forEach(item => {
        var itemWeight = 0;
        var itemsquares = item.children.find(x => x.attrs.name == "itemShapes")
        

        itemsquares.children.forEach(shape => {
            itemWeight += (shape.height() * shape.width()) / (GRID_SIZE * GRID_SIZE)
        });

        item.setAttr("itemWeight", itemWeight)


    });
}