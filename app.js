(function () {

    return {
        events: {
            'app.activated': 'showDefect'
        },

        requests: {
            getStory: function (type, id) {
                return {
                    url: this.setting('baseURL') + '/rest-1.v1/Data/' + type + "?Accept=application/json&sel=Number,Name,Status,Team,AssetState,Timebox,AssetState,Scope,ChangeDate,CreateDate,Custom_ClientSeverity&where=Number='" + id + "'",
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'Authorization': "Bearer " + this.setting('apiToken') },
                    proxy_v2: true
                };
            },
            updateTicket: function (data) {
                return {
                    url: '/api/v2/tickets/'+ this.ticket().id() + '.json',
                    type: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                     proxy_v2: true                    
                };
            },
        },

        showDefect: function () {
            this.hideFeilds();
            var v1Number = this.ticket().customField('custom_field_' + this.setting('defectFeild') + '');
            var type = null;
            if (!v1Number) {
                // do nothing!
            } else if (v1Number.indexOf('D-') > -1) {
                type = "Defect";
            } else if (v1Number.indexOf('B-') > -1) {
                type = "Story";
            }
            if (!type) {
                this.switchTo('defect-info', {});
            } else {
                this.ajax("getStory", type, v1Number)
                    .then(function (resp) {
                        var userStory = resp.Assets[0].Attributes;
                        var translatedUS = this.translateValues(userStory);
                        this.updateTicketWithV1(translatedUS);
                        this.switchTo('defect-info', { userStory: translatedUS });
                    });
            }
        },
    
        //function to hide feilds from ticket view
        hideFeilds: function () {
            this.ticketFields('custom_field_' + this.settings.statusFeild + '').hide();
            this.ticketFields('custom_field_' + this.settings.releaseFeild + '').hide();
            this.ticketFields('custom_field_' + this.settings.clientSeverity + '').hide();
        },
    
        // function to update feilds on ticket
        updateTicketWithV1: function (userStory) {
         var updateInfo = {ticket:{status:"open"}}
         this.ajax('updateTicket', updateInfo).done(function (data) {
                console.log(data);
            });
        },

        // function to translate values for V1 and apply proper CSS.
        translateValues: function (userStory) {
            var assetKeys = {
                0: 'Future',
                64: 'Active',
                128: 'Closed',
                200: 'Template(Dead)',
                208: 'Broken Down(Dead)',
                255: 'Deleted(Dead)'
            };

            var statusKeys = {
                'In Progress': 'pending',
                'Defined': 'pending',
                'Queued': 'pending',
                'Invistigating': 'pending',
            };

            if (userStory['Custom_ClientSeverity.Name'].value == 3) {
                userStory.sevCss = 'open'
            }

            if (userStory['Custom_ClientSeverity.Name'].value == 2) {
                userStory.sevCss = 'new'
            }

            if (userStory['Custom_ClientSeverity.Name'].value == 1) {
                userStory.sevCss = 'pending'
            }

            if (!userStory['Status.Name'].value) {
                userStory['Status.Name'].value = "Queued";
            }

            userStory.css = statusKeys[userStory['Status.Name'].value];
            if (!userStory.css) {
                userStory.css = 'new';
            }
            userStory.AssetState.value = assetKeys[userStory.AssetState.value];
            if (userStory.AssetState.value == 'Closed' && userStory['Status.Name'].value != "Declined") {
                userStory.css = 'Open';
                userStory['Status.Name'].value = 'Released';
            }
            if (userStory['Status.Name'].value == 'In Progress') {
                userStory['Status.Name'].value = 'Active';
            }
            return userStory;
        }
    };

} ());
