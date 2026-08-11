---
theme: seriph
title: React Native + Expo：移动端 App 技术分享
titleTemplate: '%s'
lang: zh-CN
class: text-center
transition: none
mdc: true
---

# React Native + Expo：移动端 App 技术分享

移动端技术选型：原理与取舍

<!--
今天讲一个选型问题：移动端为什么选 React Native 加 Expo，而不是 H5 或纯原生。重点讲原理，不教写代码；非前端同学也能跟上，用到的行话我都会现场解释。全场四十五分钟左右。
-->

---

## 这场分享，沿行业走过的路展开

<div class="dg" style="zoom:1;width:100%;gap:1rem;margin:auto">
  <div class="dbox nat" style="flex:1;padding:1.3rem .4rem;border-width:2.5px"><b style="font-size:1.08rem;white-space:nowrap">原生</b></div>
  <span class="darr" style="font-size:1.6rem">→</span>
  <div class="dbox js" style="flex:1;padding:1.3rem .4rem;border-width:2.5px"><b style="font-size:1.08rem;white-space:nowrap">H5 / Hybrid</b></div>
  <span class="darr" style="font-size:1.6rem">→</span>
  <div class="dbox rn" style="flex:1;padding:1.3rem .4rem;border-width:2.5px"><b style="font-size:1.08rem;white-space:nowrap">React Native</b></div>
  <span class="darr" style="font-size:1.6rem">→</span>
  <div class="dbox rn" style="flex:1;padding:1.3rem .4rem;border-width:2.5px"><b style="font-size:1.08rem;white-space:nowrap">Expo</b></div>
  <span class="darr" style="font-size:1.6rem">→</span>
  <div class="dbox" style="flex:1;padding:1.3rem .4rem;border-width:2.5px"><b style="font-size:1.08rem;white-space:nowrap">边界与结论</b></div>
</div>

<!--
今天不按功能清单讲，按行业走过的路讲，一共五站：最早只有纯原生，太贵；然后是 H5 和 Hybrid 的降本浪潮，撞了天花板；2015 年 RN 诞生，十年把架构重写了一遍；Expo 把它工程化到能落地；最后划边界、给结论。这条线每一章开头都会再出现，走到哪一站一看便知。开讲之前，先立一个贯穿全场的分析框架。
-->

---

## 一套业务，要在 iOS 和 Android 上各做一个 App

<div class="dg" style="gap:2.2rem">
  <div class="dbox rn" style="padding:1.1rem 1.5rem"><b>一套业务</b><small>需求每周都在变</small></div>
  <span class="darr">→</span>
  <div class="dcol" style="gap:.9rem">
    <div class="dbox nat" style="padding:.8rem 1.2rem"><b>iOS 生态</b><small>Objective-C / Swift · App Store</small></div>
    <div class="dbox nat" style="padding:.8rem 1.2rem"><b>Android 生态</b><small>Java / Kotlin · 各大应用商店</small></div>
  </div>
</div>

<p class="dnote">两边的代码不能互相复用——怎么用最少的人做出两个 App，还不拖慢迭代？</p>

<!--
先看局面：iOS 用 Objective-C/Swift，上 App Store；Android 用 Java/Kotlin，上各大应用商店。两边的代码不能互相复用。可业务只有一套，需求每周都在变。移动端所有选型都在回答同一个问题：怎么用最少的人，把两个平台的 App 都做出来，还不拖慢迭代。这个问题太大，先把它拆成两个具体问题——就是贯穿全场的分析框架。
-->

---

## 所有界面技术都在回答同样两个问题

<table class="mx q2">
  <thead>
    <tr>
      <th></th>
      <th class="axis" colspan="2">② 逻辑跑在哪个运行时</th>
    </tr>
    <tr>
      <th class="corner">① UI 由谁渲染</th>
      <th>JS 运行时<span></span></th>
      <th>原生运行时<span></span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>系统控件</th>
      <td><div class="cell c-gap"><b>？</b><small>长期空着</small></div></td>
      <td><div class="cell c-nat"><b>纯原生</b><small>体验顶格，代价下一章算</small></div></td>
    </tr>
    <tr>
      <th>网页引擎</th>
      <td><div class="cell c-js"><b>H5 / WebView</b><small>成本最低，天花板第三章推导</small></div></td>
      <td><div class="cell c-none"><b>—</b><small>没有代表性方案</small></div></td>
    </tr>
  </tbody>
</table>

<!--
界面技术五花八门，剥开壳都在回答两个问题：屏幕上的按钮是谁画的——系统控件还是网页引擎；业务逻辑跑在哪——原生运行时还是 JS 引擎。两个问题就是这张表的行和列，答案一组合，每个方案都落进一个格子，全场都用它定位。右上角是纯原生：两个答案都选原生，体验顶格，代价下一章算。左下角是 H5：都选网页，成本最低，天花板第三章推导。右下角空着不用管——已经有原生运行时了，没人再回头用网页引擎画界面。真正要盯的是左上角：系统控件的体验，配 JS 的逻辑——这个组合长期没人真正做到。记住这个空格子，故事讲到一半它会被填上。
-->

---
layout: section
---

# 原生这条路，贵在哪、慢在哪

<div class="evo">
  <span class="estep now">原生</span><span class="earr">→</span>
  <span class="estep">H5 / Hybrid</span><span class="earr">→</span>
  <span class="estep">React Native</span><span class="earr">→</span>
  <span class="estep">Expo</span><span class="earr">→</span>
  <span class="estep">边界与结论</span>
</div>

<!--
故事从起点讲起。智能手机头几年，App 只有一种写法：纯原生。体验没得挑，问题出在账上——这章短，就两笔账。
-->

---

## 双份代码、双份团队、双份测试，两端还会对不齐

<div class="dg" style="gap:1.4rem">
  <div class="dbox nat"><b>iOS</b><small>Swift · 团队 A · QA 一遍</small></div>
  <div class="dcol" style="align-items:center;gap:2px">
    <div style="font-size:.7rem;color:#6b7280">同一个需求</div>
    <div class="darr">⇄</div>
    <div style="font-size:.7rem;color:#b45309">做出来不一样</div>
  </div>
  <div class="dbox nat"><b>Android</b><small>Kotlin · 团队 B · QA 再一遍</small></div>
</div>

<!--
第一笔账：同一个需求 Swift 写一遍 Kotlin 再写一遍，两拨工程师、两套招聘、QA 各回归一遍。而且两边各自实现，做出来必然有出入：产品某天发现 iOS 有的功能 Android 没有，再补排期。人力乘二，速度除二。
-->

---

## 改一行代码，也要等商店审核

<div class="dg" style="flex-direction:column;gap:.9rem">
  <div class="drow" style="align-items:center">
    <div class="dcap" style="width:3.5rem;margin:0;text-align:right">原生</div>
    <div class="dbox" style="padding:.35rem .7rem">打包</div>
    <span class="darr">→</span>
    <div class="dbox nat"><b>商店审核</b><small>iOS 通常 1~3 天</small></div>
    <span class="darr">→</span>
    <div class="dbox" style="padding:.35rem .7rem">放量</div>
    <span class="darr">→</span>
    <div class="dbox" style="padding:.35rem .7rem">等用户升级</div>
  </div>
  <div class="drow" style="align-items:center">
    <div class="dcap" style="width:3.5rem;margin:0;text-align:right">Web</div>
    <div class="dbox js" style="padding:.35rem .7rem">部署</div>
    <span class="darr">→</span>
    <div class="dbox rn" style="padding:.35rem .7rem">分钟级全量</div>
  </div>
</div>

<!--
第二笔账：节奏被商店锁死。打包、提审——iOS 通常一到三天，被拒重排——再分批放量、等用户升级。原生团队都攒版本，两周一班车，线上 bug 最快也是天级响应。太贵、太慢，怎么办？行业的第一反应：把已经会的 Web 搬进 App。
-->

---
layout: section
---

# H5 的优点真实存在

<div class="evo">
  <span class="estep done">原生</span><span class="earr">→</span>
  <span class="estep now">H5 / Hybrid</span><span class="earr">→</span>
  <span class="estep">React Native</span><span class="earr">→</span>
  <span class="estep">Expo</span><span class="earr">→</span>
  <span class="estep">边界与结论</span>
</div>

<!--
原生的账算完了：太贵、太慢。于是行业往下一站走——把已经会的 Web 搬进 App，这就是 H5 和 Hybrid 的浪潮。公平起见先把优点说足——它们实打实省钱，这也是这条路当年席卷行业的原因；把优点看清楚，才能准确说出它输在哪。
-->

---

## 一套代码两端运行，发版不经过商店

<div class="dg" style="gap:3rem">
  <div class="dcol" style="align-items:center">
    <div class="dbox js"><b>一份 H5 代码</b></div>
    <span class="darr">↓</span>
    <div class="drow">
      <div class="dbox nat" style="padding:.3rem .6rem">iOS</div>
      <div class="dbox nat" style="padding:.3rem .6rem">Android</div>
      <div class="dbox" style="padding:.3rem .6rem">浏览器</div>
      <div class="dbox" style="padding:.3rem .6rem">小程序</div>
    </div>
    <div class="dcap">真跨平台</div>
  </div>
  <div class="dcol" style="align-items:center">
    <div class="dbox js"><b>改完部署</b></div>
    <span class="darr">↓</span>
    <div class="dbox rn"><b>用户打开即新版</b></div>
    <div class="dcap">零审核 · 零等待</div>
  </div>
</div>

<!--
两大优点。真跨平台：一份代码处处能跑，今天讲的方案里唯一做到的。发版零成本：部署完用户打开就是新版——正好治上一章「等审核」的痛。运营活动页用它是碾压级优势。那为什么主流 App 的主体都不是 H5？因为它头上有两个天花板。
-->

---

## H5 的头上有两个天花板：体验，和能力

<div class="dg" style="gap:2.5rem">
  <div class="dbox js" style="min-width:16rem;padding:1.1rem 1.3rem"><b>体验天花板</b><small>滑动和动画就是差原生一口气<br>而且不是「再优化优化」能补上的</small></div>
  <div class="dbox js" style="min-width:16rem;padding:1.1rem 1.3rem"><b>能力天花板</b><small>摄像头、推送这些功能碰不到<br>不是没人做，是浏览器不让</small></div>
</div>

<p class="dnote">体验这块分两步：先说清一帧只有多长，再拆三条根源——Web 为什么总是超时<br>能力那块只说一件事：这堵墙是谁砌的</p>

<!--
两个天花板，分开讲，这一章的结构就这两块。体验这块我不打算说一句「H5 慢」就完事——那种结论换个浏览器版本就过期了。我先把「一帧」这件事说清楚：一帧有多长，超时会怎样；再拆三条根源，说清差距到底从哪儿来。提前说明一件事：这三条不是 H5 的罪状清单，是任何界面技术都要过的三道关——今天先用它们量原生和 Web，第三站我们会用同一张表给 RN 打分。能力那块：为什么纯 H5 连很多功能都做不了——两页推到 Hybrid，再算一笔账。最后收一个分工结论。
-->

---

