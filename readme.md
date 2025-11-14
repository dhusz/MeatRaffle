# Meat Raffle WebSocket Display System

This project uses simple HTML, JavaScript, and a Node.js WebSocket server to coordinate two browser pages:

* ** controller.html ** — The operator selects cards and sends them to the display.
* ** display.html ** — Shown on a TV or projector; animates each revealed card.
* ** server.js ** — A small WebSocket server that relays messages between all connected clients.

---

## 📄 File Descriptions

### ** 1. server.js **

    A lightweight WebSocket relay server.It:

* Accepts WebSocket connections on`ws://<your-ip>:8080`.
* Broadcasts any message from one client to all other connected clients.
* Stores and returns the latest card state, so reconnecting clients stay in sync.

### ** 2. controller.html **

    Used by the game operator.It:

* Shows radio - button selectors to quickly choose a card.
* Sends the chosen card to the WebSocket server.
* Includes an ** Undo ** button.
* Shows the currently selected card.

### ** 3. display.html **

    Displayed on a TV / projector.It:

* Animates the reveal of each card.
* Shows a placeholder when waiting for a card.
* Syncs back to the server on reconnect and loads the current card state.

---

## ▶️ How to Run the System

### ** 1. Start the WebSocket Server **

    Make sure you're inside the directory containing `server.js`.

        ```bash
node server.js
```

The server listens on port ** 8080 **.

---

## 🌐 Finding Your Local Network IP Address(Mac)

You need your LAN IP so other devices(iPad, TV, phones) can connect.

    Run:

```bash
ifconfig | grep inet
```

Look for something like:

    ```
inet 192.168.1.61
```

That is the IP you will use.

---

## 🖥️ Using the App in the Browser

### ** Using Localhost on the Same Machine **

    If controller ** and ** display are on the same Mac:

* Open:

    * `http://localhost:3000/controller.html`
    * `http://localhost:3000/display.html`
    * WebSocket will connect using:

```js
  new WebSocket('ws://localhost:8080');
  ```

### ** Using On Another Device(like iPad) **

    If display is on your iPad:

* On your Mac run`live-server`(or any static server)
    * On the iPad open Safari and go to:

```
  ```

[http://192.168.1.61:3000/display.html](http://192.168.1.61:3000/display.html)

````
    - Ensure`server.js` is running, and both pages point to:
```js
  new WebSocket('ws://192.168.1.61:8080');
````

---

## 📺 Showing display.html on a TV

There are **two** reliable methods:

### **Method 1: AirPlay + Extended Display Mode (recommended)**

1. On Mac, open **System Settings > Displays**.
2. Select your TV.
3. Change to **Extend Display** (NOT mirror).
4. Drag your browser window to the TV screen.
5. Press **F11** in Chrome to enter Full Screen.

### **Method 2: Chrome Full Screen (Not true kiosk but works with AirPlay)**

1. Drag the browser to the extended display.
2. Press **F11** for full screen.

---

## 🖼️ Chrome Kiosk Mode (Only works on the primary display)

If you want real kiosk mode:

```bash
    / Applications / Google\ Chrome.app / Contents / MacOS / Google\ Chrome \
--kiosk http://localhost:3000/display.html
```

⚠️ **Note:** macOS only shows kiosk windows on the primary screen, so kiosk mode cannot be forced onto a TV via AirPlay.

---

## 🎯 Summary of Terminal Commands

### **Start the node WebSocket server**

```bash
node server.js
    ```

### **Run the static web server** (if using live-server)

```bash
live-server --port=3000
    ```

### **Find your local IP**

```bash
ifconfig | grep inet
    ```

### **Launch Chrome in kiosk mode**

```bash
    / Applications / Google\ Chrome.app / Contents / MacOS / Google\ Chrome--kiosk http://localhost:3000/display.html
```

---