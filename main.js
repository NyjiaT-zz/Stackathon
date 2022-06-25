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


  //set streamms to specified DOM elements
  document.getElementById('user-1').srcObject = localStream
}

let createOffer = async () => {
  //create the peer connection object with the server we created for negotiations
  peerConnection = new RTCPeerConnection(servers)

  //set remoteStream to using peer2peer connection
  remoteStream = new MediaStream()
  document.getElementById('user-2').srcObject = remoteStream

  //add local stream audioand video tracks to peer connection
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream)
  });

  peerConnection.onTrack = async (evt) => {
    evt.streans[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track)
    })
  }

  peerConnection.onicecandidate = async (evt) => {
   // check if ICE candidate exists
    if(evt.candidate){
      //once a candidate is generated update the offer (which is set as localDescription)
      document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)
    }
  }

  //create sdp offer for peer connection
  let offer = await peerConnection.createOffer();

  //add offer to peer connection
  await peerConnection.setLocalDescription(offer)

  //stringify JSON offer object to be parsed
  document.getElementById('offer-sdp').value = JSON.stringify(offer)
}

init()

//run createOffer function when create-offer button is clicked
document.getElementById('create-offer').addEventListener('click',createOffer)
