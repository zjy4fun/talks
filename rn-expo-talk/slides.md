---
theme: seriph
title: 为什么我们用 React Native + Expo 做移动端
titleTemplate: '%s'
lang: zh-CN
class: text-center
transition: slide-left
mdc: true
---

# 为什么我们用 React Native + Expo 做移动端

移动端技术选型：原理与取舍

<!--
大家好，今天这场分享不教大家写代码，讲的是一个选型问题：移动端为什么选 React Native 加 Expo，而不是 H5，也不是纯原生。重点放在原理上——听完之后你不一定会写 RN，但你会知道它到底是怎么把界面画出来的，边界在哪，为什么这是个合理的选择。前端、后端、测试的同学都能跟上，我尽量少用行话，用到的地方都会现场解释。正文四十五分钟左右，最后留五分钟提问。
-->

---

## 今天的六章，串成一条论证链

<div class="dg" style="flex-wrap:wrap;max-width:38rem;margin:3rem auto 0">
  <span class="dbox">问题的本质</span><span class="darr">→</span>
  <span class="dbox js">H5 的天花板</span><span class="darr">→</span>
  <span class="dbox nat">原生的成本</span><span class="darr">→</span>
  <span class="dbox rn">RN 的原理</span><span class="darr">→</span>
  <span class="dbox rn">Expo 的价值</span><span class="darr">→</span>
  <span class="dbox">RN 的边界</span>
</div>

<!--
路线很简单。先把问题本身定义清楚——移动端开发到底难在哪。然后依次排除两个方案：H5 为什么不够，纯原生为什么太贵。中间最重的一章讲 RN 的原理——它凭什么两头占便宜。再讲 Expo 解决了 RN 的哪些工程麻烦。最后讲边界：RN 不是银弹，哪些地方仍然要原生上，这一章技术负责人们应该会最感兴趣。每一章都建立在前一章的结论上，中途走神了也没关系，每章结尾我会收一句结论。
-->

---
layout: section
---

# 一套业务，要同时进入两个封闭生态

<!--
先看我们面对的局面。做一个 App，天然面对两个平台：iOS 那边是 Swift 加 UIKit 或 SwiftUI，上架要过 App Store 审核；Android 是 Kotlin 加自己的框架，国内还有各家应用商店。这两个生态互相不认对方的代码。而业务从来只有一套——同一个功能、同一份设计稿，要在两边都跑起来，还要求每周都能往前走。这三件事凑在一起，就是移动端所有技术选型的出发点：怎么用最少的人，把一套业务塞进两个封闭生态，还不拖慢迭代速度。
-->

---

## 所有界面技术都在回答同样两个问题

<div class="dg" style="flex-direction:column;gap:1rem;margin-top:2.5rem">
  <div class="dbox" style="min-width:24rem"><b>① UI 由谁渲染</b><small>系统原生控件，还是网页引擎</small></div>
  <div class="dbox" style="min-width:24rem"><b>② 逻辑跑在哪个运行时</b><small>原生运行时，还是 JS 运行时</small></div>
</div>

<!--
界面技术五花八门，但剥开壳，每一种都在回答两个问题。第一个：屏幕上的按钮、列表、文字，是谁画出来的？是操作系统提供的原生控件，还是浏览器那套网页渲染引擎？第二个：你的业务逻辑跑在哪？是编译成机器码直接跑在系统上，还是跑在一个 JS 引擎里？这两个问题的答案一组合，市面上所有方案就都能放进同一张图里。记住这个框架，今天每一章我们都拿它来定位。
-->

---

## 三条路线在这个坐标系里各占一角

<div class="dg">
  <div style="position:relative;width:560px;height:310px">
    <div style="position:absolute;left:70px;top:6px;bottom:34px;border-left:2px solid #9ca3af"></div>
    <div style="position:absolute;left:70px;right:6px;bottom:34px;border-bottom:2px solid #9ca3af"></div>
    <div style="position:absolute;left:0;top:10px;width:64px;text-align:right;font-size:.68rem;color:#6b7280">UI：<br>系统控件</div>
    <div style="position:absolute;left:0;bottom:40px;width:64px;text-align:right;font-size:.68rem;color:#6b7280">UI：<br>网页引擎</div>
    <div style="position:absolute;left:90px;bottom:0;font-size:.68rem;color:#6b7280">逻辑：JS 运行时</div>
    <div style="position:absolute;right:6px;bottom:0;font-size:.68rem;color:#6b7280">逻辑：原生运行时</div>
    <div class="dbox rn" style="position:absolute;left:110px;top:30px"><b>React Native</b><small>系统控件 · JS 逻辑</small></div>
    <div class="dbox nat" style="position:absolute;right:30px;top:30px"><b>纯原生</b><small>系统控件 · 原生逻辑</small></div>
    <div class="dbox js" style="position:absolute;left:110px;bottom:60px"><b>H5 / WebView</b><small>网页引擎 · JS 逻辑</small></div>
  </div>
</div>

<!--
把两个问题画成坐标系：纵轴是 UI 谁来画，横轴是逻辑跑在哪。纯原生在右上角，两个答案都选原生，体验天花板，代价第三章算账。H5 在左下角，两个都选网页那套，成本最低，天花板下一章推导。有意思的是左上角的 React Native：UI 用系统控件，逻辑却用 JS——它明摆着是想两头占便宜的。今天整场其实就在论证一件事：这个"两头占"到底是不是真的成立，代价是什么。
-->

---
layout: center
class: text-center
---

## RN 用 JS 描述界面，渲染出来的是<span style="color:#047857">真原生控件</span>

<!--
今天只要记住一句话就够本了，就是屏幕上这句。很多人听到"用 JS 写 App"，第一反应是"那不就是网页套壳吗"——不是，这正是今天要拆掉的最大误解。RN 里没有网页：屏幕上每一个按钮、每一行文字，都是货真价实的 iOS、Android 原生控件，JS 只是那个发号施令的人。这句话现在听着有点玄，第四章我会把它拆开，一步步证明给你看，最后还会用系统的调试工具现场验货。
-->

---
layout: section
---

# H5 的优点真实存在

