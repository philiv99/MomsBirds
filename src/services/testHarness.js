
import ObservableArray from '../core/util/ObservableArray.js'

function testQueuePackage() {
    var queue = require('queue')
    
    var q = queue()
    var results = []

    q.push(function (cb) {
        results.push('two')
        cb()
    })
    
    q.on('success', function (result, job) {
        console.log(`result: [${result}]`);
    })
    
    q.start(function (err) {
        if (err) throw err
        console.log('all done:', results)
    })
}

function testObservableArray() {

    var utterances = new ObservableArray([]);
  
    utterances.addEventListener("itemadded", function(e) {
      console.log("Added utterance %o.", e.item);
    });
  
    utterances.addEventListener("itemremoved", function(e) {
      console.log("Processing utterance %o.", e.item);
    });
   
    utterances.push("Good Morning")
    console.log("What can I do for you")
    utterances.push("I want to add a bird sighting")
    let cmd = utterances.shift();
    console.log(`[${cmd}]`);
    cmd = utterances.shift();
    console.log(`[${cmd}]`);
}

export default {
    test: function () {
        //testObservableArray();
    }
}