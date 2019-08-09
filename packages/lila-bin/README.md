# lila-bin

[English Documentation](./README.en.md)

lila 命令行工具

## 安装

全局

```
npm install lila-bin -g
```

本地

```
npm install lila-bin --save-dev
```

## 使用

全局

```
lila <cmd> [options]
```

本地

```
# package.json
{
  "scripts": {
    "run": "lila <cmd> [options]"
  }
}
```

## 选项

- `-V, --version`: 打印版本号
- `-h, --help`: 打印帮助信息
- `--core`: 自定义 `lila-core` 包路径
