/**
 * @docauthor lukaszjajesnica@geopal-solutions.com
 *
 * timewidget provides functionality for setting time
 *
 * @example
 *  var action = Ext.create('Ext.ux.form.field.TimeWidget',{
 *      setToCurrentTimeButton: true,
 *      useCurrentTime: true,
 *      timeLabel: 'My time picker',
 *      increment: 1,
 *      inputType: 'slider'
 *  });
 *
 *
 **/

Ext.define('Ext.ux.form.field.TimeWidget', {

    requires: [
        'Ext.slider.Single',
        'Ext.form.field.Number'
    ],

    /**
     * @cfg {String} extend
     */
    extend: 'Ext.container.Container',

    /**
     * @cfg {Integer} minWidth
     */
    minWidth: 200,

    /**
     * @cfg {String|Integer} height
     */
    height: 'auto',

    /**
     * @cfg {Boolean} hidden
     */
    hidden: false,

    /**
     * @cfg {String} layout
     */
    layout: 'vbox',

    /**
     * @cfg {Boolean} border
     */
    border: false,

    /**
     * @cfg {Array} alias
     */
    alias: ['widget.timewidget'],

    /**
     * contains the String of the time HH:MM
     *
     * @cfg {String} value
     */
    value: '',

    /**
     * @var {cfg} languageSettings
     */
    languageSettings: {
        hourLabel: 'Hours',
        minuteLabel: 'Minutes',
        secondLabel: 'Seconds',
        currentTimeButton: 'Set to current time'
    },

    /**
     * shows set to current time button
     * @cfg {Boolean} showToCurrentTimeButton
     */
    showToCurrentTimeButton: true,

    /**
     * @cfg {Boolean} useCurrentTime
     */
    useCurrentTime: false,

    /**
     * @var {Object} setToCurrentTimeButton
     */
    setToCurrentTimeButton: null,

    /**
     * @var {Boolean} showSeconds
     */
    showSeconds: false,

    /**
     * @var {String} timeLabel
     */
    timeLabel: '',

    /**
     * @var {String} hourSlider
     */
    hourSlider: '',

    /**
     * @var {String} hourSlider
     */
    minuteSlider:'',

    /**
     * @var {String} secondSlider
     */
    secondSlider:'',

    /**
     * @var {String} timeLabelValue
     */
    timeLabelValue: '{timeLabel}{hour}:{minute}:{second}',

    /**
     * @var {String} timeLabelValue
     */
    timeLabelValueWithoutSeconds: '{timeLabel}{hour}:{minute}',

    /**
     * @var {int} increment
     */
    increment: 1,

    /**
     * @var {Object} valueField
     */
    valueField: null,

    /**
     * @var {String} valueFieldName
     */
    valueFieldName: 'ActionValueEntered',

    /**
     * @var {String} inputType - has two possible options [slider(default), numberfield (splitter)]
     */
    inputType: 'slider',

    /**
     *
     * @param hour
     * @param minute
     * @param second
     */
    setTimeLabelText: function(hour, minute, second){
        this.timeLabel.setText(new Ext.Template(this.timeLabelValue).apply({
            hour: this.padNumber(hour),
            minute: this.padNumber(minute),
            second: this.padNumber(second),
            timeLabel: 'Time: '
        }));
        this.updateValueField(hour, minute, second);
    },

    /**
     *
     * @param hour
     * @param minute
     * @param second
     */
    updateValueField: function(hour, minute, second){
        var value = [hour, minute, second].join(':');
        this.valueField.setValue(value);
    },

    /**
     * returns current time Object
     * @returns {{hours: number, minutes: number}}
     */
    getCurrentTimeObject: function(){
        var date = new Date();
        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        };
    },

    /**
     * returns time Object based on passed time String
     * @param timeString
     * @returns {{hours: *, minutes: *}}
     */
    timeStringValueToObject: function(timeString){
        var timeArr = Ext.String.trim(timeString).split(':');
        if(!Ext.isEmpty(timeArr) && (timeArr.length >= 2)){
            return {
                hours: timeArr[0],
                minutes: timeArr[1],
                seconds: timeArr[2] ? timeArr[2] : '00'
            }
        } else {
            return this.getCurrentTimeObject();
        }

    },

    /**
     * returns field control type
     * @returns {string}
     */
    getFieldType: function(){
        return this.inputType === 'slider' ? 'Ext.slider.Single' : 'Ext.form.field.Number';
    },

    checkInputType : function(){
        if(this.inputType.indexOf(['slider', 'numberfield']) > -1){
            Ext.Error.raise('Input type is wrong. Allowed input conntrols: slider, numberfield.');
        }
    },

    initComponent: function(){
        var scope = this;
        var timeObject = {};

        this.checkInputType();
        this.value = Ext.String.trim(this.value);

        if(!this.showSeconds){
            this.timeLabelValue = this.timeLabelValueWithoutSeconds;
        }


        if(this.value && this.useCurrentTime){
            Ext.Error.raise('Set either useCurrentTime or value.');
        } else{
            if(this.useCurrentTime && Ext.isEmpty(this.value)){
                timeObject = this.getCurrentTimeObject()
            } else {
                timeObject = this.timeStringValueToObject(this.value);
            }
        }

        if(Ext.Object.isEmpty(timeObject)){
            Ext.Error.raise('Set either useCurrentTime or value.');
        }
        /**
         * hidden value field - keeps widget value
         * @type {Ext.form.field.Hidden}
         */
        this.valueField = Ext.create('Ext.form.field.Hidden', {
            name: this.valueFieldName
        });

        this.timeLabel = Ext.create('Ext.form.Label', {
            style: 'font-weight:bold;display:block;margin:10px 0 10px 0;'
        });

        this.setTimeLabelText(timeObject['hours'], timeObject['minutes'], timeObject['seconds']);

        this.hourSlider = Ext.create(this.getFieldType(), {
            value: timeObject['hours'],
            minValue: 0,
            maxValue: 23,
            width: 250,
            tip: true,
            increment: this.increment,
            listeners: {
                change: function(field){
                    scope.setTimeLabelText(
                        field.getValue(),
                        scope.minuteSlider.getValue(),
                        scope.secondSlider.getValue()
                    );
                }
            }
        });

        this.minuteSlider = Ext.create(this.getFieldType(), {
            value: timeObject['minutes'],
            minValue: 0,
            maxValue: 59,
            width: 250,
            tip: true,
            increment: this.increment,
            listeners: {
                change: function(field){
                    scope.setTimeLabelText(
                        scope.hourSlider.getValue(),
                        field.getValue()
                    );
                }
            }
        });

        this.secondSlider = Ext.create(this.getFieldType(), {
            value: timeObject['seconds'],
            minValue: 0,
            maxValue: 59,
            width: 250,
            tip: true,
            increment: this.increment,
            listeners: {
                change: function(field){
                    scope.setTimeLabelText(
                        scope.hourSlider.getValue(),
                        scope.minuteSlider.getValue(),
                        field.getValue()
                    );
                }
            }
        });


        if(this.showToCurrentTimeButton){
            this.setToCurrentTimeButton = Ext.create('Ext.button.Button', {
                text: this.languageSettings.currentTimeButton,
                style: 'text-align: center',
                listeners: {
                    click: function(){
                        timeObject = scope.getCurrentTimeObject();
                        scope.setTimeLabelText(timeObject['hours'], timeObject['minutes'], timeObject['seconds']);
                        scope.hourSlider.setValue(timeObject['hours']);
                        scope.minuteSlider.setValue(timeObject['minutes']);
                        scope.secondSlider.setValue(timeObject['seconds']);
                    }
                }
            });
        }

        if(this.inputType === 'slider'){
            this.items = [
                {xtype: 'label', text: this.languageSettings.hourLabel},
                this.hourSlider,
                {xtype: 'label', text: this.languageSettings.minuteLabel},
                this.minuteSlider,
                this.showSeconds ? {xtype: 'label', text: this.languageSettings.secondLabel} : null,
                this.showSeconds ? this.secondSlider : null,
                this.timeLabel,
                this.setToCurrentTimeButton,
                this.valueField
            ];
        } else {
            var additionalProperties = {width: 50, margin: '0 20 0 0'};
            this.items = [{
                xtype: 'container',
                layout: 'hbox',
                items: [
                    Ext.apply(this.hourSlider, additionalProperties),
                    Ext.apply(this.minuteSlider, additionalProperties),
                    this.showSeconds ? Ext.apply(this.secondSlider, additionalProperties) : null
                ]
            },

                this.timeLabel,
                this.setToCurrentTimeButton,
                this.valueField
            ];
        }


        this.callParent(arguments);
    },

    /**
     *
     * @param number
     * @returns {String}
     */
    padNumber: function(number){
        number = parseInt(number);
        return (number<10)?'0'+number.toString():number;
    },

    /**
     *
     * @param value
     */
    setValue: function(value){
        this.value = value;

        var timeObject = {};

        timeObject = this.timeStringValueToObject(this.value);
        this.setTimeLabelText(timeObject['hours'], timeObject['minutes']);
        this.hourSlider.setValue(timeObject['hours']);
        this.minuteSlider.setValue(timeObject['minutes']);
        this.secondSlider.setValue(timeObject['seconds']);
    },

    /**
     *
     * @returns {String}
     */
    getValue: function(){
        return [
            this.padNumber(this.hourSlider.getValue()),
            this.padNumber(this.minuteSlider.getValue()),
            this.padNumber(this.secondSlider.getValue())
        ].join(':')
    }
});
