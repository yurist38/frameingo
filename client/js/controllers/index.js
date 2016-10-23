import Common from '../../../lib/utils/Common';

const commonUtils = new Common();

var imgCount = 10,
    collectionCount = 5,
    numberShuffled = [],
    setList = [],
    currentSetIndex = 0,
    currentSet;

Template.index.created = () => {
    generateRandomLists();
    fillData();
    commonUtils.selectGrid();
}

Template.index.rendered = () => {
    iPhobia = iPhobia || {};
    iPhobia.validatorIndexForm = commonUtils.validateForm('indexForm');
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
        iPhobia.validatorHeaderForm = commonUtils.validateForm('headerForm');
        Router.go('search', {tag: tag});
    },
    'input #indexTagField': () => {
        $('#indexBtnGo').prop('disabled', !$('#indexForm').valid());
    }
});

function generateRandomLists() {
    numberShuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(function() { return 0.5 - Math.random() });
    setList = [1, 2, 3, 4, 5].sort(function() { return 0.5 - Math.random() });
}

function fillData() {
    var i = 0;
    currentSet = setList[currentSetIndex];
    var showDelay = setInterval(function() {
        Session.set('randomSlide' + setList[i], { img: currentSet + '/' + numberShuffled[setList[i]] });
        i++;
        if (i === collectionCount) clearInterval(showDelay);
    }, 150);
    currentSetIndex = currentSetIndex < collectionCount - 1 ? currentSetIndex + 1 : 0;
    setTimeout(fillData, 5000);
}
