// function f (str1, str2) {
//     // 获取每个附数的值，a, b表示第一个复数的实部和虚部；c, d表示第二个复数的实部和虚部
//     let a, b, c, d;
//     // 获取一个复数的实部和虚部
//     function getNum(str){
//         let n = [];
//         if (str.indexOf('+') != -1) {
//             n = str.split('+');
//             n[1] = n[1].replace('i', '');
//         }else{
//             n = str.split('-');
//             n[1] = '-' + n[1].replace('i', '');
//         }
//         return n;
//     }
//     a = getNum(str1)[0];
//     b = getNum(str1)[1];
//     c = getNum(str2)[0];
//     d = getNum(str2)[1];
//     // 输出的字符串
//     let str3 = '';
//     str3 = (a * c - b * d) + (a * d + b * c) + 'i';
//     return str3;
// }
// alert(f('1+2i','1-2i'))

// function getDay(date){
//     // 获取年
//     let year = date.substring(0,4)
//     // 获取月
//     let mon = date.substring(5,7)
//     // 获取日
//     let day = date.substring(8)
//     console.log(year, mon, day)
//     // 判断是平年还是闰年
//     function isPing (y){
//         if (y % 4  == 0) {
//             return false;
//         }else{
//             return true;
//         }
//     }
//     let arr = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//     if (isPing(year)) {
//         arr[1] = 28;
//     }else{
//         arr[1] = 29;
//     }
//     let sum = 0;
//     for (let i = 0; i < mon; i++) {
//         sum = sum + arr[i];
//     }
//     return sum
// }

// console.log(getDay('1991-12-23'))


// function q(que, k){
//     // 读取链表，将每三个个节点推入栈中，然后依次弹出栈
//     class sturct{
//         constructor(label){
//             this.label = label;
//             this.list = [];
//         }
//         // 入栈
//         push(node){
//             this.list.push(node);
//         }
//         // 出栈
//         pop(){
//             return this.list[this.list.length]
//         }
//     }
// }

// function _2048 (n, ...arg) {
//     // 根据n值将得到正确的矩阵行数，多余的去掉，不足的用零表示
//     if ( arg.length > n ){
//         arg = arg.slice(0, n)
//     }
//     // 每行数字
//     let temp;
//     let start = 0;
//     for (let i = 0; i < arg.length; i++) {
//         temp = arg[i].split(' ')
//         // 从第一个不为零元素开始移动
//         for (let j = 0; j < temp.length; j++) {
//             if (temp[j] != 0) {
//                 start = j
//                 break
//             }
//         }
//         temp = temp.slice(start)
//         // 加和
//         for (let i = 1; i < temp.length; i++) {
//             if (temp[i] == temp[i -1]) {
//                 temp[i-1] = temp[i] + temp[i]
//                 temp[i] = 0
//             }
//         }
//     }
//     return arg
// }
/**
 * 沿着长N米、宽1米的走廊，连续铺有N块边长为1米的正方形地砖。假设所有颜色分为26种，用小写字母a到z表示，
 * 给定N块地砖的初始颜色，每次可以选择一种颜色，然后将最多M块连续的地砖染成该颜色。那么至少要进行多少次染色，
 * 才能将所有地砖染成同一颜色？
 */
