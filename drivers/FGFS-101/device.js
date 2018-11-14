'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroFloodSensor extends ZwaveDevice {

	onMeshInit() {

		this.registerCapability('alarm_water', 'SENSOR_ALARM');
		this.registerCapability('alarm_tamper', 'SENSOR_ALARM');

		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
			multiChannelNodeId: 1,
			reportParser: report => {
                if (report['Sensor Type'] !== 'Temperature (version 1)') return null;

                return report['Sensor Value (Parsed)'];
			}
		});
		this.registerCapability('measure_battery', 'BATTERY');

		this.registerSetting('temperature_measure_hysteresis', value => value * 10);
		this.registerSetting('temperature_measure_offset', value => value * 100);
		this.registerSetting('low_temperature_threshold', value => value * 100);
		this.registerSetting('high_temperature_threshold', value => value * 100);
	}

}

module.exports = FibaroFloodSensor;
