# Moodle/Totara Web Service Utilities

A collection of JavaScript modules to interact with a Moodle or Totara LMS with extras for a LearningLocker LRS.

## Important notes about version 2

- The calendar service no longer fetches the catalog and appends that data to calendar events.
- The catalog service only returns the catalog, not a map with categories, unique categories for the data and unique mode of deliveries. These may be calculated with the getUniqueKeys function in the utilities file
- Methods return a Task rather than a Promise.

## Notes

- The project is set up for a Node.js environment. The 'isomorphic-fetch' polyfill is used for requests.
- This code utilizes ES6
- There is a little bit of functional JS from Folktake (Task, etc.) and Ramda.
- `index.js` loads a `config.json` file which supplies the endpoint and tokens. Refer to the `config.sample.json` file for an example.

Contact: Matt Perkins, mperkins@redhat.com

## Dev Note

Developed and tested on Node 6.5.

These modules are written in ES6 and may require Babel to properly bundle for browser environments. Several modules make use of ES2016 Array methods that may need to be polyfilled for older environments.

Array.inludes()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

Array.findIndex()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex