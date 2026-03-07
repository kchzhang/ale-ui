<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">List 列表</h1>
      <p class="component-demo-view__description">
        用于展示一组数据，支持多种布局、尺寸和交互方式。
      </p>
    </div>

    <!-- 基础列表 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础列表</h2>
      <div class="component-demo-view__demo">
        <AleList :data="basicData" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带序号的列表 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带序号的列表</h2>
      <div class="component-demo-view__demo">
        <AleList :data="basicData" show-index />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="indexCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带头像的列表 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带头像的列表</h2>
      <div class="component-demo-view__demo">
        <AleList :data="avatarData" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="avatarCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">尺寸</h2>
      <div class="list-demo-row">
        <div class="list-demo-col">
          <h4>Small</h4>
          <AleList :data="sizeData" size="small" />
        </div>
        <div class="list-demo-col">
          <h4>Medium</h4>
          <AleList :data="sizeData" size="medium" />
        </div>
        <div class="list-demo-col">
          <h4>Large</h4>
          <AleList :data="sizeData" size="large" />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 布局 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">布局</h2>
      <div class="list-demo-row">
        <div class="list-demo-col">
          <h4>Vertical</h4>
          <AleList :data="layoutData" layout="vertical" />
        </div>
        <div class="list-demo-col">
          <h4>Horizontal</h4>
          <AleList :data="layoutData" layout="horizontal" />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="layoutCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 边框样式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">边框样式</h2>
      <div class="list-demo-row">
        <div class="list-demo-col">
          <h4>Solid</h4>
          <AleList :data="borderData" bordered border-style="solid" />
        </div>
        <div class="list-demo-col">
          <h4>Dashed</h4>
          <AleList :data="borderData" bordered border-style="dashed" />
        </div>
        <div class="list-demo-col">
          <h4>None</h4>
          <AleList :data="borderData" :bordered="false" />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="borderCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可点击列表 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可点击列表</h2>
      <div class="component-demo-view__demo">
        <AleList :data="clickableData" clickable @click="handleItemClick" />
      </div>
      <div class="list-demo-info" v-if="clickedItem">
        点击了：{{ clickedItem.title }}
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clickableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用项 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用项</h2>
      <div class="component-demo-view__demo">
        <AleList :data="disabledData" clickable @click="handleDisabledClick" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">加载状态</h2>
      <div class="component-demo-view__demo">
        <AleList :data="[]" loading />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="loadingCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 空状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">空状态</h2>
      <div class="component-demo-view__demo">
        <AleList :data="[]" empty-text="暂无数据" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="emptyCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义插槽 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义插槽</h2>
      <div class="component-demo-view__demo">
        <AleList :data="customData">
          <template #avatar="{ index }">
            <div class="custom-avatar" :style="{ backgroundColor: avatarColors[index % avatarColors.length] }">
              {{ String.fromCharCode(65 + index) }}
            </div>
          </template>
          <template #actions="{ item, index, onAction }">
            <AleButton type="primary" size="small" @click="onAction('edit')">编辑</AleButton>
            <AleButton type="danger" size="small" @click="onAction('delete')">删除</AleButton>
          </template>
        </AleList>
      </div>
      <div class="list-demo-info" v-if="actionInfo">
        {{ actionInfo }}
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="slotCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- API 说明 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">API 说明</h2>
      <div class="api-section">
        <h3>List Props</h3>
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
              <td>data</td>
              <td>列表数据</td>
              <td>ListItemData[]</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>size</td>
              <td>尺寸</td>
              <td>'small' | 'medium' | 'large'</td>
              <td>'medium'</td>
            </tr>
            <tr>
              <td>layout</td>
              <td>布局方向</td>
              <td>'vertical' | 'horizontal'</td>
              <td>'vertical'</td>
            </tr>
            <tr>
              <td>bordered</td>
              <td>是否显示边框</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>borderStyle</td>
              <td>边框样式</td>
              <td>'solid' | 'dashed' | 'none'</td>
              <td>'solid'</td>
            </tr>
            <tr>
              <td>split</td>
              <td>是否显示分隔线</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>showIndex</td>
              <td>是否显示序号</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>clickable</td>
              <td>是否可点击</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>loading</td>
              <td>是否加载中</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>emptyText</td>
              <td>空状态文本</td>
              <td>string</td>
              <td>'暂无数据'</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>List Events</h3>
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
              <td>click</td>
              <td>点击列表项时触发</td>
              <td>(item: ListItemData, index: number)</td>
            </tr>
            <tr>
              <td>action</td>
              <td>点击操作按钮时触发</td>
              <td>(item: ListItemData, index: number, action: string)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>List Slots</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>插槽名</th>
              <th>说明</th>
              <th>作用域参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>default</td>
              <td>自定义列表项内容</td>
              <td>{ item, index }</td>
            </tr>
            <tr>
              <td>title</td>
              <td>自定义标题</td>
              <td>{ item, index }</td>
            </tr>
            <tr>
              <td>description</td>
              <td>自定义描述</td>
              <td>{ item, index }</td>
            </tr>
            <tr>
              <td>avatar</td>
              <td>自定义头像</td>
              <td>{ item, index }</td>
            </tr>
            <tr>
              <td>extra</td>
              <td>自定义额外内容</td>
              <td>{ item, index }</td>
            </tr>
            <tr>
              <td>actions</td>
              <td>自定义操作区域</td>
              <td>{ item, index, onAction }</td>
            </tr>
            <tr>
              <td>footer</td>
              <td>自定义底部</td>
              <td>-</td>
            </tr>
            <tr>
              <td>empty</td>
              <td>自定义空状态</td>
              <td>-</td>
            </tr>
            <tr>
              <td>loading</td>
              <td>自定义加载状态</td>
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
import { AleList, AleButton } from 'ale-ui';
import type { ListItemData } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础数据
const basicData = ref<ListItemData[]>([
  { id: 1, title: '列表项 1', description: '这是列表项 1 的描述', extra: '2024-01-01' },
  { id: 2, title: '列表项 2', description: '这是列表项 2 的描述', extra: '2024-01-02' },
  { id: 3, title: '列表项 3', description: '这是列表项 3 的描述', extra: '2024-01-03' }
]);

