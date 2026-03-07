<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Tag 标签</h1>
      <p class="component-demo-view__description">
        用于标记和选择的标签组件
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleTag>默认标签</AleTag>
        <AleTag type="primary">主要标签</AleTag>
        <AleTag type="success">成功标签</AleTag>
        <AleTag type="warning">警告标签</AleTag>
        <AleTag type="danger">危险标签</AleTag>
        <AleTag type="info">信息标签</AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <div class="demo-item">
          <AleTag size="small" type="primary">小型</AleTag>
          <span class="demo-label">small</span>
        </div>
        <div class="demo-item">
          <AleTag size="medium" type="primary">中型</AleTag>
          <span class="demo-label">medium</span>
        </div>
        <div class="demo-item">
          <AleTag size="large" type="primary">大型</AleTag>
          <span class="demo-label">large</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可关闭标签 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可关闭标签</h2>
      <div class="component-demo-view__demo">
        <AleTag
          v-for="tag in closableTags"
          :key="tag.name"
          :type="tag.type"
          closable
          @close="handleClose(tag)"
        >
          {{ tag.name }}
        </AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="closableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleTag disabled>禁用标签</AleTag>
        <AleTag type="primary" disabled>禁用主要</AleTag>
        <AleTag type="success" closable disabled>禁用可关闭</AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 边框样式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">边框样式</h2>
      <div class="component-demo-view__demo">
        <AleTag bordered>默认</AleTag>
        <AleTag type="primary" bordered>主要</AleTag>
        <AleTag type="success" bordered>成功</AleTag>
        <AleTag type="warning" bordered>警告</AleTag>
        <AleTag type="danger" bordered>危险</AleTag>
        <AleTag type="info" bordered>信息</AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="borderedCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 圆角样式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">圆角样式</h2>
      <div class="component-demo-view__demo">
        <AleTag round>圆角</AleTag>
        <AleTag type="primary" round>圆角主要</AleTag>
        <AleTag type="success" round closable>圆角可关闭</AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="roundCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带图标 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带图标</h2>
      <div class="component-demo-view__demo">
        <AleTag icon="icon-user" type="primary">用户</AleTag>
        <AleTag icon="icon-check" type="success">完成</AleTag>
        <AleTag icon="icon-warning" type="warning">注意</AleTag>
        <AleTag icon="icon-close" type="danger">取消</AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="iconCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义颜色</h2>
      <div class="component-demo-view__demo">
        <AleTag color="#ff6b6b" bgColor="#fff5f5">红色</AleTag>
        <AleTag color="#4ecdc4" bgColor="#e0f7f5">青色</AleTag>
        <AleTag color="#45b7d1" bgColor="#e3f2fd">蓝色</AleTag>
        <AleTag color="#96ceb4" bgColor="#f0f9f4">绿色</AleTag>
        <AleTag color="#ff9ff3" bgColor="#fff0fb">粉色</AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customColorCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 动态编辑标签 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">动态编辑标签</h2>
      <div class="component-demo-view__demo">
        <AleTag
          v-for="tag in dynamicTags"
          :key="tag"
          closable
          type="primary"
          @close="handleDynamicClose(tag)"
        >
          {{ tag }}
        </AleTag>
        <AleButton
          v-if="!inputVisible"
          size="small"
          @click="showInput"
        >
          + 新标签
        </AleButton>
        <AleInput
          v-else
          ref="inputRef"
          v-model="inputValue"
          size="small"
          style="width: 100px"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dynamicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 点击事件 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">点击事件</h2>
      <div class="component-demo-view__demo">
        <AleTag type="primary" @click="handleTagClick">
          点击次数: {{ clickCount }}
        </AleTag>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clickCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { AleTag, AleButton, AleInput } from 'ale-ui';
import type { TagType } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 可关闭标签数据
const closableTags = ref<{ name: string; type: TagType }[]>([
  { name: '标签一', type: 'primary' },
  { name: '标签二', type: 'success' },
  { name: '标签三', type: 'warning' },
  { name: '标签四', type: 'danger' }
]);

