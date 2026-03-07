<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Message 消息提示</h1>
      <p class="component-demo-view__description">
        用于显示重要的全局提示信息，通常用于操作反馈或系统通知
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showBasicMessage">显示消息</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同类型 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同类型</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="showInfo">信息</AleButton>
        <AleButton theme="success" @click="showSuccess">成功</AleButton>
        <AleButton theme="warning" @click="showWarning">警告</AleButton>
        <AleButton theme="danger" @click="showError">错误</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="typeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同位置 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同位置</h2>
      <div class="component-demo-view__demo" style="gap: 16px; flex-wrap: wrap;">
        <AleButton size="small" @click="showAtPosition('top')">顶部居中</AleButton>
        <AleButton size="small" @click="showAtPosition('top-left')">顶部左侧</AleButton>
        <AleButton size="small" @click="showAtPosition('top-right')">顶部右侧</AleButton>
        <AleButton size="small" @click="showAtPosition('bottom')">底部居中</AleButton>
        <AleButton size="small" @click="showAtPosition('bottom-left')">底部左侧</AleButton>
        <AleButton size="small" @click="showAtPosition('bottom-right')">底部右侧</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="positionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可关闭 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可关闭</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showClosable">显示可关闭消息</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="closableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义时长 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义时长</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="showShortDuration">1秒关闭</AleButton>
        <AleButton @click="showLongDuration">10秒关闭</AleButton>
        <AleButton @click="showNoAutoClose">不自动关闭</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="durationCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 隐藏图标 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">隐藏图标</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showNoIcon">无图标消息</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="noIconCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义图标 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义图标</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showCustomIcon">自定义图标</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customIconCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- HTML 内容 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">HTML 内容</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showHTMLContent">HTML 内容</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="htmlCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 关闭回调 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">关闭回调</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showWithCallback">带回调的消息</AleButton>
        <p v-if="callbackMessage" class="callback-message">{{ callbackMessage }}</p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="callbackCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 多次消息 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">多条消息</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="showMultipleMessages">显示多条消息</AleButton>
        <AleButton theme="danger" @click="closeAllMessages">关闭所有</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="multipleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 全局方法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">全局方法</h2>
      <div class="component-demo-view__code">
        <CodeBlock :code="globalMethodCode" language="typescript" title="全局方法类型定义" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, AleMessage } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';
import type { MessagePosition } from 'ale-ui';

const callbackMessage = ref('');

// 基础用法
const showBasicMessage = () => {
  AleMessage('这是一条消息提示');
};

// 不同类型
const showInfo = () => {
  AleMessage.info('这是一条信息提示');
};

const showSuccess = () => {
  AleMessage.success('操作成功！');
};

const showWarning = () => {
  AleMessage.warning('请注意，这是一条警告信息');
};

const showError = () => {
  AleMessage.error('发生错误，请重试');
};

// 不同位置
const showAtPosition = (position: MessagePosition) => {
  AleMessage({
    message: `显示在 ${position}`,
    position,
    duration: 3000
  });
};

// 可关闭
const showClosable = () => {
  AleMessage({
    message: '点击右侧按钮关闭我',
    closable: true,
    duration: 0
  });
};

// 自定义时长
const showShortDuration = () => {
  AleMessage({
    message: '1秒后自动关闭',
    duration: 1000
  });
};

const showLongDuration = () => {
  AleMessage({
    message: '10秒后自动关闭',
    duration: 10000
  });
};

const showNoAutoClose = () => {
  AleMessage({
    message: '我不会自动关闭，请点击关闭按钮',
    closable: true,
    duration: 0
  });
};

// 隐藏图标
const showNoIcon = () => {
  AleMessage({
    message: '这是一条没有图标的消息',
    showIcon: false
  });
};

// 自定义图标
const showCustomIcon = () => {
  AleMessage({
    message: '使用自定义图标',
    icon: '🎉'
  });
};

// HTML 内容
const showHTMLContent = () => {
  AleMessage({
    message: '<strong>粗体文本</strong> 和 <em>斜体文本</em>',
    dangerouslyUseHTMLString: true
  });
};