## 一帧只有 16.7ms：要么准时，要么整帧作废

<div class="dg" style="zoom:.92">
  <div style="position:relative;width:800px;height:246px;font-size:.7rem;color:#374151">
    <div style="position:absolute;left:96px;top:14px;height:170px;border-left:2px solid #9ca3af"></div>
    <div style="position:absolute;left:380px;top:14px;height:170px;border-left:2px dashed #b45309"></div>
    <div style="position:absolute;left:662px;top:14px;height:170px;border-left:2px dashed #b45309"></div>
    <div style="position:absolute;left:52px;top:0;font-size:.62rem;color:#6b7280">VSync 0</div>
    <div style="position:absolute;left:352px;top:0;font-size:.62rem;color:#b45309;font-weight:700">16.7ms</div>
    <div style="position:absolute;left:634px;top:0;font-size:.62rem;color:#b45309;font-weight:700">33.3ms</div>
    <div style="position:absolute;left:0;top:38px;width:86px;text-align:right;font-size:.66rem;color:#6b7280">15ms 完工</div>
    <div style="position:absolute;left:96px;top:32px;display:flex;gap:2px">
      <div style="width:51px;background:var(--dg-amber-bg);border:1px solid var(--dg-amber);border-radius:4px;font-size:.62rem;text-align:center;padding:.2rem 0">JS 3ms</div>
      <div style="width:153px;background:var(--dg-blue-bg);border:1px solid var(--dg-blue);border-radius:4px;font-size:.62rem;text-align:center;padding:.2rem 0">布局 · 绘制</div>
      <div style="width:51px;background:var(--dg-gray-bg);border:1px solid var(--dg-gray);border-radius:4px;font-size:.62rem;text-align:center;padding:.2rem 0">合成</div>
    </div>
    <div style="position:absolute;left:390px;top:36px;font-size:.68rem;color:#047857;font-weight:700">✓ 准时上屏 —— 延迟 16.7ms</div>
    <div style="position:absolute;left:0;top:102px;width:86px;text-align:right;font-size:.66rem;color:#6b7280">JS 多花 3ms</div>
    <div style="position:absolute;left:96px;top:96px;display:flex;gap:2px">
      <div style="width:102px;background:var(--dg-amber-bg);border:1px solid var(--dg-amber);border-radius:4px;font-size:.62rem;text-align:center;padding:.2rem 0">JS 6ms</div>
      <div style="width:153px;background:var(--dg-blue-bg);border:1px solid var(--dg-blue);border-radius:4px;font-size:.62rem;text-align:center;padding:.2rem 0">布局 · 绘制</div>
      <div style="width:51px;background:var(--dg-gray-bg);border:1px solid var(--dg-gray);border-radius:4px;font-size:.62rem;text-align:center;padding:.2rem 0">合成</div>
    </div>
    <div style="position:absolute;left:380px;top:96px;width:26px;height:24px;background:rgba(185,28,28,.2)"></div>
    <div style="position:absolute;left:412px;top:100px;font-size:.66rem;color:#b91c1c;font-weight:700">只超了 1.3ms</div>
    <div style="position:absolute;left:380px;top:134px;width:282px;height:22px;border-radius:5px;border:1px solid #cbd5e1;background:repeating-linear-gradient(45deg,#eef1f4,#eef1f4 5px,#fafbfc 5px,#fafbfc 10px)"></div>
    <div style="position:absolute;left:380px;top:139px;width:282px;text-align:center;font-size:.62rem;color:#6b7280">整帧作废，屏幕把上一帧再放一遍</div>
    <div style="position:absolute;left:670px;top:136px;font-size:.68rem;color:#b91c1c;font-weight:700">✗ 延迟 33.3ms</div>
    <div style="position:absolute;left:0;top:196px;width:86px;text-align:right;font-size:.66rem;color:#6b7280">120Hz</div>
    <div style="position:absolute;left:96px;top:202px;width:568px;border-top:2px solid #cbd5e1"></div>
    <div style="position:absolute;left:96px;top:196px;width:2px;height:12px;background:#cbd5e1"></div>
    <div style="position:absolute;left:238px;top:196px;width:2px;height:12px;background:#cbd5e1"></div>
    <div style="position:absolute;left:380px;top:196px;width:2px;height:12px;background:#cbd5e1"></div>
    <div style="position:absolute;left:522px;top:196px;width:2px;height:12px;background:#cbd5e1"></div>
    <div style="position:absolute;left:662px;top:196px;width:2px;height:12px;background:#cbd5e1"></div>
    <div style="position:absolute;left:96px;top:218px;width:600px;font-size:.64rem;color:#6b7280">同一段时间里有 4 个截止点，每个只剩 8.3ms —— 上面那条「准时」的 15ms 帧，在这里第一个就过不了</div>
  </div>
</div>

<p class="dnote">超时 1.3ms，延迟从 16.7ms 变成 33.3ms——代价不是「晚一点」，是翻倍<br><b style="color:#17324d">接下来三条根源，回答的都是同一个问题：Web 为什么更容易超过这条线</b></p>

<!--
先把这条 16.7 毫秒的截止线说清楚，后面三条根源都用它计价。屏幕不是连续在动的，它像放电影：每隔固定时间取一张画面播出去，这个节拍叫 VSync，60Hz 就是每 16.7 毫秒一次。看上半部分：这一帧 15 毫秒干完了活，赶在截止点之前交卷，准时上屏，用户感知到的延迟就是 16.7 毫秒。看下半部分：同样的工作量，只因为 JS 多花了 3 毫秒，总耗时 18 毫秒——注意，它只超了 1.3 毫秒。关键在这儿：屏幕不会「晚 1.3 毫秒」等你，它到点就取画，你没交卷，它只能把上一帧原样再放一遍；你这一帧不是迟到，是彻底作废，要等下一个刷新周期才有机会上屏。所以超时 1.3 毫秒的实际代价是延迟从 16.7 跳到 33.3——翻倍。这就是我后面会反复提到的那道悬崖：在截止点两侧，性能不是平滑变化的——差一点点和差很多，用户感受完全一样。也正是因为这个，「偶尔卡一下」的观感永远比平均帧率的数字难看得多——这条线我们最后一章还会回来算账。最下面那条是 120Hz 的刻度，先留个印象：同一段时间要卡 4 次点，每次只有 8.3 毫秒，上面那条「准时」的帧到这儿直接变成掉帧。
-->

---

## 根源一：原生是直接改，Web 是每次都要重算一遍

<div class="dg" style="zoom:1.1">
  <div class="dcol" style="gap:.75rem;align-items:flex-start">
    <div class="drow" style="align-items:center">
      <div class="dcap" style="width:3.2rem;margin:0;text-align:right">原生</div>
      <div class="dbox nat" style="padding:.32rem .7rem">把新位置写进去</div>
      <span class="darr">→</span>
      <div class="dbox" style="padding:.32rem .7rem">交给系统显示</div>
      <div class="dcap" style="margin:0 0 0 1rem;text-align:left">界面再复杂，这两步的代价都一样</div>
    </div>
    <div class="drow" style="align-items:center">
      <div class="dcap" style="width:3.2rem;margin:0;text-align:right">Web</div>
      <div class="dbox js" style="padding:.32rem .6rem;font-size:.74rem">算样式<small>哪些规则落在这个元素上</small></div>
      <span class="darr">→</span>
      <div class="dbox js" style="padding:.32rem .6rem;font-size:.74rem">算位置<small>每个元素排在哪</small></div>
      <span class="darr">→</span>
      <div class="dbox js" style="padding:.32rem .6rem;font-size:.74rem">画出来</div>
      <span class="darr">→</span>
      <div class="dbox js" style="padding:.32rem .6rem;font-size:.74rem">合成显示</div>
    </div>
    <div class="dcap" style="margin:-.3rem 0 0 4.3rem;text-align:left;color:#b45309">元素越多、样式规则越多，这一遍就越贵</div>
  </div>
</div>

<p class="dnote">浏览器不知道你要做的是什么界面，只能每次都按最通用的方式重算一遍<br><b style="color:#17324d">这笔开销不是打开页面时付一次，是每一帧都要付——直接从那 16.7ms 里扣</b></p>

<!--
第一条根源，说的是「同样一件事，两边要干的活不一样多」。原生这边，把一个按钮挪个位置，基本就是把新位置写进去，然后交给系统显示——两步，完事。而且界面再复杂，这两步的代价也是那么多。Web 这边，同样挪一下，浏览器要重新算一遍：先算样式，看看写的那些规则到底哪些落在这个元素上；再算位置，因为它一动，旁边的元素可能都得跟着挪；然后画出来、合成显示。为什么要绕这么大一圈？因为浏览器根本不知道你要做的是什么界面。它必须能显示任何一个网页，所以只能按最通用的方式，每次都从头推一遍。你这个页面可能只用到其中一小部分能力，但这一遍不会因此变短。关键在于：元素越多、样式规则越多，这一遍就越贵——原生那两步是固定的，Web 这一遍是跟着界面规模涨的。而且这笔钱不是打开页面时付一次，是每一帧都要付。所以呢？回到刚才那条 16.7 毫秒的线——这条根源不直接制造卡顿尖峰，它抬高的是每一帧的起步成本，把余量吃掉，让你更容易撞线。这是三条里最容易靠优化缓解的一条，也是最不致命的一条。至于 RN 在这条上站哪儿，先留个空——第三站回来填。
-->

---

## 根源二：关键路径上，有没有一个会被业务代码堵住的单线程

<div class="dg" style="zoom:1.06">
  <div class="dcol" style="gap:.9rem;align-items:flex-start">
    <div class="drow" style="align-items:center;gap:.7rem">
      <div class="dcap" style="width:3rem;margin:0;text-align:right">原生</div>
      <div class="dbox" style="padding:.35rem .7rem;background:#fee2e2;border-color:#b91c1c">主线程卡死 500ms</div>
      <span class="darr">→</span>
      <div class="dbox nat" style="padding:.35rem .7rem"><b>动画照样跑完</b><small>iOS：Core Animation 在独立的 render server 进程<br>Android：5.0 起有 RenderThread</small></div>
    </div>
    <div class="drow" style="align-items:flex-start;gap:.7rem">
      <div class="dcap" style="width:3rem;margin:0;text-align:right;padding-top:.5rem">Web</div>
      <div class="dbox" style="padding:.35rem .7rem;background:#fee2e2;border-color:#b91c1c;margin-top:.15rem">同样卡死 500ms</div>
      <span class="darr" style="padding-top:.5rem">→</span>
      <div class="dcol" style="gap:.35rem;align-items:flex-start">
        <div class="dbox js" style="padding:.35rem .7rem"><b>动画跟着停</b><small>JS · 样式计算 · 布局 · 绘制共享这一个线程</small></div>
        <div style="font-size:.66rem;line-height:1.6;color:#6b7280;text-align:left;padding-left:.1rem">
          唯一的例外：纯 transform / opacity 能走合成线程<br>
          <span style="color:#b91c1c">而只要挂了非 passive 的 touch 监听，或改了触发 layout 的属性，例外立刻失效</span>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="dnote">再叠加 GC 停顿：垃圾回收什么时候来、停多久，业务代码说了不算<br><b style="color:#17324d">原生的流畅有下限保证，Web 的流畅是概率性的</b><br>这个区别，比任何一张平均帧率对比表都重要</p>