// 动态标签数据
const dynamicTags = ref(['标签一', '标签二', '标签三']);
const inputVisible = ref(false);
const inputValue = ref('');
const inputRef = ref<InstanceType<typeof AleInput> | null>(null);

// 点击计数
const clickCount = ref(0);

// 处理关闭标签
const handleClose = (tag: { name: string; type: string }) => {
  console.log('关闭标签:', tag.name);
};

// 处理动态标签关闭
const handleDynamicClose = (tag: string) => {
  dynamicTags.value = dynamicTags.value.filter(item => item !== tag);
};

// 显示输入框
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value?.focus?.();
  });
};

// 处理输入确认
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};

// 处理标签点击
const handleTagClick = () => {
  clickCount.value++;
};

// 代码示例
const basicCode = `<template>
  <AleTag>默认标签</AleTag>
  <AleTag type="primary">主要标签</AleTag>
  <AleTag type="success">成功标签</AleTag>
  <AleTag type="warning">警告标签</AleTag>
  <AleTag type="danger">危险标签</AleTag>
  <AleTag type="info">信息标签</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`;

const sizeCode = `<template>
  <AleTag size="small" type="primary">小型</AleTag>
  <AleTag size="medium" type="primary">中型</AleTag>
  <AleTag size="large" type="primary">大型</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`;

const closableCode = `<template>
  <AleTag
    v-for="tag in tags"
    :key="tag.name"
    :type="tag.type"
    closable
    @close="handleClose(tag)"
  >
    {{ tag.name }}
  </AleTag>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTag } from 'ale-ui';

const tags = ref([
  { name: '标签一', type: 'primary' },
  { name: '标签二', type: 'success' }
]);

const handleClose = (tag) => {
  console.log('关闭:', tag.name);
};
<\/script>`;

const disabledCode = `<template>
  <AleTag disabled>禁用标签</AleTag>
  <AleTag type="primary" disabled>禁用主要</AleTag>
  <AleTag type="success" closable disabled>禁用可关闭</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`;

const borderedCode = `<template>
  <AleTag bordered>默认</AleTag>
  <AleTag type="primary" bordered>主要</AleTag>
  <AleTag type="success" bordered>成功</AleTag>
  <AleTag type="warning" bordered>警告</AleTag>
  <AleTag type="danger" bordered>危险</AleTag>
  <AleTag type="info" bordered>信息</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`;

const roundCode = `<template>
  <AleTag round>圆角</AleTag>
  <AleTag type="primary" round>圆角主要</AleTag>
  <AleTag type="success" round closable>圆角可关闭</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`;

const iconCode = `<template>
  <AleTag icon="icon-user" type="primary">用户</AleTag>
  <AleTag icon="icon-check" type="success">完成</AleTag>
  <AleTag icon="icon-warning" type="warning">注意</AleTag>
  <AleTag icon="icon-close" type="danger">取消</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`;

const customColorCode = `<template>
  <AleTag color="#ff6b6b" bgColor="#fff5f5">红色</AleTag>
  <AleTag color="#4ecdc4" bgColor="#e0f7f5">青色</AleTag>
  <AleTag color="#45b7d1" bgColor="#e3f2fd">蓝色</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`;

const dynamicCode = `<template>
  <AleTag
    v-for="tag in dynamicTags"
    :key="tag"
    closable
    type="primary"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </AleTag>
  <AleButton
    v-if="!inputVisible"
    size="small"
    @click="showInput"
  >
    + 新标签
  </AleButton>
  <AleInput
    v-else
    v-model="inputValue"
    size="small"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { AleTag, AleButton, AleInput } from 'ale-ui';

const dynamicTags = ref(['标签一', '标签二']);
const inputVisible = ref(false);
const inputValue = ref('');

const handleClose = (tag: string) => {
  dynamicTags.value = dynamicTags.value.filter(item => item !== tag);
};

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};
<\/script>`;

const clickCode = `<template>
  <AleTag type="primary" @click="handleClick">
    点击次数: {{ count }}
  </AleTag>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTag } from 'ale-ui';

const count = ref(0);

const handleClick = () => {
  count.value++;
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
</style>
