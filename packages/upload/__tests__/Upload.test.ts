import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Upload from '../Upload.vue';
import type { UploadFile } from '../types';

// 模拟 URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('Upload', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // ==================== 基础渲染测试 ====================

  it('renders correctly', () => {
    const wrapper = mount(Upload);
    expect(wrapper.find('.ale-upload').exists()).toBe(true);
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });

  it('renders with default trigger button', () => {
    const wrapper = mount(Upload);
    expect(wrapper.find('.ale-button').exists()).toBe(true);
    expect(wrapper.find('.ale-button').text()).toContain('上传文件');
  });

  it('renders with custom trigger slot', () => {
    const wrapper = mount(Upload, {
      slots: {
        default: '<button class="custom-trigger">Custom Upload</button>'
      }
    });
    expect(wrapper.find('.custom-trigger').exists()).toBe(true);
    expect(wrapper.find('.custom-trigger').text()).toBe('Custom Upload');
  });

  it('renders drag area when drag prop is true', () => {
    const wrapper = mount(Upload, {
      props: { drag: true }
    });
    expect(wrapper.find('.ale-upload-dragger').exists()).toBe(true);
    expect(wrapper.find('.ale-button').exists()).toBe(false);
  });

  // ==================== Props 测试 ====================

  it('applies correct size class', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(Upload, {
        props: { size }
      });
      expect(wrapper.classes()).toContain(`ale-upload--${size}`);
      wrapper.unmount();
    });
  });

  it('applies correct listType class', () => {
    const listTypes = ['text', 'picture', 'picture-card'] as const;

    listTypes.forEach((listType) => {
      const wrapper = mount(Upload, {
        props: { listType }
      });
      expect(wrapper.classes()).toContain(`ale-upload--${listType}`);
      wrapper.unmount();
    });
  });

  it('applies disabled class when disabled prop is true', () => {
    const wrapper = mount(Upload, {
      props: { disabled: true }
    });
    expect(wrapper.classes()).toContain('ale-upload--disabled');
    expect(wrapper.find('.ale-button').classes()).toContain('is-disabled');
  });

  it('sets accept attribute on input', () => {
    const wrapper = mount(Upload, {
      props: { accept: '.jpg,.png' }
    });
    expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('.jpg,.png');
  });

  it('sets multiple attribute on input', () => {
    const wrapper = mount(Upload, {
      props: { multiple: true }
    });
    expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeDefined();
  });

  it('renders tip when limit is set', () => {
    const wrapper = mount(Upload, {
      props: { limit: 3 }
    });
    expect(wrapper.find('.ale-upload__tip').text()).toBe('最多上传 3 个文件');
  });

  it('does not render file list when showFileList is false', async () => {
    const wrapper = mount(Upload, {
      props: {
        showFileList: false,
        modelValue: [{ uid: '1', name: 'test.txt' }] as UploadFile[]
      }
    });
    expect(wrapper.find('.ale-upload-list').exists()).toBe(false);
  });

  // ==================== 文件列表测试 ====================

  it('renders file list with modelValue', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'file1.txt', status: 'success' },
      { uid: '2', name: 'file2.txt', status: 'success' }
    ];
    const wrapper = mount(Upload, {
      props: { modelValue: files }
    });
    expect(wrapper.findAll('.ale-upload-list__item')).toHaveLength(2);
    expect(wrapper.findAll('.ale-upload-list__item-name')[0].text()).toBe('file1.txt');
  });

  it('renders file status correctly', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'success.txt', status: 'success' },
      { uid: '2', name: 'error.txt', status: 'error' },
      { uid: '3', name: 'uploading.txt', status: 'uploading', percentage: 50 }
    ];
    const wrapper = mount(Upload, {
      props: { modelValue: files }
    });

    const items = wrapper.findAll('.ale-upload-list__item');
    expect(items[0].classes()).toContain('is-success');
    expect(items[1].classes()).toContain('is-error');
    expect(items[2].classes()).toContain('is-uploading');
  });

  // ==================== 事件测试 ====================

  it('emits click event when trigger is clicked', async () => {
    const wrapper = mount(Upload);
    await (wrapper.find('.ale-button') as any).trigger('click');
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });

  it('does not trigger click when disabled', async () => {
    const wrapper = mount(Upload, {
      props: { disabled: true }
    });
    const input = wrapper.find('input[type="file"]');
    const clickSpy = vi.spyOn(input.element as HTMLInputElement, 'click');
    await (wrapper.find('.ale-button') as any).trigger('click');
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('emits remove event when remove button is clicked', async () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'test.txt', status: 'success' }
    ];
    const wrapper = mount(Upload, {
      props: { modelValue: files }
    });
    await (wrapper.find('.ale-upload-list__item-action') as any).trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('emits preview event when file name is clicked', async () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'test.txt', status: 'success' }
    ];
    const wrapper = mount(Upload, {
      props: { modelValue: files }
    });
    await (wrapper.find('.ale-upload-list__item-name') as any).trigger('click');
    expect(wrapper.emitted('preview')).toBeTruthy();
    expect(wrapper.emitted('preview')![0]).toEqual([files[0]]);
  });

  // ==================== 拖拽上传测试 ====================

  it('handles dragover event', async () => {
    const wrapper = mount(Upload, {
      props: { drag: true }
    });
    await wrapper.find('.ale-upload-dragger').trigger('dragover');
    expect(wrapper.classes()).toContain('ale-upload--dragging');
  });

  it('handles dragleave event', async () => {
    const wrapper = mount(Upload, {
      props: { drag: true }
    });
    await wrapper.find('.ale-upload-dragger').trigger('dragover');
    expect(wrapper.classes()).toContain('ale-upload--dragging');
    await wrapper.find('.ale-upload-dragger').trigger('dragleave');
    expect(wrapper.classes()).not.toContain('ale-upload--dragging');
  });

  it('handles drop event', async () => {
    const wrapper = mount(Upload, {
      props: { drag: true }
    });

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    
    // 创建一个类似 FileList 的对象
    const fileListLike = {
      0: file,
      length: 1,
      item: (index: number) => file,
      [Symbol.iterator]: function* () {
        yield file;
      }
    };

    await (wrapper.find('.ale-upload-dragger') as any).trigger('drop', {
      dataTransfer: { files: fileListLike }
    });
    
    // 推进时间让异步上传完成
    vi.advanceTimersByTime(600);
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('does not handle drop when disabled', async () => {
    const wrapper = mount(Upload, {
      props: { drag: true, disabled: true }
    });

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const dataTransfer = { files: [file] };

    await wrapper.find('.ale-upload-dragger').trigger('drop', {
      dataTransfer
    });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  // ==================== 文件上传测试 ====================

  it('uploads files when input changes', async () => {
    const wrapper = mount(Upload);

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const fileList = [file];

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: fileList,
      writable: false
    });

    await input.trigger('change');

    // 没有 action，自动变为 success
    vi.advanceTimersByTime(600);
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('success')).toBeTruthy();
  });

  it('triggers exceed event when limit is exceeded', async () => {
    const wrapper = mount(Upload, {
      props: { limit: 1 }
    });

    const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file1, file2],
      writable: false
    });

    await input.trigger('change');

    expect(wrapper.emitted('exceed')).toBeTruthy();
  });

  it('calls beforeUpload hook before uploading', async () => {
    const beforeUpload = vi.fn().mockReturnValue(true);
    const wrapper = mount(Upload, {
      props: { beforeUpload }
    });

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false
    });

    await input.trigger('change');
    vi.advanceTimersByTime(100);
    await flushPromises();

    expect(beforeUpload).toHaveBeenCalled();
  });

  it('cancels upload when beforeUpload returns false', async () => {
    const beforeUpload = vi.fn().mockReturnValue(false);
    const wrapper = mount(Upload, {
      props: { beforeUpload }
    });

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false
    });

    await input.trigger('change');
    await flushPromises();

    expect(wrapper.emitted('success')).toBeFalsy();
    expect(wrapper.emitted('remove')).toBeTruthy();
  });

  it('does not auto upload when autoUpload is false', async () => {
    const wrapper = mount(Upload, {
      props: { autoUpload: false }
    });

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false
    });

    await input.trigger('change');
    vi.advanceTimersByTime(1000);
    await flushPromises();

    expect(wrapper.emitted('success')).toBeFalsy();
  });

  // ==================== 暴露方法测试 ====================

  it('submits files manually with submit method', async () => {
    const wrapper = mount(Upload, {
      props: { autoUpload: false }
    });

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false
    });

    await input.trigger('change');
    await flushPromises();

    expect(wrapper.emitted('success')).toBeFalsy();

    // 手动提交
    (wrapper.vm as any).submit();
    vi.advanceTimersByTime(600);
    await flushPromises();

    expect(wrapper.emitted('success')).toBeTruthy();
  });

  it('clears files with clearFiles method', async () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'test.txt', status: 'success' }
    ];
    const wrapper = mount(Upload, {
      props: { modelValue: files }
    });

    expect(wrapper.findAll('.ale-upload-list__item')).toHaveLength(1);

    (wrapper.vm as any).clearFiles();
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([[]]);
  });

  // ==================== Picture Card 模式测试 ====================

  it('renders picture-card list type correctly', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'image.jpg', status: 'success', url: 'http://example.com/image.jpg' }
    ];
    const wrapper = mount(Upload, {
      props: { listType: 'picture-card', modelValue: files }
    });

    expect(wrapper.find('.ale-upload-list--picture-card').exists()).toBe(true);
    expect(wrapper.find('.ale-upload-list__item-thumbnail').exists()).toBe(true);
  });

  it('renders picture list type correctly', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'image.jpg', status: 'success', url: 'http://example.com/image.jpg' }
    ];
    const wrapper = mount(Upload, {
      props: { listType: 'picture', modelValue: files }
    });

    expect(wrapper.find('.ale-upload-list--picture').exists()).toBe(true);
    expect(wrapper.find('.ale-upload-list__item-thumbnail img').exists()).toBe(true);
  });

  // ==================== 自定义上传测试 ====================

  it('uses custom httpRequest when provided', async () => {
    const httpRequest = vi.fn().mockResolvedValue({ data: 'success' });
    const wrapper = mount(Upload, {
      props: { httpRequest }
    });

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false
    });

    await input.trigger('change');
    await flushPromises();

    expect(httpRequest).toHaveBeenCalled();
  });

  // ==================== 边界条件测试 ====================

  it('handles empty file list', () => {
    const wrapper = mount(Upload, {
      props: { modelValue: [] }
    });
    expect(wrapper.find('.ale-upload-list').exists()).toBe(false);
  });

  it('handles file without raw property', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'test.txt', status: 'success' }
    ];
    const wrapper = mount(Upload, {
      props: { modelValue: files }
    });
    expect(wrapper.findAll('.ale-upload-list__item')).toHaveLength(1);
  });

  it('identifies image files correctly', () => {
    const imageFiles: UploadFile[] = [
      { uid: '1', name: 'test.jpg', status: 'success' },
      { uid: '2', name: 'test.png', status: 'success' },
      { uid: '3', name: 'test.gif', status: 'success' }
    ];
    const wrapper = mount(Upload, {
      props: { listType: 'picture', modelValue: imageFiles }
    });

    const thumbnails = wrapper.findAll('.ale-upload-list__item-thumbnail');
    expect(thumbnails.length).toBe(3);
  });
});
