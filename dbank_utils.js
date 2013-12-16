//解析出来所需要的url
dbank={};
dbank.crt = {};
(function() {
    var c = function(h, l) {
        var k = [], e = 0, d, g = "";
        for (var f = 0; f < 256; f++) {
            k[f] = f
        }
        for (f = 0; f < 256; f++) {
            e = (e + k[f] + h.charCodeAt(f % h.length)) % 256;
            d = k[f];
            k[f] = k[e];
            k[e] = d
        }
        f = 0;
        e = 0;
        for (var m = 0; m < l.length; m++) {
            f = (f + 1) % 256;
            e = (e + k[f]) % 256;
            d = k[f];
            k[f] = k[e];
            k[e] = d;
            g += String.fromCharCode(l.charCodeAt(m) ^ k[(k[f] + k[e]) % 256])
        }
        return g
    };
    var b = function(d, e) {
        var h = 0, g = "", k = e.length, f = d.length;
        for (; h < f; h++) {
            var j = d.charCodeAt(h) ^ e.charCodeAt(h % k);
            g += String.fromCharCode(j)
        }
        return g
    };
    dbank.crt.decrypt = function(g, e) {
        g = dbank.base64.decode(g);
        var d, f = e.substr(0, 2);
        switch (f) {
            case "ea":
                d = g;
                break;
            case "eb":
                d = b(g, c(e, e));
                break;
            case "ed":
                d = b(g, $.md5(e));
                break;
            default:
                d = g
        }
        return d
    }
}());

