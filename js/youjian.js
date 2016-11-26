(function(d) {
	var box = d.querySelector("#box");
	var list = d.querySelector("#list");
	// 生成右键结构

	// 创建一级选项
	for (var i = 0; i < data.length; i++){
		var lis = d.createElement("li");
		var h2s = d.createElement("h2");
		lis.className = "li";
		h2s.innerHTML = data[i].name;
		lis.appendChild(h2s);

		// 创建二级选项
		if (data[i].obj) {

			var span = d.createElement("span");		// 判断有子级的h2加span
			span.innerHTML = ">";
			h2s.appendChild(span);

			var ul = d.createElement("ul");
			for (var j = 0; j < data[i].obj.length; j++){
				var li = d.createElement("li");
				var h2 = d.createElement("h2");
				h2.innerHTML = data[i].obj[j].name;
				li.appendChild(h2);
				ul.appendChild(li);

				// 创建三级选项
				if (data[i].obj[j].child) {

					var spans = d.createElement("span");		// 判断有子级的h2加span
					spans.innerHTML = ">";
					h2.appendChild(spans);


					var u = d.createElement("ul");
					for (var k = 0; k < data[i].obj[j].child.length; k++) {
						var l = d.createElement("li");
						var h = d.createElement("h2");
						h.innerHTML = data[i].obj[j].child[k].name;
						l.appendChild(h);
						u.appendChild(l);
					}
					li.appendChild(u);
				}
			}
			lis.appendChild(ul);
		}

		list.appendChild(lis);
	}

	var h2S = list.querySelectorAll("h2");
	var uls = list.querySelectorAll("ul");
	var h2SS = Array.from(h2S);

	var liC = d.querySelectorAll(".li");
	var n = liC[8].children[0];

	var listL = 0;
	var listT = 0;

	d.onclick = function() {
		list.className = "hide";
		for (var i = 0; i < h2S.length; i++) {
			h2S[i].className = "";
		}
		for (var i = 0; i < uls.length; i++) {
			uls[i].className = "hide";
		}
	};

	// 右键点击事件
	d.oncontextmenu = function(e) {
		list.className = "show";
		list.style.cssText = "left:"+e.pageX+"px;top:"+e.pageY+"px";

		listL = list.style.left; // 记录下右键点击的坐标
		listT = list.style.top;

		n.addEventListener("click",fnClick);

		return false;
	}

	function fnClick(e) {	// 点击新建文件
		var folder = d.createElement("div");
		var ico = d.createElement("div");
		var text = d.createElement("p");
		folder.id = "folder";
		folder.style.left = listL;
		folder.style.top = listT;
		folder.style.position = "absolute";
		text.innerHTML = "新建文件夹";
		folder.appendChild(ico);
		folder.appendChild(text);
		box.appendChild(folder);
	};

	// 鼠标移入
	h2SS.forEach(function(e,i) {
		e.addEventListener("mouseover",fnMover);
	});

	function fnMover() {
		var parent = this.parentNode; //li
		var parentP = parent.parentNode; //ul
		var parentPL = parentP.children; //ul下的li

		for (var i = 0; i < parentPL.length; i++) {
			if (parentPL != parent) {
				var uls = parentPL[i].querySelectorAll("ul");
				for (var j = 0; j < uls.length; j++) {
					uls[j].className = "hide";
				}
			}
		}

		for (var i = 0; i < h2S.length; i++) {
			h2S[i].className = "";
		}
		active(this);
		function active(h2) {
			h2.className = "hover";
			if (h2.parentNode.parentNode.previousElementSibling) {
				active(h2.parentNode.parentNode.previousElementSibling)
			}
		}

		if (this.nextElementSibling) {
			this.nextElementSibling.className = "show";
		}
	}
	return false;
})(document);