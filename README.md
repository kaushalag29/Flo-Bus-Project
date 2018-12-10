# Flo-Bus-Project
## Steps To Follow
1. First The contents of BusList.json files needs to be transacted to blockchain to a particular address.

2. Inorder to send the data use flosendData.html file.Here you can decide whether server should be mainnet or testnet.You just need to change the link of server variable.

3. Open flosend.html file using browser.Enter the sender address and receiver address.(Both can be same)

4. At one time send only 1 bus-route information in ascending order of serviceNumber with prefix(BusLists:) inserted with each bus-route, using https://www.browserling.com/tools/remove-all-whitespace(For removing whitespaces that can lead to out of bound error if not removed).Flo Wallet to be running is required while sending.

Sample flodata will be:

BusLists:{"version":"1.0","serviceNumber":"1","busOperator":"Ashirvad","Source":"Ranchi","Destination":"Bhubaneswar","departureLocation":"KhadgaraBusStand","busType":"2/2AC","deptTime":"4:40PM","fareSeat":"550","via":"Tata,Bariapda,Baleshwar,Bhadrak,Panikoili,Chandil,Cuttak"}

You can get valid sender address using below terminal command:

 flo-cli -testnet listunspent
 
 Inorder to get private address for corresponding Sender address use the below terminal cmd:
 
 flo-cli -testnet dumpprivkey "sender address"

5. Send it and wait for transaction to be confirmed.Send all routes to the same address(that is receiving address will be same for all routes).

6. Change displayAddress variable in app.js file to the reciever address.

7. Now you can open the html file using browser.The information will be displayed/retrieved from blockchain according to higher version no of bus-routes.
