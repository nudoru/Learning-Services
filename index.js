let Task                             = require('data.task'),
    {curry, concat}                  = require('ramda'),
    config                           = require('./config.json'),
    {
      setLRSOptions,
      setStatementDefaults,
      createStatement,
      sendStatement,
      sendFragment,
      createAgentEmailQuery,
      requestStatements,
      requestAllStatements,
      requestAggregate,
      createAggregateQuery
    }                                = require('./lib/learningservices/lrs/LRS'),
    {
      noop,
      runTask,
      runTaskTime,
      writefile,
      writeTask,
      anonymizeName,
      anonymizeStatements
    }                                = require('./lib/utils'),
    rawLogFile = require('./lyndaraw.json'); // load a previous query of all non-anonymized statements

// Get all statements for a user from the LRS store
const queryStatements = () => {
  requestAllStatements(config.webservice.lrs)(createAgentEmailQuery('mperkins@redhat.com')).fork(console.warn, res => {
    //console.log(JSON.stringify(res));
    writefile(JSON.stringify(res));
    console.log('got statments', res.length);
  });
};


let anon = anonymizeStatements(rawLogFile, 'mbox');
// Write the output to a file
writefile(JSON.stringify(anon), 'lynda-anon.log');