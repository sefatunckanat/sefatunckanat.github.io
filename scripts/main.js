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
});