From 75e7ae800e29d805db313e481b9ea81fc3e85013 Mon Sep 17 00:00:00 2001
From: ziye12 <59244461+ziye12@users.noreply.github.com>
Date: Sun, 7 Feb 2021 23:32:09 +0800
Subject: [PATCH] githubAC  时间精确到5分

---
 Task/githubAC.js | 177 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-------
 1 file changed, 170 insertions(+), 7 deletions(-)

diff --git a/Task/githubAC.js b/Task/githubAC.js
index 716793c..86bd7bb 100644
--- a/Task/githubAC.js
+++ b/Task/githubAC.js
@@ -11,8 +11,9 @@ boxjs链接  https://raw.githubusercontent.com/ziye12/JavaScript/main/Task/ziye.
 2.6 制作
 2.7 增加时间控制，多js换行，boxjs手动保存会话，填写，再应用，其他填写环境变量或者githubACCOOKIE.js
 2.7-2 修正判定
+2.7-3 时间精确到5分
 
-⚠️一共1个位置 3个ck  👉 12条 Secrets(8个时间变量) 
+⚠️一共1个位置 3个ck  👉 18条 Secrets(14个时间变量) 
 多账号换行
 
 第一步 添加  hostname=github.com,
@@ -37,7 +38,14 @@ MMC 👉GIT_MMC
 MMD 👉GIT_MMD
 MME 👉GIT_MME
 MMF 👉GIT_MMF
-
+HHG 👉GIT_HHG   
+HHH 👉GIT_HHH    
+MMI 👉GIT_MMI
+MMJ 👉GIT_MMJ
+MMK 👉GIT_MMK
+MML 👉GIT_MML
+MMM 👉GIT_MMM
+MMN 👉GIT_MMN
 
 
 ⚠️主机名以及重写👇
@@ -89,6 +97,7 @@ const githubACbodyArr = [];
 let githubACbodyVal = ``;
 let middlegithubACBODY = [];
 
+
 const HHAArr = [];
 let HHAVal = ``;
 let middleHHA = [];
@@ -113,6 +122,35 @@ let middleMME = [];
 const MMFArr = [];
 let MMFVal = ``;
 let middleMMF = [];
+const MMGArr = [];
+let MMGVal = ``;
+let middleMMG = [];
+const MMHArr = [];
+let MMHVal = ``;
+let middleMMH = [];
+const MMIArr = [];
+let MMIVal = ``;
+let middleMMI = [];
+const MMJArr = [];
+let MMJVal = ``;
+let middleMMJ = [];
+const MMKArr = [];
+let MMKVal = ``;
+let middleMMK = [];
+const MMLArr = [];
+let MMLVal = ``;
+let middleMML = [];
+
+
+
+
+
+
+
+
+
+
+
 
 
 
@@ -251,6 +289,71 @@ if ($.isNode() && process.env.GIT_githubACHEADER) {
         middleMMF = process.env.GIT_MMF.split();
     }
 
+if (
+        process.env.GIT_MMG &&
+        process.env.GIT_MMG.indexOf(COOKIES_SPLIT) > -1
+    ) {
+        middleMMG = process.env.GIT_MMG.split(COOKIES_SPLIT);
+    } else {
+        middleMMG = process.env.GIT_MMG.split();
+    }
+
+
+
+    if (
+        process.env.GIT_MMH &&
+        process.env.GIT_MMH.indexOf(COOKIES_SPLIT) > -1
+    ) {
+        middleMMH = process.env.GIT_MMH.split(COOKIES_SPLIT);
+    } else {
+        middleMMH = process.env.GIT_MMH.split();
+    }
+
+
+
+    if (
+        process.env.GIT_MMI &&
+        process.env.GIT_MMI.indexOf(COOKIES_SPLIT) > -1
+    ) {
+        middleMMI = process.env.GIT_MMI.split(COOKIES_SPLIT);
+    } else {
+        middleMMI = process.env.GIT_MMI.split();
+    }
+
+
+
+
+
+    if (
+        process.env.GIT_MMJ &&
+        process.env.GIT_MMJ.indexOf(COOKIES_SPLIT) > -1
+    ) {
+        middleMMJ = process.env.GIT_MMJ.split(COOKIES_SPLIT);
+    } else {
+        middleMMJ = process.env.GIT_MMJ.split();
+    }
+
+
+
+    if (
+        process.env.GIT_MMK &&
+        process.env.GIT_MMK.indexOf(COOKIES_SPLIT) > -1
+    ) {
+        middleMMK = process.env.GIT_MMK.split(COOKIES_SPLIT);
+    } else {
+        middleMMK = process.env.GIT_MMK.split();
+    }
+
+
+
+    if (
+        process.env.GIT_MML &&
+        process.env.GIT_MML.indexOf(COOKIES_SPLIT) > -1
+    ) {
+        middleMML = process.env.GIT_MML.split(COOKIES_SPLIT);
+    } else {
+        middleMML = process.env.GIT_MML.split();
+    }
 
 
 
@@ -271,7 +374,12 @@ if (COOKIE.githubACurlVal) {
         "MMDVal": COOKIE.MMDVal.split('\n'),
         "MMEVal": COOKIE.MMEVal.split('\n'),
         "MMFVal": COOKIE.MMFVal.split('\n'),
-
+        "MMGVal": COOKIE.MMGVal.split('\n'),
+        "MMHVal": COOKIE.MMHVal.split('\n'),
+        "MMIVal": COOKIE.MMIVal.split('\n'),
+        "MMJVal": COOKIE.MMJVal.split('\n'),
+        "MMKVal": COOKIE.MMKVal.split('\n'),
+        "MMLVal": COOKIE.MMLVal.split('\n'),
 
 
 
@@ -344,6 +452,39 @@ if (!COOKIE.githubACheaderVal) {
                 MMFArr.push(middleMMF[item]);
             }
         });