<!--
第二章说 H5。我知道很多人对 H5 App 的印象就是"卡、假、体验差"，但公平起见，先把它的好处说足——因为这些好处是实打实省钱的，也是它至今仍被大量使用的原因。把优点看清楚了，我们才能准确说出它输在哪。
-->

---

## 一套代码两端运行，发版不经过商店

真跨平台：一份代码，iOS、Android、浏览器、小程序容器全都认。

发版零成本：服务器一部署，用户下次打开就是新版——不经过任何商店审核。

<!--
H5 的第一个优点是真正的跨平台。写一份网页代码，iOS 能跑、Android 能跑、电脑浏览器能跑，嵌到小程序容器里也能跑——这是今天讲到的所有方案里唯一做到"真·一份代码"的。第二个优点更狠：发版零成本。改完代码往服务器一部署，所有用户下次打开就是新版本。没有审核、没有等待、没有"用户不肯升级"这回事。对运营活动这种今天上线、下周就下线的东西，这是碾压性优势。那么问题来了：优点这么大，为什么主流 App 的主体都不是 H5？答案得从渲染链路里找。
-->

---

## H5 的界面一变，就要重走浏览器渲染管线

```mermaid {scale: 0.62}
flowchart LR
  A[HTML / CSS / JS] --> B[解析]
  B --> C[DOM / 样式树]
  C --> D[渲染树]
  D --> E[布局]
  E --> F[绘制]
  F --> G[合成上屏]
```

<p class="dnote">WebView = 嵌在 App 里的浏览器；页面每次变化，都要重走相应环节</p>

<!--
先解释一个词：WebView，就是嵌在 App 里的浏览器内核，只是没有地址栏。所以"H5 App"的真身，是一个原生窗口里嵌了个浏览器。浏览器拿到 HTML、CSS、JS 后是这么干活的：先解析成 DOM 树和样式树——把文本变成结构化数据；两棵树合成渲染树；然后布局，算出每个元素多大、在哪；再绘制成像素；最后合成上屏。这条流水线是为"渲染任意网页"设计的，极其通用，也极其长。页面上任何东西一变，变化的部分就要重走相应环节。通用性的代价，就是每一步都有开销——这是 H5 体验的天花板所在。
-->

---

## 一帧的预算只有 16.7 毫秒

屏幕一秒刷 60 次，每帧只有 16.7ms；管线任何一步超时，这帧就丢了——肉眼看到的就是卡顿。

浏览器里，JS 和页面渲染还共用一个主线程。

<!--
量化一下"卡"。现在的屏幕一秒刷新 60 次起步，也就是说每一帧只有十六点七毫秒的预算。刚才那条管线的所有环节，加上你的 JS 逻辑，都要塞进这个预算里；任何一步超时，这一帧就丢了；连续丢几帧，肉眼看到的就是卡顿。更麻烦的是浏览器里 JS 和渲染在同一个主线程上打架：一段 JS 跑久了，页面就干等着。桌面电脑性能有富余，感觉不明显；手机芯片弱、还要省电控热，这条长管线就经常踩线。所以"网页在手机上卡"是有物理来源的，不是前端同学不努力。
-->

---

## 系统自带的交互体验，H5 只能用 JS 模拟

下拉刷新、嵌套滚动这类复杂滚动交互、键盘的避让、转场的手势跟随——原生开发系统白送。

H5 拿不到，只能用 JS 模拟；模拟得再像，也差一口气。

<!--
第二个差距来源更隐蔽。你在原生 App 里划一下列表，那个惯性滚动、到底时的回弹，是操作系统写好的物理引擎在系统层跑的，稳定流畅。H5 里整页滚动系统也管，但交互一复杂——下拉刷新、嵌套滚动、横滑卡片——就得 JS 自己算动量、自己模拟回弹，稍有闪失就露馅。键盘也是：原生输入框，键盘弹起来页面自动避让；WebView 里键盘遮住输入框是经典 bug 现场。还有 iOS 从屏幕边缘右滑返回的手势，那个跟手的感觉，H5 模拟出来总是慢半拍。这些体验是系统白送给原生控件的，H5 一样都拿不到，只能仿。用户说不出所以然，但一上手就觉得"这不像个 App"——差的就是这口气。
-->

---

## WebView 是一个沙箱，系统能力都在沙箱之外

浏览器的安全模型不信任网页：摄像头、推送、蓝牙、文件系统——碰不到，或只给受限版本。

所以，纯 H5 的 App 根本不存在。

<!--
体验之外还有一堵更硬的墙：能力边界。浏览器的安全模型天生不信任网页——你随手点开一个网站，它凭什么碰你的摄像头和通讯录？所以网页被关在沙箱里，扫码、推送、蓝牙、读写文件，要么做不了，要么只有严重受限的版本。但一个正经 App 恰恰离不开这些：扫码要摄像头，召回用户要推送。结论就一句：你见过的所有"H5 App"，只要它能扫码、能收推送，它就一定不是纯 H5——原生代码一定在场，只是你没看见。这就引出了它的真实形态：Hybrid。
-->

---

## 所谓的「H5 App」，实际都是 Hybrid

<div class="dg">
  <div class="dbox nat" style="padding:.8rem 1rem">
    <b style="margin-bottom:.5rem">原生壳</b>
    <div class="drow" style="margin-top:.5rem;align-items:center">
      <div class="dbox js"><b>WebView</b><small>H5 页面 + JS</small></div>
      <div class="dcol" style="align-items:center;gap:2px">
        <div style="font-size:.66rem;color:#6b7280">JSBridge</div>
        <div class="dbox" style="padding:.25rem .5rem;font-size:.66rem">异步 · 字符串 · 无类型</div>
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
Hybrid 的结构是这样：外面一层原生壳，负责窗口、导航和所有系统能力；里面 WebView 跑 H5 页面；中间一条叫 JSBridge 的通道，网页通过它向原生喊话："帮我打开摄像头"。国内大量 App 都是这个形态。听起来是个不错的折中？注意桥上那三个标签。异步——喊完话不能马上拿结果，要等回调；字符串——所有参数序列化成字符串传来传去；无类型——两边接口全靠口头约定，编译器完全帮不上忙，一边改了另一边不知道，上线才炸。这三个标签，下一页会变成实打实的工作量。
-->

