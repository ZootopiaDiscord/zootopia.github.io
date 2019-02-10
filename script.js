$(document).ready(function () {
    $('#join-button').click(function () {
        $('.modal').addClass("modal-show");
        $('section,.bukoya').addClass("blur");
        $('.header-link').css({ "pointer-events": "none" });
        $('html,body').css({ "overflow": "hidden" });
    });
    $('section').mouseup(function () {
        $('.modal').removeClass("modal-show");
        $('section,.bukoya').removeClass("blur");
        $('.header-link').css({ "pointer-events": "initial" });
        $('html,body').css({ "overflow": "initial" });
    });
    $('.sectionHead').click(function () {
        $(this).parent("section").toggleClass("section-collapse");
    });
    $('.channels article ul li:first-child').click(function () {
        $(this).parent("ul").children("li").not(".channels article ul li:first-child").toggleClass("channelCategory-hide");
        $(this).parent("ul").children("li:first-child").toggleClass("channelCategory-closed");
    });
    $('.channels input').click(function () {
        switch ($(this).attr('id')) {
            case "verified-channels":
                $('.verified').toggleClass("channelCategory-hideVerified");
                break;
            case "nsfw-channels":
                $('.nsfw').toggleClass("channelCategory-hideNSFW");
                break;
            default:
                break;
        }
    });
});