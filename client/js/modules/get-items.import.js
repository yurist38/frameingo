export default function(token, grid, tag) {
    $.ajax({
        url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            access_token: token,
            count: Grids.findOne({"name": grid}).quantity
        },
        cache: false,
        success(response) {
            if (Session.get('currentCollectionId')) EventData.remove({_id: Session.get('currentCollectionId')});
            Session.set('currentCollectionId', EventData.insert(response.data));
            setTimeout(getItems, 7000);
        },
        error(error) {
            console.log('Error is', error);
        }
    });
}
