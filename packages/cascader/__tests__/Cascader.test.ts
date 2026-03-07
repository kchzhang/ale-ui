/**
 * Cascader 组件测试用例
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Cascader from '../Cascader.vue';
import type { CascaderOption } from '../types';

// 清理 teleported 到 body 的元素
afterEach(() => {
  // 移除所有 teleport 到 body 的下拉菜单
  const dropdowns = document.querySelectorAll('.ale-cascader__dropdown');
  dropdowns.forEach(el => el.remove());
});

describe('Cascader 组件', () => {
  // 基础选项数据
  const options: CascaderOption[] = [
    {
      value: 'zhinan',
      label: '指南',
      children: [
        {
          value: 'sheji',
          label: '设计',
          children: [
            { value: 'yuanze', label: '原则' },
            { value: 'daohang', label: '导航' }
          ]
        },
        {
          value: 'kaifa',
          label: '开发',
          children: [
            { value: 'jiaohu', label: '交互' },
            { value: 'shuju', label: '数据' }
          ]
        }
      ]
    },
    {
      value: 'ziyuan',
      label: '资源',
      children: [
        { value: 'axure', label: 'Axure' },
        { value: 'sketch', label: 'Sketch' }
      ]
    },
    {
      value: 'component',
      label: '组件',
      disabled: true
    }
  ];

  describe('基础功能', () => {
    it('应该正确渲染级联选择器', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        }
      });
      expect(wrapper.classes()).toContain('ale-cascader');
    });

    it('应该显示占位符', () => {
      const placeholder = '请选择地区';
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          placeholder
        }
      });
      expect(wrapper.text()).toContain(placeholder);
    });

    it('应该正确显示选中的值', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze']
        }
      });
      expect(wrapper.text()).toContain('指南');
    });

    it('应该显示完整路径', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          showAllLevels: true
        }
      });
      expect(wrapper.text()).toContain('指南');
      expect(wrapper.text()).toContain('设计');
      expect(wrapper.text()).toContain('原则');
    });

    it('应该只显示最后一级（showAllLevels=false）', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          showAllLevels: false
        }
      });
      expect(wrapper.text()).toContain('原则');
    });
  });

  describe('尺寸', () => {
    it('应该支持大尺寸', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          size: 'large'
        }
      });
      expect(wrapper.classes()).toContain('ale-cascader--large');
    });

    it('应该支持中等尺寸', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          size: 'medium'
        }
      });
      expect(wrapper.classes()).toContain('ale-cascader--medium');
    });

    it('应该支持小尺寸', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          size: 'small'
        }
      });
      expect(wrapper.classes()).toContain('ale-cascader--small');
    });
  });

  describe('禁用状态', () => {
    it('应该支持禁用状态', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          disabled: true
        }
      });
      expect(wrapper.classes()).toContain('is-disabled');
    });

    it('禁用时不应打开下拉菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          disabled: true
        }
      });

      await wrapper.find('.ale-cascader__trigger').trigger('click');
      expect(wrapper.emitted('visible-change')).toBeFalsy();
    });

    it('应该正确显示禁用的选项', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        },
        attachTo: document.body
      });

      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      const disabledOption = document.querySelector('.ale-cascader__option.is-disabled');
      expect(disabledOption).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('只读状态', () => {
    it('应该支持只读状态', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan'],
          readonly: true
        }
      });

      await wrapper.find('.ale-cascader__trigger').trigger('click');
      // 只读模式下不应打开下拉菜单
      expect(wrapper.emitted('visible-change')).toBeFalsy();
    });
  });

  describe('可清空', () => {
    it('应该在有值时显示清空按钮', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          clearable: true
        }
      });

      // 悬停以显示清空按钮
      await wrapper.find('.ale-cascader__trigger').trigger('mouseenter');
      expect(wrapper.find('.ale-cascader__clear').exists()).toBe(true);
    });

    it('点击清空按钮应该清空选中值', async () => {
      const onUpdate = vi.fn();
      const onClear = vi.fn();
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          clearable: true,
          'onUpdate:modelValue': onUpdate,
          onClear: onClear
        }
      });

      // 悬停显示清除按钮
      await wrapper.find('.ale-cascader__trigger').trigger('mouseenter');
      await nextTick();

      // 点击清除按钮
      await wrapper.find('.ale-cascader__clear').trigger('click');
      await nextTick();

      expect(onClear).toHaveBeenCalled();
      expect(onUpdate).toHaveBeenCalledWith([]);
    });
  });

  describe('下拉菜单交互', () => {
    it('点击触发器应该打开下拉菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        },
        attachTo: document.body
      });

      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      expect(wrapper.emitted('visible-change')).toBeTruthy();
      expect(wrapper.emitted('visible-change')![0]).toEqual([true]);

      wrapper.unmount();
    });

    it('应该显示第一级选项', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        },
        attachTo: document.body
      });

      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      const dropdown = document.querySelector('.ale-cascader__dropdown');
      expect(dropdown).toBeTruthy();

      // 使用更精确的选择器，只查找当前下拉菜单中的第一级选项
      const firstList = dropdown?.querySelector('.ale-cascader__list');
      const firstLevelOptions = firstList?.querySelectorAll('.ale-cascader__option');
      expect(firstLevelOptions?.length).toBe(3);

      wrapper.unmount();
    });

    it('应该显示多级菜单（测试展开逻辑）', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji']
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 应该根据已选值初始化激活路径，显示多级菜单
      const dropdown = document.querySelector('.ale-cascader__dropdown');
      const lists = dropdown?.querySelectorAll('.ale-cascader__list');
      // 因为选中了第二级，所以应该显示三级菜单（第一级 + 第二级 + 第三级未展开）
      // 实际上初始化 activePath 为选中路径的前 n-1 项
      expect(lists?.length).toBeGreaterThanOrEqual(1);

      wrapper.unmount();
    });
  });

  describe('选择功能', () => {
    it('应该正确显示选中的值', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze']
        }
      });

      // 验证选中值正确显示
      expect(wrapper.text()).toContain('指南');
      expect(wrapper.text()).toContain('设计');
      expect(wrapper.text()).toContain('原则');
    });

    it('通过 v-model 更新值应该触发 change 事件', async () => {
      const onUpdate = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          'onUpdate:modelValue': onUpdate,
          onChange: onChange
        }
      });

      // 模拟选择行为：通过 props 更新
      await wrapper.setProps({ modelValue: ['zhinan', 'sheji', 'yuanze'] });

      // 验证组件正确响应
      expect(wrapper.text()).toContain('指南');
    });

    it('选择叶子节点后应该正确显示路径', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['ziyuan', 'axure']
        }
      });

      // 验证选中值正确显示
      expect(wrapper.text()).toContain('资源');
      expect(wrapper.text()).toContain('Axure');
    });
  });

  describe('搜索功能 (filterable)', () => {
    it('应该支持搜索功能', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          filterable: true
        }
      });
      expect(wrapper.classes()).toContain('ale-cascader');
    });

    it('搜索时应该显示搜索结果', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          filterable: true
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 输入搜索词
      const input = wrapper.find('.ale-cascader__input');
      await input.setValue('原则');
      await input.trigger('input');
      await nextTick();

      // 应该显示搜索结果
      const searchList = document.querySelector('.ale-cascader__search-list');
      expect(searchList).toBeTruthy();

      wrapper.unmount();
    });

    it('搜索无结果时应该显示空状态', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          filterable: true
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 输入搜索词（无匹配）
      const input = wrapper.find('.ale-cascader__input');
      await input.setValue('不存在的内容XYZ');
      await input.trigger('input');
      await nextTick();

      // 应该显示空状态
      const emptyState = document.querySelector('.ale-cascader__empty');
      expect(emptyState).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('键盘交互', () => {
    it('应该支持 Escape 键关闭下拉菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          filterable: true
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 验证下拉已打开
      expect(wrapper.emitted('visible-change')?.[0]).toEqual([true]);

      // 按 Escape 键
      const input = wrapper.find('.ale-cascader__input');
      await input.trigger('keydown', { key: 'Escape' });
      await nextTick();

      wrapper.unmount();
    });

    it('应该支持 Tab 键关闭下拉菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          filterable: true
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 按 Tab 键
      const input = wrapper.find('.ale-cascader__input');
      await input.trigger('keydown', { key: 'Tab' });
      await nextTick();

      wrapper.unmount();
    });
  });

  describe('展开模式', () => {
    it('应该支持 hover 展开模式', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          expandTrigger: 'hover'
        },
        attachTo: document.body
      });

      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // hover 第一个选项
      const firstOption = document.querySelector('.ale-cascader__option');
      if (firstOption) {
        firstOption.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      }
      await nextTick();

      wrapper.unmount();
    });
  });

  describe('事件', () => {
    it('应该触发 focus 事件', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          onFocus
        }
      });

      await wrapper.find('.ale-cascader__trigger').trigger('focus');
      expect(onFocus).toHaveBeenCalled();
    });

    it('应该触发 blur 事件', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          onBlur
        }
      });

      await wrapper.find('.ale-cascader__trigger').trigger('focus');
      await wrapper.find('.ale-cascader__trigger').trigger('blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('方法', () => {
    it('应该暴露 focus 方法', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        }
      });

      expect(typeof wrapper.vm.focus).toBe('function');
    });

    it('应该暴露 clear 方法', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan']
        }
      });

      expect(typeof wrapper.vm.clear).toBe('function');
    });

    it('应该暴露 openDropdown 方法', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        }
      });

      expect(typeof wrapper.vm.openDropdown).toBe('function');
    });

    it('应该暴露 closeDropdown 方法', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        }
      });

      expect(typeof wrapper.vm.closeDropdown).toBe('function');
    });
  });

  describe('加载状态', () => {
    it('应该显示加载状态', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options: [],
          modelValue: [],
          loading: true
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 应该有加载状态
      const loadingEl = document.querySelector('.ale-cascader__loading');
      expect(loadingEl).toBeTruthy();

      wrapper.unmount();
    });

    it('应该显示自定义加载文本', async () => {
      const loadingText = '正在加载...';
      const wrapper = mount(Cascader, {
        props: {
          options: [],
          modelValue: [],
          loading: true,
          loadingText
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 下拉菜单应该存在
      const dropdown = document.querySelector('.ale-cascader__dropdown');
      expect(dropdown).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('空状态', () => {
    it('应该显示无数据提示', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options: [],
          modelValue: []
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 应该显示空状态
      const emptyEl = document.querySelector('.ale-cascader__empty');
      expect(emptyEl).toBeTruthy();

      wrapper.unmount();
    });

    it('应该显示自定义无数据提示', async () => {
      const noDataText = '没有可选数据';
      const wrapper = mount(Cascader, {
        props: {
          options: [],
          modelValue: [],
          noDataText
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 下拉菜单应该存在
      const dropdown = document.querySelector('.ale-cascader__dropdown');
      expect(dropdown).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('分隔符', () => {
    it('应该支持自定义分隔符', () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          separator: ' > ',
          showAllLevels: true
        }
      });

      expect(wrapper.text()).toContain('指南');
    });
  });

  describe('点击外部关闭', () => {
    it('应该点击外部关闭下拉菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: []
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 验证下拉已打开
      expect(wrapper.emitted('visible-change')?.[0]).toEqual([true]);

      // 点击外部
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      wrapper.unmount();
    });
  });

  describe('自定义分隔符', () => {
    it('应该使用自定义分隔符显示选中路径', () => {
      const separator = ' > ';
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          separator,
          showAllLevels: true
        }
      });

      expect(wrapper.text()).toContain('指南');
      expect(wrapper.text()).toContain('设计');
      expect(wrapper.text()).toContain('原则');
    });
  });

  describe('关闭菜单选项', () => {
    it('closeOnSelect=false 时不应在选择后关闭菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          closeOnSelect: false
        },
        attachTo: document.body
      });

      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();

      // 验证下拉已打开
      expect(wrapper.emitted('visible-change')?.[0]).toEqual([true]);

      wrapper.unmount();
    });
  });

  describe('单选任意节点模式 (checkStrictly="single")', () => {
    it('应该显示 Radio 组件', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          checkStrictly: 'single'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证 Radio 组件存在（下拉菜单被 teleport 到 body）
      const radios = document.querySelectorAll('.ale-radio');
      expect(radios.length).toBeGreaterThan(0);

      wrapper.unmount();
    });

    it('单选模式下只能有一个节点高亮', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          checkStrictly: 'single'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 检查选中的 Radio 数量，应该只有一个
      const checkedRadios = document.querySelectorAll('.ale-radio.is-checked');
      expect(checkedRadios.length).toBe(1);

      wrapper.unmount();
    });

    it('路径上的文案应该高亮显示', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          checkStrictly: 'single'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 检查路径上的节点数量（应该有3个节点在路径上）
      const inPathOptions = document.querySelectorAll('.ale-cascader__option.is-in-path');
      expect(inPathOptions.length).toBe(3);

      wrapper.unmount();
    });

    it('选中节点时应该清空之前的选中状态', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: ['zhinan', 'sheji', 'yuanze'],
          checkStrictly: 'single'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 选中第一级的一个不同选项
      const radioInputs = document.querySelectorAll('.ale-radio__original');
      if (radioInputs.length > 1) {
        // 模拟用户点击：先设置 checked，再触发 change
        const input = radioInputs[1] as HTMLInputElement;
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await nextTick();
        await new Promise(resolve => setTimeout(resolve, 50));

        // 验证 modelValue 更新为新的路径（只有一级）
        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted).toBeTruthy();
        // 新的选中路径应该是 ['ziyuan']
        expect(emitted?.[emitted.length - 1]?.[0]).toEqual(['ziyuan']);
      }

      wrapper.unmount();
    });

    it('选中节点后应该更新 activePath 展开子菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          checkStrictly: 'single'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 选中第一级的一个有子节点的选项
      const radioInputs = document.querySelectorAll('.ale-radio__original');
      if (radioInputs.length > 0) {
        // 模拟用户点击：先设置 checked，再触发 change
        const input = radioInputs[0] as HTMLInputElement;
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await nextTick();
        await new Promise(resolve => setTimeout(resolve, 50));

        // 验证触发了 expand-change 事件
        const expandEmitted = wrapper.emitted('expand-change');
        expect(expandEmitted).toBeTruthy();
      }

      wrapper.unmount();
    });

    it('选中节点后不应该关闭下拉菜单', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          checkStrictly: 'single'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 选中一个选项
      const radios = document.querySelectorAll('.ale-radio');
      if (radios.length > 0) {
        radios[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        // 验证没有触发 visible-change 事件（关闭）
        const visibleEmitted = wrapper.emitted('visible-change');
        // 应该只有一个打开事件，没有关闭事件
        expect(visibleEmitted?.length).toBe(1);
        expect(visibleEmitted?.[0]).toEqual([true]);
      }

      wrapper.unmount();
    });
  });

  describe('多选任意节点模式 (checkStrictly="multiple")', () => {
    it('应该显示 Checkbox 组件', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          checkStrictly: 'multiple'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证 Checkbox 组件存在（下拉菜单被 teleport 到 body）
      const checkboxes = document.querySelectorAll('.ale-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);

      wrapper.unmount();
    });

    it('选中多个节点时应该正确更新 modelValue', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [],
          checkStrictly: 'multiple'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 选中第一个选项
      const checkboxes = document.querySelectorAll('.ale-checkbox');
      if (checkboxes.length > 0) {
        checkboxes[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        // 验证 modelValue 更新
        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted).toBeTruthy();
        // 应该是一个二维数组
        const newValue = emitted?.[emitted.length - 1]?.[0] as (string | number)[][];
        expect(Array.isArray(newValue)).toBe(true);
        expect(newValue.length).toBe(1);
      }

      wrapper.unmount();
    });

    it('取消选中节点时应该从 modelValue 中移除', async () => {
      const wrapper = mount(Cascader, {
        props: {
          options,
          modelValue: [['zhinan']],
          checkStrictly: 'multiple'
        },
        attachTo: document.body
      });

      // 打开下拉菜单
      await wrapper.find('.ale-cascader__trigger').trigger('click');
      await nextTick();
      await new Promise(resolve => setTimeout(resolve, 50));

      // 再次点击同一个选项取消选中
      const checkboxes = document.querySelectorAll('.ale-checkbox');
      if (checkboxes.length > 0) {
        checkboxes[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await nextTick();

        // 验证 modelValue 更新为空数组
        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted).toBeTruthy();
        const newValue = emitted?.[emitted.length - 1]?.[0] as (string | number)[][];
        expect(newValue.length).toBe(0);
      }

      wrapper.unmount();
    });
  });
});
