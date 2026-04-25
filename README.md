# 慢病用药小管家 · Chronic Disease Medication Manager

> 美团AI Coding 测试项目 | Meituan AI Coding Assessment Project
>
> 在线体验 / Live Demo: **https://medicine-manager-ruddy.vercel.app/**

一款面向慢性病患者的移动端 Web 应用，覆盖「问诊 → 购药 → 用药 → 续方」完整服务闭环，帮助用户建立个人用药计划与复诊提醒。

A mobile-first web application for chronic disease patients, covering the complete care loop of "Consultation → Purchase → Medication → Prescription Renewal" to help users manage medication plans and follow-up reminders.

---

## 产品背景 · Background

慢性病患者线上复诊开药后，常面临以下痛点：

- 忘记按时服药，漏服频繁
- 药品库存不足却未能及时补货
- 不清楚下次复诊时间，处方过期后才想起续方
- 用药疑问无处咨询，重复购药浪费

Chronic disease patients often face these pain points after online consultations:

- Forgetting to take medicine on time, frequent missed doses
- Running out of stock without timely refills
- Losing track of follow-up appointments, renewing prescriptions too late
- No accessible channel for medication questions, wasting money on duplicate purchases

---

## 功能介绍 · Features

### 首页 · Home

- **今日服药进度环** — 实时显示当日已服 / 待服剂次，百分比进度可视化
- **用药时间轴** — 按早 / 中 / 晚分组展示当日全部药品，点击即可打卡确认
- **库存预警横幅** — 自动检测库存 ≤ 7 天的药品，红色警示提醒补货
- **复诊倒计时卡片** — 显示距下次复诊的剩余天数及主治医生信息

- **Daily progress ring** — Real-time visualization of today's checked vs. remaining doses
- **Medication timeline** — Grouped by morning / noon / evening; tap to check off each dose
- **Low-stock banner** — Automatically flags medications with ≤ 7 days remaining stock
- **Revisit countdown card** — Days until next appointment and attending doctor info

### 计划页 · Medication Plan

- **药品卡片** — 颜色编码，展示适应症、规格、服药频次、库存天数
- **添加 / 编辑药品** — 完整表单：药品名称、规格、单次剂量、服药频次（每日一/二/三次）、服药时段、每次用量、单位、库存天数、疗程、卡片颜色、适应症
- **启用 / 停用管理** — 支持暂停某种药品而不删除记录，恢复时数据完整保留

- **Drug cards** — Color-coded cards showing indication, spec, frequency, and remaining stock
- **Add / Edit dialog** — Full form: name, spec, dosage, frequency (1×/2×/3× daily), time slots, amount per dose, unit, stock days, course length, card color, indication
- **Active / Inactive toggle** — Pause a medication without deleting its record; restore anytime

### 复诊页 · Follow-up Visit

- **下次复诊信息** — 日期、倒计时天数、科室、主治医生
- **历史处方列表** — 有效处方与过期处方分组展示，含药品明细
- **续方购药弹窗** — 一键发起续方请求，展示处方内药品及价格
- **有效期提醒** — 提示处方通常有效期 3 个月，过期需重新就诊

- **Next revisit card** — Date, countdown, department, and attending doctor
- **Prescription history** — Valid and expired prescriptions grouped separately with drug details
- **Refill dialog** — One-tap refill request showing medications and prices from the prescription
- **Expiry reminder** — Informs user that prescriptions are typically valid for 3 months

### 我的页 · Profile

- **个人健康档案** — 姓名、年龄、慢性病病史、主治医生
- **健康趋势图** — 血压（收缩压 / 舒张压）与血糖双标签切换折线图，展示近 14 天数据
- **依从率图** — 近 7 天每日服药完成率柱状图，直观反映用药习惯
- **家庭账号** — 支持为家庭成员建立独立健康档案
- **用药提醒设置** — 展示早 / 中 / 晚提醒时间配置入口
- **AI 问诊入口** — 7×24 小时免费咨询快捷入口

- **Health profile** — Name, age, chronic conditions, attending doctor
- **Health trend chart** — Blood pressure (systolic/diastolic) and blood sugar, tabbed line chart for last 14 days
- **Adherence chart** — Daily medication completion rate for the past 7 days
- **Family accounts** — Manage separate health profiles for family members
- **Reminder settings** — Morning / noon / evening notification time configuration
- **AI consult entry** — 7×24 free consultation shortcut

