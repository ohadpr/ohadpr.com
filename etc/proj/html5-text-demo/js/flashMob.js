// flashMob
// Ohad Eder Pressman 2010 (oahdpr.com)

function flashMob() {
	this.r		= 0;	// our raphael object
	this.background = 0;	// the background vector graphics used
	this.objects	= [];	// an array of all the visual objects created on this canvas
	this.text = {			// details about the text we're displaying
		str: 	"",
		font: 	"",
		size: 	0,
		layout: {
			offset: 		0,
			isDrawMarkers: 	0			
		}
	}
	this.path = {			// the path along-which our text is layed out
		points: 	[],
		obj: 		null,
		markers: 	[],
		dragIndex:	-1,
		E: 			{x: 0, y: 0}
	};
	
	// initialize the flashMob object
	this.init = function(domObject, width, height) {
		// raphael code
		this.r = Raphael(domObject, width, height);

		this.background = this.r.rect(0, 0, this.r.width-1, this.r.height-1).attr({
			fill: 	"#eee",
			stroke: "#f00",
			opacity: 1
		});
		
		// init temp path
		this.path.points.push({x:100,y:100});
		this.path.points.push({x:200,y:150});
		this.path.points.push({x:300,y:160});
		this.path.points.push({x:400,y:200});
		
		this.rebuildPath();
		
		//this.path.obj = this.r.path("M100,200 C100,100 250,100 250,200 S400,300 400,200").attr({stroke: "#00f"});
		var _this = this;
		$(document).mousemove(function(e){
			// e.pageX - gives you X position
			// e.pageY - gives you Y position
			if (_this.path.dragIndex != -1) {
				e = e || window.event;
				var x = e.pageX - _this.path.E.x,
				y = e.pageY - _this.path.E.y;
				_this.path.E.x = e.pageX;
				_this.path.E.y = e.pageY;
				_this.updatePathMarker(_this.path.dragIndex, x, y);
			}
		});

		$(document).mouseup(function(e){
			_this.path.dragIndex = -1;
		});
	}
		
	this.rebuildPath = function() {
		var pathString = "";
		for (i=0, ii=this.path.points.length; i<ii; i++) {
			pathString += pathString == "" ? "M" : "L";
			pathString += "" + this.path.points[i].x + " " + this.path.points[i].y;
		}

		this.path.obj && this.path.obj.remove();
		
		$(this.path.markers).each(function(i){
			this.remove();		
		});
		
		this.path.obj = this.r.path(pathString).attr({stroke: "#00f"});

		// create markers which can be dragged to drag the path
		this.path.markers = this.r.set();
		for (i=0, ii=this.path.points.length; i<ii; i++) {
			this.path.markers.push(
				this.r.circle(this.path.points[i].x, this.path.points[i].y, 5)
			);
			
			this.path.markers[this.path.markers.length-1].index = i;
		}

		this.path.markers.attr({fill: "#aa0", stroke: "#aa0"});

		var path = this.path;
		this.path.markers.mousedown(function(e) {
			path.dragIndex	= this.index;
			path.E.x		= e.clientX;
			path.E.y		= e.clientY;
		});
	}
	
	this.updatePathMarker = function(dragIndex, x, y) {
		var marker = this.path.markers[dragIndex];
		
		var X = marker.attr("cx") + x,
			Y = marker.attr("cy") + y;
		marker.attr({cx: X, cy: Y});
		
		this.rebuildPathFromMarkers();
		this.layoutText();
	}
	
	
	this.rebuildPathFromMarkers = function() {			
		// redo path
		var pathString = "";
		
		for (i=0, ii=this.path.markers.length; i<ii; i++) {
			pathString += pathString == "" ? "M" : "L";
			pathString += "" + this.path.markers[i].attr("cx") + " " + this.path.markers[i].attr("cy");
		}

		this.path.obj && this.path.obj.remove();

		this.path.obj = this.r.path(pathString).attr({stroke: "#00f"});
	}
	
	// update our text object (re-calc whatever necessary)
	this.updateText = function(params) {
		if (params.str	== this.text.str &&
			params.font == this.text.font &&
			params.size == this.text.size) {
			return;
		}
		
		// rebuild the structure
		this.text.str		= params.str;
		this.text.font		= params.font;
		this.text.size		= params.size;
		this.text.letters	= [];

		// calculate the paths for our text
		var letters		= params.str.split(''),
			offset 		= 0,
			path		= '',
			font		= this.r.getFont(params.font),
			isBaseLine	= true; // baseline or middle
		var scale		= params.size / font.face["units-per-em"];
		var bb			= font.face.bbox.split(/[, ]+/),
			top			= +bb[0],
			height		= +bb[1] + (isBaseLine ? bb[3] - bb[1] + (+font.face.descent) : (bb[3] - bb[1]) / 2);

		for (var i = 0, ii = letters.length; i < ii; i++) {
			var glyph = font.glyphs[letters[i]];

			var width	= glyph.w || font.w;	// this character's width
			var spacing	= i<ii-1 && glyph.k && glyph.k[letters[i+1]] || 0;	// the spacing between this character and the next one

			// if we have a glyph for this character, add it
			if (glyph && glyph.d) {
				this.text.letters.push({
					char: 	glyph.d,
					offset:	offset,
					width:	width
				});
			}

			offset += width+spacing;
		}

		this.text.top		= top;
		this.text.height	= height;
		this.text.scale		= scale;
	}

	this.layoutText = function(params) {
		if (typeof params != 'undefined') {
			this.text.layout = params;			
		}
		
		// delete the text svg object
		$.each(this.objects, function(i){
			this.remove();
		});

		for (var i = 0, ii = this.text.letters.length; i < ii; i++) {
			var obj = this.text.letters[i];

			var char = this.r.path(obj.char).attr({fill: "#000", stroke: "none"});	// create the vector object
			char.translate(-this.text.top,-this.text.height).scale(this.text.scale, this.text.scale, 0, 0);	// align it on the baseline? and scale according to font size

			// calculate character's horizontal offset on the text line (characters aren't evenly placed one after another)
			var startX 	= this.text.layout.offset + obj.offset;
			var centerX	= startX + obj.width/2;

			// convert this horizontal offset to a point on the target path
			var point1	= this.path.obj.getPointAtLength(startX*this.text.scale);	// left side of the character
			var point2	= this.path.obj.getPointAtLength(centerX*this.text.scale);	// centerpoint of the character

			char.translate(point1.x, point1.y);						// place the character on the path
			char.rotate(point2.alpha-180.0 , point1.x, point1.y);	// rotate according to the path's orientation

			this.objects.push(char);

			if (this.text.layout.isDrawMarkers) {
				// mark character positions
				this.objects.push( this.r.circle(point1.x, point1.y, 2).attr({fill: "#f00", stroke:"none"}) );

				var endX	= startX + obj.width;
				var point3 = this.path.obj.getPointAtLength(endX*this.text.scale);		// right side of the character

				// left side
				var dx = 40*Math.cos((point1.alpha+90)*3.14158/180.0);
				var dy = 40*Math.sin((point1.alpha+90)*3.14158/180.0);
				this.objects.push( this.r.path("M"+point1.x+" "+point1.y+"L"+(point1.x+dx)+" "+(point1.y+dy)).attr({stroke:"#f00"}) );

				// right side
				var dx = 40*Math.cos((point3.alpha+90)*3.14158/180.0);
				var dy = 40*Math.sin((point3.alpha+90)*3.14158/180.0);
				this.objects.push( this.r.path("M"+point3.x+" "+point3.y+"L"+(point3.x+dx)+" "+(point3.y+dy)).attr({stroke:"#f00"}) );
			}
		}
	}
};