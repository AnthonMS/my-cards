### [Back](/README.md)
# Installation
### HACS
1. Add this repo to HACS ([Detailed explanation](https://github.com/AnthonMS/my-cards/issues/17))
2. Install
3. Add something like this to the configuration (Ignore this if you do it through the UI):
```yaml
    - url: /hacsfiles/my-cards/my-cards.js
      type: module
```

### Manually
1. Download my-slider.js located in dist/ directory
2. Place it in your HA www/ directory
3. Add something like this to the configuration (Ignore this if you do it through the UI):
```yaml
    - url: /local/my-cards.js
      type: module
```