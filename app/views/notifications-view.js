/*global Backbone, $*/
var template = require('./templates/notifications');
module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'notifications',
	template: template,
	events: {
		"click a": "errorFocusClick"//Errors on fields are saved into a link, a click on it is doing the focus.
	},
	//Focus on an error field.
	errorFocusClick: function(event){
		event.preventDefault();//Prevent the default link action.
		var dataName = event.target.getAttribute('data-name'); //Get the data-name attribute.
		$('input[data-name="'+ dataName +'"]').focus();//Focus on the input which have the data-name attribute.
	},
	//Render each type of notification.
	render: function() {
		var messages = this.model.getMessagesByType();
		/*We have to add css property to the message in order  to use the same template.*/
		var messageToPrint = {};
		messageToPrint.errorMessages = {
			messages: messages.errorMessages,
			cssMessageType: 'danger'
		};
		messageToPrint.warningMessages = {
			messages: messages.warningMessages,
			cssMessageType: 'warning'
		};
		messageToPrint.successMessages = {
			messages: messages.successMessages,
			cssMessageType: 'success'
		};
		messageToPrint.infoMessages = {
			messages: messages.infoMessages,
			cssMessageType: 'info'
		};
		this.$el.html('');
		//In order to call the templat only if needed.
		function printMessageIfExists(messageContainerName, context) {
			if (messages[messageContainerName].length > 0) {
				context.$el.append(template(messageToPrint[messageContainerName]));
			}
		}
		printMessageIfExists('errorMessages',this);//The this is put into a closure in order to not lose it.
		printMessageIfExists('warningMessages',this);
		printMessageIfExists('infoMessages', this);
		printMessageIfExists('successMessages', this);
		return this;
	},
	initialize: function initialize() {
		//We bind the model changes to a render.
		this.model.on('change', function() {
			this.render();
		});
	}
});