(function(f) {
    var n = function(q, p) {
        return (q << p) | (q >>> (32 - p))
    };
    var b = function(t, q) {
        var v, p, s, u, r;
        s = (t & 2147483648);
        u = (q & 2147483648);
        v = (t & 1073741824);
        p = (q & 1073741824);
        r = (t & 1073741823) + (q & 1073741823);
        if (v & p) {
            return (r ^ 2147483648 ^ s ^ u)
        }
        if (v | p) {
            if (r & 1073741824) {
                return (r ^ 3221225472 ^ s ^ u)
            } else {
                return (r ^ 1073741824 ^ s ^ u)
            }
        } else {
            return (r ^ s ^ u)
        }
    };
    var o = function(p, r, q) {
        return (p & r) | ((~p) & q)
    };
    var m = function(p, r, q) {
        return (p & q) | (r & (~q))
    };
    var k = function(p, r, q) {
        return (p ^ r ^ q)
    };
    var j = function(p, r, q) {
        return (r ^ (p | (~q)))
    };
    var h = function(r, q, w, v, p, t, u) {
        r = b(r, b(b(o(q, w, v), p), u));
        return b(n(r, t), q)
    };
    var d = function(r, q, w, v, p, t, u) {
        r = b(r, b(b(m(q, w, v), p), u));
        return b(n(r, t), q)
    };
    var i = function(r, q, w, v, p, t, u) {
        r = b(r, b(b(k(q, w, v), p), u));
        return b(n(r, t), q)
    };
    var e = function(r, q, w, v, p, t, u) {
        r = b(r, b(b(j(q, w, v), p), u));
        return b(n(r, t), q)
    };
    var g = function(s) {
        var w;
        var r = s.length;
        var q = r + 8;
        var v = (q - (q % 64)) / 64;
        var u = (v + 1) * 16;
        var x = Array(u - 1);
        var p = 0;
        var t = 0;
        while (t < r) {
            w = (t - (t % 4)) / 4;
            p = (t % 4) * 8;
            x[w] = (x[w] | (s.charCodeAt(t) << p));
            t++
        }
        w = (t - (t % 4)) / 4;
        p = (t % 4) * 8;
        x[w] = x[w] | (128 << p);
        x[u - 2] = r << 3;
        x[u - 1] = r >>> 29;
        return x
    };
    var c = function(s) {
        var r = "", p = "", t, q;
        for (q = 0; q <= 3; q++) {
            t = (s >>> (q * 8)) & 255;
            p = "0" + t.toString(16);
            r = r + p.substr(p.length - 2, 2)
        }
        return r
    };
    var l = function(q) {
        q = q.replace(/\x0d\x0a/g, "\x0a");
        var p = "";
        for (var s = 0; s < q.length; s++) {
            var r = q.charCodeAt(s);
            if (r < 128) {
                p += String.fromCharCode(r)
            } else {
                if ((r > 127) && (r < 2048)) {
                    p += String.fromCharCode((r >> 6) | 192);
                    p += String.fromCharCode((r & 63) | 128)
                } else {
                    p += String.fromCharCode((r >> 12) | 224);
                    p += String.fromCharCode(((r >> 6) & 63) | 128);
                    p += String.fromCharCode((r & 63) | 128)
                }
            }
        }
        return p
    };
    f.extend({md5: function(p) {
            var w = Array();
            var H, I, q, v, G, R, Q, O, L;
            var E = 7, C = 12, A = 17, y = 22;
            var P = 5, M = 9, K = 14, J = 20;
            var u = 4, t = 11, s = 16, r = 23;
            var F = 6, D = 10, B = 15, z = 21;
            p = l(p);
            w = g(p);
            R = 1732584193;
            Q = 4023233417;
            O = 2562383102;
            L = 271733878;
            for (H = 0; H < w.length; H += 16) {
                I = R;
                q = Q;
                v = O;
                G = L;
                R = h(R, Q, O, L, w[H + 0], E, 3614090360);
                L = h(L, R, Q, O, w[H + 1], C, 3905402710);
                O = h(O, L, R, Q, w[H + 2], A, 606105819);
                Q = h(Q, O, L, R, w[H + 3], y, 3250441966);
                R = h(R, Q, O, L, w[H + 4], E, 4118548399);
                L = h(L, R, Q, O, w[H + 5], C, 1200080426);
                O = h(O, L, R, Q, w[H + 6], A, 2821735955);
                Q = h(Q, O, L, R, w[H + 7], y, 4249261313);
                R = h(R, Q, O, L, w[H + 8], E, 1770035416);
                L = h(L, R, Q, O, w[H + 9], C, 2336552879);
                O = h(O, L, R, Q, w[H + 10], A, 4294925233);
                Q = h(Q, O, L, R, w[H + 11], y, 2304563134);
                R = h(R, Q, O, L, w[H + 12], E, 1804603682);
                L = h(L, R, Q, O, w[H + 13], C, 4254626195);
                O = h(O, L, R, Q, w[H + 14], A, 2792965006);
                Q = h(Q, O, L, R, w[H + 15], y, 1236535329);
                R = d(R, Q, O, L, w[H + 1], P, 4129170786);
                L = d(L, R, Q, O, w[H + 6], M, 3225465664);
                O = d(O, L, R, Q, w[H + 11], K, 643717713);
                Q = d(Q, O, L, R, w[H + 0], J, 3921069994);
                R = d(R, Q, O, L, w[H + 5], P, 3593408605);
                L = d(L, R, Q, O, w[H + 10], M, 38016083);
                O = d(O, L, R, Q, w[H + 15], K, 3634488961);
                Q = d(Q, O, L, R, w[H + 4], J, 3889429448);
                R = d(R, Q, O, L, w[H + 9], P, 568446438);
                L = d(L, R, Q, O, w[H + 14], M, 3275163606);
                O = d(O, L, R, Q, w[H + 3], K, 4107603335);
                Q = d(Q, O, L, R, w[H + 8], J, 1163531501);
                R = d(R, Q, O, L, w[H + 13], P, 2850285829);
                L = d(L, R, Q, O, w[H + 2], M, 4243563512);
                O = d(O, L, R, Q, w[H + 7], K, 1735328473);
                Q = d(Q, O, L, R, w[H + 12], J, 2368359562);
                R = i(R, Q, O, L, w[H + 5], u, 4294588738);
                L = i(L, R, Q, O, w[H + 8], t, 2272392833);
                O = i(O, L, R, Q, w[H + 11], s, 1839030562);
                Q = i(Q, O, L, R, w[H + 14], r, 4259657740);
                R = i(R, Q, O, L, w[H + 1], u, 2763975236);
                L = i(L, R, Q, O, w[H + 4], t, 1272893353);
                O = i(O, L, R, Q, w[H + 7], s, 4139469664);
                Q = i(Q, O, L, R, w[H + 10], r, 3200236656);
                R = i(R, Q, O, L, w[H + 13], u, 681279174);
                L = i(L, R, Q, O, w[H + 0], t, 3936430074);
                O = i(O, L, R, Q, w[H + 3], s, 3572445317);
                Q = i(Q, O, L, R, w[H + 6], r, 76029189);
                R = i(R, Q, O, L, w[H + 9], u, 3654602809);
                L = i(L, R, Q, O, w[H + 12], t, 3873151461);
                O = i(O, L, R, Q, w[H + 15], s, 530742520);
                Q = i(Q, O, L, R, w[H + 2], r, 3299628645);
                R = e(R, Q, O, L, w[H + 0], F, 4096336452);
                L = e(L, R, Q, O, w[H + 7], D, 1126891415);
                O = e(O, L, R, Q, w[H + 14], B, 2878612391);
                Q = e(Q, O, L, R, w[H + 5], z, 4237533241);
                R = e(R, Q, O, L, w[H + 12], F, 1700485571);
                L = e(L, R, Q, O, w[H + 3], D, 2399980690);
                O = e(O, L, R, Q, w[H + 10], B, 4293915773);
                Q = e(Q, O, L, R, w[H + 1], z, 2240044497);
                R = e(R, Q, O, L, w[H + 8], F, 1873313359);
                L = e(L, R, Q, O, w[H + 15], D, 4264355552);
                O = e(O, L, R, Q, w[H + 6], B, 2734768916);
                Q = e(Q, O, L, R, w[H + 13], z, 1309151649);
                R = e(R, Q, O, L, w[H + 4], F, 4149444226);
                L = e(L, R, Q, O, w[H + 11], D, 3174756917);
                O = e(O, L, R, Q, w[H + 2], B, 718787259);
                Q = e(Q, O, L, R, w[H + 9], z, 3951481745);
                R = b(R, I);
                Q = b(Q, q);
                O = b(O, v);
                L = b(L, G)
            }
            var N = c(R) + c(Q) + c(O) + c(L);
            return N.toLowerCase()
        }})
})(jQuery);



