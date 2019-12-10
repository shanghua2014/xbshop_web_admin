export default {
    install: (Vue, opt) => {
        // 数据拼接
        Vue.prototype.$dataSplicing = (data) => {
            for (var i in data.listData) {
                for (var j in data.field) {
                    data.listData[i][data.field[j]] = data.fnArg ? data.fn(data.listData[i][data.field[j]], data.fnArg) : data.fn(data.listData[i][data.field[j]])
                }
            }
            return data.listData;
        }
        // TODO: 日期格式化
        Vue.prototype.$formatDate = (sj, type = 0) => {
            var now = new Date(sj * 1000);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            switch (type) {
                case 1:
                    return `${year}-${month}-${date}`;
                case 2:
                    let h = hour.toString().length == 1 ? `0${hour}` : hour;
                    let m = minute.toString().length == 1 ? `0${minute}` : minute;
                    let s = second.toString().length == 1 ? `0${second}` : second;
                    return `${year}-${month}-${date} ${h}:${m}:${s}`;
                default:
                    return `${year}-${month}-${date}`;
            }
        }
        //设置cookie<存>
        Vue.prototype.setCookie = (cname, cvalue, exdays) => {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.info(cname + "=" + '111' + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }
        //获取cookie
        Vue.prototype.getCookie = (cname) => {
            var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return (arr[2]);
            else
                return null;
        }
        // 删除cookie
        Vue.prototype.delCookie = (name) => {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = getCookie(name);
                if (cval != null) {
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                }
            },
            /**
             * 时间格式化, 非时间戳
             * @param tim 数字字符
             */
            Vue.prototype.timeFormat = (tim, type) => {
                type = !type ? 1 : type;
                var tim = tim * 1000;
                var now = new Date(tim);
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hour = now.getHours();
                var minute = now.getMinutes();
                var second = now.getSeconds();
                if (type == 1) {
                    return year;
                } else if (type == 2) {
                    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
                } else if (type == 3) {
                    return year + "年" + month + "月" + date + "日";
                } else if (type == 4) {
                    return minute + "'" + second + '"';
                }
            }
        // 货币转换
        Vue.prototype.$formatMoney = function (number, places, symbol, thousand, decimal) {
            console.log('货币转换')
            number = number || 0;
            places = !isNaN(places = Math.abs(places)) ? places : 2;
            symbol = symbol !== undefined ? symbol : "￥";
            thousand = thousand || ",";
            decimal = decimal || ".";
            var negative = number < 0 ? "-" : "",
                i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "￥1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
        }
    }
}
