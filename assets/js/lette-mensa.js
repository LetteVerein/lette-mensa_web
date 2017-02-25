﻿/////////////////////////
//       CONFIG        //
/////////////////////////
const apiGETUrl = "https://dev.l100n.cc/API/get/",
    apiPOSTUrl = "https://dev.l100n.cc/API/set",
    momentLang = "de";

// TEST CONFIG PART
let dateToday = getdateToday();
// let dateToday = "2017-01-09";
// TEST CONFIG PART

const error = "Fehler!",
    errorAPI = "Sorry, Fehler!",
    errorAPIOffline = "Sorry, Fehler! Keine Daten von der API Erhalten...",
    errorBrowser = "Sorry, Fehler! Dein Brower ist warscheinlich outdated... - http://outdatedbrowser.com/de",
    errorReload = "Ein Fehler ist aufgetreten. Versuche es später erneut.",
    errorAPINull = "Fehlerhafte oder noch keine Date, für den ",
    errorAPINull2 = "Es sind keine Speisen vorhanden.",
    errorAPIStart = "Starting Data Loading...",
    sucessAPI = " - Loading Data finished.",
    successPost = "Send Data finished.",
    errorNoDay = "Error, no Day selected!",
    errorFalseAuthKey = "Error, password to save your data is wrong.";

//////////////////////////////////////////////////
// LETTE MENSA WEBSITE - (C) 2016/7 			//
// https://github.com/LetteVerein/lette-mensa   //
//////////////////////////////////////////////////

// # navbar js, jQuery Easing Plugon Settings
// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    $('#date-yyyy').text(moment().locale(momentLang).format("YYYY"))
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
        $('.navbar-toggle:visible').click();
    }
})

// # Date funct.
function getdateToday() {
    return moment().locale(momentLang).format("YYYY-MM-DD");
}
function getDayName(datStr) {
    return moment(datStr).locale(momentLang).format("dddd");
}
function getDatePlus(datStr, plus, format) {
    return moment(datStr).add(plus, 'days').locale(momentLang).format(format);
};
function getPreviousWorkday() {
    switch (moment().locale(momentLang).day()) {
        case 0:
        case 6:
            return moment().locale(momentLang).subtract(6, 'days').day(5).format("YYYY-MM-DD");
        default:
            return moment().locale(momentLang).format("YYYY-MM-DD");
    }
};

// Error handeling
function reloadPage() {
    setTimeout(function () {
        window.location.reload(); /* or window.location = window.location.href; */
        console.error(errorReload);
    }, 60000);
};

// API get request
function loadJSON(date) {
    console.debug("GET, " + errorAPIStart);
    let finalApiGetUrl = apiGETUrl + date;
    $.ajax({
        url: finalApiGetUrl,
        type: 'get',
        dataType: 'json',
    }).done(function responseHandler(data) {
        console.debug("GET, " + date + sucessAPI);
        let lStorageName = "mensa-day_" + date;
        localStorage.setItem(lStorageName, JSON.stringify(data));
        AssignmentByDate(date);
    }).fail(function errorHandler(jqXHR, textStatus, errorThrown) {
        console.error(errorAPIOffline)
        console.error(jqXHR)
        console.error(textStatus)
        console.error(errorThrown)
    })
};

// API post request
function postJSON(data) {
    let finalapiPOSTUrl = apiPOSTUrl;
    $.post({
        url: finalapiPOSTUrl,
        type: 'post',
        dataType: 'json',
        data: data
    }).done(function responseHandler(data) {
        console.debug("POST, " + date + sucessAPI);

    }).fail(function errorHandler(jqXHR, textStatus, errorThrown) {
        console.error(errorAPIOffline)
        console.debug(jqXHR)
        console.debug(textStatus)
        console.debug(errorThrown)
        alert(errorAPIOffline);
    })
};