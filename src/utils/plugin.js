export default {
    install: (Vue, opt) => {
        /**
         * AddDayCount 0返回今天日期，-1返回昨天日期
         */
        Vue.prototype.$getDateStr = (AddDayCount, type) => {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取当前月份的日期
                var d = dd.getDate();
                if (type == 1) {
                    return y + "" + m + d;
                } else {
                    return y + "-" + m + "-" + d;
                }
            },
            // TODO: 日期格式化
            Vue.prototype.$formatDate = (sj, type = 0) => {
                var now = new Date(sj * 1000);
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hour = now.getHours();
                var minute = now.getMinutes();
                var second = now.getSeconds();
                if (!type) {
                    return `${year}-${month}-${date}`;
                } else if (type == 1) {
                    return `${year}${month}${date}`;
                } else {
                    return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
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
