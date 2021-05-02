/* This is the javascript used in my mod pages */

var curseUrl = document.body.dataset.curse;
if(curseUrl !== undefined && curseUrl != null) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);

            var mcver = document.getElementById('dl-mcver');
            var modver = document.getElementById('dl-modver');
            var button = document.getElementById('dl-button');
            var modversions = [];

            var w50 = document.getElementsByClassName('w50');
            for (var i = 0; i < w50.length; i++) w50[i].style.display = 'block';
            var w50clear = document.getElementsByClassName('w50clear');
            for (var i = 0; i < w50clear.length; i++) w50clear[i].style.display = 'inline';

            mcver.onchange = function () {
                if (mcver.selectedOptions.length == 0) return;
                var ver = mcver.selectedOptions[0].innerHTML;
                while (modversions.length > 0) {
                    modver.removeChild(modversions.shift());
                }
                if (data.versions[ver] === undefined) return;
                var versions = data.versions[ver];
                if (versions.length == 0) return;

                var latest = document.createElement('option');
                latest.value = versions[0].url;
                latest.innerHTML = 'Latest';
                modver.appendChild(latest);
                modversions.push(latest);

                for (var i = 0; i < versions.length; i++) {
                    var v = document.createElement('option');
                    v.value = versions[i].url;
                    var name = versions[i].name;
                    if(name.substring(0, 1) == 'v') name = name.substring(1);
                    name = name.replace(' (MC ' + ver + ')', '');
                    name = name.replace(data.title + ' ', '');
                    v.innerHTML = name;
                    modver.appendChild(v);
                    modversions.push(v);
                }
            };

            button.onclick = function (event) {
                if (modver.selectedOptions.length == 0) return;
                var ver = modver.selectedOptions[0];
                if (ver.disabled) return;
                window.open(ver.value, '_blank');
                event.preventDefault();
            };

            for (var gameVer in data.versions) {
                var versions = data.versions[gameVer];
                if (versions.length == 0) continue;
                var v = document.createElement('option');
                v.innerHTML = gameVer;
                mcver.appendChild(v);
            }
        }
    };
    xhttp.open('GET', 'https://cors.bridged.cc/' + encodeURIComponent('https://api.cfwidget.com/' + curseUrl), true);
    xhttp.send();

}

function checkSize() {
    var content = document.getElementById('content');
    if(content.offsetHeight >= window.innerHeight) {
        if(!content.classList.contains('scroll')) content.classList.add('scroll');
    } else {
        content.classList.remove('scroll');
    }
}

window.onresize = checkSize;
window.onload = checkSize;
checkSize();

// Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-73372300-1', 'auto');
ga('send', 'pageview');