### AI 智能问诊 · AI Consultation

- **智能聊天界面** — 对话气泡式交互，AI 回复含打字等待动画
- **快捷提问** — 三个常见场景一键提问：续方提醒、血压偏高应对、联合用药安全性
- **药品推荐卡片** — AI 根据对话推荐药品，展示规格与价格，支持加入购药清单
- **购物车** — 清单气泡计数，加入后 Toast 提示反馈

- **Chat interface** — Bubble-style conversation with AI typing animation
- **Quick questions** — One-tap prompts for the three most common scenarios: refill reminder, high blood pressure advice, drug compatibility check
- **Drug recommendation cards** — AI-suggested medications with spec and price; add to purchase list
- **Cart** — Badge counter on cart icon; toast confirmation on add

---

## 技术栈 · Tech Stack

| 层 / Layer | 技术 / Technology |
|------------|-------------------|
| 框架 Framework | Next.js 16 (App Router) |
| UI 语言 | React 19 + TypeScript |
| 样式 Styling | Tailwind CSS v4 |
| 组件 Components | shadcn/ui + Base UI |
| 图表 Charts | Recharts |
| 图标 Icons | Lucide React |
| 数据持久化 Storage | localStorage (客户端 client-side) |
| 部署 Deployment | Vercel |

---

## 本地开发 · Local Development

### 环境要求 · Prerequisites

- Node.js >= 18
- npm / yarn / pnpm（任选一 / any one）

### 启动步骤 · Setup

```bash
# 1. 进入项目目录 / Enter project directory
cd medicine-manager

# 2. 安装依赖 / Install dependencies
npm install

# 3. 启动开发服务器 / Start dev server
npm run dev
```

打开浏览器访问 / Open in browser: [http://localhost:3000](http://localhost:3000)

> 推荐使用浏览器的移动端模拟模式（DevTools → Toggle Device Toolbar，选择 iPhone 14 或类似机型）以获得最佳体验。
>
> For best experience, use browser DevTools mobile emulation (Toggle Device Toolbar → iPhone 14 or similar).

### 构建生产版本 · Production Build

```bash
npm run build
npm run start
```

---

## 项目结构 · Project Structure

```
medicine-manager/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页 Home
│   │   ├── plan/page.tsx         # 计划页 Medication Plan
│   │   ├── revisit/page.tsx      # 复诊页 Follow-up Visit
│   │   ├── profile/page.tsx      # 我的页 Profile
│   │   └── consult/page.tsx      # AI问诊页 AI Consultation
│   ├── components/
│   │   ├── home/                 # 首页组件
│   │   ├── plan/                 # 计划页组件（含药品表单）
│   │   ├── revisit/              # 复诊页组件（含续方弹窗）
│   │   ├── profile/              # 健康图表、家庭账号等
│   │   ├── layout/               # 底部导航栏
│   │   └── ui/                   # 通用 UI 组件
│   └── lib/
│       ├── types.ts              # 全局类型定义
│       ├── mock-data.ts          # 演示用初始数据
│       └── storage.ts            # localStorage 读写封装
```

---

## 数据说明 · Data Notes

应用首次加载时，会将 `mock-data.ts` 中的演示数据写入浏览器 localStorage，包含：

- 4 种慢性病药品（厄贝沙坦、二甲双胍、阿司匹林、瑞舒伐他汀）
- 近 14 天服药打卡记录
- 2 张处方（1 张有效，1 张过期）
- 近 14 天血压 / 血糖健康记录
- 家庭成员账号

On first load, the app seeds `mock-data.ts` demo data into localStorage, including 4 medications, 14 days of check records, 2 prescriptions, 14 days of health readings, and a family member account.

如需重置数据，在浏览器控制台执行 / To reset data, run in browser console:

```js
localStorage.removeItem('medicine-manager-v1'); location.reload();
```

---

## 部署 · Deployment

项目已通过 Vercel 部署。如需自行部署：

The project is deployed on Vercel. To deploy your own instance:

1. Fork 或克隆本仓库 / Fork or clone this repo
2. 在 Vercel 导入项目 / Import project in Vercel
3. 框架预设选 **Next.js**，无需配置环境变量 / Select **Next.js** preset; no env vars needed
4. 点击 Deploy / Click Deploy

---

## 作者 · Author：  马易飞     Ma Yifei

美团 AI Coding 评测作品，48 小时内完成。

Meituan AI Coding assessment submission, completed within 48 hours.