// 头像数据
const avatarData = ref<ListItemData[]>([
  { id: 1, title: '张三', description: '产品经理', avatar: '张' },
  { id: 2, title: '李四', description: '前端工程师', avatar: '李' },
  { id: 3, title: '王五', description: '后端工程师', avatar: '王' }
]);

// 尺寸数据
const sizeData = ref<ListItemData[]>([
  { id: 1, title: '标题', description: '描述内容' },
  { id: 2, title: '标题', description: '描述内容' }
]);

// 布局数据
const layoutData = ref<ListItemData[]>([
  { id: 1, title: '标题 1', description: '描述内容 1' },
  { id: 2, title: '标题 2', description: '描述内容 2' }
]);

// 边框数据
const borderData = ref<ListItemData[]>([
  { id: 1, title: '列表项 1' },
  { id: 2, title: '列表项 2' }
]);

// 可点击数据
const clickableData = ref<ListItemData[]>([
  { id: 1, title: '点击项 1', description: '点击我会触发事件' },
  { id: 2, title: '点击项 2', description: '点击我会触发事件' },
  { id: 3, title: '点击项 3', description: '点击我会触发事件' }
]);

const clickedItem = ref<ListItemData | null>(null);
const handleItemClick = (item: ListItemData) => {
  clickedItem.value = item;
};

// 禁用数据
const disabledData = ref<ListItemData[]>([
  { id: 1, title: '正常项', description: '可以点击' },
  { id: 2, title: '禁用项', description: '无法点击', disabled: true },
  { id: 3, title: '正常项', description: '可以点击' }
]);

const handleDisabledClick = (item: ListItemData) => {
  clickedItem.value = item;
};

// 自定义数据
const customData = ref<ListItemData[]>([
  { id: 1, title: '项目 1', description: '项目描述 1' },
  { id: 2, title: '项目 2', description: '项目描述 2' },
  { id: 3, title: '项目 3', description: '项目描述 3' }
]);

const avatarColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const actionInfo = ref('');

// 代码示例
const basicCode = `<template>
  <AleList :data="listData" />
</template>

<script setup>
const listData = [
  { id: 1, title: '列表项 1', description: '描述 1', extra: '2024-01-01' },
  { id: 2, title: '列表项 2', description: '描述 2', extra: '2024-01-02' },
  { id: 3, title: '列表项 3', description: '描述 3', extra: '2024-01-03' }
];
<\/script>`;

const indexCode = `<template>
  <AleList :data="listData" show-index />
</template>`;

const avatarCode = `<template>
  <AleList :data="avatarData" />
</template>

<script setup>
const avatarData = [
  { id: 1, title: '张三', description: '产品经理', avatar: '张' },
  { id: 2, title: '李四', description: '前端工程师', avatar: '李' },
  { id: 3, title: '王五', description: '后端工程师', avatar: '王' }
];
<\/script>`;

const sizeCode = `<template>
  <AleList :data="listData" size="small" />
  <AleList :data="listData" size="medium" />
  <AleList :data="listData" size="large" />
</template>`;

const layoutCode = `<template>
  <AleList :data="listData" layout="vertical" />
  <AleList :data="listData" layout="horizontal" />
</template>`;

const borderCode = `<template>
  <AleList :data="listData" bordered border-style="solid" />
  <AleList :data="listData" bordered border-style="dashed" />
  <AleList :data="listData" :bordered="false" />
</template>`;

const clickableCode = `<template>
  <AleList :data="listData" clickable @click="handleClick" />
</template>

<script setup>
const handleClick = (item, index) => {
  console.log('点击了：', item, index);
};
<\/script>`;

const disabledCode = `<template>
  <AleList :data="listData" clickable @click="handleClick" />
</template>

<script setup>
const listData = [
  { id: 1, title: '正常项' },
  { id: 2, title: '禁用项', disabled: true },
  { id: 3, title: '正常项' }
];
<\/script>`;

const loadingCode = `<template>
  <AleList :data="[]" loading />
</template>`;

const emptyCode = `<template>
  <AleList :data="[]" empty-text="暂无数据" />
</template>`;

const slotCode = `<template>
  <AleList :data="listData">
    <template #avatar="{ index }">
      <div class="custom-avatar">
        {{ String.fromCharCode(65 + index) }}
      </div>
    </template>
    <template #actions="{ onAction }">
      <AleButton size="small" @click="onAction('edit')">编辑</AleButton>
      <AleButton type="danger" size="small" @click="onAction('delete')">删除</AleButton>
    </template>
  </AleList>
</template>`;
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
  margin-bottom: 24px;
}

.list-demo-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.list-demo-row h4 {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin: 0 0 12px 0;
}

.list-demo-col {
  min-width: 0;
}

.list-demo-info {
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  font-size: 14px;
}

.custom-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
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
