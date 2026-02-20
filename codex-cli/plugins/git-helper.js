/**
 * Git Helper Plugin for Codex CLI
 * Git操作を補助するプラグイン
 */

module.exports = {
  name: 'git-helper',
  version: '1.0.0',
  description: 'Git操作を簡単にするヘルパープラグイン',
  author: 'agent-skill-plugins',
  
  commands: {
    'smart-commit': {
      description: 'AIを使って適切なコミットメッセージを生成',
      options: {
        '--all': {
          description: 'すべての変更をステージング',
          type: 'boolean',
          default: false
        },
        '--push': {
          description: 'コミット後に自動プッシュ',
          type: 'boolean',
          default: false
        }
      },
      action: async (args, options) => {
        console.log('変更内容を解析中...');
        
        // Git diff を取得
        const { exec } = require('child_process');
        const util = require('util');
        const execPromise = util.promisify(exec);
        
        try {
          // 変更内容を取得
          const { stdout: diff } = await execPromise('git diff --staged');
          
          if (!diff && !options.all) {
            console.log('ステージングされた変更がありません。--all オプションを使用してください。');
            return;
          }
          
          if (options.all) {
            await execPromise('git add .');
          }
          
          // AIを使ってコミットメッセージを生成（模擬）
          const message = generateCommitMessage(diff);
          console.log(`生成されたコミットメッセージ: ${message}`);
          
          // コミット実行
          await execPromise(`git commit -m "${message}"`);
          console.log('✓ コミット完了');
          
          if (options.push) {
            await execPromise('git push');
            console.log('✓ プッシュ完了');
          }
        } catch (error) {
          console.error('エラー:', error.message);
        }
      }
    },
    
    'branch-cleanup': {
      description: 'マージ済みのブランチをクリーンアップ',
      options: {
        '--dry-run': {
          description: '実際には削除せず、削除対象のブランチを表示',
          type: 'boolean',
          default: false
        }
      },
      action: async (args, options) => {
        const { exec } = require('child_process');
        const util = require('util');
        const execPromise = util.promisify(exec);
        
        try {
          const { stdout } = await execPromise('git branch --merged');
          const branches = stdout
            .split('\n')
            .map(b => b.trim())
            .filter(b => b && !b.startsWith('*') && b !== 'main' && b !== 'master');
          
          if (branches.length === 0) {
            console.log('削除するブランチがありません。');
            return;
          }
          
          console.log(`削除対象のブランチ (${branches.length}件):`);
          branches.forEach(b => console.log(`  - ${b}`));
          
          if (!options.dryRun) {
            for (const branch of branches) {
              await execPromise(`git branch -d ${branch}`);
            }
            console.log('✓ クリーンアップ完了');
          }
        } catch (error) {
          console.error('エラー:', error.message);
        }
      }
    }
  }
};

/**
 * コミットメッセージを生成（簡易版）
 */
function generateCommitMessage(diff) {
  // 実際のAI実装ではAPIを使用
  if (diff.includes('test')) {
    return 'Add tests';
  } else if (diff.includes('fix') || diff.includes('bug')) {
    return 'Fix bug';
  } else if (diff.includes('feat') || diff.includes('add')) {
    return 'Add new feature';
  } else {
    return 'Update code';
  }
}