---

## Hybrid 并没有省掉原生开发

每加一个能力：原生写实现 → 注册到桥 → JS 封装调用 → 两端联调。

iOS 和 Android，各来一遍。

<!--
关键问题：这套架构省掉原生开发了吗？没有。每加一个原生能力，流程是固定的：先用原生代码把功能实现出来，注册到桥上；JS 这边再封装一层调用；然后两头联调，对着那些没有类型的字符串参数抓虫。而且 iOS 和 Android 的桥实现不一样，这套流程要各来一遍。所以 Hybrid 团队的真实配置是：前端写页面，原生工程师维护壳和桥——一个都不能少。原生开发没有被省掉，只是挪了个位置，还搭进去一条越来越宽的桥要维护。论证到这里就可以收了：Hybrid 是个务实的折中，但它没有解决"两个生态两套人"的根本问题。
-->

---

## H5 适合嵌入页面，不适合承担 App 主体

运营页、活动页、帮助中心——嵌 H5，天天改也不用发版，完美。

首页、核心流程、高频交互的主体验——不该是 H5。

<!--
第二章收尾，H5 没有被判死刑，结论是分工。低频、重展示、改动频繁的页面，交给 H5：运营活动页今天上明天改，发版零成本的优势用在刀刃上，体验差一点用户也就看一眼。但 App 的主骨架——首页、核心业务流程、用户每天摸几十次的高频界面——渲染管线的开销、模拟不出来的手感、隔着桥的能力调用，这三座山决定了主体验不该是 H5。那纯原生行不行？体验和能力都是天花板，答案看起来很美，下一章我们算算账。
-->

---
layout: section
---

# 同一个功能，永远要写两遍

<!--
第三章说纯原生，这章短，因为问题不复杂——不是技术问题，是经济问题。纯原生的体验和能力都是天花板级的，这没有争议；有争议的是它的账。
-->

---

## 双份代码、双份团队、双份测试，还会互相漂移

Swift 写一遍，Kotlin 再写一遍；两套技能栈分别招聘维护；QA 两端各回归一遍。

两边各自实现，行为必然漂移——"iOS 有这个功能，Android 怎么没有？"

<!--
同一个需求，iOS 用 Swift 写一遍，Android 用 Kotlin 再写一遍。这不是简单的工作量乘二：是两拨工程师、两套技术栈的招聘和知识维护、测试在两个平台各回归一遍。还有一个更烦的隐性成本叫对齐漂移：两边各自实现，细节必然长歪——同一个按钮，两端行为差一点；产品经理某天发现 iOS 上有个功能 Android 没有，再补排期。人力乘二，速度除二，还要专门花精力保持两边一致。这是第一笔账。
-->

---

## 改一行代码，也要等商店审核

打包 → 提审（iOS 通常 1~3 天）→ 放量 → 等用户升级。

线上出个小 bug，响应速度是"天"级别的。

<!--
第二笔账更要命：迭代节奏被商店锁死。Web 时代修个 bug 什么体验？合码、部署，几分钟后全世界都是新版。原生呢？打包、提交商店审核——iOS 通常一到三天，被拒了改完重新排队；审核过了分批放量，还得等用户升级，老版本会活很久很久。所以原生团队都是攒版本的：两周一趟班车，赶不上就等下一趟。线上出了 bug，最快的响应也是天级别。对需要快速试错的业务来说，这个节奏是真的痛——记住这个「天」级别的基线，第五章会回头拿它做对照。
-->

---

## 我们想要的是：原生的体验，Web 的迭代速度

体验上：真原生控件。成本上：一套代码。节奏上：最好还能像 Web 一样随时发布。

这张需求清单，引出了 React Native。

<!--
把前两章的结论摆到一起，需求清单自己就浮出来了：体验要原生的——真控件、真手感；成本要 Web 的——一套代码一拨人；节奏最好也是 Web 的——别把命脉押在商店审核上。听起来像"既要又要还要"对吧？React Native 的设计目标就是这张清单。UI 用真原生控件，体验拉满；逻辑用 JS 写一套，成本砍半；至于"随时发布"，JS 有个天然特性让它成为可能——这个伏笔按住不表，第五章揭晓。下一章先看前两条凭什么成立。
-->

---
layout: section
---

# React 只负责计算界面，不负责渲染

<!--
第四章，全场最重的一章。讲 RN 之前得先把 React 本身说清楚——后端和测试的同学，给我一分钟就够，前端同学可以趁机喝口水。
-->

---

## React 的输出不是画面，是一份最小差异清单

你声明"数据是这样时，界面该长那样"；数据变了，React 重算并对比出最小差异集。

到这一步为止，全是内存里的计算。真正"画"，是下游渲染后端的事。

<!--
React 是一个"描述界面"的库。你不用告诉它每一步怎么改界面，你只声明：数据是这个样子的时候，界面应该长成那个样子。数据一变，React 把新旧两版描述对比一下，算出一个最小差异集——"这行文字变了、那个按钮没变"——这个过程叫 diff。请注意一个关键事实：到这一步为止，React 做的全部是内存里的计算，一个像素都没有画。把差异真正落到屏幕上，是下游一个叫"渲染后端"的角色干的。计算和绘制是分离的——这个设计就是 RN 全部魔法的钥匙：绘制这一端，是可以整个换掉的。
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
这张图就是 RN 的基本模型。左边是大家熟悉的网页：React 算出 diff，ReactDOM 把 diff 落地成 DOM 节点，浏览器负责渲染。右边，把 ReactDOM 换成 React Native：同样的 diff，落地动作变成了给原生侧发指令——"创建一个 UIView""把这段文字改了"。屏幕上出现的，是操作系统亲手渲染的原生控件。整条链路里没有 DOM、没有网页、没有 WebView。回到锚点句——用 JS 描述界面，渲染出来的是真原生控件——现在这句话有画面了。顺带一提：上层都是 React，所以前端同学的组件、状态管理这些经验直接平移，这是它对前端团队友好的根本原因。
-->

