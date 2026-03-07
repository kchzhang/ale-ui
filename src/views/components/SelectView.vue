<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Select 选择器</h1>
      <p class="component-demo-view__description">
        当选项过多时，使用下拉菜单展示并选择内容。支持单选、多选、搜索、虚拟滚动等高级特性。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="basicValue"
          :options="basicOptions"
          placeholder="请选择"
        />
        <span class="demo-value">选中值: {{ basicValue }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="sizeValue"
          :options="basicOptions"
          size="large"
          placeholder="大尺寸"
        />
        <AleSelect
          v-model="sizeValue"
          :options="basicOptions"
          size="medium"
          placeholder="中尺寸"
        />
        <AleSelect
          v-model="sizeValue"
          :options="basicOptions"
          size="small"
          placeholder="小尺寸"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="disabledValue"
          :options="basicOptions"
          disabled
          placeholder="禁用状态"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可清空</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="clearableValue"
          :options="basicOptions"
          clearable
          placeholder="可清空"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clearableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 多选模式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">多选模式</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="multipleValue"
          :options="basicOptions"
          multiple
          clearable
          placeholder="请选择"
        />
        <span class="demo-value">选中值: {{ multipleValue }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="multipleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 多选折叠 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">多选折叠</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="collapseValue"
          :options="fruitOptions"
          multiple
          :max-collapse-tags="2"
          placeholder="最多显示2个标签"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="collapseCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可搜索 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可搜索</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="filterableValue"
          :options="fruitOptions"
          filterable
          clearable
          placeholder="请选择或搜索"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="filterableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 远程搜索 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">远程搜索</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="remoteValue"
          :options="remoteOptions"
          filterable
          :loading="remoteLoading"
          @remote-method="remoteMethod"
          placeholder="请输入关键词搜索"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="remoteCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 创建新条目 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">创建新条目</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="createValue"
          :options="createOptions"
          filterable
          allow-create
          @create="handleCreate"
          placeholder="请选择或输入"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="createCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 虚拟滚动 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">虚拟滚动</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="virtualValue"
          :options="virtualOptions"
          virtual-scroll
          :visible-count="8"
          :item-height="34"
          filterable
          placeholder="从10000条数据中搜索"
        />
        <span class="demo-value">选中值: {{ virtualValue }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="virtualCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带禁用选项 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带禁用选项</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="disableOptionValue"
          :options="disabledOptions"
          placeholder="请选择"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledOptionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 事件监听 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">事件监听</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          v-model="eventValue"
          :options="basicOptions"
          clearable
          placeholder="请选择"
          @change="handleChange"
          @visible-change="handleVisibleChange"
          @clear="handleClear"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="event-log">
        <h4>事件日志:</h4>
        <ul>
          <li v-for="(log, index) in eventLogs" :key="index" class="log-item">
            {{ log }}
          </li>
        </ul>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="eventCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 方法调用 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">方法调用</h2>
      <div class="component-demo-view__demo">
        <AleSelect
          ref="methodSelectRef"
          v-model="methodValue"
          :options="basicOptions"
          placeholder="请选择"
        />
        <div class="demo-buttons">
          <button class="demo-btn" @click="handleMethodFocus">聚焦</button>
          <button class="demo-btn" @click="handleMethodBlur">失焦</button>
          <button class="demo-btn" @click="handleMethodClear">清空</button>
          <button class="demo-btn" @click="handleMethodOpen">打开下拉</button>
          <button class="demo-btn" @click="handleMethodClose">关闭下拉</button>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="methodCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleSelect } from 'ale-ui';
import type { SelectOption, SelectExpose } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础选项
const basicOptions = ref<SelectOption[]>([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]);

// 水果选项
const fruitOptions = ref<SelectOption[]>([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
  { label: '西瓜', value: 'watermelon' },
  { label: '草莓', value: 'strawberry' },
  { label: '芒果', value: 'mango' },
  { label: '梨', value: 'pear' }
]);

// 基础用法
const basicValue = ref('');

// 不同尺寸
const sizeValue = ref('');

// 禁用状态
const disabledValue = ref('1');

// 可清空
const clearableValue = ref('1');

// 多选
const multipleValue = ref<string[]>(['1', '2']);

// 多选折叠
const collapseValue = ref<string[]>(['apple', 'banana', 'orange', 'grape']);

// 可搜索
const filterableValue = ref('');

// 远程搜索
const remoteValue = ref('');
const remoteOptions = ref<SelectOption[]>([]);
const remoteLoading = ref(false);
const allCities = [
  '北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '武汉',
  '西安', '重庆', '天津', '苏州', '郑州', '长沙', '青岛', '大连',
  '厦门', '宁波', '无锡', '佛山', '东莞', '沈阳', '昆明', '合肥'
];

const remoteMethod = (query: string) => {
  if (query) {
    remoteLoading.value = true;
    setTimeout(() => {
      remoteOptions.value = allCities
        .filter(city => city.includes(query))
        .map(city => ({ label: city, value: city }));
      remoteLoading.value = false;
    }, 500);
  } else {
    remoteOptions.value = [];
  }
};

// 创建新条目
const createValue = ref('');
const createOptions = ref<SelectOption[]>([
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'javascript' }
]);

const handleCreate = (value: string) => {
  const newOption = { label: value, value: value.toLowerCase() };
  createOptions.value.push(newOption);
  createValue.value = newOption.value;
};

// 虚拟滚动
const virtualValue = ref('');
const virtualOptions = computed(() => {
  return Array.from({ length: 10000 }, (_, i) => ({
    label: `选项 ${i + 1}`,
    value: String(i + 1)
  }));
});

// 禁用选项
const disabledOptions = ref<SelectOption[]>([
  { label: '可用选项1', value: '1' },
  { label: '可用选项2', value: '2' },
  { label: '禁用选项', value: '3', disabled: true },
  { label: '可用选项3', value: '4' }
]);
const disableOptionValue = ref('');

// 事件监听
const eventValue = ref('');
const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
  const time = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${time}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};

const handleChange = (value: unknown) => {
  addLog(`change: ${JSON.stringify(value)}`);
};

const handleVisibleChange = (visible: boolean) => {
  addLog(`visible-change: ${visible}`);
};

const handleClear = () => {
  addLog('clear');
};

const handleFocus = () => {
  addLog('focus');
};

const handleBlur = () => {
  addLog('blur');
};

// 方法调用 - 使用类型安全的 ref
const methodSelectRef = ref<SelectExpose>();
const methodValue = ref('');

/**
 * 聚焦选择器
 * - 可搜索模式下聚焦输入框
 * - 普通模式下聚焦触发区域
 */
const handleMethodFocus = () => {
  methodSelectRef.value?.focus();
};

/**
 * 移除焦点并关闭下拉菜单
 */
const handleMethodBlur = () => {
  methodSelectRef.value?.blur();
};

/**
 * 清空选择内容
 * 会触发 change 和 clear 事件
 */
const handleMethodClear = () => {
  methodSelectRef.value?.clear();
};

/**
 * 打开下拉菜单
 */
const handleMethodOpen = () => {
  methodSelectRef.value?.openDropdown();
};

/**
 * 关闭下拉菜单
 */
const handleMethodClose = () => {
  methodSelectRef.value?.closeDropdown();
};

// ============ 代码示例 ============

const basicCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    placeholder="请选择"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]);
<\/script>`;

const sizeCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    size="large"
    placeholder="大尺寸"
  />
  <AleSelect
    v-model="value"
    :options="options"
    size="medium"
    placeholder="中尺寸"
  />
  <AleSelect
    v-model="value"
    :options="options"
    size="small"
    placeholder="小尺寸"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]);
<\/script>`;

const disabledCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    disabled
    placeholder="禁用状态"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('1');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);
<\/script>`;

const clearableCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    clearable
    placeholder="可清空"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('1');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);
<\/script>`;

const multipleCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    multiple
    clearable
    placeholder="请选择"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref(['1', '2']);
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]);
<\/script>`;

const collapseCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    multiple
    :max-collapse-tags="2"
    placeholder="最多显示2个标签"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref(['apple', 'banana', 'orange', 'grape']);
const options = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
]);
<\/script>`;

const filterableCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    filterable
    clearable
    placeholder="请选择或搜索"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' }
]);
<\/script>`;

const remoteCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    filterable
    :loading="loading"
    :remote-method="remoteMethod"
    placeholder="请输入关键词搜索"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([]);
const loading = ref(false);

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      options.value = [
        { label: query + '1', value: query + '1' },
        { label: query + '2', value: query + '2' }
      ];
      loading.value = false;
    }, 500);
  } else {
    options.value = [];
  }
};
<\/script>`;

const createCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    filterable
    allow-create
    @create="handleCreate"
    placeholder="请选择或输入"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'javascript' }
]);

const handleCreate = (value: string) => {
  console.log('创建新条目:', value);
};
<\/script>`;

const virtualCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    virtual-scroll
    :visible-count="8"
    :item-height="34"
    filterable
    placeholder="从大数据中搜索"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = computed(() => {
  return Array.from({ length: 10000 }, (_, i) => ({
    label: \`选项 \${i + 1}\`,
    value: String(i + 1)
  }));
});
<\/script>`;

const disabledOptionCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    placeholder="请选择"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '可用选项1', value: '1' },
  { label: '可用选项2', value: '2' },
  { label: '禁用选项', value: '3', disabled: true },
  { label: '可用选项3', value: '4' }
]);
<\/script>`;

const eventCode = `<template>
  <AleSelect
    v-model="value"
    :options="options"
    clearable
    placeholder="请选择"
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);

const handleChange = (value: unknown) => {
  console.log('change:', value);
};

const handleVisibleChange = (visible: boolean) => {
  console.log('visible-change:', visible);
};

const handleClear = () => {
  console.log('clear');
};

const handleFocus = () => {
  console.log('focus');
};

const handleBlur = () => {
  console.log('blur');
};
<\/script>`;

const methodCode = `<template>
  <AleSelect
    ref="selectRef"
    v-model="value"
    :options="options"
    placeholder="请选择"
  />
  <button @click="handleFocus">聚焦</button>
  <button @click="handleBlur">失焦</button>
  <button @click="handleClear">清空</button>
  <button @click="handleOpen">打开下拉</button>
  <button @click="handleClose">关闭下拉</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';
import type { SelectExpose } from 'ale-ui';

const selectRef = ref<SelectExpose>();
const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);

const handleFocus = () => selectRef.value?.focus();
const handleBlur = () => selectRef.value?.blur();
const handleClear = () => selectRef.value?.clear();
const handleOpen = () => selectRef.value?.openDropdown();
const handleClose = () => selectRef.value?.closeDropdown();
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

.component-demo-view__demo .ale-select {
  width: 240px;
}

.component-demo-view__code {
  margin-top: 24px;
}

/* 辅助样式 */
.demo-value {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-family: monospace;
}

.demo-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--color-text-primary);
  background-color: var(--color-bg-base);
  border: 1px solid var(--color-border-base);
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: all 0.2s;
}

.demo-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.event-log {
  margin-top: 16px;
  padding: 16px;
  background-color: var(--color-gray-50);
  border-radius: var(--radius-base);
}

.event-log h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.event-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.log-item {
  font-size: 12px;
  color: var(--color-text-secondary);
  font-family: monospace;
  padding: 4px 0;
  border-bottom: 1px solid var(--color-border-lighter);
}

.log-item:last-child {
  border-bottom: none;
}
</style>
