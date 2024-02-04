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
- If user is not actively changing the slider, then it should animate between states.
- **If you would like something made or fixed, please feel free to create an issue asking about it.**


## Options
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | string | **Required** | `custom:my-slider-v2` |
| entity | string | **Required** | `light.livingroom` |
| step | string | "1" | Number of steps to take (For input number, if step is not specified, it will use step from attributes.) (For media_player, if step is not specified it will step by 0.01. (It will actually step by 1, but it will convert 27 to 0.27. So if you set a custom step, set it between 0 and 100.)) |
| colorMode (Deprecated: Use 'mode' instead) | string | brightness | Can be brightness, temperature, hue, saturation |
| coverMode (Deprecated: Use 'mode' instead) | string | position | Can be position or tilt |
| mode | string | cover:position, light:brightness | Can be position, tilt, brightness, temperature, hue, saturation, volume & seekbar |
| vertical | boolean | false | This will set the slider to be vertical and handled from bottom to top. Default on covers |
| flipped | boolean | false | This will just flip the slider to go from right to left or top to bottom. Default on covers |
| inverse | boolean | false | Will inverse how far the slider has progressed compared to value. so if brightness is 75%, then it will only be 25% progressed. This is useful for cover, where it is Default. |
| intermediate | boolean | false | If set to `true` the slider sends immediate updates while sliding. Not recommended by default, since it may generate too many updates. |
| disableScroll | boolean | true | Disable scrolling on touch devices when starting the touchmove from within the slider. Default true on covers. |
| allowTapping | boolean | true | Allow tapping on slider track to activate. If false only dragging by thumb will activate it. |
| marginOfError | number | 10 | Pixel distance the input can be from the thumb if allowTapping is set to false |
| allowSliding | boolean | false | Allow sliding on slider track to activate. This works well in conjuction with allowTapping false. It will only trigger when sliding in direction of slider or if sliding from thumb. |
| slideDistance | number | 10 | Distance input has to travel in slider direction for allowSliding to take effect |
| showMin | boolean | false | Show the minimum on the slider. If false, the min will be far left (if not flipped or vertical) |
| minThreshold | number | 15 | Only used for determining how much progress should be shown on a switch or lock |
| maxThreshold | number | 75 | Only used to determine how far users have to slide to activate toggle commands for switch and lock |
| min | number | 0 | Minimum value you can set the entity state |
| max | number | 100 | Maximum value you can set the entity state |
| styles | object | [Default styles](/src/cards/styles/my-slider.styles.ts) | Style each component used in the card. |


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