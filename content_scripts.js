

var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = " emVar=globallinkdata;var en=emVar.data.encryKey;var urls=''; var data =globallinkdata.data.resource.files; for(var i =0;i< data.length;i++){ urls = urls + '\\''+ data[i].downloadurl +'\\','} urls='['+urls.substr(0,urls.length)+']';var json='{'+'\\'en\\':\\''+en+'\\','+'\\'urls\\':'+urls+'}'; var df = document.getElementById('down_filelist');df.setAttribute('dataurls',json) ";
//script.innerHTML ="var wxl=1;"
document.head.appendChild(script);