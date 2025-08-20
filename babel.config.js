// Limit Prism languages to a curated set instead of bundling all languages
// This significantly reduces bundle size from the default "all languages".
const selectedLanguages = [
    'markup',
    'css',
    'clike',
    'javascript',
    'typescript',
    'json',
    'bash',
    'diff',
    'python',
    'java',
    'go',
    'c',
    'cpp',
    'markdown',
    'powershell',
    'yaml'
];

module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'prismjs',
            {
                languages: selectedLanguages,
            },
        ],
    ],
};
