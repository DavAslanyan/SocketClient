const {override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#8E8E8E',
            '@link-color': '#8E8E8E',
            '@heading-color': '#4d4d4d',
            '@border-color-base': '#ced4da',
            '@item-active-bg':'#fbfbfb',
            '@item-hover-bg':'#f8f8f8',
        },
    }),
);

