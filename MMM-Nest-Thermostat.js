/* global Module */

/* Magic Mirror
 * Module: MMM-Nest-Thermostat
 *
 * By Peter Schmalfeldt
 * MIT Licensed.
 */

Module.register('MMM-Nest-Thermostat', {
	requiresVersion: '2.1.0',

	defaults: {
		animationSpeed: 0,
		updateInterval: 60000,
		roomFilter: null,
		onlineOnly: true,
		size: 'large'
	},

	loaded: false,
	error: null,
	thermostats: [],

	start: function() {
		this.scheduleUpdate(0);
	},

	updateTemps: function () {
		var self = this;

		getTemp(this.config, function (response) {
			if (!response.success || !response.data) {
				self.error = response.message;
			} else {
				self.thermostats = response.data;
			}

			self.loaded = true;
			self.updateDom(self.config.animationSpeed);
		})
	},

	getScripts: function () {
		return [
			this.file('nest.js')
		];
	},

	getStyles: function () {
		return [
			'MMM-Nest-Thermostat.css'
		];
	},

	getDom: function() {
		var self = this;
		var wrapper = document.createElement('div');

		if (this.error) {
			wrapper.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg viewBox="0 0 19.5 18.2" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path transform="translate(-6.2 -6.7)" d="M18.1,24.9H13.8V19.4a2.1,2.1,0,0,1,4.2,0v5.5Zm6-8.1-1.8-1.5v9.5H19.9V19.3a3.9,3.9,0,1,0-7.8,0v5.5H9.6V15.3L7.8,16.8l-1.6-2L16,6.7l4.3,3.6V9.1h2V12l3.4,2.8Z" fill="#666666"/></svg><br />' + this.error;
			wrapper.className = 'dimmed light small';

			return wrapper;
		}

		if (!this.loaded) {
			wrapper.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg viewBox="0 0 19.5 18.2" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path transform="translate(-6.2 -6.7)" d="M18.1,24.9H13.8V19.4a2.1,2.1,0,0,1,4.2,0v5.5Zm6-8.1-1.8-1.5v9.5H19.9V19.3a3.9,3.9,0,1,0-7.8,0v5.5H9.6V15.3L7.8,16.8l-1.6-2L16,6.7l4.3,3.6V9.1h2V12l3.4,2.8Z" fill="#666666"/></svg><br />...';
			wrapper.className = 'dimmed light small';

			return wrapper;
    }

		for (var i = 0; i < this.thermostats.length; i++) {

			var dial = document.createElement('div');
			dial.className = 'thermostat thermostat__' + this.config.size;

			var thermostat = new thermostatDial(dial, {
				size: self.config.size,
				temperature_scale: this.thermostats[i].temperature_scale
			});

			thermostat.where_name = this.thermostats[i].where_name;
			thermostat.has_leaf = this.thermostats[i].has_leaf;
			thermostat.hvac_state = this.thermostats[i].hvac_state;
			thermostat.target_temperature = this.thermostats[i].target_temperature;
			thermostat.ambient_temperature = this.thermostats[i].ambient_temperature;

			wrapper.appendChild(dial);
		}

		return wrapper;
	},

	scheduleUpdate: function() {
		var self = this;
		var delay = (!this.loaded) ? 0 : this.config.updateInterval;

		setTimeout(function() {
			self.updateTemps();
		}, delay);
	}
});
