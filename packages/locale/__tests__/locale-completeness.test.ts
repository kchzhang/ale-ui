import zhCN from '../zh-CN';
import zhTW from '../zh-TW';
import zhHK from '../zh-HK';
import enUS from '../en-US';
import type { AleUILocale } from '../types';

/**
 * 递归获取所有键名
 */
function getAllKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

describe('Locale completeness', () => {
  it('all locale files have the same keys', () => {
    const zhCNKeys = getAllKeys(zhCN);
    const zhTWKeys = getAllKeys(zhTW);
    const zhHKKeys = getAllKeys(zhHK);
    const enUSKeys = getAllKeys(enUS);

    // 检查键名数量是否一致
    expect(zhCNKeys.length).toBe(zhTWKeys.length);
    expect(zhCNKeys.length).toBe(zhHKKeys.length);
    expect(zhCNKeys.length).toBe(enUSKeys.length);

    // 检查所有键名是否相同
    const sortedZhCNKeys = zhCNKeys.sort();
    const sortedZhTWKeys = zhTWKeys.sort();
    const sortedZhHKKeys = zhHKKeys.sort();
    const sortedEnUSKeys = enUSKeys.sort();

    expect(sortedZhCNKeys).toEqual(sortedZhTWKeys);
    expect(sortedZhCNKeys).toEqual(sortedZhHKKeys);
    expect(sortedZhCNKeys).toEqual(sortedEnUSKeys);
  });

  it('no empty translations', () => {
    const checkEmpty = (obj: any, path = '') => {
      for (const key in obj) {
        const value = obj[key];
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === 'string') {
          expect(value).not.toBe('');
          expect(value.length).toBeGreaterThan(0);
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          checkEmpty(value, currentPath);
        }
      }
    };

    checkEmpty(zhCN);
    checkEmpty(zhTW);
    checkEmpty(zhHK);
    checkEmpty(enUS);
  });

  it('all common button texts exist', () => {
    const buttonKeys = [
      'ale.button.confirm',
      'ale.button.cancel',
      'ale.button.submit',
      'ale.button.reset',
      'ale.button.delete',
      'ale.button.edit',
      'ale.button.save',
      'ale.button.search',
      'ale.button.filter',
      'ale.button.export',
      'ale.button.import'
    ];

    buttonKeys.forEach(key => {
      expect(zhCN[key.split('.')[0]][key.split('.')[1]][key.split('.')[2]]).toBeDefined();
      expect(enUS[key.split('.')[0]][key.split('.')[1]][key.split('.')[2]]).toBeDefined();
    });
  });

  it('component translations exist for all components', () => {
    const componentKeys = [
      'datePicker',
      'timePicker',
      'table',
      'pagination',
      'dialog',
      'upload',
      'select',
      'tagInput',
      'tree',
      'transfer'
    ];

    componentKeys.forEach(key => {
      expect(zhCN[key]).toBeDefined();
      expect(zhTW[key]).toBeDefined();
      expect(zhHK[key]).toBeDefined();
      expect(enUS[key]).toBeDefined();
    });
  });
});

describe('Translation quality', () => {
  it('zh-HK has correct regional differences', () => {
    // 香港繁体差异检查
    expect(zhHK.ale.button.confirm).toBe('確定'); // 台湾是'確認'
    expect(zhHK.ale.button.reset).toBe('重設'); // 台湾是'重置'
    expect(zhHK.ale.button.save).toBe('儲存'); // 台湾是'保存'
    expect(zhHK.ale.button.search).toBe('搜尋'); // 台湾是'搜索'
    expect(zhHK.upload.upload).toBe('上載'); // 台湾是'上傳'
  });

  it('English translations are correct', () => {
    expect(enUS.ale.button.confirm).toBe('Confirm');
    expect(enUS.ale.button.cancel).toBe('Cancel');
    expect(enUS.ale.status.loading).toBe('Loading...');
    expect(enUS.table.emptyText).toBe('No data');
    expect(enUS.pagination.total).toContain('Total');
    expect(enUS.upload.upload).toBe('Upload');
  });
});
