<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Switch 开关</h1>
      <p class="component-demo-view__description">
        开关用于在两种状态间切换，表示开/关、是/否等互斥选项
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleSwitch v-model="basicValue" />
        <span class="demo-value">当前状态: {{ basicValue ? '开启' : '关闭' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo" style="gap: 24px;">
        <div class="demo-item">
          <AleSwitch v-model="sizeSmall" size="small" />
          <span class="demo-label">small</span>
        </div>
        <div class="demo-item">
          <AleSwitch v-model="sizeMedium" size="medium" />
          <span class="demo-label">medium</span>
        </div>
        <div class="demo-item">
          <AleSwitch v-model="sizeLarge" size="large" />
          <span class="demo-label">large</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同主题</h2>
      <div class="component-demo-view__demo" style="gap: 24px;">
        <div class="demo-item">
          <AleSwitch v-model="themePrimary" theme="primary" />
          <span class="demo-label">primary</span>
        </div>
        <div class="demo-item">
          <AleSwitch v-model="themeSuccess" theme="success" />
          <span class="demo-label">success</span>
        </div>
        <div class="demo-item">
          <AleSwitch v-model="themeWarning" theme="warning" />
          <span class="demo-label">warning</span>
        </div>
        <div class="demo-item">
          <AleSwitch v-model="themeDanger" theme="danger" />
          <span class="demo-label">danger</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带文字和图标 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带文字描述</h2>
      <div class="component-demo-view__demo" style="gap: 24px;">
        <AleSwitch
          v-model="textValue1"
          active-text="开启"
          inactive-text="关闭"
        />
        <AleSwitch
          v-model="textValue2"
          active-text="ON"
          inactive-text="OFF"
          theme="success"
        />
        <AleSwitch
          v-model="textValue3"
          active-text="已启用"
          inactive-text="已禁用"
          size="large"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="textCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo" style="gap: 24px;">
        <div class="demo-item">
          <AleSwitch v-model="disabledOn" disabled />
          <span class="demo-label">禁用-开启</span>
        </div>
        <div class="demo-item">
          <AleSwitch v-model="disabledOff" disabled />
          <span class="demo-label">禁用-关闭</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">加载状态</h2>
      <div class="component-demo-view__demo" style="gap: 24px;">
        <div class="demo-item">
          <AleSwitch v-model="loadingOn" loading />
          <span class="demo-label">加载中-开启</span>
        </div>
        <div class="demo-item">
          <AleSwitch v-model="loadingOff" loading />
          <span class="demo-label">加载中-关闭</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="loadingCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义颜色</h2>
      <div class="component-demo-view__demo" style="gap: 24px;">
        <div class="demo-item">
          <AleSwitch
            v-model="customColor1"
            active-color="#8B5CF6"
            inactive-color="#E5E7EB"
          />
          <span class="demo-label">紫色主题</span>
        </div>
        <div class="demo-item">
          <AleSwitch
            v-model="customColor2"
            active-color="#F59E0B"
            inactive-color="#D1D5DB"
          />
          <span class="demo-label">橙色主题</span>
        </div>
        <div class="demo-item">
          <AleSwitch
            v-model="customColor3"
            active-color="#EC4899"
            inactive-color="#E5E7EB"
          />
          <span class="demo-label">粉色主题</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customColorCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 异步操作 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">异步操作</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start; gap: 16px;">
        <p style="margin: 0; color: var(--color-text-secondary);">
          点击开关会模拟异步请求，请求期间显示 loading 状态
        </p>
        <AleSwitch
          v-model="asyncValue"
          :loading="isLoading"
          active-text="已连接"
          inactive-text="已断开"
          @change="handleAsyncChange"
        />
        <p v-if="asyncMessage" :class="['async-message', asyncValue ? 'success' : 'info']">
          {{ asyncMessage }}
        </p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="asyncCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 表单应用 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">表单应用</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <div class="form-demo">
          <div class="form-item">
            <span class="form-label">消息通知：</span>
            <AleSwitch v-model="formData.notifications" active-text="开启" inactive-text="关闭" />
          </div>
          <div class="form-item">
            <span class="form-label">自动保存：</span>
            <AleSwitch v-model="formData.autoSave" theme="success" />
          </div>
          <div class="form-item">
            <span class="form-label">夜间模式：</span>
            <AleSwitch v-model="formData.darkMode" theme="warning" />
          </div>
          <div class="form-item">
            <span class="form-label">隐私模式：</span>
            <AleSwitch v-model="formData.privacy" theme="danger" />
          </div>
          <div class="form-result">
            <p>表单数据：</p>
            <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="formCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 事件监听 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">事件监听</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start; gap: 16px;">
        <AleSwitch
          v-model="eventValue"
          active-text="开启"
          inactive-text="关闭"
          @change="handleChange"
          @click="handleClick"
        />
        <div class="event-log">
          <p>事件记录：</p>
          <ul>
            <li v-for="(log, index) in eventLogs" :key="index" class="event-log-item">
              {{ log }}
            </li>
          </ul>
          <AleButton v-if="eventLogs.length > 0" size="small" @click="clearLogs">
            清空记录
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="eventCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AleSwitch, AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础用法
const basicValue = ref(true);

// 尺寸示例
const sizeSmall = ref(true);
const sizeMedium = ref(true);
const sizeLarge = ref(true);

// 主题示例
const themePrimary = ref(true);
const themeSuccess = ref(true);
const themeWarning = ref(true);
const themeDanger = ref(true);

// 文本示例
const textValue1 = ref(true);
const textValue2 = ref(false);
const textValue3 = ref(true);

// 禁用示例
const disabledOn = ref(true);
const disabledOff = ref(false);

// 加载示例
const loadingOn = ref(true);
const loadingOff = ref(false);

// 自定义颜色示例
const customColor1 = ref(true);
const customColor2 = ref(false);
const customColor3 = ref(true);

// 异步操作示例
const asyncValue = ref(false);
const isLoading = ref(false);
const asyncMessage = ref('');

const handleAsyncChange = async (value: boolean) => {
  isLoading.value = true;
  asyncMessage.value = value ? '正在连接...' : '正在断开...';
  
  // 模拟异步请求
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  asyncMessage.value = value ? '连接成功！' : '已断开连接';
  isLoading.value = false;
  
  // 3秒后清除消息
  setTimeout(() => {
    asyncMessage.value = '';
  }, 3000);
};

// 表单示例
const formData = reactive({
  notifications: true,
  autoSave: false,
  darkMode: false,
  privacy: true
});

// 事件示例
const eventValue = ref(false);
const eventLogs = ref<string[]>([]);

const handleChange = (value: boolean) => {
  const time = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${time}] change 事件: ${value}`);
};

const handleClick = () => {
  const time = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${time}] click 事件`);
};

