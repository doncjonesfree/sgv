var ps = {};

ps.contractor_id = 'TcvgDDwhu96DiuxJC';  // SGV Electric's mongo id
ps.phone = '(626) 629-8525';

const runningLocal = function(){
  const url = window.location.href;
  if ( url.indexOf('file:') === 0 ) return true;
  return false;
};

let baseUrl = '';
if ( runningLocal() ) {
  baseUrl = 'http://localhost:3000/';
} else {
  baseUrl = 'https://www.electriciannearme.us/';
}
const api = baseUrl + 'api/';

const request = new XMLHttpRequest();

ps.admin = function(option){
  const url = sprintf('%sapi_%s/%s',baseUrl,option,ps.contractor_id);
  console.log('jones14',url);
  $('#frame').attr('src',url);
};

ps.project_price = function(id,projectType){
  const url = baseUrl + 'api_price/' + projectType + '/' + ps.contractor_id;
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

  html.push('<a href="home.html">');
  html.push('<img id="h1_logo" src="img/SGV_Logo.jpg" style="height: 100px">');
  html.push('</a>');

  html.push('<div class="h1_col1" style="font-size:' + sz + 'vw">Glendora');
  html.push('</div>');
  html.push('<div class="h1_col2" style="font-size:' + sz + 'vw">');
  html.push(ps.phone);
  html.push('</div>');
  html.push('<img id="glendora_logo" src="img/glendora-logo.png" style="height: 80px; margin: 10px 1em 10px 0;">');
  html.push('</div>');



  ps.setHtml(id,html.join('\n'));
};

ps.projectList = function(id){
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

};

const getListOfProjectTypes = function(callback){
  const url = api + ps.contractor_id + '/projectTypes';
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    callback(JSON.parse(this.response));
  };

  request.send();
};