// function color([m, n], str){
//     // 数据格式处理
//     if ((m < 0 || m > 10^4) && (n < 0 || n > 10^4) && ( m < n)) {
//         console.log("请重新输入M和N")
//         return
//     }
//     // 根据M值判断每两个相同颜色之间的地板数
//     let arr = str.split("")
//     // 记录位置
//     let temp = 1
//     // 计数
//     let count = 0
//     // 寻找相同颜色的地板之间的间隔
//     for (let i = temp; i < arr.length; i++) {
//         // 在m范围内，遇到一样颜色就染色一次
//         if ( temp + i <= n && arr[i] == arr[0]) {
//             temp = temp + i
//             count = count + 1
//             break
//         }
//         if (temp + i > n) {
//             count = count + 1
//             break
//         }
//     }
//     console.log(count)
// }
// color([5,3],'abcda')
/**
 * 最近很多城市都搞起了垃圾分类，已知有一个小区有n堆垃圾需要丢弃，这些垃圾都打包了，我们并不知道这是什么垃圾，
 * 要知道有些垃圾如果丢在一起是会影响环境的。这个小区一共只有两辆垃圾车，出于合理负载的考量，要求两辆车必须装
 * 载相同数量的垃圾。我们希望在不影响环境的情况下，每次让垃圾车载走最多的垃圾。我们为垃圾袋标了号，分别是1-n，
 * 有m个约束，每个约束表示为“a b”，意思是第a堆垃圾与第b堆垃圾不能装在一辆垃圾车上。（每堆垃圾最多有两个约束条
 * 件）请问两辆垃圾车一次最多可以带走多少堆垃圾呢？
 */

/**
 * 寻找子区间
 */
