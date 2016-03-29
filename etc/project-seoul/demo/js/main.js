$( document ).ready(function() {
    function ptinrect(pt,rect) {
        return pt.x>rect.left && pt.x<rect.right && pt.y>rect.top && pt.y<rect.bottom;
    }

    function preload(sources)
    {
        $.each(sources, function(i,source) { jQuery.get('static/right-'+source+'.png'); });
    }

    preload(['chat', 'news', 'calendar', 'ereader1', 'erader2', 'pdp', 'college-life', 'flipboard', 'settings', 'coursera1', 'coursera2', 'tbs', 'evernote1', 'evernote2', 'easybib', 'wolfram', 'wikipedia', 'gdocs', 'youtube', 'internships', 'flashcards', 'electromagnetism', 'electromagnetism2', 'share', 'kindle', 'serp', 'courses', 'courses2', 'studyaudio', 'studyperson', 'studycamera', 'studytext', 'cheggchat']);

    window.demoClickMode = '1screen';
    window.prevPoint = {x:-1,y:-1};
    window.curImage = '';

    // adjust flip-mode button opacity to actual mode
    $('#flip-mode').css('opacity', window.demoClickMode == '1screen' ? 0 : 0.2);

    $('#left-content').on('click', function(e) {
        var imgWidth = $('#extra-container').width();
        var imgOrigWidth = 1080;
        var scale = imgWidth/imgOrigWidth;
        var pos = $('#left-container').offset();
        var pt = {
            x: (e.pageX - pos.left) / scale,
            y: ($('#extra-container').scrollTop() + e.pageY - pos.top) / scale
        }

        //console.log(['*****', e.offsetX / scale, ($('#extra-container').scrollTop() + e.offsetY) / scale])

        var img = '';

        if (ptinrect(pt, {left:980, top:78, right:1080, bottom:174}))     { img = 'settings'; }

        if (ptinrect(pt, {left:39, top:545, right:766, bottom:645}))     { img = 'news'; }
        if (ptinrect(pt, {left:805, top:556, right:1062, bottom:883}))     { img = 'college-life'; }

        if (ptinrect(pt, {left:306, top:1019, right:523, bottom:1243}))     { img = 'chat'; }
        if (ptinrect(pt, {left:798, top:1033, right:1026, bottom:1286}))     { img = 'cheggchat'; }

        if (ptinrect(pt, {left:609, top:1479, right:1062, bottom:1554}))     { img = 'calendar'; }

        if (ptinrect(pt, {left:49, top:1992, right:310, bottom:2323}))     { img = 'ereader1'; }
        if (ptinrect(pt, {left:324, top:2006, right:559, bottom:2316}))     { img = 'ereader2'; }
        if (ptinrect(pt, {left:584, top:2003, right:834, bottom:2306}))     { img = 'pdp'; }
        if (ptinrect(pt, {left:855, top:2010, right:1090, bottom:2323}))     { img = 'kindle'; }
        if (ptinrect(pt, {left:987, top:1899, right:1076, bottom:1981}))     { img = 'serp'; }

        if (ptinrect(pt, {left:42, top:2423, right:1065, bottom:2523}))     { img = 'coursera1'; }
        if (ptinrect(pt, {left:39, top:2500, right:1062, bottom:2630}))     { img = 'coursera2'; }
        if (ptinrect(pt, {left:994, top:2352, right:1080, bottom:2423}))     { img = 'courses'; }
        if (ptinrect(pt, {left:680, top:2651, right:987, bottom:3029}))     { img = 'flipboard'; }

        if (ptinrect(pt, {left:35, top:3203, right:556, bottom:3299}))     { img = 'electromagnetism'; }
        if (ptinrect(pt, {left:42, top:3407, right:534, bottom:3514}))     { img = 'tbscalc'; }
        if (ptinrect(pt, {left:46, top:3514, right:538, bottom:3621}))     { img = 'evernote1'; }

        if (ptinrect(pt, {left:605, top:3196, right:1062, bottom:3317}))     { img = 'flashcards'; }
        if (ptinrect(pt, {left:616, top:3317, right:1072, bottom:3431}))     { img = 'tbs'; }
        if (ptinrect(pt, {left:609, top:3431, right:1065, bottom:3538}))     { img = 'evernote2'; }
        if (ptinrect(pt, {left:613, top:3545, right:1065, bottom:3652}))     { img = 'wolfram'; }
        if (ptinrect(pt, {left:605, top:3662, right:1072, bottom:3780}))     { img = 'easybib'; }

        if (ptinrect(pt, {left:49, top:4002, right:146, bottom:4102}))     { img = 'studytext'; }
        if (ptinrect(pt, {left:167, top:4006, right:260, bottom:4106}))     { img = 'studycamera'; }
        if (ptinrect(pt, {left:292, top:4009, right:388, bottom:4106}))     { img = 'studyaudio'; }
        if (ptinrect(pt, {left:417, top:4009, right:509, bottom:4109}))     { img = 'studyperson'; }

        if (ptinrect(pt, {left:46, top:4310, right:1062, bottom:4406}))     { img = 'youtube'; }
        if (ptinrect(pt, {left:35, top:4416, right:1069, bottom:4516}))     { img = 'wikipedia'; }
        if (ptinrect(pt, {left:46, top:4512, right:1072, bottom:4619}))     { img = 'gdocs'; }

        if (ptinrect(pt, {left:42, top:4843, right:1065, bottom:4958}))     { img = 'internships'; }

        // now based on mode decide what to do with the image
        if (window.demoClickMode == '2screens') {
            if (img == '') {
                $('#right-container').css('opacity',0);
            } else {
                $('#right-content').attr('src','static/right-'+img+'.png');
                $('#right-container').css('opacity',1);
            }
        } else if (window.demoClickMode == '1screen') {
            if (img != '') {
                $('#left-content2').attr('src', 'static/right-'+img+'.png');
                $('#extra-container').css('margin-left','-100%');
            }
        }

        if (img != '') {
            console.log('hit: ' + img);
        }

        //$(this).off('click');

        //console.log(pt);

        console.log("if (ptinrect(pt, {left:"+Math.floor(window.prevPoint.x)+", top:"+Math.floor(window.prevPoint.y)+", right:"+Math.floor(pt.x)+", bottom:"+Math.floor(pt.y)+"}))     { img = '---'; }");

        window.prevPoint = pt;

        window.curImage = img;
    });

    function image2ndInteractionMode(curImage) {
        var newImage = curImage;
        if (curImage == 'wikipedia') { newImage = 'share'; }
        if (curImage == 'share')     { newImage = 'wikipedia'; }
        if (curImage == 'electromagnetism') {newImage = 'electromagnetism2'; }
        if (curImage == 'electromagnetism2') {newImage = 'electromagnetism'; }
        if (curImage == 'courses') {newImage = 'courses2'; }
        if (curImage == 'courses2') {newImage = 'courses3'; }
        if (curImage == 'courses3') {newImage = 'courses'; }
        return newImage;
    }

    // 2nd state click for 2screens mode
    $('#right-content').on('click', function(e) {
        var newImage = image2ndInteractionMode(window.curImage);

        if (newImage != window.curImage) {
            $('#right-content').attr('src', 'static/right-'+newImage+'.png');
            window.curImage = newImage;
        } else {
            // UI optimization - slide back, avoid having to click 'back' every time
            $('#right-container').css('opacity',0);
        }
    });

    // 2nd state click for 1screen mode
    $('#left-content2').on('click', function(e) {
        if (e.pageY < 140) {
            // allow to escape back to home screen if demoing on phone
            $('#extra-container').css('margin-left','0');
            return;
        }

        var newImage = image2ndInteractionMode(window.curImage);

        if (newImage != window.curImage) {
            $('#left-content2').attr('src', 'static/right-'+newImage+'.png');
            window.curImage = newImage;
        } else {
            // UI optimization - slide back, avoid having to click 'back' every time
            $('#extra-container').css('margin-left','0');
        }
    });

    // switch between 1screen and 2screens modes
    $('#flip-mode').click(function() {
        if (window.demoClickMode == '1screen') {
            window.demoClickMode = '2screens';
            $('#extra-container').css('margin-left','0');
        } else {
            window.demoClickMode = '1screen';
            $('#right-container').css('opacity',0);
        }

        $('#flip-mode').css('opacity', window.demoClickMode == '1screen' ? 0 : 0.2);
    })

    // back
    $('#back-btn').click(function() {
        if (window.demoClickMode == '1screen') {
            $('#extra-container').css('margin-left','0');
        } else {
            $('#right-container').css('opacity',0);
        }
    })
});
