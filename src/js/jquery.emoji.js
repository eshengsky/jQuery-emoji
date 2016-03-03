/**
 * Created by Sky on 2015/12/11.
 */
(function ($, window, document) {

    var PLUGIN_NAME = 'emoji',
        VERSION = '1.1.0',
        DEFAULTS = {
            showTab: true,
            animation: 'fade',
            icons: []
        };

    window.emoji_index = 0;

    function Plugin(element, options) {
        this.$content = $(element);
        this.options = options;
        this.index = emoji_index;
        switch (options.animation) {
            case 'none':
                this.showFunc = 'show';
                this.hideFunc = 'hide';
                this.toggleFunc = 'toggle';
                break;
            case 'slide':
                this.showFunc = 'slideDown';
                this.hideFunc = 'slideUp';
                this.toggleFunc = 'slideToggle';
                break;
            case 'fade':
                this.showFunc = 'fadeIn';
                this.hideFunc = 'fadeOut';
                this.toggleFunc = 'fadeToggle';
                break;
            default :
                this.showFunc = 'fadeIn';
                this.hideFunc = 'fadeOut';
                this.toggleFunc = 'fadeToggle';
                break;
        }
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            var that = this;
            var btn = this.options.button;
            var newBtn,
                contentTop,
                contentLeft,
                btnTop,
                btnLeft;
            var ix = that.index;
            if (!btn) {
                newBtn = '<input type="image" class="emoji_btn" id="emoji_btn_' + ix + '" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHN0eWxlPSJ3aWR0aDozMDhweDtoZWlnaHQ6MzA4cHg7IiB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lvaIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAyNHB4IiBoZWlnaHQ9IjEwMjRweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAyNCAxMDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCiAgPHBhdGggY2xhc3M9InN2Z3BhdGgiIGRhdGEtaW5kZXg9InBhdGhfMCIgZmlsbD0iI2Y0YzYwMCIgZD0iTTUxMi41NTMgMTYuNTY3YzY3Ljk0NyAwIDEzMi4xMTkgMTMuMDM3IDE5Mi41MTcgMzkuMTEzIDYwLjM5OCAyNi4wNzYgMTEyLjg2NyA2MS40MDkgMTU3LjQxIDEwNi4wMDMgNDQuNTQzIDQ0LjU5MyA3OS44MzggOTcuMTIxIDEwNS44ODQgMTU3LjU4NyAyNi4wNDcgNjAuNDY1IDM5LjA3MCAxMjQuNzA4IDM5LjA3MCAxOTIuNzMyIDAgNjguNzc4LTEzLjAyMyAxMzMuMjEyLTM5LjA3MCAxOTMuMjk5LTI2LjA0NyA2MC4wODctNjEuMzQxIDExMi42MTUtMTA1Ljg4NCAxNTcuNTg3LTQ0LjU0MyA0NC45Ny05Ny4wMTQgODAuMzA1LTE1Ny40MSAxMDYuMDAzLTYwLjM5OCAyNS42OTctMTI0LjU3IDM4LjU0Ny0xOTIuNTE3IDM4LjU0Ny02OC43MDIgMC0xMzMuMDYzLTEyLjg0OS0xOTMuMDgzLTM4LjU0Ny02MC4wMjAtMjUuNjk3LTExMi40OS02MS4wMzEtMTU3LjQxLTEwNi4wMDMtNDQuOTIxLTQ0Ljk3LTgwLjQwNC05Ny41LTEwNi40NS0xNTcuNTg3LTI2LjA0Ny02MC4wODctMzkuMDcwLTEyNC41MTktMzkuMDcwLTE5My4yOTkgMC02OC4wMjMgMTMuMDIzLTEzMi4yNjYgMzkuMDcwLTE5Mi43MzIgMjYuMDQ3LTYwLjQ2NSA2MS41My0xMTIuOTkzIDEwNi40NS0xNTcuNTg3IDQ0LjkyMS00NC41OTMgOTcuMzktNzkuOTI3IDE1Ny40MS0xMDYuMDAzIDYwLjAyMC0yNi4wNzYgMTI0LjM4MS0zOS4xMTMgMTkzLjA4My0zOS4xMTN2MHpNNjkxLjQ4IDI2Mi41ODNjLTIxLjg5NCAwLTQwLjM5MSA5LjA2OS01NS40OSAyNy4yMDktMTUuMDk5IDE4LjE0LTIyLjY0OSA0MC4wNTgtMjIuNjQ5IDY1Ljc1NiAwIDI2LjQ1NCA3LjU0OSA0OC43NDkgMjIuNjQ5IDY2Ljg4OSAxNS4wOTkgMTguMTQgMzMuNTk2IDI3LjIwOSA1NS40OSAyNy4yMDkgMjEuODk0IDAgNDAuMzkxLTkuMDY5IDU1LjQ5LTI3LjIwOSAxNS4wOTktMTguMTQgMjIuNjQ5LTQwLjQzNiAyMi42NDktNjYuODg5IDAtMjUuNjk3LTcuNTQ5LTQ3LjYxNi0yMi42NDktNjUuNzU2LTE1LjA5OS0xOC4xNC0zMy41OTYtMjcuMjA5LTU1LjQ5LTI3LjIwOXYwek0zMjQuNTY2IDI2NC44NTFjLTIxLjEzOSAwLTM5LjA3MCA5LjA2OS01My43OTIgMjcuMjA5LTE0LjcyMiAxOC4xNC0yMi4wODMgNDAuMDU4LTIyLjA4MyA2NS43NTYgMCAyNi40NTQgNy4zNjEgNDguNTYxIDIyLjA4MyA2Ni4zMjMgMTQuNzIyIDE3Ljc2MSAzMi42NTMgMjYuNjQzIDUzLjc5MiAyNi42NDMgMjEuMTM5IDAgMzkuMjU5LTguODgxIDU0LjM1OC0yNi42NDMgMTUuMDk5LTE3Ljc2MSAyMi42NDktMzkuODY5IDIyLjY0OS02Ni4zMjMgMC0yNS42OTctNy41NDktNDcuNjE2LTIyLjY0OS02NS43NTYtMTUuMDk5LTE4LjE0LTMzLjIxOC0yNy4yMDktNTQuMzU4LTI3LjIwOXYwek01MTcuMDgzIDg4MC40NTdjNDAuMDEzIDAgNzcuOTUtNy4xOCAxMTMuODEyLTIxLjU0IDM1Ljg2MS0xNC4zNjEgNjguMTM2LTM0LjAxMiA5Ni44MjUtNTguOTUzIDI4LjY4OS0yNC45NDEgNTMuMDM2LTU0LjA0MSA3My4wNDMtODcuMjk2IDIwLjAwNy0zMy4yNTUgMzQuMTYyLTY4Ljc3OCA0Mi40NjctMTA2LjU2OXYtNS42NjhjMC02LjA0Ny0yLjI2NS0xMS41MjYtNi43OTUtMTYuNDM5LTQuNTMtNC45MTMtMTAuMTkyLTcuMzY5LTE2Ljk4Ny03LjM2OWgtNjA1Ljg2MWMtNi43OTUgMC0xMy4wMjMgMi40NTctMTguNjg1IDcuMzY5LTUuNjYyIDQuOTEzLTcuNzM4IDEwLjM5My02LjIyOCAxNi40MzkgMS41MSA3LjU1OCAyLjY0MyAxMi44NDkgMy4zOTcgMTUuODcyIDAuNzU1IDMuMDIzIDEuNTEgNS4yOSAyLjI2NSA2LjgwMyA5LjgxNCAzNi4yNzkgMjQuOTE0IDcwLjEwMiA0NS4yOTggMTAxLjQ2OCAyMC4zODQgMzEuMzY2IDQ0LjM1NCA1OC41NzUgNzEuOTEgODEuNjI4IDI3LjU1NiAyMy4wNTIgNTguNjk4IDQxLjE5MSA5My40MjcgNTQuNDE5IDM0LjcyOSAxMy4yMjYgNzIuMDk5IDE5Ljg0IDExMi4xMTIgMTkuODR2MHoiIC8+DQoNCjwvc3ZnPg0K"/>';
                contentTop = this.$content.offset().top + this.$content.outerHeight() + 10;
                contentLeft = this.$content.offset().left + 2;
                $(newBtn).appendTo($('body'));
                $('#emoji_btn_' + ix).css({'top': contentTop + 'px', 'left': contentLeft + 'px'});
                btn = '#emoji_btn_' + ix;
            }

            var showTab = this.options.showTab;
            var iconsGroup = this.options.icons;
            var groupLength = iconsGroup.length;
            if (groupLength === 0) {
                alert('Missing icons config!');
                return false;
            }

            var emoji_container = '<div class="emoji_container" id="emoji_container_' + ix + '">';
            var emoji_content = '<div class="emoji_content">';
            var emoji_tab = '<div class="emoji_tab" style="' + (groupLength === 1 && !showTab ? 'display:none;' : '') + '"><div class="emoji_tab_prev"></div><div class="emoji_tab_list"><ul>';
            var panel,
                name,
                path,
                maxNum,
                excludeNums,
                file,
                placeholder,
                alias,
                title,
                index,
                notation;
            for (var i = 0; i < groupLength; i++) {
                name = iconsGroup[i].name || 'group' + (i + 1);
                path = iconsGroup[i].path;
                maxNum = iconsGroup[i].maxNum;
                excludeNums = iconsGroup[i].excludeNums;
                file = iconsGroup[i].file || '.jpg';
                placeholder = iconsGroup[i].placeholder || '#em' + (i + 1) + '_{alias}#';
                alias = iconsGroup[i].alias;
                title = iconsGroup[i].title;
                index = 0;
                if (!path || !maxNum) {
                    alert('The ' + i + ' index of icon groups has error config!');
                    continue;
                }
                panel = '<div id="emoji' + i + '" class="emoji_icons" style="' + (i === 0 ? '' : 'display:none;') + '"><ul>';
                for (var j = 1; j <= maxNum; j++) {
                    if (excludeNums && excludeNums.indexOf(j) >= 0) {
                        continue;
                    }
                    if (alias) {
                        if (typeof alias !== 'object') {
                            alert('Error config about alias!');
                            break;
                        }
                        notation = placeholder.replace(new RegExp('{alias}', 'gi'), alias[j].toString());
                    } else {
                        notation = placeholder.replace(new RegExp('{alias}', 'gi'), j.toString());
                    }
                    panel += '<li><a data-emoji_code="' + notation + '" data-index="' + index + '" title="' + (title && title[j] ? title[j] : '') + '"><img src="' + path + j + file + '"/></a></li>';
                    index++;
                }
                panel += '</ul></div>';
                emoji_content += panel;
                emoji_tab += '<li data-emoji_tab="emoji' + i + '" class="' + (i === 0 ? 'selected' : '') + '" title="' + name + '">' + name + '</li>';
            }
            emoji_content += '</div>';
            emoji_tab += '</ul></div><div class="emoji_tab_next"></div></div>';
            var emoji_preview = '<div class="emoji_preview"><img/></div>';
            emoji_container += emoji_content;
            emoji_container += emoji_tab;
            emoji_container += emoji_preview;

            $(emoji_container).appendTo($('body'));

            btnTop = $(btn).offset().top + $(btn).outerHeight() + 5;
            btnLeft = $(btn).offset().left;
            $('#emoji_container_' + ix).css({'top': btnTop + 'px', 'left': btnLeft + 'px'});

            $('#emoji_container_' + ix + ' .emoji_content').mCustomScrollbar({
                theme: 'minimal-dark',
                scrollbarPosition: 'inside',
                mouseWheel: {
                    scrollAmount: 275
                }
            });

            var pageCount = groupLength % 8 === 0 ? parseInt(groupLength / 8) : parseInt(groupLength / 8) + 1;
            var pageIndex = 1;
            $(document).on({
                'click': function (e) {
                    var target = e.target;
                    var field = that.$content[0];
                    var code,
                        tab,
                        imgSrc,
                        insertHtml;
                    if (target === $(btn)[0]) {
                        $('#emoji_container_' + ix)[that.toggleFunc]();
                        that.$content.focus();
                    } else if ($(target).parents('#emoji_container_' + ix).length > 0) {
                        code = $(target).data('emoji_code') || $(target).parent().data('emoji_code');
                        tab = $(target).data('emoji_tab');
                        if (code) {
                            if (field.nodeName === 'DIV') {
                                imgSrc = $('#emoji_container_' + ix + ' a[data-emoji_code="' + code + '"] img').attr('src');
                                insertHtml = '<img class="emoji_icon" src="' + imgSrc + '"/>';
                                that._insertAtCursor(field, insertHtml, false);
                            } else {
                                that._insertAtCursor(field, code);
                            }
                            that.hide();
                        }
                        else if (tab) {
                            if (!$(target).hasClass('selected')) {
                                $('#emoji_container_' + ix + ' .emoji_icons').hide();
                                $('#emoji_container_' + ix + ' #' + tab).show();
                                $(target).addClass('selected').siblings().removeClass('selected');
                            }
                        } else if ($(target).hasClass('emoji_tab_prev')) {
                            if (pageIndex > 1) {
                                $('#emoji_container_' + ix + ' .emoji_tab_list ul').css('margin-left', ('-503' * (pageIndex - 2)) + 'px');
                                pageIndex--;
                            }

                        } else if ($(target).hasClass('emoji_tab_next')) {
                            if (pageIndex < pageCount) {
                                $('#emoji_container_' + ix + ' .emoji_tab_list ul').css('margin-left', ('-503' * pageIndex) + 'px');
                                pageIndex++;
                            }
                        }
                        that.$content.focus();
                    } else if ($('#emoji_container_' + ix + ':visible').length > 0) {
                        that.hide();
                        that.$content.focus();
                    }
                }
            });

            $('#emoji_container_' + ix + ' .emoji_icons a').mouseenter(function () {
                var index = $(this).data('index');
                if (parseInt(index / 5) % 2 === 0) {
                    $('#emoji_container_' + ix + ' .emoji_preview').css({'left': 'auto', 'right': 0});
                } else {
                    $('#emoji_container_' + ix + ' .emoji_preview').css({'left': 0, 'right': 'auto'});
                }
                var src = $(this).find('img').attr('src');
                $('#emoji_container_' + ix + ' .emoji_preview img').attr('src', src).parent().show();
            });

            $('#emoji_container_' + ix + ' .emoji_icons a').mouseleave(function () {
                $('#emoji_container_' + ix + ' .emoji_preview img').removeAttr('src').parent().hide();
            });
        },

        _insertAtCursor: function (field, value, selectPastedContent) {
            var sel, range;
            if (field.nodeName === 'DIV') {
                field.focus();
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();
                        var el = document.createElement('div');
                        el.innerHTML = value;
                        var frag = document.createDocumentFragment(), node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        var firstNode = frag.firstChild;
                        range.insertNode(frag);

                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            if (selectPastedContent) {
                                range.setStartBefore(firstNode);
                            } else {
                                range.collapse(true);
                            }
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if ((sel = document.selection) && sel.type !== 'Control') {
                    var originalRange = sel.createRange();
                    originalRange.collapse(true);
                    sel.createRange().pasteHTML(html);
                    if (selectPastedContent) {
                        range = sel.createRange();
                        range.setEndPoint('StartToStart', originalRange);
                        range.select();
                    }
                }
            } else {
                if (document.selection) {
                    field.focus();
                    sel = document.selection.createRange();
                    sel.text = value;
                    sel.select();
                }
                else if (field.selectionStart || field.selectionStart === 0) {
                    var startPos = field.selectionStart;
                    var endPos = field.selectionEnd;
                    var restoreTop = field.scrollTop;
                    field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
                    if (restoreTop > 0) {
                        field.scrollTop = restoreTop;
                    }
                    field.focus();
                    field.selectionStart = startPos + value.length;
                    field.selectionEnd = startPos + value.length;
                } else {
                    field.value += value;
                    field.focus();
                }
            }

        },

        show: function () {
            $('#emoji_container_' + this.index)[this.showFunc]();
        },

        hide: function () {
            $('#emoji_container_' + this.index)[this.hideFunc]();
        },

        toggle: function () {
            $('#emoji_container_' + this.index)[this.toggleFunc]();
        }
    };

    function fn(option) {
        emoji_index++;
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('plugin_' + PLUGIN_NAME + emoji_index);
            var options = $.extend({}, DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('plugin_' + PLUGIN_NAME + emoji_index, (data = new Plugin(this, options)));
            if (typeof option === 'string') data[option]();
        });
    }

    $.fn[PLUGIN_NAME] = fn;
    $.fn[PLUGIN_NAME].Constructor = Plugin;

}(jQuery, window, document));

