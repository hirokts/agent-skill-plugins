/**
 * Project Scaffolder Plugin for Codex CLI
 * プロジェクト雛形を生成するプラグイン
 */

module.exports = {
  name: 'project-scaffolder',
  version: '1.0.0',
  description: 'プロジェクトの雛形を素早く生成',
  author: 'agent-skill-plugins',
  
  commands: {
    'new': {
      description: '新しいプロジェクトを作成',
      options: {
        '--template': {
          description: 'テンプレート名 (react, vue, node, python, go)',
          type: 'string',
          required: true
        },
        '--name': {
          description: 'プロジェクト名',
          type: 'string',
          required: true
        },
        '--git': {
          description: 'Gitリポジトリを初期化',
          type: 'boolean',
          default: true
        },
        '--install': {
          description: '依存関係を自動インストール',
          type: 'boolean',
          default: true
        }
      },
      action: async (args, options) => {
        const fs = require('fs').promises;
        const path = require('path');
        const { exec } = require('child_process');
        const util = require('util');
        const execPromise = util.promisify(exec);
        
        console.log(`プロジェクト "${options.name}" を作成中...`);
        
        try {
          // プロジェクトディレクトリを作成
          const projectPath = path.join(process.cwd(), options.name);
          await fs.mkdir(projectPath, { recursive: true });
          
          // テンプレートに応じたファイルを生成
          await generateTemplate(projectPath, options.template);
          
          // Git初期化
          if (options.git) {
            process.chdir(projectPath);
            await execPromise('git init');
            console.log('✓ Gitリポジトリを初期化');
          }
          
          // 依存関係のインストール
          if (options.install) {
            console.log('依存関係をインストール中...');
            await installDependencies(projectPath, options.template);
            console.log('✓ 依存関係をインストール');
          }
          
          console.log(`\n✓ プロジェクト "${options.name}" を作成しました！`);
          console.log(`\n開始するには:`);
          console.log(`  cd ${options.name}`);
          console.log(`  npm start  # または対応するコマンド`);
          
        } catch (error) {
          console.error('エラー:', error.message);
        }
      }
    },
    
    'add-component': {
      description: 'プロジェクトに新しいコンポーネントを追加',
      options: {
        '--name': {
          description: 'コンポーネント名',
          type: 'string',
          required: true
        },
        '--type': {
          description: 'コンポーネントタイプ (component, service, model, etc.)',
          type: 'string',
          default: 'component'
        }
      },
      action: async (args, options) => {
        console.log(`${options.type} "${options.name}" を追加中...`);
        
        const fs = require('fs').promises;
        const path = require('path');
        
        try {
          const componentPath = path.join(process.cwd(), 'src', options.type + 's', options.name);
          await fs.mkdir(componentPath, { recursive: true });
          
          // コンポーネントファイルを生成
          const fileContent = generateComponentTemplate(options.name, options.type);
          await fs.writeFile(
            path.join(componentPath, `${options.name}.js`),
            fileContent
          );
          
          console.log(`✓ ${options.type} "${options.name}" を作成しました`);
          console.log(`  場所: src/${options.type}s/${options.name}/`);
          
        } catch (error) {
          console.error('エラー:', error.message);
        }
      }
    }
  }
};

/**
 * テンプレートファイルを生成
 */
async function generateTemplate(projectPath, template) {
  const fs = require('fs').promises;
  const path = require('path');
  
  const templates = {
    react: {
      'package.json': JSON.stringify({
        name: path.basename(projectPath),
        version: '1.0.0',
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0'
        }
      }, null, 2),
      'src/App.js': 'import React from "react";\n\nfunction App() {\n  return <div>Hello World</div>;\n}\n\nexport default App;'
    },
    node: {
      'package.json': JSON.stringify({
        name: path.basename(projectPath),
        version: '1.0.0',
        main: 'index.js'
      }, null, 2),
      'index.js': 'console.log("Hello, Node.js!");'
    },
    python: {
      'main.py': 'def main():\n    print("Hello, Python!")\n\nif __name__ == "__main__":\n    main()',
      'requirements.txt': ''
    }
  };
  
  const files = templates[template] || templates.node;
  
  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(projectPath, filename);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
  }
}

/**
 * 依存関係をインストール
 */
async function installDependencies(projectPath, template) {
  const { exec } = require('child_process');
  const util = require('util');
  const execPromise = util.promisify(exec);
  
  if (['react', 'node', 'vue'].includes(template)) {
    await execPromise('npm install', { cwd: projectPath });
  } else if (template === 'python') {
    await execPromise('pip install -r requirements.txt', { cwd: projectPath });
  }
}

/**
 * コンポーネントテンプレートを生成
 */
function generateComponentTemplate(name, type) {
  if (type === 'component') {
    return `import React from 'react';\n\nconst ${name} = () => {\n  return (\n    <div>\n      <h1>${name}</h1>\n    </div>\n  );\n};\n\nexport default ${name};`;
  }
  return `// ${name} ${type}\n\nexport default {};`;
}