// 关闭回调
const showWithCallback = () => {
  callbackMessage.value = '';
  AleMessage({
    message: '关闭后会有回调提示',
    closable: true,
    duration: 3000,
    onClose: () => {
      callbackMessage.value = '消息已关闭！';
    }
  });
};

// 多条消息
const showMultipleMessages = () => {
  AleMessage.success('第一条消息');
  setTimeout(() => AleMessage.warning('第二条消息'), 200);
  setTimeout(() => AleMessage.error('第三条消息'), 400);
};

const closeAllMessages = () => {
  AleMessage.closeAll();
};

// 代码示例
const basicCode = `<template>
  <AleButton @click="showBasicMessage">显示消息</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showBasicMessage = () => {
  // 最简单的方式 - 直接传入字符串
  AleMessage('这是一条基础消息提示');
  
  // 或者使用配置对象
  // AleMessage({
  //   message: '这是一条基础消息提示',
  //   type: 'info',
  //   duration: 3000
  // });
};
<\/script>`;

const typeCode = `<template>
  <div class="type-demo">
    <AleButton @click="showInfo">信息</AleButton>
    <AleButton theme="success" @click="showSuccess">成功</AleButton>
    <AleButton theme="warning" @click="showWarning">警告</AleButton>
    <AleButton theme="danger" @click="showError">错误</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

// 信息提示 - 用于展示一般性信息
const showInfo = () => {
  AleMessage.info('这是一条信息提示');
};

// 成功提示 - 用于操作成功的反馈
const showSuccess = () => {
  AleMessage.success('操作成功！');
};

// 警告提示 - 用于提醒用户注意
const showWarning = () => {
  AleMessage.warning('请注意，这是一条警告信息');
};

// 错误提示 - 用于展示错误信息
const showError = () => {
  AleMessage.error('发生错误，请重试');
};
<\/script>

<style scoped>
.type-demo {
  display: flex;
  gap: 12px;
}
<\/style>`;

const positionCode = `<template>
  <div class="position-demo">
    <AleButton size="small" @click="showAtPosition('top')">
      顶部居中
    </AleButton>
    <AleButton size="small" @click="showAtPosition('top-left')">
      顶部左侧
    </AleButton>
    <AleButton size="small" @click="showAtPosition('top-right')">
      顶部右侧
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom')">
      底部居中
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-left')">
      底部左侧
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-right')">
      底部右侧
    </AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';
import type { MessagePosition } from 'ale-ui';

const showAtPosition = (position: MessagePosition) => {
  AleMessage({
    message: \`显示在 \${position}\`,
    position,
    duration: 3000
  });
};
<\/script>`;

const closableCode = `<template>
  <AleButton @click="showClosable">显示可关闭消息</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showClosable = () => {
  AleMessage({
    message: '点击右侧按钮关闭我',
    type: 'info',
    closable: true,
    duration: 0  // 0 表示不自动关闭
  });
};
<\/script>`;

const durationCode = `<template>
  <div class="duration-demo">
    <AleButton @click="showShort">1秒关闭</AleButton>
    <AleButton @click="showLong">10秒关闭</AleButton>
    <AleButton @click="showPermanent">不自动关闭</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

// 1秒后自动关闭
const showShort = () => {
  AleMessage({
    message: '1秒后自动关闭',
    duration: 1000
  });
};

// 10秒后自动关闭
const showLong = () => {
  AleMessage({
    message: '10秒后自动关闭',
    duration: 10000
  });
};

// 不自动关闭，需要手动点击
const showPermanent = () => {
  AleMessage({
    message: '我不会自动关闭，请点击关闭按钮',
    closable: true,
    duration: 0
  });
};
<\/script>`;

const noIconCode = `<template>
  <AleButton @click="showNoIcon">无图标消息</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showNoIcon = () => {
  AleMessage({
    message: '这是一条没有图标的消息，更加简洁',
    showIcon: false
  });
};
<\/script>`;

const customIconCode = `<template>
  <AleButton @click="showCustomIcon">自定义图标</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showCustomIcon = () => {
  AleMessage({
    message: '使用自定义图标',
    icon: '🎉',
    duration: 3000
  });
};
<\/script>`;