+		
+		        Object.keys(middleMMG).forEach((item) => {
+            if (middleMMG[item]) {
+                MMGArr.push(middleMMG[item]);
+            }
+        });
+
+        Object.keys(middleMMH).forEach((item) => {
+            if (middleMMH[item]) {
+                MMHArr.push(middleMMH[item]);
+            }
+        });
+        Object.keys(middleMMI).forEach((item) => {
+            if (middleMMI[item]) {
+                MMIArr.push(middleMMI[item]);
+            }
+        });
+        Object.keys(middleMMJ).forEach((item) => {
+            if (middleMMJ[item]) {
+                MMJArr.push(middleMMJ[item]);
+            }
+        });
+
+        Object.keys(middleMMK).forEach((item) => {
+            if (middleMMK[item]) {
+                MMKArr.push(middleMMK[item]);
+            }
+        });
+        Object.keys(middleMML).forEach((item) => {
+            if (middleMML[item]) {
+                MMLArr.push(middleMML[item]);
+            }
+        });
     } else {
         githubACnameArr.push($.getdata("githubACname"));
         githubACurlArr.push($.getdata("githubACurl"));
@@ -357,6 +498,12 @@ if (!COOKIE.githubACheaderVal) {
         MMDArr.push($.getdata("MMD"));
         MMEArr.push($.getdata("MME"));
         MMFArr.push($.getdata("MMF"));
+		MMGArr.push($.getdata("MMG"));
+        MMHArr.push($.getdata("MMH"));
+        MMIArr.push($.getdata("MMI"));
+        MMJArr.push($.getdata("MMJ"));
+        MMKArr.push($.getdata("MMK"));
+        MMLArr.push($.getdata("MML"));
         // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
 
         let githubACCount = ($.getval('githubACCount') || '1') - 0;
@@ -374,6 +521,12 @@ if (!COOKIE.githubACheaderVal) {
                 MMDArr.push($.getdata(`MMD${i}`));
                 MMEArr.push($.getdata(`MME${i}`));
                 MMFArr.push($.getdata(`MMF${i}`));
+				MMGArr.push($.getdata(`MMG${i}`));
+                MMHArr.push($.getdata(`MMH${i}`));
+                MMIArr.push($.getdata(`MMI${i}`));
+                MMJArr.push($.getdata(`MMJ${i}`));
+                MMKArr.push($.getdata(`MMK${i}`));
+                MMLArr.push($.getdata(`MML${i}`));
 
 
 
@@ -537,7 +690,12 @@ async function all() {
             MMDVal = GIT_COOKIES.MMDVal[i];
             MMEVal = GIT_COOKIES.MMEVal[i];
             MMFVal = GIT_COOKIES.MMFVal[i];
-
+            MMGVal = GIT_COOKIES.MMGVal[i];
+            MMHVal = GIT_COOKIES.MMHVal[i];
+            MMIVal = GIT_COOKIES.MMIVal[i];
+            MMJVal = GIT_COOKIES.MMJVal[i];
+            MMKVal = GIT_COOKIES.MMKVal[i];
+            MMLVal = GIT_COOKIES.MMLVal[i];
 
 
 
@@ -560,7 +718,12 @@ async function all() {
             MMDVal = MMDArr[i];
             MMEVal = MMEArr[i];
             MMFVal = MMFArr[i];
-
+            MMGVal = MMGArr[i];
+            MMHVal = MMHArr[i];
+            MMIVal = MMIArr[i];
+            MMJVal = MMJArr[i];
+            MMKVal = MMKArr[i];
+            MMLVal = MMLArr[i];
 
 
 
@@ -571,8 +734,8 @@ async function all() {
         O = (`${$.name + (i + 1)}🔔`);
         await console.log(`-------------------------\n\n🔔开始运行${$.name+(i+1)}【${githubACnameVal}】`)
 
-        $.message += `【${githubACnameVal}】从${HHAVal}点到${HHBVal}点的 ${MMAVal} ${MMBVal} ${MMCVal} ${MMDVal} ${MMEVal} ${MMFVal} 分运行\n`
-        if ((nowTimes.getHours() >= HHAVal && nowTimes.getHours() <= HHBVal) && (nowTimes.getMinutes() == MMAVal || nowTimes.getMinutes() == MMBVal || nowTimes.getMinutes() == MMCVal || nowTimes.getMinutes() == MMDVal || nowTimes.getMinutes() == MMEVal || nowTimes.getMinutes() == MMFVal)) {
+        $.message += `【${githubACnameVal}】从${HHAVal}点到${HHBVal}点的 ${MMAVal} ${MMBVal} ${MMCVal} ${MMDVal} ${MMEVal} ${MMFVal} ${MMGVal} ${MMHVal} ${MMIVal} ${MMJVal} ${MMKVal} ${MMLVal} 分运行\n`
+        if ((nowTimes.getHours() >= HHAVal && nowTimes.getHours() <= HHBVal) && (nowTimes.getMinutes() == MMAVal || nowTimes.getMinutes() == MMBVal || nowTimes.getMinutes() == MMCVal || nowTimes.getMinutes() == MMDVal || nowTimes.getMinutes() == MMEVal || nowTimes.getMinutes() == MMFVal ||nowTimes.getMinutes() == MMGVal || nowTimes.getMinutes() == MMHVal || nowTimes.getMinutes() == MMIVal || nowTimes.getMinutes() == MMJVal || nowTimes.getMinutes() == MMKVal || nowTimes.getMinutes() == MMLVal)) {
 
             await githubAC(); //运行
 
--
libgit2 1.0.1

