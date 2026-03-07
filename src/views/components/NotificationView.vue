<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Notification 通知</h1>
      <p class="component-demo-view__description">
        悬浮出现在页面角落，显示全局的通知提醒消息
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showBasicNotification">显示通知</AleButton>
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
        <AleButton size="small" @click="showAtPosition('top-right')">右上角</AleButton>
        <AleButton size="small" @click="showAtPosition('top-left')">左上角</AleButton>
        <AleButton size="small" @click="showAtPosition('bottom-right')">右下角</AleButton>
        <AleButton size="small" @click="showAtPosition('bottom-left')">左下角</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="positionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带标题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带标题的通知</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showWithTitle">显示带标题通知</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="titleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义时长 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义时长</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="showShortDuration">2秒关闭</AleButton>
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
        <AleButton @click="showNoIcon">无图标通知</AleButton>
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

    <!-- 进度条 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">显示进度条</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showWithProgress">带进度条的通知</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="progressCode" language="vue" title="示例代码" />
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
        <AleButton @click="showWithCallback">带回调的通知</AleButton>
        <p v-if="callbackMessage" class="callback-message">{{ callbackMessage }}</p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="callbackCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 点击回调 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">点击回调</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="showWithClickCallback">点击通知触发回调</AleButton>
        <p v-if="clickMessage" class="callback-message">{{ clickMessage }}</p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clickCallbackCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 多条通知 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">多条通知</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="showMultipleNotifications">显示多条通知</AleButton>
        <AleButton theme="danger" @click="closeAllNotifications">关闭所有</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="multipleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- API 文档 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">API</h2>
      <div class="component-demo-view__code">
        <CodeBlock :code="apiCode" language="typescript" title="全局方法类型定义" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, Notification as AleNotification } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';
import type { NotificationPosition } from 'ale-ui';

const callbackMessage = ref('');
const clickMessage = ref('');

// 基础用法
const showBasicNotification = () => {
  AleNotification({
    message: '这是一条基础通知消息'
  });
};

// 不同类型
const showInfo = () => {
  AleNotification.info('这是一条信息通知');
};

const showSuccess = () => {
  AleNotification.success({
    title: '成功',
    message: '您的操作已成功完成！'
  });
};

const showWarning = () => {
  AleNotification.warning({
    title: '警告',
    message: '请注意，这是一条警告信息'
  });
};

const showError = () => {
  AleNotification.error({
    title: '错误',
    message: '发生错误，请稍后重试'
  });
};

// 不同位置
const showAtPosition = (position: NotificationPosition) => {
  const positionText: Record<NotificationPosition, string> = {
    'top-right': '右上角',
    'top-left': '左上角',
    'bottom-right': '右下角',
    'bottom-left': '左下角'
  };

  AleNotification({
    title: positionText[position],
    message: `通知显示在 ${positionText[position]}`,
    position,
    type: 'info'
  });
};

// 带标题
const showWithTitle = () => {
  AleNotification({
    title: '通知标题',
    message: '这是通知的详细内容，可以包含较长的描述性文字。',
    type: 'success'
  });
};

// 自定义时长
const showShortDuration = () => {
  AleNotification({
    title: '短暂显示',
    message: '这条通知将在 2 秒后自动关闭',
    duration: 2000
  });
};

const showLongDuration = () => {
  AleNotification({
    title: '长时间显示',
    message: '这条通知将在 10 秒后自动关闭',
    duration: 10000
  });
};

const showNoAutoClose = () => {
  AleNotification({
    title: '不自动关闭',
    message: '这条通知不会自动关闭，需要手动点击关闭按钮',
    duration: 0
  });
};

// 隐藏图标
const showNoIcon = () => {
  AleNotification({
    title: '无图标通知',
    message: '这是一条没有图标的通知，更加简洁',
    showIcon: false
  });
};

// 自定义图标
const showCustomIcon = () => {
  AleNotification({
    title: '自定义图标',
    message: '使用自定义图标（Emoji）',
    icon: '🎉',
    type: 'success'
  });
};

// 进度条
const showWithProgress = () => {
  AleNotification({
    title: '进度条示例',
    message: '这条通知显示进度条，指示自动关闭的剩余时间',
    showProgress: true,
    duration: 5000
  });
};

