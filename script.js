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

$(document).ready(function(){

  $('body').on('keydown',function(e){
    console.log('jones21 %s',e.which);
    if ( e.which === 13 ) {
      // return key pressed
      if ( $('#zip').length) ps.setupZip();
      console.log('jones19 return key');
    }
  });

  // $('#submit_zip').click(function(e){
  //   console.log('jones24 submit');
  //   ps.setupZip();
  // });

});

ps.overlayBack = function(){
  ps.question -= 1;
  ps.overlayInfo();
  ps.projectList('my-projects');
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
  console.log('jones14',url);
  $('#frame').attr('src',url);
};

ps.setupZip = function(){
  // call the api, we have a zip code
  $('#h_error').html('');
  const zip = $('#zip').val();
  const url = sprintf('%s/%s/%s/getZip',api,ps.contractor_id,zip);
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    const obj = JSON.parse(this.response);
    if ( ! obj ) {
    } else if ( obj.error ) {
      $('#h_error').html(obj.error);
    } else {
      const city = sprintf('%s, %s',obj.installLocation.city,obj.installLocation.state);
      const distance = obj.distance;
      console.log('jones63 zip=%s %s %s',zip,city,distance);
      ps.setCookie('zip',zip);
      ps.setCookie('city',city);
      ps.setCookie('distance',distance);

      ps.question += 1;
      ps.overlayInfo();
      ps.projectList('my-projects');
    }
  };

  request.send();
};

ps.project_price = function(id,projectType){
  const url = sprintf('%s/api_price/%s/%s/%s',baseUrl,projectType,ps.contractor_id,ps.getCookie('zip'));
  console.log('jones92 zip=%s url=%s',ps.getCookie('zip'),url);
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
  html.push(ps.phone1);
  html.push('</div>');
  html.push('<img id="glendora_logo" src="img/glendora-logo.png" style="height: 80px; margin: 10px 1em 10px 0;">');
  html.push('</div>');



  ps.setHtml(id,html.join('\n'));
};

ps.projectList = function(id){
  if (ps.question && ps.question > 1 ) {
    getListOfProjectTypes(function(list){
      let html = [];
      html.push('<div id="h_list">');
      for ( let i=0; i < list.length; i++ ) {
        const l = list[i];
        //html.push( sprintf('<div class="h_list_element" id="project_%s">%s</div>',l.value, l.label));
        html.push( sprintf('<a class="h_list_element" href="%s.html">%s</a>',l.value, l.label));
      }
      html.push('</div>');
      ps.setHtml(id,html.join('\n'));
    });
  } else {
    ps.setHtml(id,'');
  }
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


ps.overlayInfo = function(id){
  if ( ! id ) id = ps.getCookie('id');
  let html = [];

  if ( ! ps.question) ps.question = 1;

  console.log('jones172 q=%s id=%s',ps.question,id);
  switch (ps.question) {
    case 1:
    // ask for zip code
    ps.setCookie('id',id);
    html.push('<div class="h_overlay_label">');
    html.push('We specialize in Glendora and surrounding areas');
    html.push('</div>');
    html.push('<div class="h_overlay_prompt">');
    html.push('Please enter your zip code');
    html.push('</div>');
    html.push('<div class="h_overlay_input">');
    let zip = ps.getCookie('zip');
    if ( zip === null ) zip = '';
    console.log('jones174 zip=%s',zip);
    html.push(sprintf('<input class="h_text" id="zip" type="text" value="%s">',zip));
    html.push('</div>');

    html.push('<div id="submit_zip" onclick = "ps.setupZip();">Submit</div>');
    html.push('<div id="h_error"></div>');

    focus('#zip');
    break;

    case 2:
    // select job
    html.push('<div id="h_overlay_title">');
    html.push('<span class="h_underline">Get your price</span>');
    html.push(' (for free), then let us know');
    html.push("when you're ready to start");
    html.push('</div>');
    html.push('<div class="h_location">');
    html.push( sprintf('%s %s',ps.getCookie('city'),ps.getCookie('zip')));
    const clickCommand = "ps.overlayBack()";
    html.push(sprintf('<div id="h_overlay_back" onclick = "%s">back</div>',clickCommand));

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
    console.log('jones210',ca);
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    console.log('jones216a',c);
    console.log('jones216b',ca);
    return c;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
