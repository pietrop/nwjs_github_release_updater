//https://github.com/request/request
var request	= require('request');
// https://nodejs.org/api/zlib.html#zlib_zlib
var	zlib 	= require('zlib');
var fs 		= require('fs');
var out 	= fs.createWriteStream('app.nw');

var author 	= "OpenNewsLabs";
var repo 	= "autoEdit_2";

//fetch json from github 
//https://api.github.com/repos/OpenNewsLabs/autoEdit_2/releases
// "https://api.github.com/repos/"+author+"/"+repo+"/releases"

//get current release from package.json 
var currentReleaseVerion  = "1.0.3"

//set user agent header as requested by github api 
var options = {
  url: "https://api.github.com/repos/"+author+"/"+repo+"/releases",
  headers: {
    'User-Agent': 'request'
  }
};

request(options, function (error, response, body) {

  if (!error && response.statusCode == 200) {
  	//convert list of releases to json 
  	var body = JSON.parse(body);
  	// github api returns an array of release objects, first one is the most recent one 
  	var latestRelease = body[0];
  	//compared tag_name with 
  	if(latestRelease.tag_name == currentReleaseVerion){
  		//url for latest project release or latestRelease.tarball_url
  		var urlForLatestRelease = latestRelease.zipball_url;
  		// console.log(urlForLatestRelease);

  		//TODO: figure out how to download and zip file 
  		//download zip file 
  // 		var optionsSecondReq = {
  // 			method: 'GET',
		//   	url: urlForLatestRelease,
		//   	gzip: true,
		//   	headers: {
		//     	'User-Agent': 'request'
		//   	}
		// };


		// request(optionsSecondReq, function (error, response, body) {}).pipe(zlib.createGunzip()).pipe(out);
		downloadFromUrl(urlForLatestRelease, "app", function(){
			console.log("done")
		})
		//TODO: Figure out how to unzip zip file

  	}
  }
})




//get currentReleaseVersion from package.json
// var currentReleaseVerion = 


//check 
// response[0].tag_name == currentReleaseVerion //"1.0.3"


//download zip 
// response[0].zipball_url


function downloadFromUrl (url, path, callback) {
  request({
  		uri: url, 
  				headers: {
		    	'User-Agent': 'request'
		  	}
		  })
      .pipe(fs.createWriteStream(path))
      .on('close', function() {
        callback();
      });
}