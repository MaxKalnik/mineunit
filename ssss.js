$('body').on('click', 'video', function() {
  $('.video-frame').removeClass('video-frame-invis');

});
$('.video-frame').iframeTracker({
    blurCallback: function(){
        $('.video-frame').removeClass('video-frame-invis');
    }
});
// $('.video-frame').css('transition', 'opacity 2.5s ease-out');
// $('.video-frame-invis').css('opacity', '0');
// $('.play').css('transition', 'opacity .5s ease-out');
$('.video-frame').iframeTracker({
    blurCallback: function(){
        $('.video-frame').removeClass('video-frame-invis');
        $('.play').css('opacity', '0');
    }
});

.video-frame {
  transition: opacity 2.5s ease-out;
}

.video-frame-invis {
  opacity: 0;
}

.play {
  transition: opacity .5s ease-out;
}