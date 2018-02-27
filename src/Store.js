Ext.define('Jarvus.timezone.Store', {
    extend: 'Ext.data.Store',
    singleton: true,


    storeId: 'jarvus-timezone-store',
    type: 'json',
    proxy: {
        type: 'ajax',
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


    constructor: function() {
        this.callParent(arguments);

        // Temporary fix until getResroucesPath issue is resolved
        // @todo remove timezones.json from ontrayap.com
        this.getProxy().setUrl(Commerce.API.getHostUrl() + '/timezones.json');
        // Ext.getResourcePath('static/timezones.json', null, 'jarvus-ext-timezonefield'));
    }
});
