Ext.define('Jarvus.timezone.Field', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'jarvus-timezonefield-combo',

    requires: [
        'Ext.form.field.ComboBox',
        'Jarvus.timezone.Store'
    ],

    displayField: 'city',
    valueField: 'id',
    forceSelection: true,
    autoLoadOnValue: true,
    queryMode: 'local',
    triggerAction: 'all',
    anyMatch: true,

    store: 'jarvus-timezone-store',

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