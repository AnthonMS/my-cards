### [Back](/README.md)
# my-slider-v2

## Description

My Slider V2 is a customizable card for light, input_number, number, covers, fans, switches, input_boolean, locks, scripts & media_player volume_level entity sliders, for the Home Assistant Lovelace frontend.

It is completely customizable now and fully templatable.

### Features
- Fully customizable slider card for lights, input_numbers/numbers, media_players, covers, fans, switches, input_booleans, locks and scripts
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
| attribute | string | none | Read/write an entity ATTRIBUTE instead of its state, e.g. `attribute: humidity` on a humidifier. See [Attribute sliders](#attribute-sliders) below. |
| step | string | "1" | Number of steps to take (For input number, if step is not specified, it will use step from attributes.) (For media_player, if step is not specified it will step by 0.01. (It will actually step by 1, but it will convert 27 to 0.27. So if you set a custom step, set it between 0 and 100.)) |
| colorMode (Deprecated: Use 'mode' instead) | string | brightness | Can be brightness, temperature, hue, saturation |
| coverMode (Deprecated: Use 'mode' instead) | string | position | Can be position or tilt |
| mode | string | cover:position, light:brightness | Can be position, tilt, brightness, temperature, hue, saturation, volume & seekbar |
| vertical | boolean | false | This will set the slider to be vertical and handled from bottom to top. Default on covers |
| flipped | boolean | false | This will just flip the slider to go from right to left or top to bottom. Default on covers |
| inverse | boolean | false | Will inverse how far the slider has progressed compared to value. so if brightness is 75%, then it will only be 25% progressed. This is useful for cover, where it is Default. |
| intermediate | boolean | false | If set to `true` the slider updates the entity continuously while dragging. Service calls are throttled (see `intermediateInterval`) so a fast drag doesn't flood Home Assistant. Best for responsive local entities (`input_number`, lights); use with care on slow devices such as covers. |
| intermediateInterval | number | 100 | Only used when `intermediate: true`. Minimum time in milliseconds between updates sent while dragging. Lower = more responsive but more service calls; higher = fewer calls. |
| disableScroll | boolean | true | Disable scrolling on touch devices when starting the touchmove from within the slider (default true for ALL entity types). Set to `false` if you want the page to keep scrolling over the slider. |
| allowTapping | boolean | true | Allow tapping on slider track to activate. If false only dragging by thumb will activate it. |
| marginOfError | number | 10 | Pixel distance the input can be from the thumb if allowTapping is set to false |
| allowSliding | boolean | false | Allow sliding on slider track to activate. This works well in conjuction with allowTapping false. It will only trigger when sliding in direction of slider or if sliding from thumb. |
| slideDistance | number | 10 | Distance input has to travel in slider direction for allowSliding to take effect |
| showMin | boolean | false | Controls how the entity's minimum maps onto the track. **`false`** (default): the minimum is *hidden* — the range is shifted so the whole track is usable, from `min` at the far-left end to `max` at the other. **`true`**: the minimum is *kept visible* — the bar is scaled to the absolute `0..max` range, so an entity with e.g. `min: 80` always shows a bar at least 80% full and only the top portion of the track (here the last 20%) is draggable. In both cases the value written to the entity is correct; `showMin` only changes what the bar shows and how much of the track moves it. |
| showValue | boolean | false | Show a floating bubble with the value the slider points at WHILE dragging/tapping (hidden otherwise), like the native HA slider: it sits just above the card and follows the thumb (vertical sliders: to the right of the card, following vertically). It is `position: absolute`, so it overlaps neighbours instead of shifting layout. The value shown is the REAL entity value — the same number the card writes to Home Assistant, with the `min` offset and any `sliderMin`/`inverse` adjustment already accounted for — after `step` rounding, without a unit. Look/offsets can be overridden with `styles: value:`; setting your own `left` (horizontal) or `top` (vertical) disables the thumb-tracking for fully static placement. **Bubble not showing up at all?** Don't set `overflow: hidden` on `styles: card:` — the bubble sits OUTSIDE the card box, so the card's own overflow clips it away entirely. Put `overflow: hidden` on `styles: container:` instead; that is the right place for it anyway (it clips the progress bar's corners into your border-radius) and does not affect the bubble. The same applies to any ancestor with `overflow: hidden` around the card (themes, layout wrappers, custom_fields of other cards). |
| minThreshold | number | 15 | Only used for determining how much progress should be shown on a switch, lock or script |
| maxThreshold | number | 75 | Only used to determine how far users have to slide to activate toggle commands for switch, lock and script |
| min | number | 0 | Minimum value you can set the entity state |
| max | number | 100 | Maximum value you can set the entity state |
| sliderMin | number | 0 | The minimum percentage progress to show always |
| sliderId | string | `slider-<entity>-<mode>` | The `id` of the slider's container element, for targeting a specific slider from CSS/JS. Note the default is built from the RAW config, so without an explicit `mode:` it ends in `-undefined` (e.g. `slider-light-bedroom-undefined`) — set `sliderId` yourself if you rely on it. The container also always carries `data-value` and `data-progress-percent` attributes with the current slider value/progress. |
| markers | list | none | Draw static reference line(s) on the track, e.g. a visible midpoint on an EQ slider. Each entry is `- value: <n>` on the ENTITY scale (the same scale as `min`/`max`). Positioned exactly where the thumb would sit for that value, so `min`/`showMin`/`sliderMin`/`inverse` are all accounted for. Style every marker with `styles: marker:`; supplying your own `left`/`right` (horizontal) or `top`/`bottom` (vertical) disables the automatic positioning. Absent by default — no element is rendered. See [Markers](#markers). |
| styles | object | [Default styles](/src/cards/styles/my-slider.styles.ts) | Style each component used in the card. Available components: `card`, `container`, `track`, `progress`, `thumb`. Each takes a list of CSS declarations (see Examples); every value is templatable. |


## Attribute sliders

Setting `attribute:` makes the slider read **and** write an entity attribute instead of the
entity's state. This also allows entity domains the card does not otherwise support (for
example `humidifier`).

```yaml
type: custom:my-slider-v2
entity: humidifier.bedroom
attribute: humidity
```

How it works:

- **Reading:** the slider value comes from the entity's attribute (here
  `entity.attributes.humidity`). If the attribute is missing or not a number, the slider
  rests at 0.
- **Range:** many entities expose their allowed range as attributes named
  `min_<attribute>` / `max_<attribute>` — a humidifier exposes `min_humidity` and
  `max_humidity`. When present, the card automatically uses those as the slider range.
  **These are attributes ON THE ENTITY (check Developer Tools → States), not card config
  keys** — you cannot set `min_humidity:` in the card config. To override the range, use
  the card's normal `min:` and `max:` options, which always win:

  ```yaml
  type: custom:my-slider-v2
  entity: humidifier.bedroom
  attribute: humidity
  min: 25   # overrides the entity's min_humidity
  max: 60   # overrides the entity's max_humidity
  ```

  Without `min_<attribute>`/`max_<attribute>` on the entity and without `min:`/`max:` in
  the config, the range defaults to 0–100.
- **Writing:** on release the card calls the domain's `set_<attribute>` service with the
  attribute as the data key — `attribute: humidity` on a humidifier calls
  `humidifier.set_humidity` with `{ humidity: <value> }`. This means the feature works for
  attributes that have a matching `set_<attribute>` service (verify under Developer
  Tools → Actions). It will NOT work for attributes whose service is named differently
  (e.g. cover position uses `set_cover_position` — use the card's normal cover support
  for that).
- **Precedence:** when `attribute:` is set it takes precedence over `mode:` and the
  per-domain behavior. All other options (`step`, `sliderMin`, `showMin`, `vertical`,
  templating, `styles`, ...) work as usual.

## Markers

Opt-in static reference lines on the track. The original ask was an EQ-style slider that
needs a visible 0 dB midpoint, but any "you are here relative to X" marking works.

```yaml
type: custom:my-slider-v2
entity: input_number.eq_band_1
min: -12
max: 12
markers:
  - value: 0        # the 0 dB midpoint
```

Values are on the **entity scale** — the same numbers you would put in `min`/`max` — and
each marker is positioned with the same math that places the thumb. A marker at value `V`
therefore sits exactly where the thumb sits when the entity reads `V`, including when
`min`, `showMin`, `sliderMin` or `inverse` are in play.

Multiple markers are fine; they are plain static `<div>`s, so an EQ board of 24 sliders
costs nothing meaningful:

```yaml
markers:
  - value: -6
  - value: 0
  - value: 6
```

Style them with `styles: marker:` (applies to every marker on that card):

```yaml
markers:
  - value: 50
styles:
  marker:
    - background: red
    - width: 2px
```

Marker lines are `pointer-events: none`, so they never block dragging.

A marker is also a neat way to show where a `switch`/`lock`/`script` slider's
`maxThreshold` sits, so users can see how far they need to slide:

```yaml
type: custom:my-slider-v2
entity: script.turn_off_all_lights
allowTapping: false
maxThreshold: 95
markers:
  - value: 95
```

**Vertical sliders** get a horizontal line across the track instead (the default
`width`/`height` swap automatically). **Out-of-range values** are clamped to the ends and
logged as a warning rather than throwing; a non-numeric value is skipped.

## Script sliders

`entity: script.<name>` turns the slider into a **slide-to-run** control, the same shape as
switch and lock sliders: the bar rests at `minThreshold`, sliding past `maxThreshold` calls
`script.turn_on`, and the slider snaps back. The point is that a script that shouldn't fire
by accident needs a deliberate gesture rather than a tap.

The slider does **not** track the script's state — a script reports `on` while it runs, but
this is a momentary control, so the bar always returns to rest.

```yaml
type: custom:my-slider-v2
entity: script.turn_off_all_lights
allowTapping: false     # require a real slide; a tap does nothing
maxThreshold: 95        # how far right you must slide to fire it
minThreshold: 15        # where the bar rests
```

`allowTapping: false` is the accident-proof configuration and is why this feature exists.
With the default `allowTapping: true` a tap at the far right fires the script immediately,
exactly like switch and lock sliders behave today.

**Do not combine `intermediate: true` with script, switch or lock sliders.** `intermediate`
dispatches on every pointer move, so dragging across the threshold would fire the script
repeatedly. This is pre-existing behavior shared with switch and lock, not specific to
scripts.

**Script variables are not supported.** The card calls `script.turn_on` with only
`entity_id`. If you need to pass fields, wrap the call in a second script for now.

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

  # Show the value in a floating bubble above the thumb while dragging (#23)
  - type: custom:my-slider-v2
    entity: light.bar_spots
    showValue: true
    styles:
      card:
        - height: 50px
      value:
        - font-size: 16px
        - background: 'rgba(255, 255, 255, 0.8)'
        - color: black

  # showValue with a STATIC label centered in the slider instead of following the thumb
  # (setting left yourself turns tracking off)
  - type: custom:my-slider-v2
    entity: light.bar_spots
    showValue: true
    styles:
      value:
        - left: 50%
        - bottom: auto
        - top: 50%
        - transform: translate(-50%, -50%)
```