---
date: 2024/12/23
---

<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/12/26header.jpg?imageMogr2/format/webp" width="800" />

<small>Taken in my home courtyard. The lemon blossoms look so lovely.</small>

## Interesting Tools

**Xiaomi Home Integration for Home Assistant**  
<https://github.com/XiaoMi/ha_xiaomi_home>  
Xiaomi's Home Assistant plugin. Haven't tried it yet since my previous setup still works fine. The Xiaomi ecosystem is quite remarkable—I've used Huawei too, won't comment too much, but personally I find Xiaomi's smart home very user-friendly. Recently Apple dropped iPad support as a Home Hub, which finally made me consider switching to a HomePod~~  
<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/12/26interestingtoolsmi.jpg?imageMogr2/format/webp" width="800" />

**Koodo Reader**  
<https://github.com/koodo-reader/koodo-reader>  
An open-source ebook reader. Previously I used SumatraPDF on Windows and Apple Books on macOS. This one is cross-platform—let's see if it wins my heart~  
<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/12/26interestingtoolskoodo.jpg?imageMogr2/format/webp" width="800" />

**CAP**  
<https://github.com/CapSoftware/Cap>  
A Mac screen recorder built by wrapping Next.js inside Rust Tauri. If you're interested in this tech stack, definitely check it out.  
<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/12/26interestingtoolscap.jpg?imageMogr2/format/webp" width="800" />

## Life

**Whole-House 2.5Gbps Network**  
The ASUS BE6500 dropped in price, so I picked one up to build a full 2.5G wired MESH network: BE6500 -> AX86U + AC86U. Running it for a few days feels great. Honestly, Wi-Fi 6 is plenty fast; Wi-Fi 7 feels kind of unnecessary right now.  
A few issues I only discovered today:  

* The BE6500's Qualcomm CPU doesn't support Asuswrt-Merlin firmware, but it does support OpenWrt.
* If using AX86U as a MESH node, DDNS doesn't seem to work. I initialized an OpenWrt instance on my soft router specifically for DDNS.
* It only has three 2.5G LAN ports: two went to the MESH nodes, one to the soft router, and that's it—I'll need to buy a 2.5G switch for the bedroom.
* If using MESH, you can't use VLANs. Remember to connect the two routers with an Ethernet cable to form the mesh before routing through the switch.

**Home Renovation Wiring**  
Lots of home renovations fail to separate high-voltage and low-voltage wiring... causing broadband speeds not to reach ideal rates, and no one can figure out why... But does separating vs. not separating power and network cables really make that big of a difference???  
A video creator investigated this issue, but after watching it I was still scratching my head. Household electrical main line power can be huge, especially in the summer... he didn't really touch on that, but his methods are worth referencing...  
<https://www.bilibili.com/video/BV19f4y1k7kd/?vd_source=be133f70f3336cde3e99215b952629a0>  

<img src="https://gz-blog-storage-1252787757.cos.ap-guangzhou.myqcloud.com/weekly/2024/12/26lifecable.jpg?imageMogr2/format/webp" width="800" />

* Cat 6 Shielded cables~~
* Keep Cat 5e at least 30cm away from power lines~~
* Pre-lay fiber optics—fiber is cheap, prep for the future even if you don't use it now, optical-electrical transceiver modules are still too expensive~~
* Definitely buy thick Ethernet cables (5mm+ diameter), avoid the ultra-thin ones at all costs~~
