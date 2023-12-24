console.show();
let title;
let i;

changeMainPage("首页");
shareArticle();
shareComment();
shareGame();
checkTasks();

// 跳转到主页页面某一板块
function changeMainPage(s) {
    while (!id("com.max.xiaoheihe:id/iv_home_msg").findOnce()) {
        log("不在小黑盒主页，请手动打开");
        sleep(1000);
    }
    text(s).findOne().click();
    title = className("androidx.recyclerview.widget.RecyclerView").findOne();
}

// 执行share文章任务
function shareArticle() {
    log("执行分享文章任务...");
    i = 1;
    try {
        Tv = title.child(i);
        Tv.click();
    }
    catch (error) {
        sleep(1000);
    }
    sleep(500);
    log("准备分享");
    // 稍微判断一手
    while (!id("iv_appbar_action_button").findOne()) {
        log("没找到");
        sleep(1000);
        continue;
    }
    let b = id("vg_action_x").findOne().bounds();
    let count_tmp = 0;
    while (!text("微信好友").findOnce()) {
        click(b.centerX(), b.centerY());//再点一次
        if (count_tmp++ > 500) {
            log("share error");
            break;
        }
        sleep(500);
    }
    text("微信好友").findOne().parent().click();
    sleep(500);
    while (text("Select a Chat").findOnce() === null && text("选择一个聊天").findOnce() === null) {
        sleep(500);
    }
    while (id("com.max.xiaoheihe:id/vp").findOnce() === null) {
        back();
        sleep(1000);
    }
    log("分享成功");
    sleep(1000);

}

// 执行share评论任务
function shareComment() {
    log("执行分享评论任务");
    // 无法分享评论的情况有很多，没有评论，有评论但无法通过脚本分享等情况。为了方便，干脆直接换一篇文章分享评论
    while (text("评论").findOne(3000) === null || !id("vg_main_comment").longClickable().findOnce()) {
        log("没找到，换一篇文章");
        sleep(1000);
        back();
        i++;
        try {
            Tv = title.child(i);
            Tv.click();
        }
        catch (error) { }
        sleep(1000);
    }
    id("vg_main_comment").longClickable().findOnce().longClick();
    while (!text("分享").findOnce().click()) {
        sleep(100);
    }
    sleep(1500);
    while (true) {
        try {
            text("微信好友").findOnce().parent().click();
        } catch (error) {
            sleep(500);
            continue;
        }
        break;
    }
    log("分享成功");
    sleep(1000);
    while (!(text("Select a Chat").findOnce() === null || text("选择一个聊天").findOnce() === null)) {
        sleep(500);
    }
    while (id("com.max.xiaoheihe:id/rb_4").text("游戏库").findOnce() === null && (packageNameContains("com.max.xiaoheihe") || packageNameContains("com.tencent.mm"))) {
        back();
        sleep(1000);
    }
    sleep(1000);
}

// 执行分享游戏任务
function shareGame() {
    log("执行分享游戏任务");
    changeMainPage("游戏库");
    sleep(1000);
    let t = 0;
    while (id("vg_game_" + t).findOnce() === null && t < 3) {
        sleep(3000);
        t++;
    }
    if (t === 3) {
        log("控件查找失败，请手动点击一款游戏来让脚本继续运行");
    }
    try {
        id("vg_game_0").findOnce().click();
    }
    catch (error) { }
    id("iv_appbar_action_button").findOne().click();
    text("微信好友").findOne().parent().click();
    sleep(1500);
    while (!((id("com.max.xiaoheihe:id/rb_4").text("游戏库").findOnce()))) {
        back();
        sleep(100);
    }
    log("分享成功");
    sleep(1000);
}

//打开我的任务查看完成情况
function checkTasks() {
    log("查看任务完成情况");
    changeMainPage("我");
    sleep(500);
    id("vg_menu_task").findOne().click();
    log("如果有任务未完成，可以在小黑盒主页再次运行此脚本");
}