---

## 前端写的 flex 布局，由 C++ 引擎 Yoga 计算

原生控件不认识 CSS。RN 内置 Yoga：用 C++ 重新实现的 Flexbox 布局引擎。

前端写惯的 flexDirection、justifyContent，原样生效，两端行为一致。

<!--
有个细节值得单独一页：布局。网页排版靠 CSS，原生控件可不认识 CSS，那界面元素的位置大小谁来算？RN 的答案叫 Yoga——用 C++ 把前端 Flexbox 那套布局算法重新实现了一遍，内嵌在 RN 里。所以前端同学写惯的 flex 布局，到 RN 里原样能写，行为和网页基本一致。两个好处：C++ 意味着算得快；更重要的是 iOS 和 Android 跑的是同一份布局实现，排出来的结果完全一致，不存在两端各排各的。前端的肌肉记忆，就这样被原封不动搬进了原生世界。
-->

---

## 老架构里，三个线程隔着一座异步桥

<div class="dg" style="gap:1.2rem">
  <div class="dbox js" style="align-self:center"><b>JS 线程</b><small>业务代码 · diff</small></div>
  <div class="dcol" style="align-items:center;gap:2px">
    <div class="dbox" style="border-radius:999px;padding:.3rem .8rem;font-size:.68rem">JSON 序列化 · 异步 · 攒批发送</div>
    <div class="drow" style="gap:2.2rem">
      <div style="width:6px;height:14px;background:#9ca3af;border-radius:2px"></div>
      <div style="width:6px;height:14px;background:#9ca3af;border-radius:2px"></div>
    </div>
    <div style="font-size:.7rem;color:#6b7280">桥（Bridge）</div>
  </div>
  <div class="dcol">
    <div class="dbox"><b>Shadow 线程</b><small>Yoga 算布局</small></div>
    <div class="dbox nat"><b>UI 主线程</b><small>创建控件 · 上屏</small></div>
  </div>
</div>

<!--
那 JS 的指令是怎么送到原生侧的？这里要分老架构和新架构讲——先讲老的，因为它解释了江湖上"RN 卡"的传闻是哪来的。老架构里 RN 有三个主要线程：JS 线程跑你的业务代码和 diff；Shadow 线程拿着 Yoga 算布局；UI 主线程干真正的活——创建控件、上屏。关键在中间那座桥：JS 和原生是两个世界，老架构里它们唯一的沟通方式是隔着桥传消息，而且规矩很怪——所有数据先序列化成 JSON 字符串、全部异步、还要攒一批一起发。低频操作没问题；但大家想想，每一次 JS 和原生的对话都要打包、排队、解包，这在什么场景下会出事？
-->

---

## 桥上全是序列化消息，高频交互会拥堵

手指拖拽：触摸事件过桥给 JS → JS 算新位置 → 过桥回原生，每秒几十个来回。

桥一堵，画面跟不上手指——这就是老 RN"卡"的技术根源。

<!--
答案是高频交互。举个例子，手指跟随的拖拽动画：触摸事件在原生侧产生，过桥送给 JS；JS 算出元素新位置，再过桥送回原生侧执行。每秒几十次往返，每一次都要 JSON 序列化、异步排队。桥一堵，画面就跟不上手指，用户看到的就是拖起来一顿一顿——这就是早年 RN 被吐槽"卡"的技术根源，不是玄学，就是这座桥的物理瓶颈。社区当年的对策也很直白：能不过桥就不过桥，比如把整段动画声明好，一次性丢给原生侧自己跑。但这是绕，不是解。Meta 后来决定动手术，把桥整个拆了。
-->

---

## 新架构移除了桥，换成直通的 JSI

<div class="dg" style="gap:1.2rem">
  <div class="dbox js" style="align-self:center"><b>JS 线程</b><small>业务代码 · diff</small></div>
  <div class="dcol" style="align-items:center;gap:2px">
    <div class="dbox rn" style="border-radius:999px;padding:.3rem .9rem"><b style="font-size:.78rem">JSI</b><small>同步调用 · 零序列化</small></div>
    <div style="font-size:.7rem;color:#6b7280">JS 直接持有 C++ 对象引用</div>
  </div>
  <div class="dcol">
    <div class="dbox rn"><b>Fabric</b><small>新渲染器</small></div>
    <div class="dbox rn"><b>TurboModules</b><small>原生模块按需加载</small></div>
    <div class="dbox nat"><b>UI 主线程</b><small>控件上屏</small></div>
  </div>
</div>

<p class="dnote">RN 0.76 起（2024 年 10 月），新架构默认开启</p>

<!--
手术的核心叫 JSI——JavaScript Interface。一句话说清：以前 JS 和原生只能隔桥喊话，现在 JS 可以直接握着一个 C++ 对象的引用，像调普通函数一样同步调用它——不序列化、不排队、不等回调。这张图和上一张故意画成同一个结构，就是让大家看清变化：中间那座桥没了，换成一条直通的接口层。在 JSI 之上，渲染器整个重写了，叫 Fabric，渲染流程可同步可中断；原生模块系统也重写了，叫 TurboModules，用到哪个模块才加载哪个，启动更轻。重点是时间点：从 0.76 版本开始，新架构是默认配置——2024 年 10 月的事。所以"RN 卡"的老印象，对应的是那座已经被拆掉的桥。
-->

---

## Hermes 把 JS 提前编译成字节码

普通引擎：用户打开 App 时，现场解析、编译 JS——这段时间就是白屏。

Hermes：构建时预编译成字节码打进安装包，启动即执行。启动快，内存省。

<!--
还有一块拼图：JS 引擎本身。RN 默认用的不是浏览器里那种引擎，而是 Meta 专门为移动端造的 Hermes。它最重要的设计是：一般的 JS 引擎，要在用户打开 App 的那一刻现场解析、现场编译你的代码——用户盯着的那几秒白屏，有一部分就耗在这。Hermes 把这一步整个挪到了构建时：发布的时候，JS 已经编译成字节码打进安装包了，启动时加载即执行，跳过现场编译。启动时间和内存占用都明显下降。这件事说明一个态度：RN 的 JS 运行时是为"手机上的 App"量身定做的，不是把网页那套原样搬过来凑合。
-->

