// var request = new XMLHttpRequest();

const api = 'http://localhost:3000/api/';
const contractor_id = 'TcvgDDwhu96DiuxJC';  // SGV Electric's mongo id

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

  ps.setHtml(id,html.join('\n'));
};

ps.projectList = function(id){
  getListOfProjectTypes(function(list){
    let html = [];
    html.push('<div id="h_list">');
    for ( let i=0; i < list.length; i++ ) {
      const l = list[i];
      html.push( sprintf('<div class="h_list_element" id="project_%s">%s</div>',l.value, l.label));
    }
    html.push('</div>');
    console.log('jones31',list);
    ps.setHtml(id,html.join('\n'));
  });

};

const getListOfProjectTypes = function(callback){
  console.log('jones33a');
  const url = api + contractor_id + '/projectTypes';
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    callback(JSON.parse(this.response));
  };

  request.send();
};
