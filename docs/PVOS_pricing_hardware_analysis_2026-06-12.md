# PVOS.ai 定价与客户侧硬件配置分析

日期：2026-06-12

## 结论

当前 Landing Page 上的价格方向可以作为占坑式 early access 报价，但还不够经得起采购推敲。核心问题不是月费高低，而是没有把以下四类成本拆清楚：

1. PVOS 软件平台费
2. 客户侧 Privacy Gateway / Edge Appliance 硬件费
3. AI Recorder 设备费
4. ASR、LLM、存储、集成和部署服务费

如果页面写“Business: $3,900/mo + 150 AI recorders”，客户会自然理解为 150 台录音设备都包含在 $3,900/月里。这个不合理，除非设备非常低成本、客户另付押金，或者合同至少 24-36 个月。

更稳妥的报价结构应该是：

- 软件订阅按组织规模、站点数、并发录音量、保留周期收费。
- 网关硬件单独购买或租赁。
- Recorder 设备单独购买或 Device-as-a-Service 租赁。
- 推理/ASR/LLM 用量单独计量或给套餐额度。

## 市场参照

公开价格显示，纯云 AI 会议工具通常按 seat 计费：

- Otter.ai Business 公开价约 $19.99/user/month。
- Fireflies.ai Business 公开价约 $19/seat/month，Enterprise 公开价约 $39/seat/month。

这类产品通常不负责客户侧硬件、不承担边缘网关、不承诺原始音频在客户边界内脱敏，因此它们不是 PVOS 的直接定价上限。

语音基础设施通常按用量计费：

- Deepgram 等 ASR 平台常见是按分钟/小时计费。
- 这说明 PVOS 如果承担 ASR、存储和后续 LLM 摘要，就必须有 usage allowance 或 overage，否则高频客户会吃掉毛利。

边缘 AI 硬件看起来便宜，但企业交付不便宜：

- NVIDIA Jetson Orin Nano Super Developer Kit 官方公开价为 $249。
- 但企业级可交付网关需要 SSD、机箱、散热、电源、联网、远程管理、保修、预装软件、安全加固和部署支持。
- 因此真实企业网关不应按开发板价格报价。

## 当前价格的主要问题

### Pilot: $1,200/mo，Gateway kit from $2,900，25 AI recorders

这个可以成立，但前提是：

- 25 台 recorder 不是免费包含，而是“up to 25 supported recorders”。
- 设备要么另购，要么按月租赁。
- $1,200/mo 包含的 ASR 小时数要有限额，例如 1,000-2,000 小时/月。

建议改为：

- Pilot Platform: $1,200/mo
- Gateway Kit: from $2,900 one-time 或 $250/mo
- AI Recorder: from $149/device 或 $12/device/mo
- Included processing: 1,000 transcription hours/mo

### Business: $3,900/mo，Edge appliance from $7,500，150 AI recorders

这个是最容易被质疑的一档。

如果客户以为 150 台设备包含在 $3,900/月里，那么单设备月收入只有 $26，还要覆盖软件、存储、ASR、支持和硬件折旧，风险很高。

建议改为：

- Business Platform: $3,900/mo
- Edge Appliance: from $7,500 one-time 或 $650/mo
- Recorder Fleet: priced separately
- Included processing: 6,000 transcription hours/mo
- Additional processing: usage-based

### Enterprise: $9,800/mo，Up to 1000 users

Enterprise 价格可以保留，但必须避免暗示“1000 人都能无限录音”。应改成：

- Up to 1000 employee directory users
- Recorder fleet, active capture hours, retention, and model routing scoped separately
- Multi-site HA deployment quoted separately

## 推荐的新报价模型

### 方案一：最适合 Landing Page

| 费用项 | Pilot | Business | Enterprise |
|---|---:|---:|---:|
| Platform subscription | $1,200/mo | $3,900/mo | from $9,800/mo |
| Included users | 100 | 500 | 1000+ |
| Included processing | 1,000 hrs/mo | 6,000 hrs/mo | custom |
| Gateway | from $2,900 | from $7,500 | HA/custom |
| AI Recorders | priced separately | priced separately | priced separately |
| Deployment | remote setup | guided rollout | scoped SOW |

页面上应该写“supports up to X recorders”，而不是让人误解为“includes X recorders”。

### 方案二：硬件租赁打包

适合客户不想一次性买硬件：

- Gateway-as-a-Service: $250-$900/mo/site
- AI Recorder-as-a-Service: $12-$29/device/mo
- Platform: $1,200-$9,800+/mo

优点是客户启动门槛低。缺点是 GMIC 要承担硬件库存、坏机、回收、折旧和押金风控。

### 方案三：合规/安全型高价方案

适合医疗、金融、保险、律师、政府供应商：

- Annual contract only
- Minimum $60k-$150k/year
- Hardware and deployment billed separately
- 强调 audit log、policy review、on-prem routing、customer-owned AI endpoint

这类客户更关心责任边界，不会只拿 Otter/Fireflies 的 seat price 对比。

## 客户端硬件配置建议

### 1. Text Privacy Gateway

适合 MVP 和最快上线。

- ASR 在 recorder、手机、PC 或客户已有服务上完成。
- 网关只处理文本脱敏、PII、关键词、策略路由、审计。
- 硬件可以是 N100/N305 小主机、8-16GB RAM、128GB SSD。
- 成本最低，适合先卖。

### 2. Voice Privacy Gateway

适合 PVOS 的主力版本。

- 网关承担本地 ASR、PII、Privacy Score、缓存、上传控制。
- 建议 x86 mini PC 或 Jetson/边缘 GPU 盒子。
- 16-32GB RAM，512GB SSD 起。
- 每个站点按并发音频路数 sizing，而不是按员工数 sizing。

### 3. Enterprise HA Gateway

适合多站点和强合规客户。

- 双机热备或主备。
- 本地日志审计和 retention policy。
- SSO、VPN、客户云私有 endpoint。
- 单项目报价，不建议页面明码固定。

## 成本控制原则

1. 不按员工总数 sizing，按“活跃录音设备数”和“并发音频路数” sizing。
2. Recorder 不默认包含在平台月费里。
3. 网关不按开发板价格报价，要按企业交付价格报价。
4. ASR/LLM/存储必须有 included usage 和 overage。
5. P3 高敏数据本地保存会增加客户侧存储和支持成本，必须另列 retention 选项。

## 建议修改 Landing Page

当前价格可以保留大方向，但文案应从：

> 150 AI recorders

改为：

> Supports up to 150 AI recorders; recorder fleet priced separately

从：

> Edge appliance from $7,500

改为：

> Required edge appliance from $7,500 per site, or leased from $650/mo

并在价格区下方加一句：

> Platform plans include a monthly processing allowance. Recorder devices, edge appliances, deployment, retention, and overage usage are scoped separately.

## 最终判断

PVOS 的价格不能按普通 AI meeting note 工具来推。它真正卖的是“客户边界内的语音隐私基础设施”。因此价格可以比 Otter/Fireflies 高很多，但前提是报价结构必须像企业基础设施，而不是像单纯 SaaS。

当前 Landing Page 的价格适合占坑，但需要尽快修成“平台费 + 硬件 + 设备 + 用量”的结构，否则被懂采购或懂硬件成本的人一问，就会显得不严谨。
