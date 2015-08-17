var fs = require('fs');
module.exports = function (request, response) {
    response.writeHead(200, {'Content-type': 'text/html'});
    console.log('client request URL: ', request.url);
    
    //find url extension
    var len = request.url.length;
    var ext = '';
    var index;
    for(var i = 0; i < len ; i++)
    {
        if (request.url[i] == '.')
        {
            index = i;
        }
        if (i > index)
        {
            ext += request.url[i];
        }
    }

    //if url request has the name of the '/private/' folder, it will return ext empty, which will give a file not found!
    var hide = request.url;
    if(hide.match(/\/private\//g))
    {
        ext = '';
    }
    // console.log('this is i: ' + ext);
    // this is how we do routing:
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body

            response.end(); // finished!
        });
    } 
    else if(ext == '')
    {
        response.writeHead(404);
        response.end('File not found!!!');   
    }
    else if(ext == 'css')
    {
        var localURL = './stylesheets' + request.url;
        fs.readFile(localURL, 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/css'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(ext == 'jpg') {
        var localURL = '.' + request.url;
        console.log(localURL);
        fs.readFile(localURL, function (errors, contents){
            response.writeHead(200, {'Content-Type': 'image/jpg'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(ext == 'html') {
        var localURL = './html' + request.url;
        console.log('html : ' +localURL);
        fs.readFile(localURL, 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    } 
}