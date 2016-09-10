$(document).ready(function () {
    // değişkenler
    var showMenu = false;

    $('img').on('dragstart', function(event) { event.preventDefault(); });
    $(".menu li").each(function () {
        //tüm menü itemlerini gez
        //seçilemez ekle
        $(this).addClass("unselectable");
    });

    $(".menu li").click(function () {
        // tüm menü itemlerini sıfırla
        $(".menu li").each(function () {
            $(this).removeClass("active");
            $(this).addClass("deactive");
        });

        //tıklanan itemi aydınlat
        $(this).removeClass("deactive");
        $(this).addClass("active");

        //responsive menü varsa kapat
        if(showMenu){
            ToggleMenu();
        }

        return false;
    });

    $('.menu li').bind('click', function() {
        //yumuşak kaydırma işlemi
        var hash = $(this).find('span').attr('rel');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },800);
        return false;
    });

    // Responsive butona tıkladığında menüyü değiştir
    $("img.button").click(function () {
        ToggleMenu();
    });

    //içeriğe tıklanırsa menüyü değiştir
    $(".contents").click(function () {
        if(showMenu){//tabi menü açıksa
            ToggleMenu();
        }
    });

    // menü değiştirme fonksiyonu
    function ToggleMenu() {
        showMenu=!showMenu;
        $("img.button").toggleClass("rotate90");
        $(".menu").toggleClass("show-menu");
    }

    // hakkımda kutularının içindeki spanlarin rasgele stilleri
    var liveSpans = function(){
        $(".box .texts span").each(function() {
            var sizes = [20,25,30,18,40];
            var colors = [
                "rgb(120, 5, 207)",
                "rgb(214, 187, 2)",
                "rgb(94, 201, 36)",
                "rgb(201, 36, 36)",
                "rgb(238, 224, 33)",
                "rgb(11, 25, 120)",
                "rgb(184, 7, 213)"
            ];
            var size = Math.floor(Math.random() * sizes.length);
            var posx = Math.floor(Math.random() * 200);
            var posy = Math.floor(Math.random() * 140);
            var color = Math.floor(Math.random() * colors.length);
            var rotate = 45-Math.floor(Math.random() * 90);
            console.log(rotate);
            $(this).css("font-size",sizes[size]*(1+Math.random())+"px");
            $(this).css("left",posx+"px");
            $(this).css("top",posy+"px");
            $(this).css("color",colors[color]);
            $(this).css({
              '-webkit-transform' : 'rotate(' + rotate + 'deg)',
              '-moz-transform'    : 'rotate(' + rotate + 'deg)',
              '-ms-transform'     : 'rotate(' + rotate + 'deg)',
              '-o-transform'      : 'rotate(' + rotate + 'deg)',
              'transform'         : 'rotate(' + rotate + 'deg)'
            });
        });
    }
    liveSpans();
    var liveSpansLoop = setInterval(liveSpans,5000); // döngü
});
