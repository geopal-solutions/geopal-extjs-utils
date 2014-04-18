/**
 * @docauthor lukaszjajesnica@geopal-solutions.com
 *
 * timewidgetfield generates input field with time widget functionality
 *
 * @example
 *  var action = Ext.create('Ext.ux.form.field.TimeWidgetField',{
 *      value: '10:11'
 *  });
 *
 *  var action = Ext.create('Ext.ux.form.field.TimeWidgetField',{
 *      setCurrentTime: true
 *  });
 *
 *
 **/

Ext.define('Ext.ux.form.field.TimeWidgetField', {

    requires: [
        'Ext.ux.form.field.TimeWidget'
    ],

    extend: 'Ext.container.Container',

    alias: ['widget.timewidgetfield'],

    /**
     * @cfg {String} buttonText
     */
    buttonText: 'Set',

    /**
     * @cfg {String} fieldLabel
     */
    fieldLabel: 'Set time',

    /**
     * @cfg {Boolean} textFieldReadOnly
     */
    textFieldReadOnly: true,

    /**
     * @cfg {String} value
     */
    value: '11:11',

    /**
     * @cfg {Boolean} useCurrentTime
     */
    useCurrentTime: false,

    /**
     * @cfg {Boolean} showToCurrentTimeButton
     */
    showToCurrentTimeButton: true,

    /**
     * @cfg {Boolean} textFieldWrapper
     */
    textFieldWrapper: null,

    /**
     * show / hide time widget
     */
    toggleTimeWidget: function(){
        var timeWidget = this.textFieldWrapper.up('container').down('timewidget'),
            textField = this.textFieldWrapper.up('container').down('textfield');

        if(timeWidget.isVisible()){
            textField.setValue(timeWidget.getValue());
            timeWidget.hide();
        } else {
            timeWidget.show();
        }
    },

    initComponent: function(){
        var scope = this;

        var timeWidget = Ext.create('Ext.ux.form.field.TimeWidget', {
            useCurrentTime: scope.useCurrentTime,
            value: scope.value,
            layout: 'fit',
            border: true,
            style: 'position: absolute;z-index:1000;background:white;border: #bbb 1px solid;padding: 5px 10px;margin-top: -15px;width: 364px',
            hidden: true
        });

        var textField = Ext.create('Ext.form.field.Text', {
            fieldLabel: scope.fieldLabel,
            readOnly: scope.textFieldReadOnly,
            flex: 1
        });

        var button = Ext.create('Ext.button.Button', {
            margin: '14px 3px',
            text: scope.buttonText,
            listeners: {
                click: function(button){
                    scope.toggleTimeWidget(button)
                }
            }
        });


        this.textFieldWrapper = Ext.create('Ext.container.Container', {
            layout: 'hbox',
            items: [textField, button]
        });

        this.items = [this.textFieldWrapper, timeWidget];

        this.callParent(arguments);

        textField.on('focus', function(){
            button.fireEvent('click', button)
        });
    }

});

