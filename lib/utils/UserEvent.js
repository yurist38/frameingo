import Common from './Common';

const commonUtils = new Common();

export default class UserEvent {
    isNameExists(name) {
        return !!Events.findOne({
            'name': name,
            'userId': Meteor.userId()
        });
    }

    isThereEventData() {
        return !!EventData.find({}, {sort: {Field: -1}, limit: 1}).fetch().length;
    }

    editEvent($el) {
        $el.addClass('editing');
        let $inputName = $el.find('.event-name'),
            $inputTag = $el.find('.event-tag');
        $inputName.attr('data-current-value', $inputName.val()).attr('readonly', false).focus();
        $inputTag.attr('data-current-value', $inputTag.val()).attr('readonly', false);
        commonUtils.validateEventForm($el.find('form').attr('id'));
    }

    updateEvent($form) {
        let $newNameInput = $form.find('.event-name'),
            $newTagInput = $form.find('.event-tag'),
            eventId = $form.attr('id').substring(5);
        Events.update({
            _id: eventId
        }, {
            $set: {
                name: $newNameInput.val(),
                tag: $newTagInput.val()
            }
        });
        $newNameInput.attr('readonly', true);
        $newTagInput.attr('readonly', true);
        $form.closest('.li-event').removeClass('editing');
    }

    removeEvent(id) {
        Events.remove({'_id': id});
    }

    addEvent($form) {
        let $newNameInput = $form.find('.event-name'),
            $newTagInput = $form.find('.event-tag');
        Events.insert({
            'userId': Meteor.user()._id,
            'name': $newNameInput.val(),
            'tag': $newTagInput.val(),
            'grid': 'grid1'
        });
    }
}
