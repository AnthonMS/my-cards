### [Back](/README.md)
# my-slider-v2

## Description

My Slider V2 is a customizable card for light, input_number, covers, fans, switches, locks & media_player volume_level entity sliders, for the Home Assistant Lovelace frontend.

It is completely customizable now and fully templatable.

### Features
- Fully customizable slider card for lights, input_numbers, media_players, covers, fans, switches, and locks
- Templating
- Styles can be fully customized easily within the card itself
- Vertical
- Flipped
- Inverse

### Future features (Maybe)
- Text inside slider (Should be easily done with this new slider)
- Radius attribute to set how close to the thumb user has to be when allowTapping is set to false
- If user is not actively changing the slider, then it should animate between states.
- **If you would like a new feature, please feel free to create an issue asking for it.**


## Options
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | string | **Required** | `custom:my-slider-v2` |
| entity | string | **Required** | `light.livingroom` |
| colorMode | string | brightness | Can be brightness, temperature, hue, saturation |
| coverMode | string | position | Can be position or tilt |
| vertical | boolean | false | This will set the slider to be vertical and handled from bottom to top. Default on covers |
| flipped | boolean | false | This will just flip the slider to go from right to left or top to bottom. Default on covers |
| inverse | boolean | false | Will inverse how far the slider has progressed compared to value. so if brightness is 75%, then it will only be 25% progressed. This is useful for cover, where it is Default. |
| intermediate | boolean | false | If set to `true` the slider sends immediate updates while sliding. Not recommended by default, since it may generate too many updates. |
| disableScroll | boolean | true | Disable scrolling on touch devices when starting the touchmove from within the slider. Default true on covers. |
| allowTapping | boolean | true | Allow tapping on slider track to activate. If false only dragging by thumb will activate it. |
| marginOfError | number | 10 | Pixel distance the input can be from the thumb if allowTapping is set to false |
| allowSliding | boolean | true | Allow sliding on slider track to activate. (Not yet done) |
| showMin | boolean | false | Show the minimum on the slider. If false, the min will be far left (if not flipped or vertical) |
| minThreshold | number | 15 | Only used for determining how much progress should be shown on a switch or lock |
| maxThreshold | number | 75 | Only used to determine how far users have to slide to activate toggle commands for switch and lock |
| min | number | 0 | Minimum value you can set the entity state |
| max | number | 100 | Maximum value you can set the entity state |
| styles | object | [Default styles](#default-styles) | Style each component used in the card. |


## Examples
![Examples](/docs/images/my-slider-v2/examples.png)
```yaml
- type: custom:my-slider-v2
  entity: light.bar_spots
  allowTapping: false
  styles:
    card: 
      - height: 50px
    track:
      - background: >
          [[[
            if (entity.state == "off") return "red";
            else return "green";
          ]]]
      
- type: custom:my-slider-v2
  entity: light.bar_spots
  flipped: true
  styles:
    card: 
      - height: 50px

- type: custom:my-slider-v2
  entity: light.bar_spots
  inverse: true
  styles:
    card: 
      - height: 50px

- type: horizontal-stack
  cards:
    - type: custom:my-slider-v2
      entity: cover.livingroom_blind_1
      styles:
        card: 
          - height: 200px
          - width: 50px
          
    - type: custom:my-slider-v2
      entity: light.bar_spots
      vertical: true
      styles:
        card: 
          - height: 200px
          - width: 50px

  - type: custom:my-slider-v2
    entity: input_number.test_6
    vertical: true
    styles:
      card: 
        - height: 200px
        - width: 50px

  - type: custom:my-slider-v2
    entity: input_number.test_6
    vertical: true
    showMin: true
    styles:
      card: 
        - height: 200px
        - width: 50px
```


### Default Styles:
```yaml
styles:
  card:
    - height: '30px'
  container:
    - width: '100%'
    - height: '100%'
    - position: 'relative'
    - overflow: 'hidden'
    - border-radius: '5px'
  track:
    - width: '100%'
    - height: '100%'
    - position: 'relative'
    - background: 'var(--card-background-color)'
  progress:
    - height: '100%'
    - background: 'var(--paper-item-icon-active-color)'
    - position: 'absolute'
    - width: '0.00%' # This will be where the progress is before it finds the actual state on load. Otherwise it's handled by the slider obviously.
  thumb:
    - height: '100%'
    - background: 'black'
    - position: 'absolute'
    - right: '-5px'
    - width: '10px'
```