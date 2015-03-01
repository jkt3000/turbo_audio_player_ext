chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});


var TP = TP || {};
TP.loadTurboControls = function(el) {
  // add controls
  var rect = el.getBoundingClientRect();
  var top   = rect.bottom + 2;
  var left  = rect.left;

  var div = document.createElement('div');
  div.className = "turbo-audio";

  // el.wrap()
  TP.wrap(div, el);

  // el.after(template);
  var wrapper = el.parentNode;
  wrapper.innerHTML = wrapper.innerHTML + TP.template;

  // find .turob-audio-controls & set styles
  var ctrlEl = wrapper.childNodes[0].nextSibling;
  ctrlEl.style.top = top;
  ctrlEl.style.left = left;

  // init listener for this div
  for(var i = 0; i < ctrlEl.childNodes.length; i++) {
    ctrlEl.childNodes[i].addEventListener('click', TP.buttonListener);
  }

};

TP.wrap = function(wrapper, el) {
  var parent = el.parentNode;
  var sibling = el.nextSibling;
  wrapper.appendChild(el);
  if (sibling) {
    parent.insertBefore(wrapper, sibling);
  } else {
    parent.appendChild(wrapper);
  }
};

TP.template = "<div class='turbo-audio-controls'>" +
  "<button class='turbo-audio-btn' data-action='rewind' data-value='-60'><< <small>60</small></button>" +
  "<button class='turbo-audio-btn' data-action='rewind' data-value='-30'><< <small>30</small></button>" +
  "<button class='turbo-audio-btn turbo-btn-primary' data-action='play' data-value='1'>&#9658;</button>" +
  "<button class='turbo-audio-btn turbo-btn-danger' data-action='pause'>&#9616;&#9616;</button>" +
  "<button class='turbo-audio-btn' data-action='play' data-value='2'><small>2x</small>&#9658;</button>" +
  "<button class='turbo-audio-btn' data-action='play' data-value='4'><small>4x</small>&#9658;</button>" +
  "<button class='turbo-audio-btn' data-action='forward' data-value='30'><small>30</small> >></button>" +
  "<button class='turbo-audio-btn' data-action='forward' data-value='60'><small>60</small> >></button>" +
"</div>";

TP.buttonListener = function(e) {
  e.preventDefault();
  var btn    = e.currentTarget;
  var action = btn.attributes['data-action'].value;
  var value  = parseInt(btn.attributes['data-value'] && btn.attributes['data-value'].value, 10);
  var audio  = e.currentTarget.parentNode.previousSibling;

  switch (action) {
    case 'rewind':
      audio.currentTime += value;
      break;
    case 'forward':
      audio.currentTime += value;
      break;
    case 'play':
      audio.playbackRate = value;
      if (audio.paused) {
        audio.play();
      }
      break;
    case 'pause':
      audio.pause();
      break;
    default: break;
  }
};


onDomReady(function(){

  // check for audio tags
  console.log("[Turbo] Looking for audio tags");
  var els = document.getElementsByTagName('audio');
  for (var i = 0; i < els.length; i++) {
    var audioEl = els[i];
    console.log("Found ", audioEl);
    // if
    TP.loadTurboControls(audioEl);
  };

  // check for video but only with class = 'media'
  console.log("[Turbo] Looking for video.media tags");
  var els = document.getElementsByTagName('video');
  for (var i = 0; i < els.length; i++) {
    var audioEl = els[i];
    if (audioEl.getAttribute('name') !== 'media') { return; }
    console.log("Found ", audioEl);
    TP.loadTurboControls(audioEl);
  };


})


  // $(".turbo-audio-btn").on('click', function(e){
  //   e.preventDefault();
  //   var audio  = $(this).parent().prev()[0];
  //   var action = $(this).data('action');
  //   var value  = parseInt($(this).data('value'), 10);

  //   switch (action) {
  //     case 'rewind':
  //       audio.currentTime += value;
  //       break;
  //     case 'forward':
  //       audio.currentTime += value;
  //       break;
  //     case 'play':
  //       audio.playbackRate = value;
  //       if (audio.paused) {
  //         audio.play();
  //       }
  //       break;
  //     case 'pause':
  //       audio.pause();
  //       break;
  //     default: break;
  //   }

  // });