<!--
第二条根源，三条里最重要的一条：关键路径上，有没有一个会被业务代码堵住的单线程。原生做了一件很关键的事——它把「动画的执行」从「应用的逻辑」里摘出去了。iOS 上 Core Animation 的动画实际是在一个独立的 render server 进程里推进的；Android 从 5.0 起有 RenderThread。所以你的主线程哪怕卡死 500 毫秒，那个动画该怎么播还怎么播完，因为播它的根本不是你这个线程。Web 这边相反：JS、样式计算、布局共享同一个主线程。有人会说浏览器不是有合成线程吗——对，纯 transform 和 opacity 的动画合成线程确实能独立处理，这是真本事。但这条逃生通道很窄：只要页面上挂了非 passive 的 touch 监听，浏览器就必须先问过主线程才敢滚；只要你动的属性会触发 layout，也一样得回主线程。再加上 GC——垃圾回收什么时候来、停多久，业务代码控制不了。所以呢？这就是今天最该记住的一句话：原生的流畅是有下限保证的，Web 的流畅是概率性的。你在自己手机上测一百次都不掉帧，不代表用户那一次不掉——因为它取决于那一刻主线程上恰好有什么。这个区别，比任何一份平均帧率对比表都重要。
-->

---

## 根源三：滑动的手感，是系统白送的，还是 JS 自己算的

<div class="dg" style="gap:1.6rem;zoom:1.06;align-items:flex-start">
  <div class="dcol" style="gap:.3rem">
    <div class="dbox nat" style="padding:.28rem .65rem;font-size:.72rem">松手之后慢慢停下来</div>
    <div class="dbox nat" style="padding:.28rem .65rem;font-size:.72rem">滑到头会回弹一下</div>
    <div class="dbox nat" style="padding:.28rem .65rem;font-size:.72rem">从边缘往回滑就返回上一页</div>
    <div class="dbox nat" style="padding:.28rem .65rem;font-size:.72rem">手指按下去立刻变色</div>
    <div class="dcap" style="margin-top:.15rem">原生 App 一行代码都不用写</div>
  </div>
  <div class="dcol" style="align-items:center;gap:.35rem">
    <div class="dbox" style="padding:.4rem .8rem"><b>屏幕记录手指位置</b><small>每秒两百多次，比画面刷新快好几倍</small></div>
    <div class="darr">↓</div>
    <div class="drow" style="gap:.7rem">
      <div class="dbox nat" style="padding:.32rem .7rem"><b>系统</b><small>这些点全都拿得到</small></div>
      <div class="dbox js" style="padding:.32rem .7rem"><b>网页里的 JS</b><small>只拿到一部分，还慢一拍</small></div>
    </div>
  </div>
</div>

<p class="dnote">甩一下列表，它该滑多远，取决于你松手那一刻的速度<br>系统看得到手指离开前的完整轨迹，能算准；JS 只看得到最后两三个点，只能估<br><b style="color:#17324d">这不是代码写得慢，是能拿到的信息本来就少——所以优化也补不回来</b></p>

<p class="dcap" style="margin-top:.7rem">三条根源到此讲完，体验这个天花板成立——下面换第二个：能力</p>

<!--
第三条根源最容易被忽略，但用户说「感觉不对」的时候，多半就是它。原生 App 里有很多手感是系统白送的：松手之后列表慢慢停下来、滑到头有个回弹、从屏幕边缘往回滑就能返回上一页、手指按下去立刻变色——这些 App 一行代码都不用写。H5 这边，稍微复杂一点的交互就得 JS 自己写一遍去模仿。为什么模仿不像？很多人以为是算法不够好，其实是两边拿到的信息就不一样多。屏幕记录手指位置的频率很高，每秒两百多次，比画面刷新还快好几倍。系统能拿到这些点的全部；网页里的 JS 只拿到其中一部分，而且还慢一拍。最典型的就是甩动列表：你手指一甩松开，列表该滑多远，取决于松手那一刻的速度。系统看得到手指离开前的完整轨迹，算得准；JS 只看得到最后两三个点，只能估——而人松手的时候手指常常会不自觉往回缩一下，这一下正好被 JS 算进去，甩出去的距离就不对了。所以这不是代码写得慢，是能拿到的信息本来就少，优化补不回来。三条根源讲完：H5 三条全在下风——不是没优化好，是结构决定的。每条我都留了一格空白：RN 站哪儿？第三站回来填这张表。现在换第二个天花板：能力。
-->

---

## 第二个天花板：手机上的功能，网页大多碰不到

<div class="dg" style="gap:0">
  <div class="dbox js" style="padding:1rem 1.3rem"><b>网页只能待在这个框里</b><small>H5 页面和它的 JS</small></div>
  <div style="width:12px;height:6rem;background:repeating-linear-gradient(45deg,#9ca3af,#9ca3af 6px,#e5e7eb 6px,#e5e7eb 12px);border-radius:3px;margin:0 1.2rem"></div>
  <div class="drow">
    <div class="dbox nat">摄像头</div>
    <div class="dbox nat">推送</div>
    <div class="dbox nat">蓝牙</div>
    <div class="dbox nat">文件系统</div>
  </div>
</div>

<p class="dnote">这堵墙是浏览器出于安全砌的，不是哪家没做好<br><b style="color:#17324d">所以「纯 H5 做的 App」根本不存在——想用这些功能，就得有原生代码在场</b></p>

<!--
能力天花板。浏览器天生不信任网页，把它关在沙箱里——摄像头、推送、蓝牙都碰不到。但正经 App 离不开这些。所以只要一个「H5 App」能扫码、能收推送，它就一定不是纯 H5，原生代码一定在场。这就是 Hybrid。
-->

---

## 于是所有「H5 App」，外面都套着一层原生——这就是 Hybrid

<div class="dg">
  <div class="dbox nat" style="padding:.8rem 1rem">
    <b style="margin-bottom:.5rem">原生壳</b>
    <div class="drow" style="margin-top:.5rem;align-items:center">
      <div class="dbox js"><b>WebView</b><small>H5 页面 + JS</small></div>
      <div class="dcol" style="align-items:center;gap:2px">
        <div style="font-size:.66rem;color:#6b7280">JSBridge<br>（网页向原生喊话的通道）</div>
        <div class="dbox" style="padding:.25rem .5rem;font-size:.66rem;line-height:1.5">喊一句要等回话<br>只能传字符串<br>两边靠口头约定</div>
        <div class="darr">⇄</div>
      </div>
      <div class="dcol">
        <div class="dbox nat" style="padding:.3rem .6rem">摄像头</div>
        <div class="dbox nat" style="padding:.3rem .6rem">推送</div>
        <div class="dbox nat" style="padding:.3rem .6rem">蓝牙</div>
      </div>
    </div>
  </div>
</div>

<!--
Hybrid：原生壳管系统能力，WebView 跑页面，中间 JSBridge 通道让网页喊话。注意桥上三个标签——异步，要等回调；字符串，参数序列化传；无类型，全靠口头约定，一边改了另一边上线才发现。下一页看这三个标签变成多少工作量。
-->

---

## Hybrid 并没有省掉原生开发

<div class="dg" style="flex-direction:column;gap:.7rem">
  <div class="drow" style="align-items:center">
    <div class="dbox nat">原生写实现</div>
    <span class="darr">→</span>
    <div class="dbox">注册到桥</div>
    <span class="darr">→</span>
    <div class="dbox js">JS 封装调用</div>
    <span class="darr">→</span>
    <div class="dbox">两端联调</div>
  </div>
  <div class="dcap">每加一个能力走一遍；iOS 和 Android 的桥不同，各走一遍</div>
</div>

<!--
每加一个原生能力：原生写实现、注册到桥、JS 封装、联调——iOS 和 Android 各来一遍。所以 Hybrid 团队照样要养原生工程师维护壳和桥。原生开发没省掉，只是挪了个位置。Hybrid 是务实折中，但没解决「两个生态两套人」的根本问题。
-->

---

## H5 适合嵌入页面，不适合承担 App 主体

<div class="dg">
  <div class="dbox" style="padding:.8rem 1rem">
    <b>App</b>
    <div class="drow" style="margin-top:.5rem">
      <div class="dbox rn" style="padding:1.1rem 1rem"><b>主体验</b><small>首页 · 核心流程 · 高频交互</small></div>
      <div class="dcol">
        <div class="dbox js" style="padding:.3rem .6rem;font-size:.7rem">运营页 H5</div>
        <div class="dbox js" style="padding:.3rem .6rem;font-size:.7rem">活动页 H5</div>
        <div class="dbox js" style="padding:.3rem .6rem;font-size:.7rem">帮助中心 H5</div>
      </div>
    </div>
  </div>
</div>

<!--
两个天花板都到底了，结论是分工：低频、重展示、天天改的页面给 H5，发版优势用在刀刃上；主体验——首页、核心流程、高频交互——被体验和能力两个天花板压着，不该是 H5。行业在这条路上摸了好几年，最大的一跤是 Facebook 摔的，这个故事马上讲。
-->

---

## 我们想要的是：原生的体验，Web 的开发效率

<div class="dg" style="gap:.8rem">
  <div class="dbox nat">原生的体验</div>
  <span style="color:#6b7280;font-weight:700">+</span>
  <div class="dbox js">一套 JS 代码</div>
  <span style="color:#6b7280;font-weight:700">+</span>
  <div class="dbox rn">Web 的开发效率</div>
  <span class="darr">→</span>
  <div class="dbox ghost"><b>React Native？</b></div>
</div>

<!--
把两章的账合起来，需求清单自己浮出来：原生的体验、一套 JS 代码、尽量保住 Web 的开发效率——说白了，就是要填上开场坐标系里那个空角。听着像既要又要——2015 年，Facebook 交出了一份答卷。
-->

---
layout: section
---

# RN 的原理：JS 负责计算，原生负责渲染

<div class="evo">
  <span class="estep done">原生</span><span class="earr">→</span>
  <span class="estep done">H5 / Hybrid</span><span class="earr">→</span>
  <span class="estep now">React Native</span><span class="earr">→</span>
  <span class="estep">Expo</span><span class="earr">→</span>
  <span class="estep">边界与结论</span>
</div>

<!--
原生太贵，H5 撞了天花板——演进到第三站，Facebook 交的答卷：React Native。全场最重的一章，先用一句话说清它是什么、看它从哪来，再把它拆开证明。
-->

---
layout: center
class: text-center
---

## RN 用 JS 描述界面，渲染出来的是<span style="color:#047857">真原生控件</span>

<div class="dg" style="gap:.8rem;margin-top:2.2rem">
  <div class="dbox js"><b>JS</b><small>描述界面</small></div>
  <span class="darr">→</span>
  <div class="dbox rn"><b>React Native</b></div>
  <span class="darr">→</span>
  <div class="dbox nat"><b>原生控件</b><small>系统渲染</small></div>
