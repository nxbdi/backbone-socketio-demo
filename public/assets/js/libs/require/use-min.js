(function(){var a={};define({version:"0.2.0",load:function(b,c,d,e){var f=e.use&&e.use[b];if(!f)return d();a[b]={deps:f.deps||[],attach:f.attach},c(f.deps||[],function(){c([b],function(){var a=f.attach;return e.isBuild?d():typeof a=="function"?d(a.apply(window,arguments)):d(window[a])})})},write:function(b,c,d){var e=a[c],f=e.deps,g={attach:null,deps:""};typeof attach=="function"?g.attach="return "+e.attach.toString()+";":g.attach="return window['"+e.attach+"'];",f.length&&(g.deps="'"+f.toString().split(",").join("','")+"'"),d(["define('",b,"!",c,"', ","[",g.deps,"],","function() {",g.attach,"}",");\n"].join(""))}})})()