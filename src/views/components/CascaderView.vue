<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Cascader 级联选择器</h1>
      <p class="component-demo-view__description">
        级联选择器用于多层级数据的逐级选择，适用于省市区、分类选择等场景。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <p class="component-demo-view__section-desc">
        级联选择器通过多级菜单展示数据，点击选项展开下一级。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="basicValue"
          :options="options"
          placeholder="请选择地区"
          style="width: 300px"
        />
        <span class="demo-value">当前值: {{ basicValue }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="基础用法" />
      </div>
    </section>

    <!-- 显示完整路径 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">显示完整路径</h2>
      <p class="component-demo-view__section-desc">
        设置 showAllLevels 控制是否显示完整路径，默认显示。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center;">
          <AleCascader
            v-model="allLevelsValue"
            :options="options"
            :show-all-levels="true"
            placeholder="显示完整路径"
            style="width: 300px"
          />
          <AleCascader
            v-model="allLevelsValue"
            :options="options"
            :show-all-levels="false"
            placeholder="只显示最后一级"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="allLevelsCode" language="vue" title="显示完整路径" />
      </div>
    </section>

    <!-- 自定义分隔符 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义分隔符</h2>
      <p class="component-demo-view__section-desc">
        通过 separator 属性自定义路径分隔符。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="separatorValue"
          :options="options"
          separator=" > "
          placeholder="自定义分隔符"
          style="width: 300px"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="separatorCode" language="vue" title="自定义分隔符" />
      </div>
    </section>

    <!-- 可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可清空</h2>
      <p class="component-demo-view__section-desc">
        设置 clearable 属性显示清空按钮，悬停时显示。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="clearableValue"
          :options="options"
          clearable
          placeholder="可清空的选择器"
          style="width: 300px"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clearableCode" language="vue" title="可清空" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <p class="component-demo-view__section-desc">
        设置 disabled 属性禁用选择器。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center;">
          <AleCascader
            v-model="disabledValue"
            :options="options"
            disabled
            placeholder="禁用状态"
            style="width: 300px"
          />
          <AleCascader
            v-model="disabledValue"
            :options="options"
            placeholder="正常状态"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="禁用状态" />
      </div>
    </section>

    <!-- 尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">尺寸</h2>
      <p class="component-demo-view__section-desc">
        提供 large、medium、small 三种尺寸。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center; flex-direction: column; align-items: flex-start;">
          <AleCascader
            v-model="sizeValue"
            :options="options"
            size="large"
            placeholder="大尺寸"
            style="width: 300px"
          />
          <AleCascader
            v-model="sizeValue"
            :options="options"
            size="medium"
            placeholder="中等尺寸（默认）"
            style="width: 300px"
          />
          <AleCascader
            v-model="sizeValue"
            :options="options"
            size="small"
            placeholder="小尺寸"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="尺寸" />
      </div>
    </section>

    <!-- 可搜索 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可搜索</h2>
      <p class="component-demo-view__section-desc">
        设置 filterable 属性启用搜索功能，支持搜索任意级别的选项。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="filterableValue"
          :options="options"
          filterable
          placeholder="可搜索的选择器"
          style="width: 300px"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="filterableCode" language="vue" title="可搜索" />
      </div>
    </section>

    <!-- 展开方式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">展开方式</h2>
      <p class="component-demo-view__section-desc">
        支持 click（点击展开）和 hover（悬停展开）两种方式。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center;">
          <AleCascader
            v-model="expandValue"
            :options="options"
            expand-trigger="click"
            placeholder="点击展开"
            style="width: 300px"
          />
          <AleCascader
            v-model="expandValue"
            :options="options"
            expand-trigger="hover"
            placeholder="悬停展开"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="expandCode" language="vue" title="展开方式" />
      </div>
    </section>

    <!-- 选择任意节点 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">选择任意节点</h2>
      <p class="component-demo-view__section-desc">
        设置 check-strictly 属性可以选择任意一级节点，支持 single（单选）和 multiple（多选）两种模式。
      </p>
      <div class="component-demo-view__demo" style="flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <span style="width: 80px; color: var(--color-text-secondary);">单选模式:</span>
          <AleCascader
            v-model="singleValue"
            :options="options"
            check-strictly="single"
            placeholder="单选任意节点"
            style="width: 300px"
          />
          <span class="demo-value">当前值: {{ singleValue }}</span>
        </div>
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <span style="width: 80px; color: var(--color-text-secondary);">多选模式:</span>
          <AleCascader
            v-model="multipleValue"
            :options="options"
            check-strictly="multiple"
            placeholder="多选任意节点"
            style="width: 300px"
          />
          <span class="demo-value">当前值: {{ JSON.stringify(multipleValue) }}</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="strictCode" language="vue" title="选择任意节点" />
      </div>
    </section>

    <!-- 事件 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">事件</h2>
      <p class="component-demo-view__section-desc">
        监听 change、expand-change、visible-change 等事件。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="eventValue"
          :options="options"
          placeholder="监听事件"
          style="width: 300px"
          @change="handleChange"
          @expand-change="handleExpandChange"
          @visible-change="handleVisibleChange"
          @clear="handleClear"
        />
        <div class="event-log">
          <p v-for="(log, index) in eventLogs" :key="index">{{ log }}</p>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="eventCode" language="vue" title="事件" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCascader } from 'ale-ui';