</div>

<!--
RN 的答案就这一句：用 JS 描述界面，渲染出来的是货真价实的原生控件——开场坐标系里那个空角，它站进去了。注意，没有网页、没有套壳，屏幕上每个按钮都是系统亲手画的，JS 只是发号施令的人。这句话现在还是个断言，这一章把它拆开证明，最后用系统工具现场验货。
-->

---

## RN 不是新技术：它已经演进了十年

<div class="tl">
  <div class="tl-node">
    <div class="tl-year">2012</div>
    <div class="tl-dot js"><logos-facebook style="width:1.9rem;height:1.9rem" /></div>
    <div class="tl-label">弃用 HTML5<small>Facebook 全线退回原生</small></div>
  </div>
  <div class="tl-node" v-click="1">
    <div class="tl-year">2015</div>
    <div class="tl-dot rn"><logos-react style="width:1.9rem;height:1.9rem" /></div>
    <div class="tl-label">React Native 开源<small>用 JS 指挥原生控件</small></div>
  </div>
  <div class="tl-node" v-click="2">
    <div class="tl-year">2018</div>
    <div class="tl-dot"><carbon-tools style="width:1.8rem;height:1.8rem;color:#6b7280" /></div>
    <div class="tl-label">启动架构重写<small>拆掉那座异步桥</small></div>
  </div>
  <div class="tl-node" v-click="3">
    <div class="tl-year">2019</div>
    <div class="tl-dot js"><carbon-flash style="width:1.8rem;height:1.8rem;color:#b45309" /></div>
    <div class="tl-label">Hermes 引擎<small>为手机自研</small></div>
  </div>
  <div class="tl-node" v-click="4">
    <div class="tl-year">2024</div>
    <div class="tl-dot rn"><carbon-checkmark-filled style="width:1.8rem;height:1.8rem;color:#047857" /></div>
    <div class="tl-label">新架构成为默认<small>Fabric + JSI</small></div>
  </div>
  <div class="tl-node" v-click="5">
    <div class="tl-year">未来</div>
    <div class="tl-dot ghost"><carbon-rocket style="width:1.8rem;height:1.8rem;color:#6b7280" /></div>
    <div class="tl-label">Static Hermes<small>在字节码基础上再进一步<br>直接编译成机器码 · 还没落地</small></div>
  </div>
</div>

<p class="dnote">十年里架构重写了一遍，引擎也换成自己造的，现在还在往前走——不是新玩具</p>

<!--
上一章说行业在 H5 上摔的最大一跤：2012 年扎克伯格公开承认「押注 HTML5 是我们犯过的最大错误」，Facebook App 全线退回原生。但成本问题还在，2013 年内部 Hackathon 里长出一个实验：用 JS 指挥原生控件——2015 年开源，就是 React Native。之后是一部架构自我革命史：2018 年启动重写，把那座异步桥拆掉；2019 年自研 Hermes 引擎，专为手机做的 JS 引擎；2024 年 10 月起，Fabric 加 JSI 的新架构成为默认。最后一格是路线图，还没落地所以用虚线：Static Hermes 是 Hermes 的下一步，把带类型标注的 JS 提前编译成原生机器码，而不是像现在这样编译成字节码再解释执行，目标是把解释器开销整个去掉；旁边还有 React Compiler，自动做记忆化，省掉手写 useMemo 那一堆。这两个都还没成为默认，但方向很清楚。一句话：它不是新玩具，是演进了十年、还在活跃进化的成熟技术。
-->

---

## 「用 JS 写，出来是真原生控件」——这怎么做到的

<div class="dg" style="flex-direction:column;gap:.9rem">
  <div class="drow" style="gap:1.6rem">
    <div class="dbox js" style="min-width:14rem;padding:.9rem 1rem"><b>第一步　算</b><small>界面哪里变了，JS 这边先算出来</small></div>
    <div class="dbox nat" style="min-width:14rem;padding:.9rem 1rem"><b>第二步　交</b><small>把结果交给原生，变成真控件</small></div>
  </div>
  <div class="dbox rn ghost" style="padding:.4rem .9rem;font-size:.74rem">最后拿系统工具验一下：视图树里有没有 div</div>
</div>

<!--
上一页那句话——用 JS 写界面，出来的是真原生控件——听着有点反直觉，这一章就是拆开它。其实就两步：第一步，界面哪里变了，这件事在 JS 这边算；第二步，算完的结果怎么交到原生那边，变成屏幕上真正的控件。先讲第一步，再讲第二步，最后我们用系统自带的工具打开真机验一下，看看视图树里到底有没有 div。
-->

---

## 第一步：React 算出来的不是画面，是一张「哪里变了」的清单

<div class="dg" style="gap:1.1rem">
  <div class="dcol">
    <div class="dbox js" style="padding:.4rem .8rem"><b>旧描述</b><small>数据 A 时的界面</small></div>
    <div class="dbox js" style="padding:.4rem .8rem"><b>新描述</b><small>数据 B 时的界面</small></div>
  </div>
  <span class="darr">→</span>
  <div class="dbox"><b>diff</b><small>对比</small></div>
  <span class="darr">→</span>
  <div class="dbox rn"><b>最小差异清单</b><small>这行文字变了<br>那个按钮没变</small></div>
</div>

<p class="dnote">到这一步为止全是内存里的计算，一个像素都还没画<br><b style="color:#17324d">而「谁来画」是可以整个换掉的——这就是 React Native 能成立的地方</b></p>

<!--
第一步：界面哪里变了，谁来算？答案是 React。不写前端的同学给我一分钟，一句话就够：你告诉它「数据长这样的时候，界面该长这样」；数据一变，它拿新旧两份描述一比，算出一张清单——这行文字变了，那个按钮没变。关键在最后一句：到这里为止全是内存里的计算，一个像素都还没画。真正画出来，是后面那一段的事。而那一段，是可以整个换掉的——换成浏览器，就是我们熟悉的网页；换成原生，就是 React Native。所以这一页看着在讲 React，其实讲的是 RN 为什么可能：上面这套算法根本不关心你最后画到哪儿。
-->

---

## 同一个 React，换一个渲染后端

<div class="dg" style="gap:2.5rem">
  <div class="dcol" style="align-items:center">
    <div class="dbox rn" style="min-width:11rem"><b>React</b><small>diff 出界面变化</small></div>
    <div class="darr">↓</div>
    <div class="dbox" style="min-width:11rem"><b>ReactDOM</b></div>
    <div class="darr">↓</div>
    <div class="dbox js" style="min-width:11rem"><b>DOM 节点</b><small>浏览器渲染</small></div>
    <div class="dcap">网页</div>
  </div>
  <div class="dcol" style="align-items:center">
    <div class="dbox rn" style="min-width:11rem"><b>React</b><small>diff 出界面变化</small></div>
    <div class="darr">↓</div>
    <div class="dbox" style="min-width:11rem"><b>React Native</b></div>
    <div class="darr">↓</div>
    <div class="dbox nat" style="min-width:11rem"><b>UIView · android.View</b><small>系统直接渲染</small></div>
    <div class="dcap">手机</div>
  </div>
</div>

<!--
左边网页：React 算 diff，ReactDOM 落成 DOM，浏览器渲染。右边把 ReactDOM 换成 React Native：同样的 diff，落地变成给原生侧发指令——创建 UIView、改文字。没有 DOM、没有 WebView。锚点句现在有画面了。而且上层都是 React，前端经验直接平移。
-->

---

## 前端写的 flex 布局，由 C++ 引擎 Yoga 计算

<div class="dg" style="gap:.9rem">
  <div class="dbox js" style="font-family:monospace;text-align:left;font-size:.72rem">flexDirection: 'row'<br>justifyContent: 'center'</div>
  <span class="darr">→</span>
  <div class="dbox rn"><b>Yoga</b><small>C++ 实现的 Flexbox</small></div>
  <span class="darr">→</span>
  <div class="dcol">
    <div class="dbox nat" style="padding:.3rem .6rem">iOS 布局</div>
    <div class="dbox nat" style="padding:.3rem .6rem">Android 布局</div>
  </div>
</div>

<p class="dnote">同一份实现，两端结果一致</p>

<!--
「计算」的最后一块：位置。原生控件不认识 CSS。RN 内置 Yoga——C++ 重新实现的 Flexbox，前端写惯的 flex 原样生效。C++ 算得快，而且两端跑同一份实现，布局结果完全一致。到这，第一个问题答完了：React 算出变什么，Yoga 算出摆哪里。

-->

---

## 第二步的老办法（2015–2024）：中间隔着一座「桥」

<div class="dg" style="gap:1.2rem">
  <div class="dbox js"><b>JS 这边</b><small>算出哪里变了</small></div>
  <div class="dcol" style="align-items:center;gap:3px">
    <span class="darr">⇄</span>
    <div class="dbox" style="border-radius:999px;padding:.3rem .9rem;font-size:.7rem">桥：要打包、要排队、不能立刻回话</div>
    <div style="font-size:.7rem;color:#b45309">手指拖着东西走时，每秒几十个来回</div>
  </div>
  <div class="dbox nat"><b>原生这边</b><small>算位置 · 创建控件 · 上屏</small></div>
</div>

<p class="dnote">桥一堵，画面就跟不上手指——早年「RN 卡」的印象，说的就是这座桥<br><span style="font-size:.9em">（有一点它从第一天就赢了 H5：JS 和渲染不抢线程，JS 忙的时候，已经交给系统的滚动和转场照样在动）</span></p>

<!--
第二步：算完的清单，怎么交到原生那边去？先说老办法，一句话带过就行，因为它已经是历史了。2015 年那套架构，JS 和原生中间隔着一座「桥」：JS 要跟原生说话，得先把内容打包，排进队列，等对方慢慢处理，没法立刻拿到回话。平时看不出问题，一到高频交互就露馅——比如手指拖着一个东西走，触摸事件要过桥送给 JS，JS 算完新位置再过桥送回来，每秒几十个来回，每次都要打包排队。桥一堵，画面就跟不上手指。早年「RN 卡」这个印象，说的基本就是这座桥。顺便说一件 RN 从第一天就做对的事：JS 和渲染不抢同一条线程——JS 跑久了不会劫持渲染，已经交给系统的列表滚动、转场动画照样在动，最多是数据晚到一拍。这一条它对 H5 是实打实地赢。那这座桥后来怎么了？2018 年 Meta 直接把它拆了。
-->

---

## 新架构移除了桥，换成直通的 JSI

<div class="dg" style="gap:1.2rem">
  <div class="dbox js" style="align-self:center"><b>JS 线程</b><small>业务代码 · diff</small></div>
  <div class="dcol" style="align-items:center;gap:2px">
    <div class="dbox rn" style="border-radius:999px;padding:.3rem .9rem"><b style="font-size:.78rem">JSI</b><small>直接调用，不用打包排队</small></div>
    <div style="font-size:.7rem;color:#6b7280">JS 像调普通函数一样直接调原生</div>
  </div>
  <div class="dcol">
    <div class="dbox rn"><b>Fabric</b><small>新渲染器</small></div>
    <div class="dbox rn"><b>TurboModules</b><small>原生模块按需加载</small></div>
    <div class="dbox nat"><b>UI 主线程</b><small>控件上屏</small></div>
  </div>
