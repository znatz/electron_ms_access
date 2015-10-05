var ipc = require('ipc');


ipc.on('gotData', function(data) {
    
    var str = "";
    json = data.records[0];

    var i = 0;
	Object.keys(json).forEach(function(key) {
		bgcolor = 'background-color:rgba(' + i + ','  + i + ',' + i + ', 1);';

		f = 255 - i;
		fgcolor = 'color:rgba(' + f + ','  + f + ',' + f + ', 1);';
        if(json.hasOwnProperty(key)) {
        	str +=  '<label style="display:inline-block;border:solid 1px black;width:150px;text-align:right;padding:1px;height:20px;' + bgcolor + fgcolor + '">' 
        		+  key + '</label><input type="text" value="' + json[key] + '"/><br/>';
    	}
    	i += 5;
    });

 
    document.getElementById('container').innerHTML = str;
});