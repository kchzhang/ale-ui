# Message 消息提示组件

用于显示重要的全局提示信息，通常用于操作反馈或系统通知。

## 基础用法

```vue
<script setup lang="ts">
import { AleMessage } from 'ale-ui';

// 基础调用
AleMessage('这是一条消息提示');

// 不同类型
AleMessage.info('信息提示');
AleMessage.success('操作成功！');
AleMessage.warning('警告信息');
AleMessage.error('发生错误');
</script>
```

## 配置选项

```typescript
interface MessageOptions {
  type?: 'info' | 'success' | 'warning' | 'error';  // 消息类型
  message?: string;                                  // 消息内容
  duration?: number;                                 // 显示时长（毫秒），默认 3000
  closable?: boolean;                                // 是否显示关闭按钮
  icon?: string;                                     // 自定义图标
  showIcon?: boolean;                                // 是否显示图标
  position?: MessagePosition;                        // 消息位置
  customClass?: string;                              // 自定义类名
  dangerouslyUseHTMLString?: boolean;                // 是否支持 HTML
  onClose?: () => void;                              // 关闭回调
}
```

## 全局方法

| 方法 | 说明 | 参数 |
|------|------|------|
| `AleMessage(options \| string)` | 显示消息 | 配置对象或字符串 |
| `AleMessage.info(options \| string)` | 显示信息消息 | 配置对象或字符串 |
| `AleMessage.success(options \| string)` | 显示成功消息 | 配置对象或字符串 |
| `AleMessage.warning(options \| string)` | 显示警告消息 | 配置对象或字符串 |
| `AleMessage.error(options \| string)` | 显示错误消息 | 配置对象或字符串 |
| `AleMessage.closeAll()` | 关闭所有消息 | - |

## 位置选项

- `top` - 顶部居中（默认）
- `top-left` - 顶部左侧
- `top-right` - 顶部右侧
- `bottom` - 底部居中
- `bottom-left` - 底部左侧
- `bottom-right` - 底部右侧

## 文件结构

```
packages/message/
├── types.ts           # 类型定义
├── Message.vue        # 组件实现
├── Message.css        # 样式文件
├── index.ts           # 入口文件
├── __tests__/
│   └── Message.test.ts # 单元测试
└── README.md          # 组件文档
```