</div>

<p class="dnote">RN 0.76 起（2024 年 10 月），新架构默认开启</p>

<!--
手术核心叫 JSI：以前隔桥喊话，现在 JS 直接握着 C++ 对象引用，像调普通函数一样同步调，不序列化不排队。这张图和上一张同构，就是桥换成直通接口。配套 Fabric 新渲染器、TurboModules 按需加载。重点是时间点：0.76 起默认开启，2024 年 10 月——「RN 卡」的老印象，主要对应的就是这座已经拆掉的桥。
-->

---

## Hermes（今天的默认）：JS 提前编译成字节码，装进安装包

<div class="dg" style="flex-direction:column;gap:.8rem">
  <div class="drow" style="align-items:center">
    <div class="dcap" style="width:5.5rem;margin:0;text-align:right">普通引擎</div>
    <div class="dbox" style="padding:.3rem .6rem">启动</div>
    <span class="darr">→</span>
    <div class="dbox js"><b>现场解析 + 编译</b><small>白屏时间</small></div>
    <span class="darr">→</span>
    <div class="dbox" style="padding:.3rem .6rem">执行</div>
  </div>
  <div class="drow" style="align-items:center">
    <div class="dcap" style="width:5.5rem;margin:0;text-align:right">Hermes</div>
    <div class="dbox rn"><b>构建时已编译</b><small>字节码打进安装包</small></div>
    <span class="darr">→</span>
    <div class="dbox" style="padding:.3rem .6rem">启动</div>
    <span class="darr">→</span>
    <div class="dbox" style="padding:.3rem .6rem">直接执行</div>
  </div>
</div>

<p class="dnote">启动快，内存省</p>

<!--
第二个问题还剩一块配套：JS 本身在哪跑？这就是时间线上 2019 年那格。一般引擎在用户打开 App 那刻现场解析编译，白屏就耗在这。Hermes 把编译挪到构建时，字节码直接打进包，启动加载即执行——启动快、内存省。RN 的运行时是为手机量身做的，不是把网页那套搬过来凑合。
-->

---

## 眼见为实：用系统工具掀开跑着的 App

<div class="dg" style="gap:2rem">
  <div class="dbox nat" style="padding:1rem 1.4rem;min-width:15rem"><b>RN 做的 App</b><small>每个元素都是系统控件<br><b style="color:#1d4ed8;font-size:1.05em">div：0 个</b></small></div>
  <div class="dbox js" style="padding:1rem 1.4rem;min-width:15rem"><b>Hybrid 做的 App</b><small>掀开只有一个大 WebView<br>里面全是网页元素</small></div>
</div>

<p class="dnote">Xcode 和 Android Studio 都自带这个功能，能看运行中 App 的真实结构<br><b style="color:#17324d">不用信我，这件事你自己回去两分钟就能验</b></p>

<!--
两个步骤都讲完了，验货。（现场演示，两分钟以内）Xcode 和 Android Studio 都自带看视图层级的功能，能把一个正在跑的 App 掀开，看它真实的结构。掀开 RN 做的 App：从上到下每一个元素都是系统控件，一个 div 都找不到。作为对照，掀开一个 Hybrid App：里面就是一个大 WebView 节点，网页的东西全在它肚子里。这就是今天开头那句话最直接的证据，不用信我，你回去自己两分钟就能验。（演示前记得在自己 demo 上先跑一遍，确认类名对得上。）
-->

---

## 小结：JS 负责计算，原生负责渲染

<div class="dg" style="gap:.7rem">
  <div class="dbox js"><b>JS</b><small>计算界面变化</small></div>
  <span class="darr">→</span>
  <div class="dbox rn"><b>JSI</b><small>同步送达</small></div>
  <span class="darr">→</span>
  <div class="dbox"><b>Yoga</b><small>计算位置</small></div>
  <span class="darr">→</span>
  <div class="dbox nat"><b>系统控件</b><small>渲染上屏</small></div>
</div>

<p class="dnote">体验是原生的，开发是 JS 的</p>

<!--
章首立的那句话，现在证完了。两个问题串成一条链：JS 算出界面怎么变，JSI 同步送达，Yoga 算出位置，系统控件渲染上屏。体验拿到原生，开发拿到 JS——原理成立。但「接近原生」到底接近到什么程度？第二章留了三格空白，现在有足够的机制去填了。
-->

---

## 三条根源逐条对一遍：RN 站在哪一边

<table class="mx">
  <thead>
    <tr>
      <th></th>
      <th class="h-nat">原生<span></span></th>
      <th class="h-rn">React Native<span></span></th>
      <th class="h-js">H5 / WebView<span></span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>① 每帧的基础开销<small>原生直接改，Web 每次都要重算</small></th>
      <td><div class="cell win"><b>赢</b><small>改一下就完事</small></div></td>
      <td><div class="cell near"><b>接近</b><small>自己算好位置直接给原生<br>绕开浏览器那一整套，还在单独线程上</small></div></td>
      <td><div class="cell lose"><b>输</b><small>每一帧都要重算一遍</small></div></td>
    </tr>
    <tr>
      <th>② 会不会被业务代码堵住<small>「偶尔卡一下」的来源</small></th>
      <td><div class="cell win"><b>赢</b><small>动画在另一条线上跑，卡不着</small></div></td>
      <td><div class="cell lose"><b>和 H5 一样</b><small>新架构改善很多，但<br>JS 逻辑还是挤在一条线上</small></div></td>
      <td><div class="cell lose"><b>输</b><small>JS 和渲染挤同一条线</small></div></td>
    </tr>
    <tr>
      <th>③ 滑动的手感谁来做<small>用户说「感觉不对」的主因</small></th>
      <td><div class="cell win"><b>赢</b><small>系统直接拿手指数据</small></div></td>
      <td><div class="cell near"><b>接近</b><small>列表底下就是系统自己那套<br>滚动、回弹都是白送的</small></div></td>
      <td><div class="cell lose"><b>输</b><small>JS 只拿到一部分数据</small></div></td>
    </tr>
  </tbody>
</table>

<p class="dnote"><b style="color:#17324d">RN 在 ① ③ 上接近原生，在 ② 上和 H5 一样</b><br>而且这三条只在「画面每帧都在动」的界面上才拉得开差距——静态图文页，三者差不多</p>

<!--
这张表是全场的支点，讲慢一点。第一条，抽象层的租金：RN 用 Yoga 算布局，Yoga 是 flexbox 的一个子集，用 C++ 实现，算完直接给原生 view 设 frame——整条 CSS 管线被绕开了，而且 Yoga 跑在独立线程，不占 JS 线程。所以这一条 RN 接近原生。第三条，交互物理：这条 RN 赢 H5 赢得最干脆——FlatList 底下就是真的 UITableView 和 RecyclerView，滚动的减速曲线、回弹、cell 复用，全部是系统那份实现，白送的，不是模拟的。第二条是关键：RN 没有赢过原生。老架构下手势要过异步桥，注意重点不是「过桥慢」，而是「这条路是异步的」——JS 线程正在跑一段 200 毫秒的数据处理，你的手指移动就得排队等它。新架构 Fabric 加 JSI 大幅改善了，同步调用、不用序列化，但 JS 逻辑本身仍然在一条单线程上。所以结论是这样：RN 花钱买到了①和③，但②没买到——它在②上和 H5 是同一侧的。这句话请记住，因为它决定了后面所有的判断：RN 的平均体验很接近原生，但它和原生一样有下限保证吗？没有。第三章开头我说过原生和 Web 的区别是「有下限保证」对「概率性」，RN 在这一点上是概率性的那一边。最后一行也必须说清楚：这三条根源全部只在「每帧都在变」的界面上成立——列表在滚、手指在拖、转场在放。一个静态图文页，进去就不动了，三者差距基本为零。所以这不是「原生更好」的一刀切，是「什么场景下差距才存在」。表里的措辞我用的是赢/接近/同侧，没写具体倍数——因为具体数字随机型、引擎版本、页面复杂度浮动很大，真做决策要自己压测。
-->

---

## 为什么②那格是黄的：同一个动画，你有两种写法

<DemoFrame src="animation-models.html" :height="292" />

<p class="dnote" style="zoom:1.12">两种写法效果一模一样——直到 JS 线程忙起来<br><b style="color:#17324d">所以 <code>useNativeDriver: true</code> 不是「调优参数」，它换掉的是整个跑法</b></p>

<!--
（现场演示，两分钟）把第二条根源再挖一层。先说清楚一件事：接下来这两种写法，不是 H5 和 RN 的区别，也不是架构逼你选的——是同一个 RN 项目里，你自己写代码时的选择，有时候差别就一个参数。看演示：同一个 0.3 秒的动画，两种写法。上面这条是「开场交一次」：动画开始的那一刻，把整条曲线——从哪走到哪、用什么节奏、放多久——一次性交给原生，然后 JS 就撒手不管了。看右边的计数：1 次，整个动画期间就问这一次。下面这条是「每帧回来问」：每一帧都要回到 JS 问一次「现在该走到哪了」，问的次数等于帧数——这个 0.3 秒的动画有几十帧，就得问几十次。（注意：右边这些数字随现场屏幕的刷新率变，别念死，看着屏幕报就行。）只要线程不忙，这两条路看起来一模一样，所以平时你根本发现不了区别。现在我勾上「让应用线程卡住 200 毫秒」——盯着两个方块：上面那个完全不受影响，照常播完，因为播它的根本不是这条被卡住的线程；下面那个立刻僵住，等线程放开才跳到正确位置。右边的计数也变了：真正问到的只剩下一小部分，其余的全被堵掉了——「被堵掉 N 次」就是本该问、但 JS 正忙着根本没问上的帧数。下面两条时间轴是机制：红色是被阻塞的应用线程，绿色是合成器真正在动的时段——上面那条绿色是连续的，下面那条正好缺了一块，缺口和红色严丝合缝。所以呢？这解释了为什么表里②那一格 RN 是黄的：只要动画每帧还要回 JS 取一次值，它就吊在那条会被业务代码堵住的单线程上，这时候 RN 和 H5 是一样的。所以②那格不是「RN 不行」，是「取决于你怎么写」。而 RN 里那两个大家天天写的东西——useNativeDriver 设成 true、Reanimated 的 worklet 把动画代码放到 UI 线程跑——本质都不是「优化参数」，是把这个动画从「每帧回来问」整个换成「开场交一次」。这里有个边界必须说清楚，不然一定有人问「那全设成 true 不就完了」：useNativeDriver 只支持 transform 和 opacity 这类不影响布局的属性，一旦你要动的是宽高或位置这种会触发重新布局的属性，就设不了 true，只能每帧回 JS。这也正是②那格是黄的而不是绿的原因——能设的都该设，但有一类动画物理上设不了。Reanimated 的 worklet 是另一条路，覆盖面更广，代价是引一个第三方库。理解了这个模型，你就不用背规则了，你自己能判断：这个动画的每一帧还需要 JS 参与吗？需要，它就是脆的。原理讲到这儿完整了。但原理成立到生产可用还差一堆脏活：RN 项目里躺着的两个原生工程谁维护？原生依赖怎么配？答案在 Expo。
-->