---

## 视图树是最直接的证据：里面没有一个 div

Xcode 的 View Hierarchy、Android 的 Layout Inspector——把运行中 App 的真实视图层级掀开。

RN 页面里：没有一个 div，全是原生控件。

<!--
讲了一章原理，来点实证——这也顺便给在座测试同学安利个工具。iOS 的 Xcode 和 Android Studio 都有官方调试器，能把一个正在运行的 App 的视图层级整个掀开，看到系统眼里这个界面到底由什么组成。（现场演示，控制在两分钟内）大家看这个 RN 页面：一层一层展开，RCTViewComponentView、RCTParagraphComponentView——名字带 RCT 前缀，但它们都是货真价实的 UIView 子类，跟隔壁纯原生 App 里的控件同属一套视图体系；Android 那边用 Layout Inspector 看，ReactTextView 的本体就是系统的 TextView。里面找不到一个 div。（演示前在自己的 demo 里核对一遍实际类名——老架构下显示的是 RCTView、RCTText。）对比着看，要是掀开一个 Hybrid App，你会看到一个大大的 WebView 节点杵在那，网页内容对系统来说就是一张不透明的画布。眼见为实：RN 渲染出来的，就是原生控件。
-->

---

## 小结：JS 负责决定，原生负责呈现

React 在 JS 里算出"界面怎么变"→ JSI 同步送达原生侧 → Yoga 定位置 → 系统控件上屏。

体验是原生的，开发是 JS 的——两头占便宜，原理上成立。

<!--
第四章收束，整条链路串一遍：你的业务代码和 React 的 diff 跑在 JS 里——"决定"是 JS 做的；指令通过 JSI 同步到达原生侧；Yoga 算好位置；真正的系统控件完成"呈现"。所以体验这头拿到了原生，开发这头拿到了 JS 和一套代码——第三章那张需求清单的前两条，原理上都兑现了。但是，写过工程的同学都知道，"原理成立"和"生产可用"之间隔着一堆没人爱干的脏活：RN 项目里躺着的 iOS、Android 两个原生工程谁来维护？原生依赖怎么管？iOS 的包在哪打？这些问题的答案不在 RN 里——在 Expo 里。下一章。
-->

---
layout: section
---

# 官方建议通过框架使用 RN，Expo 是首选

Expo 之于 RN，相当于 Next.js 之于 React

<!--
第五章讲 Expo。先定位：RN 官网现在的入门指南，已经不把从零裸建当默认路径了——裸建被挪进单独的 Without a Framework 页面，首页开篇就建议通过框架来用 RN，而且点名推荐 Expo。这个关系用前端生态类比最好懂：React 本身只管渲染，路由、构建、部署这些工程问题由 Next.js 这类框架兜底；同样，RN 只管"JS 渲染原生 UI"这一件事，围绕它的所有工程化，就是 Expo 的地盘。那"裸用 RN"到底会遇到什么，值得官方专门劝退？下一页列清单。
-->

---

## 直接使用 RN，就要自己维护两个原生工程

仓库里躺着完整的 Xcode 工程和 Gradle 工程，从生成那天起就归你养。

装原生库要改 Podfile / Gradle；RN 升级要手动 merge 模板 diff；打 iOS 包必须有 Mac。

<!--
裸 RN 项目初始化完，仓库里除了 JS 代码，还有一个完整的 iOS 工程和一个完整的 Android 工程。这两个工程从生成那天起就是你的资产——或者说债务：装一个带原生代码的库，得进 Podfile、Gradle 手改配置；RN 每次升级，官方的原生模板变了，你要对着 diff 把自己工程里的改动手动搬一遍，搬错一处就是各种玄学编译失败——这活儿没人想干两遍；打 iOS 的包必须有台 Mac，CI 上还得伺候证书和签名。算下来，团队里得有人半职专门伺候这两个工程。可我们当初选 RN，图的不就是不养原生团队吗？这个矛盾，Expo 用三层方案挨个拆掉。
-->

---

## Expo SDK 解决了原生模块的版本兼容问题

相机、推送、定位、文件系统……几十个常用原生模块，Expo 官方维护。

随 SDK 版本整体配套测试——版本兼容有人替你保证。

<!--
第一层最朴素：Expo 把 App 最常用的几十种原生能力——相机、推送、定位、文件系统、传感器——做成了官方维护的模块库，叫 Expo SDK。它解决的痛点是版本兼容：社区原生库质量参差不齐，A 库要求新版 RN，B 库还没适配，凑在一个项目里编译报错，一查一下午。Expo 的做法是把这几十个模块和特定 RN 版本捆成一个 SDK 版本，整体测试通过才发布。你的升级动作变成了"从 SDK 52 升到 53"，里面的兼容性有人兜底。听起来不性感，但省下来的全是真实工时。
-->

---

## 原生工程是生成产物，不是手写资产

```mermaid {scale: 0.9}
flowchart LR
  A[app.json<br>+ config plugins] --> B[npx expo prebuild]
  B --> C[ios/ 工程]
  B --> D[android/ 工程]
  C --> E[构建出包]
  D --> E
```

<p class="dnote">CNG：原生目录不进仓库、不手改——脏了就删掉重新生成</p>

<!--
第二层是 Expo 最核心的设计，叫 CNG——持续原生生成。刚才说裸 RN 的债务是那两个原生工程，Expo 的解法是釜底抽薪：这两个目录根本就不该由人来维护。你的仓库里只有 JS 代码和一份 app.json 配置文件——App 叫什么、图标是什么、要什么权限，全部声明在这一份文件里。需要原生工程的时候，跑一下 prebuild 命令，机器按照配置现场生成 ios 和 android 两个目录。它们的地位等同于编译产物：不进版本库、不手改，觉得脏了删掉重新生成就是。想想刚才那个升级噩梦：RN 升级要手动 merge 原生模板？现在变成用新模板重新生成一遍——那个活儿直接消失了。
-->

---

## 改原生配置，也只需要改 app.json