import type { CascaderOption } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础数据
const options: CascaderOption[] = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'zhongguancun', label: '中关村' },
          { value: 'wudaokou', label: '五道口' },
          { value: 'shangdi', label: '上地' }
        ]
      },
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'sanlitun', label: '三里屯' },
          { value: 'guomao', label: '国贸' },
          { value: 'wangjing', label: '望京' }
        ]
      },
      {
        value: 'dongcheng',
        label: '东城区',
        children: [
          { value: 'wangfujing', label: '王府井' },
          { value: 'qianmen', label: '前门' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      {
        value: 'pudong',
        label: '浦东新区',
        children: [
          { value: 'lujiazui', label: '陆家嘴' },
          { value: 'zhangjiang', label: '张江' }
        ]
      },
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          { value: 'nanjinglu', label: '南京路' },
          { value: 'waitan', label: '外滩' }
        ]
      },
      {
        value: 'jingan',
        label: '静安区',
        children: [
          { value: 'nanjingxilu', label: '南京西路' },
          { value: 'jingansi', label: '静安寺' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' },
          { value: 'panyu', label: '番禺区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' },
          { value: 'luohu', label: '罗湖区' }
        ]
      },
      {
        value: 'dongguan',
        label: '东莞市',
        children: [
          { value: 'nancheng', label: '南城' },
          { value: 'dongcheng', label: '东城' }
        ]
      },
      {
        value: 'foshan',
        label: '佛山市',
        children: [
          { value: 'chancheng', label: '禅城区' },
          { value: 'nanhai', label: '南海区' }
        ]
      }
    ]
  },
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
          { value: 'xiaoshan', label: '萧山区' }
        ]
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'yinzhou', label: '鄞州区' }
        ]
      },
      {
        value: 'wenzhou',
        label: '温州市',
        children: [
          { value: 'lucheng', label: '鹿城区' },
          { value: 'longwan', label: '龙湾区' }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
          { value: 'jianye', label: '建邺区' }
        ]
      },
      {
        value: 'suzhou',
        label: '苏州市',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'sip', label: '工业园区' }
        ]
      },
      {
        value: 'wuxi',
        label: '无锡市',
        children: [
          { value: 'liangxi', label: '梁溪区' },
          { value: 'binhu', label: '滨湖区' }
        ]
      }
    ]
  },
  {
    value: 'sichuan',
    label: '四川省',
    children: [
      {
        value: 'chengdu',
        label: '成都市',
        children: [
          { value: 'jinjiang', label: '锦江区' },
          { value: 'qingyang', label: '青羊区' },
          { value: 'wuhou', label: '武侯区' }
        ]
      },
      {
        value: 'mianyang',
        label: '绵阳市',
        children: [
          { value: 'fucheng', label: '涪城区' },
          { value: 'youxian', label: '游仙区' }
        ]
      }
    ]
  },
  {
    value: 'hubei',
    label: '湖北省',
    children: [
      {
        value: 'wuhan',
        label: '武汉市',
        children: [
          { value: 'wuchang', label: '武昌区' },
          { value: 'hankou', label: '江汉区' },
          { value: 'hanyang', label: '汉阳区' }
        ]
      },
      {
        value: 'yichang',
        label: '宜昌市',
        children: [
          { value: 'xiling', label: '西陵区' },
          { value: 'wujia', label: '伍家岗区' }
        ]
      }
    ]
  },
  {
    value: 'hunan',
    label: '湖南省',
    children: [
      {
        value: 'changsha',
        label: '长沙市',
        children: [
          { value: 'furong', label: '芙蓉区' },
          { value: 'yuelu', label: '岳麓区' },
          { value: 'tianxin', label: '天心区' }
        ]
      },
      {
        value: 'zhuzhou',
        label: '株洲市',
        children: [
          { value: 'hetang', label: '荷塘区' },
          { value: 'lusong', label: '芦淞区' }
        ]
      }
    ]
  },
  {
    value: 'henan',
    label: '河南省',
    children: [
      {
        value: 'zhengzhou',
        label: '郑州市',
        children: [
          { value: 'jinshui', label: '金水区' },
          { value: 'erqi', label: '二七区' },
          { value: 'zhongyuan', label: '中原区' }
        ]
      },
      {
        value: 'luoyang',
        label: '洛阳市',
        children: [
          { value: 'luolong', label: '洛龙区' },
          { value: 'xigong', label: '西工区' }
        ]
      }
    ]
  },
  {
    value: 'shandong',
    label: '山东省',
    children: [
      {
        value: 'jinan',
        label: '济南市',
        children: [
          { value: 'lixia', label: '历下区' },
          { value: 'shizhong', label: '市中区' }
        ]
      },
      {
        value: 'qingdao',
        label: '青岛市',
        children: [
          { value: 'shinan', label: '市南区' },
          { value: 'shibei', label: '市北区' },
          { value: 'laoshan', label: '崂山区' }
        ]
      },
      {
        value: 'yantai',
        label: '烟台市',
        children: [
          { value: 'zhifu', label: '芝罘区' },
          { value: 'laishan', label: '莱山区' }
        ]
      }
    ]
  },
  {
    value: 'fujian',
    label: '福建省',
    children: [
      {
        value: 'fuzhou',
        label: '福州市',
        children: [
          { value: 'gulou', label: '鼓楼区' },
          { value: 'taijiang', label: '台江区' }
        ]
      },
      {
        value: 'xiamen',
        label: '厦门市',
        children: [
          { value: 'siming', label: '思明区' },
          { value: 'huli', label: '湖里区' }
        ]
      },
      {
        value: 'quanzhou',
        label: '泉州市',
        children: [
          { value: 'licheng', label: '鲤城区' },
          { value: 'fengze', label: '丰泽区' }
        ]
      }
    ]
  },
  {
    value: 'anhui',
    label: '安徽省',
    children: [
      {
        value: 'hefei',
        label: '合肥市',
        children: [
          { value: 'yaohai', label: '瑶海区' },
          { value: 'luyang', label: '庐阳区' },
          { value: 'shushan', label: '蜀山区' }
        ]
      },
      {
        value: 'wuhu',
        label: '芜湖市',
        children: [
          { value: 'jinghu', label: '镜湖区' },
          { value: 'yijiang', label: '弋江区' }
        ]
      }
    ]
  },
  {
    value: 'hebei',
    label: '河北省',
    children: [
      {
        value: 'shijiazhuang',
        label: '石家庄市',
        children: [
          { value: 'changan', label: '长安区' },
          { value: 'qiaoxi', label: '桥西区' }
        ]
      },
      {
        value: 'tangshan',
        label: '唐山市',
        children: [
          { value: 'lunan', label: '路南区' },
          { value: 'lubei', label: '路北区' }
        ]
      }
    ]
  },
  {
    value: 'shaanxi',
    label: '陕西省',
    children: [
      {
        value: 'xian',
        label: '西安市',
        children: [
          { value: 'beilin', label: '碑林区' },
          { value: 'yanta', label: '雁塔区' },
          { value: 'xincheng', label: '新城区' }
        ]
      },
      {
        value: 'xianyang',
        label: '咸阳市',
        children: [
          { value: 'qindu', label: '秦都区' },
          { value: 'weicheng', label: '渭城区' }
        ]
      }
    ]
  },
  {
    value: 'liaoning',
    label: '辽宁省',
    children: [
      {
        value: 'shenyang',
        label: '沈阳市',
        children: [
          { value: 'heping', label: '和平区' },
          { value: 'shenhe', label: '沈河区' },
          { value: 'dadong', label: '大东区' }
        ]
      },
      {
        value: 'dalian',
        label: '大连市',
        children: [
          { value: 'zhongshan', label: '中山区' },
          { value: 'xigang', label: '西岗区' }
        ]
      }
    ]
  },
  {
    value: 'chongqing',
    label: '重庆市',
    children: [
      {
        value: 'yuzhong',
        label: '渝中区',
        children: [
          { value: 'jiefangbei', label: '解放碑' },
          { value: 'chaotianmen', label: '朝天门' }
        ]
      },
      {
        value: 'jiangbei',
        label: '江北区',
        children: [
          { value: 'guanyinqiao', label: '观音桥' },
          { value: 'beichengtianjie', label: '北城天街' }
        ]
      },
      {
        value: 'nanan',
        label: '南岸区',
        children: [
          { value: 'nanbinlu', label: '南滨路' },
          { value: 'jiefangbei', label: '弹子石' }
        ]
      }
    ]
  },
  {
    value: 'tianjin',
    label: '天津市',
    children: [
      {
        value: 'heping',
        label: '和平区',
        children: [
          { value: 'binjiang', label: '滨江道' },
          { value: 'wudadao', label: '五大道' }
        ]
      },
      {
        value: 'nankai',
        label: '南开区',
        children: [
          { value: 'gulou', label: '鼓楼' },
          { value: 'shuishang', label: '水上公园' }
        ]
      }
    ]
  },
  {
    value: 'hainan',
    label: '海南省',
    children: [
      {
        value: 'haikou',
        label: '海口市',
        children: [
          { value: 'longhua', label: '龙华区' },
          { value: 'meilan', label: '美兰区' }
        ]
      },
      {
        value: 'sanya',
        label: '三亚市',
        children: [
          { value: 'tianya', label: '天涯区' },
          { value: 'jiyang', label: '吉阳区' }
        ]
      }
    ]
  },
  {
    value: 'yunnan',
    label: '云南省',
    children: [
      {
        value: 'kunming',
        label: '昆明市',
        children: [
          { value: 'panlong', label: '盘龙区' },
          { value: 'wuhua', label: '五华区' },
          { value: 'guandu', label: '官渡区' }
        ]
      },
      {
        value: 'lijiang',
        label: '丽江市',
        children: [
          { value: 'gucheng', label: '古城区' },
          { value: 'yulong', label: '玉龙县' }
        ]
      }
    ]
  }
];