(function() {
    var b = {};
    b.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    b.encode = function(p, r) {
        r = (typeof r == "undefined") ? false : r;
        var i, f, d, t, q, m, l, j, k = [], h = "", o, s, n;
        var g = b.code;
        s = r ? p.encodeUTF8() : p;
        o = s.length % 3;
        if (o > 0) {
            while (o++ < 3) {
                h += "=";
                s += "\0"
            }
        }
        for (o = 0; o < s.length; o += 3) {
            i = s.charCodeAt(o);
            f = s.charCodeAt(o + 1);
            d = s.charCodeAt(o + 2);
            t = i << 16 | f << 8 | d;
            q = t >> 18 & 63;
            m = t >> 12 & 63;
            l = t >> 6 & 63;
            j = t & 63;
            k[o / 3] = g.charAt(q) + g.charAt(m) + g.charAt(l) + g.charAt(j)
        }
        n = k.join("");
        n = n.slice(0, n.length - h.length) + h;
        return n
    };
    b.decode = function(p, g) {
        g = (typeof g == "undefined") ? false : g;
        var i, f, e, q, m, k, j, s, l = [], r, o;
        var h = b.code;
        o = g ? p.decodeUTF8() : p;
        for (var n = 0; n < o.length; n += 4) {
            q = h.indexOf(o.charAt(n));
            m = h.indexOf(o.charAt(n + 1));
            k = h.indexOf(o.charAt(n + 2));
            j = h.indexOf(o.charAt(n + 3));
            s = q << 18 | m << 12 | k << 6 | j;
            i = s >>> 16 & 255;
            f = s >>> 8 & 255;
            e = s & 255;
            l[n / 4] = String.fromCharCode(i, f, e);
            if (j == 64) {
                l[n / 4] = String.fromCharCode(i, f)
            }
            if (k == 64) {
                l[n / 4] = String.fromCharCode(i)
            }
        }
        r = l.join("");
        return g ? r.decodeUTF8() : r
    };
    dbank.base64 = b
}());



var replaceRTraceU = function(url) {
	var key   = 'tc',
			//value = $.cookie('r_trace_u');
	value="anonymous_2013-12-05_63134283"; 
	if (!value) {
			return url;
	}

	var maturl = '', substr = '', result = '';
	if (url.indexOf('#') != -1) {
			maturl = url.split('#')[0];
			substr = '#' + url.split('#')[1];
	} else {
			maturl = url;
	}
	var reg = new RegExp('(\\?|&)'+key+'=([^&]*)(&|$)');
	var matchStr = maturl.match(reg);
	if (matchStr) {
			result = maturl.replace(reg, matchStr[1] + key + '=' + value + matchStr[3]);
	} else {
			result = maturl + (maturl.indexOf('?') == -1 ? '?' : '&') + key + '=' + value;
	}
	return result + substr;
}


var intervalId = setInterval(function() {
	var $el = $("#down_filelist");	
	if($el.size()>0){
		var jsonData = $el.attr('dataurls');
		if(!jsonData){
			return ;
		}	
		
		clearInterval(intervalId);
		
		var obj = eval("("+jsonData+")");
		var encrykey = obj.en;
		var burls = obj.urls;
		
		var durl = [];
		for(var i =0;i<burls.length;i++){
			var burl = burls[i];
			var surl = dbank.crt.decrypt(burl,encrykey)                
			var url = replaceRTraceU(surl);
			durl.push(url);
		}
		console.log(durl);
	}
}, 500);



/* 本数据都在页面上的 globallinkdata 的json字符串中*/
/*
var downloadurl = "W0BCFA5KSVxZGVNTVVZYS1pbXBxWDERbXV9WXBt\/VxABA0VPdU42UUdWQ1QfFRguVVVEQBkhUlFUXEMWUltTVgxSCwcECgVTAkVfVUMeWlgIAhdbD1IADQcCAwgNAgMTRQlQB1EAAl4CDhFECVwCBlsHAFAFRVpFDAUPFgYDAhsBAhhWBFZASAgHEV1EUVdYH0BSDgNFUkBYVAoeWEQP";
var encrykey ="ed34283930"; 
        
var g = dbank.crt.decrypt(downloadurl,encrykey)
                
var gg = replaceRTraceU(g)
                
console.log(gg)
*/