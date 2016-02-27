Meteor.startup( () => {
    fillGrid();
});

function fillGrid() {
    let grids = [
        {
            'name': 'grid1',
            'quantity': 3
        },
        {
            'name': 'grid2',
            'quantity': 4
        },
        {
            'name': 'grid3',
            'quantity': 5
        }
    ];
    for (let grid of grids) {
        if (!Grids.find({ "name": grid.name }).count())
            Grids.insert(grid);
    }
}
