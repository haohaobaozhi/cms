!function(e,t){"use strict";function n(e,t){for(var n,r=[],o=0;o<e.length;++o){if(n=a[e[o]]||i(e[o]),!n)throw"module definition dependecy not found: "+e[o];r.push(n)}t.apply(null,r)}function r(e,r,i){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(r===t)throw"invalid module definition, dependencies must be specified";if(i===t)throw"invalid module definition, definition function must be specified";n(r,function(){a[e]=i.apply(null,arguments)})}function i(t){for(var n=e,r=t.split(/[.\/]/),i=0;i<r.length;++i){if(!n[r[i]])return;n=n[r[i]]}return n}function o(n){var r,i,o,s,l;for(r=0;r<n.length;r++){i=e,o=n[r],s=o.split(/[.\/]/);for(var c=0;c<s.length-1;++c)i[s[c]]===t&&(i[s[c]]={}),i=i[s[c]];i[s[s.length-1]]=a[o]}if(e.AMDLC_TESTS){l=e.privateModules||{};for(o in a)l[o]=a[o];for(r=0;r<n.length;r++)delete l[n[r]];e.privateModules=l}}var a={};r("tinymce/imagetoolsplugin/Canvas",[],function(){function e(e,t){return n(document.createElement("canvas"),e,t)}function t(e){return e.getContext("2d")}function n(e,t,n){return e.width=t,e.height=n,e}return{create:e,resize:n,get2dContext:t}}),r("tinymce/imagetoolsplugin/Mime",[],function(){function e(e){var t=document.createElement("a");return t.href=e,t.pathname}function t(t){var n=e(t).split("."),r=n[n.length-1],i={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png"};return r&&(r=r.toLowerCase()),i[r]}return{guessMimeType:t}}),r("tinymce/imagetoolsplugin/ImageSize",[],function(){function e(e){return e.naturalWidth||e.width}function t(e){return e.naturalHeight||e.height}return{getWidth:e,getHeight:t}}),r("tinymce/imagetoolsplugin/Conversions",["tinymce/util/Promise","tinymce/imagetoolsplugin/Canvas","tinymce/imagetoolsplugin/Mime","tinymce/imagetoolsplugin/ImageSize"],function(e,t,n,r){function i(t){return new e(function(e){function n(){t.removeEventListener("load",n),e(t)}t.complete?e(t):t.addEventListener("load",n)})}function o(e){return i(e).then(function(e){var n,i;return i=t.create(r.getWidth(e),r.getHeight(e)),n=t.get2dContext(i),n.drawImage(e,0,0),i})}function a(e){return i(e).then(function(e){var t=e.src;return 0===t.indexOf("blob:")?l(t):0===t.indexOf("data:")?c(t):o(e).then(function(e){return c(e.toDataURL(n.guessMimeType(t)))})})}function s(t){return new e(function(e){function n(){r.removeEventListener("load",n),e(r)}var r=new Image;r.addEventListener("load",n),r.src=URL.createObjectURL(t),r.complete&&n()})}function l(t){return new e(function(e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="blob",n.onload=function(){200==this.status&&e(this.response)},n.send()})}function c(t){return new e(function(e){var n,r,i,o,a,s;if(t=t.split(","),o=/data:([^;]+)/.exec(t[0]),o&&(a=o[1]),n=atob(t[1]),window.WebKitBlobBuilder){for(s=new WebKitBlobBuilder,r=new ArrayBuffer(n.length),i=0;i<r.length;i++)r[i]=n.charCodeAt(i);return s.append(r),void e(s.getBlob(a))}for(r=new Uint8Array(n.length),i=0;i<r.length;i++)r[i]=n.charCodeAt(i);e(new Blob([r],{type:a}))})}function u(e){return 0===e.indexOf("blob:")?l(e):0===e.indexOf("data:")?c(e):null}function d(e,t){return c(e.toDataURL(t))}function f(t){return new e(function(e){var n=new FileReader;n.onloadend=function(){e(n.result)},n.readAsDataURL(t)})}function h(e){return f(e).then(function(e){return e.split(",")[1]})}function m(e){URL.revokeObjectURL(e.src)}return{blobToImage:s,imageToBlob:a,uriToBlob:u,blobToDataUri:f,blobToBase64:h,imageToCanvas:o,canvasToBlob:d,revokeImageUrl:m}}),r("tinymce/imagetoolsplugin/ImageTools",["tinymce/imagetoolsplugin/Conversions","tinymce/imagetoolsplugin/Canvas","tinymce/imagetoolsplugin/ImageSize"],function(e,t,n){function r(r,i){return e.blobToImage(r).then(function(o){var a=t.create(n.getWidth(o),n.getHeight(o)),l=t.get2dContext(a),c=0,u=0;return i=0>i?360+i:i,(90==i||270==i)&&t.resize(a,a.height,a.width),(90==i||180==i)&&(c=a.width),(270==i||180==i)&&(u=a.height),l.translate(c,u),l.rotate(i*Math.PI/180),l.drawImage(o,0,0),s(o),e.canvasToBlob(a,r.type)})}function i(r,i){return e.blobToImage(r).then(function(r){var o=t.create(n.getWidth(r),n.getHeight(r)),a=t.get2dContext(o);return"v"==i?(a.scale(1,-1),a.drawImage(r,0,-o.height)):(a.scale(-1,1),a.drawImage(r,-o.width,0)),s(r),e.canvasToBlob(o)})}function o(n,r,i,o,a){return e.blobToImage(n).then(function(n){var l=t.create(o,a),c=t.get2dContext(l);return c.drawImage(n,-r,-i),s(n),e.canvasToBlob(l)})}function a(n,r,i){return e.blobToImage(n).then(function(o){var a=t.create(r,i),l=t.get2dContext(a);return l.drawImage(o,0,0,r,i),s(o),e.canvasToBlob(a,n.type)})}var s=e.revokeImageUrl;return{rotate:r,flip:i,crop:o,resize:a}}),r("tinymce/imagetoolsplugin/CropRect",["tinymce/dom/DomQuery","tinymce/ui/DragHelper","tinymce/geom/Rect","tinymce/util/Tools","tinymce/util/Observable"],function(e,t,n,r,i){var o=0;return function(a,s,l,c){function u(e,t){return{x:t.x+e.x,y:t.y+e.y,w:t.w,h:t.h}}function d(e,t){return{x:t.x-e.x,y:t.y-e.y,w:t.w,h:t.h}}function f(){return d(l,a)}function h(){function i(e){var r;return new t(S,{document:c.ownerDocument,handle:S+"-"+e.name,start:function(){r=a},drag:function(t){var i,o,s,c,u;i=r.x,o=r.y,s=r.w,c=r.h,i+=t.deltaX*e.deltaX,o+=t.deltaY*e.deltaY,s+=t.deltaX*e.deltaW,c+=t.deltaY*e.deltaH,20>s&&(s=20),20>c&&(c=20),u=a=n.clamp({x:i,y:o,w:s,h:c},l,"move"==e.name),u=d(l,u),C.fire("updateRect",{rect:u}),y(u)}})}e('<div id="'+S+'" class="'+_+'croprect-container" data-mce-bogus="all">').appendTo(c),r.each(E,function(t){e("#"+S,c).append('<div id="'+S+"-"+t+'"class="'+_+'croprect-block" style="display: none" data-mce-bogus="all">')}),r.each(w,function(t){e("#"+S,c).append('<div id="'+S+"-"+t.name+'" class="'+_+"croprect-handle "+_+"croprect-handle-"+t.name+'" style="display: none" data-mce-bogus="all">')}),N=r.map(w,i),p(a)}function m(t){var n;n=r.map(w,function(e){return"#"+S+"-"+e.name}).concat(r.map(E,function(e){return"#"+S+"-"+e})).join(","),t?e(n,c).show():e(n,c).hide()}function p(t){function n(t,n){n.h<0&&(n.h=0),n.w<0&&(n.w=0),e("#"+S+"-"+t,c).css({left:n.x,top:n.y,width:n.w,height:n.h})}r.each(w,function(n){e("#"+S+"-"+n.name,c).css({left:t.w*n.xMul+t.x,top:t.h*n.yMul+t.y})}),n("top",{x:s.x,y:s.y,w:s.w,h:t.y-s.y}),n("right",{x:t.x+t.w,y:t.y,w:s.w-t.x-t.w+s.x,h:t.h}),n("bottom",{x:s.x,y:t.y+t.h,w:s.w,h:s.h-t.y-t.h+s.y}),n("left",{x:s.x,y:t.y,w:t.x-s.x,h:t.h}),n("move",t)}function g(e){a=e,p(a)}function v(e){s=e,p(a)}function y(e){g(u(l,e))}function b(e){l=e,p(a)}function x(){r.each(N,function(e){e.destroy()}),N=[]}var C,w,N,E,_="mce-",S=_+"crid-"+o++;return w=[{name:"move",xMul:0,yMul:0,deltaX:1,deltaY:1,deltaW:0,deltaH:0},{name:"nw",xMul:0,yMul:0,deltaX:1,deltaY:1,deltaW:-1,deltaH:-1},{name:"ne",xMul:1,yMul:0,deltaX:0,deltaY:1,deltaW:1,deltaH:-1},{name:"sw",xMul:0,yMul:1,deltaX:1,deltaY:0,deltaW:-1,deltaH:1},{name:"se",xMul:1,yMul:1,deltaX:0,deltaY:0,deltaW:1,deltaH:1}],E=["top","right","bottom","left"],h(c),C=r.extend({toggleVisibility:m,setClampRect:b,setRect:g,getInnerRect:f,setInnerRect:y,setViewPortRect:v,destroy:x},i)}}),r("tinymce/imagetoolsplugin/ImagePanel",["tinymce/ui/Control","tinymce/ui/DragHelper","tinymce/geom/Rect","tinymce/util/Tools","tinymce/util/Promise","tinymce/imagetoolsplugin/CropRect"],function(e,t,n,r,i,o){function a(e){return new i(function(t){function n(){e.removeEventListener("load",n),t(e)}e.complete?t(e):e.addEventListener("load",n)})}return e.extend({Defaults:{classes:"imagepanel"},selection:function(e){return arguments.length?(this.state.set("rect",e),this):this.state.get("rect")},imageSize:function(){var e=this.state.get("viewRect");return{w:e.w,h:e.h}},toggleCropRect:function(e){this.state.set("cropEnabled",e)},imageSrc:function(e){var t=this,r=new Image;r.src=e,a(r).then(function(){var e,i,o=t.state.get("viewRect");i=t.$el.find("img"),i[0]?i.replaceWith(r):t.getEl().appendChild(r),e={x:0,y:0,w:r.naturalWidth,h:r.naturalHeight},t.state.set("viewRect",e),t.state.set("rect",n.inflate(e,-20,-20)),o&&o.w==e.w&&o.h==e.h||t.zoomFit(),t.repaintImage(),t.fire("load")})},zoom:function(e){return arguments.length?(this.state.set("zoom",e),this):this.state.get("zoom")},postRender:function(){return this.imageSrc(this.settings.imageSrc),this._super()},zoomFit:function(){var e,t,n,r,i,o,a,s=this;a=10,e=s.$el.find("img"),t=s.getEl().clientWidth,n=s.getEl().clientHeight,r=e[0].naturalWidth,i=e[0].naturalHeight,o=Math.min((t-a)/r,(n-a)/i),o>=1&&(o=1),s.zoom(o)},repaintImage:function(){var e,t,n,r,i,o,a,s,l,c;c=this.getEl(),s=this.zoom(),l=this.state.get("rect"),a=this.$el.find("img"),i=c.offsetWidth,o=c.offsetHeight,n=a[0].naturalWidth*s,r=a[0].naturalHeight*s,e=Math.max(0,i/2-n/2),t=Math.max(0,o/2-r/2),a.css({left:e,top:t,width:n,height:r}),this.cropRect&&(this.cropRect.setRect({x:l.x*s+e,y:l.y*s+t,w:l.w*s,h:l.h*s}),this.cropRect.setClampRect({x:e,y:t,w:n,h:r}),this.cropRect.setViewPortRect({x:0,y:0,w:i,h:o}))},bindStates:function(){function e(e){t.cropRect=new o(e,t.state.get("viewRect"),t.state.get("viewRect"),t.getEl()),t.cropRect.on("updateRect",function(e){var n=e.rect,r=t.zoom();n={x:Math.round(n.x/r),y:Math.round(n.y/r),w:Math.round(n.w/r),h:Math.round(n.h/r)},t.state.set("rect",n)}),t.on("remove",t.cropRect.destroy)}var t=this;t.state.on("change:cropEnabled",function(e){t.cropRect.toggleVisibility(e.value),t.repaintImage()}),t.state.on("change:zoom",function(){t.repaintImage()}),t.state.on("change:rect",function(n){var r=n.value;t.cropRect||e(r),t.cropRect.setRect(r)})}})}),r("tinymce/imagetoolsplugin/ColorMatrix",[],function(){function e(e,t,n){return e=parseFloat(e),e>n?e=n:t>e&&(e=t),e}function t(){return[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1]}function n(e,t){var n,r,i,o,a=[],s=new Array(10);for(n=0;5>n;n++){for(r=0;5>r;r++)a[r]=t[r+5*n];for(r=0;5>r;r++){for(o=0,i=0;5>i;i++)o+=e[r+5*i]*a[i];s[r+5*n]=o}}return s}function r(t,n){return n=e(n,0,1),t.map(function(t,r){return r%6===0?t=1-(1-t)*n:t*=n,e(t,0,1)})}function i(t,r){var i;return r=e(r,-1,1),r*=100,0>r?i=127+r/100*127:(i=r%1,i=0===i?d[r]:d[Math.floor(r)]*(1-i)+d[Math.floor(r)+1]*i,i=127*i+127),n(t,[i/127,0,0,0,.5*(127-i),0,i/127,0,0,.5*(127-i),0,0,i/127,0,.5*(127-i),0,0,0,1,0,0,0,0,0,1])}function o(t,r){var i,o,a,s;return r=e(r,-1,1),i=1+(r>0?3*r:r),o=.3086,a=.6094,s=.082,n(t,[o*(1-i)+i,a*(1-i),s*(1-i),0,0,o*(1-i),a*(1-i)+i,s*(1-i),0,0,o*(1-i),a*(1-i),s*(1-i)+i,0,0,0,0,0,1,0,0,0,0,0,1])}function a(t,r){var i,o,a,s,l;return r=e(r,-180,180)/180*Math.PI,i=Math.cos(r),o=Math.sin(r),a=.213,s=.715,l=.072,n(t,[a+i*(1-a)+o*-a,s+i*-s+o*-s,l+i*-l+o*(1-l),0,0,a+i*-a+.143*o,s+i*(1-s)+.14*o,l+i*-l+o*-.283,0,0,a+i*-a+o*-(1-a),s+i*-s+o*s,l+i*(1-l)+o*l,0,0,0,0,0,1,0,0,0,0,0,1])}function s(t,r){return r=e(255*r,-255,255),n(t,[1,0,0,0,r,0,1,0,0,r,0,0,1,0,r,0,0,0,1,0,0,0,0,0,1])}function l(t,r,i,o){return r=e(r,0,2),i=e(i,0,2),o=e(o,0,2),n(t,[r,0,0,0,0,0,i,0,0,0,0,0,o,0,0,0,0,0,1,0,0,0,0,0,1])}function c(t,i){return i=e(i,0,1),n(t,r([.393,.769,.189,0,0,.349,.686,.168,0,0,.272,.534,.131,0,0,0,0,0,1,0,0,0,0,0,1],i))}function u(t,i){return i=e(i,0,1),n(t,r([.33,.34,.33,0,0,.33,.34,.33,0,0,.33,.34,.33,0,0,0,0,0,1,0,0,0,0,0,1],i))}var d=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10];return{identity:t,adjust:r,multiply:n,adjustContrast:i,adjustBrightness:s,adjustSaturation:o,adjustHue:a,adjustColors:l,adjustSepia:c,adjustGrayscale:u}}),r("tinymce/imagetoolsplugin/Filters",["tinymce/imagetoolsplugin/Canvas","tinymce/imagetoolsplugin/ImageSize","tinymce/imagetoolsplugin/Conversions","tinymce/imagetoolsplugin/ColorMatrix"],function(e,t,n,r){function i(r,i){return n.blobToImage(r).then(function(r){function o(e,t){var n,r,i,o,a,s=e.data,l=t[0],c=t[1],u=t[2],d=t[3],f=t[4],h=t[5],m=t[6],p=t[7],g=t[8],v=t[9],y=t[10],b=t[11],x=t[12],C=t[13],w=t[14],N=t[15],E=t[16],_=t[17],S=t[18],k=t[19];for(a=0;a<s.length;a+=4)n=s[a],r=s[a+1],i=s[a+2],o=s[a+3],s[a]=n*l+r*c+i*u+o*d+f,s[a+1]=n*h+r*m+i*p+o*g+v,s[a+2]=n*y+r*b+i*x+o*C+w,s[a+3]=n*N+r*E+i*_+o*S+k;return e}var a,s=e.create(t.getWidth(r),t.getHeight(r)),l=e.get2dContext(s);return l.drawImage(r,0,0),u(r),a=o(l.getImageData(0,0,s.width,s.height),i),l.putImageData(a,0,0),n.canvasToBlob(s)})}function o(r,i){return n.blobToImage(r).then(function(r){function o(e,t,n){function r(e,t,n){return e>n?e=n:t>e&&(e=t),e}var i,o,a,s,l,c,u,d,f,h,m,p,g,v,y,b,x;for(a=Math.round(Math.sqrt(n.length)),s=Math.floor(a/2),i=e.data,o=t.data,b=e.width,x=e.height,c=0;x>c;c++)for(l=0;b>l;l++){for(u=d=f=0,m=0;a>m;m++)for(h=0;a>h;h++)p=r(l+h-s,0,b-1),g=r(c+m-s,0,x-1),v=4*(g*b+p),y=n[m*a+h],u+=i[v]*y,d+=i[v+1]*y,f+=i[v+2]*y;v=4*(c*b+l),o[v]=r(u,0,255),o[v+1]=r(d,0,255),o[v+2]=r(f,0,255)}return t}var a,s,l=e.create(t.getWidth(r),t.getHeight(r)),c=e.get2dContext(l);return c.drawImage(r,0,0),u(r),a=c.getImageData(0,0,l.width,l.height),s=c.getImageData(0,0,l.width,l.height),s=o(a,s,i),c.putImageData(s,0,0),n.canvasToBlob(l)})}function a(r){return function(i,o){return n.blobToImage(i).then(function(i){function a(e,t){var n,r=e.data;for(n=0;n<r.length;n+=4)r[n]=t[r[n]],r[n+1]=t[r[n+1]],r[n+2]=t[r[n+2]];return e}var s,l,c=e.create(t.getWidth(i),t.getHeight(i)),d=e.get2dContext(c),f=new Array(256);for(l=0;l<f.length;l++)f[l]=r(l,o);return d.drawImage(i,0,0),u(i),s=a(d.getImageData(0,0,c.width,c.height),f),d.putImageData(s,0,0),n.canvasToBlob(c)})}}function s(e){return function(t,n){return i(t,e(r.identity(),n))}}function l(e){return function(t){return i(t,e)}}function c(e){return function(t){return o(t,e)}}var u=n.revokeImageUrl;return{invert:l([-1,0,0,0,255,0,-1,0,0,255,0,0,-1,0,255,0,0,0,1,0]),brightness:s(r.adjustBrightness),hue:s(r.adjustHue),saturate:s(r.adjustSaturation),contrast:s(r.adjustContrast),grayscale:s(r.adjustGrayscale),sepia:s(r.adjustSepia),colorize:function(e,t,n,o){return i(e,r.adjustColors(r.identity(),t,n,o))},sharpen:c([0,-1,0,-1,5,-1,0,-1,0]),emboss:c([-2,-1,0,-1,1,1,0,1,2]),gamma:a(function(e,t){return 255*Math.pow(e/255,1-t)}),exposure:a(function(e,t){return 255*(1-Math.exp(-(e/255)*t))}),colorFilter:i,convoluteFilter:o}}),r("tinymce/imagetoolsplugin/UndoStack",[],function(){return function(){function e(e){var t;return t=o.splice(++a),o.push(e),{state:e,removed:t}}function t(){return r()?o[--a]:void 0}function n(){return i()?o[++a]:void 0}function r(){return a>0}function i(){return-1!=a&&a<o.length-1}var o=[],a=-1;return{data:o,add:e,undo:t,redo:n,canUndo:r,canRedo:i}}}),r("tinymce/imagetoolsplugin/Dialog",["tinymce/dom/DOMUtils","tinymce/util/Tools","tinymce/util/Promise","tinymce/ui/Factory","tinymce/ui/Form","tinymce/ui/Container","tinymce/imagetoolsplugin/ImagePanel","tinymce/imagetoolsplugin/ImageTools","tinymce/imagetoolsplugin/Filters","tinymce/imagetoolsplugin/Conversions","tinymce/imagetoolsplugin/UndoStack"],function(e,t,n,r,i,o,a,s,l,c,u){function d(e){return{blob:e,url:URL.createObjectURL(e)}}function f(e){e&&URL.revokeObjectURL(e.url)}function h(e){t.each(e,f)}function m(n,c,m){function p(e){var t,n,r,i;t=O.find("#w")[0],n=O.find("#h")[0],r=parseInt(t.value(),10),i=parseInt(n.value(),10),O.find("#constrain")[0].checked()&&se&&le&&r&&i&&("w"==e.control.settings.name?(i=Math.round(r*ce),n.value(i)):(r=Math.round(i*ue),t.value(r))),se=r,le=i}function g(e){return Math.round(100*e)+"%"}function v(){O.find("#undo").disabled(!de.canUndo()),O.find("#redo").disabled(!de.canRedo()),O.statusbar.find("#save").disabled(!de.canUndo())}function y(){O.find("#undo").disabled(!0),O.find("#redo").disabled(!0)}function b(e){e&&j.imageSrc(e.url)}function x(e){return function(){var n=t.grep(ae,function(t){return t.settings.name!=e});t.each(n,function(e){e.hide()}),e.show()}}function C(e){W=d(e),b(W)}function w(e){n=d(e),b(n),h(de.add(n).removed),v()}function N(){var e=j.selection();s.crop(n.blob,e.x,e.y,e.w,e.h).then(function(e){w(e),S()})}function E(e){var t=[].slice.call(arguments,1);return function(){var r=W||n;e.apply(this,[r.blob].concat(t)).then(C)}}function _(e){var t=[].slice.call(arguments,1);return function(){e.apply(this,[n.blob].concat(t)).then(w)}}function S(){b(n),f(W),x(F)(),v()}function k(){W&&(w(W.blob),S())}function T(){var e=j.zoom();2>e&&(e+=.1),j.zoom(e)}function R(){var e=j.zoom();e>.1&&(e-=.1),j.zoom(e)}function A(){n=de.undo(),b(n),v()}function B(){n=de.redo(),b(n),v()}function D(){c(n.blob),O.close()}function M(e){return new i({layout:"flex",direction:"row",labelGap:5,border:"0 0 1 0",align:"center",pack:"center",padding:"0 10 0 10",spacing:5,flex:0,minHeight:60,defaults:{classes:"imagetool",type:"button"},items:e})}function P(e,t){return M([{text:"Back",onclick:S},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:k}]).hide().on("show",function(){y(),t(n.blob).then(function(e){var t=d(e);b(t),f(W),W=t})})}function L(e,t,r,i,o){function a(e){t(n.blob,e).then(function(e){var t=d(e);b(t),f(W),W=t})}return M([{text:"Back",onclick:S},{type:"spacer",flex:1},{type:"slider",flex:1,ondragend:function(e){a(e.value)},minValue:i,maxValue:o,value:r,previewFilter:g},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:k}]).hide().on("show",function(){this.find("slider").value(r),y()})}function H(e,t){function r(){var e,r,i;e=O.find("#r")[0].value(),r=O.find("#g")[0].value(),i=O.find("#b")[0].value(),t(n.blob,e,r,i).then(function(e){var t=d(e);b(t),f(W),W=t})}return M([{text:"Back",onclick:S},{type:"spacer",flex:1},{type:"slider",label:"R",name:"r",minValue:0,value:1,maxValue:2,ondragend:r,previewFilter:g},{type:"slider",label:"G",name:"g",minValue:0,value:1,maxValue:2,ondragend:r,previewFilter:g},{type:"slider",label:"B",name:"b",minValue:0,value:1,maxValue:2,ondragend:r,previewFilter:g},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:k}]).hide().on("show",function(){O.find("#r,#g,#b").value(1),y()})}function I(e){e.control.value()===!0&&(ce=le/se,ue=se/le)}var O,F,z,W,U,V,$,j,q,Y,X,K,G,J,Q,Z,ee,te,ne,re,ie,oe,ae,se,le,ce,ue,de=new u;U=M([{text:"Back",onclick:S},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:N}]).hide().on("show hide",function(e){j.toggleCropRect("show"==e.type)}).on("show",y),V=M([{text:"Back",onclick:S},{type:"spacer",flex:1},{type:"textbox",name:"w",label:"Width",size:4,onkeyup:p},{type:"textbox",name:"h",label:"Height",size:4,onkeyup:p},{type:"checkbox",name:"constrain",text:"Constrain proportions",checked:!0,onchange:I},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:"submit"}]).hide().on("submit",function(e){var t=parseInt(O.find("#w").value(),10),n=parseInt(O.find("#h").value(),10);e.preventDefault(),_(s.resize,t,n)(),S()}).on("show",y),$=M([{text:"Back",onclick:S},{type:"spacer",flex:1},{icon:"fliph",tooltip:"Flip horizontally",onclick:E(s.flip,"h")},{icon:"flipv",tooltip:"Flip vertically",onclick:E(s.flip,"v")},{icon:"rotateleft",tooltip:"Rotate counterclockwise",onclick:E(s.rotate,-90)},{icon:"rotateright",tooltip:"Rotate clockwise",onclick:E(s.rotate,90)},{type:"spacer",flex:1},{text:"Apply",subtype:"primary",onclick:k}]).hide().on("show",y),X=P("Invert",l.invert),ne=P("Sharpen",l.sharpen),re=P("Emboss",l.emboss),K=L("Brightness",l.brightness,0,-1,1),G=L("Hue",l.hue,180,0,360),J=L("Saturate",l.saturate,0,-1,1),Q=L("Contrast",l.contrast,0,-1,1),Z=L("Grayscale",l.grayscale,0,0,1),ee=L("Sepia",l.sepia,0,0,1),te=H("Colorize",l.colorize),ie=L("Gamma",l.gamma,0,-1,1),oe=L("Exposure",l.exposure,1,0,2),z=M([{text:"Back",onclick:S},{type:"spacer",flex:1},{text:"hue",icon:"hue",onclick:x(G)},{text:"saturate",icon:"saturate",onclick:x(J)},{text:"sepia",icon:"sepia",onclick:x(ee)},{text:"emboss",icon:"emboss",onclick:x(re)},{text:"exposure",icon:"exposure",onclick:x(oe)},{type:"spacer",flex:1}]).hide(),F=M([{tooltip:"Crop",icon:"crop",onclick:x(U)},{tooltip:"Resize",icon:"resize2",onclick:x(V)},{tooltip:"Orientation",icon:"orientation",onclick:x($)},{tooltip:"Brightness",icon:"sun",onclick:x(K)},{tooltip:"Sharpen",icon:"sharpen",onclick:x(ne)},{tooltip:"Contrast",icon:"contrast",onclick:x(Q)},{tooltip:"Color levels",icon:"drop",onclick:x(te)},{tooltip:"Gamma",icon:"gamma",onclick:x(ie)},{tooltip:"Invert",icon:"invert",onclick:x(X)}]),j=new a({flex:1,imageSrc:n.url}),q=new o({layout:"flex",direction:"column",border:"0 1 0 0",padding:5,spacing:5,items:[{type:"button",icon:"undo",tooltip:"Undo",name:"undo",onclick:A},{type:"button",icon:"redo",tooltip:"Redo",name:"redo",onclick:B},{type:"button",icon:"zoomin",tooltip:"Zoom in",onclick:T},{type:"button",icon:"zoomout",tooltip:"Zoom out",onclick:R}]}),Y=new o({type:"container",layout:"flex",direction:"row",align:"stretch",flex:1,items:[q,j]}),ae=[F,U,V,$,z,X,K,G,J,Q,Z,ee,te,ne,re,ie,oe],O=r.create("window",{layout:"flex",direction:"column",align:"stretch",minWidth:Math.min(e.DOM.getViewPort().w,800),minHeight:Math.min(e.DOM.getViewPort().h,650),title:"Edit image",items:ae.concat([Y]),buttons:[{text:"Save",name:"save",subtype:"primary",onclick:D},{text:"Cancel",onclick:"close"}]}),O.renderTo(document.body).reflow(),O.on("close",function(){m(),h(de.data),de=null,W=null}),de.add(n),v(),j.on("load",function(){se=j.imageSize().w,le=j.imageSize().h,ce=le/se,ue=se/le,O.find("#w").value(se),O.find("#h").value(le)})}function p(e){return new n(function(t,n){m(d(e),t,n)})}return{edit:p}}),r("tinymce/imagetoolsplugin/Plugin",["tinymce/PluginManager","tinymce/Env","tinymce/util/Promise","tinymce/util/URI","tinymce/util/Tools","tinymce/util/Delay","tinymce/imagetoolsplugin/ImageTools","tinymce/imagetoolsplugin/Conversions","tinymce/imagetoolsplugin/Dialog"],function(e,n,r,i,o,a,s,l,c){e.add("imagetools",function(e){function u(t){function n(e){return e.indexOf("px")==e.length-2}var r,i;return r=t.style.width,i=t.style.height,r||i?n(r)&&n(i)?{w:parseInt(r,10),h:parseInt(i,10)}:null:(r=e.$(t).attr("width"),i=e.$(t).attr("height"),r&&i?{w:parseInt(r,10),h:parseInt(i,10)}:null)}function d(t,n){var r,i;n&&(r=t.style.width,i=t.style.height,(r||i)&&e.$(t).css({width:n.w,height:n.h}).removeAttr("data-mce-style"),r=t.width,i=t.height,(r||i)&&e.$(t).attr({width:n.w,height:n.h}))}function f(e){return{w:e.naturalWidth,h:e.naturalHeight}}function h(){return e.selection.getNode()}function m(){return"imagetools"+M++}function p(t){var n=t.src;return 0===n.indexOf("data:")||0===n.indexOf("blob:")||new i(n).host===e.documentBaseURI.host}function g(t){return-1!==o.inArray(e.settings.imagetools_cors_hosts,new i(t.src).host)}function v(e){return new r(function(t){var n=new XMLHttpRequest;n.onload=function(){t(this.response)},n.open("GET",e,!0),P.imagetools_api_key&&n.setRequestHeader("tiny-api-key",P.imagetools_api_key),n.responseType="blob",n.send()})}function y(t){var n=t.src;if(g(t))return v(t.src);if(!p(t)){if(n=e.settings.imagetools_proxy,n+=(-1===n.indexOf("?")?"?":"&")+"url="+encodeURIComponent(t.src),P.imagetools_api_key)return v(n);t=new Image,t.src=n}return l.imageToBlob(t)}function b(){var t;return t=e.editorUpload.blobCache.getByUri(h().src),t?t:y(h()).then(function(t){return l.blobToBase64(t).then(function(n){var r=e.editorUpload.blobCache,i=r.create(m(),t,n);return r.add(i),i})})}function x(){B=a.setEditorTimeout(e,function(){e.editorUpload.uploadImagesAuto()},3e4)}function C(){clearTimeout(B)}function w(t,n){return l.blobToDataUri(t).then(function(r){var o,a,s,l,c;return c=h(),o=m(),s=e.editorUpload.blobCache,a=i.parseDataUri(r).data,l=s.create(o,t,a),s.add(l),e.undoManager.transact(function(){function t(){e.$(c).off("load",t),e.nodeChanged(),n?e.editorUpload.uploadImagesAuto():(C(),x())}e.$(c).on("load",t),e.$(c).attr({src:l.blobUri()}).removeAttr("data-mce-src")}),l})}function N(t){return function(){return e._scanForImages().then(b).then(t).then(w)}}function E(e){return function(){return N(function(t){var n=u(h());return n&&d(h(),{w:n.h,h:n.w}),s.rotate(t.blob(),e)})()}}function _(e){return function(){return N(function(t){return s.flip(t.blob(),e)})()}}function S(){var e=h(),t=f(e);e&&y(e).then(c.edit).then(function(n){return new r(function(r){l.blobToImage(n).then(function(i){var o=f(i);(t.w!=o.w||t.h!=o.h)&&u(e)&&d(e,o),URL.revokeObjectURL(i.src),r(n)})})}).then(function(e){w(e,!0)},function(){})}function k(){e.addButton("rotateleft",{title:"Rotate counterclockwise",onclick:E(-90)}),e.addButton("rotateright",{title:"Rotate clockwise",onclick:E(90)}),e.addButton("flipv",{title:"Flip vertically",onclick:_("v")}),e.addButton("fliph",{title:"Flip horizontally",onclick:_("h")}),e.addButton("editimage",{title:"Edit image",onclick:S}),e.addButton("imageoptions",{title:"Image options",icon:"options",cmd:"mceImage"})}function T(){e.on("NodeChange",function(n){D&&D.src!=n.element.src&&(C(),e.editorUpload.uploadImagesAuto(),D=t),R(n.element)&&(D=n.element)})}function R(t){var n=e.dom.is(t,"img:not([data-mce-object],[data-mce-placeholder])");return n&&(p(t)||g(t)||e.settings.imagetools_proxy)}function A(){var t=e.settings.imagetools_toolbar;t||(t="rotateleft rotateright | flipv fliph | crop editimage imageoptions"),e.addContextToolbar(R,t)}var B,D,M=0,P=e.settings;n.fileApi&&(k(),A(),T(),e.addCommand("mceEditImage",S))})}),o(["tinymce/imagetoolsplugin/Canvas","tinymce/imagetoolsplugin/Mime","tinymce/imagetoolsplugin/ImageSize","tinymce/imagetoolsplugin/Conversions","tinymce/imagetoolsplugin/ImageTools","tinymce/imagetoolsplugin/CropRect","tinymce/imagetoolsplugin/ImagePanel","tinymce/imagetoolsplugin/ColorMatrix","tinymce/imagetoolsplugin/Filters","tinymce/imagetoolsplugin/UndoStack","tinymce/imagetoolsplugin/Dialog","tinymce/imagetoolsplugin/Plugin"])}(this);