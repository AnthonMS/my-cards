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
- Animation on click. Make different animation configs for user to choose between. One for ripple, scale out/in for card, scale out/in for icon, loading around icon until action has been performed?.
- **If you would like a new feature, please feel free to create an issue asking for it.**


## Options
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | string | **Required** | `custom:my-slider-v2` |
| entity | string | **Required** | `light.livingroom` |
| layout | string | vertical | Layout of card. Default is horizontal on cover entities. [Beautiful illustration of different layouts](#layouts)  |
| icon | string/object | "lightbulb-outline" | The icon to use. Can be an object like in the example. |
| label | string/object | "entity.friendly_name" | The label text. Can be an object like the icon. Holds text, show and actions |
| slider | object | [Default slider config](/other/docs/slider-v2.md) | The icon to use. Can be an object like in the example. |
| styles | object | [Default styles](#default-styles) | Style each component used in the card. |


## Examples
![Examples](/other/docs/captures/my-button/example-1.png)
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


### Default Styles:
```yaml
styles:
  card:
    - height: '125px'
    - width: '100%'
    - min-width: 'fit-content'
    - background: 'var(--card-background-color)'
  icon:
    - height: '35px'
    - width: '35px'
    - display: 'inline-block'
    - padding: '10px 10px 10px 10px'
    - cursor: 'pointer'
    - color: 'var(--paper-item-active-icon-color)'
  labelWrapper:
    - width: '100%'
    - height: '100%'
    - display: 'flex'
  label:
    - padding: '0'
    - margin: '0 10px'
    - color: 'var(--primary-text-color)'
    - font-weight: 'bold'
  container:
    - padding: '0'
    - margin: '0'
    - display: 'flex'
    - flex-flow: 'column'
    - height: '100%'
  row1:
    - flex: '0 1 auto'
  row2:
    - flex: '1 1 auto'
  row3:
    - flex: '0 1 auto'
    - margin: '0 2px 2px 2px'
  containerColumn:
    - padding: '0'
    - margin: '0'
    - display: 'flex'
    - flex-flow: 'row'
    - height: '100%'
  column1:
    - flex: '1'
  column2:
    - flex: '0'
    - padding: '3px 3px 3px 0'
```

## Layouts
Here you see an illustration of where the different elements are so you can better style them. With the default styles above, you should be able to figure out what and where things go.
I will add more layout options as we go, also are more freestyle layout where you will just have the card and then everything in the root of that to put wherever you want. I'm not good with css, so if anyone has good ideas to layouts I should implement. Then please let me know.

![Layout Illustration](/other/docs/captures/my-button/layouts-illustration.png)

- **row1** will fit content inside
- **row2** will fill the remaining space between row1 and 2
- **row3** will fit content inside (On horizontal layout, this is empty so row2 technically fills all remaining space.)
- label will fit text
- labelWrapper will fill full space
- slider will use all default options from that card. Some styles are set here if it's vertical/cover etc.