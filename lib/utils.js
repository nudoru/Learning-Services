let util = require('util'),
    fs   = require('fs');

const
noop     = () => {
};

const log = (res) => console.log(util.inspect(res, false, null));

const runTask = (task) => task.fork(console.warn, log);

const runTaskTime = (label, output, task) => {
  console.time(label);
  task.fork(console.warn, r => {
    console.timeEnd(label);
    if (output) {
      log(r);
    }
  });
};

const writefile = (text, fileName='debug.log') => {
  let log_file   = fs.createWriteStream(__dirname + '/' + fileName, {flags: 'w'}),
      log_stdout = process.stdout;
  log_file.write(util.format(text) + '\n');
  //log_stdout.write(util.format(text) + '\n');
};

const writeTask = (task) => task.fork(console.warn, res => {
  writefile(JSON.stringify(res));
  //log(res);
  console.log('File written!');
});

// Counter will be appended to the end of the anonymized name
let anonymousCounter = 1;
// use either the real name or email as the key and the anonymized name as the value
// so that the same anonymized name is returned for each instance of the learner
let anonymousMap = {};

// Create a simple fake name. Stores the input name to a map so that you get back
// the same fake name each time you call it for a given input name
const anonymizeName = name => {
  // if we've already anonymized this person, return it
  if(anonymousMap.hasOwnProperty(name)) {
    return anonymousMap[name];
  }

  // create new values
  let next = anonymousCounter++,
      firstName = 'FirstName'+next,
      lastName = 'LastName'+next,
      fullName = [firstName, lastName].join(' '),
      email = `${lastName.toLowerCase()}@company.com`,
      mbox = `mailto:${email}`; //xapi style mbox

  // store it in the map
  anonymousMap[name] = {firstName, lastName, fullName, email, mbox};

  return anonymousMap[name];
};

// "Simplify" and anonymize LRS statements
// arry is an array of LRS statements
// key is the actor object propery to use as the basis for anonymization, name or mbox
const anonymizeStatements = (arry, key='name') => arry.map(statement => {
  // pick out only the statement vaules we want, can add/remove if needed
  let {actor, verb, object, id, timestamp, stored, version} = statement,
      anonymized = anonymizeName(actor[key]);

  actor.name = anonymized.fullName;
  actor.mbox = anonymized.mbox;

  return {
    actor, verb, object, id, timestamp, stored, version
  }
});

module.exports = {
  noop,
  log,
  runTask,
  runTaskTime,
  writefile,
  writeTask,
  anonymizeName,
  anonymizeStatements
};