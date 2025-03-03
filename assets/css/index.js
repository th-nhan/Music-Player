const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd= $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')

const randomBtn =$('.btn-random')

const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Không thể say',
            singer: 'HIEUTHUHAI',
            path:'./assets/music/KhongTheSay-HIEUTHUHAI.mp3',
            image:'./assets/img/anh1.jpg'
        },
        {
            name: 'Dù cho tận thế',
            singer: 'Erik',
            path:'./assets/music/DuChoTanThe-Erik.mp3',
            image:'./assets/img/anh3.jpg'
        },
        {
            name: 'Exist sign',
            singer: 'HIEUTHUHAI',
            path:'./assets/music/ExitSign-HIEUTHUHAI.mp3',
            image:'./assets/img/anh2.jpg'
        },
        {
            name: 'Mất kết nối',
            singer: 'Dương Domic',
            path:'./assets/music/MatKetNoi-DuongDomic.mp3',
            image:'./assets/img/anh4.jpg'
        },
        {
            name: 'Tự hào màu áo lính',
            singer: 'Thái Học',
            path:'./assets/music/TỰHÀOMÀUÁOLÍNH -THÁI HỌC.mp3',
            image:'./assets/img/anh5.jpg'
        },
        {
            name: 'Tiến hay lùi',
            singer: 'Bùi Công Nam x Soonbin',
            path:'./assets/music/Tiến Hay Lùi .mp3',
            image:'./assets/img/tienhaylui.jpg'
        },
        {
            name: 'Địa Đàng REMIX',
            singer: 'HOÀNG OANH x ACV',
            path:'./assets/music/ĐỊA ĐÀNG REMIX  HOÀNG OANH x ACV.mp3',
            image:'./assets/img/diadang.jpg'
        },
        {
            name: 'Lướt trên con sóng',
            singer: 'Dangrangto',
            path:'./assets/music/LƯỚT TRÊN CON SÓNG Ft Dangrangto.mp3',
            image:'./assets/img/luottrenconsong.jpg'
        },
        {
            name: 'Đầu đường xó chợ',
            singer: 'Obito ft Lăng LD',
            path:'./assets/music/Obito-Đầu Đường Xó Chợ ft Lăng LD.mp3',
            image:'./assets/img/dauduongxocho.jpg'
        },
        {
            name: 'Đừng làm trái tim anh đau',
            singer: 'Sơn Tùng MTP',
            path:'./assets/music/Đừng Làm Trái Tim Anh Đau.mp3',
            image:'./assets/img/dunglamtraitimanhdaujpg.jpg'
        },
        {
            name: 'Despasito Audio',
            singer: 'Luis Fonsi ft Daddy Yankee ft Justin Bieber.mp3',
            path:'./assets/music/Luis Fonsi Daddy Yankee  Despacito Audio ft Justin Bieber.mp3',
            image:'./assets/img/despasito.jpg'
        },



    ],
    render:function(){
        const htmls = this.songs.map((song,index) =>{
            
            return `
                <div class="song ${index === this.currentIndex ? 'active':''}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>

            `
        }) 
        $('.playlist').innerHTML = htmls.join("");
    },
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]

            }
        })
    },
    handleEvents: function(){
        const cdWidth = cd.offsetWidth
        const _this = this

        //Xử lý cd quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],{
            duration: 10000,
            iterations: Infinity //lặp vô hạn
        })

        cdThumbAnimate.pause();

        //Xử lý phóng to thu nhỏ cd
        document.onscroll = function() {
            const scrollTop =  document.documentElement.scrollTop || window.scrollY;
            const newCDWidth = cdWidth - scrollTop;

            cd.style.width = newCDWidth > 0 ? newCDWidth + 'px' : 0
            cd.style.opacity = newCDWidth / cdWidth
        }

        //Xử lý khi click play
        playBtn.onclick = function() {
            if( _this.isPlaying == true){
                audio.pause()
            }
            else{
                audio.play()
            }
           
        }

        //Khi song được play
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play();
        }

        //Khi song được pause
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause();
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration)
            {
                const progressPercent =Math.floor(audio.currentTime/audio.duration*100)
                progress.value = progressPercent
            }
        }

        //Xử lý khi tua song
        progress.onchange =  function(e){
            
            const seekTime = audio.duration/100*e.target.value
            audio.currentTime = seekTime
        }

        //Khi next song
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.nextSong()
            }
            
            audio.play();
            _this.render()
            _this.scrollToActiveSong()
        }

        //Khi prev song
        preBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.prevSong()
            }
            audio.play();
            _this.render()
            _this.scrollToActiveSong()

        }

        //random bài hát
        randomBtn.onclick = function(e){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
            
        }
        
        //Xử lý sự kiện repeat 
        repeatBtn.onclick = function(e){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active',_this.isRepeat)
                        
        }

        //Xử lý next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click();
            }
        }

    },
    loadCurrentSong: function(){

        heading.textContent =  this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex =0
        }
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length
        }
        this.loadCurrentSong()
  
    },
    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
    
        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        },300)
    },


    start: function(){
        //định nghĩa thuộc tính cho Object
        this.defineProperties()

        //Lắng nghe và xử lý sự kiện
        this.handleEvents()

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //render playlist
        this.render()
    },
    
}

app.start()