# Redverse

连接全球 AI 创新与中国市场的平台。国际开发者提交他们的 AI 应用，经过审核后发布到小红书，帮助触达亿万中国用户。

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint
pnpm type-check
```

## 🎯 核心功能

### 🔗 智能链接解析
- 自动提取 AI 应用官网标题
- 支持 Open Graph 元标签解析
- 智能错误处理和重试机制

### 📝 多步骤提交流程
1. **链接输入** - 用户粘贴 AI 应用官网链接
2. **智能解析** - 系统自动提取应用名称
3. **信息确认** - 用户确认/修改应用信息
4. **提交成功** - 引导关注小红书账号

### 👤 用户认证系统
- 基于 Clerk 的完整用户管理
- 保护提交功能，防止垃圾信息
- 个人中心查看提交状态

### 📊 排行榜系统
- 基于小红书互动数据排名
- 实时展示热门 AI 应用
- 点赞、收藏、评论数据统计

## 🛠 技术架构

### 前端技术栈
- **Next.js 15** - App Router 架构
- **React 19** - 最新版本特性
- **TypeScript** - 类型安全
- **Tailwind CSS v4** - 现代化样式方案

### 后端 & 数据库
- **Supabase** - PostgreSQL 数据库
- **Clerk** - 用户认证和管理
- **Next.js API Routes** - 服务端接口

### 开发工具
- **pnpm** - 快速包管理器
- **ESLint** - 代码质量检查
- **TypeScript** - 静态类型检查

## 📁 项目结构

```
redverse/
├── app/                    # Next.js App Router
│   ├── api/               # API 端点
│   │   ├── leaderboard/   # 排行榜数据
│   │   ├── my-applications/ # 用户应用列表
│   │   ├── parse-url/     # URL 解析
│   │   └── submit-application/ # 应用提交
│   ├── dashboard/         # 用户控制台
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── header.tsx         # 导航栏
│   ├── leaderboard.tsx    # 排行榜
│   └── submission-form.tsx # 提交表单
├── lib/                   # 工具库
│   └── supabase.ts        # 数据库客户端
├── public/                # 静态资源
└── CLAUDE.md              # Claude Code 指导文档
```

## 🗄 数据库设计

### `application` 表
存储提交的 AI 应用信息：
- `id` - 主键
- `user_id` - 关联 Clerk 用户
- `name` - 应用名称
- `url` - 官网链接
- `twitter_id` - Twitter 账号（可选）
- `status` - 审核状态（pending/approved/rejected/published）
- `created_at` - 创建时间

### `note` 表
存储小红书笔记数据：
- `id` - 主键
- `app_id` - 关联应用
- `url` - 小红书笔记链接
- `likes_count` - 点赞数
- `collects_count` - 收藏数
- `comments_count` - 评论数
- `publish_date` - 发布时间

## 🔧 环境配置

需要配置以下环境变量：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 🎨 设计理念

参考 Artifact 的简洁专业设计风格：
- 清晰的信息层级
- 专业的配色方案
- 流畅的交互体验
- 响应式设计适配

## 📱 功能特色

### 病毒式传播引导
- "让你的 AI 应用在中国爆火" 的吸引力文案
- 引导用户关注小红书官方账号
- 成功案例展示激发提交动机

### 智能化体验
- 自动解析网站标题
- 友好的错误处理
- 实时状态反馈

### 数据驱动运营
- 详细的互动数据统计
- 排行榜激励机制
- 用户行为追踪

---

Built with ❤️ for connecting global AI innovation with Chinese market.