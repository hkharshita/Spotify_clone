console.log('welcome to spotify')

let songIdx=0;
let curIdx=0;
let audioElement=new Audio('songs/1.mpeg');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=document.querySelectorAll('.songItem');
let songItemPlay=document.querySelectorAll('.songItemPlay');
let masterSongName=document.getElementById('masterSongName');


let songs =[
    {songName:"Believer - Imagine Dragons" , filePath:"songs/1.mpeg", coverPath:"covers/1.jpg"},
    {songName:"Levitating -Dua Lipa" , filePath:"songs/2.mpeg", coverPath:"covers/2.jpeg"},
    {songName:"Night changes - One Direction" , filePath:"songs/3.mpeg", coverPath:"covers/3.jpg"},
    {songName:"One Love - SHUBH" , filePath:"songs/4.mpeg", coverPath:"covers/4.jpeg"},
    {songName:"We don't talk anymore - Charlie Puth " , filePath:"songs/5.mpeg", coverPath:"covers/5.jpeg"},
    {songName:"Blue - The Roulette Tour" , filePath:"songs/6.mpeg", coverPath:"covers/6.jpeg"},
    {songName:"sorry - Justin Beiber" , filePath:"songs/7.mpeg", coverPath:"covers/7.jpeg"},
    {songName:"Cheap Thrills - SIA" , filePath:"songs/8.mpeg", coverPath:"covers/8.jpeg"},
    {songName:"Tauba Tauba - Karan Aujla" , filePath:"songs/9.mpeg", coverPath:"covers/9.jpg"},
    {songName:"Lover - Diljit Dosanjh" , filePath:"songs/10.mpeg", coverPath:"covers/10.jpg"},
]

const changeCover=(ele)=>{
     document.querySelector('.songBanner img').src=songs[parseInt(ele.id)].coverPath;
     document.querySelector('.songBanner p').innerText=songs[parseInt(ele.id)].songName;
}

//play song
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//timeUpdate
audioElement.addEventListener(('timeupdate'),()=>{
   let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
   myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(audioElement.duration*myProgressBar.value)/100;
})

songItems.forEach((element,i)=>{
   element.querySelector('img').src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
    let sampleAudio=new Audio(`${songs[i].filePath}`);
    sampleAudio.addEventListener("loadedmetadata",()=>{
        
        element.getElementsByClassName('timeStamp')[0].innerText=Math.round(sampleAudio.duration)/100;
    })
  
    
   
})

const makePlayAll=()=>{
let playBtn=document.querySelectorAll('.songItemPlay');
playBtn.forEach((ele)=>{
    ele.parentElement.style.border='none';
   
    ele.classList.remove('fa-circle-pause');
    ele.classList.add('fa-circle-play');
    
})
}


songItemPlay.forEach((ele)=>{
    ele.addEventListener('click',(event)=>{ 
       
    if(curIdx==event.target.id)
    {
        
        if(ele.classList.contains('fa-circle-pause'))
        {
            ele.classList.remove('fa-circle-pause');
            ele.classList.add('fa-circle-play');
            audioElement.pause();  
            gif.style.opacity=0;
        }else{
            ele.classList.remove('fa-circle-play');
            ele.classList.add('fa-circle-pause');
            audioElement.play(); 
            gif.style.opacity=1;
        }
       
    } else{
        makePlayAll();
        event.target.classList.remove('fa-circle-play');
        event.target.classList.add('fa-circle-pause');
        songIdx=parseInt(event.target.id);
        curIdx=songIdx;
        console.log(event.target.parentElement);
        event.target.parentElement.style.border='#9CDBA6 3px solid';
        

        
        audioElement.src=`songs/${songIdx+1}.mpeg`;
        changeCover(ele);

        
        masterSongName.innerText=songs[songIdx].songName;
         audioElement.currentTime=0;
         audioElement.play();
         gif.style.opacity=1;
         masterPlay.classList.remove('fa-circle-play');
         masterPlay.classList.add('fa-circle-pause');
    }
   
   
    })
})

const changePlayBtn=(songIdx)=>{
makePlayAll();
document.getElementById(`${songIdx}`).classList.remove('fa-circle-play');
document.getElementById(`${songIdx}`).classList.add('fa-circle-pause');

}

document.getElementById('next').addEventListener('click',()=>{
   if( songIdx>=9)
   {
    songIdx=0;
   }
   else{
    songIdx+=1;
   }
  
   audioElement.src=`songs/${songIdx+1}.mpeg`;
  changePlayBtn(songIdx);
  curIdx=songIdx;
   audioElement.currentTime=0;
   audioElement.play();
   gif.style.opacity=1;
   masterSongName.innerText=songs[songIdx].songName;
   masterPlay.classList.remove('fa-circle-play');
   masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if( songIdx<=0)
    {
     songIdx=9;
    }
    else{
     songIdx-=1;
    }
    
    audioElement.src=`songs/${songIdx+1}.mpeg`;
    changePlayBtn(songIdx);
    curIdx=songIdx;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterSongName.innerText=songs[songIdx].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
 })

 