库需要动原生配置？它自带 config plugin：在 app.json 里声明，prebuild 时自动注入。

你不用打开 Xcode，甚至不用知道 Info.plist 是什么。

<!--
听到这肯定有人问：要装的库需要改原生配置怎么办？比如相机库，要求在 iOS 的配置文件里写一句权限用途说明——这不还是得开 Xcode？不用。Expo 的机制叫 config plugin：库的作者把"我需要哪些原生改动"写成一个插件随库发布，你在 app.json 里声明用这个库，prebuild 生成原生工程时，插件自动把该注入的配置注入进去。整个过程你不用打开 Xcode，甚至不用知道 Info.plist 是个什么文件。原生配置从"手改神秘文件"变成了"声明式描述"——跟前端同学管 npm 依赖是同一个心智模型。
-->

---

## 构建和签名交给云端，打 iOS 包不再需要 Mac

EAS Build：一行命令推上云端，云端 Mac 替你生成工程、编译、签名。

产物直接可提审；证书托管，团队里没有"唯一能打包的那台电脑"。

<!--
第三层：打包。前面说裸 RN 打 iOS 包必须有 Mac，而且证书、描述文件那套签名体系，谁配谁知道有多折磨。EAS 是 Expo 的云构建服务：一行命令把代码推上去，云端的 Mac 替你跑 prebuild、编译、签名，吐出一个能直接提交商店的安装包。签名证书也托管在云端，不用再传阅"那台唯一能打包的 Mac"。CI/CD 的对接也是现成的。这是商业服务，有免费额度，生产强度的构建要付费——但对比自己维护打包机、签名体系和一个懂这些的人，这笔账很好算。到这里，裸 RN 的三大麻烦都有了着落——还剩最后一个大招：把第三章埋的伏笔收回来。
-->

---

## App = 原生壳 + JS 包，两条独立的版本线

<div class="dg" style="gap:2rem">
  <div class="dbox" style="padding:.8rem 1rem">
    <b style="margin-bottom:.4rem">手机上的 App</b>
    <div class="dcol" style="margin-top:.5rem">
      <div class="dbox nat"><b>原生壳 v3</b><small>控件 · 模块 · JS 引擎 —— 走商店审核</small></div>
      <div class="dbox js"><b>JS bundle v7</b><small>业务逻辑 + 界面描述 —— 只是个文件</small></div>
    </div>
  </div>
</div>

<!--
现在揭第三章的伏笔——"像 Web 一样随时发布"凭什么可能。想想 RN App 的安装包里都有什么：一部分是原生壳——所有原生控件、原生模块、Hermes 引擎，这部分是编译出来的机器码，必须走商店；另一部分是 JS bundle——你的业务代码打包编译后的产物，壳启动之后加载它执行。注意一个事实：改业务逻辑、改界面样式，动的只是 bundle；而 bundle 本质上就是一个文件。文件——是可以从服务器下载的。所以 App 其实有两条版本线：壳的版本走商店，bundle 的版本……可以不走。这就是 OTA，热更新的全部原理基础。
-->

---

## OTA：启动检查、后台下载、下次启动生效

<div class="dg" style="gap:1.2rem">
  <div class="dbox" style="padding:.7rem .9rem">
    <b style="margin-bottom:.3rem">手机</b>
    <div class="dcol" style="margin-top:.4rem">
      <div class="dbox nat" style="padding:.35rem .7rem">原生壳 · runtime v3</div>
      <div class="dbox js" style="padding:.35rem .7rem">JS bundle v7</div>
    </div>
  </div>
  <div class="dcol" style="align-items:center;gap:2px">
    <div class="dbox rn" style="padding:.3rem .7rem;font-size:.7rem">runtimeVersion 匹配才下发</div>
    <div class="darr">←</div>
  </div>
  <div class="dbox" style="padding:.7rem .9rem">
    <b style="margin-bottom:.3rem">更新服务</b>
    <div class="dbox js ghost" style="margin-top:.4rem;padding:.35rem .7rem">新 bundle v8<small>要求 runtime v3</small></div>
  </div>
</div>

<p class="dnote">纯 JS 改动走 OTA，分钟级；动了原生的更新，老实走商店</p>

<!--
完整流程三步：App 启动时顺手问一句更新服务，有新 bundle 吗；有就后台静默下载，用户完全无感知；下次启动切换到新版本。中间有个安全阀叫 runtimeVersion，得讲清楚：bundle 里的 JS 会调用壳里的原生模块，如果新 bundle 用到了壳里没有的模块，强行加载就是闪退。所以壳和 bundle 各标一个运行时版本号，匹配才下发——纯 JS 的改动走 OTA 分钟级到达；动了原生的更新，老实走商店。落到业务上：线上 bug 分钟级修复，运营需求当天上线，iOS 那一到三天的审核，大部分时候跟我们没关系了。合规也说一句：苹果条款允许这类 JS 层的更新，前提是不改变 App 的核心用途——正经用没有问题，微软、Shopify 都在用。
-->

---

## 小结：RN 负责渲染，Expo 负责其余的工程化

RN 回答「JS 怎么渲染原生 UI」。

Expo 回答「原生工程谁维护、依赖怎么配、包怎么打、更新怎么发」。

<!--
第五章收束。两者的分工一句话：RN 解决"用 JS 渲染原生 UI"这个核心问题；Expo 解决围绕它的一切工程化脏活——原生工程用 CNG 生成、常用模块官方配套、打包签名上云、更新用 OTA 直达。打个比方，RN 是台好引擎，Expo 是整车：光有引擎是开不上路的，这也是官方劝你别裸用的原因。到这里，"为什么选 RN 加 Expo"的正面论证完成了。但一个诚实的选型汇报还差最后一块：边界。这套方案什么时候不管用？大厂为什么还养着原生团队？最后一章。
-->

---
layout: section
---

# 既然 RN 渲染原生控件，为什么大厂仍有原生团队？

