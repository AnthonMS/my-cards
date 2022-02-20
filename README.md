# slider-card

## Update Notes

This is the new repo for all my upcoming cards.
Right now it only has the "my-slider" card.
It will have a lot of other cards in the future.

## Description

Slider Card is a customizable card for light, input_number, covers, fans, switches, locks & media_player volume_level entity sliders, for the Home Assistant Lovelace frontend.
**Please read the notes at the bottom of this readme, there are some important styling tips, because the padding on the thumb works in mysterious ways (Using border styling)**  
Everything under function in the options table is css styling, so it is possible to use any of the supported ways of setting styles. For example for width, height and paddings you can use '%', 'px', 'rem' and so on. And the same for colors, you can use hex, rgb and named.

### Features
- Customizable slider card for lights, input_numbers, media_players, covers, fans, switches, and locks
- It can handle both brightness and warmth of light
- It can handle custom min, max and step for input_number
- It will toggle switches and locks when slid (slide-to-unlock style)

### Future features (Maybe)
- Customizable Percentage Text inside slider.
- Multiple entities (Right now you can only put one light entity in each card).
- **If you would like a new feature, please feel free to create an issue asking for it.**

### My Setup Using This

![Example Setup](/slider-card-captures/my-use-case.JPG)

### Demo
![Example](/slider-card-captures/ha-slider-card-demo.gif)

## Options
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | string | **Required** | `custom:my-slider` |
| entity | string | **Required** | `light.living_room` |
| intermediate | boolean | false | If set to `true` the slider sends immediate updates while sliding. Not recommended by default, since it may generate too many updates. |
|toggle_scroll| boolean | false | Disable page scroll when touchevent starts inside slider and enable when touch stops again. (Disable page scrolling when using the slider. This is gonna be used a lot when vertical sliders are a thing) |
| lockTrack | boolean | false | Locks the track on the slider allowing only the thumb to be interactive |
|minBar| int | 0 | Set minimum value slider bar will display for `media_player`, `fan`, and `cover` entities |
|maxBar| int | 100 | Set maximum value slider bar will display for `media_player`, `fan`, and `cover` entities |
|minSet| int | 0 | Set minimum value entity can change |
|maxSet| int | 100 | Set maximum value entity can change |
| step | string | "1" | Number of steps to take (For input number, if step is not specified, it will use step from attributes.) (For media_player, if step is not specified it will step by 0.01. (It will actually step by 1, but it will convert 27 to 0.27. So if you set a custom step, set it between 0 and 100.)) |
| radius | string | "4px" | Border radius of slider. |
| function | string | "Brightness" | Function of the slider (Brightness/Warmth) |
| width | string | 100% | Width of slider |
| height | string | 50px | Height of slider |
| top | string | 0px | Top position of slider |
| bottom | string | 0px | Bottom position of slider |
| right | string | 0px | Right position of slider |
| left | string | 0px | Left position of slider |
| rotate | string | 0 | Rotation in degrees. Just put 90, if you want to rotate it 90 degrees |
| containerHeight | string | 50px | Height of container slider is in. This is used if you want vertical slider |
| mainSliderColor | string | var(--accent-color) | Main color of slider |
| mainSliderColorOff | string | #636363 | Main color of slider when inactive |
| secondarySliderColor | string | #4d4d4d | Secondary color of slider |
| secondarySliderColorOff | string | #4d4d4d | Secondary color of slider when inactive |
| thumbWidth | string | 25px | Width of thumb |
| thumbHeight | string | 80px | Height of thumb |
| thumbColor | string | #FFFFFF | Color of thumb |
| thumbColorOff | string | #969696 | Color of thumb when inactive |
| thumbHorizontalPadding | string | 10px | Horizontal padding of the thumb |
| thumbVerticalPadding | string | 20px | Vertical padding of thumb |