//  function finds([n, m], str){
//     let arr = arguments[1].split(" ")
//     // 数据格式判断
//     if (((m < 0 || m > 3 * 10^5) && (n < 0 || n > 3 * 10^5) && ( m > n))) {
//         console.log("请重新输入M和N")
//         return
//     }
//     if (arr.length != n) {
//         console.log("输入n和数列长度不符")
//         return
//     }
//     // 计数
//     let count = 0
//     // 序列
//     let xu = ""
//     // 生成子区间，并生成子序列
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i; j < arr.length; j++) {
//             for (let k = arr[i]; k < arr[j]; k++) {
//                 if (arr[k]) {
//                     console.log(arr[k])
//                     xu = xu + " " + arr[k]
//                 }
//                 console.log(xu)
//             }
//             if (xu.indexOf(arguments[2]) == -1 && xu.indexOf(arguments[3]) == -1 ){
//                 count = count + 1
//             }
//         }
//     }
//     console.log(count)
//     return count
//  }

//  finds([4, 2], '1 3 2 4', "3 2", "2 4")

//  function dateFormact(str){
//     let arr = str.split(" ")
//     let year = arr[0]
//     let month = arr[1]
//     let day = arr[2]
//     let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
//     if (year.length < 3) {
//         if (year % 4  == 0 && year % 100 != 0) {
//             days[1] = 29;
//         }
//     }else{
//         if (3200 % year == 0 && 172800 % year == 0) {
//             days[1] = 29;
//         }
//     }
//     if (days[month] < day) {
//         month = month + 1
//         day = day - days[month]
//     }
//     if (month.length == 1) {
//         month = "0" + month
//     }
//     if (day.length == 1) {
//         day = "0" + day
//     }
//     console.log(year + "-" + month + "-" + day)
//     return year + "-" + month + "-" + day
//  }
//  dateFormact("2004 3 3")

// function outIn(){
//     let arr = []
//     // 数据格式判断
//     for (let i = 0; i < arguments.length; i++) {
//         if (arguments.length != arguments[i].length) {
//             console.log("请重新输入数组")
//             return
//         }
//     }
//     for (let j = 0; j < arguments.length; j++) {
//         for (let k = 0; k < arguments.length; k++) {
//             console.log(arguments[j][k])
//             arr.push(arguments[j][k])
//         }
//     }
//     console.log(arr)
//     return arr
// }
// outIn([1,2],[3,4])

// function ss(arr){
//     if ((arr.length-1 != arr[0]) || arr[0] < 1 || arr[0] > 10 ) {
//         console.log("给定数据组数和实际组数不符")
//         return
//     }
//     let temp = ""
//     let flag = false
//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] < 0 || arr[i] > 100000) {
//             console.log("不能出现小于零的数或大于10的5次方的数")
//             return
//         }
//         if (arr[i] > 9) {
//             for (let j = 1; j <= 9; j++) {
//                 for (let k = 1; k <= 9; k++) {
//                     if (k + j == arr[i]) {
//                         if (!flag) {
//                             temp = k*10+j
//                         }else{
//                             if (temp > k*10+j) {
//                                 temp = k*10+j
//                             }
//                         }

//                     }
//                 }
//             }
//         }
//         console.log(temp)
//         temp = ""
//     }
// }
// // ss([3, 13, 4, 15])

// function sss(){
//     if ( arguments[0] != arguments.length - 1 || arguments[0] < 1 || arguments[0] > 5) {
//         console.log("输入数据长度不符")
//         return
//     }
//     let temp,count = 0
//     for (let i = 1; i < arguments.length; i++) {
//         // console.log(arguments[i]);
//         if (arguments[i].length < 4) {
//             console.log("输入数据长度不符")
//             return
//         }
//         if (arguments[i][3] < 2 || arguments[i][3] > 10) {
//             console.log("输入数据长度不符")
//             return
//         }
//         temp = arguments[i][1] - arguments[i][0]
//         while (arguments[i][1] > arguments[i][0]){
//             if ( temp < arguments[i][2] ) {
//                 count += 1
//                 arguments[i][0] = arguments[i][0] + arguments[i][2]
//             } else {
//                 count += 2
//                 arguments[i][2] = arguments[i][2]*arguments[i][3]
//                 arguments[i][0] = arguments[i][0] + arguments[i][2]*arguments[i][3]
//             }
//         }
//         console.log(count)
//         temp = 0
//     }
// }
// sss(2, [23,43,5,6], [1, 14, 2, 2])


// function getNums(n){
//     if ( arguments.length -1 != n) {
//         console.log("线段输入条数和实际线段数目不一致，请重新输入");
//         return;
//     }else if (n < 0 && n > 10000) {
//         console.log("输入线段条数非法");
//         return;
//     }

//     let count = 2;
//     let start,end;
//     // 寻找线段的端点的所有区间
//     for (let i = 1; i < arguments.length - 1; i++) {
//         if (arguments[i][0] <= arguments[i+1][0]) {
//             start = arguments[i][0];
//         }else{
//             start = arguments[i+1][0];
//         }
//     }

// }

// 找出跳过的数字
// function getNums(n){
//     if ( arguments.length -1 != n) {
//         console.log("输入行数和实际行数不一致，请重新输入");
//         return;
//     }
//     let count = 0;
//     for (let i = 1; i < arguments.length; i++) {
//         let temp = arguments[i];
//         for (let j = 0; j < temp[0]; j++) {
//             if (j.toString().indexOf(temp[1]) != -1) {
//                 count ++;
//             }
//         }
//         console.log(count)
//         count = 0;
//     }
// }
// getNums(2, [22, 2], [33,3])

// 求相对院子质量
// function getTotal(str, n) {
//     if (arguments.length - 2 != n) {
//         console.log("输入元素个数和实际个数不一致，请重新输入");
//         return;
//     }
//     let strArr = str.split(" ")
//     let total = strArr[1];
//     let temp, index;
//     let str = ""
//     for (let i = 2; i < arguments.length; i++) {
//         temp = arguments[i].split(" ");
//         index = strArr[0].indexOf(temp[0])
//         if (strArr[0][index+1] != ")") {
//             str = str + temp[1] * Number(strArr[0][index+1])
//         }else{
//             str = str + temp[1]
//         }
//     }
//     return
// }
// getTotal("C2H2 22", 2, "C 12", "H 2")

// function getTotal(){
//     if (arguments[0] != arguments.length -1){
//         console.log("输入格式不正确");
//         return
//     }
//     let total = 0;
//     let v = 0;
//     let temp, a, t;
//     for (let i = 1; i < arguments.length; i++) {
//         temp = arguments[i].split(" ");
//         a = temp[0];
//         t = temp[1];
//         console.log(a, t);
//         total = total + v * t + 0.5* a * t * t;
//         v = v + v + a * t;
//     }
//     console.log(total)
// }
// getTotal(2, "2 1", "30 2")


























