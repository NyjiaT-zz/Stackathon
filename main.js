//peer connection object
let peerConnection;

//stream for user and peer they want to connect to
let localStream;
let remoteStream;

//specify server to generate iCE candidates
let servers = {
  iceServers: [
    {
      urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
    }
  ]
}

let init = async () => {
  //set localStreat to the mediadevice prefered by the user
  localStream = await navigator.mediaDevices.getUserMedia({audio:false, video:true});

  //set remoteStream to using peer2peer connection
  remoteStream = new MediaStream()

  //set streamms to specified DOM elements
  document.getElementById('user-1').srcObject = localStream
  document.getElementById('user-2').srcObject = remoteStream
}

let createOffer = async () => {
  //create the peer connection object with the server we created for negotiations
  peerConnection = new RTCPeerConnection(servers)
}

init()