// 基础用法
const basicValue = ref<(string | number)[]>([]);

// 显示完整路径
const allLevelsValue = ref<(string | number)[]>(['beijing', 'haidian', 'zhongguancun']);

// 自定义分隔符
const separatorValue = ref<(string | number)[]>(['shanghai', 'pudong', 'lujiazui']);

// 可清空
const clearableValue = ref<(string | number)[]>(['guangdong', 'guangzhou', 'tianhe']);

// 禁用状态
const disabledValue = ref<(string | number)[]>(['beijing', 'chaoyang', 'sanlitun']);

// 尺寸
const sizeValue = ref<(string | number)[]>([]);

// 可搜索
const filterableValue = ref<(string | number)[]>([]);

// 展开方式
const expandValue = ref<(string | number)[]>([]);

// 选择任意节点 - 单选模式
const singleValue = ref<(string | number)[]>([]);

// 选择任意节点 - 多选模式
const multipleValue = ref<(string | number)[][]>([]);

// 事件
const eventValue = ref<(string | number)[]>([]);
const eventLogs = ref<string[]>([]);

const handleChange = (value: (string | number)[]) => {
  eventLogs.value.unshift(`change: ${JSON.stringify(value)}`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

const handleExpandChange = (value: (string | number)[]) => {
  eventLogs.value.unshift(`expand-change: ${JSON.stringify(value)}`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

const handleVisibleChange = (visible: boolean) => {
  eventLogs.value.unshift(`visible-change: ${visible}`);
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

const handleClear = () => {
  eventLogs.value.unshift('clear');
  if (eventLogs.value.length > 5) eventLogs.value.pop();
};

// 代码示例
const basicCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    placeholder="请选择地区"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCascader } from 'ale-ui';
import type { CascaderOption } from 'ale-ui';

const value = ref<(string | number)[]>([]);

const options: CascaderOption[] = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'zhongguancun', label: '中关村' },
          { value: 'wudaokou', label: '五道口' }
        ]
      },
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'sanlitun', label: '三里屯' },
          { value: 'guomao', label: '国贸' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      {
        value: 'pudong',
        label: '浦东新区',
        children: [
          { value: 'lujiazui', label: '陆家嘴' },
          { value: 'zhangjiang', label: '张江' }
        ]
      },
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          { value: 'nanjinglu', label: '南京路' },
          { value: 'waitan', label: '外滩' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' }
        ]
      }
    ]
  },
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' }
        ]
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'yinzhou', label: '鄞州区' }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' }
        ]
      },
      {
        value: 'suzhou',
        label: '苏州市',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'sip', label: '工业园区' }
        ]
      }
    ]
  }
];
<\/script>`;

const allLevelsCode = `<template>
  <!-- 显示完整路径 -->
  <AleCascader
    v-model="value"
    :options="options"
    :show-all-levels="true"
    placeholder="显示完整路径"
  />
  
  <!-- 只显示最后一级 -->
  <AleCascader
    v-model="value"
    :options="options"
    :show-all-levels="false"
    placeholder="只显示最后一级"
  />
