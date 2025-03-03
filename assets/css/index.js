const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd= $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')

const playlist = $('.playlist');
const app = {
    currentIndex: 0,
    isPlaying: false,
    
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
            path:'./assets/music/TỰHÀOMÀUÁOLÍNH -THÁI HỌC.mp3',
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
        const htmls = this.songs.map(song =>{
            return `
                <div class="song">
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
        }

        //Khi song được pause
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration)
            {
                const progressPercent =Math.floor(audio.currentTime/audio.duration*100)
                progress.value = progressPercent
            }
        }
    },
    loadCurrentSong: function(){

        heading.textContent =  this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
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