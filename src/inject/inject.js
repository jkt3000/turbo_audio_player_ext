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

console.log("[Turbo] Starting - waiting for document.ready");
$(document).ready(function(){
  console.log("[Turbo] looking for <audio> tags");
  $('audio, video').each(function(e){
    TurboPlayer.loadTurboControls(this);
  });

  $(".turbo-audio-btn").on('click', function(e){
    e.preventDefault();
    var audio  = $(this).parent().prev()[0];
    var action = $(this).data('action');
    var value  = parseInt($(this).data('value'), 10);

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

  });
});


var TurboPlayer = TurboPlayer || {};
TurboPlayer.loadTurboControls = function(el) {
  console.log("[Turbo] found audio", $(el));
  // add controls
  var rect = $(el)[0].getBoundingClientRect();
  var top   = rect.bottom + 2;
  var left  = rect.left;

  $(el).wrap("<div class='turbo-audio'></div>");
  $(el).after(template);
  $(el).parent().find(".turbo-audio-controls").css({top:top, left: left});
};

var template = "\
<div class='turbo-audio-controls'>\
  <button class='turbo-audio-btn' data-action='rewind' data-value='-60'><<60</button>\
  <button class='turbo-audio-btn' data-action='rewind' data-value='-30'><<30</button>\
  <button class='turbo-audio-btn' data-action='play' data-value='1'>&#9658;</button>\
  <button class='turbo-audio-btn' data-action='pause'>&#9616;&#9616;</button>\
  <button class='turbo-audio-btn' data-action='play' data-value='2'>2x &#9658;</button>\
  <button class='turbo-audio-btn' data-action='play' data-value='4'>4x &#9658;</button>\
  <button class='turbo-audio-btn' data-action='forward' data-value='30'>>></button>\
  <button class='turbo-audio-btn' data-action='forward' data-value='60'>>></button>\
</div>\
";