</template>`;

const separatorCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    separator=" > "
    placeholder="自定义分隔符"
  />
</template>`;

const clearableCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    clearable
    placeholder="可清空的选择器"
  />
</template>`;

const disabledCode = `<template>
  <!-- 禁用状态 -->
  <AleCascader
    v-model="value"
    :options="options"
    disabled
    placeholder="禁用状态"
  />
  
  <!-- 正常状态 -->
  <AleCascader
    v-model="value"
    :options="options"
    placeholder="正常状态"
  />
</template>`;

const sizeCode = `<template>
  <AleCascader v-model="value" :options="options" size="large" placeholder="大尺寸" />
  <AleCascader v-model="value" :options="options" size="medium" placeholder="中等尺寸" />
  <AleCascader v-model="value" :options="options" size="small" placeholder="小尺寸" />
</template>`;

const filterableCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    filterable
    placeholder="可搜索的选择器"
  />
</template>`;

const expandCode = `<template>
  <!-- 点击展开 -->
  <AleCascader
    v-model="value"
    :options="options"
    expand-trigger="click"
    placeholder="点击展开"
  />
  
  <!-- 悬停展开 -->
  <AleCascader
    v-model="value"
    :options="options"
    expand-trigger="hover"
    placeholder="悬停展开"
  />
</template>`;

