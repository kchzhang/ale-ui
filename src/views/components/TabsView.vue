<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Tabs 标签页</h1>
      <p class="component-demo-view__description">
        分隔内容上有关联但属于不同类别的数据集合
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <p class="section-desc">Tabs 组件通过 TabPane 子组件定义标签页内容，使用 label 属性定义标签名，name 属性定义标识符</p>
      <div class="component-demo-view__demo">
        <AleTabs v-model="activeName" class="demo-tabs">
          <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
          <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
          <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
          <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
        </AleTabs>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 卡片风格 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">卡片风格</h2>
      <p class="section-desc">设置 type 属性为 card 即可使用卡片风格的标签页</p>
      <div class="component-demo-view__demo">
        <AleTabs v-model="activeName2" type="card" class="demo-tabs">
          <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
          <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
          <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
          <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
        </AleTabs>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="cardCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 边框卡片 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">边框卡片</h2>
      <p class="section-desc">设置 type 属性为 border-card 即可使用边框卡片风格的标签页</p>
      <div class="component-demo-view__demo">
        <AleTabs v-model="activeName3" type="border-card" class="demo-tabs">
          <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
          <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
          <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
          <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
        </AleTabs>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="borderCardCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 位置 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">位置</h2>
      <p class="section-desc">设置 tabPosition 属性可改变标签位置，支持 top、right、bottom、left 四个方向</p>
      <div class="component-demo-view__demo position-demo">
        <div class="position-selector">
          <AleButton
            v-for="pos in (['top', 'right', 'bottom', 'left'] as TabsPosition[])"
            :key="pos"
            :type="tabPosition === pos ? 'primary' : 'default'"
            size="small"
            @click="tabPosition = pos"
          >
            {{ pos }}
          </AleButton>
        </div>
        <AleTabs v-model="activeName4" :tabPosition="tabPosition" style="height: 200px;" class="demo-tabs">
          <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
          <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
          <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
          <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
        </AleTabs>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="positionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义标签页 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义标签页</h2>
      <p class="section-desc">可以通过具名插槽实现自定义标签页内容</p>
      <div class="component-demo-view__demo">
        <AleTabs v-model="activeName5" type="card" class="demo-tabs">
          <AleTabPane name="first">
            <template #label>
              <span>📅 用户管理</span>
            </template>
            用户管理内容（使用 #label 插槽，无 label 属性）
          </AleTabPane>
          <AleTabPane label="配置管理" name="second">配置管理内容（使用 label 属性）</AleTabPane>
          <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
        </AleTabs>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customLabelCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 动态增减标签页 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">动态增减标签页</h2>
      <p class="section-desc">通过 editable 属性可实现标签的增减，通过 tab-add 和 tab-remove 事件监听标签的添加和移除</p>
      <div class="component-demo-view__demo">
        <AleTabs
          v-model="editableTabsValue"
          type="card"
          editable
          class="demo-tabs"
          @tab-add="handleTabsAdd"
          @tab-remove="handleTabsRemove"
        >
          <AleTabPane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            {{ item.content }}
          </AleTabPane>
        </AleTabs>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="editableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 延迟加载 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">延迟加载（懒加载）</h2>
      <p class="section-desc">通过 lazy 属性可延迟渲染标签内容，仅在标签首次选中时才渲染内容</p>
      <div class="component-demo-view__demo">
        <AleTabs v-model="activeName6" type="border-card" class="demo-tabs">
          <AleTabPane label="标签一" name="first">标签一内容（立即渲染）</AleTabPane>
          <AleTabPane label="标签二" name="second" lazy>
            <p>标签二内容（延迟渲染）</p>
            <p>渲染时间：{{ new Date().toLocaleTimeString() }}</p>
          </AleTabPane>
          <AleTabPane label="标签三" name="third" lazy>
            <p>标签三内容（延迟渲染）</p>
            <p>渲染时间：{{ new Date().toLocaleTimeString() }}</p>
          </AleTabPane>
        </AleTabs>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="lazyCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AleTabs, AleTabPane, AleButton } from 'ale-ui';
import type { TabsPosition } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const activeName = ref('first');
const activeName2 = ref('first');
const activeName3 = ref('first');
const activeName4 = ref('first');
const activeName5 = ref('first');
const activeName6 = ref('first');
const tabPosition = ref<TabsPosition>('top');

// 可编辑标签页
const editableTabsValue = ref('1');
const editableTabs = reactive([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content'
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content'
  },
  {
    title: 'Tab 3',
    name: '3',
    content: 'Tab 3 content'
  }
]);
let tabIndex = 3;

const handleTabsAdd = () => {
  const newName = ++tabIndex + '';
  editableTabs.push({
    title: 'New Tab',
    name: newName,
    content: 'New Tab content'
  });
  editableTabsValue.value = newName;
};

const handleTabsRemove = (targetName: string | number) => {
  const tabs = editableTabs;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }
  editableTabsValue.value = activeName;
  const index = tabs.findIndex(tab => tab.name === targetName);
  if (index > -1) {
    tabs.splice(index, 1);
  }
};

// 代码示例
const basicCode = `<template>
  <AleTabs v-model="activeName" class="demo-tabs">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`;

const cardCode = `<template>
  <AleTabs v-model="activeName" type="card" class="demo-tabs">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`;

const borderCardCode = `<template>
  <AleTabs v-model="activeName" type="border-card" class="demo-tabs">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`;

const positionCode = `<template>
  <AleTabs v-model="activeName" :tabPosition="tabPosition" style="height: 200px;">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
const tabPosition = ref('left');
<\/script>`;

const customLabelCode = `<template>
  <AleTabs v-model="activeName" type="card" class="demo-tabs">
    <!-- 使用 #label 插槽时，label 属性可省略 -->
    <AleTabPane name="first">
      <template #label>
        <span>📅 用户管理</span>
      </template>
      用户管理内容
    </AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`;

const editableCode = `<template>
  <AleTabs
    v-model="editableTabsValue"
    type="card"
    editable
    @tab-add="handleTabsAdd"
    @tab-remove="handleTabsRemove"
  >
    <AleTabPane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const editableTabsValue = ref('1');
const editableTabs = reactive([
  { title: 'Tab 1', name: '1', content: 'Tab 1 content' },
  { title: 'Tab 2', name: '2', content: 'Tab 2 content' }
]);
let tabIndex = 2;

const handleTabsAdd = () => {
  const newName = ++tabIndex + '';
  editableTabs.push({
    title: 'New Tab',
    name: newName,
    content: 'New Tab content'
  });
  editableTabsValue.value = newName;
};

const handleTabsRemove = (targetName: string) => {
  const tabs = editableTabs;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) activeName = nextTab.name;
      }
    });
  }
  editableTabsValue.value = activeName;
  const index = tabs.findIndex(tab => tab.name === targetName);
  if (index > -1) tabs.splice(index, 1);
};
<\/script>`;

const lazyCode = `<template>
  <AleTabs v-model="activeName" type="border-card">
    <AleTabPane label="标签一" name="first">标签一内容（立即渲染）</AleTabPane>
    <AleTabPane label="标签二" name="second" lazy>
      标签二内容（延迟渲染）
    </AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
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
  margin: 0 0 12px 0;
}

.section-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
}

.component-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

.position-demo {
  flex-direction: column;
}

.position-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.component-demo-view__code {
  margin-top: 24px;
}

.demo-tabs {
  width: 100%;
}

.demo-tabs :deep(.ale-tab-pane) {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 0 0 4px 4px;
}

.demo-tabs :deep(.ale-tabs__content) {
  min-height: 100px;
}
</style>
