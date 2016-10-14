# Auto update module for NWJS 

**Workin in progress** developed as component of [autoEdit_2](https://github.com/OpenNewsLabs/autoEdit_2).

A module to bring auto update functionality for nwjs. 
Using the releases in release section of github project. 

- get author and repo name from package.json (?)
- get current version of local app from package.json 
- get latest release from github repo 
	- compare tag name 
		- if latest on remote greater then local then download
			- download zip or tar
			- unzip and replace current app.nw 
		- else just say is up to date to v number


Inspired by [node-webkit-updater](https://github.com/edjafarov/node-webkit-updater) and [node-webkit-auto-update-demo](https://github.com/shrewdlogarithm/node-webkit-auto-update-demo).

