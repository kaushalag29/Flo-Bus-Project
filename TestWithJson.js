url = "http://192.168.1.20/BusList.json"
var jsonParam = ['id','busOperator','departureLocation','pickupPoint','busType','deptTime','fareSeat','via'];
var busList;
jQuery.get(url,function(data) {
    busList = data;
    busList = busList["BusLists"];
    var busListLength = busList.length;
    var rowNum = 0;
    for(var i=0;i<busListLength;i++){
    	var busInfo = busList[i];
    	var tableElement = document.getElementById("busTable");
    	var row = tableElement.insertRow(rowNum);
    	for(var j=0;j<8;j++){
    		var cell = row.insertCell(j);
    		cell.innerHTML = busInfo[jsonParam[j]]+'';
    	}
    	rowNum++;
    }
});

/*
<tbody>
        <tr id="tableHeader">
            <th>SNo.</th>
            <th>Bus Operator</th>
            <th>Departure Location</th>
            <th>Pickup Point</th>
            <th>Bus Type</th>
            <th>Departure Time</th> 
            <th>Fare Seat</th>
            <th>Via</th>
        </tr>
    </tbody>
*/
