### [Back](/README.md)
# Setup Dev Environment

1. Clone the repository down on your work PC.
2. Run `npm install` in the project root directory.
3. Serve it by running `npm start`
4. Build it by running `npm run build`
5. Add this to your Home Assistant Configuration (IP is the local IP of the machine you're hosting the card on):
```yaml
    - url: http://<IP>:5000/my-cards.js?v=001
      type: module
```