// HTML 内容
const showHTMLContent = () => {
  AleNotification({
    title: 'HTML 内容',
    message: '<strong>这是粗体文本</strong><br/><em>这是斜体文本</em>',
    dangerouslyUseHTMLString: true
  });
};

// 关闭回调
const showWithCallback = () => {
  callbackMessage.value = '';
  AleNotification({
    title: '回调示例',
    message: '关闭后会有回调提示',
    onClose: () => {
      callbackMessage.value = '通知已关闭！';
    }
  });
};

// 点击回调
const showWithClickCallback = () => {
  clickMessage.value = '';
  AleNotification({
    title: '点击示例',
    message: '点击此通知会触发回调',
    onClick: () => {
      clickMessage.value = '通知被点击了！';
    }
  });
};

// 多条通知
const showMultipleNotifications = () => {
  AleNotification.success({
    title: '第一条',
    message: '操作成功'
  });

  setTimeout(() => {
    AleNotification.warning({
      title: '第二条',
      message: '请注意警告信息'
    });
  }, 200);

  setTimeout(() => {
    AleNotification.info({
      title: '第三条',
      message: '这是一条信息通知'
    });
  }, 400);
};

const closeAllNotifications = () => {
  AleNotification.closeAll();
};

// 代码示例
const basicCode = `<template>
  <AleButton @click="showNotification">显示通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showNotification = () => {
  // 简单调用
  AleNotification('这是一条通知消息');
  
  // 或使用配置对象
  AleNotification({
    message: '这是一条通知消息',
    type: 'info',
    duration: 4500
  });
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
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showInfo = () => {
  AleNotification.info('这是一条信息通知');
};

const showSuccess = () => {
  AleNotification.success({
    title: '成功',
    message: '您的操作已成功完成！'
  });
};

const showWarning = () => {
  AleNotification.warning({
    title: '警告',
    message: '请注意，这是一条警告信息'
  });
};

const showError = () => {
  AleNotification.error({
    title: '错误',
    message: '发生错误，请稍后重试'
  });
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
    <AleButton size="small" @click="showAtPosition('top-right')">
      右上角
    </AleButton>
    <AleButton size="small" @click="showAtPosition('top-left')">
      左上角
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-right')">
      右下角
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-left')">
      左下角
    </AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';
import type { NotificationPosition } from 'ale-ui';

const showAtPosition = (position: NotificationPosition) => {
  AleNotification({
    title: '位置示例',
    message: \`通知显示在 \${position}\`,
    position,
    type: 'info'
  });
};
<\/script>`;

const titleCode = `<template>
  <AleButton @click="showWithTitle">显示带标题通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showWithTitle = () => {
  AleNotification({
    title: '通知标题',
    message: '这是通知的详细内容，可以包含较长的描述性文字。',
    type: 'success'
  });
};
<\/script>`;

const durationCode = `<template>
  <div class="duration-demo">
    <AleButton @click="showShort">2秒关闭</AleButton>
    <AleButton @click="showLong">10秒关闭</AleButton>
    <AleButton @click="showPermanent">不自动关闭</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

// 2秒后自动关闭
const showShort = () => {
  AleNotification({
    message: '2秒后自动关闭',
    duration: 2000
  });
};

// 10秒后自动关闭
const showLong = () => {
  AleNotification({
    message: '10秒后自动关闭',
    duration: 10000
  });
};

// 不自动关闭，需要手动点击
const showPermanent = () => {
  AleNotification({
    title: '不自动关闭',
    message: '这条通知不会自动关闭',
    duration: 0
  });
};
<\/script>`;

const noIconCode = `<template>
  <AleButton @click="showNoIcon">无图标通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showNoIcon = () => {
  AleNotification({
    message: '这是一条没有图标的通知',
    showIcon: false
  });
};
<\/script>`;

const customIconCode = `<template>
  <AleButton @click="showCustomIcon">自定义图标</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showCustomIcon = () => {
  AleNotification({
    title: '自定义图标',
    message: '使用 Emoji 作为图标',
    icon: '🎉',
    type: 'success'
  });
};
<\/script>`;

const progressCode = `<template>
  <AleButton @click="showWithProgress">带进度条的通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showWithProgress = () => {
  AleNotification({
    title: '进度条示例',
    message: '显示自动关闭的剩余时间',
    showProgress: true,
    duration: 5000
  });
};
<\/script>`;

