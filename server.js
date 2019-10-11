var http = require('http');
var port = 8080;

//create a server object:
http.createServer(function (request, response) {

  //Analize URL
  var url = request.url;

  //Clear the url
  var action = url.split('?')[0];
  action = action.slice(-1)=="/" && action!=="/" ? action.substr(0).slice(0, -1) : action;

  //Get params after ? of the URL
  var params = url.split('?')[1];
  if(typeof params !== "undefined"){
    params = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  } else {
    params = null;
  }

  //Get the method of the request to append it to the string
  var method = request.method;

  if(method!=="GET"){
    action = action.concat("-"+method);
  }

  console.log(action);

  //Routing
  switch(action){
    case '/':
      responseJson(true, "Showing home in response", 200);
      console.log("Showing home in console");
      break;
    case '/-POST':
      responseJson(true, "Showing home posting in response", 200);
      console.log("Showing home posting in console");
      break;
    case '/test-1':
      responseJson(true, "Showing Testing URL 1 in response", 200);
      console.log("Showing Testing URL 1 in console");
      break;
    case '/test-2':
      responseJson(true, "Showing Testing URL 2 in response", 200);
      console.log("Showing Testing URL 2 in console");
      break;
    default:
    responseJson(false, "The action is wrong or not implemented", 400);
  }

  function responseJson(success, message,code){
    response.statusCode = code;
    var resp = JSON.parse('{ "success" : '+success+', "params" : '+JSON.stringify(params)+', "message" : "'+message+'", "code" : '+code+' }');
    response.writeHead(response.statusCode, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(resp, null, null));
    response.end();
  }

  response.end();


}).listen(port); //the server object listens on port 8080


console.log("Local server running on port: "+port);
