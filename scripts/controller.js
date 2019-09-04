
var address = document.getElementById('address');
var subscribe = document.getElementById('subscribeTopic');
var connect = document.getElementById('btnConnect');
var disconnect = document.getElementById('btnDisconnect');
var message = document.getElementById('payload');
var publishTopic = document.getElementById('publishTopic');
var publishBtn = document.getElementById('btnPublish');
var subscribeBtn = document.getElementById('btnSubscribe');
var unsubscribeBtn = document.getElementById('btnUnsubscribe');
var Status = document.getElementById('status');

connect.addEventListener('click', function (prevent) {
  prevent.preventDefault();
  connectionCheck = 1;
  client = mqtt.connect(address.value)

  subscribeBtn.addEventListener('click', function (prevent) {
    prevent.preventDefault();
    client.subscribe(subscribe.value, function (err) {
      if (err) {
        swal({
          title: "Error!",
          text: "Oops! Your are not Connected!",
          icon: "error",
          button: "OK",
        });
        Status.innerHTML = "Oops! You are not Connected...";
        Status.style.color = "red";
      } else {
        Status.innerHTML = "Subscribing....";
        Status.style.color = "green";
        var timeStamp = new Date()
        var HStableBody = document.getElementById('subscribeHistoryTablebody');
        var HStr = document.createElement('tr');
        var HSMessageTopic = document.createElement('td');
        var HSMessageTimeStamp = document.createElement('td');
        HSMessageTopic.appendChild(document.createTextNode(subscribe.value));
        HSMessageTimeStamp.appendChild(document.createTextNode(timeStamp));
        HStr.appendChild(HSMessageTopic);
        HStr.appendChild(HSMessageTimeStamp);
        HStableBody.appendChild(HStr);
      };
    });
  });

  unsubscribeBtn.addEventListener('click', function (prevent) {
    prevent.preventDefault();
    client.unsubscribe(subscribe.value);
  });

  client.on("connect", function () {
    Status.innerHTML = "Connected Successfully!";
    Status.style.color = "green";
  });

  client.on("message", function (topic, payload) {
    var timeStamp = new Date()
    var tableBody = document.getElementById('tablebody');
    var tr = document.createElement('tr');
    var MessageTopic = document.createElement('td');
    var MessagePayload = document.createElement('td');
    var MessageTimeStamp = document.createElement('td');
    MessageTopic.appendChild(document.createTextNode(topic));
    MessagePayload.appendChild(document.createTextNode(payload));
    MessageTimeStamp.appendChild(document.createTextNode(timeStamp));
    tr.appendChild(MessageTopic);
    tr.appendChild(MessagePayload);
    tr.appendChild(MessageTimeStamp);
    tableBody.appendChild(tr);

  });

  publishBtn.addEventListener('click', function (prevent) {
    prevent.preventDefault();
    client.publish(publishTopic.value, message.value, function (err) {
      if (err) {
        swal({
          title: "Error!",
          text: "Oops! Your are disconnected!",
          icon: "error",
          button: "OK",
        });
        Status.innerHTML = "Oops! You are not Connected...";
        Status.style.color = "red";
      }
      else {
        var timeStamp = new Date()
        var HPtableBody = document.getElementById('publishHistoryTablebody');
        var HPtr = document.createElement('tr');
        var HPMessageTopic = document.createElement('td');
        var HPMessagePayload = document.createElement('td');
        var HPMessageTimeStamp = document.createElement('td');
        HPMessageTopic.appendChild(document.createTextNode(publishTopic.value));
        HPMessagePayload.appendChild(document.createTextNode(message.value));
        HPMessageTimeStamp.appendChild(document.createTextNode(timeStamp));
        HPtr.appendChild(HPMessageTopic);
        HPtr.appendChild(HPMessagePayload);
        HPtr.appendChild(HPMessageTimeStamp);
        HPtableBody.appendChild(HPtr);
      }
    });
  })

  disconnect.addEventListener('click', function () {
    connectionCheck = 0;
    Status.innerHTML = "Disconnected!";
    Status.style.color = "red";
    client.end();
  });
  
});
