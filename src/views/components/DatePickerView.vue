<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">DatePicker 日期选择器</h1>
      <p class="component-demo-view__description">
        用于选择或输入日期的组件，支持日期格式化、快捷选择、禁用日期等功能
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker v-model="basicDate" placeholder="选择日期" />
        <span class="demo-value">当前值: {{ basicDate || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 日期格式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">日期格式</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker
          v-model="formatDate"
          format="YYYY年MM月DD日"
          placeholder="选择日期"
        />
        <span class="demo-value">当前值: {{ formatDate || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="formatCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker v-model="sizeDate" size="small" placeholder="小尺寸" />
        <AleDatePicker v-model="sizeDate" size="medium" placeholder="中等尺寸" />
        <AleDatePicker v-model="sizeDate" size="large" placeholder="大尺寸" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同主题</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker v-model="themeDate" theme="primary" placeholder="主要" />
        <AleDatePicker v-model="themeDate" theme="success" placeholder="成功" />
        <AleDatePicker v-model="themeDate" theme="warning" placeholder="警告" />
        <AleDatePicker v-model="themeDate" theme="danger" placeholder="危险" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用日期 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用日期</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker
          v-model="disabledDate"
          :disabled-date="disabledDateFn"
          placeholder="禁用周末"
        />
        <AleDatePicker
          v-model="rangeDate"
          min-date="2024-01-01"
          max-date="2024-12-31"
          placeholder="限制日期范围"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledDateCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 快捷选项 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">快捷选项</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker
          v-model="shortcutDate"
          :shortcuts="shortcuts"
          placeholder="选择日期"
        />
        <span class="demo-value">当前值: {{ shortcutDate || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="shortcutCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可清空</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker v-model="clearableDate" clearable placeholder="可清空" />
        <span class="demo-value">当前值: {{ clearableDate || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clearableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker v-model="disabledDateValue" disabled placeholder="禁用状态" />
        <AleDatePicker v-model="readonlyDateValue" readonly placeholder="只读状态" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledStateCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 日期时间范围选择 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">日期时间范围选择</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker
          v-model="dateTimeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
        />
        <span class="demo-value">
          当前值: {{ dateTimeRange ? `${dateTimeRange[0]} 至 ${dateTimeRange[1]}` : '未选择' }}
        </span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dateTimeRangeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 日期范围选择 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">日期范围选择</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker
          v-model="dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        />
        <span class="demo-value">
          当前值: {{ dateRange ? `${dateRange[0]} 至 ${dateRange[1]}` : '未选择' }}
        </span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dateRangeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 日期时间选择 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">日期时间选择</h2>
      <div class="component-demo-view__demo">
        <AleDatePicker
          v-model="dateTimeValue"
          type="datetime"
          placeholder="选择日期时间"
          format="YYYY-MM-DD HH:mm:ss"
        />
        <span class="demo-value">当前值: {{ dateTimeValue || '未选择' }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dateTimeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- API 说明 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">API 说明</h2>
      <div class="api-section">
        <h3>DatePicker Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>modelValue</td>
              <td>绑定值</td>
              <td>string | Date | [string, string] | [Date, Date]</td>
              <td>''</td>
            </tr>
            <tr>
              <td>type</td>
              <td>选择器类型</td>
              <td>'date' | 'datetime' | 'daterange' | 'datetimerange'</td>
              <td>'date'</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td>占位符</td>
              <td>string</td>
              <td>'请选择日期'</td>
            </tr>
            <tr>
              <td>startPlaceholder</td>
              <td>开始日期占位符（范围选择时）</td>
              <td>string</td>
              <td>'开始日期'</td>
            </tr>
            <tr>
              <td>endPlaceholder</td>
              <td>结束日期占位符（范围选择时）</td>
              <td>string</td>
              <td>'结束日期'</td>
            </tr>
            <tr>
              <td>rangeSeparator</td>
              <td>范围分隔符</td>
              <td>string</td>
              <td>'至'</td>
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
              <td>主题</td>
              <td>'primary' | 'success' | 'warning' | 'danger'</td>
              <td>'primary'</td>
            </tr>
            <tr>
              <td>format</td>
              <td>显示格式</td>
              <td>string</td>
              <td>'YYYY-MM-DD'</td>
            </tr>
            <tr>
              <td>valueFormat</td>
              <td>绑定值格式</td>
              <td>string</td>
              <td>'YYYY-MM-DD'</td>
            </tr>
            <tr>
              <td>minDate</td>
              <td>最小日期</td>
              <td>string | Date</td>
              <td>-</td>
            </tr>
            <tr>
              <td>maxDate</td>
              <td>最大日期</td>
              <td>string | Date</td>
              <td>-</td>
            </tr>
            <tr>
              <td>disabledDate</td>
              <td>禁用日期函数</td>
              <td>(date: Date) => boolean</td>
              <td>-</td>
            </tr>
            <tr>
              <td>shortcuts</td>
              <td>快捷选项</td>
              <td>ShortcutItem[]</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <h3 style="margin-top: 24px;">DatePicker Events</h3>
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
              <td>(value: string | Date)</td>
            </tr>
            <tr>
              <td>change</td>
              <td>日期变化时触发</td>
              <td>(value: Date)</td>
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

        <h3 style="margin-top: 24px;">DatePicker Methods</h3>
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
              <td>清空日期</td>
              <td>-</td>
            </tr>
            <tr>
              <td>open</td>
              <td>打开日期面板</td>
              <td>-</td>
            </tr>
            <tr>
              <td>close</td>
              <td>关闭日期面板</td>
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
import { AleDatePicker } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础用法
const basicDate = ref('');
const basicCode = `<template>
  <AleDatePicker v-model="date" placeholder="选择日期" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date = ref('');
<\/script>`;

// 日期格式
const formatDate = ref('');
const formatCode = `<template>
  <AleDatePicker
    v-model="date"
    format="YYYY年MM月DD日"
    placeholder="选择日期"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date = ref('');
<\/script>`;

// 不同尺寸
const sizeDate = ref('');
const sizeCode = `<template>
  <AleDatePicker v-model="date" size="small" placeholder="小尺寸" />
  <AleDatePicker v-model="date" size="medium" placeholder="中等尺寸" />
  <AleDatePicker v-model="date" size="large" placeholder="大尺寸" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date = ref('');
<\/script>`;

// 不同主题
const themeDate = ref('');
const themeCode = `<template>
  <AleDatePicker v-model="date" theme="primary" placeholder="主要" />
  <AleDatePicker v-model="date" theme="success" placeholder="成功" />
  <AleDatePicker v-model="date" theme="warning" placeholder="警告" />
  <AleDatePicker v-model="date" theme="danger" placeholder="危险" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date = ref('');
<\/script>`;

// 禁用日期
const disabledDate = ref('');
const rangeDate = ref('');
const disabledDateFn = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // 禁用周末
};
const disabledDateCode = `<template>
  <!-- 禁用周末 -->
  <AleDatePicker
    v-model="date1"
    :disabled-date="disabledDateFn"
    placeholder="禁用周末"
  />
  
  <!-- 限制日期范围 -->
  <AleDatePicker
    v-model="date2"
    min-date="2024-01-01"
    max-date="2024-12-31"
    placeholder="限制日期范围"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date1 = ref('');
const date2 = ref('');

const disabledDateFn = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // 禁用周末
};
<\/script>`;

// 快捷选项
const shortcutDate = ref('');
const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    }
  }
];
const shortcutCode = `<template>
  <AleDatePicker
    v-model="date"
    :shortcuts="shortcuts"
    placeholder="选择日期"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date = ref('');

const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    }
  }
];
<\/script>`;

// 可清空
const clearableDate = ref('');
const clearableCode = `<template>
  <AleDatePicker v-model="date" clearable placeholder="可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date = ref('');
<\/script>`;

// 禁用状态
const disabledDateValue = ref('2024-01-15');
const readonlyDateValue = ref('2024-01-15');
const disabledStateCode = `<template>
  <AleDatePicker v-model="date1" disabled placeholder="禁用状态" />
  <AleDatePicker v-model="date2" readonly placeholder="只读状态" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const date1 = ref('2024-01-15');
const date2 = ref('2024-01-15');
<\/script>`;

// 日期时间范围选择
const dateTimeRange = ref<[string, string] | null>(null);
const dateTimeRangeCode = `<template>
  <AleDatePicker
    v-model="dateTimeRange"
    type="datetimerange"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    format="YYYY-MM-DD HH:mm:ss"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const dateTimeRange = ref<[string, string] | null>(null);
<\/script>`;

// 日期范围选择
const dateRange = ref<[string, string] | null>(null);
const dateRangeCode = `<template>
  <AleDatePicker
    v-model="dateRange"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    clearable
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const dateRange = ref<[string, string] | null>(null);
<\/script>`;

// 日期时间选择
const dateTimeValue = ref('');
const dateTimeCode = `<template>
  <AleDatePicker
    v-model="dateTime"
    type="datetime"
    placeholder="选择日期时间"
    format="YYYY-MM-DD HH:mm:ss"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDatePicker } from 'ale-ui';

const dateTime = ref('');
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
  padding: 4px 12px;
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
}

.api-section {
  margin-top: 16px;
}

.api-section h3 {
  font-size: 16px;
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
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.api-table th {
  font-weight: 600;
  color: var(--color-text-primary);
  background-color: var(--color-gray-50);
}

.api-table td {
  color: var(--color-text-regular);
}

.api-table code {
  padding: 2px 6px;
  background-color: var(--color-gray-100);
  border-radius: var(--radius-sm);
  font-family: 'Courier New', monospace;
  font-size: 13px;
}
</style>
