Ext.require([
    '*',
    'Ext.ux.form.field.TimeWidget',
    'Ext.ux.form.field.TimeWidgetField'
]);


Ext.onReady(function() {

    Ext.create('Ext.Viewport', {


        items: [{
            xtype: 'form',
            border: false,
            bodyPadding: 20,
            fieldDefaults: {
                labelAlign: 'top'
            },
            defaults: {
                width: 400,
                margin: 40
            },
            items: [
                {xtype: 'timewidgetfield'},
                {xtype: 'timewidget', showSeconds: true, inputType: 'numberfield'},
                {xtype: 'timewidget', showSeconds: true, inputType: 'slider'}
            ]
        }]
    });
});