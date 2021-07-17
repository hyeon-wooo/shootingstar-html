# HTML Shooting Star Effect

![example](./example.gif)

<hr>
This project offer you a function that apply effect like shooting star in the dark sky to any element you want.

## Installation

That's simple. Insert a script tag in the `head` tag like below then you can apply the shooting star effect.

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/gh/bvv8808/shootingstar-html/shootingstar.js"></script>
</head>
```

## Usage

Get a element that you want to apply the shooting star effect.

```html
...
<body>
  ...
  <div id="nightSky"></div>
</body>
...
```

```javascript
const nightSky = document.querySelector("#nightSky");
const shootingStar = new ShootingStar(nightSky);
```

## Usage with options

```javascript
const options = {
  starLength: 40,
  starColor: "#fff",
  distance: 120,
  shootingDuration: 600,
  frequency: 1500,
  minFrequency: 300,
  playWhenCreated: true,
};
const shootingStar = new ShootingStar(nightSky, options);
```

## Options

| name             | type    | default | description                                                                                                                                                       |
| ---------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| starLength       | number  | 40      | How long the star's size is. `px`.                                                                                                                                |
| starColor        | string  | "#fff"  | The color of star                                                                                                                                                 |
| distance         | number  | 120     | How far the star moves. `px`                                                                                                                                      |
| shootingDuration | number  | 600     | How fast the star falls down. `ms`                                                                                                                                |
| frequency        | number  | 1500    | Stars will appear at a random timing (0 ms ~ `frequency`ms). If you want to stars that appear in the same frequency, set `minFrequency` and `frequency` the same. |
| minFrequency     | number  | 300     | To control the timing that stars appear. `ms`                                                                                                                     |
| playWhenCreated  | boolean | true    | When you create a ShootingStar object, the effect is automatically starts. If you don't want that, set 'false'                                                    |

## Methods

### getCurrentOption(parameter)

To get current options of a ShootingStar object.  
`parameter`: single string or array of option keys

```javascript
const s1 = new ShootingStar(target);
console.log(s1.getCurrentOption("starLength")); // --> 40
console.log(s1.getCurrentOption(["starLength", "distance"])); // --> [40, 120]
```

### setStarLength(newStarLength)

To set the length of star you want.  
`newStarLength`: only number

```javascript
const s1 = new ShootingStar(target);
s1.setStarLength(30);
console.log(s1.getCurrentOption("starLength")); // --> 30
```

### setStarColor(newStarColor)

To set the length of star you want.  
`newStarColor`: only string. "#abcabc", "rgb(...)", "yellow"

```javascript
const s1 = new ShootingStar(target);
s1.setStarColor("#f3f3f3");
console.log(s1.getCurrentOption("starColor")); // --> "#f3f3f3"
```

### setDistance(newDistance)

To set the length of star you want.  
`newDistance`: only number

```javascript
const s1 = new ShootingStar(target);
s1.setDistance(100);
console.log(s1.getCurrentOption("distance")); // --> 30
```

#### setShootingDuration

#### setFrequency

#### setMinFrequency

The same usage with above methods. the number of parameter is only one (the new value).
<br>

### stop()

To stop shooting star effect.

### play()

To play shooting star effect.

## Thank you
