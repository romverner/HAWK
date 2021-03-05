# HAWK

This repository is setup to run/test right out of the gate. Simply pull the repo, open up the index.html file in your preferred browser, and open up your developer console to interact with the HAWK module. HAWK.results() will console log all tracked events.

### Tracking Elements
The HAWK.track function takes in an element ID as its parameter. It will automatically attach any listeners based on what type of element it is. As of the time of this writing, the only tracked elements are SPAN's, INPUT's, and BUTTON's.
