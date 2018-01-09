$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
	function togglesong(){
	var song = document.querySelector('audio');
        if (song.paused == true) {
            console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        } else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
	}
	function fancyTimeFormat(time)
	{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
	}
	function updateCurrentTime(){
	var song=document.querySelector('audio');
	//console.log(song.currentTime);
	//console.log(song.duration);
	var currentTime=Math.floor(song.currentTime);
	currentTime=fancyTimeFormat(currentTime);
	var duration=Math.floor(song.duration);
	duration=fancyTimeFormat(duration);
	$('.time-elapsed').text(currentTime);
	$('.song-duration').text(duration);
	}
	
	function addSongNameClickEvent(songName,position){
	var id='#song'+position;
	$(id).click(function(){
	var audio=document.querySelector('audio');
	var currentSong=audio.src;
	if(currentSong.search(songName)!= -1)
	{
	togglesong();
	}
	else{
	audio.src=songName;
	togglesong();
	}});
	}

	
	
	var songs=[
	{
		'name':'track1',
		'artist':'justin',
		'album':'solo',
		'duration':'3:56',
		'fileName':'song1.mp3'
	},
	{
		'name':'track2',
		'artist':'justin',
		'album':'solo',
		'duration':'3:56',
		'fileName':'song2.mp3'
	},
	{
		'name':'track3',
		'artist':'justin',
		'album':'solo',
		'duration':'3:56',
		'fileName':'song3.mp3'
	},
	{
		'name':'track4',
		'artist':'justin',
		'album':'solo',
		'duration':'3:56',
		'fileName':'song4.mp3'
	}
	]
	
	//$('.song-name').text(songName);

window.onload = function() {

  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj.fileName,i+1)
  }
	setInterval(function(){
	updateCurrentTime();
	},1000);
	}
	//for (var i = 0; i < fileNames.length ; i++) {
    //addSongNameClickEvent(fileNames[i],i+1)
    //} 
	
	 $('.play-icon').on('click', function() {
        togglesong();
    });
    $('body').on('keypress', function(event) {
                if (event.keyCode == 32) {
                    togglesong();
                }
            });
    