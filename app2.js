//Global Variables
var displayAddress = "oKv51tWdZWJyMJfVCtQoTo2FxrPicPtWbe";	//reading floData from transactions made to this address
var id_contents_map = new Map();	//to store contents of bus route with repsect to its service type number
//var jsonParam = ['version','serviceNumber','busOperator','Source','Destination','departureLocation','busType','deptTime','fareSeat','via'];

function convertStringToInt(string){
	return parseInt(string,10);
}

function convertStringToFloat(string){
	return parseFloat(string);
}

function compareVersion(newVer,oldVer){
	if(newVer > oldVer)
		return true;
	return false;
}

let ajax = function (uri, params, req_type, callback) {
            let url = `https://testnet.flocha.in/${uri}`;
			console.log(url);
			
			let response = {};
			var http = new XMLHttpRequest();
            http.open(req_type, url, true);

            http.onreadystatechange = function () { //Call a function when the state changes.
                if (http.readyState == 4 && http.status == 200) {
                    response.success = true;
                    response.data = http.responseText;
                    callback(response.data);
                } else {
                    //response.data = http.responseText;
                    response.success = false;
                }
            }

            http.send(params);
        }

function getTransactions(address){
	//Getting an array of transactions
	var uri = "api/txs/?address="+address;
	try {
            let res = ajax(uri, null, 'GET', function (response) {
                try {
                      let data = JSON.parse(response);
                      console.log(data["txs"]);
                      getDataFromTransactions(data["txs"]);
                } catch (error) {
                        console.log(error);
                    }
                });
    } catch (error) {
                console.error(error);
        }
}

function getDataFromTransactions(txid){
	//Getting Flodata from transactions
	console.log(txid);
	var len = txid.length;
	//console.log(len);
	//console.log(txid[0]["floData"]);
	for(var i=0;i<len;i++){
		var transaction = txid[i];
		var transactionData = transaction["floData"];
		console.log(transactionData);
		if(transactionData.startsWith('BusLists:')){

			try{
				transactionData = JSON.parse(transactionData.split('BusLists:')[1]);
			}catch(error){
				console.log(error);
				continue;
			}
			console.log(transactionData,typeof transactionData);
			if(transactionData["info"] === undefined)
				continue;
			transactionData = transactionData["info"].split('$');
			console.log(transactionData);
			var uniqueId = convertStringToInt(transactionData[1]);
			console.log(uniqueId);
			if(id_contents_map.get(uniqueId) === undefined){
				id_contents_map.set(uniqueId,transactionData);
			}
			else{
				var oldVer = convertStringToFloat(id_contents_map.get(uniqueId)[0]);
				var newVer = convertStringToFloat(transactionData[0]);
				if(compareVersion(newVer,oldVer))
					id_contents_map.set(uniqueId,transactionData);
			}
		}
	}

	console.log(id_contents_map);
	displayBusList();

}

function displayBusList(){
	var rowNum = 0;
	for(var i=1;i>=1;i++){
		if(id_contents_map.get(i) === undefined)
			break;
		var tableElement = document.getElementById("busTable");
    	var row = tableElement.insertRow(rowNum);
    	for(var j=2;j<10;j++){
    		var cell = row.insertCell(j-2);
    		cell.innerHTML = id_contents_map.get(i)[j]+'';
    	}
    	rowNum++;
	}
}

getTransactions(displayAddress);