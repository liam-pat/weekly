---
date: 2024/06/23
---

<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/06/wetlabrador1.webp" width="800" />

<small>A drenched Labrador</small>

## Interesting Tools

**Common Mispronunciations by Programmers**  
<https://fengyuanchen.github.io/chinese-programmer-wrong-pronunciation>  
A handy roundup of tech terms that are frequently mispronounced—turns out there are quite a few I've been saying wrong all along.

**Apple Developer Pathways**  
<https://developer.apple.com/programs/pathway/>  
Apple rolled out a new developer initiative recently, but for some reason my application keeps getting rejected.

**Proxmox VE Helper-Scripts**  
<https://tteck.github.io/Proxmox/>  
A collection of community scripts for Proxmox VE. Great reference for setting up things like automated health checks, reboots, and LXC containers.

**Win 11 ISO (UUP dump)**  
<https://uupdump.net/>  

**BewlyBewly (Bilibili UI Enhancement)**  
<https://github.com/BewlyBewly/BewlyBewly>  

## Learning 

**iPhone XS Max Battery Replacement 🔋**  

Recently replaced the battery on my dad's iPhone.

Replacing an iPhone battery basically comes down to two options: an authentic pulled OEM battery vs. Apple official service. The main difference? The pulled battery can't run Apple's software diagnostics, while the official one can—and the official route costs double! Performance is identical; you're essentially just paying for that diagnostics pass.

I grabbed an authentic pulled battery off Xianyu for ~$70 RMB. If you do it yourself, definitely use isopropyl alcohol spray—otherwise, you'll end up like me, spending two agonizing hours prying the old adhesive off. Pure agony~~~

[Battery Replacement Guide](https://zh.ifixit.com/Guide/%E6%9B%B4%E6%8D%A2iPhone+XS+Max%E7%9A%84%E7%94%B5%E6%B1%A0/117345)  
[Display Adhesive Replacement](https://zh.ifixit.com/Guide/iPhone%E6%98%BE%E7%A4%BA%E5%B1%8F%E7%B2%98%E5%90%88%E8%83%B6%E7%9A%84%E6%9B%B4%E6%8D%A2/93983)  
<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/06/iphonebattery.webp" width="800" />

**Win 11 Network Printing 🖨**  

I hadn't set up a local network printer before. On Saturday, I tried hooking up an idle Canon printer to my 5600G PC to share it across the LAN.

Great in theory, brutal in reality. From Win 7 all the way to Win 11, printer compatibility remains notoriously finicky. Microsoft's driver stack and sharing are as clunky as ever.

Occasionally, other machines discover the shared printer and send a print job, only for the very next job to throw a "Permission denied, please contact your administrator" error. The only workaround right now is to manually re-add the network printer each time I want to print—the initial connection has a high success rate.

To make things worse, after several failed login attempts, Win 11 triggers account lockout—remember to turn that policy off. Spent an entire afternoon with zero results to show for it. Strongly recommend sticking with macOS for this stuff. What a dreadful day.

<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/06/turnofflockedfun.webp" width="800" />

## Reading

**Book: *Managing Small Teams Under 10 People***  
Finished reading a new book this month. It covers interpersonal communication and navigating relationships between managers and subordinates. Gained quite a few new perspectives from it—giving me a solid blueprint to reference when similar situations pop up.  
<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/06/sharereadbooks.webp" width="800" />

**Code Review Practices**  
<https://google.github.io/eng-practices/>  
Lately, code reviews have been driving me up the wall. I've always aimed to keep my code simple and straightforward—easy for a layman to grasp and a breeze for teammates to maintain. But recently, getting nitpicked constantly made me second-guess that philosophy. Should I be hyper-optimizing like Linux kernel devs instead? Focusing purely on raw performance and intricate design without caring if others can read it easily?? Read through several articles on code review guidelines; each reread offered fresh takeaways. I don't have the bandwidth to worry about others' quirks anymore—just focus on doing my own best work.