## Installation
### HACS
1. Add this repo to HACS (Detailed explanation ([#17][i17]))
2. Install
3. Add something in the line of this to the configuration:
```yaml
    - url: /hacsfiles/my-cards/my-cards.js
      type: module
```

### Manually
1. Download my-slider.js located in dist/ directory
2. Place it in your HA www/ directory
3. Add something in the line of this to the configuration:
```yaml
    - url: /local/my-cards.js
      type: module
```

## Examples

#### Default

```yaml
cards:
  - type: custom:my-slider
    entity: light.example
```

#### Adjust Warmth of Light

```yaml
cards:
  - type: custom:my-slider
    entity: light.example
    function: "Warmth"
```

#### use for Input Number

```yaml
cards:
  - type: custom:my-slider
    entity: input_number.example
```

```yaml
cards:
  - type: custom:my-slider
    entity: input_number.example
    step: "10"
```

![Default Slider Config](/slider-card-captures/default.JPG)

#### Change Slider Height and Colors

```yaml
cards:
    - type: custom:my-slider
      entity: light.dinner_table_light
      height: '30px'
      mainSliderColor: 'green'
      secondarySliderColor: 'red'
```

![Change Slider Height and Colors Config](/slider-card-captures/colors-height.JPG)

#### Change Thumb Size and Colors

```yaml
cards:
  - type: custom:my-slider
    entity: light.dinner_table_light
    height: '30px'
    mainSliderColor: 'blue'
    secondarySliderColor: 'darkblue'
    thumbWidth: '25px'
    thumbHeight: '60px'
    thumbColor: 'black'
```

![Change Thumb Height and Colors Config](/slider-card-captures/thumb-colors-height.JPG)

#### Change Thumb Padding and Size

```yaml
cards:
###########  LEFT SLIDER  ############
  - type: custom:my-slider
    entity: light.dinner_table_light
    height: '30px'
    mainSliderColor: 'green'
    secondarySliderColor: 'red'
    thumbWidth: '0px'
    thumbHeight: '30px'
    thumbColor: 'pink'
    thumbHorizontalPadding: '0px'
    thumbVerticalPadding: '0px'

###########  RIGHT SLIDER  ############
  - type: custom:my-slider
    entity: light.sofa_light
    height: '30px'
    mainSliderColor: 'blue'
    secondarySliderColor: 'darkblue'
    thumbWidth: '5px'
    thumbHeight: '30px'
    thumbColor: 'black'
    thumbHorizontalPadding: '0px'
    thumbVerticalPadding: '0px'

```

![Change Thumb Height and Colors Config](/slider-card-captures/thumb-padding-2.JPG)

#### Change Active and Inactive Colors Config

```yaml
cards:
  - type: custom:my-slider
    entity: light.dinner_table_light
    mainColor: red
    mainColorOff: darkred
    secondarySliderColor: blue
    secondarySliderColorOff: darkblue
    thumbColor: white
    thumbColorOff: black
```

![Change Active and Inactive Colors Config](/slider-card-captures/thumb-colors-change.gif)

#### Using a `Switch` or `Lock`

By adjusting the maxSet you can adjust when a release causes the entity to be toggled.
In this example the user would only need to slide 70% of the way to activate this lock

```yaml
cards:
  - type: custom:my-slider
    entity: lock.lock
    maxSet: 70
```



![Change Active and Inactive Colors Config](/slider-card-captures/switch-lock-example.gif)
### NOTE

When changing the padding of the thumb. If you want for example padding on the sides (horizontal) you will have to triple the width of the thumb itself, this has something to do with the border styling. There is possibly a way around this, if I use some more time on the styling, but for now, this will have to do, since it serves the purpose I need it for. Plus if you just keep this in mind, there should be no trouble. But play around with it. This includes when wanting padding on top/bottom (vertical), you will have to change height of the thumb.

For the colors, you can use HEX colors ('#111111'), color names supported by CSS ('red', 'blue', 'black', etc.) and I assume you can also use rgb ('rgb(255, 255, 255)') and rgba ('rgba(255, 255, 255, 0.5)'). rgba is used when you want to change the opacity, this is the last number in the comma seperated list, where 1 is full opacity and 0 is full transparency.







## Setup Dev Environment

1. Clone the repository down on your work PC.
2. Run `npm install` in the project root directory.
3. Serve it by running `npm start`
4. Build it by running `npm run build`
5. Add this to your Home Assistant Configuration (IP is the local IP of the machine you're hosting the card on):
```yaml
    - url: http://<IP>:5000/my-cards.js?v=001
      type: module
```