<!--
最后一章，从一个大家迟早会问的尖锐问题开始：既然 RN 渲染的都是真原生控件，为什么美团、京东这些大厂的 App 团队里，原生工程师还是一大把？有些功能还明摆着是原生写的？是不是说明 RN 不行？这一章把这件事讲透。先剧透结论：答案不是"RN 不行"，而是"RN 的设计从第一天起就包含了和原生共存"。
-->

---

## 「用原生控件渲染」不等于「原生开发」

RN 是 JS 驱动原生控件：逻辑在 JS 运行时里，中间隔着一层通信。

这条链路罩得住的地方，RN 都好使；罩不住的地方，就是原生的领地。

<!--
先把认知摆正。锚点句说"渲染出来的是真原生控件"，但别把它扩大成"RN 等价于原生开发"。差别在链路上：原生开发，代码编译成机器码直接跑在系统上，中间没有任何间隔；RN 是逻辑跑在 JS 运行时里，指令穿过 JSI 到达原生侧。新架构让这条链路又快又顺，绝大多数业务场景毫无压力——但链路毕竟存在。存在，就有罩不住的地方；罩不住的地方，就是原生的领地。接下来三页，就是三类典型的"罩不住"——每一类的原因都不一样，值得分开看。
-->

---

## 有些功能不运行在你的 App 进程里

iOS 桌面小组件、灵动岛、推送扩展、手表 App——系统单独拉起的独立进程。

不加载你的 JS 引擎和 bundle。这里不存在"用 RN 写"这个选项。

<!--
第一类最绝对：系统深水区。iOS 的桌面小组件、灵动岛上的实时活动、推送内容扩展、手表上的 App——这些看着是你 App 的一部分，但在系统眼里它们是独立的小程序：由系统在你的 App 之外单独拉起，独立进程，内存限制严苛，运行环境是系统规定死的。你的主 App 进程、你的 JS 引擎、你的 bundle，统统不在场。所以这不是"RN 支持得好不好"的问题——那个环境里压根没有跑 JS 的地方，"用 RN 写小组件"这个选项在物理上就不存在。再加一条：苹果谷歌每年发新系统能力，API 永远是原生先能用。想做这些？原生写，没有第二个选项。
-->

---

## 逐帧计算的场景，不适合放在 JS 里

相机实时滤镜、音视频编解码、AR、地图渲染——每一帧都在重算重画。

正确姿势：写成原生模块贴着硬件跑，再挂回 RN 被 JS 调用。

<!--
第二类：性能热点。想象相机实时滤镜：每秒几十帧，每一帧都要对整幅图像做计算，这种活的正确姿势是贴着硬件写——直接用 GPU、用专用编解码芯片。JS 单线程加一层跨语言通信，干这个不是不行，是不划算。地图同理：一屏地图每帧都在渲染成千上万个要素，所以你见到的地图 SDK 清一色原生实现。但注意处理方式——不是"这个 App 不能用 RN 了"，而是把热点那一块写成原生模块，挂回 RN，让 JS 调用：界面骨架还是 RN 的，滤镜内部是原生在算。这个"挂回"的机制是官方设计好的，两页之后展开。
-->

---

## 存量架构与启动路径，天然属于原生

美团、京东、携程：成熟原生 App 在先，RN 以"部分页面"形态嵌入——没人推倒重来。

另外：点图标到 JS 引擎就绪之间，跑的全是原生代码。

<!--
第三类其实是历史和物理。历史：大厂的 App 都是十来年的原生存量，几百人团队、深度定制的基建，没有任何理由推倒重写。所以 RN 在大厂是"嵌进去"的：这几个页面是 RN，旁边那个页面还是原生，用户毫无感知。美团的 MRN、携程的 CRN，都是这个形态的自研体系。所以"大厂有原生团队"跟"RN 行不行"是两码事——那是存量结构决定的，人家的新页面照样大量用 RN 写。物理：用户点图标之后、JS 引擎就绪之前——进程创建、壳的初始化——这一段只能是原生代码在跑，JS 这时候还没醒。所以极致的启动优化，最后一定会做到原生层去。这不是缺陷，是物理。
-->

---

## 下沉不是妥协，是 RN 官方设计的通道

<div class="dg" style="gap:1.5rem;align-items:stretch">
  <div class="dbox" style="padding:.7rem .9rem;width:23rem">
    <b style="margin-bottom:.4rem">你的 App</b>
    <div class="dbox rn" style="margin-top:.4rem;padding:1.3rem .8rem"><b>业务界面（JS / RN）</b><small>列表 · 表单 · 详情 · 流程——绝大部分</small></div>
    <div style="font-size:.66rem;color:#047857;margin:.3rem 0 2px">↑ Native Module / Component 挂回 ↑</div>
    <div class="drow">
      <div class="dbox nat" style="padding:.3rem .5rem;font-size:.68rem">相机滤镜</div>
      <div class="dbox nat" style="padding:.3rem .5rem;font-size:.68rem">音视频</div>
      <div class="dbox nat" style="padding:.3rem .5rem;font-size:.68rem">地图</div>
    </div>
  </div>
  <div class="dbox" style="align-self:center;padding:.6rem .8rem"><b>系统扩展</b><small>Widget · 推送扩展<br>独立进程，不经过 RN</small></div>
</div>

<!--
现在把前面三页翻转过来——这是整章最重要的一页。听完三类场景，你可能觉得 RN 到处是短板。但请看这张图的面积比例：一个典型 App 里，绝大部分面积是业务界面——列表、表单、详情页、业务流程，这些全是 RN 的主场，用 JS 快速迭代；少数几个性能热点，下沉成原生模块，再通过官方通道挂回 RN，继续被 JS 调用；系统扩展在进程外，单独用原生写，本来也不大。关键在于：那个下沉通道——Native Modules、Native Components——是 RN 官方的一等公民机制，从第一天就在设计里。所以"有些功能用原生写"不是 RN 的失败案例，恰恰是它的标准用法：默认 JS，热点下沉，挂回来继续跑。RN 从没打算取代原生，它设计的是一种分工。
-->

---

## 有几类 App，从一开始就不该选 RN

重 3D / 图形的游戏——渲染管线本身就是产品，去用游戏引擎。

榨干设备性能的专业工具、功能主体全在系统深水区的 App——直接原生。

