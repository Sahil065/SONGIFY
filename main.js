//function to show main  and hide welcome-screen
$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        //checking whether name is valid or not
		if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
			//fetchSongs();
        } else {
            $('#name-input').addClass('error');
			alert("INVALID NAME \nNAME SHOULD BE OF MINIMUM THREE LETTERS");
        }
    });
	
var flag=0;
//user can type name of the song instead of speaking
$('.text-input button').on('click',function(){
	var textdata=$('#text1').val();
	console.log(textdata);
      var matchIndex = 0 ;
      for(var i =0; i < songs.length ; i++) {
        // Lower case both song names
        var isMatch = songs[i].name.toLowerCase().match(textdata.toLowerCase()) ;
        if(isMatch !=null) {
          matchIndex = i ;
		  flag=0;
		  break;
        }
		else{
			 flag=1;
		}
      }
	
	  changeCurrentSongDetails(songs[matchIndex]);
	   splay(songs[matchIndex]);
	 if(flag==1){
		 alert("Song Not Found");
		 togglesong();
	 }
	   });

//to go back to welcome-screen
$('.back_img').on('click', function() {
		togglesong();
		 $('.main').addClass('hidden');
          $('.welcome-screen').removeClass('hidden');
	});

//function to show time-left of current song	
$('.song-duration').on('click', function() {
$('.song-duration').addClass('hidden');
$('.time-left').removeClass('hidden');
	});
		
//function to show duration of song
$('.time-left').on('click', function() {
		 $('.time-left').addClass('hidden');
          $('.song-duration').removeClass('hidden');
	});

//function to play or pause a song
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
	

//function to play or pause a song using voice
function splay(sub){
	var song = document.querySelector('audio');
		song.src=sub.fileName;
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

//to convert seconds into minutes
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
	

//showing current song details
function changeCurrentSongDetails(songObj) {
  $('.current-song-image').attr('src','image/'+ songObj.image) ;
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
  $('.current-song-artist').text(songObj.artist) ;
}

//showing current time ,time left and song duration	
function updateCurrentTime(){
	var song=document.querySelector('audio');
	//console.log(song.currentTime);
	//console.log(song.duration);
	var currentTime=Math.floor(song.currentTime);
	var x=currentTime;
	currentTime=fancyTimeFormat(currentTime);
	var duration=Math.floor(song.duration);
	var y=duration;
	duration=fancyTimeFormat(duration);

	var timeleft=y-x;
	timeleft=fancyTimeFormat(timeleft);
	$('.time-elapsed').text(currentTime);
	$('.song-duration').text(duration);
	$('.time-left').text( "-" + timeleft);
	}
	
//to play selected song
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

	
//song array	
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
		'duration':'4:26',
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
		'name':"I Don't Wanna Live",
		'artist':'Zayn and Taylor',
		'album':"I Don't Wanna Live",
		'duration':'4:16',
		'fileName':'song5.mp3',
		'image':'song5.jpg'
	}
	]
	
//displaying number of songs in playlist
$('.total').text('TOTAL: ' + songs.length +' SONGS');

//function to load playlist
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
	

/*

url of ajax request isnt working  

var songs=[];
$('.total').text('TOTAL: ' + songs.length);
	function setupApp() {
  changeCurrentSongDetails(songs[0]);

  setInterval(function() {
    updateCurrentTime() ;
  }) ;


  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1) ;
  }
}
function fetchSongs() {

      $.ajax({
             url: 'https://jsonbin.io/b/59f713154ef213575c9f652f',
        'dataType': 'json',
        'method': 'GET',
        'success': function (responseData) {
          songs = responseData ;
		  setupApp();
          console.log(responseData) ;
        }
      }) ;

    }
*/
  

//to play song when user click play icon 
 $('.play-icon').on('click', function() {
        togglesong();
    });

//play or pause song using P key
    $('body').on('keypress', function(event) {
                if (event.keyCode == 80 || event.keyCode == 112 ) {
                    togglesong();
                }
            });
	
  
//SpeechRecognition object
var recognition= new webkitSpeechRecognition();
	
//capturing user voice
$('#start_img').on('click', function () {
    // This will make your browser start
    // listening to the user
	finalText='';
    recognition.start();
  }) ;
  
	

	
//issuing final result
    var finalText = '' ;
    recognition.onresult = function(event) {
      for (var i = event.resultIndex; i < event.results.length; ++i) {

        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript;
        }
      }

    };

//calling wit	
 recognition.onend = function () {
      // call wit
      callWit(finalText) ;
    }
	

//main function to play song using voice	
 function callWit(text) {
        $.ajax({
         url: 'https://api.wit.ai/message',
         data: {
           'q': text ,
           'access_token' :'5HYHTA44Z2IBUAMTX4QFIQXMCABH66W4'
         },
         dataType: 'jsonp',
         method: 'GET',
         success: function(response) {
             console.log("success!", response);
			 if(response.entities.intent[0].value == 'play') {
        // Change current song to first song
         if(response.entities.hasOwnProperty('search_query')) {
      var songName = response.entities.search_query[0].value ;
      var matchIndex = 0 ;
      for(var i =0; i < songs.length ; i++) {
        // Lower case both song names
        var isMatch = songs[i].name.toLowerCase().match(songName.toLowerCase()) ;
        if(isMatch !=null) {
          matchIndex = i ;
        }
      }
    }
	changeCurrentSongDetails(songs[matchIndex]) ;
        splay(songs[matchIndex]);
      }
	  else {
		  togglesong();
	  }
	   }
		});
	}