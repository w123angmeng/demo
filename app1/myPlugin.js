function MyPlugin(matchCallback) {
    this.entryMatchCallback = matchCallback;
}

MyPlugin.prototype.apply = function(compiler) {
    var _this = this;
    compiler.hooks.compilation.tap('MyPlugin', function(compilation) {
        // 通过最终的 webpack 配置的 plugins 属性，根据插件的 constructor.name 拿到 html-webpack-plugin 实例
        var HtmlWebpackPluginInstance = compiler.options.plugins
            .map(function(_a) {
                var constructor = _a.constructor;
                return constructor;
            })
            .find(function(constructor) {
                return constructor && constructor.name === 'HtmlWebpackPlugin';
            });
        if (HtmlWebpackPluginInstance) {
            // 获取 html-webpack-plugin 所有的 hooks
            var hooks = HtmlWebpackPluginInstance.getHooks(compilation);
            // 在插入标签之前做些什么
            hooks.alterAssetTagGroups.tap('MyPlugin', function(data) {
                // 拿到所有的标签，如果是 script 标签，并且满足我们的匹配函数，则将其 attributes['entry'] 设为 true
                data.headTags.forEach(function(tag) {
                    var _a;
                    if (tag.tagName === 'script' && _this.entryMatchCallback((_a = tag.attributes) === null || _a === void 0 ? void 0 : _a.src)) {
                        // eslint-disable-next-line no-param-reassign
                        tag.attributes.entry = true;
                    }
                });
                return data;
            });
        }
    });
};

module.exports = MyPlugin;