const strictCode = `<template>
  <!-- 单选任意节点 -->
  <AleCascader
    v-model="singleValue"
    :options="options"
    check-strictly="single"
    placeholder="单选任意节点"
  />
  
  <!-- 多选任意节点 -->
  <AleCascader
    v-model="multipleValue"
    :options="options"
    check-strictly="multiple"
    placeholder="多选任意节点"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCascader } from 'ale-ui';

// 单选模式：值为一维数组
const singleValue = ref<(string | number)[]>([]);

// 多选模式：值为二维数组
const multipleValue = ref<(string | number)[][]>([]);
<\/script>`;

const eventCode = `<template>
  <AleCascader
    v-model="value"
    :options="options"
    @change="handleChange"
    @expand-change="handleExpandChange"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<(string | number)[]>([]);

const handleChange = (value) => {
  console.log('change:', value);
};

const handleExpandChange = (value) => {
  console.log('expand-change:', value);
};

const handleVisibleChange = (visible) => {
  console.log('visible-change:', visible);
};

const handleClear = () => {
  console.log('clear');
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
  margin: 0 0 12px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__section-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
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
  margin-left: 16px;
}

.event-log {
  flex: 1;
  margin-left: 16px;
  padding: 12px;
  background: var(--color-gray-50);
  border-radius: var(--radius-base);
  font-size: 13px;
  color: var(--color-text-secondary);
  max-height: 120px;
  overflow-y: auto;
}

.event-log p {
  margin: 4px 0;
}

.event-log p:first-child {
  color: var(--color-primary);
  font-weight: 500;
}
</style>
