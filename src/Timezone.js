Ext.define('Jarvus.form.field.Timezone', {
    extend: 'Ext.form.field.ComboBox',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.XTemplate'
    ],
    xtype: 'jarvus-timezonefield-combo',

    displayField: 'city',
    valueField: 'id',
    forceSelection: true,
    autoLoadOnValue: true,
    queryMode: 'local',
    triggerAction: 'all',
    anyMatch: true,

    store: Ext.create('Ext.data.JsonStore', {
        storeId: 'timezonesStore',
        proxy: {
            type: 'ajax',
            url: Ext.getResourcePath('static/timezones.json', null, 'jarvus-ext-timezonefield'),
            reader: {
                type: 'json',
                rootProperty: 'data',
                transform: {
                    fn: function (data) {
                        var records = [],
                            country, timezone;

                        for (country in data) {
                            if (data.hasOwnProperty(country)) {
                                for (timezone in data[country]) {
                                    if (data[country].hasOwnProperty(timezone)) {
                                        records.push({
                                            id: timezone,
                                            country: country,
                                            city: data[country][timezone]
                                        });
                                    }
                                }
                            }
                        }
                        return records;
                    }
                }
            }
        },
    }),

    listConfig: {
        tpl: [
            '<ul><tpl for=".">',
                '<tpl if="xindex == 1 || this.getGroupStr(parent[xindex - 2]) != this.getGroupStr(values)">',
                    '<li class="x-combo-list-group"><b>{[this.getGroupStr(values)]}</b></li>',
                '</tpl>',
                '<li role="option" class="x-boundlist-item" style="padding-left: 12px">{city}</li>',
                '</tpl>',
            '</ul>',
            {
                getGroupStr: function (values) {
                    return values.country
                }
            }
        ]
    }
});