<!--
公平起见，反面清单也摆出来。第一类：游戏和重 3D 应用，渲染管线本身就是产品，那是 Unity、Unreal 的地盘。第二类：把设备性能榨到极限的专业工具，比如手机视频剪辑器，核心链路全是刚才说的性能热点——按分工逻辑，整个 App 都得下沉，RN 层没剩什么了，不如直接原生。第三类：功能主体就泡在系统深水区的，同理。判断标准就是上一页那张图的面积比例：业务界面占大头，选 RN 划算；热点和深水区占大头，别硬套。我们的 App 是典型的前者——大量业务界面、高频迭代，正是 RN 的甜区。
-->

---

## 这些公司正在生产环境使用 RN

海外：Shopify 全线押注、Discord、Coinbase、微软 Office 与 Outlook 移动端。

国内：京东、美团、携程——都有自研 RN 基建体系。

<!--
选型汇报总要回答"还有谁在用"。海外：Shopify 把全公司移动端押在 RN 上；Discord 的手机端跑了很多年；Coinbase 把主 App 整个迁到了 RN；微软在 Office、Outlook 移动端里大量使用 RN，而且它自己维护着 RN 的 Windows 和 macOS 版本——微软是 RN 生态的主要共建方之一。国内更能说明问题：京东、美团、携程不只是用，还各自搞了自研的 RN 基建——愿意投入自研基建，说明这条路线在它们那种体量下被验证过扛得住。这些公司的共同点：业务界面占大头、迭代压力大——跟我们的画像一致。
-->

---

## Flutter 逐像素自绘，且官方不提供热更新

<div class="dg" style="gap:2.5rem">
  <div class="dcol" style="align-items:center">
    <div class="dbox js" style="min-width:10rem"><b>JS + React</b></div>
    <div class="darr">↓</div>
    <div class="dbox rn" style="min-width:10rem"><b>React Native</b><small>指挥系统控件</small></div>
    <div class="darr">↓</div>
    <div class="dbox nat" style="min-width:10rem"><b>系统原生控件</b></div>
    <div class="dcap">技能重叠前端 · 可 OTA</div>
  </div>
  <div class="dcol" style="align-items:center">
    <div class="dbox js" style="min-width:10rem"><b>Dart</b></div>
    <div class="darr">↓</div>
    <div class="dbox" style="min-width:10rem"><b>Flutter 引擎</b><small>自带渲染器</small></div>
    <div class="darr">↓</div>
    <div class="dbox" style="min-width:10rem"><b>自绘画布</b><small>每个像素自己画</small></div>
    <div class="dcap">Dart 生态 · iOS AOT · 官方无热更新</div>
  </div>
</div>

<!--
最后回答一个必然有人问的问题：为什么不是 Flutter？先说清楚，Flutter 是优秀的框架，只是路线和 RN 完全相反：RN 指挥系统控件干活，Flutter 根本不用系统控件——它自带一个渲染引擎，把界面上每个像素都自己画出来，相当于随身带了个小型游戏引擎。好处很实在：两端像素级一致，不依赖系统控件的脾气。但两个代价对我们是决定性的。第一，语言是 Dart，跟前端团队的 JS、React 技能栈基本零重叠，等于全员重学、生态另起炉灶。第二，最实际的：Flutter 在 iOS 上是 AOT——代码直接编译成机器码，机器码不能绕过商店下发，所以 Flutter 官方不提供热更新；第三方虽有 Shorebird 这类方案，靠额外塞一个解释器来绕，属于少数派，不像 RN 这边 OTA 是生态标配。上一章讲的分钟级修复，Flutter 拿不到同等待遇。技能复用和发布速度，恰好是我们最看重的两条，所以选 RN。
-->

---
layout: center
class: text-center
---

## 开头那两个问题，现在有答案了

<div class="dg" style="flex-direction:column;gap:.6rem;margin-top:1.6rem;font-size:.82rem">
  <div class="drow"><div class="dbox" style="min-width:13rem">UI 由谁渲染</div><span class="darr">→</span><div class="dbox nat" style="min-width:13rem">系统原生控件</div></div>
  <div class="drow"><div class="dbox" style="min-width:13rem">逻辑跑在哪个运行时</div><span class="darr">→</span><div class="dbox js" style="min-width:13rem">JS，一套代码</div></div>
  <div class="drow"><div class="dbox" style="min-width:13rem">工程脏活谁兜底</div><span class="darr">→</span><div class="dbox rn" style="min-width:13rem">Expo（CNG · EAS · OTA）</div></div>
  <div class="drow"><div class="dbox" style="min-width:13rem">链路罩不住的地方</div><span class="darr">→</span><div class="dbox rn" style="min-width:13rem">下沉原生，挂回 RN</div></div>
</div>

<!--
收尾，回到开场那两个问题。H5 把两个问题都答成"网页"，省钱，但渲染管线和沙箱决定了天花板；纯原生都答成"原生"，体验顶格，但成本翻倍、节奏被审核锁死。RN 把两个问题拆开答：渲染交给系统控件，逻辑留在 JS——新架构把中间通信做到同步零序列化，Hermes 把启动做快，这条路在原理上是通的；Expo 把工程脏活全兜住，OTA 把迭代速度找回来；边界清晰，而且有官方通道兜底。屏幕上后两行，是一路走下来新加的两个问题——工程脏活谁兜底、链路罩不住怎么办，答案也都在图里了。所以最终答案一句话：用一套前端团队驾驭得了的代码，交付接近原生的体验，保住接近 Web 的迭代速度——这就是我们选 React Native 加 Expo 的全部理由。
-->

---
layout: center
class: text-center
---

# Q&A

谢谢，欢迎提问与讨论

<!--
内容就到这里。留几个我猜会被问的问题：性能到底行不行——回看第四章，新架构之后链路是同步的，业务场景够用，真热点走下沉；Meta 会不会弃坑——RN 是 Meta、微软、Shopify、Expo 多方共建的生态，大版本还在持续迭代，不是单家公司的玩具；前端上手成本——主要是适应"没有 DOM"，组件和状态那套心智完全一样。其他的，现场聊。
-->
