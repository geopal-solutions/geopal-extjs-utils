geopal-extjs-utils
==================


##TimeWidget (Ext.ux.form.field.TimeWidget)

Displays time widget as sliders or numberpickers depending on specified options. 

Initialization: 
```javascript
Ext.create('Ext.ux.form.field.TimeWidgetField', configurationObject);
```

Configuration options
```javascript
var configurationObject = {
  setToCurrentTimeButton: true, // show 'Set current time' button
  value: '11:12:13', // use passed value as initial time unless time string is invalid
  useCurrentTime: true, // use current time as initial time value
  timeLabel: 'My time picker', // field label
  increment: 1, // increment/decrement step
  inputType: 'slider' //input type, supported options: [slider, numberfield]
}
```

###Example
####1. TimeWidget with sliders:
```javascript
Ext.create('Ext.ux.form.field.TimeWidgetField', {
  setToCurrentTimeButton: true,
  useCurrentTime: true,
  timeLabel: 'My time picker',
  increment: 1,
  inputType: 'slider' 
});
```

####2. TimeWidget with number pickers:
```javascript
Ext.create('Ext.ux.form.field.TimeWidgetField', {
  setToCurrentTimeButton: false,
  value: '01:02:03',
  inputType: 'slider' 
});
```
