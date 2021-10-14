//MVC重构
//jQurey重构

// const form = document.getElementById('task-form');
const form = $('#task-form');

// 任务输入框
// const taskInput = document.getElementById('task');
const taskInput = $('#task');

//筛选输入框
// const filterInput = document.getElementById('filter');
const filterInput = $('#filter');

//css选择器
// const clearButton = document.querySelector('.clear-tasks');
//清除全部任务按钮
const clearButton = $('.clear-tasks');

// const tasksUl = document.querySelector('.collection');
//任务列表
const tasksUl = $('.collection');

//对任务按照时间正序显示
//排序按钮
const sortByTime = $('.sorted');

//白天黑夜模式切换
const changeDayNight = $('.change');

//存储到本地
const saveToLocal = $('.saveToLocal');

//清除本地数据
const clearLocal = $('.clear')

// 存储任务序列
let tasks = [];

//存储到本地
var storage = window.localStorage;

//0.启动
$(function(){
    startApp();
})

function startApp(){
    show(tasks);

    startListen();
}

function show(tasks){//默认逆序显示，即后输入的在上面

    //任务列表清空， 准备刷新
    // tasksUl.innerHTML = ''
    tasksUl.empty();    

    for(const t of tasks)//倒着打印的
    {   
        //创建一个节点
        let li = document.createElement('li');

        li.className = 'collection-item';
        li.innerHTML = `${t}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
        // 2.插入
        //头部添加, unshift
        tasksUl.append(li);
    }
}

function showByTime(e){
    //默认逆序显示，即后输入的在上面
    tasksUl.empty();   
    tasks.reverse();
    show(tasks);

    //不知道为什么下面的调用无效！！！！！！！
    //两个小时后尝试出， 传入参数不能是数组。。。
    // tasks.forEach(t => {
    //     //创建一个节点
    //     let li = document.createElement('li');

    //     li.className = 'collection-item';
    //     li.innerHTML = `${t}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
    //     // 2.插入
    //     //头部添加, unshift
    //     tasksUl.append(li);
    // }); 
    // for(const t of tasks)//倒着打印的
    // {   
    //     //创建一个节点
    //     let li = document.createElement('li');

    //     li.className = 'collection-item';
    //     li.innerHTML = `${t}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
    //     // 2.插入
    //     //头部添加, unshift
    //     tasksUl.append(li);
    // }
}

function startListen() {
    // 1. 添加 --form表单提交
    // form.addEventListener('submit', addTask);
    form.submit(addTask);

    // 2. 删除单个任务 --鼠标点击
    // tasksUl.addEventListener('click', removeTask);
    tasksUl.click(removeTask);

    // 3. 清除所有任务 -- 鼠标点击
    // clearButton.addEventListener('click', clearAllTasks);
    clearButton.click(clearAllTasks);

    // 4. 筛选任务 -- 按键松开时候keyup
    // filterInput.addEventListener('keyup', filterTasks);
    filterInput.keyup(filterTasks)

    // 5. 按照时间对任务正序排序
    sortByTime.click(showByTime);

    // 6. 黑夜白天模式切换
    changeDayNight.click(day);
    changeDayNight.dblclick(night);

    // 7. 存储到本地
    saveToLocal.click(save);

    // 8. 清除本地数据
    clearLocal.click(clearLocalData);
}

function addTask(e) {

    // 0. 输入内容
    //获取输入框的值
    // const newTask = taskInput.value;
     const newTask = taskInput.val();

    //充分区别shift, unshift, push, pop 头删，头删，尾压，尾删
    //prepend头加入节点，append尾加入节点
    const now = new Date();
    let t = newTask+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+now;
    // jQuery输入框清空
    taskInput.val('');
    tasks.unshift(t);
    
    show(tasks);

    // // 1. 创建元素
    // let li = document.createElement('li');
    // li.className = 'collection-item';
    // li.innerHTML = `${newTask}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
    // // 2.插入
    // //头部添加, unshift
    // tasksUl.prepend(li);
    // tasksUl.innerHTML = ''

    //防止刷新页面
    e.preventDefault();
}

function removeTask(e) {
    if (e.target.classList.contains('fa-remove')) {
        let index = tasks.indexOf(e.target.parentNode.parentNode.firstChild.textContent);
        tasks.splice(index, 1);
        show(tasks);
    }
    // console.log(event.target)
}

function clearAllTasks() {
    // tasksUl.innerHTML = '';
    tasks = [];
    show(tasks);
}

function filterTasks(e) {
    const inputText = e.target.value.toLowerCase();

    let filteredTasks = tasks.filter(task => task.toLowerCase().includes(inputText));
    show(filteredTasks);


    // document.querySelectorAll('.collection-item').forEach(function (taskLi) {
    //     // console.log(taskLi.firstChild.textContent);
    //     const item = taskLi.firstChild.textContent.toLowerCase();
    //     if (item.indexOf(inputText) != -1) {
    //         //如果包含
    //         taskLi.style.display = 'block';
    //         // taskLi.classList.remove('.hide');
    //     }
    //     else{
    //         //如果不包含
    //         taskLi.style.display = 'none';
    //         // taskLi.classList.add('.hide');
    //     }
    // })
}

function day(e){
    $('body').css('background', 'url(./img/day.png) no-repeat');
}

function night(e){
    $('body').css('background', 'url(./img/night.png) no-repeat');
}

function save(e){
    if(!window.localStorage){
        alert("浏览器不支持localstorage");
        return false;
    }
    else{
        for(let i = 0; i < tasks.length; i++){
            storage.setItem(i+'', tasks[i]);
        }
    }
}

function clearLocalData(e){
    storage.clear();
}