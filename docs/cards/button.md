### [Back](/README.md)
# my-slider-v2

## Description

My Button is a customizable card for lights, covers, switches, for the Home Assistant Lovelace frontend.

It is completely customizable now and fully templatable. But is still very much under development. So be sure to be ready to update config if using this card. Nothing will be removed, but the default styling might change going forward, extra functionality might be added that is not wanted in your setup. I am trying to keep it as pretty and usable as I can make it without configuring it from yaml.

### Features
- Fully customizable button card with built in slider for lights, covers, switches
- Templating
- Styles can be fully customized easily within the card itself

### Future features (Maybe)
- Animation on click. Make different animation configs for user to choose between. One for ripple, scale out/in for card, scale out/in for icon, loading around icon until action has been performed?.
- **If you would like a new feature, please feel free to create an issue asking for it.**


## Options
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | string | **Required** | `custom:my-slider-v2` |
| entity | string | **Required** | `light.livingroom` |
| icon | string/object | "lightbulb-outline" | The icon to use. Can be an object like in the example. |
| label | string/object | "entity.friendly_name" | The label text. Can be an object like the icon. Holds text, show and actions |
| buttons | object | depends on entity type | This is the list of buttons and their config like tap_action etc. You can create as many or few buttons as you desire and have room for in your setup. Just create a 'button'+N where N is anything unique. The key names for the buttons does not matter. So you can just use 'button0', 'button1' and so on. |
| stats | object | depends on entity type | This is a static container that can be used to display a statistic in the top right corner. Default for light is brightness % otherwise it's entity state. You can give the stats container actions like any other component. |
| camera | string | Nothing | This can be set as a camera entity and then it can display the stream in the stats container. Only used with locks. |
| slider | object | [Slider config](/docs/cards/slider-v2.md) | Config for slider inside card. Look at available config keys in readme. Only extra key here is 'show': true/false |
| styles | object | [Button styles](/src/cards/styles/my-button.styles.ts) | Default harcoded styles. For dynamic styles you can inspect the DOM to find css key to style or reference 'initializeStyles' function in [my-button.ts](/src/cards/my-button.ts) |


## Examples
![Examples](/docs/images/my-button/example-1.png)
```yaml
- type: custom:my-button
  entity: light.front_door_spots
  label: Front Door Test
  icon:
    icon: mdi:wall-sconce-flat
    show: true
    tap_action:
      action: toggle
    hold_action:
      action: more-info
  stats:
    show: true
    text: 'Your custom text, can be templated'
    styles:
      container:
        - border-radius: '12px'
      camera:
        - border: '1px solid red'
  buttons:
    show: true
    vertical: false
    button0:
      show: true
      text: 'B1'
      icon: 'mdi:power'
      styles:
        text:
          - color: 'black'
        icon:
          - color: 'orange'
      tap_action:
        action: toggle
  styles:
    card:
      - background: rgba(230, 230, 230, 0.5)
    icon:
      - color: >
          [[[
            if (entity.state == "off") return "rgba(86, 86, 86, 0.5)";
            else return "rgba(253, 216, 53, 1)";
          ]]]
    label:
      - color: rgba(0, 0, 0, 0.75)
  tap_action:
    action: toggle
  hold_action:
    action: more-info
```

## Styling configs
It is possible to nest the styles to give a better overview of the yaml. So with the slider, it is possible to nest all the styles in the slider object like you would when using the slider card by itself.
Likewise, it is possible to style the buttonsContainer, buttons, text and icon for the new buttons directly in the buttons->styles object.
The same with the label and stats.
When doing it nested, the names are a little different since we dont need to specify sliderContainer, now we can just style the 'container' in the slider->styles.

```yaml
Styles can be set to the background of the track by setting it from the styles config in the root:
- type: horizontal-stack
  cards:
    - type: custom:my-button
      entity: lock.front_door
      label: 
        text: Front Door
        extra: Smaller label under
      camera: camera.front_door_cam
      slider:
        show: true
      styles:
        sliderTrack:
          - background: rgba(255, 0, 0, 0.5)

Or by setting it in the track directly on the slider:
- type: custom:my-button
  entity: lock.front_door
  label: 
    text: Front Door
    extra: Smaller label under
  camera: camera.front_door_cam
  slider:
    show: true
    styles:
      track:
        - background: rgba(255, 0, 0, 0.5)

If using the buttons, you can set individual styling for each button. Or set a default for all of them and specify a specific style for one of them:
- type: custom:my-button
  entity: lock.front_door
  label: 
    text: Front Door
    extra: Smaller label under
  camera: camera.front_door_cam
  buttons:
    show: true
    vertical: true
    button0:
      show: true
      icon: mdi:lock
      tap_action:
        action: more-info
      styles:
        container:
          - background: rgba(0, 0, 255, 0.5)
    button1:
      show: true
      icon: mdi:lock-open
      tap_action:
        action: more-info
    styles:
      button:
        - background: rgba(255, 0, 0, 0.5)
  slider:
    show: true
    styles:
      track:
        - background: rgba(255, 0, 0, 0.5)
  styles:
    sliderTrack:
      - background: rgba(255, 0, 0, 0.5)
```

## Layouts
The illustration the button card is outdated and might still change further. So I will postpone creating another until I am certain that is the final layout of the card. Though I am pretty sure the one it currently has is going to be the final.