---
layout: section
---

# 官方建议通过框架使用 RN，Expo 是首选

Expo 之于 RN，相当于 Next.js 之于 React

<div class="evo">
  <span class="estep done">原生</span><span class="earr">→</span>
  <span class="estep done">H5 / Hybrid</span><span class="earr">→</span>
  <span class="estep done">React Native</span><span class="earr">→</span>
  <span class="estep now">Expo</span><span class="earr">→</span>
  <span class="estep">边界与结论</span>
</div>

<!--
RN 的原理成立了，但要把它用在生产里，还差工程化这一站——这就是演进的第四步：Expo。RN 官网现在的入门指南，裸建已被挪进单独的 Without a Framework 页面，首页开篇就推荐通过框架用 RN，点名 Expo。类比前端：React 只管渲染，工程问题 Next.js 兜底。这一章结构简单：先看裸用的三个麻烦，再看 Expo 一层层怎么解，最后把第一章欠下的那笔发版账收掉。
-->

---

## 直接使用 RN，就要自己维护两个原生工程

<div class="dg" style="gap:1.4rem">
  <div class="dbox" style="text-align:left;font-family:monospace;font-size:.72rem;padding:.7rem 1.1rem">
    your-app/<br>
    &nbsp;├ src/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#047857">← 业务代码</span><br>
    &nbsp;├ ios/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#b45309">← Xcode 工程</span><br>
    &nbsp;└ android/&nbsp;&nbsp;<span style="color:#b45309">← Gradle 工程</span>
  </div>
  <div class="dcol">
    <div class="dbox js" style="padding:.35rem .7rem;font-size:.72rem">引入原生依赖：需改 Podfile / build.gradle</div>
    <div class="dbox js" style="padding:.35rem .7rem;font-size:.72rem">升级 RN 版本：需手动合并模板差异</div>
    <div class="dbox js" style="padding:.35rem .7rem;font-size:.72rem">权限、图标、启动屏：需直接编辑工程文件</div>
  </div>
</div>

<!--
直接用 RN 初始化出来的仓库里，躺着一套完整的 Xcode 工程和一套完整的 Gradle 工程，从生成那天起就归你维护：引入一个带原生代码的依赖，要改 Podfile 和 build.gradle；配权限、换图标、改启动屏，要直接编辑工程文件；升级 RN 版本，官方给的是新旧模板的差异，得自己一处处合并回来。这三件事都需要原生工程经验——而我们选 RN 的初衷正是不想养原生团队。矛盾就在这里。Expo 怎么解？下一页先看全景。
-->

---

## 三个麻烦，Expo 给出三层对应的解法

<div class="dg" style="flex-direction:column;gap:.7rem">
  <div class="drow" style="align-items:center">
    <div class="dbox js" style="min-width:13rem">装原生库，怕版本冲突</div>
    <span class="darr">→</span>
    <div class="dbox rn" style="min-width:13rem"><b>Expo SDK</b><small>模块与 RN 版本配套测试</small></div>
  </div>
  <div class="drow" style="align-items:center">
    <div class="dbox js" style="min-width:13rem">两个原生工程，要人养</div>
    <span class="darr">→</span>
    <div class="dbox rn" style="min-width:13rem"><b>CNG</b><small>原生工程按配置生成</small></div>
  </div>
  <div class="drow" style="align-items:center">
    <div class="dbox js" style="min-width:13rem">原生配置，要手改</div>
    <span class="darr">→</span>
    <div class="dbox rn" style="min-width:13rem"><b>Config Plugins</b><small>在 app.json 里声明，自动注入</small></div>
  </div>
</div>

<!--
一页看全：三个麻烦，三层解法，一一对应。版本冲突交给 Expo SDK 的配套测试；原生工程维护交给 CNG 生成；原生配置交给插件注入。接下来三页把每层拆开讲，讲完你会发现一个共同点：Expo 在把「碰原生」这件事，一层层从日常工作里挪走。
-->

---

## Expo SDK 解决了原生模块的版本兼容问题

<div class="dg">
  <div class="dbox rn" style="padding:.9rem 1.1rem">
    <b>Expo SDK 57</b>
    <div class="drow" style="margin-top:.5rem;flex-wrap:wrap;max-width:22rem">
      <div class="dbox nat" style="padding:.28rem .6rem;font-size:.7rem">相机</div>
      <div class="dbox nat" style="padding:.28rem .6rem;font-size:.7rem">推送</div>
      <div class="dbox nat" style="padding:.28rem .6rem;font-size:.7rem">定位</div>
      <div class="dbox nat" style="padding:.28rem .6rem;font-size:.7rem">文件系统</div>
      <div class="dbox nat" style="padding:.28rem .6rem;font-size:.7rem">传感器</div>
      <div class="dbox" style="padding:.28rem .6rem;font-size:.7rem">……</div>
    </div>
    <small style="margin-top:.4rem">与 RN 0.86 整体配套测试——我们在用的组合</small>
  </div>
</div>

<!--
第一层：把相机、推送这些常用原生能力做成官方模块库，和 RN 版本捆成一个 SDK 版本，整体测过再发。我们现在用的就是 SDK 57 配 RN 0.86 这一组。升级从「赌兼容性」变成「SDK 56 升 57」。不性感，但省的全是真实工时。
-->

---

## 原生工程是生成产物，不是手写资产

```mermaid {scale: 1.1}
flowchart LR
  A[app.json<br>+ config plugins] --> B[npx expo prebuild]
  B --> C[ios/ 工程]
  B --> D[android/ 工程]
  C --> E[构建出包]
  D --> E
```

<p class="dnote">原生目录不进仓库、也不手改——脏了就删掉重新生成<br><b style="color:#17324d">要加相机权限？在 app.json 里声明 expo-camera，prebuild 时自动写进 Info.plist 和 AndroidManifest</b></p>

<!--
第二层是 Expo 最核心的设计，叫 CNG：原生工程根本不该由人来维护。仓库里只有 JS 和一份 app.json；需要原生工程的时候跑一次 prebuild 现场生成，它的地位等同于编译产物，脏了删掉重来。升级那个噩梦就直接消失了——换新模板重新生成一遍就完了。第三件麻烦事——库要改原生配置怎么办——用的是同一套机制：库作者把需要的原生改动写成一个 config plugin，你只要在 app.json 里声明一句，比如 expo-camera，prebuild 的时候自动把权限写进 Info.plist 和 AndroidManifest。全程不用打开 Xcode，甚至不用知道 Info.plist 是什么。三层到这儿讲完了——还记得第一章有笔账没还吗？
-->

---

## 改的是 JS，就不用再等商店审核

<div class="dg" style="flex-direction:column;gap:.9rem">
  <div class="drow" style="align-items:center">
    <div class="dcap" style="width:5.5rem;margin:0;text-align:right">原生层改动</div>
    <div class="dbox" style="padding:.35rem .7rem">prebuild 构建</div>
    <span class="darr">→</span>
    <div class="dbox nat"><b>商店审核</b><small>新增原生依赖 · 改原生配置</small></div>
    <span class="darr">→</span>
    <div class="dbox" style="padding:.35rem .7rem">放量</div>
  </div>
  <div class="drow" style="align-items:center">
    <div class="dcap" style="width:5.5rem;margin:0;text-align:right">JS 层改动</div>
    <div class="dbox js" style="padding:.35rem .7rem">发布新 JS 包</div>
    <span class="darr">→</span>
    <div class="dbox rn"><b>热更新</b><small>下次打开即新版</small></div>
  </div>
</div>

<p class="dnote">Expo Updates（我们用 EAS Update）：日常迭代绝大部分在 JS 层<br>更新协议开放，服务端可自建</p>

<!--
第一章算过两笔账：人力翻倍，还有一笔——节奏被商店审核锁死——到现在还欠着，这页收账。RN 的业务代码都打在一个 JS 包（bundle）里，而这个包是可以整体替换的：Expo 自带热更新机制，我们用的是官方的 EAS Update 服务——发布新包，用户下次打开 App 就是新版，分钟级触达，不经过商店。回想 H5 章那页「改完部署、打开即新版」：这个优点，RN 在 JS 层拿回来了。诚实的边界也要说：只有 JS 层的改动能这么发；动了原生依赖、原生配置，还是要 prebuild、走商店审核。你会发现发版和渲染走的是同一条分层线——JS 的归 JS，原生的归原生。好在日常迭代——改文案、调逻辑、修 bug——绝大部分落在 JS 层，再也不用为一行代码等三天。补一句：这套更新协议是开放的，服务端可以自建，我们后续也计划切到自建服务，不被托管平台绑死。
-->

---
layout: section
---

# RN 有两条边界：一条在性能上，一条在能力上

<div class="evo">
  <span class="estep done">原生</span><span class="earr">→</span>
  <span class="estep done">H5 / Hybrid</span><span class="earr">→</span>
  <span class="estep done">React Native</span><span class="earr">→</span>
  <span class="estep done">Expo</span><span class="earr">→</span>
  <span class="estep now">边界与结论</span>
</div>

<p style="text-align:center;margin-top:1.6rem;font-size:.92rem;color:#c7d2e5;line-height:2">
性能边界：上一页表里②那格是黄的——它在真实产品里意味着什么、怎么测、怎么验收<br>
能力边界：有几类功能，物理上就轮不到 RN
</p>

<!--
演进走完了，最后一站：边界，也是选型汇报最重要的一块。边界有两种，这一章就按这两种走。第一种是性能上的：上一章那张表里，②那一格 RN 是黄的，和 H5 同一侧——那格黄色落到真实产品里到底意味着什么、怎么测、怎么验收，先讲这个，一共五页。第二种是能力上的：有几类功能物理上就轮不到 RN。先剧透：两种边界都不是 RN 的缺陷，而是它设计里就包含的分工。
-->

---

## ②那格的黄，用户是这样感觉到的

<DemoFrame src="frame-variance.html" :height="292" />

<p class="dnote" style="zoom:1.12">左边每一帧都是 33.3ms；右边平均帧率高得多，但每隔一两秒卡一下<br><b style="color:#17324d">平均值更好的是右边，看着更糟的也是右边</b><br><span style="font-size:.9em">RN 在②上和 H5 同侧，意思就是：它可能出现的，正是右边这种情况</span></p>

<!--
（现场演示，让它跑 20 秒，先别解释）请大家盯着方块看，别看数字。左边是稳定 30fps，每一帧都是 33.3 毫秒，没有一帧例外。右边大部分帧只花 16.7 毫秒，但每一两秒会有一帧花掉 200 毫秒。现在看下面的柱状图：左边是一堵完全平整的墙，右边是一片矮草丛偶尔戳出一根红柱子。再看数字——右边平均帧率高一大截。但你们的眼睛已经投票了：右边看着更卡。这就是这一页要说的全部：人眼对「忽快忽慢」极其敏感，对「一直慢」反而相当宽容。稳定的 30fps，大脑会解读成「这个动画就是慢」，能接受；平均 58fps 里藏一帧 200 毫秒，大脑解读成「这 App 有问题」。为什么？回到第二章那条悬崖——那一帧不是慢了，是整整十二个刷新周期什么都没发生，画面硬生生冻住了五分之一秒。所以呢？下一页说它对我们的工作意味着什么。
-->

