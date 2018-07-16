# MMM-Nest-Thermostat

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Add Nest Thermostats to Magic Mirror.

![screenshot](https://peter.build/magic-mirror/mmm-nest-thermostat.png)

## Installation

```bash
cd /path/to/MagicMirror
git clone https://github.com/manifestinteractive/MMM-Nest-Thermostat ./modules/MMM-Nest-Thermostat
```

## Generate Nest Token

You will need to run this for the `config.token` param.

```bash
cd ./modules/MMM-Nest-Thermostat
./getNestToken.sh
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: 'MMM-Nest-Thermostat',
      position: 'lower_third',
      config: {
        token: 'xxxxxxxxxx',
        size: 'medium',
        onlineOnly: true,
        roomFilter: ['Downstairs']
      }
    }
  ]
}
```

## Configuration options

Option           | Type      | Default | Description
-----------------|-----------|---------|--------------------------------------------------------------
`animationSpeed` | `int`     | `0`     | Fade In Animation Speed
`updateInterval` | `int`     | `60000` | Frequency Update
`roomFilter`     | `array`   | `null`  | Only show Thermostats with these room names
`onlineOnly`     | `boolean` | `true`  | Only show Thermostats that are currently online
`size`           | `string`  | `large` | One of the following sizes: `large`, `medium`, `small`, `mini`
