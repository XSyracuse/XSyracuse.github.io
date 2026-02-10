


  var websocket;
  
  function initweb()
  {
	document.myform.url.value = "ws://localhost:8080/"
	document.myform.inputtext.value = "!!!???"
	document.myform.disconnectButton.disabled = true;
  }

  function doConnect()
  {
    websocket = new WebSocket(document.myform.url.value);
    websocket.onopen    = function(evt) { onOpen(evt) };
    websocket.onclose   = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror   = function(evt) { onError(evt) };
  }

  function onOpen(evt)
  {
    writeToScreen("connected\n");
	document.myform.connectButton.disabled = true;
	document.myform.disconnectButton.disabled = false;
  }

  function onClose(evt)
  {
    writeToScreen("disconnected\n");
	document.myform.connectButton.disabled = false;
	document.myform.disconnectButton.disabled = true;
  }

  function onMessage(evt)
  {
    writeToScreen("response: " + evt.data + '\n');
    var dau = JSON.parse(evt.data);
    if(dau.pitch == undefined) dau.pitch = 0;
    if(dau.roll == undefined) dau.roll = 0;

    writeToScreen("object pitch: " + dau.pitch + '\n');
    writeToScreen("object  roll: " + dau.roll  + '\n');
    roll = dau.roll;
    pitch = dau.pitch;

    set_fd_roll_pitch(roll,pitch);
  }

  function onError(evt)
  {
    writeToScreen('error: ' + evt.data + '\n');

	websocket.close();

	document.myform.connectButton.disabled = false;
	document.myform.disconnectButton.disabled = true;

  }

  function doSend(message)
  {
    writeToScreen("sent: " + message + '\n'); 
    websocket.send(message);
  }

  function writeToScreen(message)
  {
    document.myform.outputtext.value += message
	document.myform.outputtext.scrollTop = document.myform.outputtext.scrollHeight;

  }

  window.addEventListener("load", initweb, false);


  function sendText() {
		doSend( document.myform.inputtext.value );
  }

  function clearText() {
		document.myform.outputtext.value = "";
  }

  function doDisconnect() {
		websocket.close();
  }



