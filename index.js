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
    rawLogFile = require('./lyndaraw.json');

const sendTestStatement = () => {
  let fragment = {
    subjectName: 'Blue Berry',
    subjectID  : 'blueberry@pietown.com',
    verbDisplay: 'completed',
    objectName : 'Filling the pies',
    objectType : 'course',
    objectID   : 'http://pietown.com/Apple_Pie_Filling_101'
  };

  //sendStatement(config.webservice.lrs, createStatement(fragment)).fork(console.warn, log);
  sendFragment(config.webservice.lrs)(fragment).fork(console.warn, log);
};

const queryStatements = () => {
  //requestStatements(config.webservice.lrs)(createAgentEmailQuery('mperkins@redhat.com')).fork(console.warn, log);
  requestAllStatements(config.webservice.lrs)(createAgentEmailQuery('tepatel@redhat.com')).fork(console.warn, res => {
    //console.log(JSON.stringify(res));
    writefile(JSON.stringify(res));
    console.log('got statments', res.length);
  });
};

//setLRSOptions(config.webservice.lrs);
//sendTestStatement();
//queryStatements();

//['statement.verb.display.en-US']: 'loggedin'

// console.log(createAggregateQuery({['statement.verb.display.en-US']: 'completed'}))

// Will extract and write all statements from the given LRS store
// writeTask(requestAggregate(config.webservice.lrs, createAggregateQuery()));

// writeTask(requestAggregate(config.webservice.lrs, createAggregateQuery({
//  ['statement.actor.mbox']        : 'mailto:mperkins@redhat.com'
// })));


let anon = anonymizeStatements(rawLogFile, 'mbox');
writefile(JSON.stringify(anon), 'lynda-anon.log');