---

## 所以要消灭的是那几次卡顿，不是去拉高平均值

<div class="dg" style="gap:2rem;zoom:1.06;align-items:stretch">
  <div class="dcol" style="gap:.4rem;justify-content:center">
    <div class="dcap" style="margin:0">诊断指标</div>
    <div class="dbox" style="padding:.3rem .7rem;background:#fee2e2;border-color:#b91c1c">平均 FPS<small>把最该看的那一帧平摊掉了</small></div>
    <div class="darr" style="text-align:center">↓</div>
    <div class="dbox rn" style="padding:.32rem .7rem"><b>P95 / P99 帧时间</b><small>掉帧次数 · 最长帧</small></div>
  </div>
  <div style="width:2px;align-self:stretch;background:#e5e7eb"></div>
  <div class="dcol" style="gap:.4rem;justify-content:center;align-items:flex-start">
    <div class="dcap" style="margin:0;align-self:center">这几次卡顿从哪来</div>
    <div class="drow" style="align-items:center">
      <div class="dbox js" style="padding:.28rem .6rem;font-size:.72rem;min-width:5rem">根源 ①</div>
      <div class="dbox" style="padding:.28rem .6rem;font-size:.72rem">让每一帧的余量变少<small>更容易超时，但不制造尖峰</small></div>
    </div>
    <div class="drow" style="align-items:center">
      <div class="dbox" style="padding:.28rem .6rem;font-size:.72rem;min-width:5rem;background:#fee2e2;border-color:#b91c1c">根源 ②</div>
      <div class="dbox" style="padding:.28rem .6rem;font-size:.72rem">直接制造长时间停顿<small>P99 的主要来源</small></div>
    </div>
    <div class="drow" style="align-items:center">
      <div class="dbox js" style="padding:.28rem .6rem;font-size:.72rem;min-width:5rem">GC 停顿</div>
      <div class="dbox" style="padding:.28rem .6rem;font-size:.72rem">最典型的停顿制造者<small>什么时候来，业务代码说了不算</small></div>
    </div>
  </div>
</div>

<p class="dnote">和三条根源对上：<b style="color:#17324d">① 让每一帧的余量变少，② 直接制造那几次长时间的停顿</b><br>所以「平均帧率提上去了，用户还是说卡」——动的是 ①，问题在 ②</p>

<!--
上一页的体感，落到工作方式上就是两件事。第一件：换指标。平均 FPS 基本没有诊断价值——它的定义就是把最该看的那一帧平摊掉。真正要看的是 P95、P99 的帧时间，加上掉帧次数和最长帧。一个 P99 是 200 毫秒的页面，平均 FPS 可能很好看，但它就是卡。第二件：知道该去哪儿找问题。把三条根源对上——根源一，每帧的基础开销，它抬高的是平均帧时间、吃掉余量，让你离截止线更近，但它本身是均匀的，不制造尖峰；根源二，被业务代码堵住的单线程，它才是那几次长停顿的直接来源，P99 基本都是从这儿来的；GC 停顿是根源二里最典型的一个，因为它什么时候来、停多久，业务代码说了不算。一句话记：①让每一帧的余量变少，②直接制造那几次长时间的停顿。这也解释了一件让很多人困惑的事——为什么有些页面「优化了半天平均帧率上去了，用户还是说卡」。因为动的是①，问题在②。
-->

---

## 高刷是双刃剑：预算砍半，延迟下限也降低

<div class="dg" style="gap:1.4rem;zoom:1.1;align-items:stretch">
  <div class="dcol" style="gap:.4rem">
    <div class="dbox" style="padding:.3rem .7rem;background:#fee2e2;border-color:#b91c1c"><b>坏消息：预算砍半</b></div>
    <div class="dbox" style="padding:.34rem .7rem;font-size:.72rem;text-align:left">60Hz 上稳跑 12ms 一帧的代码<br>到 120Hz 就是<b>稳定掉帧</b></div>
    <div class="dcap" style="margin:.1rem 0 0">硬件更好了，软件的容错空间反而更小</div>
  </div>
  <div class="dcol" style="gap:.4rem">
    <div class="dbox rn" style="padding:.3rem .7rem"><b>好消息：延迟下限降低</b></div>
    <div class="dbox" style="padding:.34rem .7rem;font-size:.72rem;text-align:left">即使同样只跑 60fps<br>帧的呈现时机对齐得更早<br>触摸采样率通常也更高</div>
    <div class="dcap" style="margin:.1rem 0 0">跟手性是真的会变好</div>
  </div>
</div>

<p class="dnote">现代高刷基本是可变刷新率（ProMotion 10–120Hz）<br>掉帧不一定直接掉到 60，台阶更细；反而老式固定 60Hz 屏一掉就是 30，落差更大</p>

<!--
回到第二章那条标尺最下面的 120Hz 刻度，现在结算。高刷是双刃剑，两面都要说。坏消息：预算砍半，从 16.7 毫秒变成 8.3 毫秒。这意味着你在 60Hz 上稳稳跑 12 毫秒一帧的代码，换到 120Hz 屏上是稳定掉帧——同一份代码，同一台更贵的手机，表现更差。硬件更好了，软件的容错空间反而更小，这一点很反直觉。好消息也是真的：延迟的下限降低了。即使你的页面同样只能跑 60fps，在 120Hz 屏上帧的呈现时机能对齐得更早，加上高刷设备的触摸采样率通常也更高，跟手性是真的会变好，不是心理作用。还有一个缓冲：现在的高刷基本都是可变刷新率，比如 ProMotion 支持 10 到 120Hz，掉帧不一定直接对折到 60，台阶更细。真正难受的反而是老式固定 60Hz 屏——一掉就是 30，落差更大。
-->

---

## 落到三条技术线上：高刷会先惩罚结构问题

<div class="dg" style="zoom:1.04">
  <div class="dcol" style="gap:.5rem;align-items:flex-start">
    <div class="drow" style="align-items:center;gap:.7rem">
      <div class="dbox js" style="min-width:5.2rem;padding:.3rem .6rem"><b>H5</b><small>最尴尬</small></div>
      <div class="dbox" style="padding:.34rem .7rem;text-align:left;font-size:.72rem">iOS WKWebView 长期锁 60Hz：旁边原生页 120Hz 丝滑，切进 H5 立刻「重了一档」<small>而且跟你优化得多好完全无关</small></div>
    </div>
    <div class="drow" style="align-items:center;gap:.7rem">
      <div class="dbox rn" style="min-width:5.2rem;padding:.3rem .6rem"><b>RN</b><small>压力陡增</small></div>
      <div class="dbox" style="padding:.34rem .7rem;text-align:left;font-size:.72rem">8.3ms 里还要回一趟 JS 算出新值，基本不可能<small><code>useNativeDriver: true</code> 从「建议」变成「必须」；Reanimated worklet 的价值被放大</small></div>
    </div>
    <div class="drow" style="align-items:center;gap:.7rem">
      <div class="dbox nat" style="min-width:5.2rem;padding:.3rem .6rem"><b>原生</b><small>优势放大</small></div>
      <div class="dbox" style="padding:.34rem .7rem;text-align:left;font-size:.72rem">Core Animation 跑在独立进程，8.3ms 的预算跟主线程在干什么无关<small>根源② 的红利，在高刷下加倍兑现</small></div>
    </div>
  </div>
</div>

<p class="dnote"><b style="color:#17324d">任何没有脱离 JS 线程的动画，在高刷设备上会比 60Hz 表现更差</b><br>高刷不是「同样的代码更顺」——它会先把你的结构问题放大</p>

<!--
预算砍半这件事，落到三条线上后果完全不同。H5 最尴尬，而且尴尬得很特别：iOS 的 WKWebView 长期锁在 60Hz。所以在一台 120Hz 的手机上，旁边的原生页面丝滑，用户点进 H5 页立刻感觉「重了一档」——注意，这跟你把这个 H5 优化得多好完全无关，是天花板本身被压低了。RN 是压力陡增：8.3 毫秒的预算里，还要回一趟 JS 把新值算出来，基本不可能。所以在高刷设备上，useNativeDriver 设成 true 从一条「建议」变成了「必须」，Reanimated 那种把动画代码搬到 UI 线程跑的 worklet，价值被放大——这正好呼应刚才那个演示：高刷逼着你从下路搬到上路。反过来说这句话更值得记：任何没有脱离 JS 线程的动画，在高刷设备上会比在 60Hz 上表现更差。原生则相反，优势被放大：Core Animation 在独立进程里跑，8.3 毫秒的预算跟你主线程在干什么无关——根源二那份红利，在高刷下加倍兑现。所以高刷不是「同样的代码更顺」，它是一台放大器，先放大你的结构问题。
-->

---

## 怎么测、怎么验收：两端都要，两类 bug 完全不同

<div class="dg" style="zoom:1.12">
  <div class="dcol" style="gap:.7rem;align-items:flex-start">
    <div class="drow" style="align-items:center;gap:.8rem">
      <div class="dbox" style="min-width:8rem;padding:.34rem .7rem"><b>测试</b><small>中低端 60Hz 机</small></div>
      <span class="darr">→</span>
      <div class="dbox js" style="padding:.34rem .7rem">暴露平均性能问题<small>根源① 那一类：余量本来就不够</small></div>
    </div>
    <div class="drow" style="align-items:center;gap:.8rem">
      <div class="dbox" style="min-width:8rem;padding:.34rem .7rem"><b>验收</b><small>高刷旗舰</small></div>
      <span class="darr">→</span>
      <div class="dbox nat" style="padding:.34rem .7rem">暴露 JS 线程 / 异步链路的结构性问题<small>根源② 那一类：偶发的长停顿</small></div>
    </div>
  </div>
</div>

<p class="dnote">只测一端一定会漏——两类 bug 的表现和修法完全不同<br><b style="color:#17324d">别为了高刷做微优化</b>：60Hz 上就已经有 P99 长停顿的，堵的是那条单线程，不是预算不够</p>

<!--
这一页是可以直接带回去用的。测试放在中低端的 60Hz 机上做，它暴露的是平均性能问题——根源一那一类，余量本来就不够。验收放在高刷旗舰上做，它暴露的是 JS 线程和异步链路的结构性问题——根源二那一类，长尾。这两类 bug 的表现、定位方法、修法完全不同，只测一端一定会漏：只测低端机，你会以为自己没问题，结果旗舰用户抱怨最凶；只测旗舰，你会漏掉一大批用户根本跑不动的页面。最后提醒一句，避免走偏：别为了高刷去做微优化。如果你在 60Hz 上就已经有 P99 长尾，那不是预算不够，是有东西堵在关键路径上——多榨那两毫秒没用，得去找那个堵住线程的东西。高刷只是把它照得更清楚而已。性能这条边界讲完了，换第二种边界：能力。
-->

