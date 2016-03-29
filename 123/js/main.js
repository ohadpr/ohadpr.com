(function($) {
    $(document).ready(function() {
        var lastText = "";
        $('#txtContent').on('keyup', function(e) {
            var currentText = $('#txtContent').val();
            if (currentText !== lastText) {
                lastText = currentText;
                var className = $('#theme-select').find('li').eq($('#theme').data('option') - 1).children().data('name');
                $('.right-side').removeClass()
                    .addClass(className + ' right-side')
                    .empty()
                    .append('<h1>' + lastText + '</h1>');
            }
            if($('#configures').children().size()===0){
                setConfigure('vintage');
            }
        });
        $("#font-select").on('click', 'li', function() {

            $('body').append("<link rel='stylesheet' id='colorbox-css'  href='http://fonts.googleapis.com/css?family=" + escape($(this).text()) + "' type='text/css' media='all' />");

            $('.right-side').children().css({
                'font-family': '"' + $(this).text() + '"'
            });

        });
        $("#theme-select").on('click', 'li', function() {
            var className = $(this).children().data('name');
            $('.right-side').removeClass().addClass(className + ' right-side');
            setConfigure(className);
        });
        var setConfigure=function(themeName){
            var config = '';
            switch (themeName) {
                case 'vintage':
                    config = {
                        attr: {
                            'Shadow Left': {
                                min: 1,
                                max: 20,
                                name:'Shadow Left',
                                'default':5
                            },
                            'Shadow Top': {
                                min: 1,
                                max: 20,
                                name:'Shadow Top',
                                'default':5
                            },
                            'Shadow Blur': {
                                min: 0,
                                max: 20,
                                name:'Shadow Blur',
                                'default':0
                            }
                        },
                        style: function() {
                            var style= (this.attr['Shadow Left'].current?this.attr['Shadow Left'].current:this.attr['Shadow Left']["default"]) +
                                'px ' + (this.attr['Shadow Top'].current?this.attr['Shadow Top'].current:this.attr['Shadow Top']["default"]) + 'px 0px #eee, ' +
                                (parseInt(this.attr['Shadow Left'].current?this.attr['Shadow Left'].current:this.attr['Shadow Left']["default"]) + 2) + 'px ' +
                                (parseInt(this.attr['Shadow Top'].current?this.attr['Shadow Top'].current:this.attr['Shadow Top']["default"]) + 2) + 'px ' +
                                (this.attr['Shadow Blur'].current?this.attr['Shadow Blur'].current:this.attr['Shadow Blur']["default"]) + 'px #707070';
                            console.log(style);
                            return style;
                        }
                    };
                    break;
                case 'inset':
                    config = {
                        attr: {
                            'Shadow Left': {
                                min: 0,
                                max: 20,
                                name:'Shadow Left',
                                'default':0
                            },
                            'Shadow Top': {
                                min: 1,
                                max: 20,
                                name:'Shadow Top',
                                'default':2
                            },
                            'Shadow Blur': {
                                min: 0,
                                max: 20,
                                name:'Shadow Blur',
                                'default':3
                            }
                        },
                        style: function() {
                            var shadowLeft=this.attr['Shadow Left'].current?this.attr['Shadow Left'].current:this.attr['Shadow Left']["default"];
                            var shadowTop=this.attr['Shadow Top'].current?this.attr['Shadow Top'].current:this.attr['Shadow Top']["default"];
                            var shadowBlur=this.attr['Shadow Blur'].current?this.attr['Shadow Blur'].current:this.attr['Shadow Blur']["default"];
                            var style= shadowLeft+'px '+shadowTop+'px '+shadowBlur+'px #666';
                            console.log(style);
                            return style;
                        }
                    };
                    break;
                case 'neon':
                    config = {
                        attr: {
                            'Shadow Scope': {
                                min: 1,
                                max: 20,
                                name:'Shadow Scope',
                                'default':5
                            },
                            'Shadow Color': {
                                name:'Shadow Color',
                                'default':'#ff00de',
                                type:'colorpicker'
                            }
                        },
                        style: function() {
                            var color=this.attr['Shadow Color'].current?this.attr['Shadow Color'].current:this.attr['Shadow Color']["default"];
                            var scope=this.attr['Shadow Scope'].current?this.attr['Shadow Scope'].current:this.attr['Shadow Scope']["default"];
                            var style= '0 0 '+scope*2+'px #fff, 0 0 '+scope*4+'px #fff, 0 0 '+scope*6+'px #fff, 0 0 '+scope*8+'px '+color+', 0 0 '+scope*14+'px '+color+', 0 0 '+scope*16+'px '+color+', 0 0 '+scope*20+'px '+color+', 0 0 '+scope*30+'px '+color+'';
                            console.log(style);
                            return style;
                        }
                    };
                    break;
                case 'anaglyphic':
                    config = {
                        attr: {
                            'Shadow Offset': {
                                min: 1,
                                max: 20,
                                name:'Shadow Offset',
                                'default':8
                            },
                            'Shadow Blur': {
                                min: 0,
                                max: 20,
                                name:'Shadow Blur',
                                'default':0
                            }
                        },
                        style: function() {
                            var shadowOffset=this.attr['Shadow Offset'].current?this.attr['Shadow Offset'].current:this.attr['Shadow Offset']["default"];
                            var shadowBlur=this.attr['Shadow Blur'].current?this.attr['Shadow Blur'].current:this.attr['Shadow Blur']["default"];
                            var style= shadowOffset+'px '+shadowOffset+'px '+shadowBlur+'px rgba(255,0,180,0.5)';
                            console.log(style);
                            return style;
                        }
                    };
                    break;
                case 'fire':
                    config = {
                        attr: {
                            'Shadow Offset': {
                                min: 1,
                                max: 20,
                                name:'Shadow Offset',
                                'default':10
                            }
                        },
                        style: function() {
                            var shadowOffset=this.attr['Shadow Offset'].current?this.attr['Shadow Offset'].current:this.attr['Shadow Offset']["default"];
                            var style= '0 0 '+shadowOffset*2+'px #fefcc9, '+shadowOffset+'px -'+shadowOffset+'px '+shadowOffset*3+'px #feec85, -'+shadowOffset*2+'px -'+shadowOffset*2+'px '+shadowOffset*4+'px #ffae34, '+shadowOffset*2+'px -'+shadowOffset*4+'px '+shadowOffset*5+'px #ec760c, -'+shadowOffset*2+'px -'+shadowOffset*6+'px '+shadowOffset*6+'px #cd4606, 0 -'+shadowOffset*8+'px '+shadowOffset*7+'px #973716, '+shadowOffset+'px -'+shadowOffset*9+'px '+shadowOffset*8+'px #451b0e';
                            console.log(style);
                            return style;
                        }
                    };
                    break;
                case 'boardgame':
                    config = {
                        attr: {
                            'Shadow Offset': {
                                min: 1,
                                max: 20,
                                name:'Shadow Offset',
                                'default':10
                            }
                        },
                        style: function() {
                            var shadowOffset=this.attr['Shadow Offset'].current?this.attr['Shadow Offset'].current:this.attr['Shadow Offset']["default"];
                            var style= shadowOffset+'px '+shadowOffset+'px 0 #ffd217, '+shadowOffset*2+'px '+shadowOffset*2+'px 0 #5ac7ff, '+shadowOffset*3+'px '+shadowOffset*3+'px 0 #ffd217, '+shadowOffset*4+'px '+shadowOffset*4+'px 0 #5ac7ff';
                            console.log(style);
                            return style;
                        }
                    };
                    break;
                case 'three-dimensional':
                    config = {
                        attr: {
                            'Shadow Offset': {
                                min: 1,
                                max: 10,
                                name:'Shadow Offset',
                                'default':4
                            },
                            'Shadow Scope': {
                                min: 1,
                                max: 15,
                                name:'Shadow Scope',
                                'default':4
                            }
                        },
                        style: function() {
                            var shadowOffset=this.attr['Shadow Offset'].current?this.attr['Shadow Offset'].current:this.attr['Shadow Offset']["default"];
                            var shadowScope=this.attr['Shadow Scope'].current?this.attr['Shadow Scope'].current:this.attr['Shadow Scope']["default"];
                            var style= '0 '+shadowOffset+'px 0 #ccc, 0 '+shadowOffset*2+'px 0 #c9c9c9, 0 '+shadowOffset*3+'px 0 #bbb, 0 '+shadowOffset*4+'px 0 #b9b9b9, 0 '+shadowOffset*5+'px 0 #aaa, 0 '+shadowScope*6+'px '+shadowScope+'px rgba(0,0,0,.1), 0 0 '+shadowScope*5+'px rgba(0,0,0,.1), 0 '+shadowScope+'px '+shadowScope*3+'px rgba(0,0,0,.3), 0 '+shadowScope*3+'px '+shadowScope*5+'px rgba(0,0,0,.2), 0 '+shadowScope*5+'px '+shadowScope*10+'px rgba(0,0,0,.25), 0 '+shadowScope*10+'px '+shadowScope*10+'px rgba(0,0,0,.2), 0 '+shadowScope*20+'px '+shadowScope*20+'px rgba(0,0,0,.15)';
                            console.log(style);
                            return style;
                        }
                    };
                    break;

            }
            var configureHTML = '';
            for (var attr in config.attr) {
                if(config.attr[attr].type==='colorpicker'){
                    configureHTML+='<p><b>' + config.attr[attr].name + '</b><input data-type="colorpicker" type="text" class="span colorpicker-input" value="#ff00de" data-color="#ff00de" data-color-format="hex" ></p>';
                }else{
                    configureHTML += '<p><b>' + config.attr[attr].name + '</b><input data-type="slider" type="text" class="span2" data-slider-tooltip="hide" data-slider-min="' + config.attr[attr].min + '" data-slider-max="' + config.attr[attr].max + '" data-slider-value="' + config.attr[attr]["default"] + '"></p>';
                }
            }
            $('.right-side h1').css('textShadow',config.style());
            $('#configures').empty().append(configureHTML).find('input').each(function(){
                switch($(this).data('type')){
                    case 'slider':
                        $(this).slider({value:0});
                        $(this).on('slide',function(ev){
                            config.attr[$(this).parent().prev().text()].current=ev.value;
                            $('.right-side h1').css('textShadow',config.style());
                        });
                        break;
                    case 'colorpicker':
                        $(this).colorpicker().on('changeColor', function(ev){
                            config.attr['Shadow Color'].current = ev.color.toHex();
                            $('.right-side h1').css('textShadow',config.style());
                        });

                        break;
                }
            });
            return config.style();
        };
    });
})(jQuery);