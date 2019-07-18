function Carousel($ct) {
    this.init($ct)
    this.bind()
    this.autoPlay()
}

Carousel.prototype = {
    init: function ($ct) {
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct >li')
        this.$preBtn = this.$ct.find('.icon-prev')
        this.$nextBtn = this.$ct.find('.icon-next')
        this.$bullets = this.$ct.find('.bullet li')

        this.$imgWidth = this.$imgs.width()
        this.$imgCount = this.$imgs.length
        this.index = 0
        this.isAnimate = false

        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())

        this.$imgCt.width((this.$imgCount + 2) * this.$imgWidth)
        this.$imgCt.css('left', -this.$imgWidth)
        //受他父容器320px束缚，图片水下排列，需要加上这句话。

    },
    bind: function () {
        var _this = this
        this.$preBtn.on('click', function () {
            console.log('pred ...')
            _this.playPre(1)
        })
        this.$nextBtn.on('click', function () {
            console.log('next ...')
            _this.playNext(1)
        })
        this.$bullets.on('click', function () {
            console.log($(this).index())
            var index = $(this).index()
            if (_this.index > index) {
                _this.playPre(_this.index - index) //这是参数len
            } else {
                _this.playNext(index - _this.index)
            }
        })
    },

    playNext: function (len) {
        console.log('playNext..')
        if (this.isAnimate) return
        this.isAnimate = true
        var _this = this
        this.$imgCt.animate({
            left: '-=' + this.$imgWidth * len
        }, function () {
            _this.index += len
            if (_this.index === _this.$imgCount) {
                _this.$imgCt.css('left', -_this.$imgWidth)
                _this.index = 0
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },

    playPre: function (len) {
        if (this.isAnimate) return
        this.isAnimate = true

        var _this = this
        this.$imgCt.animate({
            left: '+=' + this.$imgWidth * len
        }, function () {
            _this.index -= len
            if (_this.index < 0) {
                _this.$imgCt.css('left', -_this.$imgWidth * _this.$imgCount)
                _this.index = _this.$imgCount - 1
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    setBullet: function () {
        this.$bullets.eq(this.index).addClass('active')
            .siblings().removeClass('active')
    },

    autoPlay: function () {
        var _this = this
        this.autoClock = setInterval(function () {
            _this.playNext(1)
        }, 4000)
    },
    stopPlay: function () {
        clearInterval(this.autoClock)
    }
}


var a = new Carousel($('.carousel').eq(0))
var b = new Carousel($('.carousel').eq(1))