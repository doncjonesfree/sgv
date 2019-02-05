var ps = {};

ps.contractor_id = 'TcvgDDwhu96DiuxJC';  // SGV Electric's mongo id

// phone for header1
ps.phone1 = '(626) 552-9156';  // electrician glendora phone

ps.phone = '(626) 629-8525';  // sgv phone

ps.question = 1;  // initialize what question we are looking at

const runningLocal = function(){
  const url = window.location.href;
  if ( url.indexOf('file:') === 0 ) return true;
  return false;
};

let baseUrl = '';
if ( runningLocal() ) {
  baseUrl = 'http://localhost:3000';
} else {
  baseUrl = 'https://www.electriciannearme.us';
}
const api = baseUrl + '/api';

const request = new XMLHttpRequest();

ps.admin = function(option){
  const url = sprintf('%s/api_%s/%s',baseUrl,option,ps.contractor_id);
  $('#frame').attr('src',url);
};

ps.project_price = function(id,projectType){
  const url = sprintf('%s/api_price/%s/%s',baseUrl,projectType,ps.contractor_id);
  $('#'+id).attr('src',url);
};

ps.setHtml = function(id,html) {
  document.getElementById(id).innerHTML = html;
};


ps.header1 = function(id) {
  // Header for home page
  const width = parseInt( window.innerWidth);
  let sz = 3;
  if ( width < 600 ) sz = 4;

  let html = [];
  html.push('<div id="front_page_header">');

  html.push('<a href="index.html">');
  // html.push('<img id="h1_logo" src="img/SGV_Logo.jpg" style="height: 100px">');
  html.push('<img id="h1_logo" src="img/electrician_glendora_logo.png" style="height: 100px">');

  html.push('</a>');

  html.push('<div class="h1_col1" style="font-size:' + sz + 'vw">Electrician Glendora');
  html.push('</div>');
  html.push('<div class="h1_col2" style="font-size:' + sz + 'vw">');
  html.push('<a href="index.html" style="text-decoration: none; color: black; font-size: .5em; margin-right: 20px;">home</a>');
  html.push(ps.phone1);
  html.push('</div>');
  html.push('<img id="glendora_logo" src="img/glendora-logo.png" style="height: 80px; margin: 10px 1em 10px 0;">');
  html.push('</div>');



  ps.setHtml(id,html.join('\n'));
};

ps.projectList = function(id){
  getListOfProjectTypes(function(list){
    let html = [];
    html.push('<div id="h_list">');
    const skip = ['outlets','lights','circuits'];  // skip these
    for ( let i=0; i < list.length; i++ ) {
      const l = list[i];
      if ( skip.indexOf(l.value) < 0 ) {
        //html.push( sprintf('<div class="h_list_element" id="project_%s">%s</div>',l.value, l.label));
        html.push( sprintf('<a class="h_list_element" href="%s.html">%s</a>',l.value, l.label));
      }
    }
    html.push('</div>');
    ps.setHtml(id,html.join('\n'));
  });
};

ps.showYelp = function(){
  if ( window.innerWidth < 1000 ) {
    $('#yelp').css('height',0);
    $('#yelp2').css('visibility','visible');
  } else {
    $('#yelp2').css('height',0);
    $('#yelp').css('visibility','visible');
  }
};

const getListOfProjectTypes = function(callback){
  const url = api + '/' + ps.contractor_id + '/projectTypes';
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    callback(JSON.parse(this.response));
  };

  request.send();
};

const focus = function(id,count){
  if ( ! count ) count = 0;
  if ($(id).length) {
    $(id).focus();
  } else if ( count < 10 ) {
    setTimeout(function(){
      focus(id,count+1);
    },200);
  }
};

const numbers = '1234567890';
const allNumbers = function(n){
  if ( n ) {
    for ( let i=0; i < n.length; i++ ) {
      const c = n.substr(i,1);
      if ( numbers.indexOf(c) < 0 ) return false;
    }
  }
  return true;
};

ps.overlayInfo = function(id){
  if ( ! id ) id = 'h_overlay';
  let html = [];

  // we used to ask for zip code first, that has been turned off
  ps.question = 2;

  switch (ps.question) {
    case 2:
    // select job
    html.push('<div id="h_overlay_title">');
    html.push('<span class="h_underline">Get your price</span>');
    html.push(' (for free), then let us know');
    html.push("when you're ready to start");
    html.push('</div>');
    html.push('<div id="h_what_to_do">');
    html.push('Select your job type below');
    html.push('</div>');
    html.push('<div id="h_what_to_do2">');
    html.push('<i class="fa fa-arrow-down"></i>');
    html.push('</div>');
    break;
  }

  $('#'+id).html( html.join(' '));
};

ps.setCookie = function(name,value,days) {
    var expires = "";
    if ( ! days ) days = 365;
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
ps.getCookie = function(name) {
    var nameEQ = name + "=";
    var ca = decodeURIComponent(document.cookie);
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return c;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
