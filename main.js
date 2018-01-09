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
        } 
		else {
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
	
	
function changeCurrentSongDetails(songObj) {
  $('.current-song-image').attr('src','image/' + songObj.image) ;
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
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
	
function addSongNameClickEvent(songObj,position){
	var songName=songObj.fileName;
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
	changeCurrentSongDetails(songObj);
	}});
	}

	
	
	var songs=[
	{
		'name':'Despacito',
		'artist':'Justin Bieber',
		'album':'Despacito',
		'duration':'3:55',
		'fileName':'song1.mp3',
		'image':'song1.jpg'
	},
	{
		'name':'Shape of You',
		'artist':'Ed Sheeran',
		'album':'Shape of You',
		'duration':'3:56',
		'fileName':'song2.mp3',
		'image':'song2.jpg'
	},
	{
		'name':'Cheap Thrills',
		'artist':'Sia',
		'album':'Cheap Thrills',
		'duration':'3:44',
		'fileName':'song3.mp3',
		'image':'song3.jpg'
	},
	{
		'name':'Dusk Till Dawn',
		'artist':'Zayn and Sia',
		'album':'Dusk Till Dawn',
		'duration':'4:27',
		'fileName':'song4.mp3',
		'image':'song4.jpg'
	},
	{
		'name':'I Dont Wanna Live',
		'artist':'Zayn and Taylor',
		'album':'I Dont Wanna Live',
		'duration':'4:16',
		'fileName':'song5.mp3',
		'image':'song5.jpg'
	}
	]
	


window.onload = function() {
	changeCurrentSongDetails(songs[0]);

  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1)
  }
	setInterval(function(){
	updateCurrentTime();
	},1000);
	}
	
	 $('.play-icon').on('click', function() {
        togglesong();
    });
    $('body').on('keypress', function(event) {
                if (event.keyCode == 32) {
                    togglesong();
                }
            });
    