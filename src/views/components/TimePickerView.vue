<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">TimePicker 时间选择器</h1>
      <p class="component-demo-view__description">
        用于选择或输入时间的组件，支持12/24小时制、秒选择等功能
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleTimePicker v-model="basicTime" placeholder="选择时间" />
        <span class="demo-value">当前值: {{ basicTime || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 显示秒 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">显示秒</h2>
      <div class="component-demo-view__demo">
        <AleTimePicker v-model="secondsTime" show-seconds placeholder="选择时间（含秒）" />
        <span class="demo-value">当前值: {{ secondsTime || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="secondsCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 12小时制 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">12小时制</h2>
      <div class="component-demo-view__demo">
        <AleTimePicker v-model="ampmTime" use-12-hours placeholder="选择时间（12小时制）" />
        <span class="demo-value">当前值: {{ ampmTime || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="ampmCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleTimePicker v-model="sizeTime" size="small" placeholder="小尺寸" />
        <AleTimePicker v-model="sizeTime" size="medium" placeholder="中等尺寸" />
        <AleTimePicker v-model="sizeTime" size="large" placeholder="大尺寸" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同主题</h2>
      <div class="component-demo-view__demo">
        <AleTimePicker v-model="themeTime" theme="primary" placeholder="主要" />
        <AleTimePicker v-model="themeTime" theme="success" placeholder="成功" />
        <AleTimePicker v-model="themeTime" theme="warning" placeholder="警告" />
        <AleTimePicker v-model="themeTime" theme="danger" placeholder="危险" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可清空</h2>
      <div class="component-demo-view__demo">
        <AleTimePicker v-model="clearableTime" clearable placeholder="可清空" />
        <span class="demo-value">当前值: {{ clearableTime || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clearableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleTimePicker v-model="disabledTime" disabled placeholder="禁用状态" />
        <AleTimePicker v-model="readonlyTime" readonly placeholder="只读状态" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- API 说明 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">API 说明</h2>
      <div class="api-section">
        <h3>TimePicker Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>modelValue</td>
              <td>绑定值，格式为 HH:mm:ss</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td>占位符</td>
              <td>string</td>
              <td>'请选择时间'</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>readonly</td>
              <td>是否只读</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>clearable</td>
              <td>是否可清空</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>尺寸</td>
              <td>'small' | 'medium' | 'large'</td>
              <td>'medium'</td>
            </tr>
            <tr>
              <td>theme</td>
              <td>主题色</td>
              <td>'primary' | 'success' | 'warning' | 'danger'</td>
              <td>'primary'</td>
            </tr>
            <tr>
              <td>showSeconds</td>
              <td>是否显示秒</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>use12Hours</td>
              <td>是否使用12小时制</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>TimePicker Events</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>update:modelValue</td>
              <td>值变化时触发</td>
              <td>(value: string)</td>
            </tr>
            <tr>
              <td>change</td>
              <td>选择时间后触发</td>
              <td>(value: string)</td>
            </tr>
            <tr>
              <td>focus</td>
              <td>获得焦点时触发</td>
              <td>(event: FocusEvent)</td>
            </tr>
            <tr>
              <td>blur</td>
              <td>失去焦点时触发</td>
              <td>(event: FocusEvent)</td>
            </tr>
            <tr>
              <td>clear</td>
              <td>清空时触发</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>TimePicker Methods</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>focus</td>
              <td>使输入框获得焦点</td>
              <td>-</td>
            </tr>
            <tr>
              <td>blur</td>
              <td>使输入框失去焦点</td>
              <td>-</td>
            </tr>
            <tr>
              <td>clear</td>
              <td>清空时间值</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const basicTime = ref('');
const secondsTime = ref('');
const ampmTime = ref('');
const sizeTime = ref('');
const themeTime = ref('');
const clearableTime = ref('10:30:00');
const disabledTime = ref('12:00:00');
const readonlyTime = ref('15:30:00');

const basicCode = `<template>
  <AleTimePicker v-model="time" placeholder="选择时间" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';

const time = ref('');
<\/script>`;

const secondsCode = `<template>
  <AleTimePicker v-model="time" show-seconds placeholder="选择时间（含秒）" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';

const time = ref('');
<\/script>`;

const ampmCode = `<template>
  <AleTimePicker v-model="time" use-12-hours placeholder="选择时间（12小时制）" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';

const time = ref('');
<\/script>`;

const sizeCode = `<template>
  <AleTimePicker v-model="time" size="small" placeholder="小尺寸" />
  <AleTimePicker v-model="time" size="medium" placeholder="中等尺寸" />
  <AleTimePicker v-model="time" size="large" placeholder="大尺寸" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';

const time = ref('');
<\/script>`;

const themeCode = `<template>
  <AleTimePicker v-model="time" theme="primary" placeholder="主要" />
  <AleTimePicker v-model="time" theme="success" placeholder="成功" />
  <AleTimePicker v-model="time" theme="warning" placeholder="警告" />
  <AleTimePicker v-model="time" theme="danger" placeholder="危险" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';

const time = ref('');
<\/script>`;

const clearableCode = `<template>
  <AleTimePicker v-model="time" clearable placeholder="可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';

const time = ref('10:30:00');
<\/script>`;

const disabledCode = `<template>
  <AleTimePicker v-model="disabledTime" disabled placeholder="禁用状态" />
  <AleTimePicker v-model="readonlyTime" readonly placeholder="只读状态" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTimePicker } from 'ale-ui';

const disabledTime = ref('12:00:00');
const readonlyTime = ref('15:30:00');
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

.demo-value {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.api-section {
  margin-bottom: 32px;
}

.api-section:last-child {
  margin-bottom: 0;
}

.api-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.api-table th,
.api-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.api-table th {
  background: var(--color-bg-secondary);
  font-weight: 600;
  color: var(--color-text-primary);
}

.api-table td {
  color: var(--color-text-secondary);
}

.api-table code {
  padding: 2px 6px;
  background: var(--color-bg-secondary);
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  color: var(--color-primary);
}
</style>
