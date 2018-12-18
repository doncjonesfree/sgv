// var request = new XMLHttpRequest();

const request = new XMLHttpRequest();
var ps = {};

ps.phone = '(626) 629-8525';

ps.setHtml = function(id,html) {
  document.getElementById(id).innerHTML = html;
};


ps.header1 = function(id) {
  // Header for home page
  const width = parseInt( window.innerWidth);
  let sz = 3;
  if ( width < 600 ) sz = 4;

  console.log('jones14',width);
  let html = [];
  html.push('<div id="front_page_header">');
  html.push('<img id="h1_logo" src="img/SGV_Logo.jpg" style="height: 100px">');
  html.push('<div class="h1_col1" style="font-size:' + sz + 'vw">Glendora</div>')
  html.push('<div class="h1_col2" style="font-size:' + sz + 'vw">' + ps.phone + '</div>')
  html.push('</div>');

  getListOfProjectTypes();
  ps.setHtml(id,html.join('\n'));
};

const getListOfProjectTypes = function(){
  console.log('jones33a');
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

  request.onload = function () {
    // Begin accessing JSON data here
    const data = JSON.parse(this.response);
    console.log('jones33b',data);
  };

  request.send();
};