const clearLogs = () => {
  eventLogs.value = [];
};

// 代码示例
const basicCode = `<template>
  <AleSwitch v-model="value" />
  <span>当前状态: {{ value ? '开启' : '关闭' }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value = ref(true);
<\/script>`;

const sizeCode = `<template>
  <AleSwitch v-model="value1" size="small" />
  <AleSwitch v-model="value2" size="medium" />
  <AleSwitch v-model="value3" size="large" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
<\/script>`;

const themeCode = `<template>
  <AleSwitch v-model="value1" theme="primary" />
  <AleSwitch v-model="value2" theme="success" />
  <AleSwitch v-model="value3" theme="warning" />
  <AleSwitch v-model="value4" theme="danger" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
const value4 = ref(true);
<\/script>`;

const textCode = `<template>
  <AleSwitch
    v-model="value1"
    active-text="开启"
    inactive-text="关闭"
  />
  <AleSwitch
    v-model="value2"
    active-text="ON"
    inactive-text="OFF"
    theme="success"
  />
  <AleSwitch
    v-model="value3"
    active-text="已启用"
    inactive-text="已禁用"
    size="large"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
const value3 = ref(true);
<\/script>`;

const disabledCode = `<template>
  <AleSwitch v-model="value1" disabled />
  <AleSwitch v-model="value2" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
<\/script>`;

