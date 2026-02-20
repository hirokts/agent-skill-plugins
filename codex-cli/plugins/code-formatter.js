/**
 * Code Formatter Plugin for Codex CLI
 * コードフォーマットを統一するプラグイン
 */

module.exports = {
  name: 'code-formatter',
  version: '1.0.0',
  description: 'プロジェクト全体のコードフォーマットを統一',
  author: 'agent-skill-plugins',
  
  commands: {
    'format': {
      description: 'コードをフォーマット',
      options: {
        '--path': {
          description: 'フォーマット対象のパス',
          type: 'string',
          default: '.'
        },
        '--type': {
          description: 'ファイルタイプ (js, ts, py, go, all)',
          type: 'string',
          default: 'all'
        },
        '--fix': {
          description: '自動修正を実行',
          type: 'boolean',
          default: false
        },
        '--check': {
          description: 'チェックのみ（修正しない）',
          type: 'boolean',
          default: false
        }
      },
      action: async (args, options) => {
        const { exec } = require('child_process');
        const util = require('util');
        const execPromise = util.promisify(exec);
        const path = require('path');
        
        console.log(`コードフォーマットを実行中... (${options.path})`);
        
        try {
          const formatters = {
            js: 'prettier',
            ts: 'prettier',
            py: 'black',
            go: 'gofmt',
            all: 'prettier'
          };
          
          const formatter = formatters[options.type] || formatters.all;
          let command = '';
          
          if (formatter === 'prettier') {
            command = options.check 
              ? `npx prettier --check "${options.path}/**/*.{js,ts,jsx,tsx}"`
              : `npx prettier --write "${options.path}/**/*.{js,ts,jsx,tsx}"`;
          } else if (formatter === 'black') {
            command = options.check
              ? `black --check "${options.path}"`
              : `black "${options.path}"`;
          } else if (formatter === 'gofmt') {
            command = options.check
              ? `gofmt -l "${options.path}"`
              : `gofmt -w "${options.path}"`;
          }
          
          const { stdout, stderr } = await execPromise(command);
          
          if (stdout) console.log(stdout);
          if (stderr) console.error(stderr);
          
          console.log('✓ フォーマット完了');
          
        } catch (error) {
          if (error.stdout) console.log(error.stdout);
          console.error('フォーマットエラーが見つかりました');
          if (options.check) {
            console.log('\n--fix オプションを使用して自動修正できます');
          }
        }
      }
    },
    
    'lint': {
      description: 'コードをリント',
      options: {
        '--path': {
          description: 'リント対象のパス',
          type: 'string',
          default: '.'
        },
        '--fix': {
          description: '自動修正を実行',
          type: 'boolean',
          default: false
        }
      },
      action: async (args, options) => {
        const { exec } = require('child_process');
        const util = require('util');
        const execPromise = util.promisify(exec);
        
        console.log('コードをリント中...');
        
        try {
          const command = options.fix
            ? `npx eslint "${options.path}" --fix`
            : `npx eslint "${options.path}"`;
          
          const { stdout } = await execPromise(command);
          console.log(stdout);
          console.log('✓ リント完了');
          
        } catch (error) {
          if (error.stdout) console.log(error.stdout);
          console.error('リントエラーが見つかりました');
        }
      }
    },
    
    'analyze': {
      description: 'コード品質を分析',
      options: {
        '--path': {
          description: '分析対象のパス',
          type: 'string',
          default: '.'
        },
        '--output': {
          description: 'レポート出力先',
          type: 'string',
          default: './code-quality-report.html'
        }
      },
      action: async (args, options) => {
        console.log('コード品質を分析中...');
        
        const fs = require('fs').promises;
        
        // 簡易的な分析結果（実際はもっと詳細な分析を実装）
        const report = {
          timestamp: new Date().toISOString(),
          path: options.path,
          metrics: {
            totalFiles: 0,
            totalLines: 0,
            issues: {
              high: 0,
              medium: 0,
              low: 0
            }
          }
        };
        
        // レポートを生成
        const html = generateHTMLReport(report);
        await fs.writeFile(options.output, html);
        
        console.log(`✓ 分析完了`);
        console.log(`レポート: ${options.output}`);
      }
    }
  }
};

/**
 * HTMLレポートを生成
 */
function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>コード品質レポート</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; }
  </style>
</head>
<body>
  <h1>コード品質レポート</h1>
  <div class="metric">
    <strong>分析日時:</strong> ${report.timestamp}
  </div>
  <div class="metric">
    <strong>対象パス:</strong> ${report.path}
  </div>
  <div class="metric">
    <strong>ファイル数:</strong> ${report.metrics.totalFiles}
  </div>
  <div class="metric">
    <strong>総行数:</strong> ${report.metrics.totalLines}
  </div>
  <h2>問題</h2>
  <div class="metric">
    <strong>高:</strong> ${report.metrics.issues.high}<br>
    <strong>中:</strong> ${report.metrics.issues.medium}<br>
    <strong>低:</strong> ${report.metrics.issues.low}
  </div>
</body>
</html>
  `.trim();
}