---

## 有三类东西，必须用原生写

<div class="dg" style="flex-direction:column;gap:.65rem;align-items:stretch;zoom:1.04">
  <div class="drow" style="align-items:center;gap:1rem">
    <div class="dbox nat" style="min-width:11rem;padding:.5rem .8rem"><b>压根不在你的 App 里跑</b></div>
    <div class="dbox" style="padding:.5rem .9rem;text-align:left;font-size:.74rem;flex:1">桌面小组件 · 灵动岛 · 推送扩展 · 手表 App<small>系统单独把它们拉起来，你的 JS 不在场，没有「用 RN 写」这个选项</small></div>
  </div>
  <div class="drow" style="align-items:center;gap:1rem">
    <div class="dbox nat" style="min-width:11rem;padding:.5rem .8rem"><b>每秒几十次贴着硬件算</b></div>
    <div class="dbox" style="padding:.5rem .9rem;text-align:left;font-size:.74rem;flex:1">相机滤镜 · 音视频 · AR · 地图<small>这种计算量放进 JS 跑不动；热点下沉原生，界面骨架仍然是 RN</small></div>
  </div>
  <div class="drow" style="align-items:center;gap:1rem">
    <div class="dbox nat" style="min-width:11rem;padding:.5rem .8rem"><b>启动最前段，和存量老 App</b></div>
    <div class="dbox" style="padding:.5rem .9rem;text-align:left;font-size:.74rem;flex:1">点图标到 JS 就绪之间那一段 · 成熟原生 App 里嵌 RN 页<small>美团 MRN、携程 CRN 都是这种嵌入形态</small></div>
  </div>
</div>

<p class="dnote">共同点：RN 靠的是「JS → 通信层 → 系统」这条链路<br><b style="color:#17324d">这条链路够不着的地方，就归原生</b></p>

<!--
能力边界，一共三类，记住这三类就够了。第一类，压根不在你的 App 进程里跑：桌面小组件、灵动岛、推送扩展、手表 App——这些是系统单独拉起来的，你的 JS 引擎根本不在场，所以不存在「用 RN 写」这个选项，不是难写，是没这个选项。第二类，每秒要算几十次、而且贴着硬件的：相机滤镜、音视频处理、AR、地图渲染——这种量级放进 JS 里跑不动，做法是把这块热点下沉成原生模块，界面骨架仍然是 RN。第三类，启动的最前段和存量老 App：从点图标到 JS 引擎就绪之间那一段，只能是原生代码；而一个已经很成熟的原生 App 想用 RN，通常是挑几个页面嵌进去，美团的 MRN、携程的 CRN 都是这种形态。这三类的共同点是什么？RN 靠的是「JS 到通信层再到系统」这一条链路，凡是这条链路够不着的地方，就归原生。
-->

---

## 下沉不是妥协，是 RN 设计好的通道

<div class="dg" style="flex-direction:column;gap:.5rem">
  <div class="dbox rn" style="padding:.7rem 1.2rem;min-width:26rem"><b>业务界面用 JS / RN 写</b><small>列表 · 表单 · 详情 · 流程——绝大部分工作量在这里</small></div>
  <div class="darr">↑ 原生模块挂回来 ↑</div>
  <div class="drow" style="gap:.8rem">
    <div class="dbox nat" style="padding:.45rem .8rem;font-size:.74rem">相机滤镜 · 音视频 · 地图</div>
    <div class="dbox" style="padding:.45rem .8rem;font-size:.74rem">小组件 · 推送扩展<small>独立进程，不经过 RN</small></div>
  </div>
</div>

<p class="dnote">RN 官方就是这么设计的：写原生模块、挂回 JS 用<br><b style="color:#17324d">所以「有些地方要写原生」不是 RN 的短板，是它本来的分工</b></p>

<!--
所以要不要因此否定 RN？不。RN 官方从一开始就留了这条通道：你写一个原生模块，把它挂回 JS 那边当普通接口用。绝大部分工作量——列表、表单、详情页、业务流程——仍然在 JS 这一侧；真正需要下沉的是那几块热点。所以「有些地方还得写原生」不是 RN 的短板，是它设计里本来就有的分工。这一点在汇报里很关键：你不是在说「RN 不行所以要补原生」，你是在说「RN 的边界在哪里，边界外该怎么接」。
-->

## 有几类 App，从一开始就不该选 RN

<div class="dg" style="flex-direction:column;gap:.6rem">
  <div class="drow" style="align-items:center">
    <div class="dbox" style="min-width:13rem">游戏 · 重 3D 图形</div>
    <span class="darr">→</span>
    <div class="dbox js" style="min-width:9rem">Unity / Unreal</div>
  </div>
  <div class="drow" style="align-items:center">
    <div class="dbox" style="min-width:13rem">榨干性能的专业工具</div>
    <span class="darr">→</span>
    <div class="dbox nat" style="min-width:9rem">纯原生</div>
  </div>
  <div class="drow" style="align-items:center">
    <div class="dbox" style="min-width:13rem">主体全在系统深水区</div>
    <span class="darr">→</span>
    <div class="dbox nat" style="min-width:9rem">纯原生</div>
  </div>
</div>

<!--
反面清单：游戏和重 3D，渲染管线就是产品，去用 Unity；榨干性能的工具，整个 App 都是热点，RN 层没剩什么；主体全在深水区，同理。判断标准就是上页那张图的面积比——业务界面占大头才选 RN，我们是典型前者。
-->

---

## RN 的社区生态：从大厂主力 App 到国内自研基建

<div class="dg" style="flex-direction:column;gap:.7rem;zoom:.96">
  <div class="drow" style="gap:.7rem;align-items:center">
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><logos-facebook style="width:1.7rem;height:1.7rem" /><small style="font-size:.68rem">Meta<br>Facebook · Instagram</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><logos-microsoft-icon style="width:1.7rem;height:1.7rem" /><small style="font-size:.68rem">微软<br>Office · Outlook · Teams</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><simple-icons-amazon style="width:1.7rem;height:1.7rem;color:#ff9900" /><small style="font-size:.68rem">Amazon<br>Shopping · Alexa · Kindle</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><logos-shopify style="width:1.7rem;height:1.7rem" /><small style="font-size:.68rem">Shopify<br>移动端整体</small></div>
  </div>
  <div class="drow" style="gap:.7rem;align-items:center">
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><logos-discord-icon style="width:1.7rem;height:1.7rem" /><small style="font-size:.68rem">Discord</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><simple-icons-coinbase style="width:1.7rem;height:1.7rem;color:#0052ff" /><small style="font-size:.68rem">Coinbase</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><simple-icons-wix style="width:1.7rem;height:1.7rem;color:#0c6efc" /><small style="font-size:.68rem">Wix</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><img src="./images/jd.jpg" style="width:1.7rem;height:1.7rem;border-radius:5px;display:inline-block" /><small style="font-size:.68rem">京东 · JDReact</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><span style="display:inline-flex;align-items:center;justify-content:center;width:1.7rem;height:1.7rem;background:#ffd100;border-radius:5px"><simple-icons-meituan style="width:1.2rem;height:1.2rem;color:#222" /></span><small style="font-size:.68rem">美团 · MRN</small></div>
    <div class="dbox" style="background:#fff;min-width:7.2rem;padding:.65rem .8rem"><simple-icons-tripdotcom style="width:1.7rem;height:1.7rem;color:#287dfa" /><small style="font-size:.68rem">携程 · CRN</small></div>
  </div>
</div>

<p class="dnote">名单来自 React Native 官方 showcase 与各家公开的技术博客<br><b style="color:#17324d">生态足够厚：遇到问题，大概率别人已经踩过并写下来了</b></p>

<!--
最后看生态。上面这排是把 RN 用在主力 App 上的：Meta 自己的 Facebook 和 Instagram；微软的 Office、Outlook、Teams，微软同时还维护着 RN 的 Windows 和 macOS 版本；Amazon 的购物、Alexa、Kindle；Shopify 的移动端是整体建在 RN 上的。下面这排，Discord、Coinbase、Wix 都是主 App 在用；国内京东、美团、携程各自做了一套 RN 基建——JDReact、MRN、CRN，愿意投这么重的基建，说明在极端体量下扛得住。这里顺带说清一个问题：他们走自研，是因为存量嵌入加极端体量；像我们这样从零开始的新项目，官方推荐路径就是 Expo，不冲突。生态这件事对我们的实际意义是：遇到坑的时候，大概率别人已经踩过，而且写下来了。
-->
---
layout: center
class: text-center
---

## 小结：这套方案，一句话说清每一层

<div class="dg" style="flex-direction:column;gap:.6rem;margin-top:1.4rem;font-size:.82rem">
  <div class="drow" style="align-items:center"><div class="dbox" style="min-width:13rem">界面由谁画</div><span class="darr" style="display:flex;align-items:center">→</span><div class="dbox nat" style="min-width:14rem">系统原生控件</div></div>
  <div class="drow" style="align-items:center"><div class="dbox" style="min-width:13rem">业务逻辑写在哪</div><span class="darr" style="display:flex;align-items:center">→</span><div class="dbox js" style="min-width:14rem">JS，两端一套代码</div></div>
  <div class="drow" style="align-items:center"><div class="dbox" style="min-width:13rem">两个原生工程谁维护</div><span class="darr" style="display:flex;align-items:center">→</span><div class="dbox rn" style="min-width:14rem">Expo 生成，不用人养</div></div>
  <div class="drow" style="align-items:center"><div class="dbox" style="min-width:13rem">发版还要不要等审核</div><span class="darr" style="display:flex;align-items:center">→</span><div class="dbox rn" style="min-width:14rem">改 JS 热更，改原生才过审</div></div>
  <div class="drow" style="align-items:center"><div class="dbox" style="min-width:13rem">RN 够不着的地方</div><span class="darr" style="display:flex;align-items:center">→</span><div class="dbox rn" style="min-width:14rem">下沉原生，再挂回来用</div></div>
</div>

<!--
最后把整套方案捋一遍，五行。界面由谁画——系统原生控件，不是网页。业务逻辑写在哪——JS，两端共用一套代码。两个原生工程谁维护——Expo 按配置生成，不用人养。发版还要不要等审核——改 JS 的部分热更就行，只有动了原生才走商店，第一章欠的那笔节奏账，在这里还上了一半。RN 够不着的地方怎么办——下沉成原生模块，再挂回来当普通接口用，这不是妥协，是它设计里就有的分工。一句话收尾：用一支前端团队驾驭得了的一套代码，交付接近原生的体验，同时保住接近 Web 的开发效率。
-->

---
layout: section
---

# 谢谢

<p style="text-align:center;margin-top:1.2rem;font-size:1.02rem;color:#c7d2e5;line-height:1.9">
一套代码，接近原生的体验，接近 Web 的效率<br>
<span style="font-size:.9em;opacity:.85">欢迎提问 · 演示和源码都在仓库里</span>
</p>

<!--
到这里就讲完了，谢谢大家。演示和这份幻灯片的源码都在仓库里，可以自己跑。有什么问题现在可以问。
-->