const htmlCode = `<template>
  <AleButton @click="showHTML">HTML 内容</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showHTML = () => {
  AleMessage({
    message: '<strong>粗体文本</strong> 和 <em>斜体文本</em>',
    dangerouslyUseHTMLString: true
  });
};
<\/script>

<style>
/* 可以自定义 HTML 内容的样式 */
.ale-message strong {
  color: var(--color-primary);
}
<\/style>`;

const callbackCode = `<template>
  <div class="callback-demo">
    <AleButton @click="showWithCallback">显示消息</AleButton>
    <p v-if="message" class="tip">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, AleMessage } from 'ale-ui';

const message = ref('');

const showWithCallback = () => {
  message.value = '';
  
  AleMessage({
    message: '关闭后会有回调提示',
    closable: true,
    onClose: () => {
      message.value = '消息已关闭！';
      console.log('消息已关闭！');
    }
  });
};
<\/script>

<style scoped>
.tip {
  color: var(--color-success);
  font-size: 14px;
  margin: 0;
}
<\/style>`;

const multipleCode = `<template>
  <div class="multiple-demo">
    <AleButton @click="showMultiple">显示多条消息</AleButton>
    <AleButton theme="danger" @click="closeAll">关闭所有</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

// 显示多条消息，会自动堆叠
const showMultiple = () => {
  AleMessage.success('第一条：操作成功');
  
  setTimeout(() => {
    AleMessage.warning('第二条：请注意警告信息');
  }, 200);
  
  setTimeout(() => {
    AleMessage.error('第三条：发生错误');
  }, 400);
};

// 关闭所有消息
const closeAll = () => {
  AleMessage.closeAll();
};
<\/script>

<style scoped>
.multiple-demo {
  display: flex;
  gap: 12px;
}
<\/style>`;

const globalMethodCode = `// Message 全局方法完整类型定义
import type { MessageOptions, MessageInstance } from 'ale-ui';

// 全局方法类型
interface MessageGlobalMethod {
  // 基础调用 - 传入字符串或配置对象
  (options: MessageOptions | string): MessageInstance;
  
  // 快捷方法 - 显示成功消息
  success: (options: MessageOptions | string) => MessageInstance;
  
  // 快捷方法 - 显示警告消息
  warning: (options: MessageOptions | string) => MessageInstance;
  
  // 快捷方法 - 显示错误消息
  error: (options: MessageOptions | string) => MessageInstance;
  
  // 快捷方法 - 显示信息消息
  info: (options: MessageOptions | string) => MessageInstance;
  
  // 关闭所有消息
  closeAll: () => void;
}

// MessageOptions 配置选项
interface MessageOptions {
  type?: 'info' | 'success' | 'warning' | 'error';  // 消息类型
  message?: string;                                  // 消息内容（必填）
  duration?: number;                                 // 显示时长（毫秒），默认 3000，0 表示不自动关闭
  closable?: boolean;                                // 是否显示关闭按钮，默认 false
  icon?: string;                                     // 自定义图标
  showIcon?: boolean;                                // 是否显示图标，默认 true
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';  // 位置
  customClass?: string;                              // 自定义类名
  dangerouslyUseHTMLString?: boolean;                // 是否支持 HTML，默认 false
  onClose?: () => void;                              // 关闭时的回调函数
}

// MessageInstance 实例方法
interface MessageInstance {
  close: () => void;  // 手动关闭当前消息
}

// 使用示例
import { AleMessage } from 'ale-ui';

// 基础用法
AleMessage('简单消息');

// 完整配置
const instance = AleMessage({
  message: '操作成功',
  type: 'success',
  duration: 5000,
  closable: true,
  position: 'top-right',
  onClose: () => console.log('消息已关闭')
});

// 手动关闭
instance.close();

// 关闭所有消息
AleMessage.closeAll();`;
</script>

<style scoped>
.component-demo-view {
  max-width: 1000px;
  margin: 0 auto;
}

.component-demo-view__header {
  margin-bottom: 48px;
}

.component-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.component-demo-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.component-demo-view__section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.component-demo-view__section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.component-demo-view__code {
  margin-top: 24px;
}

.callback-message {
  color: var(--color-success);
  font-size: 14px;
  margin: 0;
}
</style>
