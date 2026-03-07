#!/usr/bin/env node

/**
 * 组件代码行数检查脚本
 * 规则：任何组件文件不得超过 600 行代码（不含空行和注释）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_LINES = 600;
const WARN_LINES = 300;

// 需要检查的目录
const TARGET_DIRS = ['packages', 'src'];

// 需要排除的目录
const EXCLUDE_PATTERNS = [
  'node_modules',
  '__tests__',
  'dist',
  '.git'
];

/**
 * 计算文件有效行数（不含空行和注释）
 */
function countLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  let inMultiLineComment = false;
  
  return lines.filter(line => {
    const trimmed = line.trim();
    
    // 跳过空行
    if (trimmed.length === 0) return false;
    
    // 处理多行注释开始
    if (trimmed.startsWith('/*') || trimmed.startsWith('<!--')) {
      inMultiLineComment = true;
      // 检查是否是单行的多行注释
      if (trimmed.endsWith('*/') || trimmed.endsWith('-->')) {
        inMultiLineComment = false;
      }
      return false;
    }
    
    // 处理多行注释结束
    if (inMultiLineComment) {
      if (trimmed.endsWith('*/') || trimmed.endsWith('-->')) {
        inMultiLineComment = false;
      }
      return false;
    }
    
    // 跳过单行注释
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('*')) {
      return false;
    }
    
    return true;
  }).length;
}

/**
 * 递归获取所有 Vue 文件
 */
function getVueFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    // 排除特定目录
    if (EXCLUDE_PATTERNS.some(pattern => item.includes(pattern))) {
      continue;
    }
    
    if (stat.isDirectory()) {
      getVueFiles(fullPath, files);
    } else if (item.endsWith('.vue')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * 格式化输出
 */
function formatOutput(results) {
  const violations = results.filter(r => r.status === 'violation');
  const warnings = results.filter(r => r.status === 'warning');
  const healthy = results.filter(r => r.status === 'healthy');
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 组件行数检查报告');
  console.log('='.repeat(60));
  
  // 违规项
  if (violations.length > 0) {
    console.log('\n❌ 违规组件（超过 600 行）:\n');
    violations.forEach(v => {
      console.log(`  ${v.file}`);
      console.log(`     行数: ${v.lines} | 超出: ${v.exceeded} 行\n`);
    });
  }
  
  // 警告项
  if (warnings.length > 0) {
    console.log('\n⚠️  警告组件（300-600 行）:\n');
    warnings.forEach(w => {
      console.log(`  ${w.file}`);
      console.log(`     行数: ${w.lines} | 建议: 考虑拆分优化\n`);
    });
  }
  
  // 健康组件统计
  console.log('\n✅ 健康组件统计:');
  console.log(`   健康 (<300 行): ${healthy.length} 个`);
  console.log(`   警告 (300-600 行): ${warnings.length} 个`);
  console.log(`   违规 (>600 行): ${violations.length} 个`);
  console.log(`   总计: ${results.length} 个组件\n`);
  
  // 详细列表
  if (process.argv.includes('--detail') || process.argv.includes('-d')) {
    console.log('\n📋 详细列表:\n');
    results.forEach(r => {
      const icon = r.status === 'healthy' ? '🟢' : r.status === 'warning' ? '🟡' : '🔴';
      console.log(`  ${icon} ${r.file}: ${r.lines} 行`);
    });
    console.log('');
  }
  
  console.log('='.repeat(60) + '\n');
  
  return violations.length;
}

/**
 * 主函数
 */
function main() {
  console.log('\n🔍 开始检查组件行数...\n');
  
  const allFiles = [];
  
  // 收集所有 Vue 文件
  TARGET_DIRS.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    const files = getVueFiles(dirPath);
    allFiles.push(...files);
  });
  
  const results = allFiles.map(file => {
    const lines = countLines(file);
    const relativePath = path.relative(path.join(__dirname, '..'), file);
    
    let status;
    let exceeded = 0;
    
    if (lines > MAX_LINES) {
      status = 'violation';
      exceeded = lines - MAX_LINES;
    } else if (lines > WARN_LINES) {
      status = 'warning';
    } else {
      status = 'healthy';
    }
    
    return {
      file: relativePath,
      lines,
      status,
      exceeded
    };
  });
  
  // 按行数降序排序
  results.sort((a, b) => b.lines - a.lines);
  
  const violationCount = formatOutput(results);
  
  // 返回退出码
  process.exit(violationCount > 0 ? 1 : 0);
}

main();