const htmlCode = `<template>
  <AleButton @click="showHTML">HTML 内容</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showHTML = () => {
  AleNotification({
    title: 'HTML 内容',
    message: '<strong>粗体</strong> 和 <em>斜体</em>',
    dangerouslyUseHTMLString: true
  });
};
<\/script>`;

const callbackCode = `<template>
  <div class="callback-demo">
    <AleButton @click="showWithCallback">显示通知</AleButton>
    <p v-if="message" class="tip">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, Notification as AleNotification } from 'ale-ui';

const message = ref('');

const showWithCallback = () => {
  message.value = '';
  
  AleNotification({
    title: '回调示例',
    message: '关闭后会有回调提示',
    onClose: () => {
      message.value = '通知已关闭！';
    }
  });
};
<\/script>

<style scoped>
.tip {
  color: var(--color-success);
  font-size: 14px;
}
<\/style>`;

const clickCallbackCode = `<template>
  <div class="click-demo">
    <AleButton @click="showWithClick">显示通知</AleButton>
    <p v-if="message" class="tip">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, Notification as AleNotification } from 'ale-ui';

const message = ref('');

const showWithClick = () => {
  message.value = '';
  
  AleNotification({
    title: '点击示例',
    message: '点击此通知触发回调',
    onClick: () => {
      message.value = '通知被点击了！';
    }
  });
};
<\/script>`;

const multipleCode = `<template>
  <div class="multiple-demo">
    <AleButton @click="showMultiple">显示多条通知</AleButton>
    <AleButton theme="danger" @click="closeAll">关闭所有</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showMultiple = () => {
  AleNotification.success({ title: '第一条', message: '操作成功' });
  
  setTimeout(() => {
    AleNotification.warning({ title: '第二条', message: '警告信息' });
  }, 200);
  
  setTimeout(() => {
    AleNotification.info({ title: '第三条', message: '信息通知' });
  }, 400);
};

const closeAll = () => {
  AleNotification.closeAll();
};
<\/script>

<style scoped>
.multiple-demo {
  display: flex;
  gap: 12px;
}
<\/style>`;

const apiCode = `// Notification 全局方法完整类型定义
import type { NotificationOptions, NotificationInstance } from 'ale-ui';

// 全局方法类型
interface NotificationGlobalMethod {
  // 基础调用 - 传入字符串或配置对象
  (options: NotificationOptions | string): NotificationInstance;
  
  // 快捷方法 - 显示成功通知
  success: (options: NotificationOptions | string) => NotificationInstance;
  
  // 快捷方法 - 显示警告通知
  warning: (options: NotificationOptions | string) => NotificationInstance;
  
  // 快捷方法 - 显示错误通知
  error: (options: NotificationOptions | string) => NotificationInstance;
  
  // 快捷方法 - 显示信息通知
  info: (options: NotificationOptions | string) => NotificationInstance;
  
  // 关闭所有通知
  closeAll: () => void;
}

// NotificationOptions 配置选项
interface NotificationOptions {
  type?: 'info' | 'success' | 'warning' | 'error';     // 通知类型
  title?: string;                                      // 通知标题
  message?: string;                                    // 通知内容（必填）
  duration?: number;                                   // 显示时长（毫秒），默认 4500，0 表示不自动关闭
  closable?: boolean;                                  // 是否显示关闭按钮，默认 true
  icon?: string;                                       // 自定义图标
  showIcon?: boolean;                                  // 是否显示图标，默认 true
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';  // 位置，默认 top-right
  customClass?: string;                                // 自定义类名
  dangerouslyUseHTMLString?: boolean;                  // 是否支持 HTML，默认 false
  showProgress?: boolean;                              // 是否显示进度条，默认 false
  onClose?: () => void;                                // 关闭时的回调函数
  onClick?: () => void;                                // 点击时的回调函数
}

// NotificationInstance 实例方法
interface NotificationInstance {
  close: () => void;  // 手动关闭当前通知
}

// 使用示例
import { Notification as AleNotification } from 'ale-ui';

// 基础用法
AleNotification('简单通知');

// 完整配置
const instance = AleNotification({
  title: '通知标题',
  message: '通知内容',
  type: 'success',
  duration: 5000,
  position: 'top-right',
  onClose: () => console.log('通知已关闭')
});

// 手动关闭
instance.close();

// 关闭所有通知
AleNotification.closeAll();`;
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