const loadingCode = `<template>
  <AleSwitch v-model="value1" loading />
  <AleSwitch v-model="value2" loading />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
<\/script>`;

const customColorCode = `<template>
  <AleSwitch
    v-model="value1"
    active-color="#8B5CF6"
    inactive-color="#E5E7EB"
  />
  <AleSwitch
    v-model="value2"
    active-color="#F59E0B"
    inactive-color="#D1D5DB"
  />
  <AleSwitch
    v-model="value3"
    active-color="#EC4899"
    inactive-color="#E5E7EB"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
const value3 = ref(true);
<\/script>`;

const asyncCode = `<template>
  <AleSwitch
    v-model="value"
    :loading="isLoading"
    active-text="已连接"
    inactive-text="已断开"
    @change="handleChange"
  />
  <p v-if="message">{{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value = ref(false);
const isLoading = ref(false);
const message = ref('');

const handleChange = async (val: boolean) => {
  isLoading.value = true;
  message.value = val ? '正在连接...' : '正在断开...';
  
  // 模拟异步请求
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  message.value = val ? '连接成功！' : '已断开连接';
  isLoading.value = false;
};
<\/script>`;

const formCode = `<template>
  <div class="form-demo">
    <div class="form-item">
      <span>消息通知：</span>
      <AleSwitch v-model="form.notifications" />
    </div>
    <div class="form-item">
      <span>自动保存：</span>
      <AleSwitch v-model="form.autoSave" theme="success" />
    </div>
    <div class="form-item">
      <span>夜间模式：</span>
      <AleSwitch v-model="form.darkMode" theme="warning" />
    </div>
    <div class="form-item">
      <span>隐私模式：</span>
      <AleSwitch v-model="form.privacy" theme="danger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { AleSwitch } from 'ale-ui';

const form = reactive({
  notifications: true,
  autoSave: false,
  darkMode: false,
  privacy: true
});
<\/script>`;

const eventCode = `<template>
  <AleSwitch
    v-model="value"
    @change="handleChange"
    @click="handleClick"
  />
  <ul>
    <li v-for="(log, index) in logs" :key="index">
      {{ log }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value = ref(false);
const logs = ref<string[]>([]);

const handleChange = (val: boolean) => {
  logs.value.unshift(\`change 事件: \${val}\`);
};

const handleClick = () => {
  logs.value.unshift('click 事件');
};
<\/script>`;
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

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.demo-value {
  margin-left: 16px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.form-demo {
  width: 100%;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.form-label {
  min-width: 80px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-result {
  margin-top: 24px;
  padding: 16px;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
}

.form-result p {
  margin: 0 0 8px 0;
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-result pre {
  margin: 0;
  padding: 12px;
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text-secondary);
  overflow-x: auto;
}

.event-log {
  width: 100%;
  max-width: 400px;
}

.event-log p {
  margin: 0 0 8px 0;
  font-weight: 500;
  color: var(--color-text-primary);
}

.event-log ul {
  margin: 0 0 12px 0;
  padding: 0;
  list-style: none;
  max-height: 150px;
  overflow-y: auto;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  padding: 12px;
}

.event-log-item {
  padding: 4px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border-light);
}

.event-log-item:last-child {
  border-bottom: none;
}

.async-message {
  margin: 0;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: all 0.3s ease;
}

.async-message.success {
  background: var(--color-success-100);
  color: var(--color-success);
}

.async-message.info {
  background: var(--color-gray-100);
  color: var(--color-text-secondary);
}
</style>
