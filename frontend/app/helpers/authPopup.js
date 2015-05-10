'use strict';

module.exports = function(url, windowName, callback) {
  var features  = 'location=yes,resizable=yes,scrollbars=yes,status=yes, width=300, height=200';
  var newWindow = window.open(url, windowName, features);

    callback(true);
    // try {
    //  if(newWindow.location.pathname == '/success') {
    //     newWindow.close();      
    //     callback(true);
    //   }
    //   if(newWindow.location.pathname == '/decline') {
    //      newWindow.close();
    //      callback(false);
    //      console.log("*********** FALSE*************");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

}