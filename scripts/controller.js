// basic functionalities
var address = document.getElementById('address');
var subscribe = document.getElementById('subscribeTopic');
var connect = document.getElementById('btnConnect');
var disconnect = document.getElementById('btnDisconnect');
var message = document.getElementById('payload');
var publishTopic = document.getElementById('publishTopic');
var publishBtn = document.getElementById('btnPublish');
var subscribeBtn = document.getElementById('btnSubscribe');
var unsubscribeBtn = document.getElementById('btnUnsubscribe');

connect.addEventListener('click', function (prevent) {
  prevent.preventDefault();
  client = mqtt.connect(address.value)

  subscribeBtn.addEventListener('click', function (prevent) {
    prevent.preventDefault();

    client.subscribe("mqtt/" + subscribe.value)
  });

  unsubscribeBtn.addEventListener('click',function(prevent){
    prevent.preventDefault();

    client.unsubscribe("mqtt/" + subscribe.value);
  });

  client.on("connect", function () {
    var status = document.getElementById('status');
    status.innerHTML = "Connected Successfully!";
  });

  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    var timeStamp = new Date();
    console.log(timeStamp);
    var tableBody = document.getElementById('tablebody');
    var tr = document.createElement('tr');
    var MessageTopic = document.createElement('td');
    var MessagePayload = document.createElement('td');
    var MessageTimeStamp = document.createElement('td');
    MessageTopic.appendChild(document.createTextNode(subscribe.value));
    MessagePayload.appendChild(document.createTextNode(payload));
    MessageTimeStamp.appendChild(document.createTextNode(timeStamp));
    tr.appendChild(MessageTopic);
    tr.appendChild(MessagePayload);
    tr.appendChild(MessageTimeStamp);
    tableBody.appendChild(tr);

  });

  publishBtn.addEventListener('click', function (prevent) {
    prevent.preventDefault();

    client.publish("mqtt/" + publishTopic.value, message.value);
  })

  disconnect.addEventListener('click', function () {
    var status = document.getElementById('status');
    status.innerHTML = "Disconnected!";
    client.end();
  });

})


// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
