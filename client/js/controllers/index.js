var imgCount = 10,
    collectionCount = 5,
    numberShuffled = [],
    setList = [],
    currentSetIndex = 0,
    currentSet;

Template.index.created = () => {
    generateRandomLists();
    fillData();
    selectGrid();
}

Template.index.rendered = () => {
    iPhobia = iPhobia || {};
    iPhobia.validatorIndexForm = validateForm('indexForm');
}

Template.index.helpers({
    formStatus() {
        return Session.get('tag') ? 'hidden' : '';
    },
    getPics() {
        return [
            Session.get('randomSlide1'),
            Session.get('randomSlide2'),
            Session.get('randomSlide3'),
            Session.get('randomSlide4'),
            Session.get('randomSlide5')
        ];
    },
    rightGrid() {
        return Session.get('grid');
    }
});

Template.index.events({
    'submit #indexForm': (e) => {
        e.preventDefault();
        var tag = $('#indexTagField').val();
        $('#headerFormLi').removeClass('hidden');
        $('#indexForm').addClass('hidden');
        iPhobia.validatorHeaderForm = validateForm('headerForm');
        Router.go('search', {tag: tag});
    },
    'input #indexTagField': () => {
        $('#indexBtnGo').prop('disabled', !$('#indexForm').valid());
    }
});

function generateRandomLists() {
    var i = 0;
    while (numberShuffled.length < imgCount) {
        var randNum = Math.floor(Math.random() * imgCount);
        if (numberShuffled.indexOf(randNum) < 0) {
            numberShuffled.push(randNum);
        }
    }
    var i = 0;
    while (setList.length < collectionCount) {
        if (numberShuffled[i] < collectionCount) setList.push(++numberShuffled[i]);
        i++;
    }
}

function fillData() {
    var i = 0;
    currentSet = setList[currentSetIndex];
    var showDelay = setInterval(function() {
        Session.set('randomSlide' + setList[i], { img: currentSet + '/' + numberShuffled[setList[i]] });
        i++;
        if (i === 5) clearInterval(showDelay);
    }, 150);
    currentSetIndex = currentSetIndex < 4 ? currentSetIndex + 1 : 0;
    setTimeout(fillData, 7000);
}