(function ($, window, document) {

    var PLUGIN_NAME = 'emojiParse',
        VERSION = '1.1.0',
        DEFAULTS = {
            icons: []
        };

    function Plugin(element, options) {
        this.$content = $(element);
        this.options = options;
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            var that = this;
            var iconsGroup = this.options.icons;
            var groupLength = iconsGroup.length;
            var path,
                file,
                placeholder,
                alias,
                pattern,
                regexp,
                revertAlias = {};
            if (groupLength > 0) {
                for (var i = 0; i < groupLength; i++) {
                    path = iconsGroup[i].path;
                    file = iconsGroup[i].file || '.jpg';
                    placeholder = iconsGroup[i].placeholder;
                    alias = iconsGroup[i].alias;
                    if (!path) {
                        alert('Path not config!');
                        continue;
                    }
                    if (alias) {
                        for (var attr in alias) {
                            if (alias.hasOwnProperty(attr)) {
                                revertAlias[alias[attr]] = attr;
                            }
                        }
                        pattern = placeholder.replace(new RegExp('{alias}', 'gi'), '([\\s\\S]+?)');
                        regexp = new RegExp(pattern, 'gm');
                        that.$content.html(that.$content.html().replace(regexp, function ($0, $1) {
                            var n = revertAlias[$1];
                            if (n) {
                                return '<img class="emoji_icon" src="' + path + n + file + '"/>';
                            } else {
                                return $0;
                            }
                        }));
                    } else {
                        pattern = placeholder.replace(new RegExp('{alias}', 'gi'), '(\\d+?)');
                        that.$content.html(that.$content.html().replace(new RegExp(pattern, 'gm'), '<img class="emoji_icon" src="' + path + '$1' + file + '"/>'));
                    }
                }
            }
        }
    };

    function fn(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('plugin_' + PLUGIN_NAME);
            var options = $.extend({}, DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('plugin_' + PLUGIN_NAME, (data = new Plugin(this, options)));
            if (typeof option === 'string') data[option]();
        });
    }

    $.fn[PLUGIN_NAME] = fn;
    $.fn[PLUGIN_NAME].Constructor = Plugin;

}(jQuery, window, document));
